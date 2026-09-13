# Zoday next-release website handoff

Date: 2026-09-13. Status: Locally verified; not deployed.

This follow-up adds truthful localized availability copy, stable /tr and other
language routes, working landing-page language switches and official localized
Google Play badge images. It removes the current build's stale coming-next
claim through a separate availability data source, preserving historical copy.

## Task-owned paths

- content/zoday-landing/availability.json
- assets/products/google-play/ (five original official PNG files and provenance)
- scripts/build-zoday-landing.mjs
- js/legal-language.js
- netlify.toml
- this handoff

The checkout already had user edits in content/zoday-landing/{en.json,tr.txt,
de.txt,es.txt,pt-BR.txt}, css/zoday-landing.css, products/zoday.html,
docs/zoday-website-1.3.4-review.md and untracked js/zoday-landing.js. They were
preserved and are not represented as this task's changes. The preview uses
that full working tree; do not deploy or commit it wholesale without reviewing
those existing edits alongside the task-owned paths.

## Verification

Commit validation repeated `npm test` against a clean HEAD archive plus only
the task-owned runtime paths listed above, without the pre-existing user edits.
All checks passed and 140 public files were validated. All five generated
language routes contain the intended availability copy and official badge.
This proves that the task commit builds independently of the unrelated edits.
The earlier visual previews below used the full working tree (141 files).

`npm test` passes: site build, analytics/referral checks and validation of 141
public files including internal navigation. Local /tr/ returns HTTP 200.
EN/TR desktop and 390x844 phone previews show localized official badges with
clear space, no horizontal overflow and working TR-to-EN navigation (/en/).
The browser width check returned scrollWidth == innerWidth == 390. Five badges
were downloaded unchanged from Google's Partner Marketing Hub; their sources
are retained beside the assets.

The live /tr route was still 404 before deployment, and the old availability
text was still public. This document does not claim those public defects are
fixed. No Netlify deploy, live domain mutation or support-email replacement was
performed. The monitored replacement support address is still awaiting owner
input. Deploy the reviewed website tree and repeat the public /tr, badge,
language, store, support and privacy checks before closing R06.
