# Sekiz dilde blog indeksini ve yazılar arası dil navigasyonunu ekle

**Type:** Feature
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Planned — implementation not started
**Depends on:** [022 — içerik sözleşmesi](022-rockimals-blog-content-contract.md), [023 — yazı şablonu](023-rockimals-blog-article-template.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Okuyucunun blogu ürün sayfasından bulmasını, yazıları kendi dilinde keşfetmesini ve aynı makalenin başka diline geçmesini sağla. Bu iş navigasyon ve indeksin sahibidir; host kuralları 025'e aittir.

## Scope

- İngilizce /blog ve yedi yerel /{locale}/blog indeksini 022'nin yayın manifestinden üret.
- Yerel giriş, başlangıç rehberi, kapaklı makale kartları ve dört kullanıcı kategorisini göster. Az içerikte boş filtre, sahte sonuç veya gereksiz arama arayüzü ekleme.
- Blog bağlantısını mevcut Rockimals navigasyonuna yerel indeks hedefiyle ekle; ürün ana sayfasındaki mevcut dil ve bölüm bağlantılarını koru.
- Makaledeki dil seçimini aynı translationKey'nin karşılığına, indeksteki seçimi karşılık gelen indekse bağla. Zorunlu tarayıcı-dili yönlendirmesi yapma.
- İndeks/kart/dil menüsü metinlerini sekiz dilde sun; yalnızca yayımlanabilir içerikten bağlantı üret.
- Makale tasarımıyla ortak görsel dili kullan; nihai mağaza hedefi ve SEO metaverisi sahipliğini 033/025'te bırak.

## Acceptance Criteria

- [ ] **AC1:** Sekiz indeks, yalnızca kendi dilindeki yayımlanabilir yazıları gösterir; taslak veya gelecek yazı başlığı/görseli kartlara sızmaz.
- [ ] **AC2:** Makale dil seçicisi sekiz sürüm arasında aynı konuyu korur; indeks seçicisi hedef dilin indeksine gider. Eksik hedef için sahte yerel sayfa açılmaz.
- [ ] **AC3:** Rockimals ürün navigasyonundan ilgili dildeki bloga ve blogdan ürüne erişilir; mevcut ana sayfa dil yolları ile diğer ürün navigasyonu korunur.
- [ ] **AC4:** İndeks 390/768/1440 px genişliklerinde taşmadan okunur; sekiz dilin uzun etiketleri ve CJK metni kullanılabilir. Dil menüsü klavye ve görünür odakla çalışır.
- [ ] **AC5:** İndeks, kartlar ve temel dil bağlantıları JavaScript olmadan kullanılabilir; boş içerik durumunda kırık kart veya zorunlu boş filtre gösterilmez.
- [ ] **AC6:** Blog kategori/bağlantıları kurumsal DuniaOps hizmet blogundan ayrıdır; henüz yayımlanmamış ilgili yazıya yönlendirme yoktur.

## Validation

Yerel indeks, ürün↔blog ve aynı konu dil değişimini üç genişlikte incele; boş/taslak envanter ve JavaScript kapalı erişimi kontrol et.

## Out of Scope

Tam metin arama, kategori filtresi, sayfalama ve RSS; host rewrite/redirect kuralları (025).

## Completion Record

İndeks ve navigasyon yolları, sekiz dil etiketleri, dil eşleme davranışı ve görsel/klavye inceleme kanıtı.

Kapanışta değişen dosyaları, kanıtları ve açık maddeleri kaydet. Uygulama tamamlanmadıysa kabul kutularını işaretleme. Bu spec'i yazmak commit, push veya yayın işleminin gerçekleştiği anlamına gelmez.
