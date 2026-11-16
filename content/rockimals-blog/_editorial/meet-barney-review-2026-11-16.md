# Topic 39 — language and phone review

**Date:** 16 November 2026, Europe/London. **Result:** PASS for the requested AI-assisted editorial review and browser phone-layout checks. The owner has now approved the exact cover and spoiler boundary and authorized committing and pushing that approval record. All eight articles remain drafts until the **23 November 2026, 10.00 Europe/London** conditional automatic publication run. No immediate publication or deployment is authorized.

This records an editorial review by the authoring agent, not an independent native-speaker sign-off. Phone evidence comes from browser emulation with verified CSS viewport dimensions, not a physical handset or mobile Safari/Chrome installation.

## Language review

Each complete source was reread against chapter one's first three scenes in the committed 1.5.8 catalog, the localized `heroNameFox` and `heroLibraryTitle` app strings, and the shared brief. Titles, descriptions, alt text, questions, CTA labels and local guide links were included. The character identity, garden → hill → packing sequence, optional out-of-app activity and conditional Radar/library directions remain aligned in all eight versions. No departure, chapter-ending scene or season ending was added; the supporting rabbit remains unnamed. No new access, narration or daily-availability promise was introduced.

| Locale | Editorial result and corrections | Product names checked |
| --- | --- | --- |
| en | PASS. Replaced the unnatural question-section heading and “tell a different possibility” with idiomatic shared-reading language. British spelling retained. | Barney; Radar; Story library |
| tr | PASS. Rewrote the fox's physical description, the curiosity sentence and the fiction introduction in natural Turkish. The requested title remains unchanged. | Barney; Radar; Hikâye kitaplığı |
| ja | PASS. Simplified the question wording, made the shared-reading instruction clearer and smoothed the encounter sentence. The proper name is introduced as バーニー（Barney）. | バーニー; レーダー; おはなしライブラリー |
| ko | PASS. Clarified that Barney is the subject of the imagined question and improved the chapter-reading sentence. The proper name is introduced as 바니(Barney). Phone word breaks were corrected as described below. | 바니; 레이더; 이야기 도서관 |
| zh-Hans | PASS. Made the packing detail and the question about the sky more natural. The proper name is introduced as 巴尼（Barney）. Current 故事图书馆 is retained instead of the older blog-reference term. | 巴尼; 雷达; 故事图书馆 |
| fr | PASS. Reworked the introductory invitation and preparation heading. Added French nonbreaking punctuation spacing so the title's colon stays with Barney. | Barney; Radar; Bibliothèque d’histoires |
| de | PASS. Made the family-facing plural address consistent in the title, description, opening and CTA; the questions still address the individual child. | Barney; Radar; Geschichtenbibliothek |
| es | PASS. Replaced the backpack metaphor in the heading with preparation wording that does not imply an illustrated backpack. Family-facing Peninsular Spanish register remains consistent. | Barney; Radar; Biblioteca de historias |

Localized cover alternatives still match `meet-barney-assets.json`; none changed. The source snapshot and art hashes remain those recorded in the brief and asset manifest. Existing articles, catalog sources and the historical product-reference file were not edited.

## Phone layout and navigation

The earlier 750 px browser limitation was resolved using the selected tab's supported device-metrics override. The page reported exactly the requested `innerWidth`, document client width and scroll width in every case. Viewport metadata remains `width=device-width,initial-scale=1`.

| Locale | 320 × 568 | 390 × 844 | 430 × 844 | 320 px language menu | 390 px contents / footer |
| --- | --- | --- | --- | --- | --- |
| en | PASS | PASS | PASS | PASS | PASS |
| tr | PASS | PASS | PASS | PASS | PASS |
| ja | PASS | PASS | PASS | PASS | PASS |
| ko | PASS | PASS | PASS | PASS | PASS |
| zh-Hans | PASS | PASS | PASS | PASS | PASS |
| fr | PASS | PASS | PASS | PASS | PASS |
| de | PASS | PASS | PASS | PASS | PASS |
| es | PASS | PASS | PASS | PASS | PASS |

- **24 layout cases:** one H1, loaded 1200 × 630 cover, and no horizontal overflow or clipped title, prose, lists, store badges or related-card area. Screenshots at 390 px were inspected for every locale's title/cover, question section and footer. CJK glyphs and punctuation rendered; Korean words no longer break in the middle. The cover retains its full composition at phone width.
- **Typography fix:** `css/rockimals-blog.css` applies `word-break: keep-all` only to Korean article hero and reading-layout containers. Inherited `overflow-wrap: anywhere` remains a fallback for exceptionally long tokens. The computed H1 rule was `keep-all` for KO and `normal` for every other locale at all three widths. Article stylesheet cache revision changed to `20261116-korean-wrap`. Blog indexes, Today pages and non-Korean article wrapping are outside this selector.
- **Eight small-screen menus:** every menu opens, stays entirely inside 320 × 568 and offers eight links to the same draft topic. TR → KO navigation was activated and verified at 320 px. Menu and link activation used keyboard controls; the in-app browser does not support raw touch-event injection, so touch-device acceptance is not claimed.
- **Eight contents links:** each question-section link reaches its actual localized heading, with the heading at the 24 px scroll margin. Navigation screenshots used reduced-motion mode to avoid capturing an unfinished smooth-scroll animation. Normal-motion layouts were also measured before the reduced-motion navigation pass.
- **Eight page bottoms:** the two related posts, localized contextual Radar image, store bar and footer are reachable. Contextual images loaded in all eight locales. Footer positioning was checked with a 1 px tolerance for fractional CSS rounding. The draft-only 2099 footer date remains a placeholder, not a scheduled publication.
- Device metrics and the temporary reduced-motion preference were cleared after testing; the retained tab was returned to the Turkish draft at its normal viewport.

Local evidence is in `.rockimals-blog-preview/meet-barney-phone-review/`: `layout-checks.json`, `footer-checks.json`, and per-locale `*-390-top.png`, `*-390-reading.png`, `*-390-footer.png`; `tr-320-language-menu.png` records the smallest menu. These ignored preview files are not production sources.

## Validation and publication boundary

- `npm run preview:rockimals-blog-drafts`: PASS, eight private pages rebuilt after the copy edits.
- `npm test`: PASS, exit 0, 58 tests passed, zero failed/skipped; 88 source files, 10 publishable topics, 80 public article pages, 355 public files validated. Log: `/tmp/rockimals-meet-barney-review-npm-test.log`.
- Separate checks cover the final source flags/timestamps, localized names and library terms, the eight meaningful body-link targets, the cover/alt manifest, the 24-case phone matrix and the continued absence of topic 39 from public article routes and sitemap.
- All eight `draft` fields remain `true`; both timestamps remain `2099-01-01T10:00:00Z`. No publication fields were opened. Private pages remain `noindex,nofollow` and the loopback server is not a deploy.
- The requested language and phone checks are complete. The owner approval below closes the cover/spoiler item. Publication remains conditional on fresh runbook checks on 23 November; independent human/native-speaker and physical-device review are not represented as completed.

## Owner approval — 16 November 2026

- The project owner explicitly approved the cover and spoiler boundary in this chat: “Kapak ve spoiler sınırını onaylıyorum.” The earlier `pending` owner-approval state is closed.
- Approved cover: `assets/rockimals-blog/meet-barney/cover.jpg`, SHA-256 `f6e7f344e5234c8cceb8cdcba9329e9bfe91191d66ae1bafb9df4a469c02ff46`. No artwork changed to record this approval.
- Approved spoiler scope: the eight reviewed introductions cover only the opening garden, hill and packing scenes; no departure, chapter-ending scene or season ending. The reviewed article hashes below remain unchanged.
- The owner authorized committing and pushing only these approval records. The eight Markdown sources must stay `draft: true`, with their existing placeholder timestamps, until the **23 November 2026 at 10.00 Europe/London** scheduled publication run. No immediate deploy is permitted.
- That run must still verify the clean main/upstream, same-week publication limit, current product/store evidence, candidate completeness, previews, tests and eventual live URLs/canonical/language alternatives/sitemap according to the runbook. This editorial approval is not a claim that the future operational checks or physical-device/native-speaker acceptance have passed.

## Reviewed source hashes

SHA-256 of the final reviewed Markdown sources:

| Locale | SHA-256 |
| --- | --- |
| en | `059679ce4931d3b3abfb21b408f21275accd427bb7d9af4482ce529464b60991` |
| tr | `3cd6ae0aec75d0ce9fd6c727bbd207a5d032f009ee872b9c495f11a6e9557bf9` |
| ja | `8a639b90f7a362a0c5d56ec3ec80e2693b3db046c908ed963afb6226fcb48871` |
| ko | `1c338edca01faa6fe0055db6ce76bebdd083b208ab309436aca44bf21173c222` |
| zh-Hans | `800fe4e7aeb1a9835cb661b9063f70c9b6e6321f940bbe81fc6d5f91c0258ea2` |
| fr | `70652e5c30632999d6b62c85f8ad8803a77c4e796fa495d3d904b33497f5c363` |
| de | `d5f706990703c26ad10147936395438ad85fcf9e2dc8757dc249ccc4fe5437ab` |
| es | `0402208ea11e3b65d84dffd0f8245e803e571b2c3355073229b3aec9e1e94d36` |
