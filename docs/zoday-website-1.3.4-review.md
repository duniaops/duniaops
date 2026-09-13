# Zoday website draft — 1.3.4 handoff

Updated: 2026-09-13. Status: implemented and locally reviewed; **not deployed**.

## Content and routing

Source: `/Users/uylas/Documents/DuniaOps/Projects/zoday/docs/WEBSITE-UPDATE-HANDOFF-1.3.4.md`.

The five-language landing page (en, tr, es, pt-BR, de) now leads with daily sign readings, the Moon calendar
and a private reflection journal. It includes a five-screen walkthrough,
optional AI/traditional readings, Free/Plus comparison, five app languages,
anonymous start, JSON export, deletion, optional reminders, an upcoming 1.3.4
section and FAQ. Screenshots and alt text match the selected language. The compact header selector
uses the existing legal-page interaction. Initial homepage HTML and sharing
metadata are generated in five languages; Netlify query rules select them on the
subdomain. Support and privacy pages share the same dark branded shell. Header
and footer links retain the current language; invite routes remain intact.

The handoff's legacy domain information predates the subdomain migration already
approved in this task. The canonical subdomain and all existing redirect rules
are retained. Store links retain website attribution. Sharing metadata still
uses the Zoday logo, not an app screenshot. No price, free trial, invitation
reward, unlimited-reading or public 1.3.4 claim has been added.

## Release evidence

Reviewed in the source repository:

- `store/play/1.3.4/RELEASE-READINESS.md`: public Android baseline 1.3.3 (18);
  1.3.4 (20) available to internal testers, general owner device smoke passed.
- `store/app-store/1.3.4/TESTFLIGHT-RECORD.md`: 1.3.4 (55) internal TestFlight,
  general owner iPhone smoke passed; not public App Store availability.
- `store/play/1.3.3/growth-2026-09-12/CAPTURE-PREFLIGHT.md` and
  `ASSET-MANIFEST.json`: screenshots are review-only.

Public Google Play availability is carried forward from the existing published
page and the handoff baseline. An independent store fetch during this update
returned HTTP 503; it did not establish a newer public version. No public
version badge is displayed. iOS remains “Coming soon”, with no download link.

## Assets and provenance

Public optimized copies: `assets/products/zoday-preview/`.
Retained original files, source manifest and SHA-256 provenance:
`source-assets/zoday/2026-09-13/` (outside the build's public allowlist).

Six English screenshots were inspected individually. Their localized equivalents
were copied and visually reviewed in contact sheets for the other four languages; all 30 original SHA-256 hashes matched
the source manifest: Today, daily horoscope, optional readings,
Moon calendar, new check-in and journal history. Original screenshots are
1080 × 1920 RGB PNG. Web copies are 810 × 1440 JPEG at quality 85, with no crop,
retouching, added UI or aspect-ratio change. Each screenshot opens separately
for closer reading. Hero and optional-reading screenshots display at up to
310 px wide; gallery screens at 300 px wide with horizontal scrolling.

Full transparent logo, transparent mark and current app icon were also inspected,
copied and optimized to 512 px width. Brand sources are retained unchanged.
Existing live assets were not overwritten.

## Required before publication

- Replace or validate all selected development UI previews against the intended
  signed release. They come from source `53b8bbf` and an Expo development client
  reporting Android 1.3.1/version code 1, not signed 1.3.4 (20).
- Specifically check the daily horoscope screenshot's old NASA source line.
  Do not treat it as scientific validation of astrology. The source screenshot
  is retained as-is for review rather than edited to invent release behavior.
- Journal history uses the documented fictional fixture with no private note.
  Its actual selected 90-day tab differs from the preflight narrative describing
  a 30-day view; verify the intended membership/period state in final captures.
- Reconfirm public release and store availability before changing “upcoming” or
  iOS availability. Do not relabel old iOS 1.3.3 assets as 1.3.4.
- Remove the visible draft banner and preview captions only after screenshot
  verification. The standard build includes these draft public assets, so this
  checkout is not ready for an unattended production deploy.

## Validation

- `npm test`: analytics, invite behavior, site build and link/schema checks pass (130 public files).
- All 20 local page/language combinations returned HTTP 200; five Netlify
  subdomain homepage query rules resolve to localized generated HTML. Legacy
  www/apex redirects remain present. This is configuration/local verification,
  not a claim that the draft is deployed.
- Browser: Turkish → German homepage selection, Turkish → Spanish support
  selection and return to the Spanish homepage; Portuguese mobile homepage
  and Spanish support had no document-level horizontal overflow at 390 px.
- Original screenshot SHA-256 hashes matched source manifest.
- Local desktop and mobile visual checks; gallery/full-image access, FAQ and
  download anchors checked. No document-level horizontal overflow at 390 px;
  screenshot gallery and comparison table scroll within their own containers.
- Shared consent dialog translated into all five languages.
- Shared consent dialog contrast corrected for the dark landing-page styling.
