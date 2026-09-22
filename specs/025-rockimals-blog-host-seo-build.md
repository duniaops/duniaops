# Rockimals blogunu host yönlendirmesi ve SEO çıktısıyla site üretimine bağla

**Type:** Feature
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Implemented — host yolları, SEO çıktısı ve güvenli üretim sınırı doğrulandı (2026-09-22)
**Depends on:** [022 — içerik sözleşmesi](022-rockimals-blog-content-contract.md), [024 — indeks ve navigasyon](024-rockimals-blog-index-navigation.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Hazırlanan blog sayfalarını doğru Rockimals adreslerinde, taranabilir ve mevcut siteleri koruyan bir üretim hattıyla sun. Bu iş build entegrasyonu, route/metadata ve çıktı sınırının tek sahibidir.

## Scope

- Rockimals üreticisini mevcut npm run build:site sırasına bağla; build-site çıktıyı yeniden oluşturduğu için adım sırasını bilinçli belirle.
- Blog indeks/makale yollarını Rockimals hostunda çöz; www.duniaops.com/blog ve diğer ürün yollarını koru. Canonical dışı desteklenen varyantlar tek hedefe yönlensin.
- Geçersiz locale ve bulunmayan slug gerçek 404 olsun; ortak host fallback'i başka yazıyı veya ürün sayfasını HTTP 200 ile göstermesin.
- Her sayfaya kendine canonical, doğru html lang, yerel title/description/sosyal metadata ekle. Karşılıklı hreflang sekiz sürümü ve kendisini içersin; x-default İngilizce hedefe gitsin.
- Rockimals hostuna ait robots ve sitemap yanıtını üret; yalnızca yayımlanan URL'leri içer. Article/BlogPosting ve BreadcrumbList görünür gerçek içeriği anlatsın.
- Taslak/gelecek/yayından kaldırılmış makale çıktıları, kaynak Markdown/spec belgeleri ve önizlemeler public dist'e girmesin. Temizlik yalnızca üreticinin kendi alanına dokunsun.
- Mevcut kurumsal blog canonical, kategoriler, CTA, feed, sitemap ve diğer ürünlerin davranışı değişmesin; blog dışındaki landing tutarsızlıklarını ayrı kayıt olarak bırak.

## Acceptance Criteria

- [x] **AC1:** npm run build:site Rockimals blogunun beklenen sayfalarını oluşturur; ikinci çalıştırma eski taslak/geri çekilmiş çıktıyı bırakmaz ve başka ürün çıktısını silmez.
- [x] **AC2:** Hosta duyarlı route doğrulaması Rockimals yazı/index URL'lerini, varsa canonical yönlendirmeleri ve bilinmeyen dil/slug için 404'ü gösterir; kurumsal /blog yolu korunur.
- [x] **AC3:** Sekizli yayın grubunun canonical/hreflang/x-default/html lang alanları birbirini doğru referanslar; aynı yazının tüm çevirileri İngilizceye canonical edilmez.
- [x] **AC4:** Yerel title/description/Open Graph ve Article/Breadcrumb verisi görünür yazar, tarihler, görsel ve içerikle eşleşir; sahte rating/uzmanlık eklenmez.
- [x] **AC5:** Rockimals robots/sitemap doğru host ve yalnızca public URL'leri bildirir; ilgili yazılar ve indeksler yayın manifestiyle tutarlıdır.
- [x] **AC6:** Public dist incelemesinde kaynak dosyası, taslak, gelecek sayfa veya yerel önizleme bulunmaz. Tam yayından taslağa/geçersiz duruma dönüşte eski çıktı kalmadığı kanıtlanır.
- [x] **AC7:** Site reposunun ilgili mevcut build/check akışları ve route/metadata kanıtları kaydedilir. Üretim deploy yapılmadıysa yerel doğrulama canlı doğrulama diye sunulmaz.

## Validation

npm run build:site ve npm run check:site; hosta duyarlı route/404 incelemesi, sekiz dil metadata/sitemap incelemesi, draft/future/withdrawn çıktı kontrolü. Sadece değişikliğin etkilediği ek kontrolleri çalıştır; oyun reposu testlerini çalıştırma.

## Out of Scope

Üretim deploy veya DNS/mağaza değişikliği, genel SEO yeniden tasarımı, diğer ürünlerin metaveri tutarsızlıklarının giderilmesi.

## Completion Record

**Tamamlandı:** 2026-09-22

- Üretici: `scripts/build-rockimals-blog.mjs`, 022'nin doğrulanmış yayın manifestini kullanarak sekiz indeksi ve yalnızca yayımlanabilir makaleleri `dist/products/rockimals-blog/` altında üretir. Aynı alana Rockimals `robots.txt` ve `sitemap.xml` çıktısını yazar.
- Build sırası: `npm run build:site` önce genel `dist` allowlist'ini yeniden kurar, ardından mevcut Zoday/Rockimals landing üreticilerini ve son olarak Rockimals blog üreticisini çalıştırır. Böylece blog çıktısı genel temizlikten sonra oluşur.
- Çıktı sahipliği: Blog üreticisi yalnızca basename'i `products/rockimals-blog` olan alanı temizlemeyi kabul eder. Fixture doğrulaması eski/geri çekilmiş makaleyi kaldırırken komşu ürün dosyasını korudu; sınır dışı temizlik isteği açık hatayla durdu.
- Route kararı: `netlify.toml` ve `_redirects`, Rockimals hostundaki `/blog`, `/{locale}/blog` ve makale yollarını üretici alanına rewrite eder. `/en/blog` ve İngilizce makale varyantları canonical `/blog` yollarına 301 gider; `/blog.html` de `/blog`a yönlenir. Bilinmeyen locale/slug için hedef dosya üretilmediğinden 404 kalır; genel Rockimals catch-all eklenmedi.
- Host ayrımı: Kurallar tam `rockimals.duniaops.com` hostuyla sınırlıdır. `www.duniaops.com/blog` kurumsal sayfası, canonical değeri, kategori/CTA/feed/sitemap akışı ve diğer ürün yolları değişmedi.
- SEO: `scripts/rockimals-blog-seo.mjs`, kendine canonical, sekiz karşılıklı hreflang, İngilizce x-default, yerel Open Graph/Twitter alanları ve JSON-LD üretir. Makaleler görünür başlık/açıklama/yazar/yayın-güncelleme tarihi/görselle eşleşen `BlogPosting` ve navigasyona karşılık gelen `BreadcrumbList` taşır; rating veya uzmanlık iddiası eklenmez.
- Keşif dosyaları: Hosta özel robots çıktısı `https://rockimals.duniaops.com/sitemap.xml` adresini bildirir. Sitemap sekiz indeksi ve manifestteki makale URL'lerini içerir; taslak, gelecek veya geri çekilmiş URL eklemez.
- Doğrulama: `tests/rockimals-blog-build.test.mjs` içindeki dört test; sekiz indeks/makale/keşif dosyası üretimini, makale metadata/structured data eşleşmesini, stale temizliğini ve temizlik sınırını doğruladı. `scripts/check-dist.mjs` hosta duyarlı Rockimals link/route modeli, sekiz indeks metadata/hreflang/sitemap kontrolleri, geçersiz locale/slug 404 modeli ve kurumsal blog koruması ile genişletildi.
- Yerel çıktı durumu: Kaynak envanterinde henüz yayımlanabilir konu olmadığı için gerçek build sekiz boş indeks ve sıfır makale üretti; fixture manifesti sekiz dilli tam paketin 16 sitemap URL'si ve sekiz makale çıktısını doğruladı. Kaynak Markdown, spec, script ve `.rockimals-blog-preview` dosyaları `dist`e girmedi.
- Son kontroller: `npm run build:site`, `npm run check:site`, XML/TOML sözdizimi ve tam `npm test` akışı yerelde çalıştırıldı. Canlı deploy veya canlı HTTP doğrulaması yapılmadı; bunlar 034 yayın hazırlığının kanıt alanıdır.

Açık uygulama maddesi yoktur. İlk gerçek makale paketleri 027–032, mağaza/ölçüm akışı 033 kapsamında hazırlanacaktır.
