# Product catalogue banner artwork

Generated on 2026-09-13 with the built-in `image_gen` tool. The original product logos and names remain HTML overlays; the generated art contains no branding or product copy. Final JPEGs are optimised to 1440 × 600 for the catalogue. Charts are decorative and fictional.

## Zoday

- Asset: `assets/products/zoday-card-hero.jpg`
- Original: `exec-dba89ecf-43a1-4494-96be-f51d170ed078.png` in the task's Codex generated-images directory.

### Final prompt

```text
Use case: ads-marketing.
Asset type: finished background artwork for the Zoday product card banner on the DuniaOps website. Generate one wide landscape raster image, about 2.4:1 aspect ratio (1536x640 ideal), edge-to-edge artwork, not a website mockup.
Primary request: a beautiful astronomy-and-astrology composition with a clear left-to-right lunar phase sequence, with a few subtle zodiac and divination symbols.
Scene and composition: deep midnight indigo and muted plum space, richly textured but restrained. Across the central horizontal band, five beautiful realistic moons show waxing crescent, first quarter, luminous full moon, last quarter, waning crescent in that exact left-to-right order. Centre full moon slightly larger than the others, physically textured craters, soft silver lavender moonlight. Keep the five moons inside the central 75 percent of image width for responsive crops. Delicate incomplete brass celestial chart arcs and a few fine zodiac glyphs, sparse constellation lines and small four-point stars woven around the moon sequence, understated and editorial. Bottom left 35 percent stays dark and quiet for a large white Zoday heading to be added in HTML. Top right corner stays dark and quiet for an existing 58px app icon overlay. These corner areas should have atmosphere, not boxed empty spaces.
Style: premium celestial atlas meets cinematic lunar photography, tactile subtle grain, exquisite fine linework, elegant depth, high contrast moons against dark sky. Restrained violet, warm antique gold, silver ivory, near-black navy. Make the lunar phase sequence immediately recognisable at small card scale.
Constraints: no words, no letters beyond a few authentic zodiac symbols, no numbers, no logos, no watermark, no app screens, no card frames, no humans, no hands, no giant eye, no intense neon, no excessive particles. Artwork only.
```

## Otto

- Asset: `assets/products/otto-card-hero.jpg`
- Original: `exec-1def266f-5ce9-4dc5-9a31-8216b8a3fc51.png` in the task's Codex generated-images directory.

### Final prompt

```text
Use case: ads-marketing.
Asset type: finished background artwork for the Otto investment research product card banner on the DuniaOps website. Generate one wide landscape raster image, about 2.4:1 aspect ratio (1536x640 ideal), edge-to-edge artwork, not a website mockup.
Primary request: a sophisticated market and trading illustration that instantly suggests stocks, financial research and portfolio analysis.
Scene and composition: deep ink navy and petrol blue financial chart space. A compelling sequence of translucent sculptural candlesticks in muted jade, ivory and warm burnished copper traverses the central and right areas, some gaining and some declining, with very fine candle wicks. A delicate luminous market-price line weaves across them with believable fluctuations; subtle volume columns and precise technical gridlines recede into atmospheric depth. This should feel like a beautifully art-directed macro view of a trader's analysis, balanced and thoughtful, not a get-rich advertisement. Layer a very faint secondary analytical curve into the background. Primary chart focus stays within central 75 percent width for responsive crops. Bottom left 35 percent remains dark quiet negative space for a large white Otto heading added later in HTML, and upper right stays quiet for an existing 58px app icon overlay. No boxes marking these reserved spaces.
Style: premium editorial financial visual, a blend of optical glass, precise graphic linework and restrained cinematic studio illumination. Fine material detail, strong sculptural composition, distinct green and copper candle shapes at small card scale. Palette anchored in #172B3A navy, muted jade, ivory #F7F5F0, warm copper #B56845. Refined and composed, visual sibling to a dark cinematic astronomy banner.
Constraints: illustrative fictional chart only; no numbers, axis labels, ticker names, letters, logos, watermark, UI panels, giant arrow, currency symbols, coins, crypto, people, bull statue or laptop. No excessive neon. Artwork only.
```

## Logo contrast revision

The built-in `image_gen` tool edited the existing banner artwork to leave calm dark areas in the top-right corner for the original logos. Zoday's transparent lavender-and-gold mark is displayed without a CSS tile, border or shadow. Otto retains the navy background from its original SVG. Logos are HTML overlays, positioned top-right on desktop and mobile.

The final artwork replaces the two asset paths above. Edited originals are `exec-d2f50494-6d78-4062-b47f-f9a9262cd86a.png` (Zoday) and `exec-b6630afe-2f51-481c-9a18-dbed07f2e185.png` (Otto) in the task's Codex generated-images directory.

### Final Zoday edit prompt

```text
Use case: precise-object-edit.
Edit target: the attached existing Zoday website banner artwork. Preserve its original visual style, midnight purple and navy palette, realistic moon textures, five correct left-to-right lunar phases, fine gold zodiac details and atmospheric nebula.
Change only the composition around the TOP-RIGHT logo overlay area: clear the entire upper-right region (roughly x 72–100 percent, y 0–38 percent) into a calm, deep ink-indigo sky with very low detail and no stars, glyphs, rings, moon discs or bright nebula there. Blend it smoothly into the existing sky with no visible frame, patch, circle or rectangular boundary. This dark sky must provide clean contrast behind the original fine lavender and gold Zoday symbol that will be overlaid in HTML; do NOT render the logo.
To keep the five lunar phases uncovered on narrow mobile crops, bring their horizontal sequence a little lower: small moon centres around 51 percent image height, their top edges below 38 percent height; full moon can be larger in the centre. Keep all five lunar phases readable left to right within the central 76 percent of image width. Preserve the dark negative space at bottom left for the existing HTML product name. Preserve the rest of the artwork as closely as possible, do not redesign the scene.
Output: a wide 2.4:1 edge-to-edge background image, same aspect ratio as input. No new words, logos, labels, borders, badge shapes or watermark. Do not add new objects.
```

### Final Otto edit prompt

```text
Use case: precise-object-edit.
Edit target: the attached existing Otto website banner artwork. Preserve its cinematic navy and petrol palette, jade/ivory/copper candlestick market chart, subtle volume columns, existing chart fluctuations and dark lower-left negative space.
Change only the TOP-RIGHT region: create a quiet dark navy #172B3A to #0b1c28 region smoothly integrated into the image at roughly x 72–100 percent, y 0–38 percent. Remove gridlines, price lines, candle wicks and bright streaks from this reserved corner, fading the existing chart details naturally as they approach it. The white-and-copper original Otto logo will later be placed in this area as an HTML overlay. Do NOT render any logo. Where necessary keep the right-side candlestick path below 42 percent image height so it remains visible below the logo on a mobile crop.
The reserved area must look like a natural calm part of the original dark background, with no visible frame, rectangle, badge, spotlight or artificial patch. Keep the chart's overall composition and fine glass material details elsewhere as unchanged as possible.
Output: a wide 2.4:1 edge-to-edge background image, same aspect ratio as input. No words, numbers, ticker names, logos, labels, borders or watermark. Do not add new objects.
```

## Lumo

- Asset: `assets/products/lumo-card-hero.jpg` (1440 × 600 JPEG).
- Generated on 2026-09-13 with the built-in `image_gen` tool.
- Original: `exec-dd233350-e183-4038-9492-18665d264a5b.png` in the task's Codex generated-images directory.
- Used in the catalogue and Lumo's product-page hero. The original logo and product name remain HTML overlays. The image is concept artwork, not a screenshot of the unreleased application.

### Final prompt

```text
Create a premium cinematic website product banner BACKGROUND for Lumo, a private on-device photo culling and search app for photographers. Wide landscape composition, aspect ratio 2.4:1, intended final display 1440 x 600.

Concept: a photographer's luminous digital light table. Five or six elegant photographic prints / contact-sheet frames float in a shallow, orderly horizontal fan across the central band of a dark graphite and midnight-blue studio surface. The photographs show related moments of a dramatic Icelandic mountain ridge and glacial lake at dawn: misty mountains, subtle warm amber sunlight, blue water, beautiful fine-grain professional landscape photography. Some smaller neighboring frames are slightly soft or subdued as if awaiting selection, while one larger tack-sharp chosen photograph at center is beautifully lit and subtly emphasized with a fine cool-blue edge glow and tiny restrained blue crop-corner accents. Communicate calm visual curation and finding the best frame among similar shots. Physical photographic detail, realistic materials, minimal, sophisticated, spacious. Soft directional studio light, gentle depth, restrained blue illumination reflecting on the tabletop, just a few fine contact-sheet alignment lines. No device mockups, no hands, no faces, no camera bodies, no buttons, no numbers, no text, no letters, no icons, no logos, no watermarks, no invented app UI.

Composition must accommodate separately overlaid HTML branding: keep the entire upper-right quadrant especially the upper-right 30% width and upper 38% height calm, nearly black charcoal with very subtle blue falloff. NO photographs, bright lights, stars, corners or busy details in this top-right logo-safe area. Keep a quiet dark lower-left band for a large white product name to be added in HTML. Keep the main selected photograph in the central horizontal area, visible when cropped to a narrower 1.65:1 banner. The upper-right should blend naturally with an original dark black-square app icon placed over it, with no drawn badge or placeholder. Photographic editorial art direction, elegant and understated. Full bleed image; no external border or rounded canvas corners.
```

### Lumo subdomain

The canonical address is `https://lumo.duniaops.com/`. `netlify.toml` rewrites that host's root to the existing `products/lumo.html` document. Host-specific legacy redirects in `_redirects` preserve old company-site links. Assets use root-relative paths on the Lumo origin; company navigation points back to `https://www.duniaops.com/`.

The custom subdomain must also be assigned to the existing DuniaOps Netlify project and have its DNS configured. These repository routing rules do not create DNS records. At the local implementation check on 2026-09-13, `lumo.duniaops.com` did not resolve. See [Netlify domain redirect requirements](https://docs.netlify.com/manage/routing/redirects/redirect-options/#domain-level-redirects) and [rule processing order](https://docs.netlify.com/manage/routing/redirects/overview/#rule-processing-order).

### Varied photography revision

The central landscape is retained. Surrounding main prints now show street, portrait, wedding and wildlife photography, with four smaller pet, food, travel and macro-flower prints scattered around the edges. Final edited original: `exec-7b3596ad-d949-4881-b4bf-fb9607c1f14a.png`. The final JPEG replaces `assets/products/lumo-card-hero.jpg`; consumers use `?v=20260913-varied-photography` for cache refresh.

#### Final edit prompt

```text
Use case: precise-object-edit. Edit this existing Lumo photography light-table banner. Keep its overall 2.4:1 wide composition, premium realistic photographic style, dark graphite / midnight blue studio tabletop, elegant photographic print frames, cool blue accent lighting and refined dimensional perspective.

PRESERVE the largest central chosen photograph: the glacial lake, dramatic mountain ridge, mist and warm dawn sunlight, with its thin cool-blue illuminated selection edge. Keep that central print as the dominant, largest subject, in essentially the same position and perspective. This central landscape is the only mountain landscape in the banner.

CHANGE the content of EVERY OTHER main photographic print to a DISTINCT popular photographic genre. Immediately left of the central photograph: a beautiful candid portrait of an adult woman in soft warm golden-hour light, a recognisable human face. Farther left main print: atmospheric urban street photography with a person walking through a rain-washed city street, reflections and interesting architecture, realistic editorial photography. Immediately right of the central photograph: an elegant candid wedding photograph of an adult couple sharing a joyful moment in a garden, warm natural light. Farther right main print: a striking wildlife photograph of a fox in natural woodland, rich natural texture. None of these should be mountain or lake photographs. Each print should have a clearly different subject, photographic treatment and palette, while fitting the same calm table lighting.

ADD exactly FOUR small photographic prints, casually scattered and slightly overlapping around the outer edges of the light-table arrangement: a candid dog photo, a food photography still life with coffee and a pastry, a warm adult family / friends travel moment at a seaside town, and a vivid macro flower photograph. These small prints should feel like secondary physical contact-sheet samples, about one-third the width of the main side photos, various subtle angles, with at most part of a couple of these small prints cropped by the canvas edges. Place them around upper-left / upper-middle and far lower-right / far left outer edges. Make the composition richer and varied but tidy and art-directed, not a pile or chaotic collage.

Maintain the quiet dark TOP-RIGHT region (last 30% of width, upper 36% of height) for a separate original HTML logo overlay. Do not place any photo, face, bright corner or detail there. Maintain the quiet dark LOWER-LEFT region (first 30% of width, bottom 22% of height) for the separate white Lumo name. Preserve the empty dark corners naturally, no visible boxes or badge placeholders. Main portrait, central landscape and wedding subjects should remain identifiable at small scale and in the central crop of the image. All faces must look natural and anatomically plausible. No words, letters, labels, numbers, UI text, logo, watermarks or screenshots. Full-bleed final banner artwork only.
```
