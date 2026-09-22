# 24 yazılık başlangıç paketini haftalık yayın akışına devret

**Type:** Task
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Planned — implementation not started
**Depends on:** [025 — host/SEO/build](025-rockimals-blog-host-seo-build.md), [028 — konu 01 sekiz dil](028-rockimals-blog-getting-started-six-locales.md), [030 — konu 15 sekiz dil](030-rockimals-blog-asteroid-guide-six-locales.md), [032 — konu 28 sekiz dil](032-rockimals-blog-parent-guide-six-locales.md), [033 — CTA/ölçüm](033-rockimals-blog-conversion-measurement.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Önceki işlerin çıktısını gerçek 24 yazı ile birleştir, üç konuluk tamponu ve haftada bir sekizli paket düzenini teslim et. Bu iş yayın işletimi, bütünleşik kabul kaydı ve kalan kararların sahibidir; altyapı veya yazı üretimini tekrar yapmaz.

## Scope

- 52 aday konu ve ilk 13 haftayı kaynak plandan konu kimliğiyle referansla; ikinci bağımsız sıralama oluşturma. Üç başlangıç konusu 01/15/28'dir.
- Haftalık kayıt için konu, sekiz dilin hazırlığı, hedef hafta/tarih, sorumlu editör/dil incelemesi, kaynak/URL, yayın/deploy, CTA ve sonraki değerlendirme alanlarını oluştur.
- Üç konu × sekiz dil = 24 kaynak ile üç görsel paketini gerçek şablon ve yerel önizlemeye bağla. İlk konu yayın adayı olurken sonraki ikisinin taslak kalabildiğini doğrula; kamuya sızmayan önizleme kullan.
- Build/yayın işletim adımlarını, sekizli paketin tamamlanma koşulunu, bir sorun olduğunda yayını hazır saymama ve sonraki haftayı taşıma davranışını belgeleyerek devret.
- Başlangıç tarihi ve önerilen salı 10.00 Europe/London saatinin karar durumunu; editoryal/dil sorumluluklarını; dış veri erişimini görünür kaydet. Eksik kararları uydurma, altyapı işlerinin durumundan ayrı tut.
- 033'ün başlangıç ve 4/8/13. hafta kayıtlarını yayın tarihine göre bağla. Gelecek performans sonucunu veya kalan 49 konunun üretimini bugünkü teslimat koşulu yapma.
- Deploy/yayın yalnızca ilgili oturumdaki mevcut kullanıcı yetkisi kapsamında gerçekleşirse canlı URL/tarih/sürümü kaydet. Hazırlanmış dosya, başarılı yerel build veya sekiz çeviri tamamlanması canlı yayın değildir.

## Acceptance Criteria

- [ ] **AC1:** Üç konu için 24 kaynak, üç konu görsel paketi ve sekizli konu/dil matrisi tamamdır; editoryal/ürün doğruluğu açık maddeleri çözülmeden yayın hazır durumu verilmez.
- [ ] **AC2:** Gerçek içerikle sekiz dilin URL/dil seçimi, üç genişlikte örnek makale/indeks kullanılabilirliği, CJK ve uzun metinler, görsel oranı/alt metin ve mağaza hedefi inceleme kaydına sahiptir. 021 AC1–AC6 için kanıt bağlantıları vardır.
- [ ] **AC3:** İlk sekizli konunun yayın adayı, diğer 16 sayfanın taslak olduğu senaryo ayrı yerel/aday çıktıda doğrulanır; üretim kaynağı/deploy yetkisi olmadan canlı yayın durumu değiştirilmez.
- [ ] **AC4:** Haftalık kayıt ve runbook, bir özgün konu × sekiz dil ritmini ve ilk üç konuluk tamponu korur. Bir konu ancak sekiz sürümü canlı ve kullanılabilir ise yayımlandı sayılır.
- [ ] **AC5:** 52 konu ve ilk 13 hafta kaynak plandan referanslanır; 4/8/13. hafta incelemeleri 033'ün ölçüm tanımlarıyla bağlanır. Veri/kapasiteye göre sırayı değiştirme yöntemi vardır.
- [ ] **AC6:** Başlangıç günü/saati, sorumlu roller, dil/pazar varsayımları, kampanya/dış veri erişimi ve ileride manuel/otomatik işletim kararları açık durumuyla kaydedilir; eksik değerler onaylanmış veya sıfır varsayılmaz.
- [ ] **AC7:** 021'in yedi kriteri için hazır/pending durum ve kanıt vardır. Yerel teslimat ile canlı yayın ayrı raporlanır; ileri tarihli veri, mobil uygulama QA'sı, otomasyon veya kalan yılın içerikleri tamamlanmış gibi gösterilmez.

## Validation

Yeni gerçek içerik ve son entegrasyon için site build/check, route/SEO/public-output incelemesi ile hedefli tarayıcı kontrolü yap; önceki kanıtları kullan, değişmeyen işleri gereksiz tekrarlama. Oyun reposunun askıya alınmış test/capture sürecini başlatma.

## Out of Scope

Yinelenen otomasyon kurmak, 13 hafta beklemek/izlemek, kalan 49 konuyu yazmak, yeni analitik eklemek, yetkisiz commit/push/deploy.

## Completion Record

Yayın runbook'u ve kayıt yolu, 24 kaynak matrisi, yedi ana kriterin kanıtı, açık operasyon kararları, varsa gerçekten oluşmuş canlı yayın kaydı.

Kapanışta değişen dosyaları, kanıtları ve açık maddeleri kaydet. Uygulama tamamlanmadıysa kabul kutularını işaretleme. Bu spec'i yazmak commit, push veya yayın işleminin gerçekleştiği anlamına gelmez.
