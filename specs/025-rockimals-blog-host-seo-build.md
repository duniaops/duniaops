# Rockimals blogunu host yönlendirmesi ve SEO çıktısıyla site üretimine bağla

**Type:** Feature
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Planned — implementation not started
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

- [ ] **AC1:** npm run build:site Rockimals blogunun beklenen sayfalarını oluşturur; ikinci çalıştırma eski taslak/geri çekilmiş çıktıyı bırakmaz ve başka ürün çıktısını silmez.
- [ ] **AC2:** Hosta duyarlı route doğrulaması Rockimals yazı/index URL'lerini, varsa canonical yönlendirmeleri ve bilinmeyen dil/slug için 404'ü gösterir; kurumsal /blog yolu korunur.
- [ ] **AC3:** Sekizli yayın grubunun canonical/hreflang/x-default/html lang alanları birbirini doğru referanslar; aynı yazının tüm çevirileri İngilizceye canonical edilmez.
- [ ] **AC4:** Yerel title/description/Open Graph ve Article/Breadcrumb verisi görünür yazar, tarihler, görsel ve içerikle eşleşir; sahte rating/uzmanlık eklenmez.
- [ ] **AC5:** Rockimals robots/sitemap doğru host ve yalnızca public URL'leri bildirir; ilgili yazılar ve indeksler yayın manifestiyle tutarlıdır.
- [ ] **AC6:** Public dist incelemesinde kaynak dosyası, taslak, gelecek sayfa veya yerel önizleme bulunmaz. Tam yayından taslağa/geçersiz duruma dönüşte eski çıktı kalmadığı kanıtlanır.
- [ ] **AC7:** Site reposunun ilgili mevcut build/check akışları ve route/metadata kanıtları kaydedilir. Üretim deploy yapılmadıysa yerel doğrulama canlı doğrulama diye sunulmaz.

## Validation

npm run build:site ve npm run check:site; hosta duyarlı route/404 incelemesi, sekiz dil metadata/sitemap incelemesi, draft/future/withdrawn çıktı kontrolü. Sadece değişikliğin etkilediği ek kontrolleri çalıştır; oyun reposu testlerini çalıştırma.

## Out of Scope

Üretim deploy veya DNS/mağaza değişikliği, genel SEO yeniden tasarımı, diğer ürünlerin metaveri tutarsızlıklarının giderilmesi.

## Completion Record

Build sırası, host route kararları, çıktı sahipliği, doğrulama kanıtları ve kalan yalnızca canlıda kontrol edilebilen maddeler; 034 yayın hazırlığında kullanır.

Kapanışta değişen dosyaları, kanıtları ve açık maddeleri kaydet. Uygulama tamamlanmadıysa kabul kutularını işaretleme. Bu spec'i yazmak commit, push veya yayın işleminin gerçekleştiği anlamına gelmez.
