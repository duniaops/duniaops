# Rockimals tasarımında erişilebilir yazı şablonu oluştur

**Type:** Feature
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Implemented — erişilebilir makale şablonu ve özel önizleme doğrulandı (2026-09-22)
**Depends on:** [022 — içerik sözleşmesi](022-rockimals-blog-content-contract.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Okuyucuya sorunun cevabını ve ilgili oyun deneyimini gösteren, uzun okumaya uygun Rockimals yazı sayfası oluştur. Bu iş makale HTML/CSS'sinin sahibidir; mağaza hedefinin çözülmesi 033'e aittir.

## Scope

- Mevcut rockimals-landing.css tasarımını referans al: #07101d lacivert, #ff6a2a turuncu, #ffb262 sıcak altın, #fff8ed krem; Fredoka başlık ve Inter gövde yaklaşımı.
- Japonca/Korece/Çince metin için eksiksiz karakter kapsamı ve doğal satır kırılımı sağla. Gövdeyi rahat satır aralığı ve dar okuma sütununda sun.
- Kategori, H1, kısa cevap, yazar/tarih, kapak, gerektiğinde içindekiler, bölümler, örnekler, kaynaklar ve aynı dilde ilgili yazıları oluştur.
- Yazıya bağlı 'Bunu Rockimals’ta keşfet' ve ana mağaza CTA alanını tasarla. 033 bağlantı çözümleyicisini sonradan bu alana bağlar; bu işte kampanya token'ı uydurma.
- 1200×630 kapak ile portre ekran/sahne görsellerini oranı koruyarak sun; boyut bilgisi, uygun responsive görsel davranışı ve kapak dışı görsellerde gecikmeli yükleme sağla.
- Şablonu kamuya alınmayan temsili içerikle yerelde incele; gerçek kaynak yazıları yayınlamak bu işin parçası değildir.

## Acceptance Criteria

- [x] **AC1:** Başlangıç HTML'sinde başlık, gövde, kaynaklar ve temel bağlantılar JavaScript kapalıyken okunur; tek ana H1 ve anlamlı başlık sırası vardır.
- [x] **AC2:** 390/768/1440 px incelemesinde sayfa taşmaz, tablolar yönetilebilir, CTA kesilmez, portre görseller gerilmez veya anlamlı sahne alanını kaybetmez.
- [x] **AC3:** Tüm sekiz dilin temsili metni doğru görüntülenir; CJK karakterleri eksik glif olarak görünmez. Uzun yerel başlık ve CTA metni yerleşimi bozmaz.
- [x] **AC4:** Kontroller klavyeyle erişilebilir ve odak görünürdür; metin kontrastı, bağlantı adları ve görsel alt metinleri okunabilirlik/erişilebilirlik incelemesinden geçer.
- [x] **AC5:** Yalnızca 022 manifestinin sağladığı aynı-dil ilgili yazılar gösterilir; henüz içerik yoksa hayali kart veya bozuk bağlantı oluşmaz.
- [x] **AC6:** Renk, tipografi ve karakter görselleri mevcut ürünle tutarlıdır; kurumsal danışmanlık CTA'sı yazı şablonuna taşınmaz. Görsel inceleme kanıtı kaydedilir.

## Validation

Yerel makale önizlemesini belirtilen üç genişlikte ve sekiz dil örneğiyle incele; JavaScript kapalı gövde ve klavye akışını kontrol et. Oyun uygulaması capture harness'i çalıştırma.

## Out of Scope

İndeks ve dil karşılığı navigasyonu (024), host/metadata/structured data (025), kampanya/mağaza mantığı (033), yeni oyun illüstrasyonu.

## Completion Record

**Tamamlandı:** 2026-09-22

- Şablon: `scripts/rockimals-blog-article.mjs`; 022 manifest yazısını tam HTML'e çevirir. Tek H1, isteğe bağlı içindekiler, kısa cevap, Markdown gövde, kaynaklar, ürün deneyimi, CTA ve ilgili yazı alanlarını sunar; istemci JavaScript'i üretmez.
- Stil: `css/rockimals-blog.css`; Rockimals renkleri ve Fredoka/Inter yaklaşımıyla dar okuma sütunu, CJK sistem/web font yedekleri, yatay kaydırılabilir tablo, görünür odak ve azaltılmış hareket davranışı içerir.
- CTA entegrasyonu: Şablon çözülmüş `ctaHref` değerini dışarıdan alır ve kararlı `cta.id` değerini `data-rockimals-cta` üzerinde korur. Önizleme doğrulanmış normal App Store bağlantısını kullanır; kampanya parametresi veya deep link üretmez. 033 çözümleyicisi bu noktaya bağlanacaktır.
- Önizleme: `npm run preview:rockimals-blog-article`, sekiz dili `.rockimals-blog-preview/articles/` altında `noindex,nofollow` HTML olarak üretir. Bu klasör Git tarafından yok sayılır ve `build:site`/`dist` kapsamına girmez.
- Otomatik doğrulama: `tests/rockimals-blog-article.test.mjs` içindeki yedi test; semantik gövde, tek H1, kaynak/içindekiler, kapak ve portre boyutları, lazy loading, boş/dolu ilgili yazı davranışı, sekiz locale ve CSS erişilebilirlik korumalarını doğruladı.
- Görsel doğrulama: Yerel önizleme 390×844, 768×900 ve 1440×1000 viewport'larda incelendi. Her genişlikte belge `scrollWidth` değeri kullanılabilir genişliği aşmadı; başlık ve CTA sınırlar içinde kaldı. Sekiz dil mobil ölçüldü; Japonca, Korece ve Basitleştirilmiş Çince ayrıca görsel olarak incelendi ve eksik glif görülmedi.
- Görsel davranışı: Kapak 1200:630 çerçevede, anlamlı karakter alanı korunarak gösterildi. 828×1800 portre Radar görseli doğal oranında, tamamı kart içinde ve lazy-loading ile doğrulandı. Önizleme mevcut ürün hero görselini kullanır; konuya ait nihai 1200×630 dosyaları 026'nın kapsamındadır.
- Erişilebilirlik: İlk Tab odağı skip linkini görünür 3 px altın outline ile açtı. Gece laciverti/turuncu ana CTA kontrastı 6.67:1; krem, sis ve altın ana yüzey kombinasyonları sırasıyla 18.08:1, 11.40:1 ve 10.72:1 ölçüldü. Tüm görseller anlamlı alt metin taşır.
- Ürün sınırı: Şablon Rockimals marka/mağaza çağrısını kullanır; kurumsal danışmanlık CTA'sı veya hayali ilgili yazı üretmez. İndeks, dil navigasyonu, canonical/metadata ve üretim route entegrasyonu sırasıyla 024/025 kapsamındadır.

Açık uygulama maddesi yoktur. Canlı yayın yapılmadı.
