import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ROCKIMALS_TODAY_LOCALES,
  renderRockimalsToday,
  rockimalsMoonLabel,
  rockimalsSpeedLabels,
  rockimalsTodayGroups,
  rockimalsTodayHeroFor,
  rockimalsTodayShown,
  rockimalsTodayVisitorsFromFeed
} from '../scripts/rockimals-today.mjs';

const DAY = '2026-09-24';

function neo({ id, name, max, lunar, kps = 10, hazardous = false, time = 1790238720000 }) {
  return {
    id,
    name,
    links: { self: 'https://api.nasa.gov/neo/rest/v1/neo/1?api_key=SECRET_KEY_VALUE' },
    nasa_jpl_url: `https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=${id}`,
    is_potentially_hazardous_asteroid: hazardous,
    estimated_diameter: { meters: { estimated_diameter_min: max / 2.2, estimated_diameter_max: max } },
    close_approach_data: [{
      close_approach_date: DAY,
      epoch_date_close_approach: time,
      orbiting_body: 'Earth',
      miss_distance: { lunar: String(lunar), kilometers: String(lunar * 384400) },
      relative_velocity: { kilometers_per_second: String(kps) }
    }]
  };
}

function data(visitors) {
  return { date: DAY, generatedAt: `${DAY}T00:20:00.000Z`, source: 'NASA NeoWs', visitors };
}

test('size ladder matches the app rungs', () => {
  assert.equal(rockimalsTodayHeroFor(7.99).id, 'mouse');
  assert.equal(rockimalsTodayHeroFor(8).id, 'rabbit');
  assert.equal(rockimalsTodayHeroFor(119.9).id, 'tiger');
  assert.equal(rockimalsTodayHeroFor(1999).id, 'dino');
  assert.equal(rockimalsTodayHeroFor(2000).id, 'whale');
});

test('Moon labels follow the app formatter', () => {
  assert.equal(rockimalsMoonLabel('en', 0.07), '7% to Moon');
  assert.equal(rockimalsMoonLabel('en', 1.34), '1.3× Moon');
  assert.equal(rockimalsMoonLabel('en', 9.99), '10.0× Moon');
  assert.equal(rockimalsMoonLabel('en', 12.4), '12× Moon');
  assert.match(rockimalsMoonLabel('tr', 1.34), /1,3/);
});

test('speed labels round like the app', () => {
  assert.deepEqual(rockimalsSpeedLabels('en', 9.77), {
    speed: '10 km/s',
    plane: 'About 40× faster than a passenger plane'
  });
});

test('feed normalization keeps derived fields only', () => {
  const feed = { near_earth_objects: { [DAY]: [
    neo({ id: '1', name: '(2006 TL)', max: 98, lunar: 106 }),
    neo({ id: '2', name: '(2015 SY16)', max: 287, lunar: 192, hazardous: true, time: 1790223060000 }),
    neo({ id: '1', name: '(2006 TL)', max: 98, lunar: 106 })
  ] } };
  const visitors = rockimalsTodayVisitorsFromFeed(feed, DAY);
  assert.equal(visitors.length, 2);
  assert.equal(visitors[0].designation, '2015 SY16');
  assert.equal(visitors[0].closeFlyby, true);
  assert.equal(visitors[1].closeFlyby, false);
  assert.doesNotMatch(JSON.stringify(visitors), /api_key|SECRET_KEY_VALUE|links/);
});

test('shows at most twelve, preferring the closest', () => {
  const feed = { near_earth_objects: { [DAY]: Array.from({ length: 15 }, (_, index) => (
    neo({ id: String(index), name: `(2026 A${index})`, max: 30, lunar: 20 - index, time: 1790200000000 + index * 60000 })
  )) } };
  const shown = rockimalsTodayShown(rockimalsTodayVisitorsFromFeed(feed, DAY));
  assert.equal(shown.length, 12);
  assert.ok(shown.every((visitor) => visitor.missLunar <= 17));
});

test('groups visitors by size-class hero, smallest first', () => {
  const feed = { near_earth_objects: { [DAY]: [
    neo({ id: '1', name: '(A)', max: 287, lunar: 5 }),
    neo({ id: '2', name: '(B)', max: 12, lunar: 3 }),
    neo({ id: '3', name: '(C)', max: 15, lunar: 0.5 })
  ] } };
  const groups = rockimalsTodayGroups(rockimalsTodayVisitorsFromFeed(feed, DAY));
  assert.deepEqual(groups.map((group) => [group.hero.id, group.visitors.length]), [['rabbit', 2], ['bear', 1]]);
});

test('every locale renders a script-free page with one h1', () => {
  const feed = { near_earth_objects: { [DAY]: [neo({ id: '1', name: '(2006 TL)', max: 98, lunar: 0.4 })] } };
  const payload = data(rockimalsTodayVisitorsFromFeed(feed, DAY));
  for (const locale of ROCKIMALS_TODAY_LOCALES) {
    const html = renderRockimalsToday({ locale, data: payload, today: DAY });
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, locale);
    assert.doesNotMatch(html.replace(/<script type="application\/ld\+json">[^<]*<\/script>/, ''), /<script/i, locale);
    assert.match(html, /apple-itunes-app/, locale);
    assert.match(html, /hreflang="x-default"/, locale);
    assert.doesNotMatch(html, /hazard|threat|danger/i, locale);
    assert.doesNotMatch(html, /rkt-stale/, locale);
  }
});

test('an older list says it is not today', () => {
  const html = renderRockimalsToday({ locale: 'en', data: data([]), today: '2026-09-25' });
  assert.match(html, /rkt-stale/);
  assert.match(html, /The sky is quiet/);
});

test('the designation stays inside the grown-up section', () => {
  const feed = { near_earth_objects: { [DAY]: [neo({ id: '1', name: '(2006 TL)', max: 98, lunar: 3 })] } };
  const html = renderRockimalsToday({ locale: 'en', data: data(rockimalsTodayVisitorsFromFeed(feed, DAY)), today: DAY });
  const outside = html.replace(/<details class="rkt-grownups">[\s\S]*?<\/details>/g, '');
  assert.doesNotMatch(outside, /2006 TL/);
  assert.match(html, /2006 TL/);
});
