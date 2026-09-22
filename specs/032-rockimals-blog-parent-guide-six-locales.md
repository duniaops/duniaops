# Konu 28: Rockimals'ta reklam, hesap ve ebeveyn kontrolü — kalan altı dile uyarla

**Type:** Task
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Planned — implementation not started
**Depends on:** [31 — konu 28 İngilizce/Türkçe kaynak](031-rockimals-blog-parent-guide-en-tr.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Konu 28 için doğrulanmış kaynak brief ve İngilizce metinden Japonca, Korece, Basitleştirilmiş Çince, Fransızca, Almanca ve İspanyolca uyarlamalar üret; sekizli içerik paketini tamamla.

## Scope

- ja/ko/zh-Hans/fr/de/es için ayrı kaynak dosyaları, doğal başlık/açıklama/CTA, anlamlı alt metin ve uygulamayla tutarlı oyun terimleri hazırla.
- Her dil için arama sonucu niyetini ve pazar varsayımını kaydet; kaynak anahtar kelimeyi mekanik çevirmek veya ölçülmeyen hacim yazmak yerine yerel ifade seç.
- Kaynak metnin ürün/bilim iddialarını ve aynı translationKey'yi koru; gerekli yerel anlatım farkını ve yeni kaynak ihtiyacını brief'e ekle. Asıl kapsamı genişletme.
- 026'daki metinsiz kapak ve ilgili dil ekranlarını kullan; İngilizce ekranı yerel diye sunma. Kaynak görsel/ortak terim değişikliği için tek sahip olan 026 kaydına dön.
- CJK anlam, noktalama ve satır kırılımı ihtiyaçları ile Avrupa dillerindeki uzun CTA/başlıkları gözden geçir. Native review yapıldıysa kanıtla, yapılmadıysa o onayı iddia etme.
- Altı kaynak da taslak kalır; sekizli paketin yayın kararı haftalık akışta alınır. Platform linkleri 033 tarafından çözülür.

## Acceptance Criteria

- [ ] **AC1:** Altı tamamlanmış yeni dil kaynağı vardır; önceki en/tr ile birlikte tek konuya ait sekiz ayrı ve doğru locale/slug oluşur, eksik dil için İngilizce fallback yoktur.
- [ ] **AC2:** Her dil için yerel arama ifadesi, niyet/pazar kaydı, başlık, açıklama, imageAlt, CTA ve oyun terimleri tamamlanmıştır.
- [ ] **AC3:** Kaynak yazının anlamı ve olgusal sınırları korunur; çeviri yeni ürün özelliği, kesinlik, sağlık/öğrenme kazanımı veya NASA onayı üretmez.
- [ ] **AC4:** Metin içeren ekranlar doğru dildedir; ortak kapak konuya uygundur. Aynı dilde yalnızca yayımlanabilir ilgili yazılar bağlantı olabilir.
- [ ] **AC5:** Altı dilin anlam/terminoloji inceleme durumu kaydedilmiştir; CJK metinde eksik/bozuk karakter bulunmaz ve çözülmemiş içerik sorunu hazır diye işaretlenmez.
- [ ] **AC6:** Bu işin sonunda sekizli kaynak envanteri tamamdır; tüm kaynaklar taslak olarak korunur, çeviri tamamlanması canlı yayın diye raporlanmaz. Nihai render kontrolü için yollar 034'e verilir.

## Validation

Altı kaynak ile onaylı kaynak metin arasında anlam ve iddia karşılaştırması yap; 022 alanları ve 026 terim/görsel eşleşmesini incele. Şablon mevcutsa CJK ve uzun metin önizlemesi yap; 034 gerçek birleşik çıktıyı doğrular.

## Out of Scope

Kaynak yazının amacını yeniden belirleme, ortak görsel üretimi, başka konu çevirisi, otomatik yayın veya ana dili incelemesi yapılmış gibi varsayım.

## Completion Record

Altı kaynak dosyası, sekizli envanter, her dilin arama/inceleme kaydı ve varsa çözülmemiş konuya özgü maddeler.

Kapanışta değişen dosyaları, kanıtları ve açık maddeleri kaydet. Uygulama tamamlanmadıysa kabul kutularını işaretleme. Bu spec'i yazmak commit, push veya yayın işleminin gerçekleştiği anlamına gelmez.
