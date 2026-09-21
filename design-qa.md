# Rockimals legal pages design QA

## Evidence

- Source visual truth: `/var/folders/y_/wpm7ltr94vj4f0m5tcc8dcdr0000gn/T/codex-clipboard-045b95c1-d488-4a82-82a0-672c6b4d6768.png`, the existing Rockimals landing page at `https://rockimals.duniaops.com/`, and Zoday's language control at `https://zoday.duniaops.com/support`.
- Implementation: `http://127.0.0.1:4173/rockimals/support.html?lang=en`, `http://127.0.0.1:4173/rockimals/support.html?lang=tr`, and `http://127.0.0.1:4173/rockimals/privacy-policy.html?lang=en`.
- Browser-rendered screenshots: captured inline with the Codex in-app browser at 1440 × 1000 CSS px and 390 × 844 CSS px. The browser surface does not expose a persistent screenshot file path.
- Source screenshot pixels: 2362 × 1012 before conversational resizing; card comparison focused on the visible Rockimals/Zoday hero treatment.
- Implementation density: browser default device scale; no density normalization was required for layout judgement because the reference card and implementation were inspected at their native responsive sizes rather than compared pixel-for-pixel.
- State: English support with language menu closed/open, Turkish support after selection, English privacy policy, and the products grid with the Rockimals card title/icon restored.
- Primary interactions tested: language menu open/close, keyboard-accessible popover structure, English-to-Turkish selection, localized title/copy update, and related-page navigation targets.
- Console warnings/errors: none.

## Full-view comparison

The legal pages now use the Rockimals landing page's deep navy space palette, Fredoka display typography, orange highlights, real multi-animal hero artwork, rounded dark reading panel, branded header, and compact footer. The language selector follows Zoday's top-right trigger/popover structure while adopting Rockimals colors. Desktop and mobile layouts preserve the same hierarchy without overflow.

The products-card comparison confirms that the generated image itself remains text-free while the HTML overlay restores the `Rockimals` title at lower left and the app icon at upper right, matching the Zoday card composition.

## Focused-region comparison

- Header/dropdown: brand left, language trigger right, 44 px minimum control height, globe/chevron affordances, selected-language checkmark, and eight visible locale choices match the Zoday interaction pattern.
- Hero: title, supporting metadata, and related legal-page CTA retain readable contrast over the Rockimals artwork at both tested breakpoints.
- Document surface: heading hierarchy, email/contact emphasis, link color, rules, and long translated copy remain legible against the dark panel.
- Product card: title and icon positions match the adjacent Zoday card; source artwork contains no embedded text.

## Required fidelity surfaces

- Fonts and typography: Fredoka is used for Rockimals brand/display headings; Inter remains the reading and UI face. Weight, wrapping, and hierarchy are consistent at desktop and mobile sizes.
- Spacing and layout rhythm: header, hero, CTA, document panel, and footer use consistent widths, radii, and vertical spacing. No clipping or horizontal overflow was observed.
- Colors and visual tokens: navy, cream, mist blue, and warm orange reuse the Rockimals landing palette with sufficient contrast.
- Image quality and asset fidelity: the real Rockimals icon and generated multi-animal space artwork are used directly; no placeholder or code-drawn substitute is present.
- Copy and content: all existing legal/support text and eight language options are preserved. Language changes update title, control label, document panel, and URL state.

## Findings

- No actionable P0, P1, or P2 issues remain.

## Comparison history

1. Earlier product-card review found that removing the HTML title and app icon over-corrected the request. Fix: restored both overlay elements while keeping the raster hero text-free. Post-fix browser evidence shows the Rockimals and Zoday cards using the same title/icon composition.
2. Initial legal-page build used root-relative canonical routes that failed repository link validation. Fix: changed shell and fallback links to absolute Rockimals subdomain URLs. Post-fix `npm test` validates all 215 public files with no broken internal links.

## Implementation checklist

- [x] Restore Rockimals product-card title and app icon.
- [x] Move language selector into a Rockimals-branded header.
- [x] Match Zoday's accessible popover interaction.
- [x] Apply the Rockimals visual system to support and privacy pages.
- [x] Verify desktop, mobile, language switching, site build, and console output.

## Follow-up polish

- No P3 item is required for this pass.

## Rockimals landing language-control pass

- Source visual truth: `/var/folders/y_/wpm7ltr94vj4f0m5tcc8dcdr0000gn/T/codex-clipboard-12ea4ff8-488b-42cb-8fa2-fc1df3767dcd.png`.
- Source pixels: 428 × 168 at approximately 2× density. The visible Zoday control measures about 262 × 88 source pixels, normalized to roughly 131 × 44 CSS px.
- Implementation: `http://127.0.0.1:4173/products/rockimals.html` and `http://127.0.0.1:4173/tr/`, captured inline in the Codex in-app browser at desktop and 390 × 844 CSS px mobile viewports.
- State: English closed/open menu and Turkish closed state after navigation.
- Full-view evidence: the compact control stays aligned with the Rockimals wordmark on desktop and mobile without changing hero wrapping or header height.
- Focused evidence: the final control is 132 px minimum width by 44 px minimum height, with the same globe/text/chevron hierarchy, 14 px UI type, rounded dark surface, selected-row treatment, and checkmark behavior as the reference.
- Fonts and typography: Inter 14/600 matches the Zoday control hierarchy; translated names remain untruncated within the 230 px maximum.
- Spacing and layout rhythm: 12 px horizontal padding and 9 px gaps normalize to the source proportions; no mobile overlap or overflow was observed.
- Colors and tokens: Zoday's violet control treatment is retained while the selected state uses the Rockimals warm-orange accent.
- Image and icon fidelity: the established globe, chevron, and check icon geometry is reused from the existing language-control component; no raster asset was required.
- Copy and content: all eight Rockimals languages remain present and English-to-Turkish navigation loads the fully localized page and screenshots.
- Interaction/accessibility: popover open/close, selected state, direct links, ArrowUp/ArrowDown, Home/End support, focus outlines, and native-select fallback are present.
- Console warnings/errors: none observed.
- Findings: the first implementation was wider than the normalized Zoday source (166 × 48 vs approximately 131 × 44 CSS px). It was corrected to an automatic 132–230 px width and 44 px height. The post-fix mobile capture matches the source proportions. No actionable P0/P1/P2 issue remains.

final result: passed
