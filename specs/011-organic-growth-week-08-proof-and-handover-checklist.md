# Organic Growth Week 08 — First Proof and Handover Checklist

**Status:** Release approved 29 October — both assets are implemented, anonymised and approved for publication. No individual role title is claimed. Production push and live verification are in progress.
**Type:** Proof Page / Linkable Resource
**Priority:** P1
**Scheduled:** 26 October–1 November 2026
**Primary publications:** First approved case study or clearly labelled first-party engineering proof, and an ungated `Software Project Handover Checklist`.
**Depends on:** Week 02 proof inventory, relevant live service pages and evidence/permission

## Outcome

Complete core production with credible proof and a useful resource that supports rescue and application-support buyers.

## Weekly Deliverables

- [x] Select one case with sufficient evidence and documented publication permission. P01 selected; Ibrahim approved the anonymised account for publication on 29 October. No individual role title is claimed or disclosed.
- [x] Write context, constraints, problem, actions, decisions, business outcome and verified evidence as an anonymised local review draft; no metrics or client/partner identifiers included.
- [x] Write and implement the handover checklist as an ungated local web-resource review draft; no email capture or download gate.
- [x] Add draft links from Project Rescue and Application Support services and the two relevant buyer articles.
- [x] Add commercial next steps without turning the checklist into an email gate.
- [x] Prepare voluntary, non-incentivised review-request language for Week 12 (draft below; not sent).

## Working Schedule

### Monday — evidence and resource briefs

- Create the proof evidence/permission matrix and choose client case versus explicitly labelled first-party proof.
- Freeze checklist audience, sections, destination URL and CTA.

### Tuesday — write

- Gather approved facts and write the full proof narrative.
- Write the complete checklist with ownership, access, repositories, infrastructure, data, security, observability, runbooks and vendor handover.

### Wednesday — implement and link

- Build both assets, metadata, visuals and reciprocal service/article links.
- Remove confidential detail and separate verified metrics from estimates.

### Thursday — approve and publish

- Obtain final factual/client approval where applicable.
- Run site validation and publish only the approved version.

### Friday — close

- Verify both live assets, metadata, CTA, links and mobile/desktop behaviour.
- Record Search Console states and 7/14/28-day observation dates.
- Update Completion Record, Day-60 checklist and master tracker.

## Acceptance Criteria

- [x] Proof type and ownership are explicit: selected prior partner-led engineering experience, not a direct DuniaOps client case, endorsement or testimonial; no individual role title is claimed.
- [x] Ibrahim approved publication of the anonymised account on 29 October. No client/partner name, logo, quote, identifying detail or sensitive metric is included.
- [x] Proof draft explains the business problem, staged decisions, production handover and evidenced qualitative outcome.
- [x] Checklist draft is specific, useful, ungated and connected to rescue/support services.
- [x] `npm test` and `git diff --check` pass; the site build validates 324 public files, routes, JSON-LD, navigation and internal links.
- [x] Responsive visual review: both local pages checked at desktop and 390 px mobile widths on 27 October; no horizontal overflow observed.
- [ ] Assistive-technology review remains NOT VERIFIED; complete it after factual approval and before release.
- [ ] Live HTTP/canonical/sitemap/production evidence is recorded after push; conversion and Search Console/indexing states remain unverified until measured.

## Completion Record

Record proof/checklist paths and URLs, permission-evidence location, validation, commit/deploy, live/index state, cohort dates, review-request draft and blockers.

### Tuesday implementation and release-gate record — 27 October 2026

- **W08-A source / route:** `work/fragmented-application-estate-modernisation.html` → `/work/fragmented-application-estate-modernisation`. Owner and factual approver: Ibrahim Uylas. Revised and approved 29 October 2026. Change annotation: `W08 proof/resource publication`. The public copy keeps the work anonymised and does not state an individual role title.
- **Proof treatment:** anonymised account of a prior partner-led engagement; it is not represented as a DuniaOps client case, endorsement or testimonial. The draft describes the fragmented estate, staged portal/module modernisation, service separation, production completion/handover and qualitative acceptance/performance evidence. No numerical result is claimed.
- **W08-B source / route:** `resources/software-project-handover-checklist.html` → `/resources/software-project-handover-checklist`. Ungated, printable checklist; no email capture. Owner/content approver: Ibrahim Uylas. Approved for publication 29 October 2026. Change annotation: `W08 proof/resource publication`.
- **Internal links:** Project Rescue service → proof and checklist; Application Support service → checklist; Project Rescue and support-takeover buyer articles → checklist. Both pages link to relevant commercial next steps. Production verification follows deploy.
- **Sources:** [NCSC cloud platform security guidance](https://www.ncsc.gov.uk/collection/cloud/using-cloud-services-securely/using-a-cloud-platform-securely); [ICO contracts and data-sharing guidance](https://ico.org.uk/for-organisations/advice-and-services/audits/data-protection-audit-framework/toolkits/accountability/contracts-and-data-sharing/). They support general security/data-processing prompts only; the checklist is not legal advice.
- **Release/verification state:** Ibrahim approved the anonymised copy and checklist on 29 October. No individual role title is stated. Automated repository validation and responsive desktop/390 px visual review have passed. Production deploy, live HTTP/canonical/sitemap verification, keyboard/accessibility review and Search Console state are pending. Record the actual first-production timestamp and set each asset's 7/14/28-day observations from it; conversion remains unverified.
- **Voluntary review-request draft (not sent):** “If you found the work useful and feel comfortable sharing an honest review, you can leave one here. There is no incentive, and feedback—positive or critical—will not affect our work together.”
- **Owner/date for remaining verification:** Ibrahim Uylas, 29 October 2026 and the first 7/14/28-day observation dates calculated from live release. If production checks fail, fix forward and do not report the assets as live until HTTP/canonical/sitemap checks pass.

### Monday evidence and resource brief — 26 October 2026

**Owner / default factual approver:** Ibrahim Uylas. No client, intermediary, contact or publisher has been approached. This is a local planning record only; production publication and deployment still require explicit approval at the release gate.

#### W08-A proof evidence and permission matrix

| Candidate | Evidence already documented | Safe public treatment | Excluded unless separately evidenced and approved | Gate / decision |
|---|---|---|---|---|
| P01 — fragmented enterprise application estate | Multiple portals were consolidated behind one user entry point using staged micro-frontend adoption; selected modules were modernised while necessary legacy applications remained; backend capabilities were progressively separated. The production solution was completed and handed over; customer acceptance and performance measurement confirmed improvement. | Selected for the first proof. A local noindex review draft describes it only as experience from an earlier partner-led engagement, with client and delivery-partner names withheld. Proposed title: “Consolidating a fragmented application estate through staged modernisation”. Proposed route: `/work/fragmented-application-estate-modernisation`. | Client/intermediary names, logos, quotations, exact metric values, dates, scale, industry/geography combinations or technical detail that could identify either organisation. Do not call it a DuniaOps client case, testimonial or endorsement. | Before public release, Ibrahim confirms his exact role, no contract/confidentiality restriction is breached, and the anonymised detail combination cannot identify the client or intermediary. Then approve the composed copy. |
| P02 — booking allocation workflow | A mixed legacy CRM, spreadsheets, email and phone workflow was consolidated into a purpose-built allocation system; completed, released to production and handed over; improvements accepted and demonstrated through performance measurement. | Retain as a later proof candidate; not selected for this week's first proof. | Customer/intermediary identity, KPI definitions or values, operating scale and workflow details that could identify the organisation. | No further action in W08 unless P01 fails the confidentiality check; any substitution needs a recorded decision and owner review. |

The evidence supports qualitative statements only; the existence of performance measurement does not authorise a number, percentage, benchmark or time period. The disclosure must remain “Selected experience brought to DuniaOps from earlier partner-led engagements” or equivalent. Existing About/Project Rescue blocks do not by themselves approve an expanded standalone proof page.

#### W08-B resource brief freeze

- **Audience:** business owner, product/operations lead or CTO preparing to change software development or support provider.
- **Intent:** secure control and reduce continuity, access, data and operational risk before handover; distinct from the Rescue service's stalled-project recovery and Support service's ongoing maintenance.
- **Format / route:** useful web page first at `/resources/software-project-handover-checklist`; ungated, no email capture and no downloadable version in this first release.
- **Sections:** ownership/IP questions; repositories and history; build/release; cloud accounts and DNS; data/backups; secrets/access rotation; integrations; monitoring/incidents; runbooks/support; people/knowledge; mobile-store/payment/vendor ownership; first-week takeover checks.
- **Next step:** after the checklist, route stalled/fragile projects to Project Rescue Assessment and broadly stable inherited applications to Support Takeover Review.
- **Sources:** NCSC secure-development/access guidance; ICO material only for personal-data controller/processor transitions. No legal advice or universal contract wording.
- **Owner / approver:** Ibrahim Uylas / Ibrahim Uylas. Brief frozen 26 October; content and implementation are now complete as local noindex review drafts. Release remains pending the recorded checks above.

#### Monday carry-over reconciliation

- **W07 first GSC observation:** Search Console Web, exact page filters, 19–25 October, captured 26 October; each report last updated 2.5 hours before capture. Rescue article: 1 impression, 0 clicks, 0% CTR, average position 59; DevOps article: 5, 0, 0%, position 29.6; DevOps service: 39, 0, 0%, position 63.2. These small early counts do not establish impact. Owner Ibrahim Uylas; change annotation `c145541` / Netlify deploy `6ad600380c53a989007003c6`; revision date 19 October; source/live mappings are in the 19 October Completion Record above. Next comparisons: 2 November / 16 November. The asset-register dates have been corrected to the actual revision date.
- **W05 14-day observation:** `content/blog/bespoke-software-development-cost-uk.md` → `https://www.duniaops.com/blog/bespoke-software-development-cost-uk`; first production availability 9 October 2026 16:39 BST; exact Web window 10–23 October; captured 26 October, report last updated 2.5 hours before capture: 0 impressions, 0 clicks, 0% CTR, no average-position data. URL Inspection says `Discovered – currently not indexed`; sitemap and homepage are listed, crawl N/A. The 19 October live test said indexable; no fresh live test or indexing request was made. Owner Ibrahim Uylas; 28-day comparison due 6 November. This zero-signal observation does not justify rewriting or another indexing request.
- **W06:** the 14-day GSC cohort was captured 27 October for 14–27 October, last updated 4 hours earlier: AI service 112 impressions / 0 clicks / position 68.4; decision article 164 / 0 / 78.7; both 0% CTR. The 28-day cohort is due 10 November. Conversion remains NOT VERIFIED; no synthetic AI form submission was made.
- Master tracker and measurement ledger were reconciled on 26 October. The separate Rockimals working-tree changes are unrelated and untouched.
