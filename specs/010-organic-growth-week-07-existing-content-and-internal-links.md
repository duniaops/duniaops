# Organic Growth Week 07 — Existing Content and Internal-Link Consolidation

**Status:** Complete — targeted revisions, desktop/mobile views, Search Console availability, production form delivery, Netlify verification and GA4 test-event classification are verified.
**Type:** Content Optimisation / Information Architecture
**Priority:** P1
**Scheduled:** 19–25 October 2026
**Primary publications:** Material revisions to `software-project-rescue-uk.md` and `when-to-hire-devops-consultancy-uk.md`, plus a complete commercial-cluster link pass.
**Depends on:** Weeks 02–06 live or review-ready commercial architecture

## Outcome

Make existing authority support the new money pages, remove stale generic CTAs and eliminate accidental intent overlap before the production deadline.

## Weekly Deliverables

- [x] Audit every priority service/article URL against one primary intent; see Monday inventory below.
- [x] Update the Project Rescue article around its distinct informational role; targeted revision completed locally.
- [x] Update the DevOps consultancy article where current evidence, claims or new links warrant it; contextual child-guide link completed locally.
- [x] Build a parent/child/sibling internal-link map for rescue, support, DevOps, custom software and AI; see Monday inventory below.
- [x] Add descriptive contextual links from appropriate existing high-relevance pages; Rescue, DevOps guide and DevOps proof-path links added locally.
- [x] Verify each cluster has one commercial destination, proof path and service-specific CTA; source paths are mapped below and the revised DevOps CTA route/prefill is verified live. A successful form delivery is separate and remains NOT VERIFIED pending approval for a marked production test.

## Working Schedule

### Monday — content inventory and collision map

- Map every target query, primary URL, search stage, CTA and overlapping section.
- Freeze exact revisions; do not rewrite pages without a documented reason.

### Tuesday — rescue revision

- Update the rescue article's buyer guidance, service link, proof path and CTA.
- Preserve useful indexed content and annotate every material change.

### Wednesday — DevOps revision and link pass

- Update the DevOps article's claims, decision guidance and commercial links.
- Implement the approved cross-cluster internal links.

### Thursday — review and publish

- Review intent separation, anchor quality, orphan paths, claims and conversion journeys.
- Run repository-native validation and deploy only after explicit approval.

### Friday — close

- Verify both revised articles and all added links live on mobile and desktop.
- Record revision dates, Search Console states and new 7/14/28-day comparison dates.
- Update Completion Record and master tracker.

## Acceptance Criteria

- [x] Every priority URL has one documented primary intent and no unresolved duplicate owner; see Monday intent map.
- [x] Existing articles retain their useful purpose and link naturally to the correct service.
- [x] No link is added solely for keyword repetition.
- [x] Every commercial cluster has a path to proof and a working CTA/form; DevOps route, selected service, inline validation and successful labelled production delivery are verified.
- [x] `npm test`, generated-output/XML/link/mobile/desktop and `git diff --check` pass; repository tests/build/XML/link checks pass, plus 1680 px desktop and 390 px mobile checks on updated live pages with no horizontal overflow.
- [x] Live revisions, link map and observation dates are recorded; Search Console index state and live test are recorded below.

## Completion Record

Record collision/link-map location, revised paths/URLs, change rationale, validation, commit/deploy, live/index state, cohort dates and unresolved overlaps.

### Monday intent and link inventory — 19 October 2026

This is an editorial map based on the current source copy and routes, not a claim that Search Console has reported each phrase as a query. No content, generated output or production asset was changed on Monday.

| Cluster / URL | Primary intent and stage | Commercial owner / CTA | Current proof and link role | Decision |
|---|---|---|---|---|
| Project Rescue service — `/services/software-project-rescue` | Hire a senior team to assess, stabilise or take over stalled, fragile or unsupported software; commercial | Project Rescue Assessment, preselected rescue form | Anonymised earlier partner-led modernisation outcome is disclosed on-page; links to Support for stable ongoing ownership and to the rescue guide | Keep as the sole rescue service destination |
| Rescue guide — `/blog/software-project-rescue-uk` | Learn what to secure and assess when changing supplier or taking over a stalled project; informational / consideration | Rescue service and rescue-prefilled enquiry | Links to the rescue service and DevOps guide; its staged-recovery purpose is distinct from routine maintenance, but the stable-software hand-off distinction is not prominent | Preserve the useful guide; add one concise stable-vs-stalled distinction and a contextual link to the Support guide/service. Do not rewrite the article wholesale |
| Application Support service — `/services/application-support-maintenance` | Find a responsible team for ongoing maintenance of a broadly stable inherited application; commercial | Support Takeover Review, preselected support form | Clear scope boundaries, controlled onboarding and links to Rescue, DevOps and Software Consultancy | Keep as the sole ongoing-support destination |
| Support takeover guide — `/blog/can-a-new-company-maintain-software-it-did-not-build` | Understand whether and how a new supplier can safely maintain inherited software; informational / consideration | Application Support service and support-prefilled enquiry | Links to the Rescue guide/service when the system is stalled; this reciprocal distinction already exists | Preserve; do not duplicate the rescue guide’s recovery checklist |
| DevOps service — `/services/devops-and-cloud-consultancy` | Commission a bounded DevOps Health Check and proportionate cloud/delivery improvement; commercial | DevOps Health Check, preselected DevOps form | Scope and evidence-led outputs are clear; related links include the DevOps guide, Kubernetes guide, Support and Rescue. About has relevant disclosed engineering proof at `/about#experience`, but the route is not yet contextual from this page | Keep as the sole DevOps commercial destination; add a descriptive proof link during the link pass |
| DevOps guide — `/blog/when-to-hire-devops-consultancy-uk` | Decide when external DevOps support is useful and compare consultancy, freelancer, permanent hire and managed service; informational / consideration | DevOps service and DevOps-prefilled enquiry | Correct primary service link; the narrower Kubernetes consultant-vs-hire article now exists but is not linked from this broader guide | Retain core guidance; add a contextual link to the Kubernetes decision guide and a disclosed proof route if it reads naturally |
| Kubernetes decision guide — `/blog/kubernetes-consultant-or-permanent-hire-uk` | Choose external Kubernetes help versus a permanent platform owner; informational / consideration | DevOps service | Already links to the broader DevOps guide and commercial service | Treat as the DevOps child article; retain reciprocal service path |
| Custom Software service — `/services/custom-software-development` | Commission a new bespoke business application; commercial | Software Discovery Session, preselected custom-software form | Two anonymised, disclosed production outcomes; links to Support, Rescue, AI, Booking, Mobile and Consultancy | Keep as the custom-build destination |
| Bespoke cost guide — `/blog/bespoke-software-development-cost-uk` | Understand planning cost bands and scope drivers before commissioning; informational / consideration | Custom Software service | Contextual custom-software service link | Keep intent separate from the service; W05 indexation is a separate blocker below |
| AI Software service — `/services/ai-software-development` | Build or integrate a production AI product feature/workflow; commercial | AI project enquiry, preselected AI form | Links to the prototype-to-production guide and AI consultant/company guide, plus Custom Software | Keep as the AI implementation destination |
| AI decision guide — `/blog/ai-consultant-vs-ai-development-company` | Choose advice, implementation or a combined AI engagement; informational / consideration | AI service | Links to the AI service and adjacent Custom Software route | Keep as the AI decision-support article |

**Published — 19 October:** (1) `content/blog/software-project-rescue-uk.md` distinguishes ongoing maintenance for a broadly stable application from stalled/unstable recovery, with contextual links to the Support guide and service; its existing Rescue service link and CTA remain. (2) `content/blog/when-to-hire-devops-consultancy-uk.md` links to the narrower Kubernetes decision guide. (3) `services/devops-and-cloud-consultancy.html` links to `/about#experience` as disclosed earlier partner-led engineering experience. Both articles carry `updated: 2026-10-19`. Full `npm test` passed, including `build:site` and `check:site`; 310 public files, release routes, JSON-LD, navigation and internal links validated. `node --check scripts/build-blog.mjs`, `xmllint --noout sitemap.xml feed.xml`, and `git diff --check` pass. Commit `c145541` (`content(seo): clarify rescue and DevOps paths`) on `main` / `origin/main`; Netlify production deploy `6ad600380c53a989007003c6` reached `ready` and published 19 October 2026 11:34 UTC (12:34 BST). Live source-to-URL mapping: `content/blog/software-project-rescue-uk.md` → `https://www.duniaops.com/blog/software-project-rescue-uk`; `content/blog/when-to-hire-devops-consultancy-uk.md` → `https://www.duniaops.com/blog/when-to-hire-devops-consultancy-uk`; `services/devops-and-cloud-consultancy.html` → `https://www.duniaops.com/services/devops-and-cloud-consultancy`. All three routes and `/sitemap.xml` return HTTP 200; expected contextual links, article revision dates and sitemap lastmod are verified. Owner Ibrahim Uylas; change annotation `c145541`. No separate client permission is needed for the existing anonymised, explicitly partner-led proof; do not broaden its claims or add numbers/names.

**Post-release QA — 19 October:** HTTP 200, canonical metadata and live contextual links are verified for the updated pages. Desktop 1680 px and mobile 390 px checks passed without horizontal overflow; all relevant DevOps imagery loaded and the browser console reported no errors. The DevOps Health Check CTA navigates to `/?service=devops_cloud&from=devops_cloud#contact`, where the form selects DevOps. An empty-form submit stayed on the page, focused the first invalid field and rendered inline messages for name, work email and brief; the service selector was preselected. No successful form was submitted. Search Console URL Inspection says the Rescue article, DevOps article and DevOps service URL are each **URL is on Google / Page is indexed**. Live tests on 19 October at 14:00 BST (Rescue), 14:02 BST (service) and 14:03 BST (DevOps article) each say **URL is available to Google / Page can be indexed**, with one valid Breadcrumbs item. No request-indexing action was taken.

**Production conversion QA — 19 October, 15:17 BST:** One authorised synthetic enquiry was submitted from `https://www.duniaops.com/?service=devops_cloud&from=devops_cloud&measurement_test=1#contact`. The browser reached `/thank-you`; Netlify Forms lists the new verified `project-enquiry` submission with `Form Version=project_enquiry_v2`, `Landing Page Group=devops_cloud`, `What do you need?=devops_cloud` and `Test Submission=true`. The owner confirmed receiving the configured notification. GA4 Realtime recorded one `generate_lead` event and the `test_submission=true` parameter. The restricted `DuniaOps Organic Lead Ledger` records this as a test with unknown acquisition channel; the overview now shows 5 measurement tests, 0 qualified organic enquiries and 0 unresolved enquiries. No direct identifiers, enquiry text or Netlify submission ID are reproduced here. This is instrumentation evidence only, not a customer lead. No website source changed and no new deployment was required.

**W05 observation captured Monday:** source `content/blog/bespoke-software-development-cost-uk.md`; live URL `https://www.duniaops.com/blog/bespoke-software-development-cost-uk`; first production availability 9 October 2026 16:39 BST; owner Ibrahim Uylas; source release `8c678cb` / deploy `6ac90a9431a9180008315a26`. Search Console Web exact-page performance for 9–15 October: 0 impressions, 0 clicks, 0% CTR, average position 0/no data. This is a seven-calendar-date read, not yet a complete seven elapsed days from the 9 October 16:39 BST first-live time. URL Inspection remains `Discovered – currently not indexed`; sitemap and homepage are reported as discovery sources, with no recorded crawl. Live test on 19 October says URL is available to Google and can be indexed. No indexing request was made. This is zero-signal early evidence, not a content-performance conclusion. Recheck the first complete 7-day cohort when GSC includes 16 October; the 14-day comparison is due 23 October and 28-day 6 November. Do not repeat an indexing request; monitor crawl/index state and address internal discovery only if fresh evidence identifies a defect.

**Remaining schedule and owner:** No W07 production or validation work remains. Ibrahim Uylas owns the 7/14/28-day observations due 26 October / 2 November / 16 November. Carry forward the separate W06 conversion observation due 20 October / 27 October / 10 November; the DevOps test does not stand in for W06 AI conversion evidence. Both this W07 Completion Record and the master tracker are reconciled. No additional content or image is in scope.
