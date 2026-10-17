# Rockimals 1.5.0 web sitesi güncellemesi

**Type:** Content and visual maintenance
**Priority:** P1; yanlış erişim ve veri işleme açıklamalarının düzeltilmesi ilk iş.
**Status:** Web güncellemesi uygulandı ve doğrulandı; üretim yayını bekliyor.
**İnceleme tarihi:** 17 Ekim 2026
**Kapsam:** Rockimals açılış sayfaları, ürün rehberleri, destek, gizlilik ve DuniaOps ürün kartı.

Rockimals 1.5.0 ile web sitesi arasında hem görsel hem içerik farkı var. Sekiz dildeki açılış sayfaları hâlâ 1.3.0 ekranlarını kullanıyor; ücretsiz bölüm hakları ve Dünya Kalkanı süresi de eski. Yenilenen ekranlarla birlikte Türkçe/İngilizce sesli anlatım, günlük ilerleme ve Plus açıklamaları güncellenmeli.

Bu iş yalnızca bir ekran görüntüsü değişimi olarak kapatılmamalı. Önce ürün bilgileri düzeltilmeli, ardından güncel ekranlar aynı dildeki sayfalara yerleştirilmeli ve ilgili rehberler yeniden incelenmeli.

## Doğrulanan sürüm ve kaynaklar

- DuniaOps `main`: `a7f3d7479e430226fad019faa3ef89453d302880`. Rockimals yayın dalı `main`: `7680a7d2d6f7408852da592f9a63f76dce7a13d4`. Her iki uzak `main` başı `git ls-remote` ile yerel kayıtlarla eşleştirildi.
- [Apple herkese açık ürün kaydı](https://itunes.apple.com/lookup?id=6792505608&country=gb), iOS **1.5.0** sürümünü, **17 Ekim 2026 16.36 UTC** yayın zamanını ve **iOS 15.0** gereksinimini döndürdü. Açıklama yeni ücretsiz hakları ve EN/TR anlatımı içeriyor.
- [Google Play herkese açık kaydı](https://play.google.com/store/apps/details?id=com.duniaops.rockimals&hl=en_GB&gl=GB) erişilebilir; inceleme sırasında 25 Eylül güncellemesini ve eski yenilik metnini gösterdi. [Android gönderim kaydı](../../rockimals/store/play/1.5.0/RELEASE.md) 16 Ekim'de 1.5.0'ın incelemeye gönderildiğini kaydediyor. Android 1.5.0'ın herkese açılması ayrıca doğrulanmalı; iOS doğrulaması iki platformun aynı anda güncellendiği anlamına gelmez.
- Sekiz açılış URL'sinin tamamı HTTP 200 döndürdü. Her dilde altı farklı `rockimals-preview` görseli ve `?v=20260919` önbellek anahtarı var. Canlı Türkçe Radar dosyasının SHA-256 değeri repodaki eski dosyayla eşleşti.
- Rockimals'taki `7266569` ekran yenilemelerini, `a708525` son yedi karelik sesli hikâye paketini ekliyor. [Son görsel teslim kaydı](../../rockimals/docs/STORE_SCREENSHOT_REFRESH_2026_10_16.md) hangi karelerin yenilendiğini ve hangilerinin korunduğunu açıklıyor. Navigasyon için `ebb45c8`, hayvan tanıtımı için `7f493af` ilgili uygulama değişiklikleri.
- Rockimals çalışma ağacında başka bir test çalışması var. Bu inceleme uygulama deposunu değiştirmedi; yayın kaynakları ve mevcut görseller okundu.

## Güncellenecek sayfalar ve içerikler

| Öncelik | Alan | Mevcut durum | Yapılacak iş |
| --- | --- | --- | --- |
| P0 | Açılış sayfası Plus bölümü ve SSS | “Günde bir yeni hikâye her zaman ücretsiz”; Plus için günlük tüm hikâyeler anlatımı | Toplam **10 ücretsiz bölüm**, günde en fazla **3 yeni ücretsiz bölüm**, açılmış ücretsiz bölümleri yeniden okuma ve bütün planlarda hayvan başına günde en fazla **1 yeni bölüm** kuralını açıkla. Mevcut bölüm bitirilmeli ve kahraman sonraki uygun günde Radar'da yeniden bulunmalı. |
| P0 | Gizlilik sayfası | iOS 1.4.0'dan itibaren satın alma bilgisinin “yalnızca Apple'a” gönderildiği yazıyor | 1.5.0 sesli içerik indirme hizmetine iletilen satın alma kanıtları ve kurulum/erişim verileriyle açıklamayı eşleştir. Yeni kayıtların saklama ve silme kapsamını uygulamadan doğrula. |
| P1 | Açılış sayfası görselleri | Altı ekran × sekiz dil = **48 eski dosya**; aynı Radar üst bölümde, okuyucu ve kitaplık hikâye bölümünde tekrar kullanılıyor | Aşağıdaki ekran eşlemesine göre yenile. Görselin alt metni, açıklaması, oranı ve önbellek anahtarı birlikte değişmeli. |
| P1 | Sesli anlatım tanıtımı | Açılış sayfasında anlatım özelliği açıklanmıyor | Hikâye bölümünde oku/dinle akışını ve gerçek oynatma kontrolünü göster. **Arayüz sekiz dilde; sesli anlatım Türkçe ve İngilizce.** Plus kapsamını ve ücretsiz sesli bölüm hakkını ayrı açıkla. |
| P1 | Üç ürün rehberi | Başlangıç, hikâye açma ve ebeveyn rehberleri eski hakları anlatıyor | Üç konu × sekiz dil = **24 makaleyi** yeniden incele. Başlangıç ve ebeveyn rehberindeki bir dakikalık Dünya Kalkanı bilgisini **üç dakika** olarak düzelt. Güncel ekran adları, günlük ilerleme, ses indirme ve erişim açıklamalarını eşleştir. |
| P1 | Destek | Hikâye desteği yalnızca bağlantı/dil/gün kontrolünü anlatıyor | “Sonraki bölüm neden açılmıyor?”, “Sesli anlatım nasıl indirilir?”, desteklenen ses dilleri, ücretsiz metin/ses haklarının ayrılığı, çevrimdışı kullanım ve satın alma geri yükleme konularını ekle. |
| P1 | Ürün kaynakları ve görsel denetleyicisi | Referans JSON ve denetleyici 1.3.0'a sabitlenmiş | Yeni kanıtları, sürüm/platform ayrımını, dosya kökenlerini, ölçüleri ve hash değerlerini güncelle. Eski sürüme zorlayan kontrolleri anlamlı güncel kontrollerle değiştir. |
| P2 | Asteroit rehberi | Bilim içeriği geçerli; uygulama örneği ve kaynak notları 1.3.0'a dayanıyor | Sekiz dildeki uygulama bölümünü yeni hayvan tanıtımına göre kontrol et; bilim metnini sırf sürüm değişti diye yeniden yazma. |
| P2 | SEO ve ürün kartı | Yapılandırılmış veri iOS 13.0; hedef yaş 6–12; katalog kartında “Google Play in review” var | iOS gereksinimini **15.0**, hedef yaş anlatımını güncel mağazadaki **6–8** ile eşleştir. Ürün kartındaki eski Android erişim durumunu düzelt; Android sürümünün yayın durumunu ayrıca belirt. Sesli anlatım için başlık/açıklama ihtiyacını değerlendir. |

### Değişikliklerin kaynak dosyaları

- Açılış metinleri: [content/rockimals-landing/locales.json](../content/rockimals-landing/locales.json), özellikle `heroLead`, `storyCard2Text`, `storyCard3Text`, `plusText`, `plusNote`, `faq1A`, `faq2A`, `languagesText`, `trust3` ve ekran açıklamaları.
- Açılış üretimi: [scripts/build-rockimals-landing.mjs](../scripts/build-rockimals-landing.mjs). [products/rockimals.html](../products/rockimals.html) üretilmiş İngilizce kaynaktır; yalnızca bu HTML'yi elle değiştirmek diğer yedi dili güncellemez.
- Rehberler: [başlangıç](../content/rockimals-blog/rockimals-getting-started/tr.md), [hikâye açma](../content/rockimals-blog/rockimals-unlock-stories/tr.md), [ebeveyn kontrolü](../content/rockimals-blog/rockimals-parent-controls/tr.md), [asteroit nedir](../content/rockimals-blog/what-is-an-asteroid-for-kids/tr.md) ve her konunun diğer yedi dil dosyası.
- Yardım ve veri açıklamaları: [rockimals/support.html](../rockimals/support.html), [rockimals/privacy-policy.html](../rockimals/privacy-policy.html); her dosyada sekiz dil paneli var.
- Katalog: [products.html](../products.html). “Google Play in review” uygulamanın genel erişimini eski gösteriyor; herkese açık Google Play kaydı zaten erişilebilir.
- Kaynak kayıtları: [product-reference.json](../content/rockimals-blog/_editorial/product-reference.json), [asset-manifest.json](../content/rockimals-blog/_editorial/asset-manifest.json), ilgili editoryal brief'ler ve [check-rockimals-blog-editorial-assets.mjs](../scripts/check-rockimals-blog-editorial-assets.mjs).

Gizlilik bulgusunun somut teknik kaynağı [story_audio_remote_urls.dart](../../rockimals/lib/features/stories/story_audio_remote_urls.dart): indirme isteğinde `apple_proofs`, `narration_installation_id`, `starter_chapter_ids` ve kurulum yetkilendirmesi hizmete gönderiliyor. [Apple doğrulama kaydı](../../rockimals/docs/APPLE_IAP_CONFIGURATION_2026_10_13.md) sunucunun Apple işlem/abonelik durumunu ayrıca sorguladığını doğruluyor. Bu nedenle mevcut “yalnızca Apple” cümlesi yeni akışı kapsamıyor; düzeltmenin kapsamı gerçek veri akışına dayanmalı.

## Görsel eşleme ve eksikler

Web'deki mevcut dosya kökü `assets/products/rockimals-preview/<dil>/`. Yeni ham ekranların kökü Rockimals deposundaki `artifacts/store-captures/1.5.0/<dil>/iphone-6.9/`. Bu ham dosyalar yerelde mevcut fakat Git tarafından yok sayılıyor; sonraki çalışmanın yalnızca temiz bir repo klonuna dayanması yeterli olmaz. Kullanılan kaynaklar ve dönüştürülmüş web çıktıları izlenebilir biçimde saklanmalı.

| Web dosyası | Görsel karşılaştırma | Yeni kaynak ve durum |
| --- | --- | --- |
| `01-radar-home.jpg` | Arka plan, Dünya görünümü, yardım düğmesi ve cam alt navigasyon farklı. Türkçe eski “Evim” sekmesi yeni ekranda “Hayvanlarım”. | `radar.png`; sekiz uygulama dilinde iPhone ve iPad kaynakları mevcut. Üst bölüm ve galeri birlikte değişir. |
| `02-hero-chapter-reader.jpg` | Yeni okuyucuda ses indirme/oynatma kontrolü ve güncel hikâye çizimleri var. | `reader.png`; sekiz dilde mevcut. Oynatıcıyı göstermek için aşağıdaki sesli ekran ayrıca kullanılabilir. |
| `03-story-library.jpg` | Eski liste yerine büyük kartlı, uzay arka planlı koleksiyon ve Plus girişli düzen var. | `en/iphone-6.9/library-reference.png` mevcut. Diğer yedi dil için güncel kitaplık çekimleri bu kaynak klasöründe yok. |
| `04-meet-card.jpg` | Eski ortalanmış hayvan ve metin kutusu yerine “Ben Bobo!”, görselli boyut karşılaştırması ve uzay bilgisi düzeni var. | `meet-elephant.png`; sekiz dilde mevcut. Başlık ve alt metin eski Kito içeriğini anlatmamalı. |
| `05-earth-shield.jpg` | Son mağaza paketindeki oyun karesi yeniden çekilmemiş. | Manifestte 1.4.0'dan korunmuş olarak kayıtlı. Güncel 1.5.0 ekranıyla karşılaştır, gerekiyorsa yeniden çek; klasör adı tek başına güncellik kanıtı değil. |
| `06-my-space-zoo.jpg` | İngilizce güncel referansta cam navigasyon ve içerik yerleşimi eski web görüntüsünden farklı. | `en/iphone-6.9/zoo.png` yerelde mevcut. Son mağaza paketinin koleksiyon karesi ise 1.4.0'dan korunmuş; güncel referansla karıştırılmamalı. Diğer diller tamamlanmalı. |
| Yeni sesli anlatım görseli | Gerçek hikâye sayfası ve dairesel oynatma kontrolü özelliği açıkça gösteriyor. | `artifacts/store-captures/1.5.0-seven/{en,tr}/{iphone-6.9,ipad-13}/audio-reader.png`. İki dilde ve iki cihaz boyutunda mevcut. |

Yerelleştirme eşlemesi: web `en` → mağaza `en-GB`, web `zh-Hans` → ham çekim `zh`; diğer web dilleri `tr`, `ja`, `ko`, `fr`, `de`, `es`. App Store paketindeki on mağaza yerel ayarı, web için on dil gerektirmez.

Commit edilmiş son mağaza seti [screenshots-v2](../../rockimals/store/app-store/1.5.0/screenshots-v2/tr/iphone-6.9/MANIFEST.json) altındadır: konsept, okuyucu, sesli hikâye, tanışma, Radar, Dünya Kalkanı ve koleksiyon. `screenshots/` altındaki önceki altılı set ile karıştırılmamalı. `variants/` kullanılmamış alternatiftir. Sesli kare dışındaki eski altılı şablonu veya reddedilen videoları web için güncel ana kaynak seçme.

Mağaza görselleri başlık ve çerçeve içeriyor. Web'deki mevcut yalın ekran yerleşimine uygun kaynak, mümkün olduğunda ham uygulama çekimidir. 1320×2868 mağaza kartını doğrudan 828×1800 ham ekran yerine koymak başlıkları iki kez göstermeye yol açabilir. Yeni dosyaları web için sıkıştır; gerçek ölçülerini ve oranlarını HTML/CSS ile eşleştir.

EN/TR dışındaki mağaza sesli kartları İngilizce uygulama ekranını kullanıyor ve sesin EN/TR olduğunu söylüyor. Web'de bunları o dilde sesli anlatım varmış gibi sunma. Mevcut “her uygulama görüntüsü seçtiğiniz dili izler” metni de bu istisna eklenirse yeniden düzenlenmeli. Sesli anlatımı mevcut okuyucu alanında göstermek veya ayrı bir özellik alanı eklemek mümkün; galeri yedi kareye çıkarsa altı sütun varsayımına bağlı CSS ve test de değişmeli.

## Ürün anlatımında korunacak ayrımlar

- **Sekiz kahraman ve kırk bölüm** güncel mağaza açıklamasında hâlâ doğru. Bunu kırk ayrı hikâye olarak değiştirme; gelecekteki içerik artışını garantili takvim gibi sunma.
- **Ücretsiz metin hakkı ve ücretsiz ses hakkı ayrı.** Metin için toplam on bölüm ve günlük üç yeni bölüm sınırı var. [Yeni kurulum başına bir sesli bölüm](../../rockimals/docs/FREE_NARRATION_PER_INSTALL_2026_10_16.md) ayrı sözleşme; “her gün ücretsiz ses” veya “on ücretsiz sesli bölüm” denmemeli. Bu ses hakkı repo/sürüm kaynaklarıyla doğrulandı; Apple'ın herkese açık açıklaması bunu ayrıca saymıyor.
- Plus, etkin olduğu sürece yayımlanmış hikâye kütüphanesini ve hazır EN/TR anlatımları kapsıyor. Günlük hayvan başına ilerleme kuralı Plus'ta da geçerli. Kitaplık, keşfedilmemiş gelecek bölümleri erkenden açma yolu gibi anlatılmamalı.
- Çevrimdışı açıklama, ilk bölümler ve indirilmiş içerikle sınırlı kalmalı; canlı gökyüzü ve henüz indirilmemiş medya için bağlantı gerekir. Abonelik içeriğini, kazanılmış ücretsiz bölümlerle aynı kalıcı sahiplik vaadi altında toplama.
- Kaynaklarda bulunan koleksiyon/permanent erişim hazırlıkları, herkese açık yeni bir satın alma seçeneği olarak ayrıca doğrulanmadan tanıtılmamalı.
- Güncel mağazanın hedef yaşı 6–8; mağaza yaş derecelendirmesi bunun yerine kullanılmamalı.

## Zorunlu yeniden tasarım gerektirmeyen alanlar

`/today` sayfası uygulama ekran görüntülerinden bağımsız ziyaretçi verisi ve kahraman döngülerini kullanıyor. Sırf uygulama navigasyonu yenilendi diye yeniden tasarlanması gerekmiyor; ortak metin, mağaza bağlantısı ve kahraman eşleşmesi kontrolü yeterli.

Blog kapakları, ürün kartı illüstrasyonu, OG görseli ve kahraman döngüleri uygulama ekranı değil. Değişiklik zorunluluğu ayrı görsel/marka karşılaştırmasına bağlı; eski dosya tarihi tek başına yenileme gerekçesi değil. İstenirse sesli anlatım mesajı için sosyal paylaşım görseli ikinci aşamada yenilenebilir.

Mevcut beş blog konusu toplam **40 yerel makale** oluşturuyor. Dört konunun **32 makalesi** ürün metni veya sürüm notu açısından inceleme kapsamına giriyor; asteroit/meteor/kuyrukluyıldız konusunun sekiz makalesinde bu sürümlere bağlı anlatım yok. Üç ürün rehberinin 24 dosyası daha kapsamlı güncelleme gerektiriyor.

Yayın üreticisi blog makalelerine ekranlı deneyim modülünü şu anda vermiyor. Eski Radar görüntüsü [makale önizlemesinde](../scripts/preview-rockimals-blog-article.mjs) ve [taslak önizlemesinde](../scripts/preview-rockimals-blog-drafts.mjs) kullanılıyor. Bu yüzden “canlı 40 blog makalesinin tamamında eski ekran var” sonucu çıkarılmamalı; canlı blogdaki temel sorun eski ürün anlatımı, önizlemelerde ayrıca eski ekran kullanımıdır.

## Uygulama sırası ve kabul ölçütleri

### Ürün bilgileri ve destek

- [x] 1.5.0 ürün kaydını tarih, platform, kaynak ve sürümle güncelle; eski tarihli kanıtı yeni kontrol yapılmış gibi yeniden etiketleme. Android'in o andaki yayın durumunu ayrı doğrula.
- [x] Sekiz dilde açılış Plus/SSS, hedef yaş, çevrimdışı açıklaması ve sesli anlatım metinlerini güncelle.
- [x] Üç ürün rehberinin 24 dosyasını ve asteroit rehberinin sekiz uygulama örneğini incele. Yalnızca yeniden kontrol edilen içerikte `reviewedAppVersion`, gövde kaynak notları ve `updated` alanını değiştir; ilk `published` tarihini koru.
- [x] Destek ve gizlilik sayfalarını yeni akışlarla eşleştir; yeni veri kategorilerinin saklama/silme karşılığını doğrula. Bunu genel bir hukuki uygunluk sonucu olarak sunma.
- [x] Ürün kartındaki eski Google Play durumunu ve 6–12 yaş bilgisini, yapılandırılmış verideki iOS 13.0 ve hedef yaş alanlarını düzelt.

### Görseller ve üretim

- [x] Hazır Radar/okuyucu/tanışma kaynaklarını sekiz dilde web'e aktar; eksik kitaplık/koleksiyon/oyun çekimlerini tamamla veya doğrulanmış güncel alternatifle kapsamı açıkça belirle.
- [x] EN/TR sesli ekranı ve dil sınırını görünür biçimde ekle; sekiz dilde ses var izlenimi bırakma.
- [x] `asset-manifest.json` içindeki kaynak sürümü, commit, çıktı ölçüsü ve SHA-256 değerlerini gerçek dosyalarla eşleştir. Tarihsel kapak kaynaklarını gereksiz yere değiştirme.
- [x] Denetleyicideki sabit 1.3.0 ve 22 Eylül varsayımlarını güncel kanıt sözleşmesine taşı. Hash, dil, kaynak, boyut ve ürün iddiası kontrollerini koru.
- [x] `node scripts/build-rockimals-landing.mjs --write-source` ile İngilizce HTML'yi üret; tüm dilleri normal site derlemesinden al. Görsel URL'lerine yeni sürüm anahtarı/dosya adı ver ve önizlemelerdeki kullanımını da eşleştir.

### Doğrulama ve yayın

- [x] `npm run check:rockimals-blog`, `npm run check:rockimals-blog-editorial-assets`, galeri/makale kontrolleri ve son değişiklik için `npm test` geçmeli; gerekli kontroller atlanmamalı.
- [x] Sekiz dilin görüntü/metin eşleşmesini kontrol et. Dar telefon, masaüstü ve iPad genişliklerinde oran, okunabilirlik, taşma, dil değişimi ve mağaza bağlantılarını gözle doğrula.
- [x] Eski ücretsiz hak anlatımları etkin kaynaklarda kalmamalı. Tarihsel dokümanları topluca değiştirme; bilim yazılarını gereksiz ürün pazarlamasına dönüştürme.
- [ ] Commit, push ve yayın için o aşamadaki kullanıcı talebine göre ilerle. Yayın sonrası sekiz açılış URL'sini, güncellenen rehberleri, destek/gizlilik panellerini ve yeni görsel URL'lerini canlıdan doğrula.

## İnceleme sonucu

Kaynak incelemesi, eski/yeni ekranların görsel karşılaştırması, sekiz canlı açılış sayfasının HTTP kontrolü ve Apple sürüm kaydı doğrulaması tamamlandı. Uygulama çalıştırılmadı ve cihaz kabul testi yapılmadı. Web uygulaması aşağıda kayıtlıdır; mobil uygulama deposu değiştirilmedi.


## Uygulama kaydı — 17 Ekim 2026

- Sekiz dilde Radar, okuyucu ve tanışma ekranları güncellendi. Eski kitaplık/oyun/koleksiyon ekranları çıkarıldı; galeri üç güncel ekranla sınırlandı. EN/TR sesli okuyucu hikâye bölümüne eklendi. Toplam 26 sıkıştırılmış JPEG, 828×1800; kaynak ve çıktı hashleri `content/rockimals-landing/screenshots.json` içinde.
- Ücretsiz okuma, sesli deneme, Plus, günlük ilerleme, çevrimdışı erişim ve hedef yaş açıklamaları güncellendi. iOS 1.5.0 kanıtı ve Android sürüm ayrımı korundu. Hızın sabit hikâyeyi değiştirdiği yönündeki eski tanıtım kaldırıldı.
- Üç ürün rehberinin 24 dosyası ve asteroit rehberinin sekiz uygulama notu güncellendi; ilk yayın tarihleri korundu. Destek ve gizlilik sekiz dilde eşleştirildi. Önceki kaynak/asset snapshotları `docs/fixtures/rockimals-1.5.0/` altında saklandı.
- `npm test` başarılı: içerik, görsel hash/boyut/dil, galeri, blog, günlük ziyaretçi ve site denetimleri; 301 public dosyada bozuk iç bağlantı yok. CUA tarayıcısında 390 px genişlikte sekiz dil taşmasız; 820 px tablet ve 1280 px masaüstünde gerçek okuma/ses ekranları incelendi.
- Yerel `/today` derlemesi anahtar olmadan eski seed kullanır ve bunu eski olarak etiketler. Yayın Git CD ile, mevcut Netlify üretim ortamında oluşturulacak; canlı tarih ayrıca kontrol edilecek.

### Ayrı backend takibi: sesli deneme kayıtlarının silinmesi

Canlı veritabanının salt okunur şema denetiminde `rockimals_narration_trials.credential_digest` ilişkisinin `ON DELETE CASCADE` içermediği ve `rockimals_delete_installations(uuid[])` fonksiyonunun bu çocuk kayıtlarını silmediği doğrulandı. Sesli deneme kullanmış kurulumların manuel/otomatik silinmesi yabancı anahtar nedeniyle engellenebilir. Herhangi bir kullanıcı kaydı okunmadı veya silinmedi.

Bu web değişikliği saklama politikasını ve yeni veri kategorilerini açıklar; doğrulanmış otomatik silme garantisi vermez. Mevcut 13 aylık saklama yükümlülüğü devam eder. Backend düzeltmesi için ayrıca kullanıcıya soruldu; yanıt gelmeden uygulama reposu veya üretim veritabanı değiştirilmez. Bu teknik takip, web yayını kapatıldığında da açık kalır; silme işleyişi düzeltilmiş sayılmamalıdır.
