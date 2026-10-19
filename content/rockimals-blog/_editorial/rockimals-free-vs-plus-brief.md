# Konu 29 brief — Rockimals ücretsiz mi? Ücretsiz özellikler ve Plus

- **Durum:** Kullanıcı 19 Ekim 2026'da metin ve resmî karakterli kapağı onayladı. Sekiz dil aynı `2026-10-19T11:04:33Z` yayın alanıyla açıldı; canlı dağıtım ayrıca doğrulanmalıdır.
- **Hazırlık ve yayın tarihi:** 19 Ekim 2026. Plandaki konu 16'dan sonraki en eski açık aday; bu takvim haftasındaki tek yeni konu.
- **Translation key:** `rockimals-free-vs-plus`; kategori `family-guide`; ürün rehberi, `reviewedAppVersion: 1.5.0` yalnızca doğrulanan iOS davranışına dayalı.
- **Okur ve niyet:** İndirmeden veya Plus satın almadan önce ebeveynin “Neler gerçekten ücretsiz, Plus ne ekliyor, abonelik ne zaman gerekebilir?” sorusunu baskısız cevaplamak. Fiyat/deneme garantisi, tüm içerik anında açılır vaadi veya Android 1.5.0 varsayımı yok.

## Güncel kanıt ve iddia sınırı

19 Ekim 2026'da [Apple'ın herkese açık iTunes lookup kaydı](https://itunes.apple.com/lookup?id=6792505608&country=gb) iOS `1.5.0`, ücretsiz indirme, `2026-10-17T16:36:00Z` sürüm zamanı ve güncel ücretsiz/Plus açıklamasını döndürdü. [Google Play sayfası](https://play.google.com/store/apps/details?id=com.duniaops.rockimals&hl=en_GB&gl=GB) HTTP 200 döndü; herkese açık GB görünümünde hâlâ **25 Eylül 2026** güncellemesi yazıyordu. Bu tarih Android'de kurulu sürümün kesin numarası değildir. Android'in iOS 1.5.0 haklarına geçtiği iddia edilmez; makale Android kullanıcısını kendi kurulu sürüm ve satın alma ekranına yönlendirir.

İçerik, [1.5.0 ürün referansı](product-reference.json), güncel [sekiz dil açılış metni](../../rockimals-landing/locales.json) ve [Rockimals destek](https://rockimals.duniaops.com/support) ile karşılaştırıldı. Doğrulanmış iOS ücretsiz sınırı: Radar, ziyaretçi bilgi kartları ve takip; toplam 10 ücretsiz okuma bölümü, günde en fazla 3 yeni bölüm; ücretsiz alınanları yeniden okuma; günlük 3 dakika Dünya Kalkanı ve tema başına günlük 1 keşif görevi. Yeni kurulum başına tek ücretsiz sesli bölüm yalnızca EN/TR ses dillerinde, okuma hakkından ayrı. Plus etkin olduğu sürece yayımlanmış kütüphane ve mevcut EN/TR sesleri, sınırsız Dünya Kalkanı, 12 keşif görevi, dört ek oyun ve günlük süslemeleri. Bütün planlarda hayvan başına günde en fazla bir yeni bölüm; bölüm bitirilmeli ve sonraki uygun gün Radar'da karakterle yeniden buluşulmalı. Plus, gelecek bölümleri erkenden açma yolu değildir.

Plus aylık/yıllık, isteğe bağlı ve otomatik yenilenen aboneliktir. Bölgesel fiyat ve olası deneme koşulları makaleye sabitlenmez; kullanıcı satın alma ekranına gönderilir. Uygulamayı silmenin aboneliği iptal etmediği ve mağazadan yönetim yolları [Apple destek](https://support.apple.com/en-gb/118428), [Apple uygulama silme](https://support.apple.com/en-euro/101550) ve [Google Play yardım](https://support.google.com/googleplay/answer/7018481?hl=en-GB) ile doğrulandı. Bu yazı hukuki veya mali tavsiye olarak konumlanmaz.

## Dil, görsel ve ürün ayrımı

EN/TR/JA/KO/ZH-Hans/FR/DE/ES için H1, açıklama, CTA, alt metin ve ürün terimleri yerelleştirildi. Terimler mevcut `product-reference.json.localizedTerms` ve `content/rockimals-landing/locales.json` ile karşılaştırıldı. Bu yazar incelemesi **bağımsız ana dil editörü onayı değildir**; yayımdan önce temsilî mobil kırılımlar ve özellikle CJK anlamı ayrıca gözden geçirilmeli.

Kullanıcının görsel koşulu: kapaktaki hayvanlar uygulamadaki karakterlerle eşleşmeli. Bu nedenle ilk genel yapay zekâ görseli reddedilip proje dosyasından kaldırıldı. Son kapak `assets/rockimals-blog/rockimals-free-vs-plus/cover-official.jpg`, 1200×630 JPEG; oyunun kendi `assets/animals/transparent/tiger.webp` (Kito) ve `whale.webp` (Enoli) varlıklarından, [editoryal kapak üreticisi](../../../scripts/render-rockimals-blog-editorial-assets.swift) `--free-plus-cover-only` seçeneğiyle üretildi. Kaynaklar okuma anında Rockimals depo commit'i `dc5f0412e6a7f2bbaf6d04f269615591fc3da315` altındaydı. Kaplan SHA-256 `56b9d20181053be12bd411686294a5d4365ddd0c92cc277cd91cc2120d2f5be1`; balina `e6e2a147b8229d8baf1c42b7d64e3c2d8776227fbc78793d10fb0505457f9a5c`; çıktı `7dc8b8536e9c15770f8cc7e6915b55ec958df1cde5b0df0e44a7fcd8f40dc9fd`. Kapak gerçek ekran veya Plus'a özgü bir hayvan olarak sunulmaz.

## Yayın ve takip kontrolleri

- Kullanıcı sekiz dil metni ve resmî karakterlerden oluşan kapağı 19 Ekim'de onayladı. Bağımsız ana dil editörü incelemesi yapılmış gibi gösterilmez.
- Tamamlanan taslak kontrolü (19 Ekim 2026): sekiz özel önizlemede dil/H1, kapak yüklenmesi ve dil geçişi hedefleri incelendi; 375 piksel mobil görünümde CJK/FR/DE dâhil yatay taşma yok. Yazıların 26 benzersiz dış bağlantısı HTTP 200 döndü. Taslak aşamasındaki `npm test` geçti; o derleme beş yayımlanmış konu ve 40 makale içeriyordu. Bağımsız yerel dil okuması ayrıca yapılabilir.
- Yayın öncesi mağaza kontrolünde iTunes GB kaydı iOS `1.5.0` ve ücretsiz indirmeyi, Google Play GB sayfası ise hâlâ 25 Eylül 2026 güncellemesini gösterdi. Android sürümü hakkında kesin iddia eklenmedi; fiyat bölge bağımsız bırakıldı.
- Son `npm test`, manifest, sitemap, sekiz canlı URL, canonical, dil geçişi ve Netlify üretim dağıtımı bu yayın commit'i için tekrar doğrulanmalıdır. Eski taslak derlemesindeki beş konu/40 makale sonucu yeni derlemenin yerine geçmez.
