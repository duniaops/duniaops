# Topic 30 editorial brief — Rockimals without internet

- **Decision date:** 13 November 2026, Europe/London. Prepared an eight-language draft for the 16 November Monday window. The user then explicitly approved publishing it on 13 November after reviewing the revised visuals.
- **Reader and intent:** a parent or carer who wants to use Rockimals during travel without a connection. Answer what will work, what must be downloaded first, and how to test the actual device.
- **Original angle:** an actionable pre-travel checklist that separates the sample Radar sky, bundled first chapters, downloaded chapters, separately downloaded narration, live data, purchases and access rights. The getting-started article only mentions offline use briefly; the story-unlocking article focuses on progression. Link both as related reading.
- **Overlap and measurement:** no second general getting-started page or unlimited-offline claim. After publication, review the article's search visits, related-guide click-through and store CTA at the programme's 4/8/13-week checks. No search-volume estimate is asserted.

## Product and source review

- Apple's public [UK App Store listing](https://apps.apple.com/gb/app/rockimals-kids-space-stories/id6792505608) and [lookup API](https://itunes.apple.com/lookup?id=6792505608&country=gb) returned **iOS 1.5.8**, released **12 November 2026 16:48:57 UTC**, when checked on 13 November. Its description says the app works offline with sample sky data, each hero's first chapter and previously downloaded chapters. The release notes describe expanded narration languages, but this guide avoids promising narration for a particular chapter or locale.
- The public [Google Play listing](https://play.google.com/store/apps/details?id=com.duniaops.rockimals), checked 13 November, confirms Android availability and the same general offline description; its public page does not reliably expose an installed version number. Do not equate Android with iOS 1.5.8.
- The read-only game-repository snapshot `cb7694f82d94da9de1ba654b50baac93de7dc0b2` was inspected rather than modifying its active, dirty worktree. `lib/data/asteroid_repository.dart` and `lib/data/fallback_asteroids.dart` distinguish live/cached data from a bundled sample sky. `lib/features/heroes/hero_library_host.dart` reports chapter readiness, a **Download** action, and a connection error for a failed offline download. `lib/features/stories/story_reader_narration.dart` separately prepares audio and checks whether it is ready offline and still permitted by access. Localized strings in `lib/l10n/app_*.arb` confirm the chapter-download and narration-ready language.
- The article's practical airplane-mode test is advice for checking one's own device, not a claim that a physical-device test was performed here. Neither a new chapter, every game, all narration, restored subscription access, nor all live visitor data is promised offline. Saved Plus media is not described as permanently owned.
- NASA's data is invoked only for the real-visitor versus sample-sky boundary. No new astronomy measurement is made. The animal characters and stories are fiction; no NASA affiliation or endorsement is implied.
- Source and translation review was done against the product's `localizedTerms` reference and current app string keys. An independent native-speaker review and a physical-device check remain unclaimed. Recheck the public store and installed app immediately before publication if the release changes.

## Visual package

- Shared textless cover: `assets/rockimals-blog/rockimals-offline/cover.jpg`, 1200 × 630 JPEG, SHA-256 `4e318d23aac8b29a1867c07627c70ba8694de12ad9e35a08c91981d3934f3570`. It illustrates **Barney** and **Enoli** around a storybook.
- In-article `story-ready.jpg` (1200 × 675, SHA-256 `f09e2967b99fa48132b4fd2eccc554d3a06bc9980e8d47627fe43a36022f61f2`) illustrates **Kito** preparing a story; `sample-sky.jpg` (1200 × 675, SHA-256 `ff1eddd0016b1069daaf1278972d7c670e2bd710319fb0f4d0f03b38f6c98a30`) illustrates **Niko** and **Tavi** in an example sky. Their alt text and captions are localized in all eight drafts.
- Generated as editorial illustrations on 13 November using ImageGen, with the Rockimals 1.5.8 Turkish App Store campaign images `production-final/tr/iphone/01.png`, `02.png` and `03.png` as character/style references. The hero also referenced the earlier exact-sprite cover. The final JPEG assets and their hashes above are the publication sources; technical JPEG conversion and downsampling used `sips`.
- The art is inspired by, not copied from, the official character renders. It does not depict an actual app screen, downloaded status or live near-Earth object data. Do not use these illustrations as evidence of current product behavior.

## Publication decision

The user requested publication on Friday 13 November after approving the visuals. Topic 18 was already published on Monday 9 November, so topic 30 is a one-time, user-directed second publication in that calendar week. The normal weekly limit and automation remain unchanged. The eight topic-30 sources share the actual `2026-11-13T13:19:03Z` publication and update timestamp. The public iOS 1.5.8 and Android listings, clean upstream and connected `duniaops` Netlify site were rechecked before release; validation, deployment and eight live URLs must still pass before success is reported.

After opening the publication fields, `npm test` passed: 10 publishable Rockimals topics, 80 localized article pages and 354 validated public files. A separate generated-output check found all eight new blog cards and sitemap entries, each page's self-canonical and reciprocal language alternatives, and all three image assets. Production deployment and live HTTP verification remain the final release checks.

## Preparation verification — 13 November 2026

- `npm run preview:rockimals-blog-drafts` generated all eight private topic-30 pages. Each page has its own locale, title, localized cover alt text and one H1. The Turkish preview was visually inspected in the browser: full cover, store badges, contents list and article text render without clipping in the observed desktop view.
- `npm run check:rockimals-blog` passed: 80 sources, nine publishable topic packages and topic 30 held as an all-draft tenth package. `npm test` passed the full site build and internal-link checks; the public output still contains 72 article pages from the nine previously published topics. Topic 30 is absent from the public sitemap and indexes.
- This was editorial preparation, not an independent native-speaker or physical-device acceptance. The public iOS version and Android availability were rechecked before the user-directed early publication.

## Visual revision — 13 November 2026

- Replaced the simple cover with the richer Barney/Enoli storybook illustration and added the Kito preparation scene and Niko/Tavi sample-sky scene to each of the eight localized drafts. Each new image has localized alt text and a caption distinguishing illustration from app behavior or live data.
- The Turkish desktop preview was visually checked after updating the article stylesheet cache key. The two inline illustrations fit the 720 px reading column with rounded corners and readable captions. At the 700 CSS-pixel responsive viewport, the document measured 670 px wide and both illustrations 630 px; no horizontal overflow was observed in the DOM. The browser's narrow screenshot capture did not render, so a physical/mobile visual acceptance is still unclaimed.
- `npm run preview:rockimals-blog-drafts` generated all eight localized previews. A direct file check found the three assets in every draft and the two inline illustrations in every preview. `npm test` passed the full content, article, build, sitemap and link checks. Topic 30 remains `draft: true` in eight locales and is absent from the public sitemap.
