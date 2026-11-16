# Organic Growth Week 11 — Conversion and Qualified-Lead Optimisation

**Status:** In progress — Monday 16 Nov (Day 71). Fresh funnel/source reconciliation, offer/privacy review and seven pre-submission CTA walks completed. Diagnosed immutable analytics cache risk; candidate 85fdaa0 tested (npm test, 354 public files), isolated locally outside main, not deployed. Specific publication authority and actual production delivery remain outstanding; private qualification remains Ibrahim-owned. No quota article.
**Type:** Conversion / Measurement
**Priority:** P1
**Scheduled:** 16–22 November 2026
**Primary publication:** One evidence-led conversion-path improvement across the highest-opportunity service page and form; no generic net-new article.
**Depends on:** Week 09 Day-60 priorities, working measurement and sufficient live conversion paths

## Outcome

Turn relevant visits into better-qualified conversations and make lead evidence trustworthy enough for the Day-90 decision.

## Weekly Deliverables

- [x] Reconcile Netlify Forms, GA4 `generate_lead` and the private lead ledger without exposing PII.
- [ ] Classify leads as qualified, unqualified, test, spam, job or sales solicitation.
- [x] Walk every primary service CTA/form route on mobile and desktop — local built output, pre-submission scope, 16 Nov.
- [x] Confirm a distinct low-friction offer for rescue, support, DevOps, custom software and AI.
- [x] Select one page/form improvement from observed friction, click/no-lead evidence or broken routing — cache candidate prepared locally, not released.
- [x] Verify acknowledgement, response expectation and privacy language — copy reviewed; actual delivery NOT VERIFIED.

## Working Schedule

### Monday — funnel and lead audit

- Reconcile lead counts and inspect landing page/service attribution.
- Map each CTA from search landing page to successful acknowledgement.

### Tuesday — diagnose friction

- Inspect message clarity, proof proximity, field burden, service routing and mobile usability.
- Freeze one change hypothesis and success/guardrail signal.

### Wednesday — write and implement

- Write the approved offer, CTA, proof or form-routing revision.
- Implement privacy-safe analytics only when explicitly authorised.

### Thursday — test and publish

- Run labelled end-to-end tests without using real customer data.
- Validate accessibility, mobile/desktop, analytics payload and site build; deploy after approval.

### Friday — close

- Verify the live path and reconcile the labelled test in every measurement surface.
- Record hypothesis, baseline, guardrail and 7/14/28-day comparison date.
- Update Completion Record and master tracker.

## Acceptance Criteria

- [x] Lead classifications and counts reconcile or have explicit unresolved differences. See 16 Nov assessment and limitations.
- [ ] No form content or PII enters GA4 or the repository.
- [ ] Every priority service has a specific offer and working conversion route.
- [x] The selected change has evidence, one primary signal and a guardrail against lower lead quality. See 16 Nov assessment and limitations.
- [ ] `npm test`, form/analytics/accessibility/mobile/desktop and `git diff --check` pass.
- [ ] Live test evidence and follow-up date are recorded.

## Completion Record

Record reconciled counts, unresolved differences, selected service/path, hypothesis, exact changes, validation, commit/deploy, live test and comparison date.

### Attribution-revision carry-in — 13 November 2026

The 12 Nov **17:44:51.507 GMT** origin-tag revision is separate from original W08 publication and the 9 Nov breadcrumb/link revision. Full daily windows / scheduled observations: **13–19 Nov → 20 Nov**, **13–26 Nov → 27 Nov**, **13 Nov–10 Dec → 11 Dec**. Canonical provenance, caveats and incomplete-tail handling are in Spec 018. These dates fit the existing automation; no duplicate or schedule change.

Codex owns **16 Nov** Week 11 carry-in: W08 source-finality/enhancement, W03/W05 discovery discrepancy, routine CTA/private reconciliation and the blocked CTR read. Actual production delivery remains NOT VERIFIED; private qualification/reply and production submissions retain separate authority. VoiceOver is closed. Future approval-pending source stays outside deployable main because later scheduled builds can include it despite [skip netlify]. No hook/settings changed, no quota article.

### Monday execution and selected improvement — 16 November 2026

**Day 71 / Week 11, optimisation phase.** Codex completed fresh source reads and local preparation; Ibrahim remains programme/factual and publication owner. Exact account windows, page filters, freshness, per-asset values, source/revision provenance and privacy limitations are in **Spec 018 — Week 11 Monday execution**. Those fresh reads supersede dated states only where explicitly checked.

| Deliverable | Monday assessment | Evidence / remaining boundary |
|---|---|---|
| Reconcile Netlify, GA4 and private ledger | **DONE within documented limits** | Six returned records / five tests / one unresolved / zero qualified organic; five exact-ID joins plus one known synthetic-test match with missing lookup ID. GA4 19 Oct–15 Nov vs 21 Sep–18 Oct: 24/34 sessions, 1/4 selected generate_lead, Google/organic 3/6 sessions and 0/2 events. Events are not qualified enquiries. |
| Classify leads | **NOT DONE** | Private fit decision remains unresolved, Ibrahim-owned and overdue from 2 Nov; nearest review 16 Nov. Codex re-read/reconciled without changing the private Sheet or sending a message. |
| Walk every primary CTA/form route | **DONE — bounded pre-submission checks** | Five services plus W08 proof/checklist: fresh live GET/CTA audit, then actual clicks through local built output at 1280×844 and 390×844. Correct visible service selected, no horizontal overflow; form visually reviewed also at 320 px. Actual live delivery/notification remains NOT VERIFIED. |
| Distinct offers | **DONE — existing copy reviewed** | Rescue Assessment; Support Takeover Review; DevOps Health Check; Software Discovery Session; AI project discussion. No new price/SLA or free-work promise. |
| Select one evidence-led improvement | **DONE — selected and locally prepared** | Immutable analytics URL remained unchanged across 12 Nov source change. Returning clients can retain stale attribution code. Candidate 85fdaa0 fingerprints URLs after all build generators, without changing consent, payload or form content. Release is not complete. |
| Acknowledgement/response/privacy | **DONE for language; delivery NOT VERIFIED** | Fresh homepage/thank-you GET 200: practical questions/next step, normally two working days, senior engineer and privacy link; local required fields name/email/brief, company optional. Direct GET is not successful form delivery or notification evidence. |

**Selected path and hypothesis:** all priority enquiry routes share the same first-party analytics asset. Live immutable URL `js/analytics.js?v=20260907-lead-taxonomy` is the baseline; changed bytes must produce a distinct request URL so old cached code is not reused for the updated taxonomy. Primary technical signal: all generated analytics script references match the actual delivered content hash; do not invent a conversion-rate target from tiny samples. Guardrails: unchanged allowlisted payload, no form/PII data in GA4, consent rejection still prevents GA4 loading, unknown origins remain controlled, no new promises or higher lead-quality claim.

**Reviewable local candidate:** `85fdaa0` on **`codex/w11-analytics-cache`**, worktree **`/Users/uylas/Documents/DuniaOps/Projects/DuniaOps-w11-analytics-cache`**, based on `cf13a1a`. Five files: `package.json`, `scripts/analytics-cache.mjs`, `scripts/version-analytics.mjs`, `scripts/check-dist.mjs`, `tests/analytics-cache.test.mjs`. After all generators, 45 dist HTML files request analytics content revision `e12b17600a91`; build validation rejects a stale revision. **Local commit only, no push/merge/deployment.** It is intentionally outside deployable main; scheduled product builds can include main source even when an earlier commit used [skip netlify]. No build hook/account setting changed.

**Validation:** final `npm test` **PASS, exit 0**, 354 public files, all existing suites/build/link/JSON-LD checks plus four cache regressions. Initial integration found six late-generated stale URLs; final-step versioning fixed this and the final candidate passed. `node --check` on three scripts, XML validation of dist sitemap/feed, `git diff --check` PASS. Browser checks at 1280/390 px and form visuals at 320 px pass within the pre-submission scope above. Cookies rejected; GA4 did not load. Hidden controlled origin values are tested by local VM regressions; no independent DOM/runtime certificate is claimed. No production form, notification, live cache adoption or new VoiceOver result.

**Monday measurement outcomes:** original W08 **30 Oct–12 Nov** now **DONE, 14/14 source-covered dates**, proof 0 impressions, checklist 30, no clicks; standard GSC boundary now 14 Nov. W07 intended **20 Oct–16 Nov** remains **PARTIAL, 26/28 dates** (actual 20 Oct–14 Nov: Rescue 9 / DevOps guide 9 / service 119 impressions, zero clicks). Separate 9 Nov revision **10–16 Nov** is **PARTIAL, 5/7** (actual 10–14 Nov: W08 0/0 impressions; Custom Software 3; cost guide 0). Codex retries both exact intended ranges 20 Nov. W03-B is now indexed, last crawl 14 Nov; W05-B remains URL unknown; W08 still shows invalid breadcrumbs from stored 2 Nov crawls. W04-B latest 28-date position 33.1 is outside the snippet-priority band: optional rewrite HOLD. No quota article.

### Week 11 operational plan — maintained 16 November

| Day | Concrete work / outcome | Executor / dependency |
|---|---|---|
| Mon 16 Nov | Fresh GSC/GA4/private reconciliation; close W08 coverage; diagnose cache risk; prepare and validate isolated candidate — completed above | Codex; current read access available |
| Tue 17 Nov | Planned friction diagnosis has been pulled forward: seven CTA walks and offer/form/privacy review completed Monday | Codex; no future wake-up or new reminder promised |
| Wed 18 Nov | Planned implementation also completed early as isolated candidate 85fdaa0; retain it outside main until specific publication authority | Codex prepared; Ibrahim release decision, nearest review 16 Nov / carry to existing 20 Nov |
| Thu 19 Nov | No automatic publish or production form test; local build/browser/consent checks already completed. If specifically approved, execute only the authorised release/test scope and record real live evidence | Codex executes approved scope; Ibrahim external-action authority |
| Fri 20 Nov | Retry W07 and 9 Nov 7-date cohorts, observe separate origin-tag 13–19 Nov; recheck W05/W08 states and private aggregates; assess each deliverable/criterion from actual evidence | Codex, existing Friday run; delayed dates remain PARTIAL |

**Monday acceptance assessment:** (1) counts reconcile with explicit missing-ID/unresolved differences **DONE within limits**; (2) no PII/form content copied into Git/GA4 payload **DONE for inspected/changed scope**, not an exhaustive account certificate; (3) specific offers and pre-submission routes **DONE**, successful delivery **NOT VERIFIED**; (4) selected hypothesis/signal/guardrails **DONE**; (5) candidate npm/build/analytics/XML/link/mobile/desktop/diff checks **DONE**, no new independent screen-reader test required/claimed; (6) new-change live test/date **NOT VERIFIED** because no new release/submission authorised. Weekly implementation delivery remains **IN PROGRESS**, not a blanket gate PASS.

**Open owner/date:** Ibrahim owns specific cache-release disposition and private fit decision (review 16 Nov; carry status 20 Nov). Codex owns routine 20 Nov verification and record maintenance. W06/W08 production delivery remains NOT VERIFIED pending separately authorised evidence. Original W08 28-date **26 Nov/retry 27 Nov**, 9 Nov revision **23 Nov / 7 Dec** and origin-tag **27 Nov / 11 Dec** remain distinct. If cache fix is released, calculate its own full daily 7/14/28-date windows from actual deployment, never from today's commit. W08 VoiceOver remains DONE by Ibrahim's 10 Nov confirmation; no retry. No article, outreach, indexing request, private write or deployment this run.

**Automation and record validation — 16 Nov:** existing single heartbeat prompt updated to the closed W08 coverage/current W03 state, separate partial cohorts and isolated cache candidate; saved prompt, ACTIVE state, unchanged schedule/target read back. No duplicate. Documentation consistency/privacy review and `git diff --check` PASS; programme documentation only on main with [skip netlify], local candidate remains separate.
