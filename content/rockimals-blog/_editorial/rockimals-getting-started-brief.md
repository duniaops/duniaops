# Konu 01 brief — Rockimals nasıl oynanır?

- **Durum:** İngilizce ve Türkçe kaynak taslakları tamamlandı; altı dil ve yayın incelemesi bekleniyor.
- **İnceleme tarihi:** 2026-09-22
- **Canlı uygulama sürümü:** iOS 1.3.0, 2026-09-19 mağaza sürümü
- **Translation key:** `rockimals-getting-started`
- **Kategori:** `discover-game`
**Sıra:** ilk 13 haftada hafta 1 / konu 01; sıra değiştirilmedi.

## Okuyucu, niyet ve özgün açı

- **Birincil okuyucu:** Uygulamayı indirmeyi değerlendiren veya çocukla birlikte ilk oturumu başlatan ebeveyn/bakım veren.
- **İkincil okuyucu:** Radar'da neye dokunacağını anlamak isteyen ilk kez kullanan oyuncu.
- **Tek soru:** Radar'da ilk ziyaretçi nasıl bulunur, bilgi kartı nasıl okunur ve hikâyeye nasıl geçilir?
- **Özgün açı:** Genel özellik listesi yerine ilk beş dakikayı tek bir akış olarak anlatır; NASA/JPL kaynaklı ölçüler ile hayvan adı/görseli/hikâye kurgusunu aynı adımda açıkça ayırır.
- **Kapsam dışı:** Tüm oyunların ayrıntılı rehberi, Plus fiyat karşılaştırması, ebeveyn/veri rehberinin tamamı ve desteklenmeyen deep link.

## Arama niyeti incelemesi

22 Eylül 2026'da web sonuçları örneklenerek `how to play Rockimals`, `Rockimals Radar story library`, `Rockimals nasıl oynanır` ve `Rockimals Radar hikâye kitaplığı` sorguları incelendi.

- **English / GB varsayımı:** Rockimals'a ait indekslenmiş, adım adım bir oynanış rehberi bulunmadı. Sonuçlar benzer isimli başka “-imals” uygulamalarına ve genel “how to play” sayfalarına kayıyordu. Doğrulanabilen marka sonucu, adım öğretmeyen üst düzey DuniaOps ürün sayfasıydı. Niyet bu nedenle markalı/navigasyonel ilk kullanım yardımı olarak ele alındı.
- **Türkçe / Türkiye varsayımı:** Rockimals'a özgü bir rehber görünmedi; sonuçlar ilgisiz oyun kuralları ve genel “nasıl oynanır” içerikleriydi. Niyet, uygulamayı açmış veya indirmeyi değerlendiren kullanıcının kısa ve ekran terimleriyle eşleşen başlangıç yardımıdır.
- **Ölçüm sınırı:** Arama hacmi, zorluk, trafik veya sıralama sayısı ölçülmedi ve metinlerde böyle bir sayı kullanılmadı. Yayın öncesi Search Console/anahtar kelime aracı verisi oluşursa başlık/slug değil, öncelikle açıklama ve soru dili gözden geçirilmeli.

## Yerel kararlar

| Alan | English | Türkçe |
| --- | --- | --- |
| Slug | `how-to-play-rockimals` | `rockimals-nasil-oynanir` |
| H1 | How to Play Rockimals: Meet Your First Space Visitor | Rockimals Nasıl Oynanır? İlk Uzay Ziyaretçinle Tanış |
| Ana ifade | `how to play Rockimals` | `Rockimals nasıl oynanır` |
| Pazar varsayımı | GB English; verified GB App Store listing | Türkiye Türkçesi; aynı iOS ürün akışı |
| Görsel alt metni | Niko and Enoli orbiting a simple Radar graphic in a Rockimals space scene | Rockimals uzay sahnesinde sade Radar halkalarının çevresindeki Niko ve Enoli |
| CTA | Download Rockimals free on the App Store | Rockimals’ı App Store’dan ücretsiz indirin |

## İçerik ve ürün sınırları

1. Radar başlangıç ekranıdır; kullanıcı sürükleyebilir, yakınlaştırabilir ve bir ziyaretçiye dokunabilir.
2. Bilgi kartındaki asteroid adı/tanımı, boyut, yaklaşma mesafesi ve hız gibi ölçüler gerçek uzay verisine dayanır. Hayvan eşlemesi, karakter adı ve hikâye kurgudur.
3. Canlı 1.3.0 mağaza kaydı sekiz kahraman ve kahraman başına beş bölüm söyler. Açılan bölümler Hikâye kitaplığında kalır.
4. Ücretsiz kullanım bir yeni hikâye/gün sunar; Plus o günkü tüm yeni kahraman hikâyelerini açar. Bu, her gün yeni kurgu üretildiği anlamına gelmez.
5. Çevrimdışında paketli hikâyeler ve örnek gökyüzü kullanılabilir; güncel gökyüzü sonucu varmış gibi anlatılmaz.
6. Android kamuya açık mağaza durumu doğrulanmadığı için makale yalnızca doğrulanmış App Store CTA'sını kullanır.
7. Rockimals bağımsızdır; NASA ile bağlantı veya NASA onayı iddiası yoktur.

## Kaynaklar ve görseller

- Apple App Store / Lookup, 2026-09-22: sürüm 1.3.0, yayın 2026-09-19, ürün akışı, ücretsiz/Plus ve offline sınırları.
- NASA/JPL CNEOS close-approach kaydı, 2026-09-22: gerçek nesne adları ile yaklaşma tarihi/mesafesi/hızı için birincil kaynak.
- Rockimals gizlilik politikası, yürürlük 2026-09-19: reklamsız/hesapsız ürün ve teknik veri işleme sınırı.
- Ortak kapak: `/assets/rockimals-blog/rockimals-getting-started/cover.jpg`, metinsiz, 1200×630.
- Gerekli ekranlar: `/assets/products/rockimals-preview/en/01-radar-home.jpg`, `/en/04-meet-card.jpg`, `/tr/01-radar-home.jpg`, `/tr/04-meet-card.jpg`. Bu spec'te kapak kullanılır; ekranlar sonraki deneyim modülü entegrasyonunda yalnızca aynı dille eşleştirilir.

## CTA ve ilgili içerik

- Tek CTA, doğrulanmış GB App Store ürün sayfasına yönlenecek `app-store` kimliğidir. Kampanya token'ı veya deep link yoktur.
- `relatedPosts` iki dilde de boştur. Konu 15/28 taslakları tamamlanmadan gerçek bağlantı gibi gösterilmez.

## İnceleme kaydı

- **Olgusal ürün incelemesi:** tamamlandı; 1.3.0 mağaza metni ve 026 referansıyla eşleşiyor.
- **Bilim/kurgu sınırı:** tamamlandı; NASA/JPL verisi ile karakter/hikâye kurgusu açıkça ayrıldı.
- **English anlam/terim incelemesi:** tamamlandı; `Radar`, `Story library`, `Earth Shield`, `Rockimals Plus` uygulama kaynaklarıyla eşleşiyor.
- **Türkçe anlam/terim incelemesi:** tamamlandı; `Radar`, `Hikâye kitaplığı`, `Dünya Kalkanı`, `Rockimals Plus` uygulama kaynaklarıyla eşleşiyor; metin doğrudan uyarlama olarak yazıldı.
- **Açık yayın maddesi:** Bağımsız editoryal onay ve kalan altı dil tamamlanmadı. Bu nedenle iki kaynak `draft: true`, yayın tarihi placeholder ve kamu paketi kapalıdır.

Çözülmemiş olgusal veya EN/TR terim sorunu yoktur. Canlı ürün ya da arama sonuçları değişirse sürüm/tarih ve niyet incelemesi yayın öncesi yenilenmelidir.

## Spec 028 — kalan altı dilin arama ve yerelleştirme kaydı

22 Eylül 2026'da marka adı ile yerel “nasıl oynanır”/Radar ifadelerini birleştiren sorgular örneklendi. Altı dilde de Rockimals'a ait indekslenmiş bir başlangıç rehberi bulunmadı; sonuçlar başka oyunların Radar özelliklerine, oyuncak kılavuzlarına veya ilgisiz marka benzerliklerine kaydı. Bu gözlem yalnızca niyet ve kelime seçimine yön verir; arama hacmi, zorluk ya da sıralama ölçümü değildir.

| Locale / pazar varsayımı | Örneklenen yerel ifade | Başlık / slug kararı | Uygulama terimleri | İnceleme durumu |
| --- | --- | --- | --- | --- |
| `ja` / Japonya | `Rockimals 遊び方 レーダー` | `Rockimalsの遊び方：はじめての宇宙の訪問者に会おう` / `rockimals-no-asobikata` | `レーダー`, `おはなしライブラリー`, `地球シールド`, `大人の人に聞いてね 🔭` | Anlam/ARB/karakter kontrolü tamam; bağımsız ana dili editörü bekleniyor. |
| `ko` / Güney Kore | `Rockimals 플레이 방법 레이더` | `Rockimals 플레이 방법: 첫 우주 방문자를 만나 보세요` / `rockimals-play-guide` | `레이더`, `이야기 도서관`, `지구 방패`, `어른에게 부탁해요 🔭` | Anlam/ARB/karakter kontrolü tamam; bağımsız ana dili editörü bekleniyor. |
| `zh-Hans` / Basitleştirilmiş Çince okuru | `Rockimals 怎么玩 雷达` | `Rockimals怎么玩：认识你的第一位太空访客` / `rockimals-zenme-wan` | `雷达`, `故事书库`, `地球护盾`, `请大人帮忙 🔭` | Anlam/ARB/karakter kontrolü tamam; bağımsız ana dili editörü bekleniyor. Ana kara Çin trafik/mağaza erişimi varsayılmıyor. |
| `fr` / Fransa | `comment jouer à Rockimals radar` | `Comment jouer à Rockimals : rencontrez votre premier visiteur spatial` / `comment-jouer-a-rockimals` | `Radar`, `Bibliothèque d’histoires`, `Bouclier terrestre`, `Demande à un adulte 🔭` | Anlam/ARB ve uzun başlık/CTA kontrolü tamam; bağımsız ana dili editörü bekleniyor. |
| `de` / Almanya | `wie spielt man Rockimals Radar` | `So spielst du Rockimals: Triff deinen ersten Weltraumbesucher` / `rockimals-spielen-erster-weltraumbesucher` | `Radar`, `Geschichtenbibliothek`, `Erdschild`, `Frag einen Erwachsenen 🔭` | Anlam/ARB ve birleşik sözcük/satır kırılımı kontrolü tamam; bağımsız ana dili editörü bekleniyor. |
| `es` / İspanya | `cómo jugar a Rockimals radar` | `Cómo jugar a Rockimals: conoce a tu primer visitante espacial` / `como-jugar-a-rockimals` | `Radar`, `Biblioteca de historias`, `Escudo terrestre`, `Pide ayuda a un adulto 🔭` | Anlam/ARB ve başlık/CTA kontrolü tamam; bağımsız ana dili editörü bekleniyor. |

### Yerelleştirme kararları

- İngilizce kaynakta yer alan dört adımlı ilk oturum, bilim/kurgu ayrımı, ücretsiz/Plus sınırı, teknik veri notu, yaş ayrımı ve 1.3.0 sürüm notu altı dilde korundu; yeni ürün veya öğrenme iddiası eklenmedi.
- Kahraman adı `Niko` çevrilmedi. Tür adı yalnızca açıklama cümlesinde yerel dilde kullanıldı.
- Japonca, Korece ve Basitleştirilmiş Çince metinlerde yerel noktalama kullanıldı; bozuk/değiştirme karakteri taraması yapıldı. Başlıklar ile Radar deneyim kutuları gerçek şablonda incelendi.
- Fransızca, Almanca ve İspanyolca uzun başlık/CTA metinleri masaüstü şablonda incelendi; dar ekran taşma korumaları depo testleriyle doğrulandı.
- Her kaynak aynı metinsiz kapağı kullanır. Taslak önizleme, `assets/products/rockimals-preview/{locale}/01-radar-home.jpg` yolundaki aynı dil 1.3.0 ekranını kullanır; İngilizce ekran fallback'i yoktur.
- Altı yeni kaynağın `relatedPosts` alanı boştur. Konu 15/28 aynı dilde yayımlanmadan bağlantı eklenmez.

### Sekizli envanter ve yayın durumu

`en`, `tr`, `ja`, `ko`, `zh-Hans`, `fr`, `de`, `es` kaynaklarının tamamı `rockimals-getting-started` altında mevcuttur. Sekiz dosyanın da `draft: true`, placeholder yayın tarihi, `reviewedAppVersion: "1.3.0"`, ortak kategori/görsel ve yerelleştirilmiş slug/metadata/CTA değerleri vardır.

Olgusal veya uygulama terminolojisi açısından açık bir çelişki bulunmuyor. Ancak altı yeni dil için bağımsız ana dili editörü onayı yapılmadı; bu durum yayın engelidir ve tamamlanmış native review olarak sunulmaz. Nihai sekizli render, link ve metadata kontrolü Spec 034 kapsamındadır.
