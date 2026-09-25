# Konu 15: Asteroit nedir? Çocuklar için başlangıç rehberi — kalan altı dile uyarla

**Type:** Task
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Complete — six locale drafts prepared and validated on 2026-09-25; not published
**Depends on:** [29 — konu 15 İngilizce/Türkçe kaynak](029-rockimals-blog-asteroid-guide-en-tr.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Konu 15 için doğrulanmış kaynak brief ve İngilizce metinden Japonca, Korece, Basitleştirilmiş Çince, Fransızca, Almanca ve İspanyolca uyarlamalar üret; sekizli içerik paketini tamamla.

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

Altı kaynak ile onaylı kaynak metin arasında anlam ve iddia karşılaştırması yap; 022 alanları ve 026 terim/görsel eşleşmesini incele. Şablon mevcutsa CJK ve uzun metin önizlemesi yap; 034 gerçek birleşik çıktıyı doğrular.

## Out of Scope

Kaynak yazının amacını yeniden belirleme, ortak görsel üretimi, başka konu çevirisi, otomatik yayın veya ana dili incelemesi yapılmış gibi varsayım.

## Completion Record

Altı kaynak dosyası, sekizli envanter, her dilin arama/inceleme kaydı ve varsa çözülmemiş konuya özgü maddeler.

**2026-09-25 kapanış kaydı:** `content/rockimals-blog/what-is-an-asteroid-for-kids/` altında `ja.md`, `ko.md`, `zh-Hans.md`, `fr.md`, `de.md`, `es.md` oluşturuldu. Mevcut `en.md` ve `tr.md` ile sekiz benzersiz `locale`/`slug` aynı `translationKey` altında tamamdır. Her dosyada `draft: true`, aynı 2099 taslak zaman alanları, `app-store` CTA'sı ve `relatedPosts: []` korunur. Yerel arama niyeti, pazar/terim varsayımı, kaynak ve yazarın anlam incelemesi `content/rockimals-blog/_editorial/what-is-an-asteroid-for-kids-brief.md` içinde kayıtlıdır. Bağımsız ana dil editörü incelemesi yapılmış sayılmaz; bilinen kritik anlam/olgu çelişkisi yoktur.

**Doğrulama:** `npm run check:rockimals-blog` PASS (16 kaynak, yalnızca 1 yayımlanabilir konu); `npm run preview:rockimals-blog-drafts` PASS (sekiz özel konu 15 önizlemesi); `npm test` PASS (tam build, 277 kamuya açık dosya, link/route/metadata kontrolleri). Kamuya açık `dist` çıktısında konu 15 sayfası yoktur. Altı önizlemenin her birinde `lang`, başlık, ortak kapak, ilgili yerel `01-radar-home.jpg` deneyim ekranı, CTA ve 390 px genişlikte yatay taşma/bozuk karakter kontrolü yapıldı; her birinde `scrollWidth` 375 px, viewport 390 px ve `�` yoktu. Fransızca/Almanca/İspanyolca uzun başlıklar ve CTA'lar dar ekranda satıra bölündü, içerik kesilmedi. `04-meet-card.jpg` dosyaları her dilde 026 envanterinde vardır fakat ortak şablon bunları kullanmaz; bu, dil eşleşmesi hatası değildir.

**Açık takip:** 28 Eylül Pazartesi otomasyonu yayın öncesi kaynak/ürün/çalışma ağacı kontrollerini tekrar yapacak, ardından yalnızca sekizli paket hazırsa yayımlayacaktır. İsteğe bağlı bağımsız yerel editör kontrolü yapılmadı. Bu kapanış canlı yayın, commit veya push kanıtı değildir; nihai birleşik canlı render ve çok dilli URL kontrolü 034/yayın runbook'una aittir.
