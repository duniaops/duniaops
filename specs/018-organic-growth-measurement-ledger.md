# Organic Growth Measurement Ledger

**Status:** Active — Week 01 foundation and Friday evidence recheck are complete. The retained 1 September submission is confirmed as a test, and the production taxonomy was verified end to end with a labelled Netlify/GA4 test on 11 September. Publication cohort monitoring remains open.
**Programme owner:** ibrahim uylas
**Measurement owner:** ibrahim uylas
**Depends on:** `003-organic-client-acquisition-90-day-program.md`
**Next formal checkpoint:** Day 30 in Week 05; use the latest complete source-specific data available on 6 October 2026.

This is the durable measurement contract for the organic client-acquisition programme. It records definitions, source precedence, comparable date windows, data-quality limits and decisions. It must never contain a prospect's name, email address, company, enquiry text or another direct identifier.

## Source of Truth

| Question | Source of truth | Grain | Use | Important limitation |
|---|---|---|---|---|
| Did a form submission reach DuniaOps? | Netlify Forms, verified submissions | One submission | Submission count and private follow-up | Overview timestamps can include spam activity; count the verified-submission list. |
| Is the enquiry genuine, qualified and organic? | Access-restricted `DuniaOps Organic Lead Ledger` Google Sheet reconciled to Netlify | One deduplicated enquiry | Primary business outcome | The sheet is private in the owner's `ChatGPT` Drive folder; no prospect PII is copied into it. |
| Which searches and pages receive Google visibility? | Google Search Console | Day × query/page/country/device | Impressions, clicks, CTR, position and index state | Query rows are partially anonymised; data is delayed and reported on Search Console's own date boundary. |
| What did consented visitors do? | GA4 property `DuniaOps - GA4` | Event/session/user | Directional behaviour and acquisition analysis | Optional-cookie rejection means legitimate visits and leads can be absent. |
| What was changed and when? | This ledger plus Git/deploy evidence | One material change | Attribution and cohort comparisons | Missing annotations make before/after interpretation unreliable. |

Netlify is the submission source of truth. GA4 is not a lead ledger and must remain directional under consent. A lead only counts as the programme's primary outcome after private qualification and acquisition-channel classification.

## KPI Contract

### Primary KPIs

| KPI | Exact definition and formula | Cadence | Day-90 directional target | Decision use |
|---|---|---|---|---|
| Verified qualified organic enquiries | Count of distinct Netlify-verified submissions whose private `lead_status = qualified` and `acquisition_channel = organic_search`. Duplicates count once. Test, spam, unqualified and unknown-source records do not count. | Weekly case review; rolling 28 days at checkpoints | At least 1 | The programme's outcome KPI. Scale the originating cluster only after confirming fit and source. |
| High-intent non-brand organic clicks | Sum of Search Console web clicks for the documented rescue, support, DevOps/Kubernetes, custom-software and AI buyer-intent query sets, excluding DuniaOps/product-brand queries. | Weekly observation; formal 28-day comparison | Directional increase; no guaranteed volume | Earliest reliable demand signal before lead volume is sufficient. Keep the query inclusion list stable within a comparison window. |
| Core-asset readiness | `live, crawlable and conversion-ready Day-60 core assets / planned Day-60 core assets × 100`. Index state is recorded separately and never fabricated as immediate. | Weekly | 100% live or explicitly blocked with owner/date | Protects production discipline; it is not evidence that SEO succeeded. |

### Drivers and guardrails

| Type | Measure | Interpretation rule |
|---|---|---|
| Driver | High-intent non-brand impressions by cluster/page | Rising impressions can justify protecting a page even before clicks arrive. |
| Driver | Visible-query position bands: 1–10, 11–30, 31–50 and 51+ | Movement from 51+ into 11–50 is an early signal; average position alone can hide mix changes. |
| Driver | Organic engaged sessions in GA4 | Directional only because analytics requires consent. Baseline observations used Turkey time; data after the 7 September setting change uses United Kingdom time. |
| Driver | Priority assets indexed after their 7/14/28-day checks | Investigate technical, usefulness, duplication and internal-link causes before adding more content. |
| Guardrail | Unqualified/test/unresolved share of verified submissions | Never call submission volume pipeline without private classification. Review individual cases until volume supports a rate. |
| Guardrail | One primary intent and one commercial destination per cluster | Prevents cannibalisation and thin, quota-driven content. |
| Guardrail | No PII or enquiry text in Git, GA4 or public reporting | A measurement improvement that leaks prospect data is a failure. |
| Guardrail | Claims, customer proof and response/SLA promises have approval | No ranking or conversion target overrides factual accuracy. |

## Qualification and Attribution Rules

### Lead status

- `qualified`: a genuine person or organisation asks about a paid problem within DuniaOps' supported rescue, maintenance, DevOps/cloud, custom-software or AI work, and there is enough information for a useful discovery response.
- `unqualified`: genuine but clearly outside the agreed service/market boundary, a job application, supplier pitch, link request or another non-buyer message.
- `test`: intentionally submitted to validate the form or analytics path.
- `unresolved`: authenticity, fit or duplication cannot be determined without more evidence.

Qualification does not require a known budget at first contact. A promising enquiry is not classified as qualified merely because it submitted the form; relevance and genuine buying need must be checked.

The client-side `test_submission` value is a reconciliation hint, not proof by itself. Count a submission as a test only when its time and controlled fields match an explicitly initiated test and the Netlify record is privately confirmed.

### Acquisition channel

- `organic_search`: consented GA4 session source/medium or another approved private referrer record demonstrates an unpaid search visit immediately associated with the enquiry.
- `non_organic`: reliable evidence identifies direct, referral, social, paid or another channel.
- `unknown`: source evidence is missing or conflicting. Unknown never defaults to organic.

### Approved privacy-safe private ledger

**Location:** the access-restricted native Google Sheet `DuniaOps Organic Lead Ledger`, owned by ibrahim uylas in the private `ChatGPT` Drive folder and outside the public repository. The private URL is returned in the task hand-off, not stored in Git.

| Field | Allowed value | Source / privacy rule |
|---|---|---|
| `received_at_utc` | Timestamp | Copy the submission time; retain a single normalised time. |
| `netlify_submission_id` | Netlify identifier | Private only; use as a lookup key instead of copying message content. |
| `lead_status` | `qualified`, `unqualified`, `test`, `unresolved` | Manual classification. |
| `qualification_reason` | Controlled reason code | No free-form customer text. |
| `service_category` | `rescue`, `support`, `devops_cloud`, `custom_software`, `ai`, `booking`, `mobile`, `consultancy`, `unknown` | Use an allow-listed category, not the enquiry text. |
| `landing_page_group` | Approved page/cluster slug | Derive from the landing page; do not store arbitrary query strings. |
| `acquisition_channel` | `organic_search`, `non_organic`, `unknown` | Apply the rules above. |
| `ga_source_medium` | Allow-listed source/medium or `unavailable` | Record only when consented evidence exists. |
| `owner` | Internal owner | No customer identifier. |
| `next_action` | Controlled workflow state | Use `reply`, `discovery`, `proposal`, `nurture`, `closed`, or `none`. |
| `updated_at_utc` | Timestamp | Audit the latest classification. |

Names, email addresses, company names and enquiry text stay in the access-controlled system that received them. They are not duplicated into this ledger or the repository.

## Frozen Programme Baseline

The baseline in the master programme remains frozen. Later refreshes are observations, not silent baseline replacements.

| Source | Exact window / snapshot | Frozen result |
|---|---|---|
| Search Console performance | 20 July–2 September 2026 | 472 impressions, 1 click, 0.2% CTR, 54.6 average position; 310 UK and 447 desktop impressions. |
| Search Console index/link snapshot | Available by 4 September 2026 | 10 indexed URLs; 3 Google-reported external links. |
| GA4 | 7 August–3 September 2026 | 46 sessions, 31 engaged sessions, 2 minutes average engagement; 4 `generate_lead` events from 2 UK users. |
| Qualified organic enquiries | Evidence available by 4 September 2026 | 0 verified; the four GA4 events had not been reconciled to qualified organic enquiries. |

## Week 01 Verification Snapshot — 7 September 2026

### Search Console performance

The web-search export used Search Console's `Last 3 months` filter, which covered 20 July–5 September 2026 for this young property.

- 520 impressions, 1 click, 0.2% CTR and 54.0 average position.
- 344 UK impressions with 0 clicks and 66.1 average position; 115 US impressions with the only click and 36.1 average position.
- 490 desktop, 28 mobile and 2 tablet impressions.
- The exported query table exposed 30 rows and 397 impressions. The remaining 123 impressions were not represented in visible query rows, so query-band totals below are explicitly partial.

| Visible-query band | Queries | Impressions | Interpretation |
|---|---:|---:|---|
| Positions 1–10 | 3 | 4 | Promising long-tail examples, but far too little volume to generalise. |
| Positions 11–30 | 1 | 1 | No stable page-level conclusion. |
| Positions 31–50 | 4 | 14 | Early opportunity set. |
| Positions 51+ | 22 | 378 | Most visible commercial-query impressions remain far from click range. |

### Query/page clusters

| Cluster | Current page evidence | Visible query evidence | Week 01 decision |
|---|---|---|---|
| Project rescue | Existing rescue article: 1 impression, average position 9.0 | `software rescue consultant`: 1 impression, position 9.0 | Keep the distinct buyer guide; create a commercial rescue page and strengthen reciprocal links. Treat volume as anecdotal. |
| Application support | No dedicated page or visible support query row | No dedicated visible row | Build the service and companion feasibility article; do not infer demand volume yet. |
| DevOps / Kubernetes | DevOps service: 278 impressions, position 59.32 | `devops consultancy uk`: 108 at 59.96; `devops consultancy`: 48 at 56.90; several UK Kubernetes variants at 5–6 impressions | Highest existing commercial visibility. Improve the service offer first and choose one Kubernetes buyer decision, not multiple thin pages. |
| Custom software | Software consultancy page: 26 impressions, position 25.85; outsourcing article: 16 at 13.88 | `software consultancy london`: 1 at 59.0 | Create a build-focused custom-software destination distinct from advisory/team augmentation. |
| AI development | AI service: 149 impressions, position 66.17 | `ai software development services`: 75 at 69.75; singular variant: 24 at 77.42; `ai accelerated development company`: 9 at 55.56 | Separate AI product/workflow delivery from AI-assisted development method. Improve the commercial page before expanding content. |

The booking and mobile pages remain outside the primary five-cluster production plan. Their 14 impressions at position 26.07 and 11 impressions at 28.73 respectively are guardrail observations, not a reason to interrupt the agreed queue.

### Search Console indexation and links

Snapshot last updated 4 September 2026:

- 10 indexed and 16 not-indexed URLs.
- Four `Page with redirect` examples are the expected HTTP, non-`www` and `/index.html` canonicalisation paths; no fix is indicated by this snapshot.
- 11 URLs were `Discovered – currently not indexed`, with no crawl date. Visible examples include the existing prototype-to-production and DevOps buyer articles plus product/support/privacy pages.
- The rescue article was the single `Crawled - currently not indexed` URL; Google last crawled it on 5 September 2026.
- `https://www.duniaops.com/sitemap.xml` had status `Success`, was last read on 6 September and reported 23 discovered pages.
- Search Console reported 3 external links to the homepage from 2 linking domains: Crunchbase and Endole. It reported 43 internal links in total.

Performance and indexing reports can reflect different processing moments. The rescue article's one performance impression and current `Crawled - currently not indexed` status are therefore recorded together rather than forcing a false reconciliation.

### GA4 configuration and event snapshot

- Property: `DuniaOps - GA4`; measurement ID in the site is `G-B7X6HGW2J5`.
- Before the approved change, reporting timezone was `(GMT+03:00) Turkey Time`. On 7 September it was changed prospectively to `(GMT+01:00) United Kingdom Time`, which follows UK daylight-saving changes. Currency display remains USD while the lead event sends `currency: GBP` and `value: 0`; the existing industry remains `Jobs & Education`. Neither field was changed.
- Before the approved change, `generate_lead` existed as a recent event with its key-event toggle off. It was enabled on 7 September and verified in the key-event list. The post-change list also contained `close_convert_lead`, `purchase` and `qualify_lead`; those names were not changed, and only `generate_lead` showed detected stream data.
- For 10 August–6 September 2026, `generate_lead` had 4 events from 2 users, all attributed to the United Kingdom, with 2 events per user and event value 0.
- The site sends the event only on `/thank-you` after the browser session flag is present and optional analytics consent has been granted. It sends no enquiry content or PII.

### Netlify Forms snapshot

- One active form: `project-enquiry`.
- Three verified submissions were visible in total and zero spam submissions were visible.
- One verified submission fell inside the GA4 10 August–6 September window and appeared test-like from the private dashboard view. It was privately confirmed as an intentional test on 11 September.
- Two older verified submissions were dated 21 July and sit outside that GA4 window. They are not classified in this public document.
- A separate Netlify summary label reported a later last-submission time than the verified list exposed. The 11 September recheck resolved this as spam-filter activity rather than another verified enquiry.
- `001-public-repository-transfer.md` records at least one clearly labelled browser test that was verified and then deleted. Deleted test records cannot be joined retrospectively to GA4.

No submission content or direct identifier is reproduced here.

## Friday Data-Quality Recheck — 11 September 2026

### Netlify Forms

- **Capture/filter:** `project-enquiry`, verified submissions, checked 11 September 2026.
- **Result:** three retained verified submissions; the newest was received 1 September 2026 at 17:09 UTC. The current billing-period view also showed one verified submission.
- **Reconciliation:** the overview label `Last submission on Sep 10` includes form traffic later classified as spam; the spam filter showed activity on 10 September, including a latest visible item at 21:26. The verified count remains three, so the former timestamp mismatch is resolved.
- **Private classification:** the retained 1 September record was confirmed as an intentional test and recorded in the access-restricted lead ledger as `test / measurement_test`, with `service_category=mobile`, `landing_page_group=home` and unknown acquisition. The workbook summary shows one measurement test and zero qualified or unresolved enquiries. No prospect PII or enquiry text was copied.

### GA4 `generate_lead`

- **Capture/filter:** event detail report for 14 August–10 September 2026, the latest complete prior day in the United Kingdom reporting timezone.
- **Result:** five events from two users, all with event value 0.
- **Taxonomy:** four events report `(not set)` for the new dimensions. One event reports `form_version=project_enquiry_v2`, `test_submission=false`, `landing_page_group=home` and `service_category=ai`.
- **Pre-test decision:** no `test_submission=true` event was visible in this complete-prior-day report. The single v2 event cannot be privacy-safely joined to a retained verified Netlify record, so it remains unresolved and is not counted as a lead. The separately authorised realtime test below subsequently closed the end-to-end verification gap.

### Labelled end-to-end test — 11 September 2026

- **Authority and procedure:** after action-time approval, one synthetic enquiry was submitted through the Project Rescue contact route with `measurement_test=1` and optional analytics consent enabled. The test contained no real prospect identity or project information.
- **Netlify evidence:** a new verified record was received at 10:10:36 UTC with `form_version=project_enquiry_v2`, `service_category=rescue`, `landing_page_group=rescue` and `test_submission=true`. The retained verified total became four, of which the two known tests remain excluded from lead KPIs.
- **GA4 evidence:** Realtime showed one active user, both the homepage and thank-you page, one `generate_lead` event and one key event. Drilling into that event showed `form_version=project_enquiry_v2`, `service_category=rescue`, `landing_page_group=rescue` and `test_submission=true`.
- **Private ledger:** a second controlled `test / measurement_test` row was added and visually verified. The summary now reports two measurement tests, zero unresolved enquiries, zero qualified enquiries and zero verified qualified organic enquiries.
- **Decision:** the privacy-safe form → Netlify → thank-you → consented GA4 path is verified end to end. Retain the controlled test evidence through 9 October 2026; review before any deletion, because deletion is a separate approved action. Historical unmatched events remain unresolved and do not become leads.

## Lead-Event Reconciliation

| Reconciliation item | Classification | Confidence | Evidence-safe conclusion |
|---|---|---|---|
| One in-window Netlify verified submission | Test — confirmed | High | Privately confirmed 11 September and recorded in the restricted ledger using controlled fields only; no prospect content appears here. |
| One or more deleted browser tests documented in Spec 001 | Test, but no one-to-one event join | High that testing occurred; low on exact GA4 match | The documented test falls inside the GA4 window, but deletion and lack of a shared identifier prevent exact matching. |
| Historical and unmatched GA4 events | Unresolved | High | There is no privacy-safe cross-system join key for the four legacy events or the single v2 `false` event. Do not report them as leads. |
| Verified qualified organic enquiry baseline | 0 verified | High for the measured KPI, not for unknown real-world demand | No retained submission currently has both private qualification and reliable organic attribution. |

## Data-Quality Risks and Remediation

| Severity | Finding | Consequence | Remediation / decision owner |
|---|---|---|---|
| Resolved | Privacy-safe test and classification parameters were absent from the live form/event path at baseline. | Historical `generate_lead` events cannot be treated as business outcomes. | Production carries allow-listed `service_category`, `landing_page_group`, `form_version` and `test_submission`; matching GA4 definitions were registered 8 September, and a labelled `true/rescue/rescue/project_enquiry_v2` test passed across Netlify and GA4 Realtime on 11 September. Historical events remain unresolved. |
| Resolved | The private lead ledger did not exist at baseline. | Qualification and channel truth could be reconstructed from memory. | The private Google Sheet was created and verified on 7 September; keep access restricted and never copy customer content into Git. |
| Resolved | `generate_lead` was not configured as a GA4 key event. | GA4 key-event reports omitted the intended outcome. | Enabled and verified on 7 September. Do not backfill or reclassify historical events as qualified leads. |
| Residual | GA4 used Turkey time before the programme moved to United Kingdom time on 7 September. | A single report can cross two reporting boundaries; the setting affects only future data. | Label every GA4 window and avoid date-only joins across the change. Use the latest complete prior day for formal comparisons. |
| Medium | Analytics depends on optional-cookie consent. | GA4 undercounts sessions and leads relative to Netlify by design. | Keep GA4 directional; never estimate missing leads without evidence. |
| Medium | Search Console exposes only 397 of 520 impressions in query rows. | Query-band and cluster totals are incomplete. | Label query analyses `visible rows only`; use page totals and stable filters alongside them. |
| Medium | 12 non-redirect URLs are not indexed, including priority buyer content. | Published assets may not earn visibility despite being live. | Check each priority URL at 7/14/28 days, strengthen usefulness/internal links, and investigate before requesting validation or producing extra pages. |
| Resolved | The baseline live form had no dedicated rescue, support or custom-software choices. | New pages would have collapsed into generic `software-consultancy`, weakening private attribution. | Dedicated choices and the privacy-safe taxonomy were deployed on 8 September; labelled Project Rescue end-to-end verification passed on 11 September. |
| Resolved | Netlify's summary timestamp appeared later than the newest verified record. | A dashboard headline could be mistaken for a retained lead record. | The 11 September recheck showed that the 10 September timestamp is explained by spam-filter activity. Continue to count the verified list as the submission source of truth. |
| Low | GA4 still classifies the business as `Jobs & Education` and displays USD while the programme operates as a UK software consultancy. | Benchmarking/suggested reports can be less relevant, and future non-zero value reporting could be confusing. | Owner to confirm a software/technology industry and GBP display currency before either is changed; current zero-value lead counts are unaffected. |

## Approved Comparison Method

1. Never compare partial today with a complete prior period. For GA4, use the latest complete prior day in the property's recorded timezone. For Search Console, use the latest date the report exposes as complete and record that end date.
2. At Day 30, Day 60 and Day 90, take one rolling 28-day window ending on source date `T` and compare it with the immediately preceding 28 days. Store both exact ranges.
3. Keep the programme view separate from asset cohorts. Each publication or material revision receives 7-, 14- and 28-day checks calculated from its actual live date.
4. Compare pages and query clusters only after freezing the included URLs/queries for that readout. Record additions separately.
5. Use Search Console click/impression/position data for search visibility, GA4 only for consented behaviour, and the private ledger for lead quality and channel outcome.
6. At low volume, inspect cases and direction; do not report a conversion rate until there are at least 20 relevant organic clicks in the denominator.
7. A page with at least 50 impressions and average position 1–30 but weak CTR may justify snippet work. A page primarily at 51+ needs relevance, usefulness, links and authority work before CTR optimisation.
8. Do not treat `Validate fix`, URL inspection submission, a GA4 setting change or a form test as read-only. Record explicit approval and change time before acting.

## Publication Cohort Template

| Asset / URL | Change type | Live date | 7-day | 14-day | 28-day | GSC index state | CTA/form verified | Commit/deploy | Decision |
|---|---|---|---|---|---|---|---|---|---|
| `/about` | New trust page | 8 Sep 2026 | 15 Sep | 22 Sep | 6 Oct | Unknown to Google; live test available/indexable at 14:31 BST on 8 Sep | Yes — live CTA route and public-build validation | `11a5ac0`; production deploy `6aa00c8e8bd2f90008cc6c6a` at `2f18a39` | Hold and observe |
| `/services/software-project-rescue` | New commercial service page | 8 Sep 2026 | 15 Sep | 22 Sep | 6 Oct | Unknown to Google; live test available/indexable at 14:31 BST on 8 Sep | Yes — preselection plus labelled Netlify/GA4 end-to-end test verified 11 Sep | `11a5ac0`; production deploy `6aa00c8e8bd2f90008cc6c6a` at `2f18a39` | Hold and observe |
| `/blog/software-project-rescue-uk` | Supporting category/link/CTA revision | 8 Sep 2026 | 15 Sep | 22 Sep | 6 Oct | On Google and indexed on 8 Sep | Yes — rescue service and assessment CTA verified | `11a5ac0`; production deploy `6aa00c8e8bd2f90008cc6c6a` at `2f18a39` | Protect indexed URL; observe revision |

## Material Change Log

| Date/time and timezone | Asset | Change | Reason/evidence | Owner | Commit/deploy | Next comparable date |
|---|---|---|---|---|---|---|
| 7 Sep 2026 BST | Measurement foundation | Captured Week 01 source configuration, baseline refresh and data-quality risks; no external setting was changed. | Programme start | ibrahim uylas | Local documentation only | 11 Sep recheck; Day 30 formal readout |
| 7 Sep 2026 21:44 BST | Private lead ledger | Created and visually verified the private native Google Sheet `DuniaOps Organic Lead Ledger`; controlled fields and formulas contain no prospect PII. Deleted the temporary import copy after conversion. | Approved qualification source of truth | ibrahim uylas | Private Drive / no public deployment | Weekly case review; Day 30 formal readout |
| 7 Sep 2026 21:54 BST | GA4 property and key event | Changed reporting prospectively to United Kingdom time and enabled `generate_lead` as a key event. GA4 required business size and goal, recorded as `Small — 1–10 employees` and `Generate leads`; industry/currency were unchanged. | Align future reporting and expose the approved lead event | ibrahim uylas | GA4 Admin | Use latest complete prior day; review at Day 30 |
| 7 Sep 2026 BST | Enquiry measurement | Prepared privacy-safe form/event taxonomy and dedicated rescue, support and custom-software choices locally; no deploy. | Make future tests and service attribution distinguishable without PII | ibrahim uylas | Local release candidate `11a5ac0`; no deployment | Register GA4 definitions and validate after authorised Week 02 deploy |
| 8 Sep 2026 BST | Week 02 trust and rescue assets | Prepared `/about`, `/services/software-project-rescue`, homepage/navigation/sitemap integration and the rescue-article CTA as a validated publication candidate. | Create a credible trust path and a distinct commercial rescue destination | ibrahim uylas | Local release candidate `11a5ac0`; no deployment | Record actual live date, then schedule 7/14/28-day observations |
| 8 Sep 2026 14:24 BST | Week 02 trust and rescue assets | Published the About page, Project Rescue service, homepage/navigation/sitemap integration, rescue-article links and production enquiry taxonomy. | Explicit production approval after release-readiness PASS | ibrahim uylas | Netlify production deploy `6aa00c8e8bd2f90008cc6c6a`; commit `2f18a39` | 15 Sep / 22 Sep / 6 Oct |
| 8 Sep 2026 14:31 BST | GA4 taxonomy and Week 02 indexability | Registered four event-scoped GA4 custom dimensions; inspected the two new URLs and the revised rescue article in Search Console. New URLs passed live indexability tests; the article was indexed. No request-indexing action or form submission was made. | Establish prospective classification and capture the first post-publication state without manufacturing a lead | ibrahim uylas | GA4 Admin and Search Console; no repository deployment | Approved labelled test, then 15 Sep cohort check |
| 8 Sep 2026 15:14 BST | Project enquiry validation UX | Replaced browser-native validation popovers with an accessible in-card summary, contextual field errors, first-error focus and correction-aware clearing. Invalid attempts are stopped before lead analytics; native validation remains the no-JavaScript fallback. Live empty-form and invalid-email checks passed without submitting or queuing a lead. | Improve conversion clarity and consistency without changing the approved taxonomy or creating synthetic outcome data | ibrahim uylas | Commit `bd83f6d`; Netlify production deploy `6aa0183ec62a1400082c46fc` | 15 Sep cohort and conversion-path check |
| 8 Sep 2026 15:37 BST | Thank-you conversion page | Expanded the confirmation layout with a clearer response expectation, three-step next-action path and contact alternatives; corrected the page shell so the footer remains at the viewport bottom on tall screens. | Reduce post-submit uncertainty and remove the visually empty page state | ibrahim uylas | Commit `3a9c663`; production deploy identifier not recorded in this ledger | 15 Sep cohort and conversion-path check |
| 11 Sep 2026 BST | Friday measurement recheck | Confirmed the retained 1 September submission as a test, added one privacy-safe controlled row to the private ledger, resolved the Netlify summary timestamp as spam activity and rechecked GA4 taxonomy coverage. GA4 showed five `generate_lead` events from two users for 14 Aug–10 Sep: four legacy `(not set)` events and one v2 `false/home/ai` event; no labelled `true` event. | Close Week 01 data-quality carry-over without inflating lead counts | ibrahim uylas | Netlify Forms, GA4 and private Google Sheet; local documentation update | Labelled test after action-time approval; first cohort 15 Sep |
| 11 Sep 2026 11:10 BST | Labelled form measurement test | Submitted one synthetic Project Rescue enquiry after action-time approval. Netlify verified `project_enquiry_v2 / rescue / rescue / true`; GA4 Realtime showed one `generate_lead` and the same parameter values; the private ledger was updated and visually checked. | Prove the privacy-safe conversion taxonomy end to end without manufacturing a business lead | ibrahim uylas | Netlify Forms, GA4 Realtime and private Google Sheet; no repository deployment | Retention review 9 Oct; first cohort 15 Sep |

## Open Decisions

- [x] Approve the access-restricted Google Sheet as the private lead-ledger location and create it outside this repository.
- [x] Privately confirm whether the in-window retained submission is a test. Confirmed 11 September and recorded in the restricted ledger without prospect PII.
- [x] Change GA4 reporting timezone from Turkey time to United Kingdom time after approval.
- [x] Configure `generate_lead` as a GA4 key event after approval.
- [x] Approve, deploy and verify the privacy-safe event/form taxonomy; production deployment completed 8 September.
- [x] Register event-scoped GA4 custom definitions for `service_category`, `landing_page_group`, `form_version` and `test_submission`; completed 8 September before any labelled test.
- [x] Authorise and run the prepared labelled end-to-end form test using synthetic details, the Project Rescue route and `measurement_test=1`. Completed 11 September; retain the controlled evidence through 9 October 2026 and review before any deletion.
- [ ] Confirm whether GA4 industry should move from `Jobs & Education` to an appropriate software/technology category and display currency from USD to GBP; neither was changed in Week 01.

## Update Rule

Every Friday and checkpoint update must include the capture date, exact source window, filter, metric grain, material caveat, decision and next comparison date. If a source cannot be verified, write `NOT VERIFIED`; never substitute a remembered number. All lead details remain private and are represented here only as aggregate counts and controlled classifications.
