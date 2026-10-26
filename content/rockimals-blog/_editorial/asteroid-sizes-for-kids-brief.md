# Konu 17 brief — Asteroitler ne kadar büyük?

- **Hazırlık tarihi:** 23 Ekim 2026, Europe/London.
- **Durum:** Sekiz dilde tamamlanmış **özel taslak**; `draft: true`, `published/updated: 2099-01-01T10:00:00Z`. Canlı yayın ve deploy yapılmadı; hazırlık paketi ayrı commit/push olarak saklanır.
- **Plan sırası:** `docs/rockimals-blog-plani-2026-09-22.md` konu 17; konu 29'dan sonraki aday. 26 Ekim Pazartesi otomatik yayın temiz-ağaç kapısında durdu; sonraki yayın yine haftalık runbook koşullarına bağlıdır.
- **Translation key:** `asteroid-sizes-for-kids`; kategori `learn-space`, fakat sürüme bağlı boyut eşlemesi içerdiği için `productGuide: true`, `reviewedAppVersion: "1.5.1"`.

## Okuyucu sorusu ve özgün yaklaşım

Çocuğuyla “asteroit ne kadar büyük olabilir?” sorusuna yanıt arayan aile. Yazı, uygulama olmadan da çap–mesafe farkını, 12 m otobüs / 100 m saha / 1 km karşılaştırmasını, kâğıt ölçek etkinliğini ve boyut tahminindeki belirsizliği açıklar. Önceki konu 15 tanım ve Dünya'ya yaklaşma mesafesini, konu 16 asteroit–meteor–kuyruklu yıldız farkını ele alır; bu yazı ayrı olarak **boyutun ölçeklenmesi ve tahminin sınırları** üzerine kurulur. İlgili bağlantılar yalnızca canlı konu 15 ve 16'ya gider.

## Bilimsel kaynak ve iddia sınırı

23 Ekim 2026'da kontrol edilen birincil kaynaklar:

- [NASA Science: Asteroid Facts](https://science.nasa.gov/solar-system/asteroids/facts/) — 10 metrenin altından yüzlerce kilometreye boyut çeşitliliği ve düzensiz şekiller.
- [NASA/JPL CNEOS: Asteroid Size Estimator](https://cneos.jpl.nasa.gov/tools/ast_size_est.html) — mutlak parlaklık ve varsayılan yansıtıcılıktan türetilen eşdeğer küre çapı; yansıtıcılık belirsizliği nedeniyle aralık. Yazı kesin çap, gerçek zamanlı olay veya çarpışma riski iddia etmez.
- [IFAB, Law 1: The Field of Play](https://www.theifab.com/laws/latest/the-field-of-play/) — uluslararası saha uzunluğu 100–110 m. Metindeki 100 m, yuvarlatılmış gündelik benzetmedir; her sahanın tam 100 m olduğu söylenmez.

12 m otobüs değeri oyunun boyut karşılaştırma referansından (`../rockimals/lib/features/detail/size_comparison.dart`), 105 m saha örneği de aynı yerden gelir; gerçek nesnelerin hepsi bu ölçüde değildir. 1 km = 1.000 m ve 1 cm = 10 m kâğıt ölçeğinden 12 m → 1,2 cm, 100 m → 10 cm, 1 km → 100 cm hesapları kontrol edildi. Kapak ve hayvanlar ölçekli astronomi diyagramı değildir.

## Ürün ve terminoloji denetimi

- İncelenen oyun deposu `../rockimals` HEAD `b59af17f64d3448198b5a58c4d663f4ad1124e2e`, `pubspec.yaml` sürümü `1.5.1+81` (23 Ekim 2026). Boyut basamakları `lib/core/animals/animal_system.dart` içindeki `kAnimals` ve `animalFor(a) => _rungFor(a.diaMax)` üzerinden doğrulandı. Üst sınırlar **hariç**: `<8`, `<20`, `<50`, `<120`, `<300`, `<800`, `<2000`, `≥2000` metre. Tam 8 m Tavi grubudur.
- **Kritik istisna:** `characterAnimalFor` ile atanmış hikâye karakteri farklı türde görünebilir; fiziksel boyut basamağı ve etiket `diaMax` üzerinden korunur. Sekiz taslakta tablo “varsayılan hayvan” eşlemesi olarak anlatılır, görüntülenen her karakter için kesin kural olarak değil.
- Yerel arayüz terimleri `content/rockimals-blog/_editorial/product-reference.json` ve oyunun `lib/l10n/app_*.arb` kaynaklarıyla eşleştirildi: Radar, Boyut Kulesi / Size Stack ve yedi diğer dildeki karşılıkları. Kahraman adları oyunla aynı Latin yazımıyla bırakıldı. Tür adları çevrildi.
- 23 Ekim kontrolünde iOS App Store 1.5.1 gösteriyordu; oyun kaynağındaki 1.5.1 etiketi ile canlı ikili dosyanın bire bir aynı commit olduğu bağımsız olarak kanıtlanmadı. Google Play'in herkese açık sürüm numarası doğrulanamadı; metin Android 1.5.1 varsaymıyor. **Yayın öncesi mağaza/sürüm ve uygulama ekranı yeniden kontrol edilmeli.**
- Gerçek Dünya'ya yakın ziyaretçi verileri ile kurgu hayvan/hikâye ayrımı ve NASA bağlantısı/onayı olmadığı bilgisi sekiz dilde yer alır. CTA mevcut `app-store` kimliğini kullanır; mağaza rozetleri şablon tarafından yönetilir.

## Görsel kökeni

Ortak metinsiz güncel kapak `assets/rockimals-blog/asteroid-sizes-for-kids/cover-v2.jpg`, 1200×630 JPEG, SHA-256 `aaa5625612d7bc158b93135aa08a9912138aea2bbe3342e187885aa6938992d6`. İlk kart denemesi çıkarıldı. Güncel kapak `scripts/render-rockimals-blog-editorial-assets.swift --asteroid-sizes-cover-only` ile tekrar üretilebilir. Kaynak arka plan herkese açık varlık klasöründe değil, `content/rockimals-blog/_editorial/asteroid-sizes-for-kids-cosmic-background.png` içinde (SHA-256 `21d1fc67cf94b22f2de4987cda3cdb9ea9f9ef15caefb084c112ad942bc5c40e`). Yerleşik imagegen ile 23 Ekim 2026'da üretildi: “1200×630 çocuk astronomisi blog kapağı için lacivert/indigo sinematik uzay, sıcak turuncu ışık, aşağıda Dünya ufku, yörünge izi ve farklı uzaklıklarda asteroidler; orta alan karakter birleştirmesi için açık; metin, karakter, UI ve gerçek ölçek iddiası yok.” **Arka plan betimsel kurgu, bilimsel ölçüm görseli değil.** Yapay zekâ ile yeni karakter üretilmedi; oyunun özgün şeffaf sprite'ları doğrudan birleştirildi:

- `../rockimals/assets/animals/transparent/mouse.webp` — Niko, SHA-256 `6b03964fcff9980aa3b2501018eb6afd183375d5e5dd8fd058681160dc35ad99`.
- `../rockimals/assets/animals/transparent/tiger.webp` — Kito, SHA-256 `56b9d20181053be12bd411686294a5d4365ddd0c92cc277cd91cc2120d2f5be1`.
- `../rockimals/assets/animals/transparent/dino.webp` — Ciko, SHA-256 `4732a85387611e4a018bc2c53831d2924b2c300a949f6b6e8371209bf5946bac`.
- `../rockimals/assets/animals/transparent/whale.webp` — Enoli, SHA-256 `e6e2a147b8229d8baf1c42b7d64e3c2d8776227fbc78793d10fb0505457f9a5c`.

Dört karakterin göreli görsel boyu gerçek asteroit çapını temsil etmez. Tüm `imageAlt` alanları bu sınırlamayı belirtir. Diğer editorial kapaklar değiştirilmemeli.

## Tanıtım videosu

Kullanıcının verdiği YouTube Studio kanal bağlantısı tek bir video belirtmiyordu. Oyun deposundaki `../rockimals/store/release-1.5.1-media.json` sekiz dilde 30 saniyelik promosyon filmlerinin kimliklerini içeriyor; 23 Ekim 2026'da YouTube oEmbed uç noktasında sekiz bağlantının da HTTP 200 verdiği ve başlıklarının doğru dile ait olduğu doğrulandı. Her dildeki özel taslağa o dilin filminin isteğe bağlı dış bağlantısı eklendi (TR `e_zLZgN3siA`, EN `5jBarTNJ2Xw`, DE `alJL9_kzrtE`, FR `KSlFR-_xREU`, ES `eNqIC5irhTo`, JA `zEUSdHT_X0M`, KO `dYjrGCG-deg`, ZH `n7tZyUYIa6A`). Video asteroit boyutu veya gerçek oyun kaydı için kanıt olarak sunulmaz; sayfa yüklenirken üçüncü taraf oynatıcı çağrılmaz. Yayın öncesinde videoların görünürlük ve paylaşım ayarı yeniden kontrol edilmeli.

## 26 Ekim yeniden kontrolü

- Sekiz yerel video bağlantısının YouTube oEmbed yanıtı yeniden HTTP 200 verdi; başlıklar ilgili dillerle eşleşti. Bu erişilebilirlik kontrolüdür, gelecekteki görünürlük garantisi değildir.
- Birleşik Krallık App Store sayfasında artık **1.5.2** canlı görünüyor. Oyun deposundaki 1.5.1 inceleme commit'i `b59af17f64d3448198b5a58c4d663f4ad1124e2e` ile 1.5.2 üretim hazırlığı commit'i `8bf9104` karşılaştırıldı: `lib/core/animals/animal_system.dart` ve `lib/features/detail/size_comparison.dart` değişmemiş; sekiz dildeki terim kaynaklarına yalnızca ilgisiz hikâye indirme metinleri eklenmiş. Bu, taslaktaki boyut eşlemesinin 1.5.2 kaynak paketinde korunduğunu doğrular; yayımdaki ikili dosyanın tam commit'i bağımsız kanıtlanmadı. Taslakların `reviewedAppVersion: "1.5.1"` alanı ve 23 Ekim tarihli kaynak notu tarihsel inceleme kaydını dürüstçe koruyor.
- Google Play listesi erişilebilir ve 21 Ekim güncellemesini gösteriyor; herkese açık görünümde kesin Android sürüm numarası bulunamadı. Taslakların Android sürümünü doğrulanmamış sayması hâlâ doğru.
- NASA Science, NASA/JPL CNEOS ve IFAB kaynak sayfaları erişilebilir. Kaynak dosyası denetimi ve özel önizleme geçti; `npm test` 26 Ekim'de başarılı oldu ve 48 yayımlanmış sayfa üretti. Konu 17'nin sekiz taslağı kamu build'ine girmedi.

## Açık yayın kapıları

- Sekiz dilin yazar düzeyinde sayı, tablo, karakter adı, kaynak, ürün terimi ve bilim/kurgu sınırı karşılaştırması tamamlandı. Bu, **bağımsız ana dil editörü veya bilim editörü onayı değildir**. Mümkünse yerel dil ve uygulama ekranı incelemesi alınmalı.
- 23 Ekim'de Türkçe özel taslak dar tarayıcı görünümünde başlık, yeni kapağın tam genişlikte ve kırpılmadan görünmesi, mağaza rozetleri ve sayfa içi bağlantılar gözle kontrol edildi; Türkçe video bağlantısı erişilebilirlik ağacında doğrulandı. Sekiz dilde özel önizleme HTML'inin yeni kapağı ve ilgili dilin videosunu içerdiği ayrıca kontrol edildi. Tablo için CSS `overflow-x: auto` koruması ve dar ekran testi var; yayın öncesi gerçek telefon ve diğer yedi dilin görsel/ana dil incelemesi yine gerekli.
- `npm run check:rockimals-blog` ve `npm run preview:rockimals-blog-drafts` 23 Ekim'de geçti: 56 kaynak, 6 yayımlanabilir konu, 8 özel taslak. Yeni görsel ve video bağlantıları eklendikten sonra `npm test` yeniden geçti: 48 canlı makale sayfası üretildi, yeni sekizli taslak kamu build'ine alınmadı; site bağlantı ve sitemap kontrolleri geçti. Npm'nin yerel `.npmrc` için gelecekteki sürüm uyumluluk uyarısı test sonucunu etkilemedi.
- Bir sonraki yayın ancak runbook'taki temiz ağaç/upstream, haftada yeni konu yok, sekiz dil hazır, mağaza ve Netlify erişimi koşullarıyla yapılır. Yayın anında yalnızca sekiz taslak dosyasının `draft/published/updated` alanları gerçek zamanla açılır; canlı URL, canonical, hreflang, sitemap doğrulanmadan başarı denmez.
- 26 Ekim otomatik çalışması, konu 17 hazırlık dosyalarıyla birlikte başka işlere ait `specs/` değişiklikleri de çalışma ağacında bulunduğu için temiz-ağaç kapısında durdu. SEO çalışması bu dosyaları daha sonra kendi commit'ine aldı; konu 17 hazırlığı bundan ayrı tutulmalı. 1.5.2 kaynak karşılaştırması tamamlandı; bağımsız yerel dil/görsel incelemesi veya canlı ikili dosya eşlemesi yapılmış gibi gösterme.
