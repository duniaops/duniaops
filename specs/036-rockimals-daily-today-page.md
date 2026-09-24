# Rockimals için günlük "Bugünün ziyaretçileri" sayfası

**Type:** Feature
**Priority:** P1 — Rockimals 1.4.0 büyüme işinin (Rockimals spec 108) parçası.
**Risk:** Medium
**Status:** Uygulandı, yayına alınmadı (2026-09-24). Yayın ve günlük tetikleme sahibin adımlarını bekliyor (aşağıda).
**Depends on:** [035 — Smart App Banner, döngü, mağaza bağlantısı](035-rockimals-smart-banner-hero-loop-and-store-links.md).
**Kaynak:** Rockimals deposu [spec 120](../../rockimals/specs/120-daily-todays-rockimals-web-page.md). Sahip 2026-09-24'te "boyuna göre kahraman" seçeneğini onayladı.

## Description

`rockimals.duniaops.com/today` ve `/<dil>/today` adresleri, NASA'nın o UTC gününe ait gerçek yakın geçişlerini gösterir. Sayfa sekiz dilde, betik kullanmadan sunucuda üretilir. Her ziyaretçi, gerçek boyutunun karşılık geldiği Rockimals kahramanıyla gösterilir: 60 m'lik bir kaya Kito olur. Sayfa her gün yeniden derlenir ve App Store'a yönlendirir.

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
- **Görseller.** Sekiz kahraman küresi `assets/products/rockimals-heroes/<hayvan>.webp` olarak eklenir: uygulamanın `transparent` sanatından 240 px, her biri 13–21 KB.
- **Günlük yenileme.** `.github/workflows/rockimals-today.yml` her gün 00:20 UTC'de bir Netlify build hook'unu çağırır. Gizli değer tanımlı değilse hiçbir şey yapmaz.
- **Denetimler.**
  - `check-dist.mjs` yeni adresleri, zorunlu dosyaları ve yönlendirme kurallarını tanır.
  - `tests/rockimals-today.test.mjs` şunları sınar: boyut basamakları, Ay ve hız biçimleri, anahtar sızıntısı, en fazla 12 ziyaretçi sınırı, gruplama, betiksiz sayfa, eski liste uyarısı, resmî adın yalnızca büyükler bölümünde olması.

## Acceptance Criteria

- [x] **AC1:** Sekiz dilde sayfa var; betik olmadan çalışıyor ve resmî ad yalnızca büyükler bölümünde.
- [x] **AC2:** Tür, boyut karşılaştırması, Ay etiketi ve geçiş etiketi uygulamanın boyut basamağı ve dizeleriyle aynı.
- [x] **AC3:** Banner, tek CTA, `hreflang`, `canonical` ve site haritası kaydı var.
- [x] **AC4:** Veri alınamazsa önceki liste bir uyarıyla gösterilir; boş sayfa yayınlanmaz.
- [ ] **AC5:** Sayfa her gün yeniden derleniyor. Bunun için sahibin adımları gerekiyor.
- [ ] **AC6:** tr, ja, ko, zh-Hans, fr, de ve es sayfa metinleri ana dili konuşan biri tarafından gözden geçirildi.

## Owner steps

1. **NASA anahtarı.** Netlify → Site configuration → Environment variables: `NASA_API_KEY` = kayıtlı NASA anahtarı, derleme kapsamında. `DEMO_KEY` IP başına saatte 10 istekle sınırlı ve Netlify'ın paylaşılan IP'lerinde tükenebilir. Anahtar depoya hiçbir biçimde girmez.
2. **Build hook.** Netlify → Build & deploy → Build hooks: `main` için "Rockimals today" adlı bir hook oluştur.
3. **GitHub gizli değeri.** GitHub → Settings → Secrets and variables → Actions: `NETLIFY_ROCKIMALS_TODAY_BUILD_HOOK` = hook adresi.
4. **Deneme.** Actions sekmesinden "Rockimals today page" iş akışını bir kez elle çalıştır. Derleme günlüğünde `Rockimals today: N visitors … from NeoWs` satırını gör.

## Validation

- `npm test` başarılı: 9 yeni test dahil, 260 yayın dosyası doğrulandı.
- `ROCKIMALS_TODAY_FETCH=1` ile NeoWs'tan gerçek veri çekildi: 2026-09-24 için 4 ziyaretçi. Çıktıda anahtar izi yok.
- Yerel sunucuda EN ve TR sayfaları masaüstünde ve 375 px'te kontrol edildi:
  - yatay kaydırma yok;
  - büyükler bölümü açılıyor;
  - Türkçe ondalık ve binlik ayırıcılar doğru.

## Out of Scope

- Geçmiş günlerin arşiv sayfaları.
- Sosyal paylaşım kartları.
- Sunucu tarafında herkese açık bir Supabase uç noktası: sahibin kararıyla gerekmedi.
