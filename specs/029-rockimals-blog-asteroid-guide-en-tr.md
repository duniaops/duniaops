# Konu 15: Asteroit nedir? Çocuklar için başlangıç rehberi — İngilizce ve Türkçe metni hazırla

**Type:** Task
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Complete — English/Turkish sources drafted and validated; publication deferred.
**Depends on:** [022 — içerik sözleşmesi](022-rockimals-blog-content-contract.md), [026 — ürün ve görsel referansı](026-rockimals-blog-editorial-assets.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Markayı bilmeyen aileye asteroidi anlaşılır biçimde açıklayan, uygulama indirmeden de faydalı olan bir bilim yazısı hazırla. Tek konunun kaynak yazısı ve Türkçe uyarlaması bu işin kapsamıdır; kalan altı dil ayrı spec'tedir.

## Scope

- Kaynak plandaki 15 kimliğini koru. Başlangıç kelimeleri: what is an asteroid for kids / çocuklar için asteroit; bunlar doğrulanmış arama hacmi değildir.
- İngilizce/Türkçe için hedef pazar varsayımı ve arama niyetini doğrula; ana brief'e okuyucu, tek soru, özgün açı, kaynak, görsel, ilgili yazı ve CTA kararını kaydet.
- Asteroidin ne olduğu, temel boyut/yer karşılaştırması, gerçek veri ile hayvan kurgusunun ayrımı; meteor/kuyruklu yıldız karşılaştırmasının tamamını bu yazıya taşıma.
- NASA Space Place / NASA Science gibi birincil bilim kaynakları; kaynak tarihini kaydet, öğrenme sonucu veya NASA onayı iddiası ekleme.
- Ortak İngilizce kaynak metni ve doğal Türkçe uyarlamayı 022 sözleşmesiyle yaz; iki kaynak da taslak kalır. Yerel H1, açıklama, görsel alt metni, başlık yapısı ve CTA'yı tamamla.
- 026'daki konu görsel paketini kullan; görsellerin kaynağını veya ortak manifesti yeniden tasarlama. Görsel eksik/yanlışsa 026'ya düzeltme ihtiyacı kaydet.
- CTA yönü: Rockimals'ta gerçek bir ziyaretçinin bilgi kartını keşfetme. Kampanya token'ı yazma; hedef çözümlemesini 033 sağlar. Yayımlanmamış ilgili konu gerçek bağlantı gibi gösterilmez.

## Acceptance Criteria

- [x] **AC1:** Konu 15 için bir tamamlanmış brief, İngilizce ve Türkçe iki Markdown kaynağı vardır; aynı translationKey, doğru dil/slug ve draft durumu kullanılır.
- [x] **AC2:** İki dil için anahtar kelime/pazar varsayımı ve incelenen arama niyeti kayıtlıdır; hacim, trafik veya sıralama sayısı uydurulmaz.
- [x] **AC3:** Her metin soruya doğrudan cevap verir; özgün ürün/bilim örneği ve konuya uygun sonraki adım içerir. Türkçe metin kelimesi kelimesine çeviri veya yarım İngilizce sayfa değildir.
- [x] **AC4:** Kaynaklar, uygulama sürüm/tarih gereksinimi ve 026 ürün sınırları uygulanır; bilim/kurgu, ücretsiz/Plus ve veri işleme konusunda desteklenmeyen iddia bulunmaz.
- [x] **AC5:** İki dilin title/description/imageAlt/CTA/terimleri tamamdır; ilgili dilde ekran veya metinsiz görsel kullanılır. Desteklenmeyen deep link, yayınlanmamış ilgili URL veya sahte yazar onayı yoktur.
- [x] **AC6:** Anlam/terim inceleme durumu ve kalan sorunlar kayıtlıdır; çözülmemiş olgusal/çeviri sorunuyla kaynak 'hazır' sayılmaz. Bu iki dil tek başına kamuya açık paket olarak yayımlanmaz.

## Validation

Metin ve kaynakları editoryal olarak incele; 022 alan sözleşmesiyle uyumu kontrol et. Şablon hazırsa yerel önizlemede kullan; nihai 24 sayfalık entegrasyon kontrolü 034'e aittir. Bu iş mobil oyun testleri veya deploy içermez.

## Out of Scope

Diğer altı dil, ortak görsel/terim altyapısı, şablon kodu, kampanya yapılandırması ve yayın.

## Completion Record

2026-09-22'de tamamlanan kaynaklar:

- `content/rockimals-blog/what-is-an-asteroid-for-kids/en.md` ve `tr.md`: yerel H1/metadata/CTA, aynı metinsiz kapak, `draft: true`, `productGuide: false`.
- `content/rockimals-blog/_editorial/what-is-an-asteroid-for-kids-brief.md`: arama niyeti ve pazar varsayımları, incelenen NASA/JPL/TÜBİTAK ve ürün kaynakları, konuya özgü çeviri/ürün sınırları, inceleme ve yayın kararı.

**Doğrulama:** `npm run check:rockimals-blog`, `npm run preview:rockimals-blog-drafts` ve `npm test` başarılı. Özel taslak önizlemeleri `en.html`/`tr.html` olarak üretildi. Genel site build'i yalnızca önceden yayımlanmış bir konu paketini (sekiz sayfa) içeriyor; bu konunun makale URL'si üretilmedi. Kapak varlığı ve alt metin ölçek uyarısı kontrol edildi.

**Açık takip:** Bağımsız ana dili/editör incelemesi yapılmış gibi gösterilmiyor; yayın öncesi ürün sahibi kararı, altı dilin Spec 030 kapsamında tamamlanması ve kaynak/ürün sürümü yeniden kontrolü gerekir. Çözülmemiş olgusal veya EN/TR terim çelişkisi bulunmuyor. Bu spec'in tamamlanması commit, push veya yayın işleminin tek başına gerçekleştiği anlamına gelmez.
