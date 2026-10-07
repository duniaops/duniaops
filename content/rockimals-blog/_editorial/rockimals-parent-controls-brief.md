# Konu 28 brief — Rockimals'ta reklam, hesap ve ebeveyn kontrolü

- **Durum:** Sekiz dilde editoryal taslak; hepsi draft. Bu kayıt yayın onayı değildir.
- **İnceleme tarihi:** 2026-10-05
- **Konu / sıra:** 28; haftalık plandaki en eski yayımlanmamış konu.
- **Translation key:** rockimals-parent-controls
- **Kategori:** family-guide
- **Ürün:** GB App Store'da canlı iOS 1.4.0; 22 Eylül tarihli product-reference.json içindeki 1.3.0 anlık kaydı bu yazının sürüm kanıtı değildir.

## Okuyucu, soru ve özgün açı

İndirme kararını veren ebeveyn veya bakım veren şu üç soruya kısa ve açık yanıt arar: Reklam veya çocuk hesabı var mı? Hangi eylemler yetişkine ayrılmış? Hesap yoksa yine de hangi teknik bilgiler işlenir? Yazı, uygulamanın kendi sınırlarını pratik bir ilk-kullanım kontrolüyle anlatır; genel cihaz düzeyi ebeveyn denetimi veya hukuk rehberi değildir. Çocuğa yönelik satın alma baskısı, mutlak güvenlik ve “hiç veri toplanmaz” iddiası yoktur.

## Kaynak ve ürün incelemesi

5 Ekim 2026'da aşağıdaki kamuya açık birincil kaynaklar ve bu depodaki karşılıkları incelendi:

- [GB App Store — Rockimals](https://apps.apple.com/gb/app/rockimals-kids-space-stories/id6792505608): 1.4.0, ücretsiz indirme ve isteğe bağlı uygulama içi Plus, reklam/hesap/davranış analitiği/uygulamalar arası izleme olmaması, satın alma/dış bağlantı/kartpostal/hatırlatıcı için ebeveyn kapısı. Mağaza gizlilik etiketi geliştiricinin beyanıdır; Apple bağımsız olarak doğruladığını söylemez.
- [Canlı gizlilik politikası](https://rockimals.duniaops.com/privacy-policy): yürürlük 25 Eylül 2026; takma adlı kurulum kimliği, bütünlük kanıtı, platform/dil/saat dilimi ve gerekli hizmet işleme. iOS 1.4.0 Plus doğrulamasında StoreKit, isteğe bağlı hatırlatıcıda cihaz içi bildirim kullanır; daha eski iOS ve Android işleyişi farklıdır. Yazı yalnızca doğrulanmış iOS sürümünü anlatır.
- [Canlı destek sayfası](https://rockimals.duniaops.com/support): satın alma geri yükleme, abonelik iptali, hatırlatıcı ve veri silme talepleri.
- Bu depodaki rockimals/privacy-policy.html ve rockimals/support.html ile asset-manifest.json karşılaştırıldı. Android için açık mağaza kaydı doğrulanmadığından Android indirme çağrısı yoktur.

Ebeveyn kapısı uygulama içindeki belirli geçişleri ayırır; cihazın bütününü yöneten bir ebeveyn kontrolü, harcama garantisi veya tüm dış içeriği filtreleyen sistem olarak sunulmaz. Plus erişimi isteğe bağlıdır; ücretsiz indirme “her şey ücretsiz” demek değildir. İptal ve iadeyi uygulama değil App Store yönetir. NASA verisi veya çocuk gelişimi hakkında bu yazıda yeni iddia yoktur.

## Yerel arama niyeti ve terimler

5 Ekim'de sekiz dilde reklamsız çocuk uygulaması, hesap ve ebeveyn sınırı ifadeleriyle örnek arama sonuçları incelendi. Sonuçlar çoğunlukla genel ebeveyn denetimi veya rakip uygulama sayfalarıydı; aşağıdaki ifadeler marka sorusuna yönelik editoryal seçimdir, ölçülmüş arama hacmi ya da sıralama vaadi değildir. Ürün olguları rakip sayfalardan alınmadı.

| Dil / pazar varsayımı | Hedef ifade ve niyet | Terim kararı |
| --- | --- | --- |
| en / GB | Rockimals ads parental controls — indirmeden önce reklam, hesap, satın alma | parent gate; Ask a grown-up; Rockimals Plus |
| tr / Türkiye | Rockimals reklam var mı ebeveyn kontrolü — çocuk hesabı ve harcama sınırı | ebeveyn kapısı; Bir büyüğe sor; Rockimals Plus |
| ja / Japonya | Rockimals 広告なし 保護者 — reklam ve yetişkin adımları | 保護者向けの確認; 大人の人に聞いてね; Rockimals Plus |
| ko / Güney Kore | Rockimals 광고 없음 보호자 — hesap ve satın alma | 보호자 확인 단계; 어른에게 부탁해요; Rockimals Plus |
| zh-Hans / Basitleştirilmiş Çince okur | Rockimals 无广告 家长 — reklam ve yetişkin onayı | 家长确认步骤; 请大人帮忙; Rockimals Plus |
| fr / Fransa | Rockimals sans publicité contrôle parental — reklam ve satın alma | étape réservée aux adultes; Demande à un adulte; Rockimals Plus |
| de / Almanya | Rockimals ohne Werbung Elternkontrolle — hesap ve satın alma | Elternabfrage; Frag einen Erwachsenen; Rockimals Plus |
| es / İspanya | Rockimals sin anuncios control parental — reklam ve satın alma | paso para adultos; Pide ayuda a un adulto; Rockimals Plus |

## Görsel, bağlantı ve inceleme

- Ortak metinsiz kapak: /assets/rockimals-blog/rockimals-parent-controls/cover.jpg (1200×630). Barney/Pofi ile soyut kalkan-kilit kompozisyonudur; gerçek ebeveyn kapısı ekranı diye sunulmaz. Yerel imageAlt alanları bunu açıkça anlatır.
- Güncel, sekiz dilde gerçek ebeveyn kapısı/ayar ekranı yok. Bu bir geliştirme fırsatıdır; sahte ekran eklenmedi. Mevcut kapakla metnin anlaşılması için ekran zorunlu değildir. Ürün sahibi ekran istediğinde 026 görsel kaydı güncellenmelidir.
- CTA ebeveynin mağazadaki güncel ücretsiz indirme/Plus koşullarını görmesidir. Gizlilik ve destek aynı dil parametresiyle bağlanır; desteklenmeyen derin bağlantı kullanılmaz. 7 Ekim 2026'da kamuya açık Google Play kaydı doğrulandığından App Store ve Google Play bağlantıları gösterilebilir. İlgili yazı: yayımlanmış konu 01, aynı dilde.
- Sekiz taslakta iddialar kaynak metin ve yerel politika terimleriyle karşılaştırıldı; bilinen kritik olgusal çelişki yok. Bağımsız ana dili editörü veya uygulama içi ekran testi yapılmadı; bu onaylar verilmiş gibi işaretlenmez. Yayın öncesi gerçek sürüm, mağaza, politika, yerel anlam, CJK satır kırılımı ve sekiz sayfa önizlemesi yeniden kontrol edilmelidir.
