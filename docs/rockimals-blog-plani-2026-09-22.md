# Rockimals: sekiz dilde haftalık blog ve organik büyüme planı

Hazırlanma tarihi: 22 Eylül 2026. Durum: blog altyapısı ve ilk sekiz dilli konu yayında; sonraki konular haftalık sırayla hazırlanır ve yayımlanır.

Kullanıcı kararı: haftada bir özgün konu, sitenin sekiz dilinde yayın — English, Türkçe, 日本語, 한국어, 简体中文, Français, Deutsch, Español. 22 Eylül 2026'da pazartesi yayın ritmi ve otomatik yayın/hatırlatma isteği kesinleşti.

## 1. Karar ve içerik kapasitesi

Mevcut ürün etrafında **52 ayrı konu içeren bir yıllık editoryal havuz** oluşturabiliriz. Bu, 52 haftada **416 yerelleştirilmiş yazı sayfası** demektir. Dil sürümleri yeni konu sayılmaz. Önerilen kapasite, arama hacmi veya trafik tahmini değildir.

| İçerik kümesi | Konu | Asıl görevi |
| --- | ---: | --- |
| Oyuna başlama ve özellik rehberleri | 14 | Ürünü tanıtmak, kurulumu ve kullanımı kolaylaştırmak |
| Çocuklar için asteroit bilimi | 12 | Markayı henüz bilmeyen ilgili ailelere ulaşmak |
| Ebeveyn karar ve kullanım rehberleri | 10 | İndirme öncesi soruları cevaplamak ve güven oluşturmak |
| Sekiz kahramanın dünyası | 8 | Karakter ilgisi, birlikte okuma ve oyuna geri dönüş |
| Evde ve sınıfta uygulanabilir etkinlikler | 8 | Arama değeri, paylaşılabilir materyal ve uygulamaya doğal geçiş |
| **Toplam** | **52** | **Bir yıllık aday havuz** |

44 rehber/bilim/etkinlik konusu ile 8 karakter konusu farklı işler yapar. Karakter isimlerinin şu anda kayda değer arama talebi olduğu doğrulanmadı; bu yazılardan genel bilim rehberleri kadar yeni Google ziyaretçisi beklenmemeli. İlk 13 haftanın verisi, sonraki 39 haftanın sırasını değiştirmeli. Birbirinin arama niyetini tekrar eden başlıklar birleştirilmeli; 52 sayısını tutturmak için zayıf yazı üretilmemeli.

Yeni özellikler, mağaza açılışları ve kaynakla doğrulanan astronomi etkinlikleri ileride ek konu sağlayabilir. Bu olası konular mevcut 52'ye dahil değildir. Mevcut 40 hikâye bölümünü 40 kısa SEO sayfasına bölmeyi önermiyorum.

## 2. Doğrulanan ürün ve tasarım zemini

Canlı Rockimals sitesi ve Birleşik Krallık App Store sayfası 22 Eylül 2026'da incelendi. App Store sayfası 1.3.0 sürümünü gösteriyor. Web aracı siteyi açamadığı için site ve mağaza bilgileri tarayıcıdan doğrulandı.

- Ürün, NASA'nın Dünya yakınından geçen asteroit verilerini hayvan karakterleri, boyut/mesafe/hız karşılaştırmaları ve oyunlarla anlatıyor.
- Sekiz kahraman: Niko (fare), Tavi (tavşan), Barney (tilki), Kito (kaplan), Pofi (ayı), Bobo (fil), Ciko (dinozor), Enoli (balina). Her birinin beş bölümü var.
- Radar, resimli hikâye okuyucusu, Kütüphane, hayvan bilgi kartları, Earth Shield, Space Distance Map, Flyby Snap, Space Memory, Size Stack, keşif görevleri ve ziyaretçi günlüğü içerik malzemesi sağlıyor.
- Sitedeki hedef yaş 6–12. Mağaza yaş derecelendirmesi 4+; bunlar farklı kavramlar ve eşitlenmemeli.
- İndirme ücretsiz, Rockimals Plus isteğe bağlı. “Tamamen ücretsiz”, “sınırsız ücretsiz” gibi ifadeler kullanılmamalı.
- Site iPhone/iPad bağlantısı sunuyor; Google Play için “In review” yazıyor. Android yazısı/indirme düğmesi ancak canlı mağaza kullanılabilirliği doğrulanınca açılmalı.
- Reklam ve hesap olmaması doğrulanan ürün mesajı. “Hiçbir veri işlenmez” denmemeli: mağaza etiketi kimliğe bağlanmayan satın alma, tanımlayıcı ve başka veri kategorileri bildiriyor.
- Hikâyeler sabit katalogdan açılıyor. “Her gün sonsuz yeni hikâye üretilir” denmemeli. Günlük açılma hakkı ile toplam katalog birbirinden ayrılmalı.
- Güncel oyun reposunda sonraki bölümlerin görsellerini indirmeye yönelik yeni çalışma var. Offline yazısı yayımlanırken canlı sürümde hangi içeriğin önceden indirilmesi gerektiği yeniden kontrol edilmeli; geliştirme dalındaki davranış mağazada varmış gibi anlatılmamalı.

Kaynaklar: [Rockimals sitesi](https://rockimals.duniaops.com/), [App Store](https://apps.apple.com/gb/app/rockimals/id6792505608).

Yerel inceleme kaynakları:

- Site: `content/rockimals-landing/locales.json`, `scripts/build-rockimals-landing.mjs`, `css/rockimals-landing.css`, `netlify.toml`.
- Oyun: `/Users/uylas/Documents/DuniaOps/Projects/rockimals/CLAUDE.md`, `store/app-store/1.3.0/locales/en-GB/description.txt`, `assets/testflight_catalog/catalog.json`.
- Oyun reposundaki eski README ve bazı mağaza taslakları güncel üründen geride. Çelişkide canlı sürüm, güncel sahip kararları ve çalışan katalog esas alınmalı; eski açık kontrol listeleri yeni engel sayılmamalı.

## 3. Arama stratejisi ve sınırları

**Konumlandırma:** Gerçek asteroitleri, çocukların anlayabileceği karşılaştırmalarla keşfet; aynı evrende sakin oyunlar oyna ve resimli hikâyeler oku.

Birincil okuyucu indirme kararını veren ebeveyn veya öğretmen. Çocukla birlikte okunacak bölümler kısa ve anlaşılır olmalı. Bilim anlatımı ile kurgusal hayvan maceraları açıkça ayrılmalı. Rockimals bağımsız bir uygulama; NASA'nın resmî oyunu veya NASA tarafından onaylanmış bir ürün olarak sunulmamalı.

Üç arama niyeti birlikte hedeflenmeli:

| Niyet | Anahtar kelime adayları | Yazının işi | Doğal sonraki adım |
| --- | --- | --- | --- |
| Bir soruyu öğrenmek | `what is an asteroid for kids`, `asteroid size comparison`, `asteroid vs meteor for kids` | Soruyu uygulama indirmeden de tam cevaplamak | Aynı kavramı Rockimals'ta keşfetmek |
| Bir uygulama seçmek | `space apps for kids`, `astronomy app for kids`, `space games for kids no ads` | Yaş, içerik, reklam, ücret ve bağlantı gereksinimini açıklamak | Ücretsiz özellikleri görüp mağazaya gitmek |
| Rockimals'ı kullanmak | `how to play Rockimals`, `Rockimals stories`, `Rockimals offline`, `Rockimals Plus` | Somut bir ürün sorusunu çözmek | Oyunda ilgili ekranı veya etkinliği açmak |

İlk arama taramasında asteroit bilimi için NASA Space Place ve başka eğitim kaynakları, uygulama seçimi için Common Sense Media gibi listeler görüldü. Bu, geniş terimlerde yerleşik rakipler olduğunu gösterir; sayısal zorluk skoru değildir. Farkımız özgün oyun ekranları, uygulamalı etkinlikler ve gerçek veri ile kurgu ayrımını iyi açıklamak olmalı. Bilim yazılarının olgusal kaynağı [NASA Space Place](https://spaceplace.nasa.gov/asteroid/en/) ve [NASA Science](https://science.nasa.gov/solar-system/asteroids/facts/) olmalı.

**Bu aşamada Search Console, Keyword Planner veya ücretli anahtar kelime veri seti okunmadı.** Aşağıdaki kelimeler yayın brief'i için adaydır; doğrulanmış aylık hacim, sıralama garantisi veya trafik tahmini değildir. Sekiz dilde arama sonuçları henüz ayrı ayrı analiz edilmedi.

Her yazıdan önce hedef dil ve ülke için ilk arama sonuçları incelenmeli; arama niyeti, başlık, rakiplerin cevaplamadığı somut soru ve oyunla bağlantı kaydedilmeli. İlk yayınlardan sonra Search Console sorguları önceliklendirmeyi belirlemeli. Aynı dilde aynı niyeti hedefleyen ikinci bir yazı açmak yerine mevcut yazı geliştirilmeli.

Google'ın [insana fayda sağlayan içerik rehberi](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) doğrultusunda yazının bağımsız faydası, özgün örnekleri ve olgusal doğruluğu esas alınmalı. Kelime sayısı veya yayın adedi tek başına başarı ölçüsü değildir.

## 4. Bir yıllık 52 konu havuzu

Başlıklar Türkçe planlama başlıklarıdır. İngilizce sütun ortak brief için başlangıç kelimesidir; sekiz dilde kelimesi kelimesine çevrilmez. ID yayın sırası değildir.

### A. Oyuna başlama ve özellikler — 14 konu

| ID | Yazı başlığı / farklı sorusu | Anahtar kelime adayı | Ürün içi sonraki adım |
| --- | --- | --- | --- |
| 01 | Rockimals nasıl oynanır? İlk uzay ziyaretçinle tanış | `how to play Rockimals` | Radar'da bir ziyaretçiyle tanış |
| 02 | Rockimals Radar rehberi: Bugünün ziyaretçilerini bul | `Rockimals radar` | Yakınlaştır, ziyaretçi seç; ekranın bir görselleştirme olduğunu açıkla |
| 03 | Rockimals'ta hangi asteroit hangi hayvana dönüşür? | `Rockimals animals asteroid sizes` | İki hayvanın bilgi kartını karşılaştır |
| 04 | Rockimals hikâyeleri nasıl açılır? Günlük bölüm ve ilerleme | `how to unlock Rockimals stories` | Bir kahramanın sıradaki bölümünü aç |
| 05 | Rockimals Kütüphanesi: Açılan bölümleri bul ve yeniden oku | `Rockimals story library` | Önceden açılmış bölüme dön |
| 06 | Earth Shield rehberi: Ziyaretçilere güvenli geçiş sağla | `Rockimals Earth Shield` | Bir tur oyna; ücretsiz sınırı doğru belirt |
| 07 | Space Distance Map: Ay'a göre yakın ve uzağı keşfet | `Rockimals Space Distance Map` | Mesafe karşılaştırma oyununu incele |
| 08 | Flyby Snap rehberi: Doğru anı yakalamak | `Rockimals Flyby Snap` | Bir çekim turunu tamamla |
| 09 | Space Memory nasıl oynanır? Hayvanları ve bilgileri eşleştir | `Rockimals Space Memory` | Bir eşleştirme turu oyna |
| 10 | Size Stack rehberi: Uzay ziyaretçilerini boyuta göre sırala | `Rockimals Size Stack` | Boyut sıralaması yap |
| 11 | Rockimals keşif görevleri: İlk görevini seç | `Rockimals discovery missions` | Uygun bir göreve başla |
| 12 | My Space Zoo: Favorilerin, keşiflerin ve koleksiyonun | `Rockimals My Space Zoo` | Bir favori seç ve koleksiyonunu bul |
| 13 | Space Visitor Journal: Keşfettiğin bilgileri günlüğünde bul | `Rockimals visitor journal` | Bir kayıt incele; dekorasyonun erişim koşulunu belirt |
| 14 | Rockimals ayarları: Sakin hareket ve isteğe bağlı hatırlatıcılar | `Rockimals settings reminders` | Ebeveynle ayarları düzenle |

### B. Asteroit bilimi — 12 konu

| ID | Yazı başlığı / farklı sorusu | Anahtar kelime adayı | Rockimals bağlantısı |
| --- | --- | --- | --- |
| 15 | Asteroit nedir? Çocuklar için resimli başlangıç rehberi | `what is an asteroid for kids` | İlk gerçek ziyaretçinin bilgi kartı |
| 16 | Asteroit, meteor ve kuyruklu yıldız arasındaki fark | `asteroid vs meteor for kids` | Gerçek bilgi ile hikâye dilini ayırma |
| 17 | Asteroitler ne kadar büyük? Günlük nesnelerle karşılaştır | `asteroid size comparison for kids` | Boyut kartları ve Size Stack |
| 18 | Uzayda mesafe nasıl anlatılır? Ay'ı ölçü olarak kullan | `space distance for kids` | Ay'a göre uzaklık kartları |
| 19 | Asteroitler ne kadar hızlı gider? Hızı karşılaştırarak öğren | `how fast do asteroids travel` | Bilgi kartı; ekran animasyonu gerçek hız ölçeği değildir |
| 20 | Dünya'ya yakın asteroit ne demektir? “Yakın” ne kadar yakın? | `near earth asteroids for kids` | Yakın geçişleri sakin ve doğru açıklama |
| 21 | Bilim insanları asteroitleri nasıl bulur ve takip eder? | `how does NASA track asteroids` | Ebeveyn bölümünden bilim kaynağına gitme |
| 22 | Bugünün asteroit listesi neden yarın değişir? | `why asteroid close approach lists change` | Güncel veri, tarih ve örnek veri ayrımı |
| 23 | Uzay hayvanları gerçek mi? Rockimals'ta bilim ve hayal gücü | `Rockimals real asteroid data` | Kurgu karakteri ve gerçek gökcismini ayırma |
| 24 | Asteroit kuşağı nerede? Mars ve Jüpiter arasındaki bölge | `asteroid belt for kids` | Genel bilimden Dünya yakınındaki ziyaretçilere geçiş |
| 25 | Asteroitler neden yuvarlak olmak zorunda değil? | `why are asteroids different shapes` | Hayvan görselinin gerçek gökcismi fotoğrafı olmadığını anlatma |
| 26 | Earth Shield bir oyun; bilim insanları Dünya'yı nasıl izliyor? | `planetary defense explained for kids` | Oyun kurgusu ile gerçek izleme ve görevlerin farkı |

### C. Ebeveyn karar ve kullanım rehberleri — 10 konu

| ID | Yazı başlığı / farklı sorusu | Anahtar kelime adayı | İndirmeye/kullanıma katkısı |
| --- | --- | --- | --- |
| 27 | Rockimals hangi yaşa uygun? Birlikte ve bağımsız keşif | `Rockimals age range` | Hedef yaş, okuma ihtiyacı ve mağaza derecelendirmesini açıklar |
| 28 | Rockimals'ta reklam, hesap ve ebeveyn kontrolü | `Rockimals ads parental controls` | Satın alma ve dış bağlantı sınırlarını açıklar; veri politikasıyla tutarlı olur |
| 29 | Rockimals ücretsiz mi? Ücretsiz özellikler ve Plus karşılaştırması | `is Rockimals free` | Ebeveynin neyi indirdiğini ve hangi içeriklerin ek erişim istediğini bilmesini sağlar |
| 30 | Rockimals internetsiz çalışır mı? Yolculuktan önce hazırlan | `does Rockimals work offline` | Canlı sürümde indirilmiş içerik, örnek gökyüzü ve güncel veri sınırlarını açıklar |
| 31 | Resimli uzay hikâyelerini çocuğunuzla birlikte okumak | `space stories to read with kids` | Bir bölüm için açık uçlu sorular ve okuma önerileri verir |
| 32 | Rockimals'ı iki dilde keşfetmek: Dil değiştirme ve birlikte okuma | `Rockimals languages` | Sekiz dil ve uygulamadaki dil değiştirme yolunu gösterir; dil öğrenimi sonucu vaat etmez |
| 33 | Rockimals iPad'de nasıl kullanılır? Birlikte keşif için ekran rehberi | `Rockimals iPad` | Güncel mağaza sürümündeki gerçek tablet deneyimini gösterir |
| 34 | Çocuğunuz için uzay uygulaması seçerken nelere bakmalısınız? | `space apps for kids no ads` | Yaş, oyun/okuma dengesi, ücret ve bağlantı için dürüst seçim ölçütleri sağlar |
| 35 | Rockimals ile kısa bir keşif rutini: Bak, karşılaştır, oku, bırak | `space learning activities at home` | Ailenin seçtiği süreyle uygulanabilir örnek oturum; sağlık iddiası yok |
| 36 | Rockimals'ta ziyaretçi veya bölüm görünmüyorsa ne yapılır? | `Rockimals stories not unlocking` | Yaygın durumları açıklar ve doğru destek sayfasına yönlendirir |

### D. Kahramanlar — 8 konu

Bu grubun ana amacı bağlılık ve ürün tanıtımıdır. Her yazı farklı bir sahne, kısa bir tanıtım ve birlikte konuşma soruları içermeli; aynı metinde yalnızca karakter adı değiştirilmemeli. Hikâyenin tamamı ve finali bloga taşınmamalı. Aşağıdaki açılar mevcut karakter yönünden türetilmiştir; yayımdan önce çalışan katalogdaki sahneyle eşleştirilmeli.

| ID | Yazı başlığı / ayrı açısı | Anahtar kelime adayı | Kullanım çağrısı |
| --- | --- | --- | --- |
| 37 | Niko ile tanışın: Küçük ipuçlarını fark eden uzay faresi | `Niko Rockimals` | İlk bölümde bir gözlem seç |
| 38 | Tavi ile tanışın: Yolculuk, paylaşma ve küçük bir kamp | `Tavi Rockimals` | Yolculuk sahnesini birlikte oku |
| 39 | Barney ile tanışın: Meraklı bir tilkinin büyük yolculuğu | `Barney Rockimals` | Maceranın başlangıcını keşfet |
| 40 | Kito ile tanışın: Yavrularıyla ipuçlarını takip eden kaplan | `Kito Rockimals` | Bir rota kararını birlikte konuş |
| 41 | Pofi ile tanışın: Sabır, izler ve yıldızlı bir piknik | `Pofi Rockimals` | Bir sahnedeki ayrıntıyı bul |
| 42 | Bobo ile tanışın: Dinlemeyi ve sırayla oynamayı öğrenen fil | `Bobo Rockimals` | Birlikte çözülen sorunu konuş |
| 43 | Ciko ile tanışın: Bir gezegeni ipuçlarından tanımak | `Ciko Rockimals` | İki ipucunu karşılaştır |
| 44 | Enoli ile tanışın: Arkadaşlarına yer açan uzay balinası | `Enoli Rockimals` | Birlikte hareket etme sahnesini oku |

### E. Ev ve sınıf etkinlikleri — 8 konu

| ID | Yazı başlığı / somut çıktı | Anahtar kelime adayı | Rockimals bağlantısı |
| --- | --- | --- | --- |
| 45 | Bir haftalık uzay ziyaretçisi gözlem günlüğü | `space observation journal for kids` | Her gün tek karşılaştırma; oturum başına süre yarışması yok |
| 46 | Evde boyut sıralama etkinliği: Küçükten büyüğe uzay taşları | `asteroid size activity for kids` | Kâğıt nesnelerle sıralama, ardından Size Stack |
| 47 | İp ve kâğıtla Dünya–Ay mesafesi etkinliği | `earth moon distance activity for kids` | Ölçek açıkça belirtilir; sonra uygulamadaki Ay karşılaştırması |
| 48 | Hız mı mesafe mi? İki ayrı kavramı karşılaştırma oyunu | `speed and distance activity for kids` | Özgün çalışma kâğıdı ve bilgi kartı |
| 49 | Sınıfta 20 dakikalık asteroit keşfi: Öğretmen etkinlik planı | `asteroid lesson plan primary school` | Cihaz paylaşımı ve çevrimdışı alternatif; müfredat onayı iddiası yok |
| 50 | Bir uzay hikâyesini sıraya koy: Önce, sonra, en sonunda | `space story sequencing activity` | Okunan bölümden özgün sıralama kartları |
| 51 | Yazdırılabilir uzay keşif kartları: Boyut, mesafe, hız | `printable space activity cards` | E-posta zorunluluğu olmadan özgün indirilebilir materyal |
| 52 | Bilim mi hikâye mi? Ailece ayırma ve konuşma etkinliği | `space science fact or fiction for kids` | Gerçek asteroit bilgisi ile hayvan macerasını ayırma |

## 5. İlk 13 haftanın yayın sırası

Konu 01, 22 Eylül 2026 Salı günü kullanıcı onayıyla sekiz dilde yayımlandı. **Hafta 2'den itibaren hedef her pazartesi 10.00 Europe/London:** 28 Eylül'de konu 15, 5 Ekim'de konu 28, 12 Ekim'de konu 04. Bu saat bir operasyon tercihidir; SEO avantajı iddiası değildir. Cuma 10.00 Europe/London hazırlık hatırlatması, pazartesi 10.00 yayın çalıştırması için hedeflenir. İki ayrı konu aynı hafta yayımlanmaz; tamamlanmamış sekizli paket atlanıp sıradaki konuya geçilmez. Taslaklar önceden hazırlanabilir, fakat topluca yayımlanmaz. İşletim ve güvenlik kapıları [haftalık yayın runbook'unda](rockimals-blog-weekly-publishing.md) tutulur.

| Hafta | ID | Konu | Öncelik nedeni | Ana görsel |
| ---: | --- | --- | --- | --- |
| 1 | 01 | Rockimals nasıl oynanır? | Sonraki yazıların bağlanacağı temel ürün rehberi | Radar + bilgi kartı |
| 2 | 15 | Asteroit nedir? | Temel markasız arama ihtiyacı | Gerçek/kurgu ayrımlı karakter ve bilim kutusu |
| 3 | 28 | Reklam, hesap ve ebeveyn kontrolü | Ebeveyn karar sorularını erken cevaplar | Ebeveyn ayarının güncel ekranı |
| 4 | 04 | Hikâyeler nasıl açılır? | Ürünün ayırt edici deneyimini açıklar | Kütüphane + okuyucu |
| 5 | 16 | Asteroit, meteor ve kuyruklu yıldız farkı | Bağımsız faydası yüksek bilim konusu | Açıklayıcı karşılaştırma; oyun sanatı kurgu olarak etiketli |
| 6 | 29 | Ücretsiz özellikler ve Plus | İndirme öncesi beklentiyi netleştirir | Güncel özellik karşılaştırması |
| 7 | 17 | Asteroit boyutları | Bilimi ürünün hayvan eşlemesine bağlar | Hayvan dizisi + boyut kartları |
| 8 | 06 | Earth Shield rehberi | Oyun deneyimini somutlaştırır | Earth Shield ekranı |
| 9 | 18 | Ay'a göre uzay mesafesi | İkinci temel bilim/kullanım bağlantısı | Mesafe kartı |
| 10 | 30 | İnternetsiz kullanım | İndirme öncesi pratik soruyu çözer | İndirilen/açılan bölüm durumu, mevcut sürüme göre |
| 11 | 39 | Barney ile tanışın | İlk karakter yazısıyla ilgi ve okuma bağlantısı | Onaylı Barney sahnesi |
| 12 | 49 | Sınıfta 20 dakikalık keşif | Öğretmenlere paylaşılabilir somut materyal | Etkinlik planı + uygulama ekranı |
| 13 | 34 | Uzay uygulaması seçme rehberi | Önceki içeriklere bağlanan karar yazısı | Özgün seçim tablosu + Rockimals örneği |

4., 8. ve 13. haftalarda performans gözden geçirilmeli. Bunlar haftalık yeni yazının yanında mevcut içerik bakım işleri; ayrı yeni yazı sayılmaz. Gerekirse sonraki haftanın konusu değiştirilir. Marka yazıları az trafik getirip daha yüksek mağaza ilgisi üretebilir; salt ziyaret sayısıyla elenmemeli.

## 6. Sekiz dilde yayın düzeni

Ortak kaynak brief'i İngilizce hazırlanabilir; yayımlanan sekiz dil sürümü aynı konuyu yerel okurun kullandığı kelimelerle anlatmalı. Her dil için H1, açıklama, görsel alt metni, CTA ve ilgili yazılar yerelleştirilmeli. Özel karakter adları ve oyun isimleri uygulamanın o dildeki kaynaklarıyla eşleşmeli.

| Dil / URL kodu | İlk bilim yazısı için başlık taslağı | Başlangıç kelimesi taslağı |
| --- | --- | --- |
| English / `en` | What Is an Asteroid? A Guide for Curious Kids | `asteroids for kids` |
| Türkçe / `tr` | Asteroit Nedir? Çocuklar İçin Kolay Bir Rehber | `çocuklar için asteroit` |
| 日本語 / `ja` | 小惑星ってなに？子どものためのやさしいガイド | `小惑星 子ども` |
| 한국어 / `ko` | 소행성이란 무엇일까요? 어린이를 위한 쉬운 안내 | `어린이 소행성` |
| 简体中文 / `zh-Hans` | 什么是小行星？写给孩子的简单指南 | `儿童 小行星 科普` |
| Français / `fr` | Qu’est-ce qu’un astéroïde ? Un guide pour les enfants | `astéroïde pour les enfants` |
| Deutsch / `de` | Was ist ein Asteroid? Einfach erklärt für Kinder | `Asteroiden für Kinder` |
| Español / `es` | ¿Qué es un asteroide? Una guía para niños | `asteroides para niños` |

Bu tablo yerel arama verisi veya ana dili incelemesi tamamlanmış son kopya değildir. Her yayın paketinde dil bilen editör incelemesi üretim sürecine dahil edilmeli. Özellikle Japonca, Korece ve Çince için satır kırılımı, tipografi ve anlam incelenmeli. Basitleştirilmiş Çince desteği, ana kara Çin'den Google trafiği beklentisiyle eşitlenmemeli; ülke dağılımı gerçek veriden izlenmeli.

URL önerisi, mevcut dil yollarını koruyarak genişletir:

- İngilizce indeks: `https://rockimals.duniaops.com/blog`
- İngilizce yazı: `https://rockimals.duniaops.com/blog/what-is-an-asteroid-for-kids`
- Türkçe indeks: `https://rockimals.duniaops.com/tr/blog`
- Türkçe yazı: `https://rockimals.duniaops.com/tr/blog/cocuklar-icin-asteroit-nedir`
- Diğerleri: `/{locale}/blog/{slug}`. Japonca/Korece/Çince için başlangıçta okunabilir Latin slug kullanılabilir; sayfa başlığı ve içeriği tamamen yerel dilde kalır.

Her sekizli grup ortak bir `translationKey` ile eşlenmeli. Dil seçici okuyucuyu ana sayfaya değil aynı yazının diğer diline götürmeli. Her dil sayfası kendine canonical vermeli; tüm diller İngilizceye canonical edilmemeli. Karşılıklı `hreflang`, sayfanın kendi dil bağlantısı, uygun `x-default` ve doğru `html lang` kullanılmalı. Yalnızca gerçekten yayımlanmış URL'ler eşlenmeli. Tarayıcı dili nedeniyle zorunlu yönlendirme yapılmamalı. Ayrıntılar [Google'ın yerelleştirilmiş sayfa rehberinde](https://developers.google.com/search/docs/specialty/international/localized-versions).

Haftalık teslimat, bir kaynak yazı + yedi uyarlama + sekiz dil için editoryal/tasarım kontrolüdür. Tek yazı üretimiyle aynı emek bütçesi olarak planlanmamalı. Ortak görsel kompozisyon yeniden kullanılabilir; ekran metinleri ve alt metinler dile uymalı. Hazır olmayan bir dil boş veya düşük kaliteli bir sayfa olarak yayımlanmamalı; tampon stok bunun önüne geçmeli.

## 7. Rockimals tasarımına uygun blog

Canlı sitenin görsel dili korunmalı:

- Arka plan: gece laciverti `#07101d`; ikincil yüzey `#0b1930`, kartlar `#112543`.
- Vurgu: turuncu `#ff6a2a`, sıcak altın `#ffb262`; açık okuma alanı `#fff8ed`.
- Başlıklar: mevcut Fredoka karakteri; uzun metin: Inter ve ilgili dil için kapsamlı yazı tipi yedeği. Latin başlık tipografisini CJK karakterlerine zorlamamak gerekir.
- Yuvarlatılmış kartlar, hafif yıldız dokusu, gerçek oyun karakterleri ve portre uygulama ekranları.
- Uzun yazıda 680–760 px civarı metin sütunu, rahat satır aralığı, küçük ekranlarda taşmayan tablolar. Krem okuma paneli, sitenin mevcut açık renkli bölümlerine uyum sağlar.

Blog ana sayfası: kısa tanıtım, öne çıkan başlangıç rehberi, dört kullanıcıya dönük kategori (Oyunu Keşfet / Uzayı Öğren / Aile Rehberi / Hikâyeler ve Etkinlikler), dil seçici ve kart listesi. İlk az sayıda yazıda gereksiz boş filtreler oluşturulmamalı.

Yazı şablonu sırası:

1. Kategori, açıklayıcı H1, kısa cevap, yazar/editör ve tarih.
2. Konuya özel kapak veya gerçek ekran görseli.
3. Uzunsa içindekiler; uygulama rehberiyse sürüm kontrol notu.
4. Okurun sorusunu tamamen cevaplayan metin, örnekler ve görseller.
5. “Bunu Rockimals'ta keşfet” kutusu: bu yazıyla ilgili tek somut eylem.
6. Yalnızca gerçekten yararlıysa kısa sorular; bilim kaynakları.
7. Aynı dilde 2–3 ilgili yazı ve ebeveyne yönelik mağaza bağlantısı.

CTA örnekleri: “Gerçek uzay ziyaretçileriyle tanışın”, “Rockimals'ı ücretsiz indirin”, mevcut kullanıcı için “Radar'ı açıp iki ziyaretçinin boyutunu karşılaştırın”. Desteklenmeyen derin bağlantı veya otomatik kurulum varmış gibi davranılmamalı. Masaüstünde doğrulanmış mağaza linkine giden QR kod düşünülebilir.

Plus çağrıları ebeveyne hitap etmeli; çocukta kaçırma korkusu yaratacak sayaç veya satın alma baskısı kullanılmamalı. Android bağlantısı yayın durumuna göre gösterilmeli. Geniş “en iyi uygulamalar” karşılaştırması yapılacaksa gerçek rakip incelemesi ve açık ölçütler gerekir; başlangıçta kendi ürününü sahte bir sıralamada birinci yapan içerik önerilmiyor.

## 8. Repondaki görsellerin kullanım planı

Oyun kökü: `/Users/uylas/Documents/DuniaOps/Projects/rockimals`.

| Kaynak | Kullanım | Seçim notu |
| --- | --- | --- |
| `assets/animals/original/{species}.png` | Yüksek çözünürlüklü karakter referansı | Sekiz tür dosyası mevcut; tilki görseli incelendi |
| `assets/animals/transparent/{species}.webp` | Kart ve kapak içinde karakter yerleşimi | Mevcut karakter kimliği korunur |
| `assets/animals/rescued/{species}.webp` | İlgili oyun/sonuç anlatımı | Sahnenin anlamı yazıyla eşleşir |
| `assets/testflight_catalog/catalog.json` | Güncel hikâye görselini doğru kaynağa eşleme | Hash dosya adlarından rastgele seçim yapılmaz |
| `assets/testflight_catalog/mobile/` ve `covers/` | Kısa sahne önizlemesi ve bölüm kapağı | Tam hikâye/sonuç bloga taşınmaz; çalışan katalogla doğrulanır |
| Site reposunda `assets/products/rockimals-preview/{locale}/` | Sekiz dilde altı hazır uygulama ekranı | Radar, hikâye, Kütüphane, bilgi kartı, Earth Shield, My Space Zoo |

Yeni çizim üretmeden mevcut varlıklarla başlanabilir. Her özgün konu için ayrı bir kapak seçimi/kompozisyonu hazırlanmalı; sekiz dil aynı metinsiz kapağı paylaşabilir. Yazı başlığını görsele gömmek yerine HTML metni olarak tutmak çeviri ve erişilebilirliği kolaylaştırır.

Paylaşım kapağı 1200×630; yazı içi ekran görüntüleri kendi portre oranıyla gösterilmeli. Portre hikâye sanatını yatay kapağa sığdırmak için karakter veya önemli sahne kesilmemeli; tasarımda boşluk/yüzey kullanılmalı. Orijinal oyun dosyaları değiştirilmeden web kopyaları hazırlanmalı. Yerelleştirilmiş `alt`, boyut bilgisi, responsive varyantlar ve uygun sıkıştırma eklenmeli. Ana kapak dışında görseller gecikmeli yüklenebilir.

Görsel manifesti: konu ID'si, kaynak repo yolu, kaynak sürüm/commit, sahne/bölüm, dil, web çıktısı ve alt metin. Bu kayıt yanlış karakter, eski ekran veya yanlış dil kullanımını azaltır.

## 9. Teknik uygulama paketi

Bu bölüm öneridir; bu görevde uygulama kodu değiştirilmedi.

Mevcut `scripts/build-blog.mjs`, `https://www.duniaops.com` adresini ve danışmanlık hizmetlerine yönlenen kategorileri/CTA'ları sabit kullanıyor. Rockimals yazılarını doğrudan mevcut `content/blog/` içine koymak yanlış tasarım, canonical ve ticari çağrı üretir. Aynı statik yaklaşımın Rockimals'a özel içerik/şablon katmanı kullanılmalı.

Önerilen yapı:

```text
content/rockimals-blog/<translation-key>/<locale>.md
assets/rockimals-blog/<translation-key>/...
scripts/build-rockimals-blog.mjs
css/rockimals-blog.css
```

Markdown alanları: `translationKey`, `locale`, `slug`, `title`, `description`, `category`, `published`, `updated`, `draft`, `image`, `imageAlt`, `author`, `reviewedAppVersion`, `relatedPosts`, `cta`.

- Sekiz dilde başlangıç HTML'si sunulmalı; içerik yalnızca JavaScript ile görünür hale gelmemeli.
- Rockimals hostuna özel blog yolları, sitemap ve robots yanıtı eklenmeli. Mevcut kök `robots.txt`, DünyaOps sitemap'ini işaret ediyor; Rockimals blogunun kendi URL envanteri ayrıca düzenlenmeli.
- Mevcut `build:site` akışına ürün blogu bağlanmalı; kaynak Markdown ve taslaklar `dist/` yayın sınırından dışarıda kalmalı.
- Host yönlendirmeleri incelenmeli; Rockimals blog adresleri yanlışlıkla DünyaOps blogu olarak sunulmamalı.
- `BlogPosting`/`Article` ve `BreadcrumbList` sayfanın gerçek görünür içeriğiyle tutarlı olmalı. Gerçekte olmayan yazar uzmanlığı, değerlendirme puanı veya yorum sayısı eklenmemeli. Yapılandırılmış veri, zengin sonuç garantisi değildir: [Google Article rehberi](https://developers.google.com/search/docs/appearance/structured-data/article).
- Makale başlıkları ve meta açıklamaları dile özgü yazılmalı. 140–160 karakter İngilizce/Türkçe için editoryal bir başlangıç olabilir; CJK dillerine mekanik bir uzunluk zorlaması yapılmamalı.
- Resim boyutları, mobil okunabilirlik, klavye ile dil seçimi ve iç bağlantılar yayın öncesi incelenmeli.
- Site navigasyonuna Blog bağlantısı ve ana sayfaya uygun sayıda son içerik eklenmeli. Ürün blogu DünyaOps hizmet satış kartlarına karışmamalı.
- Gözlenen ayrı tutarsızlık: landing şeması iOS 13.0 yazarken canlı App Store iOS 15.0 bildiriyor. Blog altyapısı hazırlanırken bu ürün verisi de doğrulanıp hizalanmalı.

## 10. Haftalık üretim akışı

| Aşama | İş | Çıktı |
| --- | --- | --- |
| Kaynak brief | Bir hedef soru, dil/ülke araması, özellik/sürüm doğrulaması, bilim kaynakları | Tek sayfalık brief |
| Kaynak yazı | Doğrudan cevap, özgün uygulama örneği, kaynaklar ve doğal CTA | İncelenebilir ana metin |
| Yerelleştirme | Yedi uyarlama; yerel anahtar kelime, uygulama terimleri, H1 ve CTA | Sekiz dil sürümü |
| Görseller | Repondan doğru ekran/sahne, dil eşleme, kapak ve alt metin | Ortak kapak + gerekli dil görselleri |
| Yayına hazırlık | Anlam/iddia kontrolü, mağaza durumu, bağlantılar, canonical/hreflang ve mobil görünüm | Tam sekizli yayın paketi |
| Haftalık yayın | Sekiz sürüm, indeksler, sitemap, ilgili yazılar | Bir yeni konu, sekiz erişilebilir URL |
| Geri besleme | Google görünürlüğü, mağazaya ilgi ve destek soruları | Sonraki brief ve mevcut yazı güncellemesi |

Rol ihtiyacı: bir sorumlu editör, ürün doğrulaması yapabilen kişi ve sekiz dili karşılayan dil incelemesi. Aynı kişi birden fazla rolü üstlenebilir. İlk üç konu üretildikten sonra gerçek süreler ölçülüp sürdürülebilir haftalık kapasite hesaplanmalı; bu çalışma yapılmadan sekiz dilin emek maliyeti için kesin saat tahmini verilmemeli.

## 11. Ölçüm: ziyaret → mağaza → indirme → kullanım

Başarı yalnızca yazı sayısı veya görüntülenme değildir. Ölçüm uygulamanın çocuklara yönelik mevcut mahremiyet yaklaşımını korumalı; bu plan uygulamaya çocuk davranışı izleyen yeni analitik eklemeyi içermez.

| Aşama | Ölçü | Veri kaynağı / sınır |
| --- | --- | --- |
| Bulunma | İndekslenen sayfalar, gösterim, sorgu, ülke, sayfa/dil | Search Console; `site:` araması kesin indeks sayımı değildir |
| Ziyaret | Organik tıklama ve arama CTR'ı | Search Console; CTR = tıklama / gösterim |
| Mağazaya ilgi | Yazıdan mağaza bağlantısına tıklama | Uygulanırsa mevcut izin politikasına uygun web ölçümü; ölçülen ziyaretçi kapsamı raporlanır |
| İndirme | Kampanya üzerinden görülebilen ilk indirmeler | App Store Connect; tıklama, indirme sayılmaz |
| Kullanım | Mevcut platformun sunduğu toplulaştırılmış kullanım/tutunma sinyalleri | Her yazı veya kişi için uçtan uca eşleme garanti değildir |

Apple kampanya linkleri App Store Connect'te oluşturulmalı; kısa konu+dil kodları kullanılabilir (`rk01en`, `rk01tr`). Apple'ın [kampanya bağlantıları rehberi](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links) bu bağlantıların kampanya performansını ölçebildiğini, raporlarda asgari veri eşikleri bulunduğunu açıklar. Düşük hacimde boş hücre “sıfır indirme” olarak yorumlanmamalı. UTM eklemek tek başına App Store indirme atfı sağlamaz. Farklı kaynakların paydaları birleştirilip kesin dönüşüm oranı iddia edilmemeli.

İlk 90 gün için kontrol noktaları:

- Başlangıç: mevcut organik sorgu/tıklama ve mağaza edinim verisini kaydet; erişim yoksa başlangıç değerini “bilinmiyor” yaz.
- 4. hafta: 4 konu / 32 sayfa; keşif ve indeks sorunları, dil URL'leri, ilk sorgular.
- 8. hafta: 8 konu / 64 sayfa; gösterim alan ama tıklanmayan sayfaların başlık/açıklaması; ürün ilgisi üreten konular.
- 13. hafta: 13 konu / 104 sayfa; en ilgili ülke/dil ve sorgu kümeleri; sonraki çeyreğin öncelikleri.

Sayfa sayıları planlanan teslimat miktarıdır; Google'ın tamamını indeksleyeceği veya belirli bir trafik getireceği sözü değildir. Trafik ve indirme hedefi ilk gerçek başlangıç verisi ve yayın sonuçlarından sonra konmalı.

## 12. Uygulamaya geçiş sırası ve kabul ölçütleri

1. Rockimals'a özel çok dilli blog indeksini ve yazı şablonunu hazırlamak.
2. Host/yol, canonical, dil eşleme, sitemap ve taslak yayın sınırını kurmak.
3. İlk üç konu için ortak brief ve sekiz dilde taslak tampon hazırlamak.
4. Repo görsellerini manifestle eşlemek; mağaza, ücret ve offline ifadelerini mevcut sürümle doğrulamak.
5. Yayın başlangıç tarihini belirleyip haftalık sekizli paketi yayımlamak.
6. 4/8/13. hafta değerlendirmelerine göre kalan konu sırasını güncellemek.

İlk yayın paketinin kabul ölçütleri: sekiz erişilebilir yazı URL'si; doğru dile giden seçici; her sayfada doğru canonical ve karşılıklı alternatifler; konuya uygun repo görseli; anlamlı mobil görünüm; ilgili dilde bağlantılar; doğrulanmış mağaza çağrısı; kaynaklı bilim; ücretsiz/Plus ve offline ayrımlarının doğruluğu; şişirilmiş SEO/öğrenme sonucu iddiası bulunmaması.

Bu plan, kaynak ve canlı sayfa incelemesine dayanır. Uygulama kodu, mağaza kaydı veya üretim sitesi değiştirilmedi; commit, push, yayın veya otomasyon oluşturulmadı. Oyun reposunda test veya yakalama harness'i çalıştırılmadı.
