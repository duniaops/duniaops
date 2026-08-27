# Zoday 1.2 ürün, gizlilik ve destek sayfalarını güncel ürün sözleşmesiyle hizala

**Status:** Implemented (commit `44fcb87`; production verified 2026-08-28)
**Type:** Improvement
**Priority:** P1 — App Store incelemesine gönderilen 1.2.0 sürümünün Marketing URL'si hâlâ reddedilen burç/fal merkezli konumlandırmayı anlatıyor.
**Risk:** High — yanlış veya birbiriyle çelişen ürün, abonelik ve veri işleme iddiaları App Review sonucunu, kullanıcı güvenini ve gizlilik beyanlarının doğruluğunu etkileyebilir.

## Problem / Opportunity

Zoday iOS 1.2.0 build 40, 27 Ağustos 2026 tarihinde App Review'a kişisel göksel takvim ve özel düşünme günlüğü olarak gönderildi. Güncel ürünün birincil deneyimi:

1. doğum bilgilerine göre hesaplanan kişisel Ay dönüşü ve göksel tarihler;
2. özel günlük check-in'leri;
3. kullanıcının kendi kayıtlarından üretilen, nedensellik iddiası taşımayan betimleyici örüntüler; ve
4. birincil deneyimden ayrılmış, açıkça eğlence amaçlı geleneksel yorum koleksiyonudur.

DuniaOps üzerindeki canlı Zoday ürün sayfası bu sözleşmeyle uyumlu değildir. Sayfa ve ürün kataloğu kartı Zoday'i hâlâ günlük AI burcu, NASA verisine dayalı fal ve kişisel yorum ürünü olarak konumlandırıyor. Günlük burç, Sky, fal ve Loved Ones özellikleri birincil ürün sütunları olarak gösteriliyor; takvim, günlük ve kişisel örüntüler görünmüyor.

Ürün sayfasında ayrıca güncel binary ile çelişen iddialar bulunuyor:

- PostHog ürün analitiği ve Sentry tanılama verileri etkin olmasına rağmen “No behavioural tracking” ve verilerin yalnızca uygulama işlevi için kullanıldığı söyleniyor.
- Konumun hava durumu bağlamı için kullanıldığı yazıyor; güncel uygulama canlı konumu cihazda yaklaşık 1 km hassasiyete yuvarlayıp yalnızca isteğe bağlı geleneksel yorum için şehir, yerel saat ve mevsim bağlamında kullanıyor.
- Daily horoscope ve Sky, ücretsiz ürünün merkezi olarak; Plus ise esas olarak kişisel fal kotası olarak anlatılıyor.
- İlk üç günlük erişimde paywall olmadığı ve deneme bitmeden hatırlatma gönderildiği söyleniyor. Güncel uygulama bağlama göre sınırlı Plus tanıtımı gösterebiliyor ve gönderilmemiş bir hatırlatma özelliği vaat edilmemeli.
- Store metadata, ekran görüntüleri ve reviewer notes ile Marketing URL aynı ürünü anlatmıyor.

Canlı privacy policy sürüm 1.4 ve support sayfası yeni takvim/günlük konumlandırmasını doğru biçimde öne çıkarıyor. Ancak ikisi de 24 Ağustos 2026 tabanında ve kimlik, abonelik, bildirim ve cihaz yardımlarını yalnızca iOS/Apple üzerinden anlatıyor. Son 1.2 kodu Android'de Google ile hesap koruma ve geri yüklemeyi destekliyor; Google sağlayıcısı production'da etkin ve Android 1.2.0 internal testing sürecinde. Google kimlik akışı canlı politikada kimlik doğrulama amacıyla açıklanmıyor ve support içeriği Android/Google Play kullanıcılarına uygulanabilir yönergeler vermiyor.

Başarı; ürün sayfası, ürün kataloğu, privacy policy, support sayfası, resmi mağaza metni ve 1.2.0 binary'nin aynı ürün hiyerarşisini, aynı platform davranışını ve aynı veri işleme gerçeklerini anlatmasıdır.

## Source of Truth

Uygulama sırasında aşağıdaki Zoday kaynakları güncel doğruluk tabanı olarak kullanılacak:

- `store/app-store/1.2.0/metadata.md` — gönderilen Türkçe/İngilizce ürün konumlandırması, Plus kapsamı ve App Review rotası.
- `store/app-store/1.2.0/app-privacy-worksheet.md` — iOS build 40 için doğrulanmış veri akışları.
- `store/play/listing.md` — Android mağaza konumlandırması ve platforma özgü abonelik metni.
- `specs/019-product-repositioning.md` — ürün sözleşmesi ve gerçeklik sınırı.
- `specs/020-personal-celestial-calendar.md` — kişisel göksel takvim davranışı.
- `specs/021-private-reflection-journal.md` — özel günlük, dışa aktarma ve silme davranışı.
- `specs/022-cycle-timeline-and-patterns.md` — örüntülerin örnek eşiği ve nedensellik sınırı.
- `specs/023-traditional-content-and-plus.md` — geleneksel içeriğin ikincil rolü ve Free/Plus ayrımı.
- `specs/024-cycle-and-reflection-reminders.md` — izin ve platform bildirim davranışı.
- `specs/025-app-store-repositioning-gate.md` — binary, metadata, ürün sitesi, privacy ve support tutarlılık kapısı.
- `app/src/features/account/`, `app/src/lib/account.ts` ve Supabase Auth yapılandırması — Apple/Google kimlik akışında gerçekten alınan ve saklanan alanlar.

Spec veya mağaza metni ile çalışan binary çelişirse çalışan binary ve doğrulanmış ağ/veri akışı esas alınır; belirsiz bir davranış web metninde vaat edilmez.

## Proposed Solution

### 1. Zoday ürün sayfasını yeniden yaz

`products/zoday.html` mevcut sayfa yapısı ve DuniaOps tasarım sistemini koruyacak; içerik aşağıdaki hiyerarşiyle yeniden yazılacak:

1. **Hero:** Zoday'i kişisel göksel takvim ve özel düşünme günlüğü olarak tek cümlede anlat.
2. **Birincil değer:** kişisel Ay dönüşü, güncel ve yaklaşan Ay evreleri, birleşik kişisel takvim, günlük check-in ve geçmiş.
3. **Kişisel örüntüler:** yalnızca kullanıcının kendi kayıtlarını betimlediğini, minimum örnek eşikleri kullandığını ve göksel olayların duygu veya sonuçlara neden olduğunu iddia etmediğini açıkla.
4. **Geleneksel yorumlar:** günlük yorum, kişisel yorum, Dört Sütun, Kader Matrisi, Ay Dönüşü anlatıları ve Loved Ones özelliklerini ayrı ve ikincil bir eğlence koleksiyonu olarak anlat.
5. **Free ve Plus:** kullanıcının kendi takvimini ve günlük verisini paywall arkasında göstermeden güncel ayrımı kullan. Plus; daha uzun karşılaştırmalar, kişisel hatırlatıcılar/özelleştirme ve isteğe bağlı geleneksel yorum avantajları üzerinden anlatılacak.
6. **Gizlilik ve güven:** reklam olmadığını, kişisel verinin satılmadığını ve App Store tanımında tracking yapılmadığını söyleyebilir; ancak izinle kontrol edilen sınırlı ürün analitiği ve teknik tanılama verisini inkâr etme. Policy ile aynı kavramları kullan.
7. **Platform ve erişilebilirlik:** iPhone ve Android durumunu gerçek mağaza yayın durumuna göre göster. Public store linki yoksa devre dışı “coming soon” durumu korunacak; link uydurulmayacak.
8. **CTA ve FAQ:** takvim, günlük, hesap koruma, Plus, gizlilik, platform durumu ve abonelik yönetimini güncel davranışla cevapla.

Sayfadaki SEO alanları da aynı sözleşmeyle güncellenecek:

- `<title>`, meta description ve keywords;
- Open Graph ve Twitter başlık/açıklamaları;
- `SoftwareApplication` JSON-LD açıklaması, operating system ve teklif bilgileri;
- görsel alt metinleri;
- eski horoscope/fortune-first arama ve sosyal paylaşım metinleri.

`products.html` içindeki Zoday katalog kartının başlığı, açıklaması, platform bilgisi ve yayın durumu aynı metin sistemine geçirilecek.

### 2. Resmi 1.2.0 görsellerini kullan

Zoday reposundaki `store/app-store/1.2.0/screenshots/` altında bulunan İngilizce, gönderilmiş 1.2.0 ekran görüntüleri ürün sayfası için tek resmi görsel kaynaktır. En az aşağıdaki ana deneyimler gösterilecek:

- kişisel Ay döngüsü;
- kişisel takvim;
- özel check-in;
- özel günlük;
- döngü zaman çizelgesi.

Görseller DuniaOps asset adlandırma ve optimizasyon kurallarına uygun biçimde `assets/products/` altına kopyalanacak. Kaynak çözünürlüğü gereksiz büyüklükte yayımlanmayacak; uygun responsive boyutlar, genişlik/yükseklik nitelikleri, lazy loading ve açıklayıcı alt metin kullanılacak. App Store onayından önce de yalnızca gerçekten gönderilmiş build 40 ekranları gösterilebilir; görsel üzerinde “available now” veya mağaza onayı iddiası yer almayacak.

### 3. Privacy policy'yi v1.5'e çıkar

`zoday/privacy-policy.html` Türkçe ve İngilizce olarak aynı kapsamla güncellenecek ve yeni yürürlük tarihi ile **Version/Sürüm 1.5** olarak yayımlanacak.

Güncelleme en az şunları kapsayacak:

- Anonim başlangıç davranışını koruyup cihazlar arası hesap korumayı platforma göre Apple veya Google ile açıklamak.
- Apple ve Google kimlik akışlarında uygulama/Supabase tarafından gerçekten alınan alanları kaynak ve ağ akışından doğrulamak. Google için alınmayan isim, profil veya token verisi varsayılmayacak; alınan e-posta/sağlayıcı kimliği gibi alanlar eksiksiz açıklanacak.
- Parolanın Zoday ile paylaşılmadığını açıkça belirtmek.
- Kimlik doğrulama işleme amacını ve hukuki dayanağını Apple/Google için kapsamak.
- Sağlayıcı tablosuna Google'ı yalnızca ödeme sağlayıcısı olarak değil, Android'de isteğe bağlı kimlik sağlayıcısı olarak da doğru veri alanlarıyla eklemek.
- Hesap silmenin Supabase kimliğine, Apple yetki iptaline ve Google bağlantısına gerçekte ne yaptığını ayrı ayrı doğrulayıp anlatmak. Uygulamanın gerçekleştirmediği bir Google token/hesap iptalini vaat etmemek.
- Hesap silmenin App Store veya Google Play aboneliğini otomatik iptal etmediğini platformdan bağımsız biçimde açıklamak.
- PostHog, Sentry, RevenueCat, konum, günlük, örüntüler, dışa aktarma, retention ve çocuklara ilişkin mevcut v1.4 açıklamalarını korumak; yalnızca kod veya doğrulanmış sağlayıcı davranışı değiştiyse düzeltmek.

Privacy metni “no tracking” gibi günlük dilde belirsiz bir iddiaya dayanmayacak. Ürün sayfası ve policy, reklam/üçüncü taraf takibi ile uygulama içi ürün analitiğini birbirine karıştırmadan aynı terminolojiyi kullanacak.

### 4. Support sayfasını çapraz platform hâle getir

`zoday/support.html` Türkçe ve İngilizce olarak aynı kapsamla güncellenecek. “Son güncelleme / Last updated” tarihi değiştirilecek ve destek yönergeleri yalnızca iPhone'a göre yazılmayacak.

En az aşağıdaki içerikler eklenecek veya düzeltilecek:

- Destek talebinde “iPhone modeli ve iOS sürümü” yerine cihaz modeli, işletim sistemi ve uygulama sürümünü istemek.
- Hesabın anonim başladığını; iOS'ta Apple, Android'de Google ile isteğe bağlı olarak korunup geri yüklenebildiğini açıklamak.
- Eski bir Apple/Google hesabı bulunduğunda eski hesabın geri geldiğini ve bu cihazdaki anonim verinin otomatik birleşmediğini anlaşılır biçimde belirtmek.
- “Satın aldım ama Plus açılmadı” akışını güncel Restore Purchases davranışıyla hizalamak: mağaza hesabını kontrol etme, gerekirse Zoday hesabına giriş yapma ve tekrar deneme.
- App Store ve Google Play için abonelik yönetimi/iptal yollarını ayrı ve güncel adımlarla vermek.
- iOS ve Android bildirim izin yollarını ayrı başlıklar veya kısa platform notlarıyla açıklamak.
- Hesap silmenin Apple/Google kimlik bağlantısına ve mağaza aboneliğine etkisini privacy policy ile aynı gerçeklikte anlatmak.
- Takvim, günlük, örüntüler, yükselen burç, konum, veri dışa aktarma ve eğlence açıklamasıyla ilgili doğru mevcut yanıtları korumak.
- Apple Standard EULA bağlantısını yalnızca Apple kullanıcılarına aitmiş gibi doğru etiketlemek; Android için geçerli olmayan bir Apple belgesini genel Zoday kullanım koşulu olarak sunmamak.

## Scope

### In Scope

- `products/zoday.html` içeriği ve sayfaya gereken küçük, Zoday'e özel layout/stil ekleri.
- `products.html` Zoday katalog kartı.
- `zoday/privacy-policy.html` v1.5 Türkçe/İngilizce içeriği.
- `zoday/support.html` Türkçe/İngilizce çapraz platform içeriği.
- Zoday 1.2.0 resmi ekran görüntülerinin optimize edilmiş web asset'leri.
- İlgili SEO, Open Graph, Twitter, JSON-LD, alt metin ve sitemap `lastmod` güncellemeleri.
- Build allowlist, link veya içerik kontrollerinde bu değişikliklerin gerektirdiği küçük doğrulama güncellemeleri.
- Netlify deploy preview ve production sonrası logged-out doğrulama.

### MVP

- Ürün sayfası ve ürün kartı fortune-first anlatıdan tamamen çıkar.
- Privacy v1.5 Apple ve Google kimlik davranışını doğru açıklar.
- Support sayfası iOS ve Android hesap, ödeme ve bildirim yardımı sunar.
- Dört canlı URL aynı ürün sözleşmesini anlatır ve otomatik site doğrulamaları geçer.

### Nice to Have

- Ekran görüntüsü galerisi için klavye ile kullanılabilen lightbox.
- Product structured data içine public App Store/Google Play URL'lerinin onay sonrası eklenmesi.
- Türkçe bir ürün sayfası veya dil seçici. DuniaOps sitesinin mevcut dili İngilizce olduğu için bu spec'in tamamlanması için gerekli değildir.

## Acceptance Criteria

1. **Konumlandırma tutarlılığı:** `/products/zoday` ve `/products` katalog kartı Zoday'i kişisel göksel takvim ve özel günlük olarak öne çıkarır; daily horoscope, fal, NASA visitor veya Loved Ones birincil ürün vaadi/hero/ilk özellik sırası değildir. Sayfa, App Store 1.2.0 metadata'sındaki temel özellik ve gerçeklik sınırıyla çelişmez.
2. **Free/Plus ve iddia doğruluğu:** Ürün sayfası ücretsiz takvim, check-in ve ham günlük erişimini doğru gösterir; Plus'ı kullanıcının kendi verisinin kilidi olarak anlatmaz. Hava durumu, gönderilmeyen trial reminder, “no paywall”, “functionality only” veya uygulamanın gerçekleştirmediği başka bir davranış vaat edilmez.
3. **Privacy v1.5:** Türkçe ve İngilizce politika Apple ve Google kimlik doğrulamasında alınan/saklanan verileri, amacı, sağlayıcıları ve hesap silme sonuçlarını doğrulanmış uygulama davranışıyla açıklar. App Store ve Google Play aboneliklerinin uygulama hesabı silinince otomatik iptal olmadığı belirtilir; PostHog/Sentry/RevenueCat ve journal açıklamaları 1.2.0 veri akışıyla uyumludur.
4. **Çapraz platform support:** Türkçe ve İngilizce support içeriği Apple/Google hesap koruma ve geri yükleme, App Store/Google Play satın alma geri yükleme ve iptal, iOS/Android bildirim izinleri, veri dışa aktarma ve silme için uygulanabilir yönergeler verir. Platforma özgü talimatlar açıkça etiketlenir.
5. **SEO ve görsel doğruluğu:** Title, description, Open Graph, Twitter ve JSON-LD eski horoscope/fortune-first metin içermez. Ürün sayfası yalnızca build 40'tan alınan resmi 1.2.0 ekranlarını uygun responsive asset, boyut, lazy-loading ve alt metinle gösterir; store availability gerçekte public olmayan bir mağaza linki veya onay iddiası taşımaz.
6. **Otomatik ve erişilebilirlik doğrulaması:** `npm test`, `npm audit`, JavaScript syntax kontrolleri, `xmllint --noout sitemap.xml`, `git diff --check` ve internal-link/allowlist kontrolleri geçer. 320 px genişlikte yatay taşma yoktur; başlık sırası, klavye odağı, renk kontrastı, alt metin ve reduced-motion davranışı temsili mobile/desktop kontrollerinden geçer.
7. **Canlı doğrulama:** Production deploy sonrasında logged-out isteklerle `/products`, `/products/zoday`, `/zoday/privacy-policy` ve `/zoday/support` HTTP 200 verir. Canlı HTML v1.5 policy tarihini, güncel support tarihini ve yeni ürün hero metnini içerir; canonical/OG URL'leri doğrudur, kırık asset/link ve browser console hatası yoktur.

## Out of Scope

- Zoday mobil uygulamasında özellik, navigasyon, abonelik veya veri akışı değişikliği.
- App Store Connect veya Google Play Console metadata, screenshot, Data Safety/App Privacy ya da review submission değişiklikleri. Bunlar bu spec'teki web içeriğinin doğruluk kaynağı ve son kontrol noktasıdır; ayrı yetki olmadan değiştirilmez.
- Zoday için yeni bir abonelik ürünü, fiyat veya trial modeli oluşturmak.
- Referral invite landing ve Universal/App Links çalışması; bu iş Zoday `specs/027-duniaops-referral-landing.md` kapsamındadır ve mağazalar public olduktan sonra ele alınır.
- Genel DuniaOps site redesign'i veya diğer ürün sayfalarının yeniden yazılması.
- Yeni bir hukuk metni/Terms of Use sayfası oluşturmak. Apple EULA bağlantısının kapsamı yalnızca doğru etiketlenir; ortak ürün koşulları gerekiyorsa ayrı bir spec açılır.

## Dependencies and Risks

- App Store Marketing URL doğrudan `/products/zoday` olduğu için ürün sayfası App Review sırasında görülebilir; ürün sayfası değişikliği legal sayfalardan önce deploy edilmemeli, tek tutarlı yayın olarak çıkmalıdır.
- Google OAuth sağlayıcısının varsayılan kapsam ve Supabase `auth.users`/identity metadata alanları kaynak ve kontrollü test hesabıyla doğrulanmadan privacy metni kesinleştirilmemeli.
- Privacy metni hukuki beyan niteliğindedir. Uygulama davranışı mühendislik tarafından doğrulanmalı; gerekli görülürse son metin release owner veya hukuk danışmanı tarafından onaylanmalıdır.
- Store linkleri review/approval öncesi stabil veya public olmayabilir. Kesin public URL yoksa disabled durum kullanılır; tahminî URL kullanıcıya sunulmaz.
- Ekran görüntüleri başka repodan kopyalandığında yalnızca gönderilmiş build 40 asset'leri kullanılmalı ve ileride uygulama UI değiştiğinde tekrar senkron gerektireceği kabul edilmelidir.

## Open Questions

1. iOS onaylandığında kullanılacak kesin public App Store URL'si nedir? Onaya kadar CTA disabled kalacak.
2. Google Play production listing public olduğunda kullanılacak kesin URL doğrulanmış mı? Internal-testing URL'si public CTA olarak kullanılmayacak.
3. Google OAuth üzerinden Supabase'e tam olarak hangi alanlar geliyor ve hangileri kalıcı tutuluyor? Privacy v1.5 metni kontrollü test/identity kaydıyla cevaplandıktan sonra freeze edilecek.
4. Android için ayrı bir Zoday Terms of Use sayfası gerekli mi, yoksa Google Play'in geçerli koşullarına açıkça kapsamlandırılmış bir bağlantı yeterli mi? Bu karar privacy/support güncellemesini engellemez; Apple EULA genel ürün koşulu gibi gösterilmez.

## Suggested Next Step

1. Zoday build 40 metadata, privacy worksheet ve Apple/Google hesap akışından kısa bir doğruluk matrisi çıkar.
2. Dört web yüzeyinin metnini tek değişiklik setinde güncelle ve resmi ekran görüntülerini optimize et.
3. Repository-native testleri ve responsive/accessibility kontrollerini çalıştır.
4. Netlify deploy preview üzerinde release owner içerik onayı al.
5. Privacy, support, ürün kartı ve ürün sayfasını aynı production deploy ile yayımla; canlı logged-out kontrolünü kaydet.
6. Tamamlandığında bu spec'in `Status:` alanını `Implemented` yap ve doğrulama/deploy commit kimliğini kısa bir completion record ile ekle.

## Implementation record — 28 August 2026

- Rewrote the Zoday product page and catalogue card around the personal celestial
  calendar, private journal and descriptive-pattern contract.
- Added five optimized English build 40 screenshots from the submitted 1.2.0
  App Store asset set, with responsive layout, dimensions, lazy loading and
  descriptive alternative text.
- Updated the bilingual privacy policy to version 1.5 and the bilingual support
  page for Apple/iPhone and Google/Android account, subscription, restoration,
  notification and deletion guidance.
- Updated Zoday SEO/structured data and sitemap dates. `npm test`, `npm audit
  --omit=dev`, `xmllint --noout sitemap.xml` and `git diff --check` passed;
  local checks at 320 px and desktop found no horizontal overflow or browser
  console errors.
- Commit `44fcb87` was pushed to `main` and production was checked while logged
  out: `/products`, `/products/zoday`, `/zoday/privacy-policy` and
  `/zoday/support` returned HTTP 200. The live product page contained the new
  hero, canonical and Open Graph URL, and five screenshot assets; privacy
  policy v1.5 and the updated support date were present. Browser-console checks
  reported no errors. No public-store link was created.
