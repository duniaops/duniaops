# Organic Growth Week 03 — Application Support Cluster

**Status:** Live — the companion article was published early on 11 September 2026. The operating boundaries were approved and the Application Support & Software Maintenance commercial parent was deployed on 14 September; index and cohort monitoring remain open.
**Type:** Commercial Service Page / Blog Article
**Priority:** P1
**Scheduled:** 21–27 September 2026
**Primary publications:** `/services/application-support-maintenance` and `Can a New Company Maintain Software It Did Not Build?`
**Depends on:** Weeks 01–02 and approved support boundaries

## Outcome

Own the explicit need for ongoing support of inherited software with a commercial page and a separate practical decision guide.

## Weekly Deliverables

- [x] Write and implement the Application Support & Software Maintenance service page.
- [x] Write the companion article as original British English under `content/blog/`.
- [x] Explain onboarding, code/environment assessment, observability, runbooks, maintenance, improvement and rescue boundaries.
- [x] Add service-specific CTA/form routing and rescue/DevOps/proof links.
- [x] Prepare, approve and inspect one unique 1200x630 article image.

## Owner Input Gate — ibrahim uylas, decision due 15 September

- [x] Confirm that support hours and availability are agreed per engagement; do not imply 24/7 coverage by default.
- [x] Confirm that response and restoration targets are contract-specific. The approved `We normally reply within two working days` wording applies to a new enquiry, not an operational support SLA.
- [x] Confirm the incident boundary: DuniaOps may triage and remediate agreed software components, while client decisions, third-party services and responsibilities outside the agreed system remain explicitly assigned.
- [x] Confirm the access baseline: named least-privilege accounts, MFA where available, controlled production access, usable repository/environment ownership and an agreed release/rollback route.
- [x] Confirm exclusions: no implied penetration test, legal/compliance opinion, universal-stack coverage, guaranteed restoration time or out-of-scope infrastructure ownership.
- [x] Confirm that coverage, onboarding effort and price are proposed only after the Support Takeover Review establishes the system and service boundary.

## Working Schedule

### Monday — freeze the two-asset brief

- Keep intent distinct: the service page converts; the article explains feasibility, risks and process.
- Confirm support hours, SLA language, technical access requirements and excluded promises.

### Tuesday — write

- Write the service page first.
- Complete article front matter, outline and first draft with primary-source checks where needed.

### Wednesday — implement and link

- Implement service metadata, schema, CTA and commercial links.
- Edit the article, add contextual links and create/inspect the approved hero image.

### Thursday — review and publish

- Check originality, duplication, security/privacy and unsupported operational promises.
- Keep `draft: true` until copy/image approval; build and deploy both assets only after explicit approval.

### Friday — close

- Verify both live URLs, generated blog surfaces, sitemap/RSS/redirects, canonical, reciprocal links and CTA/form.
- Record Search Console state and 7/14/28-day observation dates.
- Update Completion Record and master tracker.

## Acceptance Criteria

- [x] Service page explicitly supports software DuniaOps did not originally build.
- [x] Article and service page have distinct intent and no substantial duplication.
- [x] Support/SLA promises are approved and achievable.
- [x] Article has valid front matter, original copy, current sources where needed, natural links and a unique verified 1200x630 image.
- [x] `npm test`, blog/site/XML/link/mobile/desktop and `git diff --check` checks pass.
- [ ] Live, conversion and indexing evidence is recorded.

## Completion Record

Record service/article paths and URLs, draft/publication/image state, operational boundaries, validation, commit/deploy, live/index results, cohort dates and blockers.

### Companion article published early — 11 September 2026

- **Source:** `content/blog/can-a-new-company-maintain-software-it-did-not-build.md`
- **Generated page:** `blog/can-a-new-company-maintain-software-it-did-not-build.html`
- **Live URL:** `https://www.duniaops.com/blog/can-a-new-company-maintain-software-it-did-not-build`
- **Publication/owner:** 11 September 2026; ibrahim uylas is owner and factual/copy/deploy approver.
- **Change evidence:** commit `596bd6a` (`feat(blog): publish inherited software support guide`); Netlify production deploy `6aa3ded37934dd0008b0273d` reached `ready` at 11:58 BST.
- **Editorial/image state:** published with valid front matter, original British English, primary NCSC/ICO sources and the approved unique `assets/blog/can-a-new-company-maintain-software-it-did-not-build-1200x630.jpg` image.
- **Conversion state:** the live article CTA routes to `/?service=support&from=blog#contact`, where support preselection is available. Its reciprocal commercial-parent link went live with the Application Support service release on 14 September.
- **Live/index state:** live HTTP 200 and present in generated blog/home/RSS/sitemap/redirect outputs. Search Console URL Inspection on 14 September reported `URL is unknown to Google` and not indexed, with no crawl or referring sitemap yet detected; the canonical URL is present in the live sitemap and no indexing request was sent.
- **Cohort dates:** 18 September / 25 September / 9 October, recalculated from the actual live date.
- **Remaining cluster work:** observe the article on 18 September and the new commercial-parent service on 21 September; record Search Console discovery/index state without submitting an indexing request unless separately authorised.

### Application Support service local release candidate — 14 September 2026

- **Source/public route:** `services/application-support-maintenance.html` → `/services/application-support-maintenance`.
- **Owner decision:** ibrahim uylas approved all six support, SLA, incident, access, exclusion and commercial-boundary statements on 14 September 2026.
- **Positioning:** controlled takeover and steady-state ownership for broadly stable inherited software; Project Rescue remains the route for unstable or unreproducible systems, and DevOps remains the route for focused platform/release constraints.
- **Commercial boundary:** no default 24/7 coverage, universal-stack commitment or guaranteed restoration time. Coverage, escalation, response targets, onboarding effort and price follow the Support Takeover Review and a defined system boundary.
- **Conversion/link state:** support-preselected CTA plus reciprocal links across the article, homepage, About, Project Rescue, DevOps and Software Consultancy are implemented locally.
- **Technical state:** canonical metadata, Service/Breadcrumb/FAQ schema, clean URL redirect, sitemap entry and release checks are implemented. The existing approved article image supplies the service's social preview.
- **Validation:** `npm test` validated 151 public files with no broken internal links; JavaScript syntax, sitemap/feed XML and `git diff --check` passed. Desktop and 390×844 mobile visual checks passed, the support CTA preselected `Application support and maintenance`, and the browser console reported no warnings or errors.
- **Publication state:** local only; no commit, push, production deployment, live verification or Search Console action has been made for this service page.

### Application Support service production release — 14 September 2026

- **Commit/deploy:** commit `391212f` (`feat(services): add application support takeover page`) pushed to `origin/main`; Netlify production deploy `6aa7c66397876156ed30ef9f` is live.
- **Live verification:** the service, homepage, companion article and sitemap each returned HTTP 200. Canonical metadata, the support-preselected CTA, homepage placement, the article-parent link and the sitemap entry were verified against `https://www.duniaops.com`.
- **Cohort dates:** 21 September / 28 September / 12 October, calculated from the actual 14 September publication date.
- **Index state:** no new Search Console inspection, live test or indexing request was made for the service at publication; capture the first state at the 21 September cohort check.
