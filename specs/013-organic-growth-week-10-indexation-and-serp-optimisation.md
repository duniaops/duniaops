# Organic Growth Week 10 — Indexation and Search-Result Optimisation

**Status:** Implementation released and live-verified 9 November 10:43:32 GMT: `6af1a3c6a907e3b18ed97276` at `907b4f7`. Inventory, diagnosis, contextual link and breadcrumb corrections are delivered. Week 10 remains in progress until its 13 Nov close and due observations; actual VoiceOver is NOT DONE, conversion delivery and Google enhancement-report reprocessing remain NOT VERIFIED. W06 is PARTIAL on 10 Nov (27/28 dates); Codex now owns routine execution, retries and record maintenance. Programme ownership/approval remains with Ibrahim.
**Type:** Technical SEO / Content Optimisation
**Priority:** P1
**Scheduled:** 9–15 November 2026
**Primary publication:** No quota-driven new article. Resolve the highest-value indexing/internal-link issue and publish one evidence-led title, snippet or on-page improvement where justified.
**Depends on:** Week 09 production gate and recorded Day-60 priority order

## Outcome

Make the completed asset portfolio discoverable and improve the clearest search-result opportunity without resetting useful pages blindly.

## Weekly Deliverables

- [x] Inventory live status, canonical, sitemap membership, robots/indexability and Search Console state for all 14 priority URLs, captured 9 Nov.
- [x] Investigate missing/weak indexing before any request: W03/W05 discovery is recognised, no technical exclusion found, exact crawl-selection cause remains NOT VERIFIED; W08 breadcrumb cause is confirmed. No request made.
- [x] Publish the contextual link improvement: existing commercial destinations already have supporting links; the missing service-to-guide path in `18931e3` is live-verified after the approved 9 Nov release.
- [x] Select at most one title/meta/on-page revision: HOLD optional snippet rewriting while fixing diagnosed schema/link defects; candidate W04-B and its limits are recorded below.
- [x] Record observations, hypotheses, released elements, actual release time and separate 16 Nov / 23 Nov / 7 Dec comparison dates below.
- [x] No new article commissioned or created.

## Working Schedule

### Monday — crawl and index inventory

- Compare the repository URL map, live sitemap/canonicals and Search Console URL states.
- Rank issues by commercial value and root cause.

### Tuesday — diagnose

- Inspect content uniqueness, rendered availability, internal-link depth, canonicalisation and technical exclusions.
- Freeze one technical/link fix and at most one search-snippet hypothesis.

### Wednesday — implement

- Apply approved technical and internal-link changes.
- Revise title/meta/on-page content only when the recorded evidence supports it.

### Thursday — validate and publish

- Run repository-native, live-link, XML, schema and mobile/desktop checks.
- Deploy after explicit approval and verify the exact changed surfaces.

### Friday — close

- Record live/index state, change annotation and 7/14/28-day comparison date.
- Request indexing once only where appropriate; do not repeatedly resubmit.
- Update Completion Record and master tracker.

## Acceptance Criteria

- [x] Every priority URL has a recorded live, canonical, sitemap and Search Console state (9 Nov inventory below).
- [x] The released W08 correction addresses the GSC-confirmed missing breadcrumb item URL; the link correction addresses an observed parent-link gap, not a claimed crawl cause.
- [x] Live link answers the commercial cost FAQ and points to its existing buyer guide; no generic anchor additions.
- [x] Hypotheses and evidence are recorded; no title/meta rewrite selected.
- [x] `npm test`, XML/schema/link, bounded desktop/390/320 px checks and `git diff --check` pass locally on 9 Nov. Actual screen-reader testing remains a separate open criterion.
- [x] Live result, no indexing request, actual release and separate 16 Nov / 23 Nov / 7 Dec comparison dates are recorded below; Google reprocessing is not claimed complete.

## Completion Record

Record URL inventory, diagnosed cause, selected hypothesis, exact changes, validation, commit/deploy, live/index state, indexing request date and follow-up date.

### Monday execution and review-ready changes — 9 November 2026

**Owner/approver:** Ibrahim Uylas. This work was explicitly requested in chat, following the read-only morning heartbeat. Starting branch `main` at `32f2fe2`; an unrelated Rockimals publication `3bf3e6f` arrived during work and is preserved. Full validation was repeated on the resulting checkout. Current programme phase is optimisation, execution Day 64; no future observation is called complete.

**Fresh inventory:** GET-only capture 9 Nov 09:54:53 UTC: all 14 rows below return HTTP 200, declare the listed self-canonical, occur in the 33-URL public sitemap, permit Googlebot and have no meta/X-Robots noindex. Current authenticated URL Inspection was also read for every row. `Indexed + valid` refers only to the observed Breadcrumbs item; it is not a full accessibility/conversion certificate.

| Asset | Source path | Live canonical URL | Actual publication/revision annotation retained | Google Index on 9 Nov |
|---|---|---|---|---|
| W02-A | `about.html` | https://www.duniaops.com/about | First live 8 Sep; W02 trust release `11a5ac0` | Indexed; valid Breadcrumbs |
| W02-B | `services/software-project-rescue.html` | https://www.duniaops.com/services/software-project-rescue | First live 8 Sep; W02 release `11a5ac0` | Indexed; valid Breadcrumbs |
| W03-A | `services/application-support-maintenance.html` | https://www.duniaops.com/services/application-support-maintenance | First live 14 Sep; `391212f` | Indexed; valid Breadcrumbs |
| W03-B | `content/blog/can-a-new-company-maintain-software-it-did-not-build.md` | https://www.duniaops.com/blog/can-a-new-company-maintain-software-it-did-not-build | First live 11 Sep; `596bd6a` | Discovered, not indexed; crawl N/A; sitemap/cost guide recognised |
| W04-A | `services/devops-and-cloud-consultancy.html` | https://www.duniaops.com/services/devops-and-cloud-consultancy | First release 7 Oct `350dc6f`; link revision 19 Oct `c145541` | Indexed; valid Breadcrumbs |
| W04-B | `content/blog/kubernetes-consultant-or-permanent-hire-uk.md` | https://www.duniaops.com/blog/kubernetes-consultant-or-permanent-hire-uk | First live 5 Oct; `d89566f` | Indexed; valid Breadcrumbs |
| W05-A | `services/custom-software-development.html` | https://www.duniaops.com/services/custom-software-development | First live 5 Oct `d89566f`; new local link `18931e3` not yet live | Indexed; valid Breadcrumbs |
| W05-B | `content/blog/bespoke-software-development-cost-uk.md` | https://www.duniaops.com/blog/bespoke-software-development-cost-uk | First live 9 Oct 16:39 BST `8c678cb`; displayed 5 Oct remains distinct | Discovered, not indexed; crawl N/A; sitemap/homepage recognised |
| W06-A | `services/ai-software-development.html` | https://www.duniaops.com/services/ai-software-development | First live 13 Oct 08:40 BST; visual revision 10:31 BST; `fb06c88` | Indexed; valid Breadcrumbs |
| W06-B | `content/blog/ai-consultant-vs-ai-development-company.md` | https://www.duniaops.com/blog/ai-consultant-vs-ai-development-company | First live 13 Oct 08:40 BST; `fb06c88` | Indexed; valid Breadcrumbs |
| W07-A | `content/blog/software-project-rescue-uk.md` | https://www.duniaops.com/blog/software-project-rescue-uk | Existing article; material revision 19 Oct `c145541`, not a new first-live date | Indexed; valid Breadcrumbs |
| W07-B | `content/blog/when-to-hire-devops-consultancy-uk.md` | https://www.duniaops.com/blog/when-to-hire-devops-consultancy-uk | Existing article; material revision 19 Oct `c145541`, not a new first-live date | Indexed; valid Breadcrumbs |
| W08-A | `work/fragmented-application-estate-modernisation.html` | https://www.duniaops.com/work/fragmented-application-estate-modernisation | First live 29 Oct 14:39:59 GMT `4134796`; visual revision 14:50:21 GMT `5a0b0b9`; new local fix `c76e758` | Indexed, but invalid Breadcrumbs: intermediate item URL missing |
| W08-B | `resources/software-project-handover-checklist.html` | https://www.duniaops.com/resources/software-project-handover-checklist | Same original release/visual times and annotations as W08-A; new local fix `c76e758` | Indexed, but invalid Breadcrumbs: intermediate item URL missing |

**Diagnosed issue and selected action:** GSC identifies missing `item` on the middle breadcrumb category of both W08 pages. Neither `Resources` nor `Selected experience` has an actual hub URL. Keep the real Home → page navigation, remove the category pseudo-level, renumber the final item and align visible breadcrumbs. Google permits the last item to omit its URL; [source contract](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb). Commit `c76e758` implements the correction and a semantic build check with five regression cases, so JSON syntax validity alone can no longer hide this observed defect. Hypothesis: after authorised release and recrawl, the detected breadcrumb item becomes valid. Primary signal is enhancement validity; guardrails are unchanged canonical/index eligibility, working navigation and no disclosure/copy changes. Do not claim this fixes W03/W05 crawl selection.

**Contextual link action:** live and repository Custom Software FAQ lacked a direct link to the existing cost guide, while that guide already links to the service. Commit `18931e3` adds one natural explanatory sentence/link in the cost FAQ, completing that reciprocal buyer path. It changes no offer, pricing promise, URL or title. Hypothesis: buyers can reach the scope/cost explanation from the relevant service question and crawlers gain another contextual path. Deterministic acceptance is the rendered link and correct destination; later indexing is observed separately and is not guaranteed. W03/W05 are already discovered; the exact reason Google has not crawled them remains NOT VERIFIED. No indexing request/resubmission is made.

**CTR/content decision:** Spec 018 records W04-B's fresh 146 impressions / 0 clicks / position 29.8 and visible buyer-query evidence. It is a candidate, not an instruction to rewrite. Select **zero title/meta revisions** while closing the confirmed technical/link defects; revisit 13 Nov. No new article, image or public asset was created; the maximum-two-asset constraint remains respected. No site-wide title change.

**Validation:** `npm test` PASS, including 5 new semantic regression cases, build and site/link validation of 343 public files. `xmllint --noout sitemap.xml feed.xml`, `node --check scripts/check-dist.mjs`, `node --check scripts/validate-breadcrumbs.mjs` and `git diff --check` PASS. Old production W08 schema produced the expected missing-item errors before the HTML correction. The full suite was repeated after unrelated `3bf3e6f` entered the shared checkout and passed again; no unrelated file was staged. Local Chrome default desktop was 1772×1396; all three changed pages reviewed at desktop, 390×844 and 320×740. Mobile client/scroll widths match (375 at 390, 305 at 320); no horizontal overflow. Cost FAQ opens and its new link reaches the existing article. W08 skip links receive keyboard focus, activate `#main-content` and the next Tab enters the main breadcrumb. Viewport restored. This is bounded visual/keyboard QA, not an actual VoiceOver test or full accessibility certificate.

**Release boundary:** source changes are prepared in `c76e758` / `18931e3`, not published by this task. Existing publication/visual-revision dates remain unchanged. Separate deployment authority is required by the user's instruction; commits carry `[skip netlify]` to prevent automatic deployment while preserving normal tests/hooks. The unrelated production deployment `6af19af1c62bf6d52c3097ef` is at `3bf3e6f`, published 9 Nov 10:05:53 UTC; it is not this SEO release. A fresh 10:18:46 UTC GET recheck confirms both live W08 pages still contain their old intermediate breadcrumb and the live Custom Software page still lacks the new cost-guide link. After approval, verify exact three surfaces, record actual release/deploy and set D+7/14/28 calendar dates. On release day check W08 schema immediately; recheck reported enhancement/index state at the next scheduled run and 7 days after release. No future date is backfilled from the source-edit date.

| Remaining criterion / dependency | State now | Owner | Date / next step |
|---|---|---|---|
| Publish contextual link and W08 schema fix; verify live result | DONE after explicit approval; 9 Nov 10:43:32 GMT release | Ibrahim | Deploy `6af1a3c6a907e3b18ed97276`; post-release record below |
| Google enhancement report after live W08 correction | NOT VERIFIED; live schema passes, stored report awaits reprocessing | Codex | 13 Nov, then 16 Nov revision checkpoint; no validation/indexing request |
| W03-B/W05-B crawl-selection cause/indexing | NOT VERIFIED; discovery is recognised | Codex | 13 Nov, or the first scheduled post-release read; no repeated request |
| Actual W08 VoiceOver | NOT VERIFIED / access blocked: native app access timed out 10 Nov; no running session established | Codex | Retry actual runtime 12 Nov if native access is available; no static-test substitution |
| W06/W08 end-to-end conversion delivery | NOT VERIFIED; no new production submission authorised or sent | Codex for audit/test preparation | 12 Nov; any actual production submission retains its separate approval boundary |
| W06 first 28 full dates | PARTIAL on 10 Nov; source covers 14 Oct–9 Nov, 27/28 dates | Codex | Repeat 12 Nov for the same intended 14 Oct–10 Nov range |
| W08 first 14 full dates | NOT DUE today | Codex | 12 Nov (30 Oct–12 Nov), retry 13 Nov |
| W08 first 28 full dates | NOT DUE | Codex | 26 Nov (30 Oct–26 Nov), retry 27 Nov |
| Weekly close / optional W04-B candidate decision | NOT DUE today | Codex | 13 Nov; classify all criteria from actual evidence |

The single `duniaops-seo-60-30-takip` automation was viewed ACTIVE; its existing schedule includes 10/12/26 Nov plus Monday/Friday through 11 Dec. No new reminder or external-account mutation. This Completion Record and Specs 003/007/008/011/012/018/019 are updated together. Week 10 remains **in progress**, and Day-60 has a documented late decision with manual/conversion exceptions; neither is falsely marked complete.

### Approved production release and live verification — 9 November 2026

- **Authority and release:** Ibrahim explicitly approved production publication in chat after reviewing the prepared scope. Netlify Git-triggered production deploy `6af1a3c6a907e3b18ed97276` is ready at **9 November 2026 10:43:32.083 UTC / GMT**, source `907b4f7904702afb83b32b05967bee885192bf1f` on `main`. It includes fixes `c76e758` / `18931e3`. This is the actual new revision time; original publication dates are unchanged. Standard Netlify build also regenerated the eight existing Rockimals today pages/data; no unrelated source/content edit was made in this release.
- **Live evidence:** GET checks consolidated **10:44:32 UTC** return HTTP 200, unchanged matching canonical, public-sitemap membership, robots eligibility and no noindex for the proof, checklist and Custom Software service. Both W08 live schemas/visible trails are Home → page, positions 1/2, with no invalid intermediate category. The existing semantic breadcrumb validator also passes against all three fetched live schemas. The service's cost-FAQ link is present, and browser navigation reaches the existing HTTP-200 guide. Live desktop (1613×1114), 390×844 and 320×740 checks show no horizontal overflow; mobile client/scroll widths match 375/305. W08 skip-link activation and next Tab enter main navigation. Viewport restored; no form submission or Google indexing/validation request.
- **Evidence limits:** the earlier exact-candidate `npm test` PASS (343 files, five breadcrumb cases), XML/syntax/link and local QA remain the pre-release test evidence. Netlify's production build passed; post-release HTTP/schema/browser checks pass. **Google enhancement-report reprocessing is NOT VERIFIED**: the morning stored inspection is not a fresh recrawl of this release. Actual VoiceOver remains NOT DONE per Ibrahim; conversion delivery remains NOT VERIFIED, owner Ibrahim, **12 Nov**. No GA4/GSC performance, private Sheet or customer disposition was reread during this release; earlier snapshots retain their capture dates. The full Day-60/weekly programme is not marked PASS merely because these fixes are live.
- **Separate revision observations:** owner Ibrahim. New first full daily post-revision ranges are **10–16 Nov** (7 dates, observe **16 Nov**, retry **20 Nov** if delayed), **10–23 Nov** (14, observe **23 Nov**, retry **27 Nov**) and **10 Nov–7 Dec** (28, observe **7 Dec**, retry **11 Dec** in the existing verification tail). These are for the W08 technical revision and Custom Software parent-link change; the cost guide is a monitored destination, not newly published content. Check Google enhancement/index state first on **13 Nov**, then at the revision checkpoints; no repeated indexing requests. The original W06 10 Nov, W08 12/26 Nov and W07 16 Nov cohorts remain separate. Original W08 cohorts spanning 9 Nov must carry the mid-window schema annotation. Existing Monday/Friday automation already covers all new checkpoint/retry dates; no duplicate or automation mutation.

### Routine execution handed to Codex; W06 persisted — 10 November 2026

Ibrahim's explicit instruction delegates routine checks, retry execution and record maintenance to Codex; it does not change the factual asset owner/approver or remove separate external-action boundaries. The single existing automation was updated and its saved instruction, unchanged schedule, ACTIVE state and target chat verified. Routine documentation commits/pushes follow explicit-path staging, normal upstream verification and `[skip netlify]`. Monday/Friday work is executed and recorded; reports describe actual results or genuinely necessary intervention rather than routine tasks for Ibrahim.

The W06 read from today's 09:00 heartbeat (consolidated 09:02:53 GMT) is now persisted in Spec 009 and 018: intended **14 Oct–10 Nov**, actual **14 Oct–9 Nov**, **27/28 dates, PARTIAL**; AI service **407/0/0%/75.0**, guide **258/0/0%/78.8** (impressions/clicks/CTR/position), Web (text), exact URLs, daily grain, freshness 3h. This is not a new account capture or a completed 28-day cohort. Codex repeats it on **12 Nov** and keeps all records aligned. Original first-live dates and prior rolling/short cohorts are distinct.

An actual native VoiceOver access attempt timed out; inventory then showed VoiceOver not running. No speech/rotor/announcement result or version was obtained, so runtime remains **NOT VERIFIED / access blocked**, with Codex retry at **12 Nov** if access exists. No settings were weakened or manual result invented. No new performance/lead outcome, production form submission, indexing request, site edit or deployment in this session. Documentation checks and `git diff --check` are applicable; no redundant full site test run is claimed.
