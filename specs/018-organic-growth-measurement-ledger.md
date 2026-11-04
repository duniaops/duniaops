# Organic Growth Measurement Ledger

**Status:** Active — Week 09 Day-60 gate. On 2 November, exact-page Search Console reports were captured for due W04-B, W05-A and W07 cohorts; all reports were last updated about 3–3.5 hours before capture and contain data only through 31 October. The W04-B and W05-A 28-day windows and W07 14-day windows are therefore one calendar date short and remain PARTIAL. URL Inspection now reports W05-A indexed; W03-B and W05-B are URL-unknown, but their live tests pass. W08-A/B are not yet on Google, as expected before their first 7-day check on 5 November. GA4 5 October–1 November vs 7 September–4 October and the restricted lead ledger were also captured 2 November; one genuine enquiry remains unresolved and the qualified-organic KPI remains 0. No indexing request or submission was made. Full dated evidence and next steps follow.
**Programme owner:** ibrahim uylas
**Measurement owner:** ibrahim uylas
**Depends on:** `003-organic-client-acquisition-90-day-program.md`
**Day-30 capture:** 9 October 2026 (GSC through 6 October; GA4 through 8 October). **Next formal checkpoint:** Day 60, 5 November 2026; use the latest complete source-specific windows and record age cohorts separately.

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

## Week 09 Early Day-60 GA4 and lead reconciliation — 2 November 2026

### Search Console site-level comparison

- **Property/report:** `sc-domain:duniaops.com`, Web search performance; captured 2 November 2026. The report said “Last update: 3 hours ago” and contained complete data through 31 October.
- **Current:** 4–31 October 2026 (28 days) — 7 clicks, 1.22k impressions as displayed (rounded), 0.6% average CTR, average position 57.3.
- **Previous:** 6 September–3 October 2026 (28 days) — 4 clicks, 354 impressions, 1.1% average CTR, average position 36.2.
- **Interpretation:** clicks increased by 3 and displayed impressions by roughly 866, while CTR fell 0.5 percentage points and average position weakened by 21.1 positions. The impression mix includes newly published assets and terms with low rankings; this aggregate does not justify a site-wide snippet rewrite. Use exact-page cohorts and frozen high-intent query groups before prioritising individual changes. Visible query rows cover only a subset of total impressions and must not be summed as the total.
- **Corporate page rows:** in the same comparison, AI Software Development service recorded 235 vs 53 impressions (+182), AI consultant-vs-development-company article 180 vs 0, DevOps service 160 vs 123 (+37), AI prototype-to-production article 137 vs 0, and Application Support service 130 vs 14 (+116). Each row has 0 clicks in the current window. The domain property also includes product subdomains, so the overall aggregate is not a pure corporate-page measure; use these exact `www.duniaops.com` page rows for prioritisation. These are exposure signals, not intent proof; review index state, page age, page relevance and query position before changing anything.

### GA4 Traffic acquisition

- **Property/report:** `DuniaOps - GA4`, Traffic acquisition by session default channel group; capture 2 November 2026, 10:49 UTC; report displays 100% of available data. Property timezone is Europe/London.
- **Current complete prior-day 28-day window:** 5 October–1 November 2026 — 33 sessions; 21 engaged sessions; 63.64% engagement rate; 53 seconds average engagement; 193 events; 4 key events.
- **Previous 28-day window:** 7 September–4 October 2026 — 61 sessions; 40 engaged sessions; 65.57% engagement rate; 1 minute 17 seconds average engagement; 485 events; 3 key events. Both ranges follow the 7 September timezone change and are comparable by duration and property timezone.
- **Organic Search:** current 5 sessions, 5 engaged sessions, 16 seconds average engagement, 37 events and 2 key events; prior 3 sessions, 1 engaged session and 1 key event. The increase is directional only; consent suppresses some users, a key event is not a verified or qualified lead, and no event-to-submission join was attempted.
- **AI Assistant:** current 1 session, 1 engaged session, 14 seconds average engagement, 7 events and 1 key event. This is channel-level reporting only and is not joined to the private submission.
- **Interpretation:** overall sessions are down from 61 to 33 and key events are up from 3 to 4; organic-search sessions rose from 3 to 5. Counts are too small to claim a stable trend or conversion-rate change. Refresh the rolling window on 5 November for the formal Day-60 timestamp and preserve the same rule (latest complete prior day).

### Netlify and access-restricted lead ledger

- **Source/capture:** Netlify Forms `project-enquiry`, verified-submission list and form metadata, read 2 November 2026; total verified submission count 6. No submissions or test records were deleted or changed in Netlify.
- **Private ledger update:** reconciled the new genuine non-test enquiry from 29 October without copying name, company, email, message or referrer URL into Git. One privacy-safe row was added with status `unresolved`, reason `insufficient_evidence`, category `unknown`, landing group `home`, channel `non_organic`, GA source/medium `unavailable`, owner `ibrahim uylas`, next action `reply`. The direct Netlify ID remains only in the restricted sheet. A referrer query indicates an AI-assistant referral, but no identity-level GA4 match was made.
- **Updated overview:** 5 measurement tests; 1 unresolved enquiry; 0 qualified enquiries; 0 verified qualified organic enquiries. The overview formulas recalculated after the row write and were verified by read-back. The inquiry's service fit still requires owner review; reply is due 2 November. No customer was contacted.

### Public citation/review spot-check

- A focused public web search on 2 November surfaced [DuniaOps' LinkedIn company profile](https://uk.linkedin.com/company/duniaops) and [The Org company profile](https://theorg.com/org/duniaops-solution-and-consulting-ltd). No independent review page appeared among the focused results; this is a bounded search result, not an exhaustive proof that no reviews exist.
- Search Console Links report captured 2 November reports 3 external links to the homepage (2 from `crunchbase.com`, 1 from `selling.com`) and 281 internal links. This supersedes the 6 September snapshot (which listed Endole instead of selling.com). The Links report did not expose a current report-update timestamp, so only the observation date is recorded. No profile, directory or review setting was changed and no review request was sent.

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
| `/about` | New trust page | 8 Sep 2026 | 15 Sep (NOT VERIFIED) | 22 Sep (captured 25 Sep; GSC through 22 Sep) | 6 Oct (captured 9 Oct; GSC through 6 Oct) | On Google/indexed; one valid Breadcrumbs item (25 Sep) | Yes — live CTA route and public-build validation recorded at release; not rechecked 9 Oct | `11a5ac0`; production deploy `6aa00c8e8bd2f90008cc6c6a` at `2f18a39` | 28-day: 13 impressions, 0 clicks, 0% CTR, avg position 4.1; prior 28 days 0 impressions. Hold; no query rows. |
| `/services/software-project-rescue` | New commercial service page | 8 Sep 2026 | 15 Sep (NOT VERIFIED) | 22 Sep (captured 25 Sep; GSC through 22 Sep) | 6 Oct (captured 9 Oct; GSC through 6 Oct) | On Google/indexed; one valid Breadcrumbs item (25 Sep) | Yes — preselection plus labelled Netlify/GA4 end-to-end test verified 11 Sep; not rechecked 9 Oct | `11a5ac0`; production deploy `6aa00c8e8bd2f90008cc6c6a` at `2f18a39` | 28-day: 13 impressions, 0 clicks, 0% CTR, avg position 49.3; prior 28 days 0 impressions. Hold; no visible clicks. |
| `/blog/software-project-rescue-uk` | Supporting category/link/CTA revision | 8 Sep 2026 | 15 Sep (NOT VERIFIED) | 22 Sep (captured 25 Sep; GSC through 22 Sep) | 6 Oct (captured 9 Oct; GSC through 6 Oct) | On Google/indexed; one valid Breadcrumbs item (25 Sep) | Yes — rescue service and assessment CTA verified at release; not rechecked 9 Oct | `11a5ac0`; production deploy `6aa00c8e8bd2f90008cc6c6a` at `2f18a39` | 28-day: 53 impressions, 0 clicks, 0% CTR, avg position 25.9; prior 28 days 7 impressions, position 24.4. Protect; inspect intent/snippet later, but no CTR conclusion at this volume. |
| `/blog/can-a-new-company-maintain-software-it-did-not-build` | New support-takeover buyer article | 11 Sep 2026 | 18 Sep (NOT VERIFIED) | 25 Sep (captured 25 Sep; GSC through 22 Sep only) | 9 Oct NOT VERIFIED (GSC only through 6 Oct: 26 elapsed days) | Discovered – currently not indexed in last URL inspection; sitemap recognized; no crawl date; no indexing request | Yes — support-preselected enquiry CTA verified at release; not rechecked 9 Oct | `596bd6a`; production deploy `6aa3ded37934dd0008b0273d` | Recheck after GSC is complete through 9 Oct or later; do not call a 26-day window a full 28-day cohort. |
| `/services/application-support-maintenance` | New commercial support service | 14 Sep 2026 | 21 Sep (captured 25 Sep; late) | 28 Sep (captured 28 Sep; data through 25 Sep, 12 calendar dates incl. publication) | 12 Oct | On Google/indexed; one valid Breadcrumbs item (28 Sep) | Yes — live support CTA, homepage card, parent/article link and sitemap verified at release; not rechecked 28 Sep | `391212f`; production deploy `6aa7c66397876156ed30ef9f` | Hold; 4 impressions, 0 clicks, avg position 69 for 14–25 Sep; incomplete 14 elapsed days and query rows partial |

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
| 8 Sep 2026 15:37 BST | Thank-you conversion page | Expanded the confirmation layout with a clearer response expectation, three-step next-action path and contact alternatives; corrected the page shell so the footer remains at the viewport bottom on tall screens. | Reduce post-submit uncertainty and remove the visually empty page state | ibrahim uylas | Commit `3a9c663`; Netlify production deploy `6aa01da4a0aa140008047269` | 15 Sep cohort and conversion-path check |
| 11 Sep 2026 BST | Friday measurement recheck | Confirmed the retained 1 September submission as a test, added one privacy-safe controlled row to the private ledger, resolved the Netlify summary timestamp as spam activity and rechecked GA4 taxonomy coverage. GA4 showed five `generate_lead` events from two users for 14 Aug–10 Sep: four legacy `(not set)` events and one v2 `false/home/ai` event; no labelled `true` event. | Close Week 01 data-quality carry-over without inflating lead counts | ibrahim uylas | Netlify Forms, GA4 and private Google Sheet; local documentation update | Labelled test after action-time approval; first cohort 15 Sep |
| 11 Sep 2026 11:10 BST | Labelled form measurement test | Submitted one synthetic Project Rescue enquiry after action-time approval. Netlify verified `project_enquiry_v2 / rescue / rescue / true`; GA4 Realtime showed one `generate_lead` and the same parameter values; the private ledger was updated and visually checked. | Prove the privacy-safe conversion taxonomy end to end without manufacturing a business lead | ibrahim uylas | Netlify Forms, GA4 Realtime and private Google Sheet; no repository deployment | Retention review 9 Oct; first cohort 15 Sep |
| 11 Sep 2026 11:58 BST | Support-takeover buyer article | Published the original inherited-software maintenance guide with a unique 1200×630 image, primary NCSC/ICO sources, generated blog/home/RSS/sitemap/redirect outputs and a support-preselected enquiry CTA. | Answer the feasibility question separately from the forthcoming commercial service page | ibrahim uylas | Commit `596bd6a`; Netlify production deploy `6aa3ded37934dd0008b0273d` | 18 Sep / 25 Sep / 9 Oct |
| 14 Sep 2026 BST | Programme record reconciliation | Replaced the stale planned article date/state with actual publication evidence and recovered the thank-you deployment identifier. No analytics, Search Console, form, publication or deployment state was changed. | Keep cohort comparisons and change attribution evidence-based | ibrahim uylas | Repository documentation only | Week 02 first cohort 15 Sep; support article first cohort 18 Sep |
| 14 Sep 2026 BST | Support-takeover article index observation | Search Console URL Inspection reported `URL is unknown to Google`, not indexed, no last crawl and no referring sitemap detected. The canonical URL was independently confirmed in the live sitemap; no live test or indexing request was submitted. | Capture the initial state three days after publication without manufacturing an indexing action or treating normal discovery delay as failure | ibrahim uylas | Search Console and live sitemap; no external mutation or deployment | Recheck at the 7-day observation on 18 Sep |
| 14 Sep 2026 BST | Application Support commercial parent | Approved the operating boundaries and implemented a validated local service-page release candidate with homepage placement, support-preselected CTA, schema, reciprocal article/Rescue/DevOps/About/Consultancy links, sitemap/redirect integration and automated release checks. Desktop and 390×844 mobile checks passed, with no browser-console errors. | Complete the missing decision-stage parent without duplicating the practical takeover article or making unsupported SLA promises | ibrahim uylas | Local repository only; no commit or deployment | Visual approval and production release; set cohort dates from actual live date |
| 14 Sep 2026 BST | Application Support commercial parent | Published the approved service page, homepage placement, support-preselected CTA, reciprocal links and generated blog surfaces. Production verification confirmed HTTP 200 for service, homepage, article and sitemap; canonical, parent/article link and CTA route were present. | Complete the missing decision-stage parent and make the support cluster discoverable without unsupported operational promises | ibrahim uylas | Commit `391212f`; Netlify production deploy `6aa7c66397876156ed30ef9f` | 21 Sep / 28 Sep / 12 Oct |
| 25 Sep 2026 11:48 BST | Week 02 14-day and Week 03 support-cluster observation | Read Search Console URL Inspection/performance, GA4 Traffic Acquisition, the Netlify aggregate form overview and only the private lead-ledger Overview. Recorded low-volume page metrics, current indexing states, GA4's lack of a Google/organic source row, and zero qualified organic leads; no PII was accessed, no indexing action was submitted and no external state was changed. Search Console performance was current through 22 Sep; GA4 through 24 Sep. | Complete overdue cohort observations without claiming unavailable Search Console dates or misclassifying generic events/submission totals | ibrahim uylas | Read-only external checks; repository documentation only | Service 14-day 28 Sep; Week 02 28-day 6 Oct; article 28-day 9 Oct; service 28-day 12 Oct |
| 28 Sep 2026 BST | Week 02 retrospective 7-day GSC reconstruction | Read exact page-filter performance for 8–15 Sep: About 0 impressions/0 clicks; Rescue service 0/0; Rescue article 16/0, 0% CTR, avg position 24.3. Current source freshness was through 25 Sep. Historical URL state, GA4, lead and CTA/form state were not reconstructed; overall checkpoint remains NOT VERIFIED. | Recover only source-supported historic Search Console performance without backfilling absent evidence | ibrahim uylas | Read-only Search Console; repository documentation only | Week 02 28-day check 6 Oct |
| 28 Sep 2026 BST | Application Support 14-day GSC checkpoint and Week 04 intent gate | Read Application Support service exact-page metrics for 14–25 Sep (4 impressions/0 clicks/0% CTR/avg position 69; partial visible query rows) and URL Inspection (indexed; one valid Breadcrumbs item). Read DevOps page exact-filter 3-month data 20 Jul–25 Sep (373 impressions/1 click/0.3% CTR/avg position 57.6) and query rows. Froze the Kubernetes consultant vs permanent hire article intent; no indexing action, deploy or publication. | Complete the due cohort with explicit freshness limits and select one asset from current evidence | ibrahim uylas | Read-only Search Console; repository documentation only | Application Support service 28-day 12 Oct; article 28-day 9 Oct; Week 04 first GSC checks 8 Oct |
| 9 Oct 2026 10:47 BST | Day-30 GSC and Week 02 28-day cohort close | Search Console Web 9 Sep–6 Oct vs 12 Aug–8 Sep: 384/4/1.0%/37.8 vs 403/2/0.5%/53.0 (impressions/clicks/CTR/position). Captured exact 28-day page filters: About 13/0, Rescue service 13/0, Rescue article 53/0; the Rescue article position was 25.9 vs 24.4. Google last updated 19.5 hours before reading. Also inspected the Custom Software service: indexed state `Discovered – currently not indexed`, sitemap found, no crawl/referring page; live URL test says available to Google/indexable with one Breadcrumbs item. At this 10:47 capture, no indexing request had yet been submitted; a separate 11:37 BST follow-up below records Google's queue acknowledgement. | Close overdue Week 02 GSC check and identify the next indexing blocker without over-claiming results | ibrahim uylas | Read-only Search Console at 10:47; indexing request separately submitted at 11:37 | Recheck custom page discovery after 12 Oct; support article 28-day only after full data through 9 Oct; Application Support 28-day 12 Oct |
| 9 Oct 2026 BST | Day-30 GA4 direction, Netlify aggregate and test retention | Traffic Acquisition, Europe/London, 11 Sep–8 Oct: 59 sessions, 35 engaged (59.32%), 22-second average engagement, 406 events and 3 key events. Google/organic: 5 sessions, 3 engaged (60%), 10 seconds, 38 events, 1 key event. Previous-period comparison omitted because it crosses the 7 Sep timezone change. Private Sheet Overview last updated 11 Sep, showing 0 qualified, 0 unresolved and 2 tests. Read-only Netlify aggregate says 4 submissions; latest timestamp 9 Oct 06:16 UTC, but verified/spam status is unavailable. No individual submissions or PII read. Decision: retain the labelled 11 Sep test; no Netlify or Sheet deletion/edit. Current qualified-organic count remains NOT VERIFIED; Ibrahim must privately classify the latest submission today. | Refresh consented behaviour, detect inbound activity and make a non-destructive retention decision without overstating the KPI | ibrahim uylas | Read-only GA4, Netlify aggregate and private Overview; local documentation only | Same-day private classification; no PII in repository |
| 9 Oct 2026 BST | Aggregate Netlify submission freshness check | Read-only Netlify project/form summary for `duniaops` / `project-enquiry`: total `submission_count=4`, latest submission timestamp `2026-10-09T06:16:22Z` (07:16 BST). The aggregate does not expose verified/spam status or qualification. No submission rows, message content or PII were opened. Treat the latest submission as unclassified; Ibrahim must review it privately in Netlify and update controlled fields in the access-restricted ledger by 9 Oct. Do not call it an organic or qualified lead until verified and attributed. | Detect current inbound activity without exposing enquiry data or inflating the lead KPI | ibrahim uylas | Read-only Netlify aggregate; no external mutation | Same-day private classification; no PII in Git |
| 9 Oct 2026 11:37 BST | Custom Software service indexing request | Search Console URL Inspection for `https://www.duniaops.com/services/custom-software-development` reported the URL unknown to Google/not indexed. Submitted one indexing request; Google confirmed it was added to the priority crawl queue. The request is not proof of crawl or indexation. No other Search Console state was changed. | Prompt discovery of the newly published commercial service without treating queue acceptance as an SEO outcome | ibrahim uylas | Search Console; one indexing request; no deployment | Recheck URL Inspection and indexing after 12 Oct; record actual state only |
| 9 Oct 2026 11:37 BST | Netlify submission review access blocker | Opened the `duniaops` project Forms page and signed in, but the individual submissions UI returned a page-not-found/no-permission message. The connected Netlify summary exposed only aggregate count 4 and latest timestamp 07:16 BST, not verified/spam status or qualification. No individual record or PII was read; private Sheet was not edited. Status/source/channel and Day-30 qualified-organic count remain NOT VERIFIED. | Preserve accurate lead attribution and privacy rather than infer from aggregate activity | ibrahim uylas | Netlify aggregate read; connected UI account lacks form-submission access; no ledger mutation | Ibrahim to use an authorised Netlify account, privately classify and update restricted ledger by 12 Oct |
| 12 Oct 2026 | Week 06 AI intent and 28-day Search Console read | Search Console Web, read 12 Oct; latest data through 10 Oct. Site 13 Sep–10 Oct: 380 impressions, 3 clicks, 0.8% CTR, position 39. AI service exact page: 46 impressions, 0 clicks, 0% CTR, position 57.4. Visible page queries: `ai development services london` 11; `ai software development service` 8; `ai software development services` 7; `ai software development consultancy` 6; three lower-volume queries. Small sample, used only to separate service intent from method and decision-guide intent. | Freeze the W06 buyer-intent split and baseline without claiming demand or causality | ibrahim uylas | Read-only Search Console; local Spec 009 update | W06 service/article cohorts from actual publication; source/claim review before 15 Oct publish gate |
| 12 Oct 2026 | Application Support and support-takeover cohort follow-up | Search Console 13 Sep–10 Oct exact-page filters: Application Support service 44 impressions, 0 clicks, 0% CTR, average position 72; because the page went live 14 Sep, current data contains only 27 live calendar dates and is not a complete 28-day cohort. Support-takeover article filter: 0 impressions, 0 clicks for the latest 28-day report. URL Inspection remains `Discovered – currently not indexed`, no crawl; sitemap is detected and Google reports a Rockimals referring URL, which returned HTTP 404 on 12 Oct. | Record the overdue evidence with source freshness and separate confirmed facts from possible causes | ibrahim uylas | Read-only Search Console and public HTTP check; no indexing request | Recheck service once data includes 11 Oct or later; investigate/refine the broken cross-site reference without assuming causality |
| 12 Oct 2026 | Custom Software URL discovery recheck | Search Console URL Inspection still reports `URL unknown to Google`, no referring sitemap/page/crawl; live test says indexable and detects one valid Breadcrumbs item. Repository `sitemap.xml` includes the canonical URL and the current production deploy is on the commit containing it. One indexing request was already accepted 9 Oct; no repeat request was sent. | Escalate the mismatch between deployed sitemap and Google's discovery report before optional content | ibrahim uylas | Read-only Search Console, repository and Netlify deployment metadata | Investigate submitted sitemap/fetch and internal-link path by 13 Oct; recheck only after meaningful discovery changes or natural recrawl |
| 12 Oct 2026 | Netlify form aggregate freshness check | Read-only `duniaops` project summary: `project-enquiry` has 4 submissions; latest activity `2026-10-12T13:42:52Z`. Aggregate does not distinguish verified, spam, source/channel or qualification. No individual row or PII was opened. Private lead Overview was not changed; qualified-organic count remains NOT VERIFIED. | Refresh activity awareness without exposing customer details or overstating the business KPI | ibrahim uylas | Read-only Netlify connector; no external or private-ledger mutation | Ibrahim to classify privately through an authorised account and update restricted ledger by 13 Oct |
| 12 Oct 2026 | W05 cost article publication reconciliation | Source `content/blog/bespoke-software-development-cost-uk.md`, `draft: false`; unique image and generated outputs are in commit `8c678cb`. Netlify current production deployment `6acc27c06af9a70008475782` is ready on that commit, published 12 Oct 00:20 UTC; public article returned content on 12 Oct. Front matter displays 5 Oct. First production appearance earlier than 12 Oct is NOT VERIFIED; this was a user-authorised post-close third W05 asset, exceeding the planned weekly cap. | Correct stale draft/image blocker records and establish honest cohort timing | ibrahim uylas | Read-only repository, public URL and Netlify deployment metadata | Confirm earliest prior production deploy before finalising 7/14/28-day dates; provisionally use 19 Oct / 26 Oct / 9 Nov from first confirmed live date |
| 13 Oct 2026 | Application Support 28-day cohort freshness recheck | Search Console Web exact-page report still covers 13 Sep–10 Oct and was updated about 9 hours before the read: 44 impressions, 0 clicks, 0% CTR, average position 72. The service went live 14 Sep, so this is only 27 post-publication dates, not a complete 28-day cohort. | Do not label an incomplete page-age cohort as the 28-day result | ibrahim uylas | Read-only Search Console; no external mutation | Recheck 14 Oct only if the report includes 11 Oct or later; otherwise leave open |
| 13 Oct 2026 | Custom Software sitemap and discovery recheck | URL Inspection remains `URL unknown to Google`, with no referring sitemap/page/crawl. Read-only live test says available to Google and indexable, with one valid Breadcrumbs item. Submitted sitemap status is Success with 29 discovered pages; its last Google read was 6 Oct. Public sitemap returned HTTP 200 and contains the canonical service URL with `lastmod` 5 Oct; homepage links to it. No source omission was identified and the 9 Oct indexing request is already queued; no repeat request or sitemap submission was made. | Separate deployed technical validity from Google-discovery status; avoid redundant requests | ibrahim uylas | Read-only Search Console, public HTTP and repository inspection | Monitor for a natural sitemap reread/crawl; investigate again only after Google refreshes sitemap data or a material discovery change |
| 13 Oct 2026 | Support-takeover article index-state recheck | Search Console URL Inspection still says `Discovered – currently not indexed`, no crawl; the sitemap is detected and the reported `https://rockimals.duniaops.com/blog/can-a-new-company-maintain-software-it-did-not-build` referrer returns HTTP 404. No indexing request was submitted; cause remains NOT VERIFIED. | Keep a reported broken referrer separate from verified indexing causality | ibrahim uylas | Read-only Search Console and public HTTP check | Recheck after material source/discovery change or natural recrawl; do not alter canonical or create a replacement article to force indexing |
| 13 Oct 2026 | Netlify aggregate freshness and lead-classification access blocker | Read-only `duniaops` production deploy remains `6acc27c06af9a70008475782` (`ready`). `project-enquiry` aggregate remains 4 submissions, latest activity `2026-10-12T13:42:52Z`. Connector metadata does not expose individual verification, spam, source or qualification; no submission row/content/PII was opened and the private ledger was not edited. Qualified-organic count remains NOT VERIFIED. | Detect current activity without exposing enquiry data or treating aggregate volume as qualified pipeline | ibrahim uylas | Read-only Netlify metadata; authorised individual-submission access unavailable in this session | Ibrahim to use an authorised Netlify account and privately reconcile the restricted ledger; owner/date remains Ibrahim, 13 Oct (overdue until access is available) |
| 13 Oct 2026 07:40:41 UTC | W06 AI service/article production release | User-approved W06 AI service refresh and buyer article published through Netlify CLI to production deploy `6acde06d9e5f8ae9cf24f744` (ready; `commit_ref: null`). Sources: `services/ai-software-development.html`, `content/blog/ai-consultant-vs-ai-development-company.md`, image `assets/blog/ai-consultant-vs-ai-development-company-1200x630.jpg`; live article/service/image return HTTP 200, article canonical/date/image metadata and reciprocal service link confirmed; article is in blog index, homepage, RSS, sitemap and clean-URL redirect. No form submission or Search Console URL inspection/index request was made; conversion and post-release index state remain NOT VERIFIED. | Record exact first-live time and distinguish release evidence from subsequent traffic, indexing and conversion outcomes | ibrahim uylas | Netlify production deploy metadata plus read-only public HTTP checks; no Git commit ref | Page-age observations 20 Oct / 27 Oct / 10 Nov; reconcile deployed source with Git after explicit commit/push approval |
| 13 Oct 2026 09:31:30 UTC | W06 AI service visual revision | Added selected prototype-to-production image from `assets/ai-software-development-production.jpg` (1200×630, optimised JPEG) to `services/ai-software-development.html`; live deploy `6acdfa6d41201f0e27f28702` ready, `commit_ref: null`. Service and image return HTTP 200; versioned CSS loaded; desktop two-column and 390px mobile stacked layout verified with no horizontal overflow; browser console errors none. No form submission or Search Console URL inspection/index request was made; conversion and post-release index state remain NOT VERIFIED. | Observe qualified enquiries and Search Console impressions/CTR without attributing outcomes before sufficient data accrues | ibrahim uylas | Netlify deploy metadata; browser-rendered desktop/mobile checks and live HTTP responses | Existing service page-age checks remain 20 Oct / 27 Oct / 10 Nov; reconcile deployed source with Git after explicit commit/push approval |

## Open Decisions

- [x] Approve the access-restricted Google Sheet as the private lead-ledger location and create it outside this repository.
- [x] Privately confirm whether the in-window retained submission is a test. Confirmed 11 September and recorded in the restricted ledger without prospect PII.
- [x] Change GA4 reporting timezone from Turkey time to United Kingdom time after approval.
- [x] Configure `generate_lead` as a GA4 key event after approval.
- [x] Approve, deploy and verify the privacy-safe event/form taxonomy; production deployment completed 8 September.
- [x] Register event-scoped GA4 custom definitions for `service_category`, `landing_page_group`, `form_version` and `test_submission`; completed 8 September before any labelled test.
- [x] Authorise and run the prepared labelled end-to-end form test using synthetic details, the Project Rescue route and `measurement_test=1`. Completed 11 September; reviewed 9 October and decided to retain the controlled test record. No deletion was made.
- [ ] Confirm whether GA4 industry should move from `Jobs & Education` to an appropriate software/technology category and display currency from USD to GBP; neither was changed in Week 01.

## Update Rule

Every Friday and checkpoint update must include the capture date, exact source window, filter, metric grain, material caveat, decision and next comparison date. If a source cannot be verified, write `NOT VERIFIED`; never substitute a remembered number. All lead details remain private and are represented here only as aggregate counts and controlled classifications.

## Reconciliation update — 13 October 2026

- **Private lead outcome:** Netlify's verified-submissions list was reviewed and reconciled to the access-restricted `DuniaOps Organic Lead Ledger`. All four verified submissions are classified as measurement tests; the two July entries were owner-created test submissions. The private Overview now reports 0 qualified organic enquiries, 0 unresolved enquiries and 4 tests. This supersedes earlier aggregate-only/NOT VERIFIED notes, which remain accurate for their historical capture dates. No prospect PII or submission IDs are recorded in this repository; spam records were not changed or included in the verified count.
- **Attribution rule:** the four tests retain unknown acquisition channel; do not infer organic source from their route, the aggregate Netlify counter or the date. There is no qualified organic lead to follow up from the current verified set. Reconcile again only when new verified submissions arrive; owner Ibrahim Uylas.
- **W05-B cohort correction:** Netlify deploy history and route checks establish first production availability at 2026-10-09 15:39:15 UTC / 16:39:15 BST, deploy `6ac90a9431a9180008315a26`, commit `8c678cbf0c337b675107641e99522f9d9fb9c104`. The prior deploy returned HTTP 404; the confirmed deploy returns HTTP 200. Source `content/blog/bespoke-software-development-cost-uk.md`; live URL `https://www.duniaops.com/blog/bespoke-software-development-cost-uk`; front-matter displayed date remains 5 October. Owner/approver Ibrahim Uylas. Updated 7/14/28-day observations: 16 October / 23 October / 6 November. This replaces the provisional dates based on 12 October.
- **W06 measurement remains pending:** both W06 assets first served 13 October 07:40:41 UTC / 08:40 BST; retain 20 October / 27 October / 10 November observations. Post-publication Search Console URL state and conversion are NOT VERIFIED; do not report unavailable measurements as zero.

## Measurement close — 16 October 2026

| Capture | Asset / source | Exact observation | Status / decision | Owner / next date |
|---|---|---|---|---|
| 16 Oct 2026 | W05-B `content/blog/bespoke-software-development-cost-uk.md` → `https://www.duniaops.com/blog/bespoke-software-development-cost-uk`; first live 9 Oct 16:39 BST, deploy `6ac90a9431a9180008315a26`, commit `8c678cb` | Search Console Web, exact page, 7-day report last updated ~5.5 hours before read, data through 13 Oct: 0 impressions / 0 clicks / 0% CTR. URL Inspection: URL unknown to Google, no referring sitemap/page/crawl. Live URL test: available to Google and indexable. | PARTIAL / NOT VERIFIED as a full 7-day cohort: only five post-publication dates in performance data. No indexing request or sitemap resubmission. | Ibrahim Uylas; recheck 19 Oct when report includes 15 Oct or later. 14/28-day due 23 Oct / 6 Nov. |
| 19 Oct 2026 | W05-B `content/blog/bespoke-software-development-cost-uk.md` → `https://www.duniaops.com/blog/bespoke-software-development-cost-uk`; first live 9 Oct 16:39 BST, deploy `6ac90a9431a9180008315a26`, commit `8c678cb` | Search Console Web, exact page, 10–16 Oct (seven full calendar dates after the partial first-live date), last updated 3.5h before capture: 0 impressions / 0 clicks / 0% CTR / no average-position data. URL Inspection: `Discovered – currently not indexed`; sitemap and homepage listed, crawl `N/A`. Live test 14:07 BST: available to Google / page can be indexed; one valid Breadcrumbs item. | Scheduled 7-day performance check COMPLETE; indexation remains NOT DONE, cause not proven. No indexing request or sitemap resubmission. Do not infer no demand from this early cohort. | Ibrahim Uylas; 14/28-day due 23 Oct / 6 Nov. |
| 16 Oct 2026 | W06-A AI service `services/ai-software-development.html` → `https://www.duniaops.com/services/ai-software-development`; W06-B `content/blog/ai-consultant-vs-ai-development-company.md` → `https://www.duniaops.com/blog/ai-consultant-vs-ai-development-company`; first live 13 Oct 08:40 BST | Read-only URL Inspection: both “URL is on Google” / “Page is indexed”; one valid Breadcrumbs item each. Search performance data through 13 Oct is too early for the scheduled first 7-day cohort. No form submitted. | Indexing DONE; page-level performance cohort NOT DUE; conversion NOT VERIFIED. Source reconciled to `fb06c88` on `origin/main`; ready Netlify deploy `6ad16dbed6ce22019808a29b`. | Ibrahim Uylas; 7/14/28-day checks 20 Oct / 27 Oct / 10 Nov. |
| 16 Oct 2026 | W03-A `services/application-support-maintenance.html` → `https://www.duniaops.com/services/application-support-maintenance`; first live 14 Sep | Search Console Web, exact page, rolling 28 days 16 Sep–13 Oct: 51 impressions / 0 clicks / 0% CTR / average position 73.2. URL Inspection: indexed. | Recorded as a rolling-window observation, NOT an exact first-28-live-days cohort; no change justified from this small sample. | Ibrahim Uylas; include this window and caveat in programme review. |

**Change annotation:** this documentation reconciliation records read-only Search Console and Netlify observations; no external property, form, sitemap, indexing queue or production content was changed. The W05 7-day result must not be reported as complete until GSC data freshness reaches the full window.

## W07 Conversion Verification — 19 October 2026

One explicitly authorised synthetic DevOps enquiry was submitted through `https://www.duniaops.com/?service=devops_cloud&from=devops_cloud&measurement_test=1#contact` at 15:17 BST (14:17 UTC). Netlify's verified `project-enquiry` record showed `project_enquiry_v2`, `landing_page_group=devops_cloud`, `service_category=devops_cloud` and `test_submission=true`; the configured notification was received. GA4 Realtime showed one `generate_lead` and `test_submission=true`. The access-restricted `DuniaOps Organic Lead Ledger` now records one additional test with unknown acquisition channel and no prospect data: total 5 tests, 0 qualified organic enquiries and 0 unresolved. No submission ID, name, email or enquiry text is stored in this repository. The test is explicitly excluded from the customer-lead KPI. Source paths: `index.html` and `services/devops-and-cloud-consultancy.html`; live entry URL: `https://www.duniaops.com/?service=devops_cloud&from=devops_cloud&measurement_test=1#contact`; success URL: `https://www.duniaops.com/thank-you`; event date 19 October 2026; owner Ibrahim Uylas; annotation `W07 production conversion QA`; no site source or deployment changed. W07 7/14/28-day observations remain due 26 October / 2 November / 16 November. W06 conversion remains a separate NOT VERIFIED item due 20 October / 27 October / 10 November.

## W06 First Complete Seven-Date GSC Cohort — 22 October 2026

Read-only Google Search Console Web reports for exact page filters in property
`sc-domain:duniaops.com`, captured 22 October; each report said “Last update: 4
hours ago” and covered 14–20 October, the first seven complete calendar dates
after the partial first-live date on 13 October. AI service source
`services/ai-software-development.html` →
`https://www.duniaops.com/services/ai-software-development`: 39 impressions, 0
clicks, 0% CTR, average position 62.7. AI decision article source
`content/blog/ai-consultant-vs-ai-development-company.md` →
`https://www.duniaops.com/blog/ai-consultant-vs-ai-development-company`: 86
impressions, 0 clicks, 0% CTR, average position 78.5. These are small early
discovery signals, not evidence of lead or business impact. The service report
showed five queries; the article report showed 15. Both URLs were already
recorded as indexed by URL Inspection on 16 October. Owner Ibrahim Uylas;
annotation `W06 first complete seven-date GSC cohort`; source commit `fb06c88`,
production deploy `6ad16dbed6ce22019808a29b`. No account or site state changed.
Conversion remains NOT VERIFIED because no AI-prefilled form test or attributed
qualified enquiry was recorded. Next Search Console cohorts: 27 October / 10
November. Reconcile any genuine enquiry only through the existing private ledger.

## AI Visibility Sample — 20 October 2026

Applied `duniaops-seo-opportunities` to five corporate service intents. The
[assessment and exact ten-question set](../docs/ai-search-visibility-2026-10-20.md)
record fresh temporary-chat observations with ChatGPT Web search and the visible
Instant selector, captured 07:00–07:09 UTC (08:00–08:09 BST). Five final answers
were readable: 0/5 mentioned DuniaOps and 0/5 visibly linked to a DuniaOps URL.
Five response-loading failures are unavailable and excluded from the denominator;
other AI answer surfaces were not sampled. This is not a market-wide visibility
rate or a new qualified-lead observation.

The accompanying public HTML audits cover five service pages, About and seven
articles: all 13 returned HTTP 200 with matching canonicals and no observed
noindex directive. Actual AI crawler access and current search-engine indexing
were not established by those checks. Bing Webmaster Tools reached an account
selection screen after an initial service error; no site AI Performance report
was available. No GSC/GA4/private-ledger refresh, form test, indexing submission,
crawler-policy change or publication was performed.

Decision: retain the W08 proof/checklist plan, prioritise concrete permitted
evidence, and add a contextual Custom Software service-to-cost-guide link in a
future implementation. Keep existing indexing and conversion follow-ups open.
Owner: Ibrahim Uylas. Proposed repeat: 10 November, conditional on actual
publication/discovery progress; no automation was created.

## W05 14-day and W07 first-cohort read — 26 October 2026

All observations below are read-only Google Search Console Web reports for property `sc-domain:duniaops.com`, using exact page filters. Capture time: 26 October 2026; reports showed “Last update: 2.5 hours ago.” No form submission, indexing request, sitemap action or account setting was made.

| Asset / source → live URL | Exact window / evidence | Result | State / owner / next comparison |
|---|---|---|---|
| W05-B `content/blog/bespoke-software-development-cost-uk.md` → `https://www.duniaops.com/blog/bespoke-software-development-cost-uk`; first live 9 Oct 2026 16:39 BST; commit `8c678cb`; deploy `6ac90a9431a9180008315a26` | Search Console Web, exact page, 10–23 Oct; 14 calendar dates after excluding the partial first-live date | 0 impressions / 0 clicks / 0% CTR / no average-position data | 14-day performance read COMPLETE; URL Inspection 26 Oct: `Discovered – currently not indexed`, sitemap and homepage listed, crawl N/A. Prior live test 19 Oct said available/indexable. No request/resubmission. Owner Ibrahim Uylas; 28-day due 6 Nov; annotation `W05 14-day GSC observation`. |
| W07-A `content/blog/software-project-rescue-uk.md` → `https://www.duniaops.com/blog/software-project-rescue-uk`; revised/live 19 Oct; `c145541` / deploy `6ad600380c53a989007003c6` | Search Console Web, exact page, 19–25 Oct | 1 impression / 0 clicks / 0% CTR / position 59; visible query `software project rescue` (1) | First post-revision early cohort; partial first publication date; not impact evidence. Indexed per URL Inspection 19 Oct. Owner Ibrahim Uylas; next 14/28-day observations 2 Nov / 16 Nov; annotation `c145541`. |
| W07-B `content/blog/when-to-hire-devops-consultancy-uk.md` → `https://www.duniaops.com/blog/when-to-hire-devops-consultancy-uk`; revised/live 19 Oct; `c145541` / deploy `6ad600380c53a989007003c6` | Search Console Web, exact page, 19–25 Oct | 5 impressions / 0 clicks / 0% CTR / position 29.6; visible rows: `devops consultancy` (3), `devops consulting uk` (1), `devops consultant` (1) | First post-revision early cohort; not impact evidence. Indexed per URL Inspection 19 Oct. Owner Ibrahim Uylas; next 14/28-day observations 2 Nov / 16 Nov; annotation `c145541`. |
| W07 supporting service `services/devops-and-cloud-consultancy.html` → `https://www.duniaops.com/services/devops-and-cloud-consultancy`; contextual proof link revised 19 Oct; `c145541` / deploy `6ad600380c53a989007003c6` | Search Console Web, exact page, 19–25 Oct | 39 impressions / 0 clicks / 0% CTR / position 63.2; visible query rows: `devops consulting services in uk` (13), `devops consultancy` (12), `cloud devops services uk` (9), `devops consultancy uk` (1), `kubernetes consulting uk` (1) | First post-revision early cohort; not impact evidence. Indexed per URL Inspection 19 Oct. Owner Ibrahim Uylas; next 14/28-day observations 2 Nov / 16 Nov; annotation `c145541`. |

**Interpretation:** the W07 volumes are small and the first observation includes only a short post-change period. Keep current intent and copy; do not attribute movement to the revision, infer leads from impressions, or rewrite based on one cohort. The W05 zero-signal result is not an explanation for the indexing state. Continue to monitor natural discovery; no repeated indexing request is justified by this evidence alone.

## W06 14-day GSC cohort — 27 October 2026

Read-only Google Search Console Web reports for property `sc-domain:duniaops.com`, exact page filters, captured 27 October. Both reports said “Last update: 4 hours ago” and covered 14–27 October (14 complete calendar dates after excluding the partial 13 October first-live date).

| Asset / source → live URL | 14-day result | Status / owner / next comparison |
|---|---|---|
| W06-A `services/ai-software-development.html` → `https://www.duniaops.com/services/ai-software-development`; first live 13 Oct 2026 08:40 BST | 112 impressions / 0 clicks / 0% CTR / average position 68.4 | Cohort captured; early discovery signal only. Owner Ibrahim Uylas; 28-day due 10 Nov; annotation `W06 14-day GSC cohort`; source `fb06c88` / deploy `6ad16dbed6ce22019808a29b`. |
| W06-B `content/blog/ai-consultant-vs-ai-development-company.md` → `https://www.duniaops.com/blog/ai-consultant-vs-ai-development-company`; first live 13 Oct 2026 08:40 BST | 164 impressions / 0 clicks / 0% CTR / average position 78.7 | Cohort captured; 19 queries reported, first 10 visible; no lead or impact inference. Owner Ibrahim Uylas; 28-day due 10 Nov; annotation `W06 14-day GSC cohort`; source `fb06c88` / deploy `6ad16dbed6ce22019808a29b`. |

Conversion remains NOT VERIFIED; no AI-prefilled form test was submitted and GSC cannot attribute qualified leads. No indexing request, copy change, or external account setting was made.

## Week 09 Monday cohort and index-state update — 2 November 2026

All Search Console reads used property `sc-domain:duniaops.com`, Web search, exact-page filters. The Performance report showed its latest complete date as 31 October and “Last update” about 3–3.5 hours before capture. Consequently, the due 14/28-day dates are not yet complete through 1 November; record these as partial and refresh on 4 November. No indexing request, sitemap resubmission, form submission or account change was made.

| Asset / source → live URL | Exact window / evidence | Result | State / owner / next comparison |
|---|---|---|---|
| W04-B `content/blog/kubernetes-consultant-or-permanent-hire-uk.md` → `https://www.duniaops.com/blog/kubernetes-consultant-or-permanent-hire-uk`; first live 5 Oct; annotation `d89566f` | Search Console Web, exact page, 5–31 Oct (27 of 28 calendar dates); report last updated ~3h before capture | 112 impressions / 0 clicks / 0% CTR / average position 31.6 | PARTIAL, one data date pending; no impact inference. Owner Ibrahim Uylas; refresh 4 Nov. |
| W05-A `services/custom-software-development.html` → `https://www.duniaops.com/services/custom-software-development`; first live 5 Oct; annotation `d89566f` | Search Console Web, exact page, 5–31 Oct (27 of 28 calendar dates); report last updated ~3.5h before capture | 13 impressions / 0 clicks / 0% CTR / average position 76.7 | PARTIAL. URL Inspection 2 Nov: indexed, one valid Breadcrumbs item. Owner Ibrahim Uylas; refresh 4 Nov. |
| W07-A `content/blog/software-project-rescue-uk.md` → `https://www.duniaops.com/blog/software-project-rescue-uk`; revised 19 Oct; `c145541` / deploy `6ad600380c53a989007003c6` | Search Console Web, exact page, 19–31 Oct (13 of 14 dates); report last updated ~3h before capture | 1 impression / 0 clicks / 0% CTR / position 59.0 | PARTIAL; owner Ibrahim Uylas; refresh 4 Nov; low volume does not justify a change. |
| W07-B `content/blog/when-to-hire-devops-consultancy-uk.md` → `https://www.duniaops.com/blog/when-to-hire-devops-consultancy-uk`; revised 19 Oct; `c145541` / deploy `6ad600380c53a989007003c6` | Search Console Web, exact page, 19–31 Oct (13 of 14 dates); report last updated ~3h before capture | 8 impressions / 0 clicks / 0% CTR / position 22.4 | PARTIAL; owner Ibrahim Uylas; refresh 4 Nov; low volume does not justify a change. |
| W07 supporting service `services/devops-and-cloud-consultancy.html` → `https://www.duniaops.com/services/devops-and-cloud-consultancy`; link revision 19 Oct; `c145541` / deploy `6ad600380c53a989007003c6` | Search Console Web, exact page, 19–31 Oct (13 of 14 dates); report last updated ~3h before capture | 73 impressions / 0 clicks / 0% CTR / position 62.0 | PARTIAL; owner Ibrahim Uylas; refresh 4 Nov; low volume does not justify a change. |

### URL Inspection and live tests — 2 November 2026

- W03-B `content/blog/can-a-new-company-maintain-software-it-did-not-build.md` → `https://www.duniaops.com/blog/can-a-new-company-maintain-software-it-did-not-build`: Google Index says `URL unknown to Google`, no referring sitemap/page reported. Live URL test at 10:31 GMT says available to Google and indexable; one valid Breadcrumbs item. Public sitemap contains the exact canonical URL. Cause NOT VERIFIED; owner Ibrahim Uylas, diagnose/recheck 4 Nov. No indexing request.
- W05-B `content/blog/bespoke-software-development-cost-uk.md` → `https://www.duniaops.com/blog/bespoke-software-development-cost-uk`: Google Index says `URL unknown to Google`, no referring sitemap/page reported. Live URL test at 10:30 GMT says available to Google and indexable; one valid Breadcrumbs item. Public sitemap contains the exact canonical URL. Cause NOT VERIFIED; owner Ibrahim Uylas, 28-day performance cohort due 6 Nov and discovery recheck 4 Nov. No indexing request.
- W05-A `services/custom-software-development.html` → `https://www.duniaops.com/services/custom-software-development`: Google Index now says indexed and reports one valid Breadcrumbs item. This supersedes the 13 October `URL unknown` snapshot; no indexing request was made.
- W08-A `/work/fragmented-application-estate-modernisation` and W08-B `/resources/software-project-handover-checklist`: Google Index says `URL unknown to Google` on 2 Nov. Both first went live 29 Oct and their first scheduled performance check is 5 Nov; do not interpret this as a fault or request indexing solely from this four-day snapshot.

The W07 observations are small early signals, not evidence of impact. Preserve first-live 7/14-day gaps for W04 as `NOT VERIFIED`; these historical reads cannot be reconstructed from current windows. Day-60 rolling program windows, GA4, qualified-lead ledger reconciliation and final-30-day priority decision remain scheduled for 5 November.

## Continuation verification and cohort preparation — 2 November 2026

- **Fresh private-source read:** the connected native Sheet's `Overview!A4:B8` and controlled fields in `'Lead Ledger'!C4:K12` were read again during this continuation. Overview still shows 5 tests, 1 unresolved enquiry, 0 qualified and 0 qualified-organic enquiries. The genuine record remains `unresolved / insufficient_evidence`, `non_organic`, owner Ibrahim Uylas, next action `reply`, last updated 2 November 10:49 UTC. The template is explicitly excluded by the Overview formulas; it is not a sixth test. No private identifier, message or referrer was copied into Git; no Sheet or Netlify record was changed. Ibrahim's private fit review and appropriate reply remain due today, 2 November; neither is completed by this read.
- **Evidence boundary:** the GSC/GA4/HTTP/canonical/sitemap and link observations above remain the earlier 2 November captures, not additional live checks in this continuation. The Netlify verified-submission list was not recounted. The fresh lead result is the Sheet's current classification, not proof that no newer submission exists outside it. Reconcile the verified list again at the 5 November gate.
- **Timezone correction from fresh deploy metadata:** read-only Netlify reads confirm `6ae35aaf6ef383d164041aec`, commit `4134796`, published `2026-10-29T14:39:59.902Z`; visual deploy `6ae35d1d91090e885022637f`, commit `5a0b0b9`, published `2026-10-29T14:50:21.568Z`; both report `ready`. Europe/London was GMT on 29 October, so the earlier 15:39/15:50 BST conversions were one hour wrong. Specs 003/011/012/019 now use 14:39:59 / 14:50:21 GMT. The 2 November live-test clock labels are likewise GMT, not BST; their stored clock values are preserved. No publication date, deployment or observation due date changed. GSC report dates retain their own source boundary.

### Frozen read instructions for the next checkpoints

These are planned reads, not new measurements. Owner for every row: Ibrahim Uylas. Use GSC Web, exact canonical page, and record capture time, latest complete date, report freshness, impressions, clicks, CTR, position and URL Inspection separately. For the five partial legacy reads, first refresh the original intended date range; label its publication/revision-day inclusion. If collecting the first full daily cohort, store it as a separate observation with the dates below. Do not silently replace one with the other or call a source-complete legacy range 28/14 full post-live days. The partial first-live/revision date is excluded from the full daily ranges.

| Asset / checkpoint | Planned full daily post-live/revision range | Legacy refresh, due date and handling |
|---|---|---|
| W04-A DevOps service, 28 days from 7 Oct release | 8 Oct–4 Nov | Observe 4 Nov; if the complete source ends before 4 Nov, record PARTIAL with actual coverage. Recheck at 5 Nov gate and 6 Nov if still delayed. Do not substitute its 19 Oct link-revision cohort. |
| W04-B Kubernetes article and W05-A Custom Software service, 28 days from 5 Oct | 6 Oct–2 Nov, separately for each URL | Refresh legacy 5 Oct–1 Nov on 4 Nov. This includes the partial publication date. Keep the two new full-daily observations distinct from the legacy comparison. |
| W07 Rescue article, DevOps guide and supporting DevOps service, 14 days from 19 Oct revision | 20 Oct–2 Nov, separately for all three URLs | Refresh legacy 19 Oct–1 Nov on 4 Nov; label revision-day inclusion. No claim of impact from the small sample. |
| W05-B cost article, 28 days from 9 Oct | 10 Oct–6 Nov | First scheduled observation 6 Nov; the whole range may still be unavailable that morning. Record PARTIAL and recheck 9 Nov if needed. |
| W06 AI service and comparison article, 28 days from 13 Oct | 14 Oct–10 Nov | Observe 10 Nov; delayed dates stay PARTIAL. Recheck 12 Nov if needed; conversion remains separate. |
| W08 proof and checklist, 7/14/28 days from 29 Oct | 30 Oct–5 Nov / 30 Oct–12 Nov / 30 Oct–26 Nov | Observe 5 / 12 / 26 Nov, separately for each URL. If source data is delayed, retain PARTIAL and recheck at the next 6 / 13 / 27 Nov Friday run; carry any further delay explicitly. |

For programme rolling windows on 5 November, derive both adjacent 28-day ranges from each source's actual complete end date `T`. GA4 uses its latest complete prior day in Europe/London; GSC uses its own complete date. Never assume the same cut-off. Domain-property totals include product subdomains; use exact corporate-page/query evidence for the Week 10–12 decision. Keep qualified organic leads separate from GA4 events, and keep all missing data PARTIAL or NOT VERIFIED.

- **Automation evidence:** the update of legacy `weekly-article-publishing-reminder` failed because the app reported that it no longer existed; its local file also disappeared. After explicit user approval to restore one automation, `duniaops-seo-60-30-takip` was created ACTIVE and its saved configuration was read back. It retains Monday/Friday 09:00 runs through 11 December and adds 4/5/10/12/26 November at 09:00 Europe/London; 6 November is the existing Friday occurrence. It is read-only, suppresses unchanged non-actionable reports, and does not send customer messages. Reminder registration is not execution of the measurement. See Spec 012 for the remaining gate checklist.

## Week 09 Wednesday GSC refresh and discovery diagnosis — 4 November 2026

**Source:** connected Search Console UI, property `sc-domain:duniaops.com`, Web search, exact canonical page filters, morning capture 4 November; reports said `Last update: 4 hours ago`. The W04-A Days table and chart extend through 3 November; the requested 4 November date is absent. Record 3 November as the latest visible date, not an independently certified final-data cut-off. The fixed cohorts ending 1/2 November have all requested date coverage; normal GSC revisions remain possible. No GA4 refresh occurred in this check. Owner: Ibrahim Uylas.

Source/live/release mappings remain the Spec 019 register: W04-B `content/blog/kubernetes-consultant-or-permanent-hire-uk.md` (5 Oct, `d89566f`); W05-A `services/custom-software-development.html` (5 Oct, `d89566f`); W04-A `services/devops-and-cloud-consultancy.html` (7 Oct, `350dc6f`); W07-A `content/blog/software-project-rescue-uk.md`, W07-B `content/blog/when-to-hire-devops-consultancy-uk.md` and supporting service `services/devops-and-cloud-consultancy.html` (19 Oct link/content revision, `c145541` / deploy `6ad600380c53a989007003c6`). Each URL is listed in the following observations; no source or first-live date changed today.

### Legacy refresh — preserve publication/revision-day inclusion

| Asset / canonical URL | Exact range | Impressions | Clicks | CTR displayed | Average position | State |
|---|---|---:|---:|---|---:|---|
| W04-B `https://www.duniaops.com/blog/kubernetes-consultant-or-permanent-hire-uk` | 5 Oct–1 Nov | 116 | 0 | 0% | 30.8 | All 28 dates captured; includes publication date, not 28 full post-live days |
| W05-A `https://www.duniaops.com/services/custom-software-development` | 5 Oct–1 Nov | 14 | 0 | 0% | 77.5 | All 28 dates captured; includes publication date |
| W07-A `https://www.duniaops.com/blog/software-project-rescue-uk` | 19 Oct–1 Nov | 1 | 0 | 0% | 59.0 | All 14 dates captured; includes revision date |
| W07-B `https://www.duniaops.com/blog/when-to-hire-devops-consultancy-uk` | 19 Oct–1 Nov | 10 | 0 | 0% | 18.7 | All 14 dates captured; includes revision date |
| W07 supporting service `https://www.duniaops.com/services/devops-and-cloud-consultancy` | 19 Oct–1 Nov | 79 | 0 | 0% | 61.1 | All 14 dates captured; includes revision date |

These supersede only the incompleteness of the 2 November legacy reads. They do not overwrite those historical captures or demonstrate improvement caused by publication.

### Separate first-full-daily observations

| Asset | Exact range / intended daily coverage | Impressions | Clicks | CTR displayed | Average position | State / next read |
|---|---|---:|---:|---|---|---|
| W04-B, URL/source above | 6 Oct–2 Nov / 28 dates | 122 | 0 | 0% | 30.6 | Date coverage captured; include in 5 Nov Day-60 decision |
| W05-A, URL/source above | 6 Oct–2 Nov / 28 dates | 14 | 0 | 0% | 77.5 | Date coverage captured; include in 5 Nov decision |
| W07-A, URL/source above | 20 Oct–2 Nov / 14 dates | 0 | 0 | 0% (UI) | No position data (UI shows 0) | Date coverage captured; no CTR/position conclusion with zero impressions; 28-day checkpoint 16 Nov |
| W07-B, URL/source above | 20 Oct–2 Nov / 14 dates | 9 | 0 | 0% | 18.2 | Date coverage captured; 28-day checkpoint 16 Nov |
| W07 supporting service, URL/source above | 20 Oct–2 Nov / 14 dates | 76 | 0 | 0% | 60.5 | Date coverage captured; 28-day checkpoint 16 Nov |
| W04-A, same service URL; 7 Oct release cohort | Requested 8 Oct–4 Nov; actual 8 Oct–3 Nov / 27 of 28 dates | 140 | 0 | 0% | 63.1 | PARTIAL; Ibrahim rechecks 5 Nov, then 6 Nov if needed |

**Interpretation:** all observed page clicks remain zero. The W07 guide has only 9 impressions in the full-daily cohort; it does not meet the ledger's 50-impression snippet-work threshold despite position 18.2. W04-B has 122 impressions but average position 30.6, so a title rewrite is not automatically selected. The DevOps service remains mainly low-ranked. Retain copy until the 5 November query/page-age decision; do not infer lead outcomes or compare the legacy and full-daily windows as identical cohorts. Missing historical W04 7/14-day reads stay NOT VERIFIED.

### W03-B / W05-B discovery evidence

- **W03-B:** `content/blog/can-a-new-company-maintain-software-it-did-not-build.md` → `https://www.duniaops.com/blog/can-a-new-company-maintain-software-it-did-not-build`; first live 11 Sep, `596bd6a` / deploy `6aa3ded37934dd0008b0273d`. Google Index still says URL unknown, no referring sitemap/page, last crawl/canonicals N/A. Fresh live test at **4 Nov 09:27:15 GMT**, Google Inspection Tool smartphone: crawl allowed Yes, page fetch Successful, indexing allowed Yes, self-declared canonical correct, one valid Breadcrumbs item. Discovery is explicitly not checked by live tests. Root cause of the Google Index/discovery discrepancy remains NOT VERIFIED, not a diagnosed robots/canonical fault. Owner Ibrahim; recheck 5 Nov.
- **W05-B:** `content/blog/bespoke-software-development-cost-uk.md` → `https://www.duniaops.com/blog/bespoke-software-development-cost-uk`; first live 9 Oct 16:39 BST, `8c678cb` / deploy `6ac90a9431a9180008315a26`. Google Index now says **Discovered – currently not indexed**, with `https://www.duniaops.com/sitemap.xml` and homepage recognised; last crawl N/A. This supersedes the 2 Nov URL-unknown state: discovery is now reported, crawling/indexing is still pending. Fresh smartphone live test at **4 Nov 09:28:56 GMT**: crawl allowed Yes, fetch Successful, indexing allowed Yes, self-canonical correct, one valid Breadcrumbs item. Do not claim indexed. Owner Ibrahim; 28-day observation 6 Nov (10 Oct–6 Nov, PARTIAL if delayed; retry 9 Nov).
- **Sitemap and public evidence:** submitted `https://www.duniaops.com/sitemap.xml` is Success, last read 2 Nov, 33 discovered pages / 0 videos. Fresh GETs return HTTP 200 for both articles, their blog index, Support/Custom Software parents, both W08 pages, sitemap and robots.txt. Both article canonicals match; no robots-meta or X-Robots-Tag restriction is present. Public sitemap contains both exact canonicals; robots.txt allows `/` and declares that sitemap. Blog index links to both, Support service and handover checklist link to W03-B, and the articles link to each other. Thus neither is an orphan in this bounded sample; live reachability does not prove Google has crawled it.
- **Bounded gap / decision candidate:** the Custom Software service has no direct cost-article link in current live HTML or repository source, while the blog index/homepage already expose the article. A reciprocal commercial-parent link is a possible 5 Nov improvement, not an established cause of Google's crawl choice. No site source was changed, no sitemap resubmitted and no indexing request made. Prioritise the unresolved W03 discovery/crawl issue before optional content.

### W08 / private-source boundaries

Mobile layout and actual screen-reader runtime are separate: the responsive smoke passes with the scope in Spec 011; native Chrome/VoiceOver access timed out, so VoiceOver remains NOT VERIFIED (Ibrahim, 5 Nov). The read-only heartbeat at 09:00 on 4 Nov read the private Sheet: 5 tests, 1 unresolved, 0 qualified, 0 qualified organic; the non-test controlled row still says `unresolved / insufficient_evidence`, `reply`, updated 2 Nov 10:49 UTC. It was not freshly reconciled to Netlify in this task. Private fit review remains overdue from 2 Nov; Ibrahim should review today, 4 Nov, and reconcile at the 5 Nov gate. No customer identity/message was copied, no contact made and no private record changed.
