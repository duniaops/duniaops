# Rockimals için günlük "Bugünün ziyaretçileri" sayfası

**Type:** Feature
**Priority:** P1 — Rockimals 1.4.0 büyüme işinin (Rockimals spec 108) parçası.
**Risk:** Medium
**Status:** Uygulandı ve 2026-09-24'te yayına alındı; günlük yenileme ve NASA anahtarı aynı gün devreye girdi. Açık kalan tek madde çevirilerin gözden geçirilmesi (AC6).
**Depends on:** [035 — Smart App Banner, döngü, mağaza bağlantısı](035-rockimals-smart-banner-hero-loop-and-store-links.md).
**Kaynak:** Rockimals deposu [spec 120](../../rockimals/specs/120-daily-todays-rockimals-web-page.md). Sahip 2026-09-24'te "boyuna göre kahraman" seçeneğini onayladı.

## Description

`rockimals.duniaops.com/today` ve `/<dil>/today` adresleri, NASA'nın o UTC gününe ait gerçek yakın geçişlerini gösterir. Sayfa sekiz dilde sunucuda üretilir ve betik olmadan da çalışır; tek betik kahraman döngülerini oynatır. Her ziyaretçi, gerçek boyutunun karşılık geldiği Rockimals kahramanıyla gösterilir: 60 m'lik bir kaya Kito olur. Sayfa her gün yeniden derlenir ve App Store'a yönlendirir.

## Scope

- **Adresler.**
  - İngilizce `/today`; `/en/today` buraya 301 ile yönlenir, blogdaki düzenle aynı.
  - Diğer diller: `/tr/today`, `/ja/today`, `/ko/today`, `/zh-Hans/today`, `/fr/today`, `/de/today`, `/es/today`.
  - Dosyalar `dist/products/rockimals-today/<dil>/index.html` altında durur. Yalnızca Rockimals alan adına yazılmış yönlendirmelerle sunulur; kurallar hem `_redirects` hem `netlify.toml` içindedir.
- **Veri.** `scripts/build-rockimals-today.mjs` NeoWs'tan o günün listesini derleme sırasında okur:
  - Anahtar `NASA_API_KEY` derleme ortam değişkeninden gelir; yoksa `DEMO_KEY` kullanılır.
  - Yalnızca türetilmiş alanlar saklanır. NeoWs'un `links` alanı anahtarı içerdiği için hiç okunmaz.
  - Yazılan her dosya `api_key`, `DEMO_KEY` ve anahtarın kendisi için taranır; bulunursa derleme durur.
  - NASA'dan yalnızca Netlify'da ya da `ROCKIMALS_TODAY_FETCH=1` ile okunur. Yerel derlemeler ve `npm test` kayıtlı örnek veriyi kullanır.
- **Yedek.** NeoWs'a ulaşılamazsa:
  1. önce canlı sitenin son yayınladığı `…/rockimals-today/data.json` kullanılır;
  2. o da yoksa `content/rockimals-today/seed.json` kullanılır.

  Liste bugüne ait değilse sayfa bunu söyler ("Elimizdeki en güncel liste bu…"). Boş sayfa yayınlanmaz.
- **Uygulamayla eşleşme (AC2, sahibin kararıyla).** Aşağıdakiler uygulamanın dizesi ve formülüyle birebir aynıdır:
  - boyut basamağı: `kAnimals`, en büyük tahmini çap;
  - kahraman adı ve türü: `critterName`, ad kalıbı dahil;
  - gündelik boyut karşılaştırması;
  - Ay'a göre uzaklık: `%7`, `1,3×`, `12×`, dile göre ondalık ayırıcıyla;
  - "yakın geçiş" etiketi: NASA işareti ya da Ay'dan yakın;
  - hız ve uçak karşılaştırması.

  Uygulama dizeleri `scripts/sync-rockimals-today-strings.mjs` ile `content/rockimals-today/app-strings.json` dosyasına kopyalanır. Sayfa, bir cihazın o kayaya atadığı kahramanla aynı olduğunu iddia etmez.
- **İçerik.**
  - Aynı boyuttaki ziyaretçiler tek kahraman kartında toplanır, en küçükten en büyüğe. Böylece aynı kahraman art arda tekrarlanmaz.
  - En fazla 12 ziyaretçi gösterilir. Daha fazlası varsa en yakın 12'si seçilir ve bu sayfada söylenir.
  - Her ziyaretçide Ay'a göre uzaklık, geçiş etiketi ve hız bulunur.
  - Resmî ad, genişlik, en yakın geçiş (UTC), km cinsinden uzaklık ve NASA/JPL bağlantısı yalnızca "Büyükler için" bölümündedir.
  - Tehlike ya da tehdit dili hiçbir yerde kullanılmaz, meta açıklamaları dahil.
- **Dönüşüm ve SEO.**
  - Smart App Banner ve tek bir App Store rozeti. Kampanya adı `web_today_<dil>`, küçük harfle; `pt` ayarlanana kadar bağlantı kampanyasızdır.
  - Yerelleştirilmiş başlık ve açıklama, `canonical`, sekiz `hreflang` ile `x-default`.
  - Tarihli `<h1>` ve `WebPage` JSON-LD; `Event` işaretlemesi yoktur.
  - Rockimals site haritasına sekiz adres `changefreq daily` ile eklenir.
- **Bağlantı.** Açılış sayfası menüsüne sekiz dilde kısa bir "Bugün" bağlantısı eklenir ("Today", "Heute", "今日"…). Uzun etiket 1024 px'te Almanca menüyü iki satıra bölüyordu.
- **Açılış sayfası kartı (sahibin isteği, 2026-09-24).**
  - Neden: menü bağlantıları 960 px'ten dar ekranlarda gizli olduğu için telefonda ana sayfadan bu sayfaya gidilemiyordu.
  - Kart ilk bölümün hemen altında, blog kartının üstünde ve aynı bantta; her ekranda görünür. Telefonda ilk bölüm biter bitmez çıkar.
  - İçerik: üç kahraman küresi (fare, kaplan, balina), sayfanın başlığı ve "Bugünün ziyaretçilerini gör" bağlantısı.
  - Günün sayısı: `build-rockimals-today.mjs`, açılış sayfaları derlendikten sonra karttaki boş alana "Bugün 4 gerçek asteroit…" cümlesini yazar. Liste bugüne ait değilse kart yalnızca genel metni gösterir.
  - Kaynak `products/rockimals.html`'de bu alan boş kalır, böylece açılış derleyicisinin eşitlik denetimi bozulmaz.
- **Kahraman kartı (sahibin geri bildirimi, 2026-09-24).**
  - Küre kartın ortasında ve büyük: telefonda 260 px, genişliğin en çok %72'si.
  - Kürede sabit görsel yerine kahramanın onaylı döngüsü (spec 116) oynar. Döngüler `assets/products/rockimals-heroes/loops/<hayvan>.{webm,mp4,webp}` altındadır: 480 px, WebM 29–152 KB, MP4 42–177 KB, poster döngünün ilk karesi.
  - Videolar `preload="none"` ile yüklenir. Küçük bir betik (`js/rockimals-today.js`) videoyu yalnızca ekrandayken oynatır; `prefers-reduced-motion: reduce` açıksa hiç oynatmaz. Betik yoksa poster görünür.
  - Geniş ekranda kartlar yan yana dizilir (1280 px'te üç sütun).
  - İlk sürümdeki 240 px sabit küre görselleri kaldırıldı.
- **Günlük yenileme.** Netlify zamanlanmış fonksiyonu `netlify/functions/rockimals-today-rebuild.mjs`, her gün 00:20 UTC'de sitenin kendi build hook'unu çağırır.
  - Yalnızca yayındaki sürümde çalışır.
  - `ROCKIMALS_TODAY_BUILD_HOOK` tanımlı değilse ya da Netlify build hook adresi değilse hiçbir şey yapmaz. Adres günlüğe yazılmaz.
  - İlk sürümde bu iş için bir GitHub Actions iş akışı vardı. Organizasyonda Actions kapalı olduğu için sahibin tercihiyle (2026-09-24) Netlify'a taşındı ve iş akışı kaldırıldı.
- **Denetimler.**
  - `check-dist.mjs` yeni adresleri, zorunlu dosyaları ve yönlendirme kurallarını tanır.
  - `tests/rockimals-today.test.mjs` şunları sınar: boyut basamakları, Ay ve hız biçimleri, anahtar sızıntısı, en fazla 12 ziyaretçi sınırı, gruplama, sayfada yalnızca döngü betiğinin bulunması, eski liste uyarısı, resmî adın yalnızca büyükler bölümünde olması.

## Acceptance Criteria

- [x] **AC1:** Sekiz dilde sayfa var; betik olmadan çalışıyor (döngüler posterde kalır) ve resmî ad yalnızca büyükler bölümünde.
- [x] **AC2:** Tür, boyut karşılaştırması, Ay etiketi ve geçiş etiketi uygulamanın boyut basamağı ve dizeleriyle aynı.
- [x] **AC3:** Banner, tek CTA, `hreflang`, `canonical` ve site haritası kaydı var.
- [x] **AC4:** Veri alınamazsa önceki liste bir uyarıyla gösterilir; boş sayfa yayınlanmaz.
- [x] **AC5:** Sayfa her gün yeniden derleniyor. 2026-09-24'te doğrulandı; ayrıntılar aşağıda, "Günlük yenileme doğrulaması" başlığında.
- [ ] **AC6:** tr, ja, ko, zh-Hans, fr, de ve es sayfa metinleri ana dili konuşan biri tarafından gözden geçirildi.

## Owner steps

Hepsi duniaops.com'un Netlify sitesinde; GitHub'da bir şey gerekmez.

1. **NASA anahtarı.** Site configuration → Environment variables → `NASA_API_KEY` = kayıtlı NASA anahtarı, "Builds" kapsamında. `DEMO_KEY` IP başına saatte 10 istekle sınırlı ve Netlify'ın paylaşılan IP'lerinde tükenebilir. Anahtar depoya hiçbir biçimde girmez.
2. **Build hook.** Site configuration → Build & deploy → Build hooks → `main` için "Rockimals today" adlı bir hook oluştur.
3. **Hook değişkeni.** Environment variables → `ROCKIMALS_TODAY_BUILD_HOOK` = hook adresi, "Functions" kapsamında. Değişkenler dağıtım anında sabitlendiği için bundan sonra bir kez yeniden yayınla (Deploys → Trigger deploy).
4. **Deneme.** Functions → `rockimals-today-rebuild` → "Run now". Yeni bir derleme başlamalı ve günlüğünde `Rockimals today: N visitors … from NeoWs` görünmeli.

## Validation

- `npm test` başarılı: 9 yeni test dahil, 260 yayın dosyası doğrulandı.
- `ROCKIMALS_TODAY_FETCH=1` ile NeoWs'tan gerçek veri çekildi: 2026-09-24 için 4 ziyaretçi. Çıktıda anahtar izi yok.
- Yerel sunucuda EN ve TR sayfaları masaüstünde ve 375 px'te kontrol edildi:
  - yatay kaydırma yok;
  - büyükler bölümü açılıyor;
  - Türkçe ondalık ve binlik ayırıcılar doğru.

## Yayın

`3077615`, sahibin onayıyla 2026-09-24'te `origin/main`'e gönderildi ve Netlify yaklaşık 20 saniyede yayınladı. Canlıda `curl` ile kontrol edildi:

- `/today`, `/tr/today`, `/ja/today` ve `/zh-Hans/today` 200 döndürüyor; sayfalarda 3 kahraman grubu ve Smart App Banner var, anahtar izi yok.
- `/en/today`, `/today` adresine 301 ile yönleniyor. `/xx/today` 404 döndürüyor.
- `data.json`, 2026-09-24 için 4 ziyaretçi içeriyor. `generatedAt` alanı Netlify derlemesine ait; yani derleme NeoWs'tan `DEMO_KEY` ile canlı okudu.
- Site haritasında sekiz `today` adresi var, açılış sayfasında "Today" bağlantısı görünüyor.

## Günlük yenileme doğrulaması (2026-09-24)

- Sahip `NASA_API_KEY`, "Rockimals today" build hook'unu ve `ROCKIMALS_TODAY_BUILD_HOOK` değişkenini ekleyip siteyi yeniden yayınladı.
- Functions sayfasında `rockimals-today-rebuild` "Scheduled" durumunda. Bir sonraki çalışma 2026-09-25 00:20 UTC.
- "Run now" ile elle çalıştırıldı; fonksiyon günlüğü: `Rockimals today rebuild requested: HTTP 200`.
- Tetiklenen `rockimals-today` derlemesi yayınlandı. Derleme günlüğü: `Rockimals today: 4 visitors for 2026-09-24 from NeoWs.` Satırda "DEMO_KEY" yok; yani kayıtlı anahtar kullanılıyor.

## Out of Scope

- Geçmiş günlerin arşiv sayfaları.
- Sosyal paylaşım kartları.
- Sunucu tarafında herkese açık bir Supabase uç noktası: sahibin kararıyla gerekmedi.
