# Organic Growth Week 01 — Measurement and Production Foundation

**Status:** Complete — foundation closed 7 September 2026; two anonymised proof candidates and qualitative outcomes were confirmed 8 September, and the Week 02 named-expertise and offer decisions are now complete.
**Type:** Measurement / Planning
**Priority:** P1
**Scheduled:** 7–13 September 2026
**Primary publication:** No forced public content. Deliver a trusted baseline and approved asset register for Weeks 02–08.
**Depends on:** `003-organic-client-acquisition-90-day-program.md`
**Working records:** `018-organic-growth-measurement-ledger.md` and `019-organic-growth-asset-register.md`

## Outcome

Make later traffic and lead decisions trustworthy, remove approval ambiguity and make the 60-day production target executable.

## Weekly Deliverables

- [x] Reconcile the four observed `generate_lead` events with Netlify Forms as real, test or unresolved without recording customer content. One retained in-window submission is provisionally test; unmatched events remain explicitly unresolved.
- [x] Verify and, when authorised, configure `generate_lead` as a GA4 key event. It was enabled after explicit approval on 7 September and verified in the GA4 key-event list.
- [x] Define qualified enquiry, privacy-safe attribution fields and a private lead-ledger owner/location. The access-restricted `DuniaOps Organic Lead Ledger` Google Sheet is owned by ibrahim uylas in the private `ChatGPT` Drive folder.
- [x] Record baseline position bands and page/query clusters from Search Console.
- [x] Create one approved asset register for every Week 02–08 page/article/proof resource. Drafting briefs and the Week 02 owner are approved; copy, evidence, deploy and publication retain their own gates.
- [x] For each asset, record URL, primary intent, buyer stage, offer/CTA, required proof, internal links, owner, approver, publication date and 7/14/28-day observation dates.
- [x] Confirm capacity for no more than two primary assets per week and record the service-page-first fallback.

## Working Schedule

### Monday — baseline, ownership and capacity

- Confirm the five commercial query clusters and current production capacity.
- Capture GA4, Search Console and Netlify configuration.
- Name the private lead-ledger owner and every Week 02 owner/approver.

### Tuesday — lead and analytics reconciliation

- Classify existing lead events as qualified, unqualified, test or unresolved.
- Document consent limitations and the exact Day-30/60/90 comparison method.

### Wednesday — asset register and briefs

- Write Week 02–08 briefs with intent, audience, proof, CTA, internal links and proposed URL.
- Flag factual, customer-permission, image and deploy dependencies.

### Thursday — test and collision review

- With explicit approval, run one labelled form/thank-you/GA4 test.
- Validate that no form content or PII enters analytics.
- Review the complete asset map for keyword cannibalisation and workload overload.

### Friday — close

- Record baseline, publication calendar, cohort dates and unresolved attribution gaps.
- Confirm Week 02 About/Expertise and Project Rescue inputs.
- Update this Completion Record and the master tracker.

## Acceptance Criteria

- [x] Netlify Forms is documented as lead source of truth and GA4 as directional under consent.
- [x] Existing lead events have classifications or explicit unresolved status.
- [x] Baseline bands and exact data end dates are recorded.
- [x] Every planned Week 02–08 asset has a review-ready brief and accountable owner.
- [x] No week exceeds two planned primary public assets.
- [x] The approved privacy-safe form/event taxonomy was prepared locally without publishing it; repository-native validation and `git diff --check` passed on 7 September 2026.
- [x] No real enquiry content appears in the repository or analytics payload.

## Completion Record

### Completed 7 September 2026

- Captured Search Console, GA4 and Netlify Forms configuration and data snapshots before making any approved setting change.
- Recorded the frozen baseline, Week 01 verification values, visible-query position bands, five commercial clusters, indexation, sitemap and link evidence in `018-organic-growth-measurement-ledger.md`.
- Confirmed `generate_lead` is emitted without enquiry content only after `/thank-you` and optional analytics consent, then enabled it as a GA4 key event after approval.
- Changed GA4 reporting prospectively from Turkey time to United Kingdom time. GA4 required the previously blank business profile fields, so `Small — 1–10 employees` and `Generate leads` were recorded; industry and currency were left unchanged.
- Classified one retained in-window Netlify submission as `test — provisional`; retained unmatched GA4 events are `unresolved`. No customer content or identifier was copied into the repository.
- Created and visually verified the private native Google Sheet lead ledger with controlled dropdowns, formulas, no prospect PII and Europe/London workbook time.
- Implemented the approved privacy-safe `service_category`, `landing_page_group`, `form_version` and `test_submission` taxonomy locally, plus dedicated rescue, support and custom-software form choices. It is not deployed.
- Created the two-asset-per-week register and full briefs for all Week 02–08 primary assets in `019-organic-growth-asset-register.md`, with ibrahim uylas as approved default owner/approver.
- Preserved the accepted service-page-first fallback. No public asset was forced into Week 01.
- `npm test` validated the privacy-safe attribution flow and 74 public files; `git diff --check` passed. A local Chrome review also confirmed the rescue route preselects the intended service without breaking the form layout.

### Carried into Week 02

- Privately confirm whether the retained in-window Netlify submission is a test; the public repository keeps it provisional and contains no enquiry content.
- Public name, role, biography and portrait for `/about` were approved and integrated into the local release candidate on 8 September.
- Use the two confirmed anonymised prior-experience narratives as qualitative supporting proof. Both projects were completed, released to production and handed over, with improvements accepted by the customers and demonstrated through performance metrics; numerical values and identifying details remain excluded.
- Project Rescue response wording and the free qualification call → scoped paid assessment model were approved and integrated. Final local release preparation is recorded in commit `11a5ac0`; production deployment and publication remain a separate gate.
- Register the four event-scoped GA4 custom definitions when the taxonomy is deployed, then run one explicitly labelled end-to-end test and reconcile it in GA4, Netlify and the private ledger.
- The runtime release candidate was committed locally as `11a5ac0`. It has not been pushed or deployed.
