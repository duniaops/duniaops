# Sekiz dilde blog indeksini ve yazılar arası dil navigasyonunu ekle

**Type:** Feature
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Implemented — sekiz dilde indeks ve konu-korumalı dil navigasyonu doğrulandı (2026-09-22)
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

- [x] **AC1:** Sekiz indeks, yalnızca kendi dilindeki yayımlanabilir yazıları gösterir; taslak veya gelecek yazı başlığı/görseli kartlara sızmaz.
- [x] **AC2:** Makale dil seçicisi sekiz sürüm arasında aynı konuyu korur; indeks seçicisi hedef dilin indeksine gider. Eksik hedef için sahte yerel sayfa açılmaz.
- [x] **AC3:** Rockimals ürün navigasyonundan ilgili dildeki bloga ve blogdan ürüne erişilir; mevcut ana sayfa dil yolları ile diğer ürün navigasyonu korunur.
- [x] **AC4:** İndeks 390/768/1440 px genişliklerinde taşmadan okunur; sekiz dilin uzun etiketleri ve CJK metni kullanılabilir. Dil menüsü klavye ve görünür odakla çalışır.
- [x] **AC5:** İndeks, kartlar ve temel dil bağlantıları JavaScript olmadan kullanılabilir; boş içerik durumunda kırık kart veya zorunlu boş filtre gösterilmez.
- [x] **AC6:** Blog kategori/bağlantıları kurumsal DuniaOps hizmet blogundan ayrıdır; henüz yayımlanmamış ilgili yazıya yönlendirme yoktur.

## Validation

Yerel indeks, ürün↔blog ve aynı konu dil değişimini üç genişlikte incele; boş/taslak envanter ve JavaScript kapalı erişimi kontrol et.

## Out of Scope

Tam metin arama, kategori filtresi, sayfalama ve RSS; host rewrite/redirect kuralları (025).

## Completion Record

**Tamamlandı:** 2026-09-22

- İndeks üretimi: `scripts/rockimals-blog-index.mjs`, 022 yayın manifestinden yalnızca istenen locale'in yayımlanabilir kayıtlarını kullanır. Yerel giriş, dört kategori rehberi, kapaklı kartlar ve içerik yoksa sade boş durum üretir; arama, boş filtre veya sahte sonuç eklemez.
- Ortak navigasyon: `scripts/rockimals-blog-navigation.mjs`, sekiz yerel indeks yolunu ve JavaScript gerektirmeyen yerel `<details>` dil menüsünü üretir. Makalede yalnızca manifestin sağladığı `alternatePaths` kullanılır; bu nedenle eksik çeviri için İngilizce fallback veya hayali hedef oluşmaz.
- Makale entegrasyonu: `scripts/rockimals-blog-article.mjs`, marka bağlantısını yerel ürün sayfasına, Blog bağlantısını yerel indekse ve dil seçeneklerini aynı `translationKey` karşılıklarına bağlar. Aynı dildeki ilgili yazılar 022'nin yayımlanabilir envanteriyle sınırlı kalır.
- Ürün navigasyonu: `content/rockimals-landing/locales.json` sekiz yerel Blog etiketini içerir; `scripts/build-rockimals-landing.mjs` İngilizce için `/blog`, diğer diller için `/{locale}/blog` hedefini mevcut ürün navigasyonuna ekler. İzlenen `products/rockimals.html` İngilizce kaynak çıktısı güncellendi; diğer mevcut bağlantılar korunur.
- Stil: `css/rockimals-blog.css`, indeks hero/kategori/kart düzenini, tek kartın okunabilir genişliğini, mobil başlığı, menü katmanını, klavye odaklarını ve 390 px'e kadar taşmasız davranışı tanımlar. Makale ve indeks aynı Rockimals görsel dilini paylaşır.
- Otomatik doğrulama: `tests/rockimals-blog-index.test.mjs` içindeki altı test; locale ayrımı, boş envanter, indeks yolları, konu-korumalı makale geçişleri, eksik çevirinin atlanması, ürün navigasyonu ve CSS korumalarını doğruladı. Mevcut yedi makale şablonu testi de regresyonsuz geçti.
- Görsel doğrulama: Yerel indeks 390×844, 768×900 ve 1440×1000 viewport'larda incelendi; belge genişliği viewport'u aşmadı. Sekiz locale 390 px'te ölçüldü; Japonca indeks ve makale ayrıca görsel olarak incelendi, CJK glif sorunu görülmedi.
- Klavye doğrulaması: Mobil dil özeti Tab ile odaklanıp Enter ile açıldı; sekiz seçenek, güncel dil işareti ve görünür odak halkası doğrulandı. Makale dil menüsündeki hedeflerin aynı konu yolları olduğu ayrıca kontrol edildi.
- Önizleme: `npm run preview:rockimals-blog-index`, sekiz özel `noindex,nofollow` örneğini `.rockimals-blog-preview/indexes/` altında üretir. Klasör Git tarafından yok sayılır ve üretim çıktısına girmez.
- Sınırlar: Kurumsal DuniaOps bloguna bağlantı eklenmedi. Canlı route, canonical/hreflang ve dağıtım entegrasyonu 025'e; mağaza CTA çözümlemesi 033'e bırakıldı. Canlı yayın yapılmadı.

Açık uygulama maddesi yoktur.
