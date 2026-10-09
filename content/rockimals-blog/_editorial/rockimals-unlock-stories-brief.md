# Konu 04 brief — Rockimals hikâyeleri nasıl açılır?

- **Durum:** Sekiz dilin yayını 9 Ekim 2026'da kullanıcı tarafından onaylandı; içerik dosyalarında aynı yayın zamanı ve draft: false kullanılır. Canlı dağıtım ayrıca doğrulanmalıdır.
- **Hazırlık ve kaynak inceleme tarihi:** 9 Ekim 2026
- **Haftalık sıra:** Hafta 4, konu 04; ilk hedef 12 Ekim 2026 Pazartesi idi. Kullanıcı, bu hafta 5 Ekim'de konu 28 yayımlanmış olmasına rağmen, 9 Ekim'de konu 04'ün hemen yayını için açıkça tek seferlik istisna onayı verdi.
- **Translation key / kategori:** rockimals-unlock-stories / stories-activities
- **Okuyucu:** Hikâye ilerlemesini anlamak isteyen ebeveyn ve çocukla birlikte okuyan yetişkin.
- **Tek soru:** İlk ve sonraki bölümler nasıl açılır; günlük ücretsiz erişim ile açılmış bölümleri yeniden okuma nasıl ayrılır?
- **Kısa cevap:** Radar'da ziyaret eden bir hayvan arkadaşına dokunup uygun bölüme geç. Açılan bölüm Hikâye kitaplığında kalır. Ücretsiz kural günde bir **yeni** bölümdür; sabit katalog her gün yeniden yazılmaz.

## Ürün, kaynak ve iddia sınırları

1. [Birleşik Krallık App Store kaydı](https://apps.apple.com/gb/app/rockimals-kids-space-stories/id6792505608) 9 Ekim'de incelendi: iOS 1.4.0; sekiz kahraman × beş bölüm, Radar'da bir kahramanı yakalayıp bölüm açma, açılan bölümün kitaplıkta kalması, ücretsiz günde bir yeni hikâye, isteğe bağlı Plus ile o günkü her yeni kahraman hikâyesi. İlk bölümler uygulamayla gelir; sonraki bölüm gerektiğinde indirilir ve indirildikten sonra çevrimdışı okunur. Çevrimdışı örnek gökyüzü canlı günlük veri diye tanıtılmaz.
2. Oyun deposundaki sekiz dilin lib/l10n/app_*.arb Radar öğreticisi ve kitaplık metinleri 9 Ekim'de kontrol edildi. 1.4.0+39 ve 1.4.0+50 sürüm hazırlığı commit'lerinde İngilizce yönergeler aynı: açık bölümü bitir, aynı kahramanla başka bir gün yeniden buluş; aynı gün tekrar dokunmak aynı bölümü açar. Sekiz dilin güncel ARB karşılıkları da incelendi. **Canlı App Store ikilisi elde oynanmadı; bu bir sürüm-kaynağı doğrulamasıdır, cihaz testi değildir.** Mağaza kaydı günlük erişim ve bölüm-kütüphane ana akışını ayrıca destekliyor. Kullanıcı bu kaynak düzeyiyle yayına onay verdi.
3. [Ürün referansındaki](./product-reference.json) 22 Eylül tarihli anlık kayıt ve canlı mağaza sürümü 1.3.0 tarihsel bilgidir; bu makalede sürüm kanıtı olarak kullanılmaz. Android'in kamuya açık Google Play kaydı 7 Ekim'de [resmî paket sayfasında](https://play.google.com/store/apps/details?id=com.duniaops.rockimals) doğrulandı; tüm ülke/cihazlarda bulunacağı söylenmez.
4. Fiyat, her kahramanın her gün görünmesi, sınırsız çevrimdışı canlı veri, NASA onayı veya yapay zekânın günlük yeni hikâye üretmesi iddia edilmez. Kahraman ve hikâye kurgudur; nesne kimliği ve seçili ölçümler uzay verisidir.

## Sekiz dil ve terim kararı

Arama niyeti marka + “hikâye/bölüm açma” sorusudur. Slug'lar yerelleştirilmiş ASCII adreslerdir; arama hacmi veya sıralama başarısı ölçülmedi ve vaat edilmiyor. Terimler oyun ARB kaynağı ve mevcut localizedTerms ile karşılaştırıldı.

| Dil | Taslak başlık niyeti | Uygulama terimi |
| --- | --- | --- |
| en | how to unlock Rockimals stories | Radar / Story library |
| tr | Rockimals hikâyeleri nasıl açılır | Radar / Hikâye kitaplığı |
| ja | Rockimalsのお話を開くには | レーダー / おはなしライブラリー |
| ko | Rockimals 이야기는 어떻게 열까요 | 레이더 / 이야기 도서관 |
| zh-Hans | 如何解锁 Rockimals 故事 | 雷达 / 故事图书馆 |
| fr | débloquer les histoires de Rockimals | Radar / Bibliothèque d’histoires |
| de | Rockimals-Geschichten freischalten | Radar / Geschichtenbibliothek |
| es | desbloquear historias en Rockimals | Radar / Biblioteca de historias |

Çince kitaplık teriminde eski ürün referansı ile güncel oyun metni farklıydı; yazıda güncel ARB karşılığı olan 故事图书馆 kullanıldı. Tasarım ve kaynak denetimi ana anlamı karşılaştırır; **bağımsız ana dili editörü incelemesi yapılmadı**. Kullanıcı sekiz dilli önizlemeyi yayın için uygun buldu; bu onay bağımsız ana dili incelemesi diye kaydedilmez. CJK satır kırılımı ve yerel anlatım ileride ayrıca iyileştirilebilir.

## Görsel, bağlantı ve yayın öncesi kapılar

- Ortak kapak: /assets/rockimals-blog/rockimals-unlock-stories/cover.jpg, 1200×630. Gerçek Niko/Tavi karakter varlıkları etrafında çizilmiş, metinsiz açık kitap kompozisyonu; bir uygulama ekranı değildir. Kaynak hash'leri ve üretim komutu [varlık manifesti](./asset-manifest.json) ile scripts/render-rockimals-blog-editorial-assets.swift içindedir. Sekiz imageAlt bunu açıkça belirtir.
- Plandaki “Kütüphane + okuyucu” gerçek ekran çiftinin mevcut site görüntüleri 1.3.0 tarihli olduğundan 1.4.0 ekranı gibi gösterilmedi. Kullanıcı, ortak editoryal kapaklı önizlemeyi yayın için uygun buldu. Güncel sekiz dilli ekranlar gelecekte eklenebilir; sahte veya yanlış sürümlü ekran eklenmez.
- Aynı dilde yayımlanmış konu 01 relatedPosts olarak bağlandı. Mağaza CTA'sı mevcut şablonun App Store ve Google Play rozetleriyle çalışır; uygulama içine doğrulanmamış deep link eklenmedi.
- Sekiz kaynak dosyanın frontmatter, paket bütünlüğü, varlık hash'i, özel önizleme, canlı derleme/sitemap ve sekiz URL kontrolü yayın işinde doğrulanır. Canlı uygulamada el ile bölüm akışı ve bağımsız dil redaksiyonu yapılmadı; bunlar yapılmış gibi raporlanmaz. Sonraki ürün sürümü akışı değiştirirse sekiz yazı birlikte güncellenmelidir.
