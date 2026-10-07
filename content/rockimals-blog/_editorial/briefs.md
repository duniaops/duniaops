# Rockimals blog: 01, 15 ve 28 için ortak editoryal brief

Bu belge 027–032 arasındaki içerik işlerinin ortak başlangıç noktasıdır. Ürün ve terim ayrıntılarında [`product-reference.json`](./product-reference.json), görsel seçiminde [`asset-manifest.json`](./asset-manifest.json) esas alınır. Konu 28'in güncel kaynak ve sürüm kararı [konuya özel brief'tedir](./rockimals-parent-controls-brief.md); konu 01/15'in 1.3.0 kaynak notları tarihsel yayın kayıtlarıdır.

## Kanıt sırası ve yayın kuralları

1. Canlı ürün iddialarında yazının kendi inceleme tarihindeki GB App Store kaydı, canlı gizlilik politikası ve destek sayfası kullanılır. Konu 28 için 5 Ekim 2026'da 1.4.0 doğrulandı.
2. Oyun deposunun `04a455d878dee4851e4e1857181ceabd9ea2f21b` commit'indeki 1.4.0+39 durumu tarihli geliştirme kanıtıdır. Canlı sürümde ayrıca doğrulanmayan bir davranış bu kaynaktan yayın iddiasına dönüştürülmez.
3. Kullanıcıya görünen kahraman adları Niko, Tavi, Barney, Kito, Pofi, Bobo, Ciko ve Enoli'dir. Katalogtaki eski/teknik sezon, fixture veya seri kimlikleri yazıya taşınmaz.
4. Uygulama içi oyun ve ekran adları her dilde ARB kaynağındaki karşılığıyla yazılır. Özel kahraman adları değişmez; tür adları yerelleştirilir.
5. NASA verisi ile hayvan karakter/hikâye kurgusu ayrılır. Rockimals'ın NASA ile bağlantılı veya NASA tarafından onaylanmış olduğu söylenmez.
6. `4+` mağaza derecelendirmesidir; 6–8 yaş ise bu içerik programının ebeveyn/öğretmen hedefidir. Birini diğerinin kanıtı olarak kullanma.
7. Android kamuya açık mağaza durumu doğrulanana kadar mağaza bağlantısı veya “Android'de yayında” ifadesi ekleme.
8. Üç konunun ilk 13 haftadaki sırası değişmez: hafta 1 konu 01, hafta 2 konu 15, hafta 3 konu 28.

## Ortak brief alanları

Her dil paketi aşağıdaki alanları tamamlamalıdır:

- `translationKey`, kategori ve yerelleştirilmiş slug
- hedef okuyucu, ülke/pazar varsayımı ve tek ana soru
- doğrulanan arama niyeti; hacim/sıralama sayısı yalnızca gerçek araç kanıtıyla
- kısa cevap, özgün açı ve kapsam dışı bırakılan komşu sorular
- kullanılacak ürün/bilim kaynakları ve inceleme tarihleri
- ortak kapak, gerekli yerelleştirilmiş ekranlar ve yerel alt metin
- tek somut CTA ve yalnızca yayımlanmış ilgili içerikler
- İnceleme tarihinde doğrulanan `reviewedAppVersion`, anlam/terim inceleme durumu ve açık maddeler

## Konu 01 — Rockimals nasıl oynanır?

- **Sıra / kimlik:** hafta 1, `01`, önerilen `translationKey`: `rockimals-getting-started`.
- **Kategori:** `discover-game`.
- **Başlangıç niyeti:** `how to play Rockimals`; ürünü ilk kez değerlendiren ebeveyn ve ilk kez açan oyuncu.
- **Tek soru:** Radar'da bir ziyaretçi nasıl bulunur, bilgi kartı nasıl açılır ve hikâyeye nasıl geçilir?
- **Doğrudan cevap akışı:** Radar'ı tanı → bir ziyaretçiye dokun → gerçek ölçüler ile kurgu karakteri ayır → hikâyeyi aç → uygun bir sonraki oyun adımını öner.
- **Ürün sınırı:** 1.3.0 mağaza metnindeki sekiz kahraman, beş bölüm, günlük hikâye hakkı ve kalıcı Story Library davranışını kullan. 1.4.0 indirme paketlerini canlı davranış gibi anlatma.
- **Görsel paketi:** metinsiz Radar kapağı; içerikte okurun diliyle eşleşen `01-radar-home.jpg` ve gerekirse `04-meet-card.jpg`. Portreyi yatay uzatma veya başka dil ekranı kullanma.
- **CTA yönü:** ebeveyne Rockimals'ı ücretsiz indirme ve uygulamada Radar'dan bir ziyaretçiyle tanışma çağrısı. Desteklenmeyen deep link yazma.
- **Kapsam dışı:** bütün oyunların özellik turu, Plus'ın tam fiyat/özellik karşılaştırması ve ayrıntılı hikâye açma rehberi.

## Konu 15 — Asteroit nedir?

- **Sıra / kimlik:** hafta 2, `15`, önerilen `translationKey`: `what-is-an-asteroid-for-kids`.
- **Kategori:** `learn-space`.
- **Başlangıç niyeti:** `what is an asteroid for kids`; markayı bilmeyen aile için uygulamadan bağımsız yarar.
- **Tek soru:** Asteroit nedir ve çocuklara boyut/konum üzerinden nasıl doğru anlatılır?
- **Doğrudan cevap akışı:** basit tanım → kaya/metal ve Güneş yörüngesi → farklı boyut/şekiller → bir yakın geçiş örneği → oyundaki hayvanın kurgu olduğunu açıkça ayır.
- **Bilim kaynakları:** NASA Space Place `https://spaceplace.nasa.gov/asteroid/en/` ve NASA Science `https://science.nasa.gov/solar-system/asteroids/facts/`; metin üretiminde sayfalar yeniden tarihli incelenmeli.
- **Görsel paketi:** metinsiz küçük/büyük karakter karşılaştırma kapağı; ürüne bağlanan bölümde okurun diliyle eşleşen `04-meet-card.jpg`. Ekrandaki hayvan/ölçek benzetmesini gerçek asteroid fotoğrafı diye sunma.
- **CTA yönü:** Radar'da bir ziyaretçinin bilgi kartındaki gerçek adı, boyutu, mesafesi ve hızını inceleme.
- **Kapsam dışı:** meteor/kuyruklu yıldız karşılaştırmasının tamamı, NASA onayı, doğrulanmamış öğrenme sonucu.

## Konu 28 — Reklam, hesap ve ebeveyn kontrolü

- **Sıra / kimlik:** hafta 3, `28`, önerilen `translationKey`: `rockimals-parent-controls`.
- **Güncel karar:** 5 Ekim 2026'da doğrulanan iOS 1.4.0 ve 25 Eylül yürürlüklü gizlilik politikası için [konuya özel brief](./rockimals-parent-controls-brief.md) kullanılır.
- **Kategori:** `family-guide`.
- **Başlangıç niyeti:** `Rockimals ads parental controls`; indirme kararını veren ebeveyn.
- **Tek soru:** Rockimals'ta reklam/hesap var mı, hangi eylemler ebeveyn kapısında ve hangi teknik veriler işleniyor?
- **Doğrudan cevap akışı:** reklamsız ve çocuk hesabı yok → satın alma/dış bağlantı/hatırlatıcı ebeveyn kapısı → teknik veri kategorileri → Plus ve restore/cancel sınırı → güncel politika/destek bağlantıları.
- **Ürün sınırı:** “hiç veri toplanmaz”, “tamamen güvenli” veya mevzuata uyum garantisi yazma. Gizlilik kaydındaki pseudonymous installation, integrity, platform/language/time-zone, entitlement ve isteğe bağlı bildirim verilerini sade dille açıkla.
- **Görsel paketi:** metinsiz kalkan/kilit kapağı. Güncel yerelleştirilmiş parent-gate/settings ekranı bulunmadığından sahte arayüz üretme; gerçek ekran gerekirse 031/032'yi açık görsel ihtiyacıyla bırak.
- **CTA yönü:** ebeveynin güncel mağaza koşullarını görmesi; uygun yerde canlı gizlilik ve destek sayfası.
- **Kapsam dışı:** hukuk görüşü, mutlak güvenlik iddiası, Android'in tüm ülke ve cihazlarda erişilebilir olduğu varsayımı.

## Güncel mağaza kanıtı

- Kamuya açık Google Play kaydı 7 Ekim 2026'da [resmî paket sayfasında](https://play.google.com/store/apps/details?id=com.duniaops.rockimals) doğrulandı; ülke ve cihaz kapsamı ayrıca varsayılmaz.

## Açık kanıt maddeleri
- Canlı landing'in structured data alanında iOS 13.0 yazarken App Store 1.3.0 kaydı iOS 15.0 gerektiriyor; yazılarda mağaza değeri kullanılmalı.
- Konu 28 için güncel ve sekiz dilde parent-gate/settings ekranı yok. Mevcut kapak gerçek karakter varlıklarıyla hazırlanmış editoryal kompozisyondur, uygulama ekranı değildir.
- Konu 01/15'in 1.3.0 kaynak notları sonraki sürümlere otomatik kanıt sayılmaz; konu 28'in 1.4.0 olguları kendi tarihli kaynaklarıyla doğrulanır.

Bu maddeler çözülmeden ilgili iddialar “incelendi/tamamlandı” sayılmaz; brief içinde açık tutulur.
