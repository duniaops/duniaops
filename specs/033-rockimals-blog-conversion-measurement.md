# Mağaza yönlendirmesini ve edinim ölçüm kaydını kur

**Type:** Feature
**Priority:** P2 — ana epic'in planlı çalışma önceliği; acil teslim tarihi yok.
**Risk:** Medium
**Status:** Planned — implementation not started
**Depends on:** [023 — yazı şablonu](023-rockimals-blog-article-template.md), [025 — host/SEO/build](025-rockimals-blog-host-seo-build.md).
**Parent:** [021 — Rockimals çok dilli blog epic'i](021-rockimals-multilingual-blog-growth.md)
**Plan:** [52 konu ve ilk 13 hafta](../docs/rockimals-blog-plani-2026-09-22.md)
**Breakdown:** [İş sırası ve kapsam eşlemesi](../docs/rockimals-blog-breakdown-2026-09-22.md)

## Description

Okuyucunun doğru mağazaya geçmesini sağla ve organik tıklama, mağaza ilgisi, indirme, kullanım verisini birbirine karıştırmadan raporlayacak temeli kur. Bu iş CTA hedef çözümlemesi ve ölçüm tanımlarının sahibidir.

## Scope

- 023'teki CTA alanını konuya uygun ebeveyn çağrısıyla doğrulanmış App Store hedefine bağla. Yerel etiket içerik kaynaklarından gelir; tek ana CTA korunur.
- Platform durumunu uygulama anında doğrula. Google Play henüz canlı değilse indirme düğmesi gösterme; desteklenmeyen uygulama deep link'i veya otomatik kurulum vaat etme.
- Doğrulanmış App Store hesap/kampanya bilgileri varsa konu+dil kampanya bağlantısını üret. Yoksa normal mağaza hedefini koru; gizli hesap bilgisi isteme/yayımlama veya token uydurma.
- Kaynak-only ölçüm kaydı oluştur: konu/dil/URL, ülke, kaynak, pencere, organik gösterim/tıklama/CTR, varsa kampanya indirmesi ve mevcut toplulaştırılmış kullanım sinyali.
- Search Console/App Store erişim durumunu ve varsa başlangıç verisini kaydet. Veri yok, yetki yok, ölçülmüyor ve düşük hacim nedeniyle görünmüyor durumlarını ayrı tut.
- 4/8/13. hafta inceleme şablonlarını tanımla; toplulaştırma ve oran paydalarının uyumunu belirt. Haftalık yayın sahibi/kayıt işletimi 034'e aittir.
- Yeni tarayıcı analitik servisi, uygulama çocuğu izleyen event veya çapraz uygulama takip ekleme; web mağaza tıklaması ölçülmüyorsa bilinmiyor kalsın.

## Acceptance Criteria

- [ ] **AC1:** Temsili ve gerçek içerik kaynakları aynı çözümleyiciyle doğru mağaza hedefini kullanır; sekiz dilde anlamlı CTA etiketi ve ebeveyn yönü korunur.
- [ ] **AC2:** Kullanılamayan platform için indirme düğmesi yoktur; desteklenmeyen deep link veya kişiye yönelik takip parametresi eklenmez.
- [ ] **AC3:** Doğrulanmış kampanya yapılandırması varsa URL doğru değerlerle oluşturulur; yoksa normal link çalışır ve atıf durumu yapılandırılmadı olarak kayıtlıdır.
- [ ] **AC4:** Ölçüm sözleşmesi Google tıklaması, web mağaza ilgisi, indirme ve kullanımın farklı veri kaynakları/paydalara sahip olduğunu açıklar; bu adımlar birbirinin sonucu varsayılmaz.
- [ ] **AC5:** Başlangıç kaydı ve 4/8/13. hafta şablonları vardır. Erişilemeyen veya gizlenen metrik sıfır yapılmaz; mevcut olmayan veriler için sorumlu/sonraki adım alanı bulunur.
- [ ] **AC6:** CTA bağlantısı tarayıcıdan açılabilir; yeni analitik servisi veya çocuk davranışı takibi eklenmediği değişiklik incelemesiyle doğrulanır. Canlı dış hizmet ayarı değiştirildiyse yalnızca mevcut yetki ve gerçekleşen işlem kaydedilir.

## Validation

CTA URL üretimini yapılandırılmış/yapılandırılmamış durumda incele ve doğrulanmış mağaza sayfasına gezin. Metrik alanlarını gerçek erişim durumu ile karşılaştır; sırf kayıt doldurmak için konsol ayarlarını değiştirme.

## Out of Scope

GA4 event/property kurulumu, yeni çerez/analitik servisi, çocuk/kişi bazlı atıf, gelir tahmini, mağaza yayını veya platform onay süreci.

## Completion Record

CTA çözümleme/config yolları, mağaza doğrulama tarihi, ölçüm kaydı ve inceleme şablonları, dış erişim/kampanya durumu.

Kapanışta değişen dosyaları, kanıtları ve açık maddeleri kaydet. Uygulama tamamlanmadıysa kabul kutularını işaretleme. Bu spec'i yazmak commit, push veya yayın işleminin gerçekleştiği anlamına gelmez.
