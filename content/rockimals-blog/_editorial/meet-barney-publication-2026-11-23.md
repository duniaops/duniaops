# Topic 39 — scheduled publication decision, 23 November 2026

The scheduled Monday run started at 10:04:16 Europe/London. All runbook gates before publication passed. The exact owner-approved text and artwork are reused; only the eight articles' draft, published and updated fields change. The common editorial publication timestamp is **2026-11-23T10:07:06Z** (Europe/London is UTC on this date).

## Evidence before commit

- Clean `main` equalled fetched `origin/main` at `551471f262617aaa5aa5bbc6e2b84903f9f3ceaa`; intended upstream is origin/main in duniaops/duniaops.
- Topic 39 is the oldest open candidate. Source manifest and live sitemap had 10 topics / 80 articles, latest publication 13 November. All ten English live datePublished values matched their sources; no Rockimals topic had been published in the London week beginning 23 November. Barney was absent from the live sitemap.
- Eight reviewed text hashes, the approved cover hash and all 20 committed product/story provenance hashes matched. Owner approval and the AI-assisted eight-language / 24 phone-layout review remain as documented in [the review](meet-barney-review-2026-11-16.md) and [the asset manifest](meet-barney-assets.json). Independent native-speaker and physical-device acceptance are not claimed.
- Public UK App Store/lookup still reports iOS 1.5.8, released 12 November. The App Store and Google Play descriptions corroborate Barney's fox identity, five-chapter adventure, Radar discovery and returning to discovered stories in the Library. An installed Android version is not inferred. Sources: https://apps.apple.com/gb/app/rockimals-kids-space-stories/id6792505608 and https://play.google.com/store/apps/details?id=com.duniaops.rockimals.
- `npm run check:rockimals-blog` passed; eight private previews were rebuilt and opened. Locale, title, cover/alt, localized CTA and two related guides matched; 61 local link/asset targets returned HTTP 200. The Turkish desktop preview was visually checked. No approved prose, image or spoiler scope changed.
- After opening the eight publication fields, `npm test` passed, exit 0: **62 tests passed, 0 failed**. Full build produced 11 Rockimals topic packages / 88 articles and validated 461 public files. Log: `/tmp/barney-publication-2026-11-23-npm-test.log`.
- Additional generated-output checks confirmed exactly one new eight-locale topic this week; each page has a self-canonical, eight language alternates plus x-default, two same-locale related guides, a localized index card and a sitemap entry. All eight share this actual timestamp; no 2099 placeholder remains in the generated article pages.

## Production verification boundary

The production Git deploy and subsequent live HTTP checks follow this commit. This decision record does not claim a deploy or future HTTP result before it happens. The final automation response in this chat must contain the commit, actual deployment receipt and all eight verified production URLs, or an explicit partial/failure result. Do not create a duplicate deploy if the normal push starts Git CD.

| Locale | Production target |
| --- | --- |
| de | https://rockimals.duniaops.com/de/blog/barney-neugieriger-fuchs-grosse-reise |
| en | https://rockimals.duniaops.com/blog/meet-barney-curious-fox-big-journey |
| es | https://rockimals.duniaops.com/es/blog/conoce-barney-zorro-curioso-gran-viaje |
| fr | https://rockimals.duniaops.com/fr/blog/rencontrez-barney-renard-grand-voyage |
| ja | https://rockimals.duniaops.com/ja/blog/barney-kitsune-ookina-tabi |
| ko | https://rockimals.duniaops.com/ko/blog/barney-hogisim-yeou-yeohaeng |
| tr | https://rockimals.duniaops.com/tr/blog/barney-ile-tanisin-merakli-tilkinin-buyuk-yolculugu |
| zh-Hans | https://rockimals.duniaops.com/zh-Hans/blog/renshi-barney-huli-da-lvxing |

## Measurement handoff

Use [033 — conversion measurement](../../../specs/033-rockimals-blog-conversion-measurement.md) for locale-specific search visits, related-guide visits and store CTA clicks, and [034 — weekly readiness](../../../specs/034-rockimals-blog-weekly-publishing-readiness.md) for the programme's 4/8/13-week reviews. Keep the existing programme cadence. For age-based topic follow-up, the 4/8/13-week dates from this publication are 21 December 2026, 18 January 2027 and 22 February 2027. No separate reminder is created. Search Console/store-attribution evidence was not accessed in this publication run; unknown metrics remain unknown, not zero.
