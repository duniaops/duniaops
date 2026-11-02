# Organic Growth Week 09 — Day-60 Production Gate

**Status:** In progress — Monday production audit and early GA4/private-ledger capture performed 2 November. All 14 planned Day-60 core assets are live; live HTTP, canonical and sitemap checks pass for all 14. Search Console's latest complete date is 31 October (last updated about three hours before capture), so today's W04/W05 28-day and W07 14-day reads are partial by one day. W05 custom-software service is now indexed; W03 support-takeover and W05 cost articles remain URL-unknown despite passing live URL tests and public sitemap inclusion. W08 pages are not yet on Google, with first performance observations due 5 November. Desktop visual and keyboard skip-link checks passed for the revised W08 pages; mobile visual and screen-reader runtime checks remain open for 4 November. GA4 compares 5 October–1 November with 7 September–4 October; the private ledger is reconciled to 5 tests, 1 unresolved enquiry, 0 qualified and 0 qualified-organic enquiries. Full GSC refresh, review/link verification, page-age decision and final priority order remain due 5 November.
**Type:** Programme Gate / Measurement / Recovery
**Priority:** P1
**Scheduled:** 2–8 November 2026; execution Day 60 is 5 November.
**Primary publication:** No planned net-new content. Complete any missing core asset first, then make one evidence-led indexing, link, snippet or conversion improvement.
**Depends on:** Weeks 01–08 and the Day-60 core-production checklist

## Outcome

Finish core production, prevent quiet scope slippage and allocate the final 30 days from comparable evidence rather than content volume.

## Weekly Deliverables

- [x] Audit every Day-60 core asset as live, blocked or missing.
- [x] Give every exception one owner, cause and earliest credible completion date.
- [x] Capture rolling-28-day versus previous-28-day programme data with exact end dates.
- [ ] Capture page-age cohorts and avoid comparing assets with materially different time live.
- [x] Complete the highest-value missing asset before optional optimisation.
- [ ] If the gate is complete, implement one documented early-signal improvement.
- [ ] Rank Week 10–12 priorities across indexation, CTR, conversion, proof and authority.

## Working Schedule

### Monday — production audit

- Check source, live URL, validation, CTA, internal links, index state and cohort dates for every required asset.
- Freeze recovery order using service page > broken conversion/indexing > supporting article > optional polish.

### Tuesday — close the highest-value gap

- Finish the top missing or blocked asset where authority/evidence exists.
- Otherwise diagnose the strongest crawl, indexing or intent problem.

### Wednesday — Day-60 measurement

- Capture GSC, GA4, qualified leads, citations and reviews using exact complete data windows.
- Separate programme movement from page-age cohorts.

### Thursday — Day 60 and improvement

- Confirm the gate state on execution Day 60.
- Implement and validate one evidence-led change only after the core gap is closed.

### Friday — close and allocate

- Verify the completed asset or optimisation live and record its future comparison date.
- Enter Day-60 values and Week 10–12 priority decisions in the master file.
- Update Completion Record and master tracker.

## Acceptance Criteria

- [x] Every core asset is live or has an explicit blocker, owner and date.
- [x] Missing commercial/conversion work outranks optional new content.
- [ ] Day-60 data uses comparable complete windows and page-age caveats.
- [ ] The selected improvement has a written observation, hypothesis and expected signal.
- [ ] `npm test`, applicable content/site/link/mobile/desktop and `git diff --check` pass.
- [ ] Live evidence, Day-60 decision and Week 10–12 order are recorded.

## Completion Record

Record production-gate score, exceptions/owners/dates, Day-60 metrics, cohort ages, chosen improvement/hypothesis, validation, commit/deploy, live state and final-30-day priority order.

### Week 09 pre-gate carry-in — 30 October 2026

- **Production inventory:** W04 DevOps service/article and W08 proof/checklist are now reconciled as live; the W04 records previously labelled local/unpublished are superseded by Spec 007 and the asset-register 30 October record. No core publication is currently waiting to be written, approved, committed or deployed. No new article is planned for the gate week.
- **Known evidence exceptions:** W04 exact first-live 7/14-day performance reads were not recorded; retain `NOT VERIFIED`. W04 article's 28-day check is due 2 November and service's 4 November. W05 cost article remains `Discovered – currently not indexed` in its 26 October inspection; exact 28-day check is due 6 November. W08 first Search Console check is due 5 November. Do not conflate crawl/index status with performance or claim an enquiry from a form test.
- **Manual release checks:** W08 revised-image desktop/mobile rendering and keyboard/assistive-technology smoke review are NOT VERIFIED; owner Ibrahim Uylas, due 30 October. Browser automation is unavailable in this session, so repository tests do not close this check.
- **Day-60 measurement:** on 5 November, Ibrahim captures the rolling 28-day and prior 28-day GSC/GA4 windows using complete-data dates, reconciles only qualified organic enquiries, and records page-age cohorts for live assets. Label missing or inaccessible account data `NOT VERIFIED`; do not invent values. Include current sources, capture freshness, owner, change annotations and next 7/14/28-day dates.
- **Week 09 first task:** on Monday 2 November, audit every core asset against the source path, live URL, CTA, canonical/sitemap, production HTTP and current Search Console state; then set exception owners/dates and freeze recovery order before considering an optional improvement.

### Monday production audit and Search Console observations — 2 November 2026

- **Core production audit:** the 14 Day-60 assets in Specs 019 and the source specs are all present in production. Read-only live checks returned HTTP 200 for all 14; each canonical matches the intended URL and every URL is present in the public sitemap. No core page, approval, content draft, commit or deployment is missing. Production readiness is 14/14. Latest recorded URL Inspection states show 10/14 indexed (9 from earlier dated checks plus W05-A today); four URLs currently report not on Google: W03-B, W05-B, W08-A and W08-B. The W08 pages were first live only four days ago; their first scheduled performance observation remains 5 November.
- **W03-B indexing exception:** source `content/blog/can-a-new-company-maintain-software-it-did-not-build.md`; live `https://www.duniaops.com/blog/can-a-new-company-maintain-software-it-did-not-build`; first live 11 September; owner Ibrahim Uylas; change annotation `W03 support-takeover publication`. URL Inspection on 2 November says `URL unknown to Google`, with no referring sitemap/page reported. The public sitemap contains the canonical URL. Live URL test at 10:31 BST says available to Google and indexable, with one valid Breadcrumbs item. Cause remains NOT VERIFIED; no indexing request was made. Ibrahim owns diagnosis by 4 November.
- **W04-B 28-day performance observation:** source `content/blog/kubernetes-consultant-or-permanent-hire-uk.md`; live `https://www.duniaops.com/blog/kubernetes-consultant-or-permanent-hire-uk`; first live 5 October; owner Ibrahim Uylas; annotation `d89566f` / production publication. Search Console Web exact-page window 5–31 October: 112 impressions, 0 clicks, 0% CTR, average position 31.6; report last updated about 3 hours before capture. This is 27 of the 28 calendar dates because 1 November is not yet processed; record as PARTIAL, not a completed cohort. Recheck 4 November.
- **W05-A 28-day performance and index observation:** source `services/custom-software-development.html`; live `https://www.duniaops.com/services/custom-software-development`; first live 5 October; owner Ibrahim Uylas; annotation `d89566f` / production publication. Search Console Web exact-page window 5–31 October: 13 impressions, 0 clicks, 0% CTR, average position 76.7; report last updated 3.5 hours before capture. The performance window is one date short and remains PARTIAL until 1 November is processed. Unlike the 13 October snapshot, URL Inspection on 2 November now says the URL is on Google and indexed, with one valid Breadcrumbs item. Recheck the complete performance window 4 November.
- **W05-B index exception:** source `content/blog/bespoke-software-development-cost-uk.md`; live `https://www.duniaops.com/blog/bespoke-software-development-cost-uk`; first live 9 October 2026 16:39 BST; owner Ibrahim Uylas; annotation `8c678cb` / deploy `6ac90a9431a9180008315a26`. URL Inspection on 2 November says `URL unknown to Google` and reports no referring sitemap/page, although the public sitemap contains the canonical URL. Live URL test at 10:30 BST says available to Google and indexable, with one valid Breadcrumbs item. Discovery cause remains NOT VERIFIED; no indexing request or resubmission was made. The 28-day performance cohort is due 6 November; Ibrahim owns diagnosis/recheck.
- **W07 14-day post-revision observations:** all three sources were revised 19 October by `c145541` / deploy `6ad600380c53a989007003c6`, owner Ibrahim Uylas. Search Console Web exact-page windows 19–31 October (13 of 14 dates; latest complete date 31 October, report last updated about 3 hours before capture): W07-A `content/blog/software-project-rescue-uk.md` → `https://www.duniaops.com/blog/software-project-rescue-uk`: 1 impression / 0 clicks / 0% CTR / position 59.0; W07-B `content/blog/when-to-hire-devops-consultancy-uk.md` → `https://www.duniaops.com/blog/when-to-hire-devops-consultancy-uk`: 8 / 0 / 0% / 22.4; supporting service `services/devops-and-cloud-consultancy.html` → `https://www.duniaops.com/services/devops-and-cloud-consultancy`: 73 / 0 / 0% / 62.0. The W07 14-day observations remain PARTIAL pending 1 November processing; refresh on 4 November. These low-volume signals do not establish impact or justify a snippet change.
- **W08 revised-image and keyboard review:** owner Ibrahim Uylas; first live 29 October 2026 15:39:59 BST; source paths, URLs and visual-revision annotation `W08 visual refresh` are recorded in Specs 011/019. On desktop, the proof page's labelled architecture diagram renders legibly and the resource illustration loads after initial image loading; page hierarchy and CTAs are coherent. The keyboard focus reaches the skip link on both pages; activating it on the checklist moves to `#main-content`. The accessibility tree exposes descriptive image text, headings, links and checklist controls. Mobile visual review and VoiceOver/screen-reader runtime review remain NOT VERIFIED because this session did not provide a mobile viewport or screen-reader session. Ibrahim owns those checks by 4 November. No form was submitted and no external state was changed.
- **Day-60 data and decisions:** complete site-level GSC/GA4 comparisons and private-ledger reconciliation were captured 2 November (details below). Refresh the current complete GSC window and due page-age cohorts on 4 November, then freeze the Week 10–12 priority order on 5 November. Preserve source-specific cut-offs and freshness; do not infer missing data. Tuesday's first diagnostic is the crawl/discovery mismatch on W03-B and W05-B. No new article or optional optimisation is authorised by today's evidence.
- **Validation and close:** repository-native `npm test` and `git diff --check` are still to be run for the Thursday/Friday gate close; no public source changed today. Update this Completion Record and the master tracker after the 4 November rechecks and again at Friday close. Change annotation: `Week 09 Monday production audit and partial GSC cohort capture`, 2 November 2026.

### Monday GA4 and private-lead pre-capture — 2 November 2026

- **Search Console programme comparison:** Search Console Web, property `sc-domain:duniaops.com`; captured 2 November, last updated 3 hours before capture. Current complete window 4–31 October: 7 clicks, 1.22k impressions as rounded by the UI, 0.6% CTR, average position 57.3. Previous 28 days 6 September–3 October: 4 clicks, 354 impressions, 1.1% CTR, average position 36.2. Visibility expanded (+3 clicks and roughly +866 displayed impressions) while average position and CTR weakened; new pages and low-ranking impressions change the mix, so this is not evidence to rewrite snippets site-wide. Query rows are incomplete by design; use page totals for the formal read. Five exact-page observations remain partial through 31 October and need refresh 4 November.
- **Highest corporate-page impression gains:** the GSC Pages comparison (same windows) shows AI Software Development service 235 vs 53 impressions (+182), AI consultant-vs-development-company article 180 vs 0, DevOps service 160 vs 123 (+37), AI prototype-to-production article 137 vs 0, and Application Support service 130 vs 14 (+116); all listed pages had 0 clicks in the current window. These are discovery signals, not proof of demand or a reason to create more content. Validate page-age/index state and visible query positions before the Thursday priority decision.

- **GA4 source/window:** `DuniaOps - GA4`, Traffic acquisition report, Europe/London; captured 2 November at 10:49 UTC. Current complete prior-day window 5 October–1 November 2026: 33 sessions, 21 engaged sessions, 63.64% engagement rate, 53 seconds average engagement, 193 events and 4 key events. Organic Search: 5 sessions, 5 engaged, 37 events and 2 key events. AI Assistant: 1 session, 1 engaged and 1 key event. Previous 28-day window 7 September–4 October: 61 sessions, 40 engaged, 65.57% engagement rate, 1m17s average engagement, 485 events and 3 key events; Organic Search had 3 sessions, 1 engaged session and 1 key event. Both windows are after the 7 September timezone change. GA4 is consented and directional; key events are not qualified enquiries and are not joined to individual submissions.
- **Private lead reconciliation:** Netlify `project-enquiry` has 6 verified submissions as of 2 November; the restricted ledger now records 5 measurement tests, 1 unresolved genuine enquiry, 0 qualified enquiries and 0 qualified organic enquiries. The latest non-test record is conservatively `unresolved / insufficient_evidence`, category `unknown`, landing group `home`, channel `non_organic`, GA source/medium unavailable; the private referrer suggests an AI-assistant referral but no session-level identity join was attempted. The PII-free row uses the Netlify ID only inside the restricted sheet. Owner Ibrahim Uylas; next action `reply` / review service fit, due 2 November. No reply was sent.
- **Public citations/reviews spot-check:** a focused web search on 2 November surfaced [the DuniaOps LinkedIn company profile](https://uk.linkedin.com/company/duniaops) and [The Org profile](https://theorg.com/org/duniaops-solution-and-consulting-ltd). No independent review result appeared in that bounded result set; this is not proof that none exists and is not an exhaustive directory audit. Search Console Links report captured 2 November shows 3 external links to the homepage (2 from crunchbase.com, 1 from selling.com) and 281 internal links; this supersedes the 6 September snapshot. No review request or directory change was made.
- **Gate state:** comparable complete site-level 28-day GSC and GA4 programme windows, the private ledger, current GSC links and a bounded public-profile check are captured. The Day-60 gate remains open until due page-age cohorts are refreshed, W08 mobile/assistive-technology checks and W03/W05 discovery diagnosis are recorded, the unresolved enquiry is reviewed/replied to, and the evidence-led Week 10–12 priority order is written. Recheck page cohorts/index issues on 4 November; finish the Day-60 decision and update both this Completion Record and Spec 003 on 5 November.
