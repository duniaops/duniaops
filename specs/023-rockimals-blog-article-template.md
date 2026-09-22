# Rockimals tasarımında erişilebilir yazı şablonu oluştur

**Type:** Feature
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Planned — implementation not started
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

- [ ] **AC1:** Başlangıç HTML'sinde başlık, gövde, kaynaklar ve temel bağlantılar JavaScript kapalıyken okunur; tek ana H1 ve anlamlı başlık sırası vardır.
- [ ] **AC2:** 390/768/1440 px incelemesinde sayfa taşmaz, tablolar yönetilebilir, CTA kesilmez, portre görseller gerilmez veya anlamlı sahne alanını kaybetmez.
- [ ] **AC3:** Tüm sekiz dilin temsili metni doğru görüntülenir; CJK karakterleri eksik glif olarak görünmez. Uzun yerel başlık ve CTA metni yerleşimi bozmaz.
- [ ] **AC4:** Kontroller klavyeyle erişilebilir ve odak görünürdür; metin kontrastı, bağlantı adları ve görsel alt metinleri okunabilirlik/erişilebilirlik incelemesinden geçer.
- [ ] **AC5:** Yalnızca 022 manifestinin sağladığı aynı-dil ilgili yazılar gösterilir; henüz içerik yoksa hayali kart veya bozuk bağlantı oluşmaz.
- [ ] **AC6:** Renk, tipografi ve karakter görselleri mevcut ürünle tutarlıdır; kurumsal danışmanlık CTA'sı yazı şablonuna taşınmaz. Görsel inceleme kanıtı kaydedilir.

## Validation

Yerel makale önizlemesini belirtilen üç genişlikte ve sekiz dil örneğiyle incele; JavaScript kapalı gövde ve klavye akışını kontrol et. Oyun uygulaması capture harness'i çalıştırma.

## Out of Scope

İndeks ve dil karşılığı navigasyonu (024), host/metadata/structured data (025), kampanya/mağaza mantığı (033), yeni oyun illüstrasyonu.

## Completion Record

Makale şablonu/stil yolları, CTA entegrasyon alanı, yerel önizleme yöntemi ve görsel/erişilebilirlik inceleme notu.

Kapanışta değişen dosyaları, kanıtları ve açık maddeleri kaydet. Uygulama tamamlanmadıysa kabul kutularını işaretleme. Bu spec'i yazmak commit, push veya yayın işleminin gerçekleştiği anlamına gelmez.
