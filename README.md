# DuniaOps website

The public website for [DuniaOps](https://www.duniaops.com), a London-based software development and DevOps consultancy.

The site is a responsive static web application hosted on Netlify. It includes service pages, a Netlify-powered project enquiry form, accessible navigation, SEO metadata, security headers, and consent-controlled Google Analytics 4. A deterministic build publishes only the runtime site; source Markdown, scripts, specifications, and internal project files are excluded from the deployed output.

## Project structure

```text
assets/       Brand images, favicon, and social sharing artwork
content/blog/ Markdown sources and the new-post template
scripts/      Static blog generator
blog/         Generated article pages
brand/        Source material for brand assets
css/          Shared website styles
js/           Site interactions and analytics consent logic
services/     Individual service pages
products/     Individual product detail pages
dist/         Generated Netlify publish output (ignored by Git)
index.html    Homepage and project enquiry form
products.html Product catalogue for Rockimals, Zoday and Lumo
blog.html     Generated blog index
feed.xml      Generated RSS feed
privacy.html  Privacy and cookie notice
thank-you.html Form submission confirmation page
_headers      Netlify security and caching headers
_redirects    Canonical domain and clean-URL redirects
netlify.toml  Netlify build and publish-directory configuration
```

## Local development

Install the pinned dependencies and build the public output:

```sh
npm ci
npm run build:site
```

Then start the local web server with clean-URL support:

```sh
python3 scripts/serve-local.py
```

Open [http://localhost:8080](http://localhost:8080). The server uses `dist/` by default so local testing exercises the same public-file boundary as Netlify. Netlify redirects, headers, and form processing apply only on a Netlify deployment.

## Publishing a blog article

Install the pinned publishing dependencies:

```sh
npm ci
```

Copy `content/blog/_template.md` to a lowercase kebab-case filename such as
`content/blog/how-to-improve-cloud-delivery.md`. Complete the front matter,
write the article in Markdown, add its unique 1200×630 JPG or PNG to
`assets/blog/`, and change `draft` to `false`.

The allowed category values are:

- `ai-accelerated-development`
- `booking-allocation-platforms`
- `devops-cloud-consultancy`
- `mobile-app-development`
- `software-consultancy`

Generate and validate the public files:

```sh
npm run build:site
npm run check:site
git diff
```

The command generates the blog index and article pages, homepage article cards,
RSS feed, sitemap entries, and clean-URL redirects. Generated files are
committed with their Markdown source. Draft posts and `_template.md` are never
published. The generated `dist/` directory is intentionally ignored by Git.

## Public output boundary

Netlify runs `npm run build:site` and publishes only `dist/`, as configured in `netlify.toml`. The build uses an explicit allowlist for runtime HTML, assets, styles, scripts, redirects, headers, RSS, and sitemap files.

`npm run check:site` fails if Markdown, package metadata, build scripts, specifications, agent instructions, brand source material, local configuration, or another forbidden source path enters `dist/`. Keep source-only files outside the allowlist rather than relying on obscure URLs or `robots.txt`.

## Project enquiries

The `project-enquiry` form in `index.html` uses Netlify Forms and redirects successful submissions to `/thank-you`. Submissions can be reviewed in the Netlify project dashboard under **Forms**.

Keep the form name, hidden `form-name` field, and honeypot configuration aligned when changing the form.

## Analytics and cookies

Google Analytics 4 is configured in `js/analytics.js`. Analytics remains disabled until a visitor accepts optional cookies. Visitors can revisit their choice through **Cookie settings** in the footer.

Successful project enquiries record a `generate_lead` event without sending enquiry content to Google Analytics. Update the privacy notice and Content Security Policy in `_headers` if the analytics integration changes.

## Deployment

Netlify deploys the production site from the Git repository. Changes pushed to the configured production branch run `npm run build:site` and publish `dist/` automatically.

After deployment, verify:

- the homepage and all service pages at mobile and desktop sizes;
- the project enquiry form and thank-you redirect;
- the optional-cookie accept and reject flows;
- the Google Analytics Realtime report after consent;
- redirects, security headers, and the sitemap.

## Validation

Useful checks before committing:

```sh
npm test
node --check js/site.js
node --check js/analytics.js
node --check scripts/build-blog.mjs
node --check scripts/build-site.mjs
node --check scripts/check-dist.mjs
npm run build:site
npm run check:site
npm audit
xmllint --noout sitemap.xml
xmllint --noout feed.xml
git diff --check
```

## Security

Do not open a public issue for a suspected vulnerability. Follow the private reporting instructions in [SECURITY.md](SECURITY.md).

## Contributions

This repository is not currently accepting unsolicited code or content contributions. See [CONTRIBUTING.md](CONTRIBUTING.md) for contact and security-reporting guidance.

## License

Software source code authored by DuniaOps is available under the MIT License. DuniaOps names, trademarks, logos, brand material, product artwork, marketing copy, and editorial/blog content are all rights reserved. Third-party components remain subject to their own licenses. See [LICENSE](LICENSE) for the complete scope.
