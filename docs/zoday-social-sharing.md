# Zoday social sharing artwork

Created with the built-in `image_gen` tool on 2026-09-13. The approved Moon-phase catalogue banner and original transparent mark are the source references. The sharing card extends the scene vertically and includes the product name and a short description inside the image. Final JPEGs are 1200 × 630, with localised artwork and Open Graph / Twitter metadata for each supported language.

## Assets and routes

| Language | Asset | Share URL after deployment |
| --- | --- | --- |
| en | `assets/products/zoday-share-en.jpg` | https://zoday.duniaops.com/ |
| tr | `assets/products/zoday-share-tr.jpg` | https://zoday.duniaops.com/tr |
| de | `assets/products/zoday-share-de.jpg` | https://zoday.duniaops.com/de |
| es | `assets/products/zoday-share-es.jpg` | https://zoday.duniaops.com/es |
| pt-BR | `assets/products/zoday-share-pt-BR.jpg` | https://zoday.duniaops.com/pt-BR |

The existing `?lang=` links also select their matching generated metadata. Social copy lives in `content/zoday-landing/social.json`. The unqualified root link defaults to English. The generated locale documents expose image, title, description and image alternative text directly in the HTML head; they do not require JavaScript. Each locale has its own `og:url` so its graph identity is separate.

Local verification covers generated HTML, referenced JPEGs, dimensions, MIME type and links. This is not a live WhatsApp rendering test. The assets and metadata must be deployed before public link previews can use them, and previously cached previews may persist until the sharing client fetches the page again.

Open Graph field reference: https://ogp.me/

## Generated originals

Stored in `/Users/uylas/.codex/generated_images/01a09b73-46c7-7021-b30b-58d41efe8191/`:

- en: `exec-eab68392-4357-4d0c-be90-e67807b21d11.png`
- tr: `exec-f63441be-499e-4cdb-9f61-492b6d6da788.png`
- de: `exec-54b3e8d2-eecb-408b-8ea2-14219cc41cab.png`
- es: `exec-7ea3de2e-9c02-4637-b112-564114f17ca9.png`
- pt-BR: `exec-30d122ed-77df-46f1-b169-d03705d6ac04.png`

## Final English generation prompt

```text
Use case: compositing.
Image 1 is the approved Zoday celestial banner artwork, the edit target. Image 2 is the original transparent Zoday constellation-Z logo, a supporting insert. Create a finished Zoday social link preview image in a landscape 1200x630 aspect ratio (1.90476:1).
Preserve Image 1's five correct left-to-right lunar phases, moon textures, midnight purple and navy sky, subtle zodiac symbols and fine antique gold celestial details. Extend the image VERTICALLY with natural dark sky, so there is more space below the lunar scene for actual typography. Do not stretch the moon discs. Place the five moons across the upper-middle band, roughly centred at 36 percent height. The full moon is largest in the centre, all five moon phases must remain complete. Keep background details restrained near the typography.
Use the original logo from Image 2 in the top-right corner on the calm dark sky: faithfully preserve the exact constellation-Z silhouette, all original stars, its orbit swoosh and lavender-to-gold colouring. The logo has a transparent background, NO tile, NO border, NO white panel, NO enclosing circle. Do not redesign it. Logo around 90px wide at 1200px output, inset 64px from top and right.
In the lower-left area, set these exact texts in a clean Inter-like sans-serif font, large and legible even at mobile link preview size:
Title in bold ivory, around 72px at 1200px width:
"Zoday"
Below it, in medium-weight light silver-lavender, around 32px, two lines:
"Your daily horoscope, Moon calendar"
"and private journal."
Typography left aligned with 64px side margin, lower description ends at least 64px above bottom edge. Use one coherent full-bleed dark artwork; blend the artwork into the lower text area naturally with no hard horizontal divider. No webpage, card frame, device, button, badge, watermark, extra words or domain. No text overlapping the moons. This is the final shareable bitmap, include the requested title and description in the image.
```

## Final tr edit prompt

```text
Use case: text-localization.
The attached image is the FINAL APPROVED Zoday social link preview, an edit target. Change ONLY the two-line English description at bottom left into tr using exactly these two lines, preserving accents, punctuation and spelling:
"Günlük burç yorumun, Ay takvimin"
"ve özel günlüğün."
Keep the title "Zoday" unchanged. Preserve the exact same background artwork, five Moon phases, their positions and sizes, zodiac symbols, original constellation-Z logo in the top-right, all colours, image dimensions and framing. Do not move or redraw any non-text element. Keep the translated description in the same silver-lavender sans-serif font, same left alignment, same two-line layout, same baseline area and same visual weight as the English text. If needed reduce the description size slightly so the first line fits with the same comfortable right margin. No new words, no extra lines, no watermark or border. Output aspect ratio remains 1200:630.
```

## Final de edit prompt

```text
Use case: text-localization.
The attached image is the FINAL APPROVED Zoday social link preview, an edit target. Change ONLY the two-line English description at bottom left into de using exactly these two lines, preserving accents, punctuation and spelling:
"Dein Tageshoroskop, Mondkalender"
"und privates Tagebuch."
Keep the title "Zoday" unchanged. Preserve the exact same background artwork, five Moon phases, their positions and sizes, zodiac symbols, original constellation-Z logo in the top-right, all colours, image dimensions and framing. Do not move or redraw any non-text element. Keep the translated description in the same silver-lavender sans-serif font, same left alignment, same two-line layout, same baseline area and same visual weight as the English text. If needed reduce the description size slightly so the first line fits with the same comfortable right margin. No new words, no extra lines, no watermark or border. Output aspect ratio remains 1200:630.
```

## Final es edit prompt

```text
Use case: text-localization.
The attached image is the FINAL APPROVED Zoday social link preview, an edit target. Change ONLY the two-line English description at bottom left into es using exactly these two lines, preserving accents, punctuation and spelling:
"Tu horóscopo diario, calendario lunar"
"y diario privado."
Keep the title "Zoday" unchanged. Preserve the exact same background artwork, five Moon phases, their positions and sizes, zodiac symbols, original constellation-Z logo in the top-right, all colours, image dimensions and framing. Do not move or redraw any non-text element. Keep the translated description in the same silver-lavender sans-serif font, same left alignment, same two-line layout, same baseline area and same visual weight as the English text. If needed reduce the description size slightly so the first line fits with the same comfortable right margin. No new words, no extra lines, no watermark or border. Output aspect ratio remains 1200:630.
```

## Final pt-BR edit prompt

```text
Use case: text-localization.
The attached image is the FINAL APPROVED Zoday social link preview, an edit target. Change ONLY the two-line English description at bottom left into pt-BR using exactly these two lines, preserving accents, punctuation and spelling:
"Seu horóscopo diário, calendário lunar"
"e diário privado."
Keep the title "Zoday" unchanged. Preserve the exact same background artwork, five Moon phases, their positions and sizes, zodiac symbols, original constellation-Z logo in the top-right, all colours, image dimensions and framing. Do not move or redraw any non-text element. Keep the translated description in the same silver-lavender sans-serif font, same left alignment, same two-line layout, same baseline area and same visual weight as the English text. If needed reduce the description size slightly so the first line fits with the same comfortable right margin. No new words, no extra lines, no watermark or border. Output aspect ratio remains 1200:630.
```
