// The daily "Today's Rockimals" page (Rockimals spec 120, website spec 036):
// NASA NeoWs close approaches for one UTC day, shown as Rockimals heroes
// chosen by real size. Pure functions only; scripts/build-rockimals-today.mjs
// fetches the data and writes the files.
//
// Parity with the app (owner decision, 2026-09-24): each visitor is shown with
// the hero whose species matches its real-size rung, and every label reuses
// the app's own strings and formulas (lib/core/animals/animal_system.dart).
// The page does not claim to match the hero a particular device assigns.
import { readFileSync } from 'node:fs';
import { ROCKIMALS_BLOG_LOCALES } from './rockimals-blog-content.mjs';
import { ROCKIMALS_ARTICLE_UI } from './rockimals-blog-article.mjs';
import { ROCKIMALS_SMART_APP_BANNER, rockimalsAppStoreUrl } from './rockimals-blog-cta.mjs';
import { renderRockimalsLanguageMenu, rockimalsBlogIndexPath, rockimalsProductPath } from './rockimals-blog-navigation.mjs';
import { ROCKIMALS_ORIGIN } from './rockimals-blog-seo.mjs';

const APP_STRINGS = JSON.parse(readFileSync(new URL('../content/rockimals-today/app-strings.json', import.meta.url), 'utf8')).locales;
const LANDING = JSON.parse(readFileSync(new URL('../content/rockimals-landing/locales.json', import.meta.url), 'utf8'));

export const ROCKIMALS_TODAY_LOCALES = ROCKIMALS_BLOG_LOCALES;
export const ROCKIMALS_TODAY_LIMIT = 12;

// The app's size ladder (`kAnimals`): upper bounds in metres on the maximum
// estimated diameter, exclusive, and the hero who stands for each rung.
export const ROCKIMALS_TODAY_HEROES = Object.freeze([
  { id: 'mouse', name: 'Niko', max: 8, species: 'speciesMouse', size: 'sizeComparisonCar' },
  { id: 'rabbit', name: 'Tavi', max: 20, species: 'speciesRabbit', size: 'sizeComparisonBus' },
  { id: 'fox', name: 'Barney', max: 50, species: 'speciesFox', size: 'sizeComparisonHouse' },
  { id: 'tiger', name: 'Kito', max: 120, species: 'speciesTiger', size: 'sizeComparisonPlane' },
  { id: 'bear', name: 'Pofi', max: 300, species: 'speciesBear', size: 'sizeComparisonFootballPitch' },
  { id: 'elephant', name: 'Bobo', max: 800, species: 'speciesElephant', size: 'sizeComparisonStadium' },
  { id: 'dino', name: 'Ciko', max: 2000, species: 'speciesDino', size: 'sizeComparisonSkyscraper' },
  { id: 'whale', name: 'Enoli', max: Infinity, species: 'speciesWhale', size: 'sizeComparisonMountain' }
]);

// Page copy. Non-English strings need native review (spec 120, step 3).
// Plural entries are keyed by Intl.PluralRules categories.
export const ROCKIMALS_TODAY_UI = Object.freeze({
  en: {
    title: 'Which asteroids pass Earth today?',
    description: "Real near-Earth asteroids passing today, shown as friendly Rockimals space animals, with their size, speed and distance compared with the Moon. Updated daily from NASA data.",
    kicker: 'Updated daily from NASA data',
    heading: 'Space visitors: {date}',
    leadToday: { one: 'Today one real asteroid passes Earth.', other: 'Today {count} real asteroids pass Earth.' },
    leadPast: { one: 'On {date}, one real asteroid passed Earth.', other: 'On {date}, {count} real asteroids passed Earth.' },
    stale: "This is the latest list we have. Today's visitors appear after the next daily update.",
    shownClosest: 'The {shown} closest are shown here.',
    heroNote: 'Each one is shown with the Rockimals hero that matches its real size.',
    groupCount: { one: '1 visitor this size', other: '{count} visitors this size' },
    grownUps: 'For grown-ups',
    officialName: 'Official name',
    width: 'Estimated width',
    closest: 'Closest approach',
    distance: 'Distance from Earth',
    speed: 'Speed',
    jpl: 'NASA/JPL page',
    empty: 'No asteroids pass close to Earth on this day. The sky is quiet.',
    ctaTitle: 'Meet them in Rockimals',
    ctaText: "The app turns each day's real visitors into friendly heroes, illustrated stories and calm games.",
    source: 'Data: NASA/JPL Near Earth Object Web Service (NeoWs). Rockimals is not affiliated with or endorsed by NASA.',
    skip: "Skip to today's visitors",
    language: 'Page language'
  },
  tr: {
    title: "Bugün Dünya'nın yanından hangi asteroitler geçiyor?",
    description: "Bugün Dünya'nın yanından geçen gerçek asteroitler, sevimli Rockimals uzay hayvanları olarak: boyutları, hızları ve Ay'a göre uzaklıkları. NASA verileriyle her gün güncellenir.",
    kicker: 'NASA verileriyle her gün güncellenir',
    heading: 'Uzay ziyaretçileri: {date}',
    leadToday: { other: "Bugün {count} gerçek asteroit Dünya'nın yanından geçiyor." },
    leadPast: { other: "{date} günü {count} gerçek asteroit Dünya'nın yanından geçti." },
    stale: 'Elimizdeki en güncel liste bu. Bugünün ziyaretçileri bir sonraki günlük güncellemeden sonra görünecek.',
    shownClosest: 'Burada en yakın {shown} tanesi gösteriliyor.',
    heroNote: 'Her biri, gerçek boyutuna uyan Rockimals kahramanıyla gösteriliyor.',
    groupCount: { other: 'Bu boyutta {count} ziyaretçi' },
    grownUps: 'Büyükler için',
    officialName: 'Resmî adı',
    width: 'Tahmini genişlik',
    closest: 'En yakın geçiş',
    distance: "Dünya'ya uzaklık",
    speed: 'Hız',
    jpl: 'NASA/JPL sayfası',
    empty: "Bu gün Dünya'nın yakınından asteroit geçmiyor. Gökyüzü sakin.",
    ctaTitle: "Onlarla Rockimals'ta tanış",
    ctaText: 'Uygulama her günün gerçek ziyaretçilerini sevimli kahramanlara, resimli masallara ve sakin oyunlara dönüştürür.',
    source: 'Veri: NASA/JPL Near Earth Object Web Service (NeoWs). Rockimals, NASA ile bağlantılı değildir ve NASA tarafından desteklenmez.',
    skip: 'Bugünün ziyaretçilerine geç',
    language: 'Sayfa dili'
  },
  ja: {
    title: '今日、地球のそばを通る小惑星は？',
    description: '今日地球のそばを通る本物の小惑星を、やさしいRockimalsの宇宙どうぶつで紹介します。大きさ、速さ、月とくらべた距離がわかります。NASAのデータで毎日更新。',
    kicker: 'NASAのデータで毎日更新',
    heading: '宇宙からの訪問者：{date}',
    leadToday: { other: '今日は{count}個の本物の小惑星が地球のそばを通ります。' },
    leadPast: { other: '{date}には{count}個の本物の小惑星が地球のそばを通りました。' },
    stale: 'これが今ある最新のリストです。今日の訪問者は、次の毎日の更新のあとに表示されます。',
    shownClosest: 'ここでは近い順に{shown}個を紹介しています。',
    heroNote: 'それぞれ、本当の大きさに合ったRockimalsのヒーローで紹介しています。',
    groupCount: { other: 'この大きさの訪問者：{count}' },
    grownUps: '大人の人へ',
    officialName: '正式名',
    width: '推定の幅',
    closest: '最接近',
    distance: '地球からの距離',
    speed: '速さ',
    jpl: 'NASA/JPLのページ',
    empty: 'この日は地球の近くを通る小惑星はありません。空はおだやかです。',
    ctaTitle: 'Rockimalsで会いにいこう',
    ctaText: 'アプリでは、毎日の本物の訪問者が、やさしいヒーローや絵のあるおはなし、ゆったりしたゲームになります。',
    source: 'データ：NASA/JPL Near Earth Object Web Service（NeoWs）。RockimalsはNASAと提携しておらず、NASAの承認も受けていません。',
    skip: '今日の訪問者へ移動',
    language: 'ページの言語'
  },
  ko: {
    title: '오늘 지구 곁을 지나가는 소행성은?',
    description: '오늘 지구 곁을 지나가는 진짜 소행성을 다정한 Rockimals 우주 동물로 만나 보세요. 크기, 속도, 달과 비교한 거리를 알려 줘요. NASA 데이터로 매일 업데이트돼요.',
    kicker: 'NASA 데이터로 매일 업데이트',
    heading: '우주 방문자: {date}',
    leadToday: { other: '오늘은 진짜 소행성 {count}개가 지구 곁을 지나가요.' },
    leadPast: { other: '{date}에는 진짜 소행성 {count}개가 지구 곁을 지나갔어요.' },
    stale: '지금 있는 가장 최근 목록이에요. 오늘의 방문자는 다음 매일 업데이트 후에 나타나요.',
    shownClosest: '여기에는 가장 가까운 {shown}개를 보여 줘요.',
    heroNote: '각 방문자는 실제 크기에 맞는 Rockimals 영웅으로 보여 줘요.',
    groupCount: { other: '이 크기의 방문자: {count}' },
    grownUps: '어른을 위한 정보',
    officialName: '공식 이름',
    width: '추정 폭',
    closest: '최근접 시각',
    distance: '지구와의 거리',
    speed: '속도',
    jpl: 'NASA/JPL 페이지',
    empty: '이날은 지구 가까이 지나가는 소행성이 없어요. 하늘이 조용해요.',
    ctaTitle: 'Rockimals에서 만나 보세요',
    ctaText: '앱에서는 매일의 진짜 방문자가 다정한 영웅, 그림 이야기, 차분한 게임이 돼요.',
    source: '데이터: NASA/JPL Near Earth Object Web Service(NeoWs). Rockimals는 NASA와 제휴하지 않았으며 NASA의 보증을 받지 않았습니다.',
    skip: '오늘의 방문자로 건너뛰기',
    language: '페이지 언어'
  },
  'zh-Hans': {
    title: '今天有哪些小行星从地球旁边经过？',
    description: '今天从地球旁边经过的真实小行星，化身友好的 Rockimals 太空动物：看看它们的大小、速度，以及和月球相比的距离。每天根据 NASA 数据更新。',
    kicker: '每天根据 NASA 数据更新',
    heading: '太空访客：{date}',
    leadToday: { other: '今天有 {count} 颗真实的小行星从地球旁边经过。' },
    leadPast: { other: '{date}，有 {count} 颗真实的小行星从地球旁边经过。' },
    stale: '这是我们目前最新的列表。今天的访客会在下一次每日更新后出现。',
    shownClosest: '这里展示距离最近的 {shown} 颗。',
    heroNote: '每一颗都由与它真实大小相配的 Rockimals 英雄来代表。',
    groupCount: { other: '这个大小的访客：{count}' },
    grownUps: '给大人看',
    officialName: '正式名称',
    width: '估计宽度',
    closest: '最接近时间',
    distance: '与地球的距离',
    speed: '速度',
    jpl: 'NASA/JPL 页面',
    empty: '这一天没有小行星从地球附近经过。天空很平静。',
    ctaTitle: '在 Rockimals 里认识它们',
    ctaText: '在应用里，每天真实的访客会变成友好的英雄、有插图的故事和轻松的游戏。',
    source: '数据：NASA/JPL Near Earth Object Web Service（NeoWs）。Rockimals 与 NASA 没有关联，也未获得 NASA 的认可。',
    skip: '跳到今天的访客',
    language: '页面语言'
  },
  fr: {
    title: "Quels astéroïdes passent près de la Terre aujourd'hui\u00a0?",
    description: "Les vrais astéroïdes qui passent près de la Terre aujourd'hui, présentés comme de gentils animaux de l'espace Rockimals\u00a0: taille, vitesse et distance comparées à la Lune. Mis à jour chaque jour avec les données de la NASA.",
    kicker: 'Mis à jour chaque jour avec les données de la NASA',
    heading: "Visiteurs de l'espace\u00a0: {date}",
    leadToday: { one: "Aujourd'hui, un vrai astéroïde passe près de la Terre.", other: "Aujourd'hui, {count} vrais astéroïdes passent près de la Terre." },
    leadPast: { one: 'Le {date}, un vrai astéroïde est passé près de la Terre.', other: 'Le {date}, {count} vrais astéroïdes sont passés près de la Terre.' },
    stale: 'Voici la liste la plus récente dont nous disposons. Les visiteurs du jour apparaîtront après la prochaine mise à jour quotidienne.',
    shownClosest: 'Les {shown} plus proches sont présentés ici.',
    heroNote: 'Chacun est présenté avec le héros Rockimals qui correspond à sa vraie taille.',
    groupCount: { one: '{count} visiteur de cette taille', other: '{count} visiteurs de cette taille' },
    grownUps: 'Pour les adultes',
    officialName: 'Nom officiel',
    width: 'Largeur estimée',
    closest: 'Passage au plus près',
    distance: 'Distance de la Terre',
    speed: 'Vitesse',
    jpl: 'Page NASA/JPL',
    empty: 'Aucun astéroïde ne passe près de la Terre ce jour-là. Le ciel est calme.',
    ctaTitle: 'Rencontre-les dans Rockimals',
    ctaText: "L'app transforme les vrais visiteurs de chaque jour en héros attachants, en histoires illustrées et en jeux tout doux.",
    source: "Données\u00a0: NASA/JPL Near Earth Object Web Service (NeoWs). Rockimals n'est ni affilié à la NASA ni approuvé par elle.",
    skip: 'Aller aux visiteurs du jour',
    language: 'Langue de la page'
  },
  de: {
    title: 'Welche Asteroiden fliegen heute an der Erde vorbei?',
    description: 'Echte erdnahe Asteroiden von heute als freundliche Rockimals-Weltraumtiere: Größe, Tempo und Entfernung im Vergleich zum Mond. Täglich aktualisiert mit NASA-Daten.',
    kicker: 'Täglich aktualisiert mit NASA-Daten',
    heading: 'Gäste aus dem All: {date}',
    leadToday: { one: 'Heute fliegt ein echter Asteroid an der Erde vorbei.', other: 'Heute fliegen {count} echte Asteroiden an der Erde vorbei.' },
    leadPast: { one: 'Am {date} flog ein echter Asteroid an der Erde vorbei.', other: 'Am {date} flogen {count} echte Asteroiden an der Erde vorbei.' },
    stale: 'Das ist die neueste Liste, die wir haben. Die Gäste von heute erscheinen nach der nächsten täglichen Aktualisierung.',
    shownClosest: 'Hier siehst du die {shown} nächsten.',
    heroNote: 'Jeder Gast erscheint als der Rockimals-Held, der zu seiner echten Größe passt.',
    groupCount: { one: '1 Gast dieser Größe', other: '{count} Gäste dieser Größe' },
    grownUps: 'Für Erwachsene',
    officialName: 'Offizieller Name',
    width: 'Geschätzte Breite',
    closest: 'Größte Annäherung',
    distance: 'Entfernung zur Erde',
    speed: 'Geschwindigkeit',
    jpl: 'NASA/JPL-Seite',
    empty: 'An diesem Tag fliegt kein Asteroid nah an der Erde vorbei. Der Himmel ist ruhig.',
    ctaTitle: 'Triff sie in Rockimals',
    ctaText: 'Die App macht aus den echten Gästen jedes Tages freundliche Helden, illustrierte Geschichten und ruhige Spiele.',
    source: 'Daten: NASA/JPL Near Earth Object Web Service (NeoWs). Rockimals ist nicht mit der NASA verbunden und wird nicht von ihr unterstützt.',
    skip: 'Zu den Gästen von heute',
    language: 'Sprache der Seite'
  },
  es: {
    title: '¿Qué asteroides pasan hoy cerca de la Tierra?',
    description: 'Los asteroides reales que pasan hoy cerca de la Tierra, como simpáticos animales espaciales de Rockimals: su tamaño, su velocidad y su distancia comparada con la Luna. Actualizado cada día con datos de la NASA.',
    kicker: 'Actualizado cada día con datos de la NASA',
    heading: 'Visitantes del espacio: {date}',
    leadToday: { one: 'Hoy pasa cerca de la Tierra un asteroide real.', other: 'Hoy pasan cerca de la Tierra {count} asteroides reales.' },
    leadPast: { one: 'El {date} pasó cerca de la Tierra un asteroide real.', other: 'El {date} pasaron cerca de la Tierra {count} asteroides reales.' },
    stale: 'Esta es la lista más reciente que tenemos. Las visitas de hoy aparecerán tras la próxima actualización diaria.',
    shownClosest: 'Aquí se muestran los {shown} más cercanos.',
    heroNote: 'Cada uno aparece con el héroe de Rockimals que corresponde a su tamaño real.',
    groupCount: { one: '1 visitante de este tamaño', other: '{count} visitantes de este tamaño' },
    grownUps: 'Para personas adultas',
    officialName: 'Nombre oficial',
    width: 'Anchura estimada',
    closest: 'Máximo acercamiento',
    distance: 'Distancia a la Tierra',
    speed: 'Velocidad',
    jpl: 'Página de NASA/JPL',
    empty: 'Ese día ningún asteroide pasa cerca de la Tierra. El cielo está tranquilo.',
    ctaTitle: 'Conócelos en Rockimals',
    ctaText: 'La app convierte a los visitantes reales de cada día en héroes simpáticos, cuentos ilustrados y juegos tranquilos.',
    source: 'Datos: NASA/JPL Near Earth Object Web Service (NeoWs). Rockimals no está afiliada a la NASA ni cuenta con su respaldo.',
    skip: 'Ir a las visitas de hoy',
    language: 'Idioma de la página'
  }
});

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));
}

function plural(locale, forms, count) {
  return forms[new Intl.PluralRules(locale).select(count)] ?? forms.other;
}

export function rockimalsTodayPath(locale) {
  return locale === 'en' ? '/today' : `/${locale}/today`;
}

export function rockimalsTodayPaths() {
  return Object.fromEntries(ROCKIMALS_TODAY_LOCALES.map((locale) => [locale, rockimalsTodayPath(locale)]));
}

// --- Data -------------------------------------------------------------------

function cleanDesignation(name) {
  const value = String(name ?? '').trim();
  const bracketed = value.match(/^\((.+)\)$/);
  return bracketed ? bracketed[1] : value;
}

function safeJplUrl(value) {
  const url = String(value ?? '').replace(/^http:\/\//, 'https://');
  return /^https:\/\/ssd\.jpl\.nasa\.gov\/[^\s"'<>]*$/.test(url) ? url : '';
}

/**
 * Turns a NeoWs feed response into the page's visitors for one UTC day. Only
 * derived fields are kept; the feed's `links` (which carry the API key) are
 * never read.
 */
export function rockimalsTodayVisitorsFromFeed(feed, date) {
  const seen = new Set();
  const visitors = [];
  for (const object of feed?.near_earth_objects?.[date] ?? []) {
    const approach = (object.close_approach_data ?? [])
      .find((entry) => entry.close_approach_date === date && entry.orbiting_body === 'Earth');
    const metres = object.estimated_diameter?.meters;
    if (!approach || !metres || seen.has(object.id)) continue;
    const visitor = {
      designation: cleanDesignation(object.name),
      diameterMinM: Number(metres.estimated_diameter_min),
      diameterMaxM: Number(metres.estimated_diameter_max),
      missLunar: Number(approach.miss_distance?.lunar),
      missKm: Number(approach.miss_distance?.kilometers),
      speedKps: Number(approach.relative_velocity?.kilometers_per_second),
      approachAt: new Date(Number(approach.epoch_date_close_approach)).toISOString(),
      closeFlyby: object.is_potentially_hazardous_asteroid === true || Number(approach.miss_distance?.lunar) < 1,
      jplUrl: safeJplUrl(object.nasa_jpl_url)
    };
    if (!visitor.designation || ![visitor.diameterMinM, visitor.diameterMaxM, visitor.missLunar, visitor.missKm, visitor.speedKps]
      .every((number) => Number.isFinite(number) && number >= 0)) continue;
    seen.add(object.id);
    visitors.push(visitor);
  }
  return visitors.sort((a, b) => a.approachAt.localeCompare(b.approachAt) || a.designation.localeCompare(b.designation));
}

export function validateRockimalsTodayData(data) {
  if (!data || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Array.isArray(data.visitors)) {
    throw new Error('Rockimals today data needs a YYYY-MM-DD date and a visitors array.');
  }
  for (const visitor of data.visitors) {
    for (const field of ['diameterMinM', 'diameterMaxM', 'missLunar', 'missKm', 'speedKps']) {
      if (!Number.isFinite(visitor[field])) throw new Error(`Rockimals today visitor ${visitor.designation}: bad ${field}.`);
    }
    if (typeof visitor.designation !== 'string' || !visitor.designation) throw new Error('Rockimals today visitor without a designation.');
    if (visitor.jplUrl && !safeJplUrl(visitor.jplUrl)) throw new Error(`Rockimals today visitor ${visitor.designation}: unexpected link.`);
  }
  return data;
}

/** Up to the limit, preferring the closest; then in approach order. */
export function rockimalsTodayShown(visitors, limit = ROCKIMALS_TODAY_LIMIT) {
  const chosen = visitors.length <= limit
    ? visitors
    : [...visitors].sort((a, b) => a.missLunar - b.missLunar).slice(0, limit);
  return [...chosen].sort((a, b) => a.approachAt.localeCompare(b.approachAt));
}

/** The app's `_rungFor`: first rung whose ceiling the maximum diameter is under. */
export function rockimalsTodayHeroFor(diameterMaxM) {
  return ROCKIMALS_TODAY_HEROES.find((hero) => diameterMaxM < hero.max) ?? ROCKIMALS_TODAY_HEROES.at(-1);
}

/** Groups visitors by size-class hero, smallest hero first. */
export function rockimalsTodayGroups(visitors) {
  return ROCKIMALS_TODAY_HEROES
    .map((hero) => ({ hero, visitors: visitors.filter((visitor) => rockimalsTodayHeroFor(visitor.diameterMaxM) === hero) }))
    .filter((group) => group.visitors.length > 0);
}

// --- The app's formatters -----------------------------------------------------

/** `localizedDistLabel`: "7% to Moon", "1.3× Moon", "12× Moon". */
export function rockimalsMoonLabel(locale, lunarDistance) {
  const strings = APP_STRINGS[locale];
  if (lunarDistance < 1) return fill(strings.distancePercentMoon, { percent: Math.round(lunarDistance * 100) });
  const multiple = lunarDistance < 10
    ? new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1, useGrouping: false })
      .format(Number(lunarDistance.toFixed(1)))
    : new Intl.NumberFormat(locale, { maximumFractionDigits: 0, useGrouping: false }).format(Math.round(lunarDistance));
  return fill(strings.distanceMoonMultiple, { multiple });
}

export function rockimalsSpeedLabels(locale, kilometresPerSecond) {
  const strings = APP_STRINGS[locale];
  const rounded = Math.round(kilometresPerSecond);
  return {
    speed: fill(strings.speedKps, { speed: rounded }),
    plane: fill(strings.speedComparisonPlane, { times: Math.max(1, Math.round(rounded / 0.25)) })
  };
}

export function rockimalsHeroName(locale, hero) {
  const strings = APP_STRINGS[locale];
  return fill(strings.critterName, { first: hero.name, species: strings[hero.species] });
}

// --- Page -------------------------------------------------------------------

function formatDay(locale, date) {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));
}

function formatMoment(locale, iso) {
  return `${new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(new Date(iso))} UTC`;
}

function renderVisitor(locale, ui, visitor) {
  const strings = APP_STRINGS[locale];
  const { speed, plane } = rockimalsSpeedLabels(locale, visitor.speedKps);
  const tag = visitor.closeFlyby ? strings.flybyCloseVisible : strings.flybyJustPassing;
  const number = (value, digits = 0) => new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value);
  const width = fill(strings.widthRangeMetres, { minimum: number(Math.round(visitor.diameterMinM)), maximum: number(Math.round(visitor.diameterMaxM)) });
  const link = visitor.jplUrl
    ? `<p class="rkt-jpl"><a href="${escapeHtml(visitor.jplUrl)}" rel="noopener external">${escapeHtml(ui.jpl)}</a></p>`
    : '';
  return `<li class="rkt-visitor">
          <p class="rkt-chips"><span class="rkt-chip">${escapeHtml(rockimalsMoonLabel(locale, visitor.missLunar))}</span><span class="rkt-chip${visitor.closeFlyby ? ' rkt-chip--wave' : ''}">${escapeHtml(tag)}</span><span class="rkt-chip">${escapeHtml(speed)}</span></p>
          <p class="rkt-plane">${escapeHtml(plane)}</p>
          <details class="rkt-grownups"><summary>${escapeHtml(ui.grownUps)}</summary>
            <dl>
              <dt>${escapeHtml(ui.officialName)}</dt><dd>${escapeHtml(visitor.designation)}</dd>
              <dt>${escapeHtml(ui.width)}</dt><dd>${escapeHtml(width)}</dd>
              <dt>${escapeHtml(ui.closest)}</dt><dd><time datetime="${escapeHtml(visitor.approachAt)}">${escapeHtml(formatMoment(locale, visitor.approachAt))}</time></dd>
              <dt>${escapeHtml(ui.distance)}</dt><dd>${escapeHtml(number(Math.round(visitor.missKm / 1000) * 1000))} km</dd>
              <dt>${escapeHtml(ui.speed)}</dt><dd>${escapeHtml(number(visitor.speedKps, 1))} km/s</dd>
            </dl>
            ${link}
          </details>
        </li>`;
}

function renderGroup(locale, ui, { hero, visitors }) {
  const strings = APP_STRINGS[locale];
  const name = rockimalsHeroName(locale, hero);
  return `<section class="rkt-group" aria-labelledby="rkt-${hero.id}">
      <img class="rkt-orb" src="/assets/products/rockimals-heroes/${hero.id}.webp" alt="" width="120" height="120" loading="lazy" decoding="async">
      <div class="rkt-group-body">
        <h2 id="rkt-${hero.id}">${escapeHtml(name)}</h2>
        <p class="rkt-size">${escapeHtml(strings[hero.size])}</p>
        <p class="rkt-count">${escapeHtml(fill(plural(locale, ui.groupCount, visitors.length), { count: visitors.length }))}</p>
        <ol class="rkt-visitors">
        ${visitors.map((visitor) => renderVisitor(locale, ui, visitor)).join('\n        ')}
        </ol>
      </div>
    </section>`;
}

function renderSeo({ locale, ui, title, canonical, data }) {
  const paths = rockimalsTodayPaths();
  const alternates = ROCKIMALS_TODAY_LOCALES
    .map((code) => `<link rel="alternate" hreflang="${code}" href="${ROCKIMALS_ORIGIN}${paths[code]}">`)
    .join('\n');
  const image = `${ROCKIMALS_ORIGIN}/assets/products/rockimals-heroes/lineup.jpg`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: ui.title,
    description: ui.description,
    url: canonical,
    inLanguage: locale,
    dateModified: data.generatedAt ?? `${data.date}T00:00:00Z`,
    isPartOf: { '@type': 'WebSite', name: 'Rockimals', url: `${ROCKIMALS_ORIGIN}/` },
    publisher: { '@type': 'Organization', name: 'DuniaOps', url: 'https://www.duniaops.com/' },
    primaryImageOfPage: image
  };
  return `<link rel="canonical" href="${canonical}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${ROCKIMALS_ORIGIN}${paths.en}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Rockimals">
<meta property="og:locale" content="${escapeHtml(LANDING[locale]?.ogLocale ?? locale)}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(ui.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`;
}

/**
 * Renders one locale's page. `today` is the build's UTC date; when the data is
 * older (a failed fetch kept the last good list), the page says so.
 */
export function renderRockimalsToday({ locale, data, today }) {
  const ui = ROCKIMALS_TODAY_UI[locale];
  const blogUi = ROCKIMALS_ARTICLE_UI[locale];
  const landing = LANDING[locale];
  if (!ui || !blogUi || !landing || !APP_STRINGS[locale]) throw new Error(`Unsupported Rockimals today locale: ${locale}.`);
  validateRockimalsTodayData(data);

  const shown = rockimalsTodayShown(data.visitors);
  const total = data.visitors.length;
  const day = formatDay(locale, data.date);
  const stale = data.date !== today;
  const title = `${ui.title} · Rockimals`;
  const canonical = `${ROCKIMALS_ORIGIN}${rockimalsTodayPath(locale)}`;
  const storeUrl = rockimalsAppStoreUrl(`web_today_${locale.toLowerCase()}`);
  const lead = total === 0
    ? ui.empty
    : fill(plural(locale, stale ? ui.leadPast : ui.leadToday, total), { count: total, date: day });
  const notes = [
    stale ? `<p class="rkt-stale" role="status">${escapeHtml(ui.stale)}</p>` : '',
    total > shown.length ? `<p class="rkt-note">${escapeHtml(fill(ui.shownClosest, { shown: shown.length }))}</p>` : '',
    total > 0 ? `<p class="rkt-note">${escapeHtml(ui.heroNote)}</p>` : ''
  ].filter(Boolean).join('\n        ');

  return `<!doctype html>
<html lang="${escapeHtml(locale)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
${ROCKIMALS_SMART_APP_BANNER}
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(ui.description)}">
${renderSeo({ locale, ui, title, canonical, data })}
<meta name="theme-color" content="#07101d">
<link rel="icon" type="image/png" href="/assets/products/rockimals-icon.png?v=20260919">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&amp;family=Inter:wght@400;500;600;700;800&amp;family=Noto+Sans+JP:wght@400;600;700&amp;family=Noto+Sans+KR:wght@400;600;700&amp;family=Noto+Sans+SC:wght@400;600;700&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/rockimals-blog.css?v=20260922-toc">
<link rel="stylesheet" href="/css/rockimals-today.css?v=20260924">
</head>
<body class="rkb-page rkt-page">
<a class="rkb-skip" href="#today-content">${escapeHtml(ui.skip)}</a>
<header class="rkb-header">
  <div class="rkb-wrap rkb-nav">
    <a class="rkb-brand" href="${rockimalsProductPath(locale)}"><img src="/assets/products/rockimals-icon.png?v=20260919" alt="" width="42" height="42"><span>Rockimals</span></a>
    <div class="rkb-nav-actions"><a class="rkb-back" href="${rockimalsBlogIndexPath(locale)}">${escapeHtml(blogUi.blog)}</a>${renderRockimalsLanguageMenu({ activeLocale: locale, paths: rockimalsTodayPaths(), ariaLabel: ui.language })}</div>
  </div>
</header>
<main id="today-content">
  <header class="rkb-hero rkt-hero">
    <div class="rkb-stars" aria-hidden="true"></div>
    <div class="rkb-wrap rkb-hero-inner">
      <p class="rkb-kicker">${escapeHtml(ui.kicker)}</p>
      <h1><time datetime="${escapeHtml(data.date)}">${escapeHtml(fill(ui.heading, { date: day }))}</time></h1>
      <p class="rkb-deck">${escapeHtml(lead)}</p>
      ${notes}
    </div>
  </header>
  <div class="rkb-wrap rkt-groups">
    ${rockimalsTodayGroups(shown).map((group) => renderGroup(locale, ui, group)).join('\n    ')}
  </div>
  <aside class="rkb-wrap rkt-cta" aria-labelledby="rkt-cta-title">
    <h2 id="rkt-cta-title">${escapeHtml(ui.ctaTitle)}</h2>
    <p>${escapeHtml(ui.ctaText)}</p>
    <a class="rkb-app-store" href="${escapeHtml(storeUrl)}" rel="noopener" data-rockimals-cta="app-store"><img src="/assets/products/download-on-the-app-store.svg" alt="${escapeHtml(landing.appStore)}" width="180" height="60"></a>
  </aside>
  <p class="rkb-wrap rkt-source">${escapeHtml(ui.source)}</p>
</main>
<footer class="rkb-footer"><div class="rkb-wrap"><span class="rkb-footer-credit">© 2026 Rockimals</span><span>${escapeHtml(blogUi.footer)}</span></div></footer>
</body>
</html>
`;
}
