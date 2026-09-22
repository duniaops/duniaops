# Konu 01: Rockimals nasıl oynanır? İlk ziyaretçinle tanış — kalan altı dile uyarla

**Type:** Task
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Implemented — 2026-09-22
**Depends on:** [27 — konu 01 İngilizce/Türkçe kaynak](027-rockimals-blog-getting-started-en-tr.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Konu 01 için doğrulanmış kaynak brief ve İngilizce metinden Japonca, Korece, Basitleştirilmiş Çince, Fransızca, Almanca ve İspanyolca uyarlamalar üret; sekizli içerik paketini tamamla.

## Scope

- ja/ko/zh-Hans/fr/de/es için ayrı kaynak dosyaları, doğal başlık/açıklama/CTA, anlamlı alt metin ve uygulamayla tutarlı oyun terimleri hazırla.
- Her dil için arama sonucu niyetini ve pazar varsayımını kaydet; kaynak anahtar kelimeyi mekanik çevirmek veya ölçülmeyen hacim yazmak yerine yerel ifade seç.
- Kaynak metnin ürün/bilim iddialarını ve aynı translationKey'yi koru; gerekli yerel anlatım farkını ve yeni kaynak ihtiyacını brief'e ekle. Asıl kapsamı genişletme.
- 026'daki metinsiz kapak ve ilgili dil ekranlarını kullan; İngilizce ekranı yerel diye sunma. Kaynak görsel/ortak terim değişikliği için tek sahip olan 026 kaydına dön.
- CJK anlam, noktalama ve satır kırılımı ihtiyaçları ile Avrupa dillerindeki uzun CTA/başlıkları gözden geçir. Native review yapıldıysa kanıtla, yapılmadıysa o onayı iddia etme.
- Altı kaynak da taslak kalır; sekizli paketin yayın kararı haftalık akışta alınır. Platform linkleri 033 tarafından çözülür.

## Acceptance Criteria

- [x] **AC1:** Altı tamamlanmış yeni dil kaynağı vardır; önceki en/tr ile birlikte tek konuya ait sekiz ayrı ve doğru locale/slug oluşur, eksik dil için İngilizce fallback yoktur.
- [x] **AC2:** Her dil için yerel arama ifadesi, niyet/pazar kaydı, başlık, açıklama, imageAlt, CTA ve oyun terimleri tamamlanmıştır.
- [x] **AC3:** Kaynak yazının anlamı ve olgusal sınırları korunur; çeviri yeni ürün özelliği, kesinlik, sağlık/öğrenme kazanımı veya NASA onayı üretmez.
- [x] **AC4:** Metin içeren ekranlar doğru dildedir; ortak kapak konuya uygundur. Aynı dilde yalnızca yayımlanabilir ilgili yazılar bağlantı olabilir.
- [x] **AC5:** Altı dilin anlam/terminoloji inceleme durumu kaydedilmiştir; CJK metinde eksik/bozuk karakter bulunmaz ve çözülmemiş içerik sorunu hazır diye işaretlenmez.
- [x] **AC6:** Bu işin sonunda sekizli kaynak envanteri tamamdır; tüm kaynaklar taslak olarak korunur, çeviri tamamlanması canlı yayın diye raporlanmaz. Nihai render kontrolü için yollar 034'e verilir.

## Validation

- `npm run check:rockimals-blog` ile sekiz kaynak, locale/slug/translationKey alanları ve taslak yayın seçimi doğrulandı.
- `npm run preview:rockimals-blog-drafts` ile sekiz özel taslak önizlemesi üretildi; Japonca, Korece, Basitleştirilmiş Çince ve uzun Almanca başlık/CTA tarayıcıda görsel olarak incelendi.
- Üretilen kaynak ve önizlemelerde bozuk Unicode karakteri ile ayrıştırılmamış Markdown vurgu işareti tarandı.
- Tam depo doğrulaması için `npm test` çalıştırıldı; 034 gerçek yayın çıktısındaki birleşik render kontrolünün sahibi olmaya devam eder.

## Out of Scope

Kaynak yazının amacını yeniden belirleme, ortak görsel üretimi, başka konu çevirisi, otomatik yayın veya ana dili incelemesi yapılmış gibi varsayım.

## Completion Record

- `ja.md`, `ko.md`, `zh-Hans.md`, `fr.md`, `de.md` ve `es.md` eklendi; mevcut `en.md` ve `tr.md` ile aynı `rockimals-getting-started` translationKey altında sekizli envanter tamamlandı.
- Her dilin yerel sorgusu, arama niyeti, başlık/slug kararı, onaylı uygulama terimleri ve inceleme durumu kaynak brief'e kaydedildi; ölçülmemiş arama hacmi veya zorluk değeri yazılmadı.
- Ortak metinsiz kapak korundu; her önizleme ilgili locale'in Radar ekranını kullanıyor ve İngilizce ekran fallback'i yok.
- Altı kaynakta da `draft: true` ve ileri tarihli yer tutucu yayın zamanı korunuyor; bu çalışma canlı yayın veya deployment değildir.
- Anlam, ARB terimleri, karakter bütünlüğü ve şablon görünümü kontrol edildi. Bağımsız native editör onayı yapılmadı ve yayın öncesi açık kapı olarak brief'te kaydedildi.
- Nihai render yolları `.rockimals-blog-preview/drafts/rockimals-getting-started/<locale>.html`; yayın hattındaki son birleşik kontrol 034'e bırakıldı.
