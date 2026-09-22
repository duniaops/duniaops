# İlk üç konu için ürün gerçeklerini, terimleri ve repo görsellerini hazırla

**Type:** Task
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Implemented — ürün/terim referansı, görsel manifest ve üç kapak doğrulandı (2026-09-22)
**Depends on:** [022 — içerik sözleşmesi](022-rockimals-blog-content-contract.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Yazı üretimini eski repo notları veya yanlış görseller yerine doğrulanmış ürün bilgisi ve ortak terimlerle başlat. Bu iş ilk üç konuya ait ortak ürün referansının, terim listesinin ve görsel paketlerinin sahibidir.

## Scope

- Kaynak plandaki 01, 15, 28 konularını ve amaçlarını sabitle; ilk 13 haftanın sırasını değiştirme. Her konu için brief iskeleti ver; konuya özel arama araştırması 027/029/031'e aittir.
- Canlı mağaza/ürün ile güncel oyun kataloğunu karşılaştırarak sürüm ve tarihli ürün referansı oluştur: platform, yaş, ücretsiz/Plus, hikâye ilerlemesi, offline ve veri/ebeveyn kontrolü.
- Sekiz kahramanın güncel adlarını ve uygulamadaki oyun/ekran terimlerini sekiz dil kaynağıyla eşle. Repo gelişmelerini canlı sürüm özelliği gibi kullanma.
- Salt okunur oyun kökü /Users/uylas/Documents/DuniaOps/Projects/rockimals; assets/animals ve assets/testflight_catalog/catalog.json eşlemelerini kullan. Mevcut site ekranları assets/products/rockimals-preview/{locale}/ altında.
- Üç konu için üç ayrı kapak seçimi/kompozisyonu, gerektiği kadar dil ekranı ve kaynak→web görsel kaydı hazırla. 1200×630 kapak, korunmuş portre oranı, anlamlı sahne ve uygun web boyutu sağla.
- Görsel kaydında konu, kaynak yol/commit veya sürüm, sahne, dil ve web çıktısı bulunur; yerel alt metinler konu yazılarında tamamlanır. Eksik güncel ekran/iddia kanıtını açık kaydet.

## Acceptance Criteria

- [x] **AC1:** 01/15/28 için ortak kaynak ve brief iskeleti vardır; doğrulanan uygulama sürümü/tarih ile repo/live farkları açıkça kayıtlıdır.
- [x] **AC2:** Yaş derecelendirmesi/hedef yaş, ücretsiz indirme/Plus, sabit katalog/günlük hak ve veri işleme ifadeleri birbirinden ayrılmıştır; NASA resmî ürün/onay iddiası yoktur.
- [x] **AC3:** Kahraman/oyun adları sekiz dilde uygulama kaynaklarıyla eşlenir; eski ad veya teknik kimlik kullanıcıya görünen ad yerine geçmez.
- [x] **AC4:** Üç konuya özel kapak 1200×630 olarak incelenir; web kopyası orijinali değiştirmez, önemli sahne kesilmez ve portre görsel gerilmez.
- [x] **AC5:** Her seçilen oyun görseli doğrulanmış kaynak ve konuya bağlıdır; metin içeren ekranların dil eşlemesi kaydedilir. Sahte veya sürüm dışı ekran kullanılmaz.
- [x] **AC6:** Ürün/terim/görsel kayıtları 027–032 tarafından kullanılabilir durumdadır; açık kanıt sorunları görünürdür ve tamamlanmış inceleme gibi sunulmaz.

## Validation

Salt okunur kaynak ve canlı ürün karşılaştırması, seçilen görsellerin boyut/görünüm kontrolü. Oyun capture harness'i veya test süreci başlatma; gerekli kanıt eksikse kaydet.

## Out of Scope

Tam yazı metinleri, yeni oyun illüstrasyonu, oyun kaynaklarını değiştirme, eski kapatılmış ürün kabul süreçlerini yeniden açma.

## Completion Record

**Tamamlandı:** 2026-09-22

- Ortak kaynak: `content/rockimals-blog/_editorial/product-reference.json`, 22 Eylül 2026 tarihli GB App Store 1.3.0 kaydını, canlı gizlilik/destek sınırlarını ve `04a455d878dee4851e4e1857181ceabd9ea2f21b` commit'indeki geliştirme 1.4.0+39 durumunu ayrı kanıt katmanları olarak kaydeder.
- Brief'ler: `content/rockimals-blog/_editorial/briefs.md`, ilk 13 haftalık sırayı 01 → 15 → 28 olarak korur; her konu için translation key, kategori, tek soru, kapsam, kaynak, görsel ve CTA iskeleti verir.
- Ürün sınırları: App Store `4+` derecesi 6–8 editoryal hedefinden; ücretsiz indirme Plus haklarından; sekiz kahraman/beş bölümden oluşan sabit katalog günlük erişim hakkından; reklamsız/hesapsız ürün davranışı teknik veri işlemeden ayrıldı. NASA verisinin kullanımı bağımsız ürün/onay olmadığını belirten zorunlu sınırla kaydedildi.
- Terimler: Niko, Tavi, Barney, Kito, Pofi, Bobo, Ciko ve Enoli adları ile sekiz tür ve 11 oyun/ekran terimi `en`, `tr`, `ja`, `ko`, `zh-Hans`, `fr`, `de`, `es` ARB kaynaklarından eşlendi. Katalogtaki teknik/eski sezon ve fixture adları kullanıcı metni için reddedildi.
- Katalog: `assets/testflight_catalog/catalog.json` içindeki sekiz kahramanın birinci bölüm kapak yolları ve checksum'ları `asset-manifest.json` içinde kaynak commit'iyle eşlendi; hash adlı dosyalar katalogdan bağımsız seçilmedi.
- Görsel paket: `assets/rockimals-blog/{rockimals-getting-started,what-is-an-asteroid-for-kids,rockimals-parent-controls}/cover.jpg` altında üç ayrı, metinsiz 1200×630 JPEG üretildi. Kaynak karakterler kendi oranında yerleştirildi, oyun deposundaki orijinaller değiştirilmedi ve çıktılar görsel olarak incelendi.
- Dil ekranları: 1.3.0 ile gelen Radar ve bilgi kartı ekranlarının 8×2 locale/yol/checksum kaydı oluşturuldu. Konu 28 için güncel ebeveyn ekranı olmadığı açıkça kaydedildi; kapak uygulama ekranı gibi sunulmayan editoryal kalkan/kilit kompozisyonudur.
- Tekrarlanabilirlik: `scripts/render-rockimals-blog-editorial-assets.swift` kapakları salt okunur oyun varlıklarından yeniden üretir. `scripts/check-rockimals-blog-editorial-assets.mjs` ürün sınırlarını, sekiz kahraman/dil kapsamını, üç kapak boyut/hash'ini ve 16 yerel ekranın boyut/hash'ini doğrular.
- Doğrulama: üç kapak `view_image` ile incelendi; `npm run check:rockimals-blog-editorial-assets`, `npm run check:rockimals-blog` ve tam `npm test` akışı geçti. Oyun capture harness'i, oyun testi veya oyun build'i çalıştırılmadı; oyun deposu değiştirilmedi.

**Açık kanıt maddeleri:** Kamuya açık Android mağaza kaydı doğrulanmadı; canlı landing structured data içindeki iOS 13.0 ifadesi App Store'un iOS 15.0 gereksinimiyle uyuşmuyor; konu 28 için güncel yerelleştirilmiş parent-gate/settings ekranı yok; geliştirme 1.4.0'ın sonraki bölüm indirme modeli canlı 1.3.0 iddiası değildir. Bu maddeler ortak kayıtta görünür tutuldu ve çözülmüş gibi sunulmadı.
