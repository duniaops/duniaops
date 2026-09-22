# Rockimals blogunun içerik ve yayın uygunluğu sözleşmesini kur

**Type:** Feature
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Implemented — içerik sözleşmesi ve yayın seçimi doğrulandı (2026-09-22)
**Depends on:** None — [ana epic 021](021-rockimals-multilingual-blog-growth.md) ve kaynak plan okunur.
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Üç başlangıç konusunun aynı kurallarla hazırlanabileceği çok dilli kaynak modeli ve deterministik yayın seçimi oluştur. Bu iş içerik/veri katmanının sahibidir; son sayfa tasarımı ve host yönlendirmesi başka spec'lerdedir.

## Scope

- Sekiz dili en/tr/ja/ko/zh-Hans/fr/de/es ve aynı konuyu translationKey ile tanımla. İngilizce /blog/{slug}; diğer diller /{locale}/blog/{slug} olacak şekilde URL modelini tanımla.
- Ortak kimlik, locale, slug, title, description, category, published/updated, draft, image/imageAlt, author, relatedPosts, cta ve ürün rehberlerinde reviewedAppVersion alanlarını sözleşmeye al. Dört kullanıcı kategorisinin sabit kimlikleri ve yerel adları tanımlı olsun.
- Kaynak yeri için content/rockimals-blog/<translation-key>/<locale>.md ve çıktısı yayın klasörüne otomatik girmeyen bir taslak şablonu sağla; eşdeğer yol seçilirse kararı kaydet.
- Taslakların ve gelecekteki yayınların dışlandığı yayın manifestini oluştur. Kamuya çıkacak bir konu sekiz tamamlanmış dil sürümünden oluşur; eksik/çelişkili grup yanlış dille veya kısmi paketle yayımlanmaz.
- Yayın tarihi/zamanı yorumunu tek yerde belgeleyip deterministik uygula; gelecekteki sayfaların zamanı geldiğinde yeni build/deploy gerekeceğini belirt. Başlangıç tarihi veya otomasyon kurma.
- Önizleme gerekiyorsa ayrı yerel çıktı kullan; taslak önizlemesi üretim manifestini veya kaynak yayın durumunu değiştirmesin.

## Acceptance Criteria

- [x] **AC1:** Sekiz geçerli locale ve dört kategori tanımlıdır; bilinmeyen locale, eksik zorunlu alan, aynı dilde çakışan slug ve aynı translationKey/locale çifti açık hata verir.
- [x] **AC2:** Taslak şablonun varsayılanı draft'tır. Ürün rehberi için doğrulanan sürüm; tüm sayfalar için yerel başlık, açıklama, görsel ve alt metin alanları kayıt altındadır.
- [x] **AC3:** Tam sekizli, zamanı gelmiş yayın grubu manifestte yer alır; tamamı taslak veya gelecekte olan grup yer almaz. Yayına seçilmiş eksik/çelişkili grup hata ile durur ve kısmi yayın üretmez.
- [x] **AC4:** Her konu/dil için tek canonical hedef üretilir; dil karşılıkları ortak konu kimliğiyle bulunur, İngilizce içerik yerel dil eksikliğini kapatmak için kullanılmaz.
- [x] **AC5:** İlgili yazı çözümlemesi yalnızca yayımlanabilir, aynı dildeki hedefleri döndürür. Taslak/gelecek hedef genel bağlantı envanterine girmez.
- [x] **AC6:** Sözleşme ve örnek yazar akışı belgelenir; geçici doğrulama içeriği üretim çıktısına veya mevcut kurumsal bloga taşınmaz.

## Validation

Kaynak modelin sınır durumlarını hedefli olarak doğrula: tam/eksik sekizli grup, taslak, gelecek tarih, duplicate ve ilgili-yazı dışlama. Mevcut site komutlarını ancak bu iş etkiliyorsa çalıştır; kapsam dışı uygulama testlerini başlatma.

## Out of Scope

Görsel sayfa tasarımı (023), indeks/dil navigasyonu (024), Netlify/SEO yayını (025), gerçek üç yazının yazımı (027–032).

## Completion Record

**Tamamlandı:** 2026-09-22

- Sözleşme ve yazar akışı: `docs/rockimals-blog-content-contract.md`.
- Varsayılan taslak: `content/rockimals-blog/_template.md`; şablon kaynak taramasının ve genel site build'inin dışında kalır.
- Veri/manifest uygulaması: `scripts/rockimals-blog-content.mjs`; sekiz locale, dört sabit kategori, alan doğrulama, canonical yollar, aynı dilde ilgili-yazı çözümlemesi ve atomik sekizli paket seçimi tek modüldedir.
- Komutlar: `npm run check:rockimals-blog`; isteğe bağlı ve Git tarafından yok sayılan yerel veri için `npm run preview:rockimals-blog-content`.
- Tarih kararı: `published` ve `updated`, açık saat dilimli RFC 3339 anlarıdır. Seçim, build'in tek `asOf` anında UTC'ye normalize edilerek yapılır; tarihin gelmesi kendiliğinden deploy etmez.
- Paket davranışı: En az bir zamanı gelmiş, taslak olmayan dil grubu seçer. Seçilen grup sekiz dilin tamamı hazır ve ortak yayın alanları tutarlı değilse tüm manifest hata verir; tümü taslak/gelecek gruplar dışarıda kalır.
- Doğrulama: `tests/rockimals-blog-content.test.mjs` içindeki dokuz sınır testi geçti. Tam `npm test` akışı 2026-09-22 tarihinde geçti; 215 genel dosya ve mevcut route/link kontrolleri de başarılıydı.
- Üretim sınırı: Geçici fixture'lar işletim sistemi geçici dizininde oluşturulup silinir. Rockimals kaynakları `build:site`/`dist` akışına bağlanmadı; bu entegrasyon 025'in kapsamındadır. Bu iş commit, push veya yayın yapmadı.

Açık uygulama maddesi yoktur. Gerçek konu metinleri, görseller, sayfa şablonu ve host entegrasyonu bağımlı spec'lerde hazırlanacaktır.
