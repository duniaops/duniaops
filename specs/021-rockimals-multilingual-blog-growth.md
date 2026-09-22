# Rockimals için sekiz dilde haftalık blog ve organik edinim akışını kur

**Type:** Epic
**Priority:** P2 — organik edinimi ve ürün kullanımını destekleyen planlı çalışma; acil olay veya sabit teslim tarihi belirtilmedi. Projede önceliklerin ortak tanımı bulunmadığından EE Clarify P2 varsayılanı kullanıldı.
**Risk:** Medium — çok dilli yönlendirme, ürün doğruluğu, mevcut site üretimi ve ölçüm birbiriyle bağlantılı; içerik ve şablon değişiklikleri geri döndürülebilir.
**Status:** Broken down into specs 022–034 — implementation not started
**Prepared:** 2026-09-22
**Source:** [52 konuluk blog ve yayın planı](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [13 alt spec, bağımlılıklar ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Problem / Opportunity

Rockimals'ın mevcut ürün sayfası oyunu tanıtıyor; ancak ailelerin ve öğretmenlerin asteroitler, çocuklara uygun uzay oyunları ve Rockimals kullanımı hakkında aradığı soruları ayrı içeriklerle karşılayan, sekiz dilde çalışan bir blog henüz yok.

Bu nedenle markayı bilmeyen ilgili okuyuculara ulaşmak, indirme öncesi soruları cevaplamak ve mevcut oyuncuyu belirli bir oyun ya da hikâyeye yönlendirmek için sürdürülebilir bir içerik yolu eksik. Mevcut DuniaOps blog üreticisi danışmanlık hizmetlerinin kategorilerine, tasarımına, canonical alan adına ve satış çağrılarına göre yapılandırılmış; Rockimals içerikleri bu akışa doğrudan eklenemez.

Birincil okuyucu indirme kararını veren ebeveyn veya öğretmen; ikincil kullanıcı çocukla birlikte okuyan aile ve oyunu zaten kullanan oyuncudur. Tetikleyici, arama sonucundan bir sorunun cevabına gelmek veya ürün sitesinden rehber açmaktır. İstenen sonuç, sorunun cevaplanması ve uygun okuyucunun mağazaya ya da oyundaki ilgili etkinliğe geçmesidir.

Başarı; kullanışlı içerik, doğru dil/ürün deneyimi ve gözlemlenebilir edinim sinyalleriyle değerlendirilir. Yayın adedi, Google indekslemesi, sıralama, indirme ve kullanım ayrı ölçülerdir. Belirli trafik, sıralama, öğrenme kazanımı veya indirme artışı vaat edilmez.

## Proposed Solution

`https://rockimals.duniaops.com/` altında mevcut ürün tasarımını sürdüren statik, çok dilli blog indeksi ve yazı şablonu oluştur. Her hafta **bir özgün konuyu sekiz dilde** sunan editoryal akış kur:

`en`, `tr`, `ja`, `ko`, `zh-Hans`, `fr`, `de`, `es`.

Bir konu, ortak kimlikle eşlenen sekiz yerelleştirilmiş yazıdan oluşur. Haftalık miktar sekiz farklı konu değildir. Kaynak plandaki 52 konu yıllık aday havuzdur; tamamı yayımlanırsa 416 yazı sayfası oluşur. Sıra, arama niyeti ve performans verisiyle değişebilir; zayıf veya tekrar eden içerik sırf kotayı doldurmak için üretilmez.

İlk teslimat; blog altyapısı, ilk üç konu için 24 yayına hazır dil sürümü, repo görselleri, ölçüm sözleşmesi ve haftalık yayın kaydıdır. Başlangıç paketi topluca üç haftalık içeriği yayımlamak için değil, haftada bir konu temposuna tampon sağlamak içindir.

Her yazının akışı: **soruya doğrudan cevap → özgün açıklama/örnek → ilgili Rockimals deneyimi → ebeveyne yönelik mağaza çağrısı veya mevcut oyuncu için kullanım adımı**.

## Scope

### MVP — ürün blogu altyapısı

- İngilizce indeks `/blog`, yazı `/blog/{slug}`; diğer dillerde `/{locale}/blog` ve `/{locale}/blog/{slug}` yolları kullanılır. Mevcut ürün ana sayfası dil yolları korunur.
- Her dil için başlangıç HTML'si üretilir; asıl içerik ve taranabilir bağlantılar JavaScript çalışmasına bağlı olmaz.
- Ortak `translationKey`, dil seçimini aynı yazının karşılığına bağlar. Dil veya tarayıcı ayarı okuyucuyu zorla başka URL'ye yönlendirmez.
- Her yazı kendine canonical verir; sekiz sürüm karşılıklı `hreflang`, kendine ait dil girdisi ve İngilizce sürüme giden `x-default` sunar. Yalnızca yayımlanmış karşılıklar listelenir.
- Rockimals hostuna ait robots ve sitemap yanıtları, blog indeksleri, makale bağlantıları ve sayfa metaverisi üretilir. Sitemap gerçek yayın URL'lerini içerir.
- Blog, Rockimals navigasyonundan erişilir. İndeks dört kullanıcı kategorisi sunar: Oyunu Keşfet, Uzayı Öğren, Aile Rehberi, Hikâyeler ve Etkinlikler; adlar yerelleştirilir. Başlangıçta boş filtreler sunulmaz.
- Dil başına açıklayıcı başlık, açıklama, `html lang`, sosyal paylaşım görseli/metni ve görünür içerikle tutarlı `BlogPosting`/`Article`, `BreadcrumbList` verisi hazırlanır.
- Mevcut DuniaOps kurumsal blogunun URL'leri, kategorileri, CTA'ları, feed'i ve diğer ürün sayfaları mevcut davranışını korur. Rockimals yazıları hizmet danışmanlığı satış kartlarına karışmaz.
- Bilinmeyen blog slug'ı veya geçersiz dil, yanlış bir yazıyı HTTP 200 ile göstermemeli. Tek bir canonical yol uygulanır; varsa alternatif yol biçimleri ona yönlenir.

Uygulama başlangıç noktası: `content/rockimals-blog/<translation-key>/<locale>.md`, `assets/rockimals-blog/<translation-key>/`, Rockimals'a özel üretici ve stil katmanı. Bu yollar öneridir; mevcut üretim düzenini koruyan eşdeğer bir yapı gerekçesiyle seçilebilir.

İçerik sözleşmesi en az şu alanları kapsar: ortak konu kimliği, dil, slug, başlık, açıklama, kategori, yayın/güncelleme tarihi, draft durumu, görsel/alt metin, yazar, ilgili yazılar, CTA ve ürün rehberlerinde doğrulanan uygulama sürümü. İlk durum taslaktır; yayın durumu sekiz dilin hazır oluşuyla birlikte değerlendirilir.

Üretici `npm run build:site` akışına bağlanır. Taslaklar, henüz zamanı gelmeyen içerikler ve kaynak belgeler genel indekslerde, sitemap'te, ilgili yazılarda veya yayınlanan `dist/` çıktısında bulunmaz. Yeniden derlemede artık yayımlanmayan Rockimals yazılarının eski çıktıları kalmaz; temizlik yalnızca üreticinin kendi çıktı alanıyla sınırlanır. Zaman geldiğinde yeni build/deploy gerekir; bir tarih alanı tek başına zamanlanmış yayın değildir.

### MVP — tasarım ve görseller

- Kaynak tasarım `css/rockimals-landing.css` ve mevcut ürün sayfasıdır: gece laciverti `#07101d`, turuncu `#ff6a2a`, sıcak altın `#ffb262`, krem `#fff8ed`, yuvarlatılmış kartlar ve hafif uzay dokusu.
- Fredoka başlıklar, Inter gövde ve Japonca/Korece/Çince karakterleri eksiksiz gösteren uygun yedek yazı tipleri kullanılır. Uzun metin okunabilir bir sütunda sunulur.
- Yazı şablonu kısa cevap, konu görseli, gerektiğinde içindekiler, örnekler, ürün bağlantısı, kaynaklar ve aynı dilde ilgili yazıları kapsar. Henüz yayımlanmamış içeriklere bağlantı verilmez.
- 390 px mobil, 768 px tablet ve 1440 px masaüstü genişliklerinde metin, kartlar, tablolar, dil menüsü ve mağaza çağrıları kullanılabilir olur. Kontroller klavyeyle erişilebilir; odak görünürdür. Ekran genişliğini aşan sayfa taşması oluşmaz.
- Oyun reposu görsel kaynağı olarak okunur: `/Users/uylas/Documents/DuniaOps/Projects/rockimals`. Karakterler `assets/animals/`; güncel hikâye sahneleri `assets/testflight_catalog/catalog.json` eşlemesiyle seçilir. Site reposundaki `assets/products/rockimals-preview/{locale}/` ekranları kullanılabilir.
- Her konu için ilgili bir kapak seçimi/kompozisyonu hazırlanır; sekiz dil aynı metinsiz kapağı paylaşabilir. Paylaşım kapağı 1200×630; portre ekranlar ve hikâye sanatı oranı bozulmadan, anlamlı sahneleri kesilmeden gösterilir.
- Kaynak oyun görselleri değiştirilmez; web kopyaları siteye alınır. Görsel kaydı konu, kaynak yol/sürüm, sahne, dil, çıktı ve alt metni içerir. Kullanıcıya dönük ekran metinleri yazının diliyle eşleşir.

### MVP — ilk yayın paketi ve editoryal doğruluk

İlk üç konu, kaynak planın kimlikleri korunarak hazırlanır:

| Yayın sırası | Konu ID | Konu | Niyet ve sonraki adım |
| --- | --- | --- | --- |
| 1 | 01 | Rockimals nasıl oynanır? İlk ziyaretçinle tanış | Ürünü tanıma; Radar'da bir ziyaretçi seçme |
| 2 | 15 | Asteroit nedir? Çocuklar için başlangıç rehberi | Bilim sorusu; gerçek ziyaretçinin bilgi kartına geçiş |
| 3 | 28 | Rockimals'ta reklam, hesap ve ebeveyn kontrolü | Ebeveynin indirme kararını destekleme |

Her konu için bir ana brief ve sekiz yerelleştirilmiş metin hazırlanır. Brief; okuyucu, tek ana soru, dil/pazar için anahtar kelime adayı, farklı arama niyeti, kaynaklar, ürün bağlantısı, görsel ve CTA'yı kaydeder. Hedef arama sonucunun uygunluğu her dil için kontrol edilir; ölçülmeyen hacim/zorluk sayıları yazılmaz.

Çeviri, yalnızca kelime değiştirme değildir: başlık, açıklama, örnek, alt metin, CTA ve oyun terimleri yerel dile uyarlanır. Anlam ve terminoloji incelemesinin durumu kaydedilir; tamamlanmamış inceleme “ana dil onaylı” diye sunulmaz. Eksik dil yerine İngilizce metin gösterilip yerel dil sayfası olarak yayımlanmaz.

Bilim, kurgusal kahramanlardan ayrılır; olgusal iddialar ilgili NASA/JPL gibi birincil kaynaklarla desteklenir. Rockimals NASA'nın resmî veya onayladığı oyunu olarak sunulmaz. İndirme ücretsizliği ile Plus erişimi, hedef yaş ile mağaza yaş derecelendirmesi, sabit hikâye kataloğu ile günlük açılma hakkı birbirinden ayrılır. Offline davranışı, veri/gizlilik ifadeleri, platform kullanılabilirliği ve ekranlar **yayımlanan uygulama sürümüne** göre kontrol edilir. Geliştirme reposundaki özellik, mağazada varmış gibi anlatılmaz.

İlk 13 haftanın sırası ve 52 konunun ayrıntıları kaynak planda tutulur; bu spec içinde ikinci bir bağımsız takvim oluşturulmaz. Karakter yazılarının amacı ürün ilgisi ve tekrar kullanım; bilim/karar yazılarının amacı markasız keşif olarak kayda geçer.

### MVP — dönüşüm, ölçüm ve haftalık işletim

- Yazıya uygun tek ana CTA ve doğrulanmış mağaza hedefi kullanılır. App Store bağlantısı kullanılabilir; Google Play bağlantısı ancak canlı kullanılabilirliği doğrulanınca eklenir. Kurulu uygulamada desteklenmeyen derin bağlantı vaat edilmez.
- Plus çağrıları ebeveyne hitap eder. Hikâye/görsel içeriği, satın alma baskısı veya kurgu ile gerçek bilimi karıştıran vaatlerle kullanılmaz.
- MVP ölçüm kaydı Search Console sorgu/gösterim/tıklama verisini, mağaza kampanya bağlantısını ve mağazanın sunduğu toplulaştırılmış indirme/kullanım verisini ayrı tutar. Veri kaynağı, tarih aralığı, dil/ülke, kapsam ve sınırlama yazılır.
- App Store kampanya parametreleri doğrulanmış hesap değerlerinden oluşturulur. Kimlik veya token uydurulmaz; hesap bilgisi henüz yoksa normal mağaza bağlantısı çalışır ve atıf durumu “yapılandırılmadı” olarak kaydedilir.
- MVP yeni bir tarayıcı analitik servisi veya çocuk davranışını izleyen uygulama olayı gerektirmez. Web mağaza tıklaması ölçülmüyorsa bu ölçü “bilinmiyor” kalır. Gelecekte eklenirse mevcut izin ve mahremiyet yaklaşımıyla ayrıca tasarlanır.
- Trafik yokluğu, veri erişimi yokluğu ve platformun az veri nedeniyle raporu göstermemesi ayrı durumlar olarak kaydedilir. Mağaza tıklaması indirme, indirme de aktif kullanım sayılmaz.
- Başlangıç kaydı ve 4., 8., 13. hafta inceleme şablonları hazırlanır. Erişilemeyen dış veri için eksik alan, sorumlu ve sonraki takip adımı kaydedilir; tahminle doldurulmaz.
- Haftalık kayıt; konu kimliği, sekiz dilin hazırlık durumu, hedef hafta, kaynak dosyalar, canlı URL'ler, yayın sürümü/tarihi, CTA, ölçüm durumu ve sonraki değerlendirme tarihini tutar. Bir konu ancak sekiz sürümü canlı ve kullanılabilir olduğunda tam yayın paketi sayılır.
- Yayın ritmi haftada bir konudur. İlk konu 22 Eylül 2026'da yayımlandı; kullanıcı 22 Eylül'de sonraki konular için pazartesi 10.00 Europe/London hedefini ve otomatik yayın/hatırlatma akışını kesinleştirdi. Hazır olmayan sekizli paket yayımlanmaz; sıra sonraki haftaya taşınır. Ayrıntı [haftalık yayın runbook'unda](../docs/rockimals-blog-weekly-publishing.md) tutulur.

### Nice-to-haves — ilk teslimattan sonra

- Yeterli yazı birikince kategori filtresi, arama ve sayfalama.
- Masaüstü okuyucu için mağaza QR kodu; dile göre RSS.
- Takvimde ilgili konuya gelindiğinde özgün yazdırılabilir etkinlikler.
- Web mağaza tıklaması ölçümü veya yinelenen yayın otomasyonu; araç, izin davranışı ve işletim biçimi belirlendikten sonra.

### Risk, dependencies and suggested approach

| Risk / bağımlılık | Etki | Yaklaşım |
| --- | --- | --- |
| Ortak Netlify yayını ve kurumsal blog | Yanlış host/canonical, yanlış CTA, başka ürünün bozulması | Rockimals'a ait üretim ve yönlendirme sınırı; mevcut çıktıları koruyan küçük teslimatlar |
| Sekiz dilde haftalık kapasite | Eksik paket veya yüzeysel çeviri | Üç konuluk tampon; ortak brief/terim listesi; dil inceleme sorumluluğunu tanımlama |
| Repo ile canlı uygulamanın farklılaşması | Yanlış platform, ücret, offline veya özellik vaadi | Sürüm/tarih kaydı; yayımdan önce ilgili iddiaları canlı ürünle eşleme |
| Arama talebinin belirsizliği | Çok sayfa üretip ilgili okuyucuya ulaşamama | Aday kelimeleri doğrulama; 4/8/13. haftada sırayı güncelleme |
| Search Console ve App Store erişimi | Eksik edinim atfı | Veri erişimini tasarım/koddan ayırma; bilinmeyeni açık kaydetme, normal CTA'yı koruma |
| Geçmiş ürün dokümanları | Eski isim veya taslak görselin kullanılması | Güncel katalog ve sahip kararları; eski tamamlanmamış kontrol listelerini yeniden açmama |

## Acceptance Criteria

- [ ] **AC1 — Sekiz dilde aynı içeriğe erişim:** İlk yayın grubunun sekiz sürümü kendi URL'sinde doğru `html lang` ve tam yerel içerikle oluşturulur. Yazıdaki dil seçici aynı `translationKey` karşılığına gider; indekste dil değişimi karşılık gelen indekse gider. JavaScript kapalıyken yazı ve temel bağlantılar erişilebilirdir. Geçersiz dil/slug yanlış içerik olarak HTTP 200 dönmez.
- [ ] **AC2 — Rockimals tasarımı ve kullanılabilirlik:** İndeks ve yazı şablonları mevcut Rockimals renk/karakter dilini sürdürür. 390/768/1440 px görsel incelemesinde taşma, kesilen CTA, okunamayan CJK karakteri veya bozulmuş görsel oranı yoktur. Dil seçici ve ana CTA klavyeyle kullanılabilir; görünür odak ve anlamlı görsel alt metinleri vardır. İnceleme kanıtı teslimat kaydına eklenir.
- [ ] **AC3 — Doğru SEO ve yayın sınırı:** Yayımlanan sekizli grupta kendine canonical, karşılıklı dil bağlantıları, İngilizce `x-default`, yerel metaveri ve görünür içerikle tutarlı yapılandırılmış veri bulunur. Yalnızca gerçek yayın URL'leri Rockimals indeks/sitemap/ilgili yazı listelerine girer. Taslak, zamanı gelmemiş veya yayından kaldırılmış içerik üretim çıktısında kalmaz; kaynak Markdown/spec dosyaları yayınlanmaz. Kurumsal blog ve diğer ürünlerin mevcut yolları korunur.
- [ ] **AC4 — İlk üç konu tamam:** 01, 15 ve 28 kimlikli konular için üç kaynak brief, toplam 24 tamamlanmış dil sürümü ve konuya uygun üç kapak/görsel paketi hazırlanmıştır. Her sürümün başlığı, açıklaması, alt metni, CTA'sı ve terimleri yereldir; içerik bağımsız olarak soruyu cevaplar. Kaynaklar ve dil inceleme durumu kaydedilir; çözülmemiş olgusal/çeviri sorunu varsa paket yayına hazır diye işaretlenmez. İlk hafta yalnızca bir sekizli grubun yayımlanması, diğer iki grubun taslak kalması desteklenir.
- [ ] **AC5 — Kaynak ve ürün doğruluğu:** Başlangıç paketindeki her oyun görseli mevcut repo kaynağına/sürümüne eşlenir; orijinaller değişmez. Ürün iddiaları doğrulanan mağaza sürümü ve tarihini taşır. Bilimsel iddialar birincil kaynaklara bağlanır; kurgu, NASA ilişkisi, ücretsiz/Plus, yaş ve veri işleme ifadeleri yanlış beklenti yaratmaz. Ekran görüntülerinin dili ilgili yazıyla eşleşir.
- [ ] **AC6 — Çalışan dönüşüm ve dürüst ölçüm:** Her yazıdan doğrulanmış mağaza hedefine gidilebilir; kullanılamayan platform için indirme vaadi bulunmaz. Kampanya bilgisi varsa doğrulanmış bağlantı, yoksa çalışan normal bağlantı kullanılır. Ölçüm kaydı organik tıklama, mağaza ilgisi, indirme ve kullanımı ayırır; erişilemeyen/az veri nedeniyle gizlenen değerleri sıfır saymaz. Bu teslimat uygulamaya çocuk davranışı takibi veya yeni tarayıcı analitik servisi eklemez.
- [ ] **AC7 — Sürdürülebilir yayın devri:** 52 aday konu ve ilk 13 hafta kaynak plana bağlıdır; haftada bir konu × sekiz dil kuralı, üç konuluk başlangıç tamponu, sekiz dilin hazırlık/yayın kaydı ve 4/8/13. hafta değerlendirme şablonları belgelenmiştir. Pazartesi yayın hedefi kararlaştırılmıştır; editoryal sorumluluk ve dış veri erişimi açık kayıttadır. Gelecekteki 49 konunun yazılması veya 13 haftalık trafik sonucunun oluşması ilk teslimatın kapanış koşulu değildir; canlı yayın/deploy ayrıca gerçekten gerçekleştiğinde kaydedilir.

## Out of Scope

- Bir yılın 416 sayfasını tek uygulama teslimatında üretmek veya 52 hafta boyunca çalışmayı bu spec'in yazılmasıyla başlatmak.
- Mobil oyunun kodu, mekanikleri, hikâye kataloğu, abonelik modeli veya mağaza sürümünde değişiklik yapmak.
- Yeni hesap sistemi, CMS, veritabanı, e-posta toplama, reklam veya çocuğa ait davranış analitiği kurmak.
- Oyunun tüm hikâyelerini/final sahnelerini blogda yeniden yayımlamak; sekiz dil dışında yeni dil eklemek.
- Rakip uygulamaları incelemeden “en iyi” sıralaması yayımlamak; hacim/sıralama/öğrenme başarısı uydurmak.
- Genel bir SEO/site yeniden tasarımı. Blogla doğrudan ilgili olmayan landing/mağaza tutarsızlıkları ayrı iş olarak kaydedilir.
- Bu **spec yazımı sırasında** uygulama geliştirmek, üretim yayını yapmak, commit/push gerçekleştirmek veya zamanlanmış otomasyon oluşturmak. Bu belge tek başına yeni dış sistem yetkisi vermez; sonraki işlerde mevcut kullanıcı yetkilendirmesi esas alınır.

## Open Questions

| Soru | Öneri / mevcut durum | Ne zaman gerekli? |
| --- | --- | --- |
| İlk yayın tarihi ve sabit gün/saat nedir? | İlk konu 22 Eylül 2026'da yayımlandı; hafta 2'den itibaren pazartesi 10.00 Europe/London hedefi 22 Eylül'de kararlaştırıldı | Karar verildi; takvim ve gerçekleşen yayın ayrı izlenir |
| Editoryal ve sekiz dilin anlam/terim incelemesini kim üstlenecek? | Sorumlu editör ve dil inceleme sorumlulukları kaydedilmeli; isim atanmadı | Başlangıç paketine “yayına hazır” denmeden önce |
| Search Console ve App Store Connect verilerine erişim var mı? | Bu çalışma için erişim doğrulanmadı; yoksa alanlar bilinmiyor kalır | Canlı başlangıç ölçümü ve kampanya atfında |
| Her dilde öncelikli ülke/pazar hangisi? | Sekiz dil kesin; ülke dağılımı kesin değil. İlk brief'lerde seçilen pazar varsayımı kaydedilir | Dil bazlı anahtar kelime araştırmasında |
| İleride yayın elle mi, zamanlanmış süreçle mi işletilecek? | Kullanıcı zamanlanmış yayın ve hatırlatma istedi; hazır olma, deploy ve canlı doğrulama kapıları ayrı runbook'ta. Yerel zamanlayıcı bilgisayar ve Codex uygulaması açıkken çalışır. | Otomasyonun ilk birkaç çalışmasında gözden geçirilmeli |

Bu sorular spec'i yazmayı veya ortak altyapıyı hazırlamayı engellemez. Kullanıcının kesinleştirdiği sekiz dil ve haftada bir konu kararları tekrar sorulmaz.

## Suggested Next Step

EE Breakdown ile 13 alt spec oluşturuldu. Ayrıntılı sıra, paralel çalışma fırsatları ve bu epic'in tüm kapsam/kabul/risk eşlemeleri [ayrıştırma belgesinde](../docs/rockimals-blog-breakdown-2026-09-22.md) tutulur.

Başlangıç işi [022 — içerik ve yayın uygunluğu sözleşmesi](022-rockimals-blog-content-contract.md). Ardından 023–025 şablon/navigasyon/host temelini; 026 ürün ve görsel referansını; 027–032 üç konunun 24 dil sürümünü; 033 dönüşüm/ölçümü; 034 birleşik yayın hazırlığını tamamlar. Bağımlılıkları tamamlanmış işler ayrı ilerleyebilir; bu sıralama alt ajan veya yeni Codex task başlatma talimatı değildir.

Uygulama sırasında site reposunun ilgili native build/validation komutları ve hedefli tarayıcı incelemesi kullanılmalı; başlangıç noktası `package.json` içindeki `build:site` ve `check:site` akışlarıdır. Oyun reposu salt görsel/ürün kaynağı olarak kalır; oradaki sahibi tarafından askıya alınmış test/capture süreçleri bu web çalışmasıyla yeniden başlatılmaz.

Ayrıştırma tamamlandı; uygulama başlatılmadı. Kullanıcı Ralph ile yürütmeyi seçerse 022–034 dosyaları, her turda bağımlılıkları tamamlanmış tek spec olacak şekilde planlama girdisi olabilir. Ralph bu görevde çalıştırılmadı.
