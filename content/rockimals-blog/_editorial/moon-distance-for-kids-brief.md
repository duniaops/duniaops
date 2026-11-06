# Topic 18 editorial brief — measuring space with Moon distances

- **Decision date:** 6 November 2026, Europe/London. Prepare the next eight-language draft package for the 9 November Monday window. Do not publish during preparation.
- **Reader and intent:** a parent or teacher helping a child interpret a space visitor's distance from Earth. The article must answer the question without requiring the app.
- **Original angle:** NASA Space Place already explains how far the Moon is. This guide instead turns a visitor label such as 0.5 or 2 lunar distances into a small paper ruler activity, then explains what the label does and does not say. Topic 15 defines an asteroid; topic 17 covers diameter. This topic covers closest-approach *distance*, avoiding overlap with size and the future near-Earth-object topic 20.
- **Search check:** English, Turkish, French and Japanese result samples were inspected on 6 November. NASA's children's Moon-distance explanation and JAXA's Moon material satisfy the basic Moon fact; this article adds the visitor-label reading and Rockimals context. No search volume or ranking claim is made.

## Evidence and claim limits

- [NASA Science: Compare Earth and the Moon](https://science.nasa.gov/moon/by-the-numbers/) gives the average orbital distance as **384,400 km**. The Moon's actual Earth distance varies around that average; the number is a comparison unit, not today's live Moon position.
- [NASA Space Place: How Far Away Is the Moon?](https://spaceplace.nasa.gov/moon-distance/en/) explicitly explains that the Moon's real distance changes because its orbit is not a perfect circle. It offers a different Earth/Moon scale activity; this article's ruler instead teaches how to interpret a visitor's LD number.
- [NASA/JPL Solar System Dynamics glossary: LD](https://ssd.jpl.nasa.gov/glossary/LD.html) defines one lunar distance as **384,400 km**. Thus 0.5 LD is about 192,200 km and 2 LD about 768,800 km; these examples are arithmetic, not a forecast for named asteroids.
- [NASA/JPL close-approach API documentation](https://ssd-api.jpl.nasa.gov/doc/cad.html) distinguishes nominal close-approach distance and uncertainty limits. The article calls a visitor label its distance at closest approach, not its diameter, current position, collision forecast or a statement that the object passed near the Moon itself.
- The public [UK App Store listing](https://apps.apple.com/gb/app/rockimals-kids-space-stories/id6792505608) and Apple's lookup API showed **1.5.7** on 6 November (release timestamp 2 November 2026). The matching game release-preparation commit is `4712c622b7ebe87a3d627d3b3344aaf3164bb6ca` (`1.5.7+110`) in `../rockimals`. The current game checkout says 1.5.8+111 and is not used as evidence of a public 1.5.8 release. The public Android listing does not expose a version number reliably, so no matching Android version is asserted.
- At the reviewed 1.5.7 release commit, `lib/data/models/asteroid.dart` parses NASA's `miss_distance.lunar`, `lib/core/animals/animal_system.dart` formats it as a Moon-relative label, and `lib/features/detail/distance_comparison.dart` shows Earth, Moon and visitor markers. That track is an adaptive teaching visualization; article artwork is also illustrative. The Radar and visitor facts are free according to the public App Store description.
- Localized Radar and Moon-distance terms are checked against `lib/l10n/app_*.arb`. The English source and seven adaptations need an author-level meaning check and preview. Independent native-speaker review and a physical-device check are not claimed.

## Visual package

- Shared textless cover: `assets/rockimals-blog/moon-distance-for-kids/cover.jpg`, 1200×630 JPEG, SHA-256 `c93577213966e55d6f104bdfa0d8b6838172b18c8136ad22842aee6a6a1ef53c`.
- The deterministic renderer `scripts/render-rockimals-blog-editorial-assets.swift --moon-distance-cover-only` places **the exact approved game sprites** Tavi (`assets/animals/transparent/rabbit.webp`, SHA-256 `d32335361f412b6c3bb95fc4a9b9292db05e0d7dcddb9db7c3d10ed1ad5a9883`) and Pofi (`assets/animals/transparent/bear.webp`, SHA-256 `a05aa5403b7162275fa09240affd2c579587199c817fd5903cb57a08367000ad`) beside the game's Earth image (`assets/images/radar_earth.webp`, SHA-256 `9970be0e62a2036dd8801e73800dade275ec2192c3d174ac70725145b5626898`). All three are in the reviewed app checkout; no new character identity is generated.
- The Moon and curved line are an editorial illustration. Character positions do not represent real or proportional asteroid distances. Alt text in every locale must say so.

## Publication gate

Keep `draft: true` and placeholder publication timestamps until the 9 November runbook check confirms all eight languages, sources, visual rendering, links, current store/product version, clean Git state, Netlify access and the weekly topic limit. Publish only the oldest eligible topic. Record actual test/preview findings after preparation.

## Preparation verification — 6 November 2026

- All eight locale sources and private previews were generated. Each preview has the expected page language, one H1, the shared cover with localized alt text, live Apple and Google store badges, the 1.5.7 source note and NASA/JPL links. The article keeps the hypothetical distance examples distinct from live visitor data.
- The Turkish private preview was inspected in desktop and 390 px mobile browser views: the heading, both store badges, complete cover, distance-example bullets, sources and related article links are readable. The cover itself was inspected at its native 1200×630 size. The first mobile pass exposed horizontal scrolling in the example table; the examples were changed to bullets and checked again. Independent native-language copy review and a physical-device check have not been done.
- `npm run check:rockimals-blog` passed with 72 sources and eight publishable topic packages; this new topic remains an all-draft ninth package. `npm test` passed, built 64 public article pages from the existing eight packages and validated internal links and site routes. A separate check confirmed all eight private topic-18 previews and that neither the public sitemap nor any public locale index includes the new topic.
