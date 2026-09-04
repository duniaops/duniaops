# Organic Growth Week 11 — Conversion and Qualified-Lead Optimisation

**Status:** Planned
**Type:** Conversion / Measurement
**Priority:** P1
**Scheduled:** 16–22 November 2026
**Primary publication:** One evidence-led conversion-path improvement across the highest-opportunity service page and form; no generic net-new article.
**Depends on:** Week 09 Day-60 priorities, working measurement and sufficient live conversion paths

## Outcome

Turn relevant visits into better-qualified conversations and make lead evidence trustworthy enough for the Day-90 decision.

## Weekly Deliverables

- [ ] Reconcile Netlify Forms, GA4 `generate_lead` and the private lead ledger without exposing PII.
- [ ] Classify leads as qualified, unqualified, test, spam, job or sales solicitation.
- [ ] Walk every primary service CTA/form route on mobile and desktop.
- [ ] Confirm a distinct low-friction offer for rescue, support, DevOps, custom software and AI.
- [ ] Select one page/form improvement from observed friction, click/no-lead evidence or broken routing.
- [ ] Verify acknowledgement, response expectation and privacy language.

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

- [ ] Lead classifications and counts reconcile or have explicit unresolved differences.
- [ ] No form content or PII enters GA4 or the repository.
- [ ] Every priority service has a specific offer and working conversion route.
- [ ] The selected change has evidence, one primary signal and a guardrail against lower lead quality.
- [ ] `npm test`, form/analytics/accessibility/mobile/desktop and `git diff --check` pass.
- [ ] Live test evidence and follow-up date are recorded.

## Completion Record

Record reconciled counts, unresolved differences, selected service/path, hypothesis, exact changes, validation, commit/deploy, live test and comparison date.
