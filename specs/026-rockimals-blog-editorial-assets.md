# İlk üç konu için ürün gerçeklerini, terimleri ve repo görsellerini hazırla

**Type:** Task
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Planned — implementation not started
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

- [ ] **AC1:** 01/15/28 için ortak kaynak ve brief iskeleti vardır; doğrulanan uygulama sürümü/tarih ile repo/live farkları açıkça kayıtlıdır.
- [ ] **AC2:** Yaş derecelendirmesi/hedef yaş, ücretsiz indirme/Plus, sabit katalog/günlük hak ve veri işleme ifadeleri birbirinden ayrılmıştır; NASA resmî ürün/onay iddiası yoktur.
- [ ] **AC3:** Kahraman/oyun adları sekiz dilde uygulama kaynaklarıyla eşlenir; eski ad veya teknik kimlik kullanıcıya görünen ad yerine geçmez.
- [ ] **AC4:** Üç konuya özel kapak 1200×630 olarak incelenir; web kopyası orijinali değiştirmez, önemli sahne kesilmez ve portre görsel gerilmez.
- [ ] **AC5:** Her seçilen oyun görseli doğrulanmış kaynak ve konuya bağlıdır; metin içeren ekranların dil eşlemesi kaydedilir. Sahte veya sürüm dışı ekran kullanılmaz.
- [ ] **AC6:** Ürün/terim/görsel kayıtları 027–032 tarafından kullanılabilir durumdadır; açık kanıt sorunları görünürdür ve tamamlanmış inceleme gibi sunulmaz.

## Validation

Salt okunur kaynak ve canlı ürün karşılaştırması, seçilen görsellerin boyut/görünüm kontrolü. Oyun capture harness'i veya test süreci başlatma; gerekli kanıt eksikse kaydet.

## Out of Scope

Tam yazı metinleri, yeni oyun illüstrasyonu, oyun kaynaklarını değiştirme, eski kapatılmış ürün kabul süreçlerini yeniden açma.

## Completion Record

Ortak referans, terim listesi, üç görsel paketi ve manifest yolları; sürüm/tarih; varsa çözülmemiş ürün veya dil kanıtı.

Kapanışta değişen dosyaları, kanıtları ve açık maddeleri kaydet. Uygulama tamamlanmadıysa kabul kutularını işaretleme. Bu spec'i yazmak commit, push veya yayın işleminin gerçekleştiği anlamına gelmez.
