# Rockimals haftalık yayın runbook'u

**Karar:** Kullanıcı 22 Eylül 2026'da haftada bir özgün konunun sekiz dilde, hafta 2'den başlayarak pazartesi yayımlanmasını ve otomatik yayın ile hazırlık hatırlatması kurulmasını istedi. İlk konu 22 Eylül'de yayımlanmış istisnadır. Hedef yayın saati pazartesi 10.00, hazırlık hatırlatması cuma 10.00; ikisi de `Europe/London` saatine göre. Bu saat bir SEO iddiası değil, operasyon tercihi ve önceki 10.00 önerisinin pazartesiye taşınmış biçimidir.

**Aktif Codex görevi:** `Rockimals haftalık hatırlatma ve yayın` (`rockimals-pazartesi-blog-yay-n`); aynı takip görevi cuma salt okunur hatırlatma, pazartesi koşullu yayın çalıştırır. Ayrı bir GitHub/Netlify sunucu zamanlayıcısı kurulmadı.

## Kuyruk ve tempo

Konu sırası için tek kaynak [13 haftalık tablo](rockimals-blog-plani-2026-09-22.md#5-ilk-13-haftanın-yayın-sırası) ve sonraki haftalar için aynı plandaki 52 konu havuzudur. Bu dosya ikinci bir bağımsız konu sırası oluşturmaz.

| Yayın penceresi | Hedef konu | Durum (22 Eylül 2026) |
| --- | --- | --- |
| 22 Eylül, ilk yayın | 01 — Rockimals nasıl oynanır? | Sekiz dil canlı; pazartesi ritminden önceki tek istisna |
| 28 Eylül Pazartesi | 15 — Asteroit nedir? | Yalnızca EN/TR taslak; altı dil ve son yayın kontrolü eksik |
| 5 Ekim Pazartesi | 28 — Reklam, hesap ve ebeveyn kontrolü | Henüz sekizli hazır paket değil |
| 12 Ekim Pazartesi | 04 — Hikâyeler nasıl açılır? | Planlı; yazım ve inceleme ayrı iş |

Haftada **en fazla bir özgün konu** yayımlanır. Sekiz dil aynı `translationKey` altında tek paket sayılır; sekiz ayrı konu değildir. Yazılar önceden taslaklanabilir. Planlanan konu hazır değilse yayımlama atlanır, neden bildirilir ve aynı konu en eski açık aday olarak sonraki pazartesiye taşınır; daha sonraki konu öne geçirilmez. Aynı hafta elle bir konu yayımlanmışsa otomatik çalışma ikinci bir konu açmaz. 52 konu kota değildir; yeni konular ancak kaynak ve kalite kapılarından geçince sıraya girer.

## Cuma 10.00 hazırlık hatırlatması

1. Plandaki en eski yayımlanmamış konuyu ve sekiz dilin kaynak dosyalarını say; yeni konu yazma veya yayın durumunu değiştirme.
2. Eksik dil, editoryal brief, olgusal/ürün kaynak incelemesi, yerel terimler, kapak/ekran eşleşmesi, açık çeviri konusu ve CTA durumunu somut dosya/alanla belirt.
3. Pazartesi için **hazır**, **eksik** veya **doğrulanamadı** kararı ver. Eksikleri tamamlamak için kullanıcıya kısa, uygulanabilir hatırlatma gönder. “Hazır” demek canlıda yayımlandı demek değildir.

## Pazartesi 10.00 otomatik yayın kapıları

Yayın çalışması yalnızca bu repo ve Rockimals blog içeriğiyle sınırlıdır. Yeni konu yazma, çevirileri üretme, başka ürünleri veya mevcut kurumsal blogu değiştirme.

1. Bilgisayar, Codex uygulaması, yerel repo ve Netlify oturumu erişilebilir olmalı. Çalışma ağacı ve staging temiz olmalı; `main`/`origin/main`, remote, upstream ve son commit okunmalı. Remote fetch sonrası ayrışma veya başka kişiye ait değişiklik varsa dur; otomatik stash/rebase/force-push yapma.
2. Canlı site ve kaynak manifestte bu Londra takvim haftasında yeni konu yayımlanıp yayımlanmadığını kontrol et. Varsa dur. Sıradaki aday plandaki en eski açık konudur; ilk otomatik aday `15`.
3. Adayın sekiz `locale` dosyası, tamamlanmış brief'i, doğru görsel paketi, açık olgusal/çeviri sorunu olmadığına dair inceleme kaydı ve doğrulanmış ürün sürümü/mağaza hedefi olmalı. Bağımsız editör onayı yapılmadıysa yapılmış gibi gösterme; açık kritik inceleme varken yayımlama. Eksikse yalnızca bildir.
4. `npm run check:rockimals-blog` ve özel taslak önizlemesini çalıştır. Yerel metin, başlık, alt metin, CTA, ilgili link, SEO ve ekran diliyle temsilî sayfaları incele. Uygun değilse dur.
5. Sekiz dosyada `draft: false` ve aynı, çalışma anında geçmiş veya şimdiki bir RFC 3339 `published` zamanı kullan; `updated` alanını buna eşitle veya daha yeni tut. Gelecek tarihli `draft: false` dosyaları önceki build'de kendiliğinden canlıya çıkmaz. Yalnızca aday konu dosyalarını değiştir.
6. `npm test` ile tam build/route/sitemap kontrolünü çalıştır. Manifestte tam bir yeni sekizli paket oluştuğunu, diğer taslakların dışarıda kaldığını ve haftalık sınırın aşılmadığını doğrula. Test başarısızsa commit/push/deploy yapma ve hatayı bildir.
7. Git güvenlik kurallarına göre yalnızca adayın sekiz kaynağını ve gerekiyorsa aynı konunun yayın kaydını stage et; diff'i incele, tek atomik commit oluştur, upstream'i yeniden doğrula ve normal push yap. Hook/branch koruması reddederse dur. Kullanıcının bu isteği haftalık hazır Rockimals konusunun normal commit/push/yayınına yetkidir; başka repo veya içerik yayınına yetki değildir.
8. Bağlı `duniaops` Netlify sitesine üretim deploy'u yap; build çıktısı `dist` ve `netlify.toml` ayarları kullanılmalı. Üretim sayfaları, sekiz yerel URL, dil geçişi, canonical ve sitemap canlı HTTP üzerinden doğrulanmadan “yayımlandı” deme. Netlify veya ağ erişimi başarısızsa sonucu kısmi/başarısız bildir; aynı konuyu sonraki koşuda körlemesine yeniden açma.
9. Başarılı/başarısız sonucu, gerçek yayın zamanı, konu/commit, sekiz URL, test ve deploy kanıtı ile kullanıcıya bildir. Başarılı yayından sonra 4/8/13. hafta ölçüm kontrolü 033/034 kayıtlarına bağlanır; bilinmeyen ölçümler sıfır yapılmaz.

Otomasyon yerel Codex zamanlanmış görevidir; **bilgisayar ve uygulama açık değilse çalışmaz**. Çalıştırma gecikebilir; kesin dakika garantisi verilmez. İlk birkaç koşu gözden geçirilmeli. Hazır içerik yoksa otomasyon yeni yazı uydurmaz ve canlıya hiçbir şey eklemez.
