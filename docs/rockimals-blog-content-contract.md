# Rockimals blog content contract

This contract is the shared source and publication boundary for the Rockimals
blog. Article pages, indexes, SEO output, and editorial work consume it; this
contract does not publish pages by itself.

## Source layout

Each topic has one shared, lowercase kebab-case `translationKey` and exactly
one source file per locale:

```text
content/rockimals-blog/<translation-key>/<locale>.md
```

Supported locales, in manifest order, are `en`, `tr`, `ja`, `ko`, `zh-Hans`,
`fr`, `de`, and `es`. Copy `content/rockimals-blog/_template.md` to start an
article. Files and directories whose names begin with `_` are authoring aids
and are not loaded. The template is a draft and uses a far-future placeholder
date so copying it cannot make content publishable.

## Required front matter

| Field | Contract |
| --- | --- |
| `translationKey` | Shared topic identity; lowercase kebab-case and equal to its directory name. |
| `locale` | One of the eight supported locale identifiers and equal to the filename. |
| `slug` | Localized URL slug in lowercase ASCII kebab-case; unique inside its locale. |
| `title`, `description` | Non-empty localized strings. |
| `category` | One of the four stable category IDs below. |
| `published`, `updated` | RFC 3339 timestamps including an explicit offset or `Z`; `updated` cannot precede `published`. |
| `draft` | Boolean. New sources start as `true`. |
| `image`, `imageAlt` | Topic-owned web image path and localized alternative text. |
| `author` | Object with stable `id` and display `name`. |
| `relatedPosts` | Array of translation keys; self-links and duplicates are invalid. |
| `cta` | Object with stable `id` and localized `label`. URL resolution belongs to spec 033. |
| `productGuide` | Boolean used to make app-version review explicit. |
| `reviewedAppVersion` | Required non-empty string only for product guides; otherwise `null`. |

A non-draft source must also contain Markdown body content. The image path must
be below `/assets/rockimals-blog/<translation-key>/` and use AVIF, JPEG, PNG,
or WebP. Physical image preparation and inspection belong to spec 026.

## Stable categories

Category IDs never change with locale. Display names do:

| ID | en | tr | ja | ko | zh-Hans | fr | de | es |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `discover-game` | Discover the Game | Oyunu Keşfet | ゲームを知る | 게임 알아보기 | 探索游戏 | Découvrir le jeu | Das Spiel entdecken | Descubrir el juego |
| `learn-space` | Learn about Space | Uzayı Öğren | 宇宙を学ぶ | 우주 배우기 | 探索太空 | Découvrir l’espace | Den Weltraum entdecken | Aprender sobre el espacio |
| `family-guide` | Family Guide | Aile Rehberi | ファミリーガイド | 가족 가이드 | 家庭指南 | Guide des familles | Familienratgeber | Guía para familias |
| `stories-activities` | Stories & Activities | Hikâyeler ve Etkinlikler | ストーリーとアクティビティ | 이야기와 활동 | 故事与活动 | Histoires et activités | Geschichten und Aktivitäten | Historias y actividades |

## Publication selection

The manifest uses one supplied build instant (`asOf`) and compares normalized
UTC instants. A topic becomes selected when at least one locale is non-draft
and its `published` instant is at or before `asOf`.

A selected topic is emitted only when all eight locale sources exist, all are
non-draft, all have reached their publication instant, and their `category`,
`published`, `productGuide`, and `reviewedAppVersion` values agree. Any selected
incomplete or conflicting topic fails the entire manifest build; no partial
locale package is returned. A topic whose sources are all draft and/or future
is valid authoring work but is absent from the manifest.

Publication dates do not trigger a deployment. A new build and deploy after
the timestamp is still required. A future automation may supply `asOf`, but
this contract neither chooses a launch date nor installs an automation.

Canonical paths are deterministic:

- English: `/blog/<slug>`
- Other locales: `/<locale>/blog/<slug>`

Each published post receives the eight canonical alternatives from its shared
topic. English is never substituted for a missing locale. Related posts are
resolved by `translationKey` only against published manifest entries in the
same locale; draft, future, missing, or differently localized targets are
omitted from the link inventory.

## Author workflow and local preview data

1. Copy `_template.md` to `<translation-key>/<locale>.md` and update every
   localized field. Keep `draft: true` while editing.
2. For a product guide, set `productGuide: true` and record the exact reviewed
   app version. Do not use a development-only version as live-product proof.
3. Prepare all eight sources with one shared publication instant. Change each
   source to `draft: false` only when the whole package is ready.
4. Run `npm run check:rockimals-blog`.
5. When preview data is useful, run `npm run preview:rockimals-blog-content`.
   It writes `.rockimals-blog-preview/manifest.json`, an ignored local file.

Preview generation does not edit source front matter and does not change the
production manifest. Spec 025 will connect this manifest contract to the owned
public output directory; until then no Rockimals blog source is copied by
`build:site` or included in `dist/`.
