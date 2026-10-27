# Organic Growth Week 06 — AI Service and Buyer Cluster

**Status:** Production published 13 October — article and AI service refresh are live; HTTP, canonical, image, sitemap and generated-surface checks pass. Search Console URL Inspection confirmed both URLs indexed on 16 October. The first complete seven-date performance cohort (14–20 October) was captured on 22 October; the 14-day cohort (14–27 October) was captured 27 October, with both reports last updated 4 hours before capture. AI service: 112 impressions / 0 clicks / position 68.4; decision article: 164 / 0 / 78.7; both 0% CTR. Conversion evidence remains NOT VERIFIED because no form was submitted. Source is reconciled to `main`/`origin/main` at `fb06c88`; current ready production deploy is `6ad16dbed6ce22019808a29b`. The 28-day observation is due 10 November.
**Type:** Commercial Optimisation / Blog Article
**Priority:** P1
**Scheduled:** 12–18 October 2026
**Primary publications:** Refreshed AI service page and `AI Consultant vs AI Development Company: Which Do You Need?`
**Depends on:** Weeks 01–02, Week 05 commercial architecture and current primary sources

## Outcome

Separate “build AI-enabled software for us” from AI-assisted software delivery and give UK buyers a credible comparison route.

## Monday research and intent lock — 12 October 2026

- **Search Console source:** `sc-domain:duniaops.com`, Web, read 12 October; 28-day data covers 13 September–10 October and was updated about 8 hours before the read. Site total: 380 impressions, 3 clicks, 0.8% CTR, average position 39. The AI service URL had 46 impressions, 0 clicks, 0% CTR and average position 57.4.
- **Observed AI service queries:** `ai development services london` (11 impressions), `ai software development service` (8), `ai software development services` (7), `ai software development consultancy` (6), `best fixed-price development services for building ai prototypes in under 30 days` (3), `ai-accelerated software development company` (1), and `ai-powered software development services uk` (1). This is a small, low-ranking sample: use it to distinguish intent, not to claim demand or forecast outcomes.
- **Service-page intent:** commercial/decision-stage buyers looking for a UK delivery partner to design, build or integrate AI capabilities into a product or business workflow. Lead with tangible work—assistants/search, document processing and workflow automation—plus integration, evaluation, privacy/security, operating cost and production ownership. Treat AI coding agents as a supervised delivery method, not the service's sole buyer proposition. Do not promise fixed delivery times, savings or model performance without evidence.
- **Article intent:** consideration-stage buyers deciding whether they need an adviser, an implementation company or both. Explain the distinction without implying all consultants only advise or all development firms can provide strategic discovery. Give a practical decision path, questions to ask, delivery boundaries and handover; make the service page the natural next step. Keep this separate from the existing “From AI Prototype to Production” implementation-readiness article and do not target the service page's core `AI software development services` query cluster.
- **CTA and proof:** retain the existing AI-preselected enquiry path and use a clear “Discuss your AI project” action; do not promise a separate free assessment or fixed-scope review. Use the senior-engineering/production-readiness process and the existing prototype-to-production article as proof. No named client, testimonial or AI-specific customer result is approved for this cluster.
- **Owner and approval:** Ibrahim Uylas owns the service page, article, factual review, image approval and publication decision. Maximum two primary public assets this week; service page first if capacity slips.
- **Primary-source set, rechecked 13 October:** [NCSC Guidelines for secure AI system development](https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development) covers secure design, development, deployment and operation; [ICO guidance on AI and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/about-this-guidance/) still says it is under review after Data (Use and Access) Act changes; [GOV.UK AI Risk Management Toolkit](https://www.gov.uk/government/publications/ai-risk-management-toolkit/ai-risk-management-toolkit-guidance) remains published 8 September 2026 and covers AI risk assessment; and [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) remains a voluntary risk-management reference, not UK regulation. The copy avoids legal advice, fixed model prices and unsupported performance claims. Recheck again only if any source or time-sensitive claim changes before approval.
- **Indexing blocker to protect:** the Custom Software service remains `URL unknown to Google` in Search Console despite its presence in the deployed sitemap and a live test that says it can be indexed; do not send another indexing request. Investigate sitemap discovery and internal links before optional copy changes. The support-takeover article is still `Discovered – currently not indexed`, with zero impressions/clicks in the latest 28-day report and a Google-reported cross-site referrer that currently returns 404; record this separately from W06 publication work.

## Weekly Deliverables

- [x] Rewrite the AI proposition around real AI features/products, workflow automation, document processing, assistants/search and production readiness.
- [x] Explain data readiness, privacy, security, evaluation, model choice, running cost and human oversight.
- [x] Write the companion article as original British English.
- [x] Complete the cluster cross-links: service links to Custom Software, the live prototype guide and this article; article links to the service and both live guides.
- [x] Prepare, approve and inspect one unique 1200x630 article image.
- [x] Give time-sensitive claims a source and review date; official source set rechecked 13 October.

## Working Schedule

### Monday — split service and article intent

- Review current AI queries and buyer questions.
- Freeze separate service/method messages, proof, CTA, sources and owner/approver.

### Tuesday — write

- Write the service-page revisions first, then the full comparison article/front matter.
- Verify current model, regulatory, privacy and cost claims using primary sources.

### Wednesday — implement and link

- Implement service copy, metadata, schema and CTA.
- Complete article editing, links and approved image production/inspection.

### Thursday — review and publish

- Check claim durability, duplication, human oversight, accessibility, mobile/desktop and generated output.
- Publish only after approval; otherwise retain `draft: true` and record the blocker.

### Friday — close

- Verify service/article URLs, blog index/home/RSS/sitemap/redirects, reciprocal links, CTA/form and Search Console state.
- Record claim review dates and 7/14/28-day observation dates.
- Update Completion Record and master tracker.

## Acceptance Criteria

- [x] A buyer can distinguish AI product delivery from AI-assisted software delivery.
- [x] Service page and article answer separate commercial questions.
- [x] Time-sensitive claims have current primary-source evidence and review dates; official sources rechecked 13 October and linked in the draft.
- [x] Article has valid metadata, original copy, natural links and an approved, verified 1200x630 image.
- [x] `npm test`, blog/site/XML/link/mobile/desktop and `git diff --check` pass; keyboard smoke check reached the skip link and primary navigation in order on 13 October.
- [ ] Conversion evidence is recorded. Search Console URL Inspection was read on 16 October and both assets are indexed; no form was submitted, so conversion remains NOT VERIFIED.

## Completion Record

Record final proposition, service/article paths and URLs, sources/review dates, image/draft state, validation, commit/deploy, live/index results and cohort dates.

### Monday source and intent snapshot — 12 October 2026

- **Completed:** reviewed the current AI service and existing AI article cluster, read Search Console query/page evidence and froze distinct service-versus-buyer-guide intents, CTA, proof boundary, owner, publication cap and primary-source set above. At the research snapshot, no page/article copy or image had yet been created; the later same-day drafting work is recorded below. Nothing was published or deployed.
- **Source window:** Search Console Web, `sc-domain:duniaops.com`, 28 days 13 September–10 October; read 12 October, last updated about 8 hours earlier. Site 380/3/0.8%/39; AI service 46/0/0%/57.4 (impressions/clicks/CTR/average position). Query rows are low volume and non-predictive.
- **Carry-over before publication:** Custom Software remains URL-unknown/not indexed although its deployed sitemap source includes it and a live test says indexable; investigate discovery, do not repeat the accepted 9 October indexing request. Application Support has 44/0/0%/72 for 13 September–10 October, short of a complete 28-day cohort from 14 September. Support-takeover article has 0/0 over 28 days and remains discovered-not-indexed; its reported Rockimals referrer is currently 404. Netlify aggregate: 4 form submissions, latest 12 October 13:42 UTC; individual verification and qualified-organic count NOT VERIFIED; no PII was read.
- **W05 reconciliation:** cost article is `draft: false` with its unique image and generated outputs in `8c678cb`; current production deploy `6acc27c06af9a70008475782` is ready on 12 October. Public content was verified. Front matter displays 5 October, but earliest production publication before 12 October is NOT VERIFIED. This was a post-close user-authorised third W05 asset. Do not exceed W06's two-asset cap.
- **Next dates:** Ibrahim Uylas owns final source and claim review, article/image approval and deployment approval. Verify W05 earliest deploy by 13 October; recheck Application Support when GSC includes 11 October or later; lead ledger privately by 13 October; W06 7/14/28-day observations should be dated from actual first production availability, not target dates.

### Monday drafting update — 12 October 2026

- **Service-page source:** `services/ai-software-development.html`, revised locally on 12 October. The proposition now leads with AI assistants, document processing, knowledge search, workflow automation, integrations and prototype-to-production work. It explains workflow/data discovery, evaluation, privacy/security, running cost and operational ownership; AI coding tools are described as a delivery method, not the service. Metadata, Service/Breadcrumb/FAQ schema, homepage copy, About contextual link, links to Custom Software and the live prototype guide, and the existing AI-prefilled CTA were updated. The reciprocal link to the comparison article is deliberately held until that article is approved and published, avoiding a broken production link. Intended live URL: `https://www.duniaops.com/services/ai-software-development`. It is not deployed; no public revision date or live status is claimed.
- **Article source:** `content/blog/ai-consultant-vs-ai-development-company.md`, title “AI Consultant vs AI Development Company: Which Do You Need?”, authored 12 October, approved for publication 13 October; front matter date is set to 13 October and `draft: false`. It answers the partner-selection question separately from the service page and existing prototype-production guide; it includes NCSC, GOV.UK and ICO primary-source links, and links to the AI service, Custom Software and prototype-to-production content. Intended URL: `https://www.duniaops.com/blog/ai-consultant-vs-ai-development-company`; production verification pending.
- **Image:** `assets/blog/ai-consultant-vs-ai-development-company-1200x630.jpg`, unique 1200×630 JPEG, inspected at full size on 12 October and approved by Ibrahim on 13 October. Alt: “A product and engineering team reviewing an AI workflow together around a table in a bright office”.
- **Current state / dependencies:** service refresh and article are live following the user-authorised production deploy. `npm test` passed; build produced 11 published articles and 313 public files with no broken internal links. `xmllint --noout dist/sitemap.xml dist/feed.xml`, `node --check scripts/build-blog.mjs` and `git diff --check` pass. Desktop/390px mobile and a keyboard smoke path were reviewed; full assistive-technology review remains open. Primary sources were rechecked 13 October. The selected AI service visual is now live in follow-up deploy `6acdfa6d41201f0e27f28702`; desktop/mobile browser checks confirm image load, intended responsive layout and no horizontal overflow. No form was submitted; Search Console index state has not been checked after publication. CLI deploys have no Git commit ref; source changes remain uncommitted, so a later push to `main` could replace this live snapshot. Ibrahim owns source-control reconciliation and the next measurement checks.
- **Measurement:** first production availability for both W06 assets is 13 October 2026 at 08:40 BST (Netlify `published_at` 07:40:41Z); cohort checks are 20 October / 27 October / 10 November. Search Console indexing remains NOT VERIFIED, and the form was not submitted. Friday close must record source path, live URL, publication/revision date, owner, change annotation, deploy id, canonical/sitemap and Search Console state, plus conversion evidence; report unavailable evidence as `NOT VERIFIED`.

### Tuesday blocker and cohort refresh — 13 October 2026

- **Application Support 28-day checkpoint:** Search Console Web, exact page filter, latest update 9 hours before read; report still covers 13 September–10 October (27 post-publication dates after the 14 September launch). Result unchanged: 44 impressions, 0 clicks, 0% CTR, average position 72. This is not a complete 28-day live cohort; recheck on 14 October only if data extends through 11 October or later. No performance change is inferred.
- **Custom Software discovery:** URL Inspection still says `URL unknown to Google`, no referring sitemap/page and no crawl. Read-only live test on 13 October says URL is available to Google, can be indexed and has one valid Breadcrumbs item. The submitted sitemap is `Success`, with 29 discovered pages, but its last read was 6 October. Public sitemap returned HTTP 200 and contains the canonical URL with `<lastmod>2026-10-05</lastmod>`; the homepage source also links to the service. No code omission was identified; do not resubmit the sitemap or repeat the 9 October indexing request. Owner Ibrahim to monitor for a natural sitemap reread/crawl and investigate only if the state remains unknown after Google refreshes its sitemap data.
- **Support article:** URL Inspection remains `Discovered – currently not indexed`, no crawl; its listed sitemap is detected and the reported Rockimals referring URL still returns 404. No indexing request was submitted. Keep cause `NOT VERIFIED`; do not change its canonical or create a replacement article to force indexing.
- **Netlify:** read-only `duniaops` project/form metadata rechecked 13 October. Production deploy remains `6acc27c06af9a70008475782` (`ready`); `project-enquiry` remains at 4 submissions, latest activity 12 October 13:42 UTC. The connector exposes no individual classification here, and no submission content/PII was opened. Qualified-organic count remains `NOT VERIFIED`; Ibrahim owns authorised private classification and ledger update, due 13 October.
- **Source and keyboard review:** rechecked the NCSC secure-AI lifecycle guidance, ICO AI/data-protection review notice, GOV.UK toolkit publication date/content and NIST AI RMF status on 13 October. The local service preview's keyboard smoke path reached the skip link and primary navigation in sequence; this is not a full assistive-technology audit. At this checkpoint, before the later publication approval below, no public asset had been generated or published.
- **Publication approval — 13 October:** Ibrahim approved the comparison article and its unique image. Front matter is set to first-live date `2026-10-13` and `draft: false`; the reciprocal service-to-article link is included. Production deploy and live verification remain pending.
- **Production release — 13 October:** Netlify deploy `6acde06d9e5f8ae9cf24f744` (`ready`, published 07:40:41 UTC / 08:40 BST; CLI deploy, `commit_ref: null`) first served both W06 assets. Article and image return HTTP 200; article title, published date, canonical and image metadata are present. AI service returns HTTP 200, includes the reciprocal article link and AI-prefilled CTA. Article appears in generated blog index, homepage, RSS feed, sitemap and clean-URL redirect. A service-visual revision was published in deploy `6acdfa6d41201f0e27f28702` (ready, published 09:31:30 UTC / 10:31 BST): selected 1200×630 visual, versioned CSS link, and verified two-column desktop / stacked mobile layout with no overflow; service and image return HTTP 200. No form submission or Search Console URL inspection/indexing request was made. Production source is not yet in Git history; reconcile after explicit commit/push approval. Next page-age observations: 20 Oct / 27 Oct / 10 Nov.

### Tuesday evidence reconciliation — 13 October 2026

- **W05 carry-over:** Netlify deploy history now verifies the cost article's earliest production availability as 9 October 2026 15:39:15 UTC / 16:39:15 BST, deploy `6ac90a9431a9180008315a26`, on commit `8c678cbf0c337b675107641e99522f9d9fb9c104`. The prior production deploy returned HTTP 404 at the article URL; the confirmed deploy returns HTTP 200. Its 7/14/28-day observations are 16 October / 23 October / 6 November. Full evidence is recorded in Spec 008 and the asset register.
- **Lead carry-over:** the authorised Netlify verified-submissions view and private ledger reconciliation supersede the earlier connector-only snapshot above. Four verified submissions are classified privately as measurement tests; the overview is 0 qualified organic, 0 unresolved, 4 tests. The two July records were owner-created test entries; they are not prospects. No PII or submission ID was copied into this repository, and the spam queue was not changed. Further reconciliation is only needed when new verified submissions arrive.
- **W06 remains open:** first-live time for both W06 assets remains 13 October 07:40:41 UTC, with cohort checks 20 October / 27 October / 10 November. Post-publication Search Console index state and conversion outcomes are NOT VERIFIED. Ibrahim owns source-control reconciliation and those observations; no additional publication is implied by this update.

### Week 06 Friday close — Search Console and source reconciliation — 16 October 2026

- **Assets and ownership:** W06-A source `services/ai-software-development.html` → `https://www.duniaops.com/services/ai-software-development`; W06-B source `content/blog/ai-consultant-vs-ai-development-company.md` → `https://www.duniaops.com/blog/ai-consultant-vs-ai-development-company`. Both first served 13 October 2026 08:40 BST; the service visual revision at `assets/ai-software-development-production.jpg` was first served 10:31 BST. Ibrahim Uylas owns and approved the changes. No third W06 public asset was added.
- **Source/deploy reconciliation:** the relevant source is committed as `fb06c88cd6c42896caaf39c8948676de79a7edde` on `main` and `origin/main`. Current Netlify production deploy `6ad16dbed6ce22019808a29b` is ready, published 16 October 2026 01:20 BST, branch `main`, commit `fb06c88`; the previous CLI deploys are historical snapshots, not outstanding source drift. Change annotation: AI service positioning, homepage/About links, reciprocal buyer-guide links and responsive service artwork.
- **Search Console:** read-only URL Inspection on 16 October reports both AI service and buyer-guide URLs “URL is on Google” / “Page is indexed”, with one valid Breadcrumbs item each. No indexing request was submitted. Search Console performance data is available only through 13 October; these pages have not yet reached the first 7-day cohort date. 7/14/28-day checks remain 20 October / 27 October / 10 November, owner Ibrahim.
- **Conversion:** no form was submitted and no conversion evidence was produced for these pages. Keep the conversion criterion open as NOT VERIFIED; do not treat the private total of four tests and zero qualified organic enquiries as page-attributed outcomes.
- **Acceptance criteria:** intent split, page/article distinction, dated primary-source support, article metadata/copy/internal links/unique approved image, and repository-native technical/accessibility checks are DONE as evidenced above. Search Console state is now recorded; the conversion-evidence portion is NOT VERIFIED and remains the sole open criterion.
- **Remaining work:** Ibrahim to capture W06 page-level performance and conversion evidence on 20 October, 27 October and 10 November; record exact GSC window/freshness and any eligible attributed lead without PII. For the W05 cost article, Ibrahim to repeat the incomplete 7-day observation on 19 October. Update this Completion Record, the master tracker, measurement ledger and asset register at each check.
- **Validation:** public HTTP checks for both pages and images returned 200; canonical, sitemap/generated outputs and responsive visual checks remain as recorded in the 13 October release evidence. Run `git diff --check` for this documentation reconciliation before handoff; no site rebuild or deployment is needed.

### W06 first complete seven-date Search Console cohort — 22 October 2026

- **Source and freshness:** Google Search Console, property `sc-domain:duniaops.com`, Search type Web, exact-page filters; captured 22 October. Both reports showed “Last update: 4 hours ago” and cover the seven complete calendar dates 14–20 October, after the partial first-live date (13 October). No GA4, Netlify or private-ledger refresh was part of this Search Console read.
- **AI service:** source `services/ai-software-development.html`; live URL `https://www.duniaops.com/services/ai-software-development`; first production availability 13 October 2026 08:40 BST; Search Console reports 39 impressions, 0 clicks, 0% CTR and average position 62.7. Visible queries included “ai software development agency” (25 impressions), “ai software development service” (6), “ai software development services” (5), “artificial intelligence software development services” (2), and a fifth query with 1 impression. These early counts are directional only.
- **AI decision article:** source `content/blog/ai-consultant-vs-ai-development-company.md`; live URL `https://www.duniaops.com/blog/ai-consultant-vs-ai-development-company`; first production availability 13 October 2026 08:40 BST; Search Console reports 86 impressions, 0 clicks, 0% CTR and average position 78.5. Fifteen queries were reported; visible examples include “ai consultation and development” (14 impressions), “ai consulting & development services” (11), and “ai development consultancy” (8). This is early discovery evidence, not a performance conclusion.
- **Owner and annotation:** Ibrahim Uylas; source commit `fb06c88`, production deploy `6ad16dbed6ce22019808a29b`; change annotation `W06 first complete seven-date GSC cohort`. No content, account configuration, indexing queue or production state changed during the read.
- **Status and next steps:** the scheduled 7-day Search Console performance observation is DONE. Keep the conversion acceptance criterion NOT VERIFIED: this report cannot prove form delivery or attribute a lead, and no AI-prefilled production form test was submitted. The 14/28-day Search Console observations remain due 27 October / 10 November. Continue to record any genuine enquiry through the existing private qualification process; do not infer one from impressions or clicks.

### W06 14-day Search Console cohort — 27 October 2026

- **Source and freshness:** read-only Google Search Console Web reports for property `sc-domain:duniaops.com`, exact page filters; captured 27 October. Both reports showed “Last update: 4 hours ago” and covered 14–27 October, the 14 complete calendar dates after the partial first-live date on 13 October. No form, indexing request or account setting was changed.
- **AI service:** source `services/ai-software-development.html`; live URL `https://www.duniaops.com/services/ai-software-development`; first production availability 13 October 2026 08:40 BST; 112 impressions, 0 clicks, 0% CTR and average position 68.4. The visible report listed eight queries. These early figures are discovery evidence only.
- **AI decision article:** source `content/blog/ai-consultant-vs-ai-development-company.md`; live URL `https://www.duniaops.com/blog/ai-consultant-vs-ai-development-company`; first production availability 13 October 2026 08:40 BST; 164 impressions, 0 clicks, 0% CTR and average position 78.7. Nineteen queries were reported; the table displayed the first ten. Do not treat impressions or query breadth as leads or business impact.
- **Owner and annotation:** Ibrahim Uylas; source commit `fb06c88`, production deploy `6ad16dbed6ce22019808a29b`; annotation `W06 14-day GSC cohort`. The exact report date range is 14–27 October.
- **Status and next steps:** the 14-day Search Console observation is DONE. Conversion remains NOT VERIFIED: no AI-prefilled production form test or attributed qualified enquiry is recorded. The 28-day Search Console cohort is due 10 November; capture exact report freshness and range then. No copy or indexing change is justified by this cohort alone.
