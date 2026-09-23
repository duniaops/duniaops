# Rockimals sayfalarına Smart App Banner, kahraman döngüsü ve ülkeden bağımsız mağaza bağlantısı ekle

**Type:** Feature
**Priority:** P1 — Rockimals 1.4.0 büyüme işinin (Rockimals spec 108) parçası.
**Risk:** Medium
**Status:** Implemented and deployed on 2026-09-23 (aşağıdaki Completion Record)
**Depends on:** [025 — host/SEO/build](025-rockimals-blog-host-seo-build.md), [033 — CTA/ölçüm](033-rockimals-blog-conversion-measurement.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Kaynak:** Rockimals deposu [spec 119](../../rockimals/specs/119-web-hero-loops-smart-banner-and-creative-assets.md) ve onaylı kahraman döngüleri ([spec 116](../../rockimals/specs/116-produce-ai-hero-loops.md)).

## Description

Rockimals açılış ve blog sayfaları üç açıdan eksikti:

- Safari'de uygulamanın kendi "Aç / Al" bandı yoktu.
- Bütün CTA'lar Birleşik Krallık mağazasına gidiyordu.
- Açılış sayfasında kahramanlar yalnızca sabit görsellerdi.

Bu iş, sahibin onayladığı sekiz kahraman döngüsünü sayfaya getirir. Mağaza yönlendirmesini tek bir çözümleyicide toplar; bu çözümleyici 033'ün CTA sahipliğinin ilk parçasıdır.

## Scope

- **Smart App Banner.** Her Rockimals açılış sayfasının ve blog sayfasının (makale ve dizin) `<head>` bölümüne `<meta name="apple-itunes-app" content="app-id=6792505608">` eklenir. JavaScript yoktur, takip yoktur.
- **Mağaza bağlantısı.** `scripts/rockimals-blog-cta.mjs` tek kaynaktır:
  - Temel bağlantı `https://apps.apple.com/app/rockimals/id6792505608`'dir; ziyaretçi kendi ülkesinin mağazasına yönlenir.
  - `rockimalsAppStoreUrl(campaign)`, `ROCKIMALS_CAMPAIGN_PROVIDER` (App Store Connect sağlayıcı kimliği, `pt`) doldurulunca `pt` ve `ct` ekler.
  - Kampanya adları: açılışta `landing_<dil>`, blog makalesinde `blog_<dil>`.
  - `pt` boşken düz bağlantı kullanılır; token uydurulmaz.
- **Kahraman döngüsü.** Açılış sayfasına, blog öne çıkan kartından sonra "Kahramanlarla tanış" bölümü eklenir:
  - Sekiz kahramanın 5 saniyelik kesintisiz döngüsü: WebM (VP9, 441 KB), MP4 (H.264, 502 KB) ve poster (147 KB). Her biri 1,5 MB sınırının altında.
  - Video sessizdir ve sayfaya gömülü oynar. `preload="none"` ile yüklenir, genişlik ve yükseklik verilir, `aspect-ratio: 16/9` kullanılır; sayfa kaymaz.
  - `js/rockimals-landing.js` videoyu yalnızca görünür alandayken oynatır.
  - `prefers-reduced-motion: reduce` açıksa hiç oynatmaz; poster kalır.
  - Bölüm metni sekiz dilde `content/rockimals-landing/locales.json` içindedir.
- **Kayıt.** Blog kaynaklarındaki "UK App Store" kaynak atıfları olduğu gibi kalır: bunlar CTA değil, içerik kaynağıdır.

## Acceptance Criteria

- [x] **AC1:** Sekiz açılış sayfası, sekiz blog dizini ve bütün makale sayfaları Smart App Banner meta etiketini içerir.
- [x] **AC2:** Açılış ve blog CTA'ları ülkeden bağımsız bağlantıya gider. `pt` yapılandırılmamış olduğu için bağlantılar kampanyasızdır; bu durum aşağıda kayıtlıdır.
- [x] **AC3:** Kahraman döngüsü sessiz, gömülü ve bütçe içinde oynar. Posteri vardır, hareket azaltıldığında posterde kalır ve sayfa kaymaz.
- [ ] **AC4:** iPhone Safari'de band, video ve hareket azaltma elle kontrol edilir; yayına alma sahibindir.
- [ ] **AC5:** Yeni bölüm metinlerinin ja, ko, zh-Hans, fr, de ve es çevirileri ana dili konuşan biri tarafından gözden geçirilir.

## Validation

- `npm test`: sitenin kendi kontrolleri, derleme dahil.
- Yerel sunucuda (`scripts/serve-local.py`) masaüstü ve dar ekran görünümü.

## Out of Scope

- Ölçüm kaydı ve 4/8/13. hafta şablonları (033'te kalır).
- Yerelleştirilmiş App Store rozetleri: Apple'ın resmi rozet dosyaları indirilince ayrı iş.
- Yeni analitik servisi.
- Günlük "Today's Rockimals" sayfası (Rockimals spec 120).

## Completion Record

**Değişen dosyalar**

| Dosya | Değişiklik |
|---|---|
| `scripts/rockimals-blog-cta.mjs` | Çözümleyici ve banner |
| `scripts/build-rockimals-landing.mjs` | CTA, banner, döngü bölümü |
| `scripts/build-rockimals-blog.mjs` | Blog CTA'sı |
| `scripts/rockimals-blog-article.mjs`, `scripts/rockimals-blog-index.mjs` | Banner |
| `content/rockimals-landing/locales.json` | Yeni bölüm metni |
| `css/rockimals-landing.css`, `js/rockimals-landing.js` | Bölüm stili ve oynatma |
| `products/rockimals.html` | Yeniden üretildi |
| `assets/products/rockimals-heroes/` | Döngü dosyaları |
| `tests/rockimals-blog-build.test.mjs` | Beklenen bağlantı ülkeden bağımsıza güncellendi, banner kontrolü eklendi |

**Kanıt:** 2026-09-23'te `npm test` başarılı.

**Açık maddeler**

- **Kampanya.** Kampanya sağlayıcı kimliği (`pt`) henüz yok. Bağlantılar kampanyasız; `ROCKIMALS_CAMPAIGN_PROVIDER` doldurulunca kampanya adları devreye girer.
- **Çeviri incelemesi.** AC5.
- **Yayın.** Sahibin talebiyle yapıldı:
  - 2026-09-23'te `a639cad` ve `c7d2762` `origin/main`'e gönderildi ve Netlify otomatik yayınladı.
  - Canlıda kontrol edildi (`curl`):
    - `/`, `/ja`, `/de`, `/blog`, `/tr/blog` ve bir Türkçe makale Smart App Banner etiketini taşıyor.
    - Açılış ve makale CTA'ları `https://apps.apple.com/app/rockimals/id6792505608` bağlantısına gidiyor.
    - `lineup.webm` ve `lineup.mp4` 200 döndürüyor.
- **Cihaz kontrolü.** iPhone Safari'de band, video ve hareket azaltma kontrolü (AC4) hâlâ açık.
