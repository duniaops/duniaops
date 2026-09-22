# Rockimals blogunun içerik ve yayın uygunluğu sözleşmesini kur

**Type:** Feature
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Planned — implementation not started
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

- [ ] **AC1:** Sekiz geçerli locale ve dört kategori tanımlıdır; bilinmeyen locale, eksik zorunlu alan, aynı dilde çakışan slug ve aynı translationKey/locale çifti açık hata verir.
- [ ] **AC2:** Taslak şablonun varsayılanı draft'tır. Ürün rehberi için doğrulanan sürüm; tüm sayfalar için yerel başlık, açıklama, görsel ve alt metin alanları kayıt altındadır.
- [ ] **AC3:** Tam sekizli, zamanı gelmiş yayın grubu manifestte yer alır; tamamı taslak veya gelecekte olan grup yer almaz. Yayına seçilmiş eksik/çelişkili grup hata ile durur ve kısmi yayın üretmez.
- [ ] **AC4:** Her konu/dil için tek canonical hedef üretilir; dil karşılıkları ortak konu kimliğiyle bulunur, İngilizce içerik yerel dil eksikliğini kapatmak için kullanılmaz.
- [ ] **AC5:** İlgili yazı çözümlemesi yalnızca yayımlanabilir, aynı dildeki hedefleri döndürür. Taslak/gelecek hedef genel bağlantı envanterine girmez.
- [ ] **AC6:** Sözleşme ve örnek yazar akışı belgelenir; geçici doğrulama içeriği üretim çıktısına veya mevcut kurumsal bloga taşınmaz.

## Validation

Kaynak modelin sınır durumlarını hedefli olarak doğrula: tam/eksik sekizli grup, taslak, gelecek tarih, duplicate ve ilgili-yazı dışlama. Mevcut site komutlarını ancak bu iş etkiliyorsa çalıştır; kapsam dışı uygulama testlerini başlatma.

## Out of Scope

Görsel sayfa tasarımı (023), indeks/dil navigasyonu (024), Netlify/SEO yayını (025), gerçek üç yazının yazımı (027–032).

## Completion Record

İçerik sözleşmesinin ve şablonun yolları, alan kararları, tarih yorumu, seçilen paket davranışı ve doğrulama kanıtı. Sonraki kod işleri ile editoryal hazırlık bu sözleşmeyi kullanır.

Kapanışta değişen dosyaları, kanıtları ve açık maddeleri kaydet. Uygulama tamamlanmadıysa kabul kutularını işaretleme. Bu spec'i yazmak commit, push veya yayın işleminin gerçekleştiği anlamına gelmez.
