# Konu 01: Rockimals nasıl oynanır? İlk ziyaretçinle tanış — İngilizce ve Türkçe metni hazırla

**Type:** Task
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Implemented — İngilizce/Türkçe kaynaklar ve özel taslak önizlemesi doğrulandı (2026-09-22)
**Depends on:** [022 — içerik sözleşmesi](022-rockimals-blog-content-contract.md), [026 — ürün ve görsel referansı](026-rockimals-blog-editorial-assets.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Ürünü ilk kez değerlendiren ebeveyn ve oyuncuya Radar'da ilk ziyaretçiyi bulma, bilgi kartını açma ve ilgili hikâyeye geçişi anlat. Tek konunun kaynak yazısı ve Türkçe uyarlaması bu işin kapsamıdır; kalan altı dil ayrı spec'tedir.

## Scope

- Kaynak plandaki 01 kimliğini koru. Başlangıç kelimeleri: how to play Rockimals / Rockimals nasıl oynanır; bunlar doğrulanmış arama hacmi değildir.
- İngilizce/Türkçe için hedef pazar varsayımı ve arama niyetini doğrula; ana brief'e okuyucu, tek soru, özgün açı, kaynak, görsel, ilgili yazı ve CTA kararını kaydet.
- İlk açılış, Radar seçimi, bilgi kartı, hikâyeye geçiş ve doğal bir sonraki oyun adımı; özelliklere genel bakış ile ayrıntılı rehberleri karıştırma.
- Canlı uygulama/mağaza özellikleri ve 026'nın ürün referansı. Tüm adımlar mağazada bulunan sürümle eşleşmeli.
- Ortak İngilizce kaynak metni ve doğal Türkçe uyarlamayı 022 sözleşmesiyle yaz; iki kaynak da taslak kalır. Yerel H1, açıklama, görsel alt metni, başlık yapısı ve CTA'yı tamamla.
- 026'daki konu görsel paketini kullan; görsellerin kaynağını veya ortak manifesti yeniden tasarlama. Görsel eksik/yanlışsa 026'ya düzeltme ihtiyacı kaydet.
- CTA yönü: Radar'da bir ziyaretçiyle tanışma; ebeveyn için ücretsiz indirme çağrısı. Kampanya token'ı yazma; hedef çözümlemesini 033 sağlar. Yayımlanmamış ilgili konu gerçek bağlantı gibi gösterilmez.

## Acceptance Criteria

- [x] **AC1:** Konu 01 için bir tamamlanmış brief, İngilizce ve Türkçe iki Markdown kaynağı vardır; aynı translationKey, doğru dil/slug ve draft durumu kullanılır.
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

**Tamamlandı:** 2026-09-22

- Kaynaklar: `content/rockimals-blog/rockimals-getting-started/en.md` ve `tr.md`, ortak `rockimals-getting-started` translation key'iyle, yerel ASCII slug'larla, `draft: true`, `productGuide: true` ve `reviewedAppVersion: "1.3.0"` olarak hazırlandı. Yayın tarihi bilerek uzak gelecek placeholder'ıdır.
- Brief: `content/rockimals-blog/_editorial/rockimals-getting-started-brief.md`, okuyucu/tek soru/özgün açı, EN-GB ve TR-TR pazar varsayımı, sorgu örneklemesi, kaynaklar, görsel, CTA, inceleme ve yayın blokajını kaydeder.
- Arama niyeti: 22 Eylül 2026 örneklemesinde İngilizce veya Türkçe adım adım Rockimals rehberi bulunmadı; benzer adlı uygulamalar ve ilgisiz genel oyun kuralları baskındı. İçerik bu nedenle markalı ilk kullanım/navigasyon niyetine göre yazıldı; hacim, zorluk, trafik veya sıralama sayısı eklenmedi.
- İçerik akışı: Radar'da ziyaretçi seçme, bilgi kartındaki boyut/mesafe/hız karşılaştırması, resmî kodun ebeveyn kapılı gerçekler alanındaki yeri, hikâyeye geçiş, Hikâye kitaplığı ve tek bir sonraki Dünya Kalkanı/karşılaştırma adımı anlatıldı.
- Ürün sınırları: Gerçek NASA/JPL ölçüleri hayvan/karakter/hikâye kurgusundan; sabit sekiz kahraman×beş bölüm kataloğu günlük erişim hakkından; ücretsiz kullanım Plus'tan; reklamsız/hesapsız davranış sınırlı teknik veri işlemeden ayrıldı. NASA bağlantısı/onayı, Android yayını veya deep link iddiası eklenmedi.
- Yerelleştirme: English `Radar`, `Story library`, `Earth Shield`, `Rockimals Plus`; Türkçe `Radar`, `Hikâye kitaplığı`, `Dünya Kalkanı`, `Rockimals Plus` terimleri 026 kaydıyla eşleştirildi. Türkçe metin cümle cümle çeviri yerine yerel anlatım akışıyla yazıldı.
- Görsel/CTA: İki kaynak ortak metinsiz 1200×630 konu kapağını ve yerel alt metni kullanır. Özel taslak önizlemesi aynı dilde 1.3.0 Radar ekranını gösterir. CTA yalnızca doğrulanmış App Store hedefli `app-store` kimliğidir; `relatedPosts` henüz boştur.
- Önizleme: `scripts/preview-rockimals-blog-drafts.mjs` ve `npm run preview:rockimals-blog-drafts`, iki gerçek kaynağı `.rockimals-blog-preview/drafts/rockimals-getting-started/{en,tr}.html` altında `noindex,nofollow` olarak üretir. EN/TR masaüstü başlık, kapak, içerik, dil menüsü, yerel Radar ekranı ve CTA görünümü tarayıcıda incelendi.
- Doğrulama: `npm run check:rockimals-blog` iki geçerli taslak kaynak ve sıfır yayımlanabilir paket bildirdi. Tam site/test doğrulaması bu değişikliklerle yeniden çalıştırıldı. Mobil oyun testi veya deploy yapılmadı.

**Açık yayın maddesi:** Bağımsız editoryal onay ve 028 kapsamındaki diğer altı dil tamamlanmadı. Bu iki dosya tek başına public manifest veya canlı sayfa üretmez; çözülmemiş EN/TR olgusal ya da terim sorunu yoktur.
