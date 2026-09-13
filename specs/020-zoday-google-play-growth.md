# Zoday Google Play product and invitation paths

**Status:** Source ready; production deployment and installed-app verification pending

**Prepared:** 2026-09-12

**Owner:** Ibrahim Uylas

**Mobile contract:** Zoday Spec 040

## Delivered source

- `/products` describes Zoday as publicly available on Android in five languages.
- `/products/zoday` leads with daily horoscope, Moon phases, personal readings
  and the private journal. Its bilingual Play CTA targets
  `com.duniaops.zoday` and carries only the registered `website_product`
  Install Referrer campaign.
- `/products/zoday/invite/<CODE>` rewrites to a generic bilingual shell. The
  browser parser accepts one six-character Crockford Base32 segment, normalises
  manual I/L/O variants, rejects malformed or multiply encoded input, and never
  asks whether the code belongs to an account.
- The invitation page loads no analytics, has `noindex` and `no-referrer`
  directives, uses a no-store route header and offers code copy plus manual-entry
  guidance. Its Play CTA transports the functional code in the versioned
  referrer payload.
- Local server routing and distribution checks cover the new public paths.
- `/.well-known/assetlinks.json` contains the current classical Play App Signing
  SHA-256 fingerprint copied from Play Console's generated Digital Asset Links
  JSON on 2026-09-12. The upload-key fingerprint was explicitly excluded.

## Deployment gate

The source association is:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.duniaops.zoday",
      "sha256_cert_fingerprints": ["C7:13:27:D6:0C:51:D1:31:23:76:DE:44:9D:08:E7:2B:D9:41:8F:6F:56:C3:FC:79:E3:34:B5:86:BA:F3:42:26"]
    }
  }
]
```

After an authorized deployment, verify the public URL returns HTTP 200 as `application/json`, with no
authentication or redirect. Run Android Digital Asset Links verification and
test cold, warm and installed-from-Play invitation flows. Confirm host access
and error logging can scrub invitation path segments before traffic is sent.

## Validation evidence

- `npm test` passes and validates 82 public files, including the exact package,
  relation and Play App Signing fingerprint in `assetlinks.json`.
- `node --check js/zoday-invite.js` passes.
- `python3 -m py_compile scripts/serve-local.py` passes.
- Headless Chrome renders the product page at 1440×1100 and 390×844 and the
  invitation page at 390×844.
- Browser DOM checks normalise `abI2kd` to `AB12KD`; reject `ABC%252F` and an
  extra `/AB12KD/extra` segment; and build the encoded payload
  `v=1&utm_source=website&utm_medium=website&utm_campaign=website_product&invite=AB12KD`.

No production deploy, analytics change, external message or store mutation was
performed. The branch can be reviewed independently from the production branch.
