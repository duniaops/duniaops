# DuniaOps web sitesini organizasyona taşı ve güvenli biçimde public yap

**Status:** Implemented on 15 August 2026; only the time-dependent follow-ups listed in the completion record remain.
**Type:** Epic
**Priority:** P1 — kaynak dosyaların bir bölümü hâlihazırda Netlify üzerinden sunuluyor; public geçişten önce sınırların netleştirilmesi gerekiyor.
**Risk:** High — Git geçmişinin yeniden yazılması, production deploy bağlantısının değiştirilmesi ve private içeriğin public yapılması geri dönüşü sınırlı işlemlerdir.

## Problem / Opportunity

`ibrahimuylas/duniaops` reposu DuniaOps şirket web sitesinin kaynaklarını içeriyor ve production site Netlify üzerinde çalışıyor. Reponun `DuniaOps/duniaops` adresine taşınması sahipliği şirket organizasyonuyla hizalayacak, ekip erişimini kolaylaştıracak ve proje görünürlüğünü artıracak.

Repo mevcut hâliyle doğrudan public yapılmamalı. Public görünürlük güncel dosyalarla birlikte bütün Git geçmişini, commit author bilgilerini ve silinmiş dosyaları da yayımlar. Ayrıca Netlify'ın repo kökünü publish ettiği mevcut yapıda yalnızca site çıktısı değil; Markdown kaynakları, build scriptleri, tasarım notları ve agent talimatları da web üzerinden sunuluyor.

Başarı; yalnızca GitHub transferinin tamamlanması değil, yayımlanabilir içeriğin bilinçli olarak belirlenmesi, Netlify bağlantısının korunması, güvenlik ve lisans kararlarının belgelenmesi ve production davranışının uçtan uca doğrulanmasıdır.

## Current State / Baseline

- Kaynak repo: `ibrahimuylas/duniaops`, visibility `PRIVATE`, default branch `master`.
- Hedef: `DuniaOps/duniaops`; isim hedef organizasyonda kullanılabilir.
- Repo sahibi hedef organizasyonda admin yetkisine sahip.
- Çalışma ağacı başlangıçta temiz ve `master`, `origin/master` ile senkron.
- Repo 17 commit, tek aktif branch, sıfır fork, sıfır açık issue ve sıfır release içeriyor.
- GitHub Actions workflow/logu, repository secret, Dependabot secret, environment, webhook veya deploy key bulunmuyor.
- Mevcut bağımlılık taramasında `npm audit` sıfır açık bildiriyor.
- Basit current-tree ve Git patch-history taramasında yüksek güvenli canlı credential bulunmadı. Bu sonuç, gerçek bir secret scanner ile yapılacak nihai kontrolün yerine geçmez.
- Git geçmişinde kişisel/yerel commit e-postaları, eski telefon ve destek e-postası, `.DS_Store`, eski template dosyaları ve silinmiş binary asset'ler bulunuyor.
- `brand/DuniaOps Brand Applications.dc.html` içinde doğrudan kişi iletişim bilgileri ve `ops.duniaops.com` örnek adresi bulunuyor.
- Netlify production ortamı repo kökünden en az `design-qa.md`, `content/blog/*.md`, `package*.json`, `scripts/build-blog.mjs` ve `AGENTS.md` dosyalarını sunuyor.
- Canlı site `www.duniaops.com` alan adında Netlify üzerinden cevap veriyor; GitHub Pages kullanılmıyor.

## Approved Decisions

The following decisions were approved on 15 August 2026:

- Use a clean public root commit; the existing detailed history is retained only in a private bundle backup.
- License DuniaOps-authored software source under MIT while keeping names, trademarks, logos, brand material, product artwork, marketing copy, and editorial/blog content all rights reserved.
- Remove direct personal contact details and internal-looking domain examples from the public tree and history.
- Do not carry the historical Template Stock site or deleted stock/team assets into the new public history.
- Rename the default branch from `master` to `main`.
- Do not accept unsolicited external contributions; disable public Issues, Wiki, and Projects.
- Use the `DuniaOps/duniaops-dev` team as code owner and grant it the required repository access after transfer.
- Create a new private `DuniaOps/duniaops` repository from the approved clean root history, retain the personal repository as a private archive, verify the existing Netlify production project against the organization repository, and only then make the new repository public.

## Completion Record — 15 August 2026

- [x] Created and verified a complete private Git bundle outside the repository before changing the public history.
- [x] Created `DuniaOps/duniaops` with a clean root history on `main`; the old personal repository remains private and is retained locally as the `archive` remote.
- [x] Confirmed the public history contains only approved no-reply author metadata and no legacy branches or tags.
- [x] Scanned a fresh public clone and both baseline commits with Gitleaks 8.30.1; no leaks were found.
- [x] Applied the mixed license model, public security policy, contribution policy, CODEOWNERS ownership, public-repo ignore rules, and sanitized brand source.
- [x] Added a deterministic `dist/` allowlist build and repository-native validation; `npm ci`, `npm audit`, `npm test`, JavaScript syntax, XML, diff, and Netlify build checks passed.
- [x] Verified the clean build contains 46 public files with no forbidden source paths, broken internal links, stale output, draft article, template article, or symlinks.
- [x] Installed the Netlify GitHub App for only `DuniaOps/duniaops` and relinked the existing production project to `main`, `npm run build:site`, and `dist` without creating a second site or changing its custom domain.
- [x] Pinned Netlify builds to Node.js 24 and completed a Git-triggered production deploy from commit `4e9ef9d` (deploy `6a808a951972b86741cfb184`).
- [x] Verified 21 production public paths return HTTP 200, all eight named source paths return HTTP 404, the bare domain redirects once to `www`, and the required security headers are present.
- [x] Verified TLS, the custom domain, canonical host, robots, sitemap, RSS, service/product/privacy/support pages, and the existing `project-enquiry` Netlify form.
- [x] Submitted a clearly marked browser test enquiry, reached `/thank-you`, verified every expected form field in Netlify, and deleted only the test submission afterward.
- [x] Verified a populated honeypot does not enter normal Netlify submissions.
- [x] Verified a fresh visitor loads no Google Analytics script before consent, reject keeps it unloaded and persists, accept loads it, and Cookie settings can change the decision. Static inspection confirms `generate_lead` carries no form fields.
- [x] Made the canonical repository public; disabled Issues, Wiki, and Projects; granted `DuniaOps Dev` push access; protected `main` against force-push and deletion; enabled vulnerability alerts, Dependabot security updates, secret scanning, push protection, and private vulnerability reporting.
- [ ] Confirm the accepted test page view in GA4 Realtime with an authorized analytics user; the repository and Netlify project do not expose Realtime data through the available interfaces.
- [ ] Recheck domain, TLS, Forms delivery, analytics, and GitHub security alerts after 24 hours.
- [ ] Run the optional device-matrix, browser-console, accessibility, and performance checks if release policy requires measured evidence beyond the completed smoke tests.

## Proposed Solution

Çalışma aşağıdaki fazlarda, sıralı onay kapılarıyla yürütülecek. Public visibility son faza kadar açılmayacak.

### Faz 0 — Kararları kaydet ve geri dönüş noktasını hazırla

- [ ] Aşağıdaki `Open Questions` bölümündeki zorunlu kararları yazılı olarak cevapla.
- [ ] Transferi ve olası history rewrite işlemini yapacak GitHub hesabının hem kaynak repoda admin hem hedef organizasyonda owner/admin olduğunu doğrula.
- [ ] Kaynak reponun tüm branch, tag ve ref'lerini içeren özel bir yedek oluştur; yedeği repo dışında ve public olmayan bir konumda sakla.
- [ ] Yedeğin geri okunabildiğini ve beklenen ref/commitleri içerdiğini doğrula.
- [ ] Netlify production projesinin mevcut deploy ayarlarını, environment variable adlarını, domain ayarlarını, Forms yapılandırmasını ve son başarılı deploy kimliğini kaydet. Secret değerlerini spec'e, loglara veya repoya yazma.
- [ ] Uygulama sırasında production kesintisi için sorumlu kişi ve bakım zamanı gerekiyorsa bunu belirle.

**Gate 0:** Geçmiş, lisans, kişisel iletişim bilgileri ve branch adı kararları onaylanmadan sonraki faza geçilmez.

### Faz 1 — Public içerik ve Git geçmişi denetimi

- [ ] Tracked, untracked, ignored ve geçmişte silinmiş dosyaları ayrı ayrı envanterle.
- [ ] Tüm local ve remote ref'leri fetch ederek tarama kapsamının yalnızca mevcut branch ile sınırlı olmadığını doğrula.
- [ ] Gitleaks veya TruffleHog gibi bir araçla current tree ve bütün Git geçmişini tarat; çıktıyı redact et ve raporu repo dışında tut.
- [ ] Aşağıdaki credential sınıflarını ayrıca kontrol et: cloud/provider key'leri, GitHub tokenları, Netlify tokenları, private key/certificate dosyaları, basic-auth URL'leri, JWT'ler, database connection stringleri, `.env` içerikleri ve webhook URL'leri.
- [ ] Commit author ad/e-postalarını çıkar ve public yayımlanmasına açıkça onay verilmeyen değerleri listele.
- [ ] Geçmişteki `.DS_Store`, eski telefon/e-posta, template, team/stock görselleri, fontlar ve diğer binary asset'leri lisans ve mahremiyet açısından incele.
- [ ] Güncel görsellerde EXIF/GPS/author metadata bulunmadığını doğrula veya metadata'yı temizle.
- [ ] Blog, ürün ve brand asset'lerinin kaynağı ile yeniden dağıtım hakkını belgeleyip belirsiz asset'leri kaldır veya değiştir.
- [ ] Tarama sonucunda gerçek bir secret bulunursa public geçişi durdur; secret'ı sağlayıcı tarafında revoke/rotate et, geçmişten kaldır ve taramayı tekrar çalıştır.

**Beklenen kanıt:** Redact edilmiş secret-scan özeti, public içerik envanteri ve lisans/mahremiyet karar listesi.

### Faz 2 — Git geçmişi stratejisini uygula

Aşağıdaki seçeneklerden tam olarak biri seçilecek:

#### Seçenek A — Tam geçmişi koru

- Bütün commit author bilgileri, eski iletişim bilgileri, silinmiş dosyalar ve üçüncü taraf asset'lerin public yayımlanmasına açık onay ver.
- Eski template ve asset'ler için gereken attribution/lisans kayıtlarının ilgili commitlerde erişilebilir olduğunu doğrula.

#### Seçenek B — Seçici history rewrite

- Onaylanmayan path ve blob'ları tüm ref'lerden kaldır.
- Gerekirse commit author/committer e-postalarını onaylı adreslerle yeniden yaz.
- Rewrite sonrasında bütün branch/tag/ref'leri ve secret scan'i tekrar doğrula.
- Değişen commit hash'lerini ve etkilenen local clone'ları kaydet.

#### Seçenek C — Temiz public başlangıç

- Yalnızca onaylanmış güncel dosyalardan yeni bir root commit oluştur.
- Eski tam geçmişi yalnızca private yedekte sakla.
- Public reponun geçmişinde eski template, iletişim bilgisi ve silinmiş asset bulunmadığını doğrula.

Repo küçük, forksuz ve tek kullanıcılı olduğu için mahremiyet veya asset lisansı konusunda şüphe varsa önerilen seçenek `C`, ayrıntılı geçmişin korunması gerekiyorsa kontrollü `B` seçeneğidir.

**Gate 1:** Seçilen geçmişin public clone'u üzerinde secret, kişisel veri ve lisans kontrolü geçmeden transfer/public visibility yapılmaz.

### Faz 3 — Güncel kaynak ağacını public kullanıma hazırla

- [ ] `brand/DuniaOps Brand Applications.dc.html` içindeki isim, doğrudan e-posta, telefon ve iç sistem izlenimi veren domain örneklerinin yayımlanıp yayımlanmayacağını karara bağla; onaylanmayan değerleri kaldır veya anonimleştir.
- [ ] Geçici QA raporlarını ve yerel `/tmp/...` referanslarını repoda tutma gereksinimini değerlendir; gereksizse kaldır, gerekiyorsa kalıcı ve anlaşılır dokümantasyona dönüştür.
- [ ] `.gitignore` dosyasına en az `.env`, `.env.*`, izin verilen `.env.example`, certificate/private-key, editor, OS, coverage, build ve local tool çıktı desenlerini ekle.
- [ ] Örnek yapılandırmalarda gerçek secret yerine açıklayıcı placeholder kullanıldığını doğrula.
- [ ] Repo description, homepage ve topics değerlerini belirle.
- [ ] Kullanılmayacak GitHub Issues, Wiki ve Projects özelliklerinin kapatılıp kapatılmayacağına karar ver.

### Faz 4 — Lisans ve public repo yönetişimini tamamla

- [ ] Aşağıdaki lisans modellerinden birini uygula ve README'de kapsamını açıkla:
  - Kod için MIT veya Apache-2.0; `brand/`, logo/görseller ve blog içeriği için açıkça “All rights reserved”.
  - Bütün repo için proprietary/all-rights-reserved bildirim.
- [ ] Üçüncü taraf Lucide lisans dosyasını ve gereken diğer attribution kayıtlarını koru.
- [ ] `SECURITY.md` ekle veya `DuniaOps/.github` reposunda organizasyon geneli default security policy oluştur. Bildirim kanalı public issue olmamalı.
- [ ] Ownership için repo-local `CODEOWNERS` ekle ve kişisel kullanıcı yerine mümkünse DuniaOps takımını kullan.
- [ ] Dış katkı kabul edilecekse `CONTRIBUTING.md`, issue/PR template ve davranış kuralları ekle; edilmeyecekse README'de bunu açıkça belirt ve gereksiz Issues özelliğini kapat.
- [ ] README'ye lisans kapsamı, generated dosyalar, local development, build, test, deploy ve security reporting bilgilerini ekle.
- [ ] Dependabot yapılandırmasının gerekli olup olmadığına karar ver; kullanılırsa yalnızca kullanılan npm ekosistemini ve makul bir güncelleme sıklığını tanımla.

### Faz 5 — Netlify publish sınırını düzelt

- [ ] Deterministik bir site build komutu oluştur. Komut önce blog çıktısını üretmeli, ardından yalnızca izin verilen public dosyaları temiz bir `dist/` dizinine kopyalamalı.
- [ ] `netlify.toml` veya Netlify UI üzerinden publish directory'yi `dist/` olarak ayarla.
- [ ] Publish allowlist en az şu runtime içeriklerini kapsamalı:
  - root public HTML sayfaları;
  - `blog/`, `services/`, `products/` ve `zoday/` runtime sayfaları;
  - `assets/`, `css/` ve `js/`;
  - `robots.txt`, `sitemap.xml`, `feed.xml`, `_headers` ve `_redirects`.
- [ ] Aşağıdakileri `dist/` dışında tut:
  - `.git*`, `.github/`, `.netlify/`, `node_modules/`;
  - `AGENTS.md`, `design-qa.md`, `specs/`;
  - `content/`, `scripts/`, `brand/` kaynak dosyaları;
  - `package*.json`, local config, invoice, backup, test çıktısı ve secret raporları.
- [ ] Build her çalıştığında eski `dist/` içeriğinin kalıntı bırakmayacak şekilde temiz üretildiğini doğrula.
- [ ] Netlify Forms'un build edilmiş `dist/index.html` içindeki formu algıladığını doğrula.
- [ ] README'deki “draft/template yayımlanmaz” açıklamasını gerçek deploy davranışıyla uyumlu hâle getir.

**Gate 2:** Deploy preview üzerinde allowlist dışı bütün kontrol URL'leri 404/410 vermeden production publish yapılmaz.

### Faz 6 — Otomatik ve yerel doğrulamaları çalıştır

Asgari doğrulama komutları repository-native scriptlere dönüştürülmeli ve tek komutla çalıştırılabilmelidir. Beklenen kontroller:

```sh
npm ci
node --check js/site.js
node --check js/analytics.js
node --check scripts/build-blog.mjs
npm run build:blog
npm run build:site
npm audit
xmllint --noout sitemap.xml
xmllint --noout feed.xml
git diff --check
```

Ek kontroller:

- [ ] `dist/` içinde izin verilmeyen path veya dotfile bulunmadığını allowlist testiyle doğrula.
- [ ] Bütün internal link, canonical URL, asset referansı, RSS linki ve sitemap URL'sini doğrula.
- [ ] Blog build'i ikinci kez çalıştırıldığında fark üretmediğini doğrulayarak deterministik olduğunu göster.
- [ ] Draft yazı ve `_template.md` dosyasının `dist/`, blog index, RSS ve sitemap'e girmediğini doğrula.
- [ ] Üretilen HTML'in gereken Netlify form adı, `form-name`, honeypot ve success action değerlerini koruduğunu doğrula.
- [ ] Dependency ve secret scan raporlarının kabul edilen eşikleri geçtiğini doğrula.
- [ ] Temiz bir clone veya geçici checkout içinde aynı build ve testlerin geçtiğini doğrula.

### Faz 7 — Repo private iken organizasyona transfer et

- [ ] Son kez kaynak ve hedef repo isimlerini, transfer yetkisini, temiz working tree'yi ve private yedeği doğrula.
- [ ] `DuniaOps/duniaops` adında çakışan repo veya fork bulunmadığını tekrar kontrol et.
- [ ] Repo visibility değerini `PRIVATE` tutarak transferi `ibrahimuylas` → `DuniaOps` yönünde gerçekleştir.
- [ ] Transfer sonrasında repo admin/team erişimlerini ve organizasyonun default repository permission etkisini kontrol et.
- [ ] Yerel remote'u yeni canonical URL'ye güncelle:

```sh
git remote set-url origin https://github.com/DuniaOps/duniaops.git
git remote -v
```

- [ ] Eski GitHub URL'sinin yeni repoya yönlendiğini doğrula; eski konumda aynı isimle yeni repo oluşturma.
- [ ] Branch adını `main` yapma kararı alındıysa yalnızca bir kez uygula; local tracking, GitHub default branch ve Netlify production branch ayarlarını birlikte güncelle.

### Faz 8 — Netlify bağlantısını yeni owner'a geçir ve private smoke test yap

- [ ] Netlify GitHub App'i DuniaOps organizasyonunda kur veya mevcut kurulumun `DuniaOps/duniaops` reposuna erişimi olduğunu doğrula.
- [ ] Gerekirse Netlify'da **Project configuration → Build & deploy → Continuous deployment → Repository → Link to a different repository** yoluyla aynı production projesini yeni repo konumuna bağla.
- [ ] Build command, publish directory, production branch, deploy context ve environment variable adlarının korunduğunu doğrula.
- [ ] Domain, DNS, TLS certificate, redirects, Forms, analytics ve deploy history'nin yanlışlıkla yeni bir Netlify projesine bölünmediğini doğrula.
- [ ] Yeni repo/branch'ten bir deploy preview ve bir kontrollü production deploy al.
- [ ] Production deploy başarısız olursa Netlify'ın son başarılı deploy'una rollback et; repo public yapılmadan bağlantı sorununu gider.

**Gate 3:** Yeni organizasyon reposundan başarılı production deploy ve aşağıdaki smoke testler geçmeden visibility değiştirilmez.

### Faz 9 — Production smoke ve işlev testleri

#### HTTP ve içerik

- [ ] Ana sayfa, blog index, her servis sayfası, her ürün sayfası, privacy, thank-you, Zoday support/privacy, RSS ve sitemap HTTP 200 verir.
- [ ] Bare domain → `www` ve temiz URL redirectleri beklenen 301/200 zincirini verir; redirect loop yoktur.
- [ ] Canonical, Open Graph, social image ve JSON-LD URL'leri `https://www.duniaops.com` kullanır.
- [ ] Kırık link veya eksik asset yoktur; browser console hata vermez.
- [ ] Mobile ve desktop temel layoutlarında yatay taşma veya navigasyon regresyonu yoktur.

#### Publish sınırı

- [ ] Aşağıdaki URL'ler ve aynı sınıftaki diğer kaynak path'leri 404/410 verir:
  - `/AGENTS.md`
  - `/design-qa.md`
  - `/content/blog/_template.md`
  - `/scripts/build-blog.mjs`
  - `/package.json`
  - `/package-lock.json`
  - `/specs/001-public-repository-transfer.md`
  - `/brand/DuniaOps%20Brand%20Applications.dc.html`
- [ ] Directory listing veya source map üzerinden allowlist dışı içerik açığa çıkmaz.

#### Güvenlik başlıkları

- [ ] CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` ve `Permissions-Policy` production cevaplarında beklenen değerlerle bulunur.
- [ ] CSP ihlali nedeniyle font, analytics, form veya gerekli asset çalışması bozulmaz.
- [ ] HTTPS certificate geçerlidir ve mixed-content isteği yoktur.

#### Form

- [ ] Netlify dashboard formu `project-enquiry` adıyla algılar.
- [ ] Geçerli test başvurusu `/thank-you` sayfasına yönlenir ve Netlify Forms'ta görünür.
- [ ] Honeypot alanı korunur; test kaydı açık biçimde test olarak işaretlenir ve doğrulama sonrası uygun şekilde silinir.
- [ ] Form içeriği analytics event payload'ına gönderilmez.

#### Analytics ve consent

- [ ] Yeni ziyaretçide analytics consent varsayılan olarak denied durumundadır ve GA scripti izinsiz yüklenmez.
- [ ] Reject akışında analytics isteği oluşmaz ve seçim tekrar ziyarette korunur.
- [ ] Accept akışında GA4 Realtime'da test page view görünür.
- [ ] Cookie settings üzerinden karar değiştirilebilir.
- [ ] Başarılı form gönderimi yalnızca consent varsa `generate_lead` üretir ve form alanlarını taşımaz.

#### SEO, kalite ve performans

- [ ] `robots.txt` doğru sitemap URL'sini gösterir.
- [ ] Sitemap yalnızca yayımlanmış canonical sayfaları içerir; draft veya source path içermez.
- [ ] RSS XML geçerlidir ve yalnızca yayımlanmış yazıları içerir.
- [ ] Temsili ana sayfa, blog ve ürün sayfasında accessibility ve performance smoke kontrolü ciddi regresyon göstermez.

### Faz 10 — Public visibility ve GitHub güvenlik ayarları

- [ ] Public yapılacak son commit/ref setini bir kez daha gözden geçir ve Gate 1–3 kanıtlarını onayla.
- [ ] Repo visibility değerini `PUBLIC` yap.
- [ ] Visibility değişiminden hemen sonra default branch için ruleset/branch protection oluştur:
  - force-push ve branch deletion yasak;
  - doğrudan push politikası ekip modeline uygun;
  - uygulanabilir doğrulama check'leri required;
  - bypass yetkileri minimum.
- [ ] Secret scanning, push protection, dependency graph ve Dependabot alerts durumlarını doğrula/etkinleştir.
- [ ] Mümkünse GitHub private vulnerability reporting'i etkinleştir.
- [ ] Repo description, homepage (`https://www.duniaops.com`) ve topics alanlarını doldur.
- [ ] Beklenen organizasyon takım/kişilerinin admin/maintain/write erişimlerini doğrula; gereksiz kişisel collaborator bırakma.
- [ ] Kullanılmayan Issues, Wiki ve Projects özelliklerini alınan karara göre kapat.
- [ ] Public GitHub arayüzünde README, lisans, security policy ve attribution dosyalarının doğru göründüğünü doğrula.

**Önemli:** Public visibility sonrası içeriğin fork, clone, cache veya arşivlerden tamamen geri alınması garanti edilemez. Bu adım mahremiyet açısından geri dönüşsüz kabul edilir.

### Faz 11 — Transfer sonrası GitHub ve deploy doğrulaması

- [ ] Yeni URL'den temiz clone alınabildiğini ve beklenen default branch'in checkout edildiğini doğrula.
- [ ] Eski `ibrahimuylas/duniaops` web ve Git remote URL'lerinin yeni konuma yönlendiğini doğrula.
- [ ] Local clone'ların canonical remote kullandığını doğrula; redirect'e kalıcı olarak güvenme.
- [ ] Public clone üzerinde secret scan'i bir kez daha çalıştır.
- [ ] Seçilen history stratejisine göre commit, branch, tag ve author sonuçlarının beklendiği gibi olduğunu doğrula.
- [ ] Normal bir sonraki değişikliğin GitHub → Netlify deploy'unu otomatik tetiklediğini doğrula.
- [ ] Deploy preview, production deploy ve Netlify Forms bildirimlerinin çalıştığını doğrula.
- [ ] 24 saat içinde domain, TLS, form teslimatı, analytics ve GitHub security alert durumunu yeniden kontrol et.
- [ ] Tamamlanan adımların kanıt linklerini ve kalan manuel takip işlerini transfer kaydına ekle.

## Acceptance Criteria

1. `DuniaOps/duniaops` GitHub organizasyonu altında public ve canonical repo olarak erişilebilirdir; hedef organizasyon erişimleri, default branch ve local remote ayarları doğrulanmıştır.
2. Onaylanmış Git geçmişi, current tree ve bütün public ref'ler gerçek bir secret scanner ile temiz sonuç vermiş; onaylanmayan kişisel iletişim bilgisi, local e-posta, `.DS_Store` veya lisansı belirsiz asset public geçmişte kalmamıştır.
3. Lisans modeli kod, blog içeriği, marka/logo asset'leri ve üçüncü taraf bileşenler için açıkça belgelenmiş; `SECURITY.md` ve ownership bilgileri GitHub community profile üzerinden erişilebilirdir.
4. Netlify yalnızca allowlist içeriği `dist/` dizininden yayımlar; kaynak, spec, build, agent ve tasarım dosyaları production URL'lerinde 404/410 verir.
5. Yeni organizasyon reposundan otomatik Netlify deploy başarıyla tamamlanır; custom domain, TLS, redirectler, güvenlik başlıkları, bütün önemli sayfalar ve asset'ler regresyonsuz çalışır.
6. Netlify Form submission ve honeypot akışı ile consent-controlled GA4 accept/reject ve `generate_lead` davranışı production ortamında doğrulanmıştır.
7. Public görünürlük sonrası branch protection/ruleset, secret scanning, push protection, dependency alerts, repo metadata ve kararlaştırılan Issues/Wiki/Projects ayarları etkin ve doğrulanmıştır.

## Evidence Required for Completion

- Redact edilmiş secret-scan özetleri: transfer öncesi ve public clone sonrası.
- Seçilen history ve lisans kararının yazılı kaydı.
- Private yedeğin doğrulama kaydı; yedek konumu veya secret içeriği paylaşılmamalı.
- Local build/test çıktısı ve temiz clone doğrulaması.
- Netlify deploy preview ve production deploy link/kimlikleri.
- HTTP/source-path smoke test sonuçları.
- Form ve analytics test zamanı ile sonuç özeti; test form içeriği rapora eklenmemeli.
- GitHub repo ayarları, ruleset ve security feature kontrol özeti.
- Transfer sonrası `git remote -v`, default branch ve eski URL redirect kontrolü.

## Rollback / Failure Handling

- History rewrite hatasında public geçişi durdur ve doğrulanmış private yedekten geri dön.
- Netlify build veya runtime regresyonunda son başarılı deploy'u tekrar production yap.
- GitHub transferi sonrası Netlify bağlantısı bozulursa repo private kalırken GitHub App erişimini düzelt veya repoyu yeniden linkle.
- Domain/DNS ayarlarını repo transferinin parçası olarak gereksiz yere değiştirme; zorunlu bir değişiklik varsa mevcut değerleri ve geri dönüş adımını önceden kaydet.
- Public visibility açıldıktan sonra gizlilik rollback'i garanti edilemez. Public olmuş bir secret yalnızca Git geçmişinden silinmiş sayılmaz; sağlayıcı tarafında revoke/rotate edilmelidir.
- Eski GitHub URL yönlendirmesini bozmamak için eski owner altında aynı isimle yeni repo veya fork oluşturma.

## Out of Scope

- DuniaOps organizasyonundaki diğer ürün/repo geçmişlerinin veya lisanslarının temizlenmesi.
- Web sitesinin görsel yeniden tasarımı veya içerik stratejisinin değiştirilmesi.
- Zoday, Lumo veya Rockimals uygulama kaynaklarının public yapılması.
- DNS sağlayıcısı veya Netlify projesinin başka bir hosting platformuna taşınması.
- GA4, Netlify Forms veya mevcut privacy modelinin ürünsel olarak yeniden tasarlanması.
- Şirketin hukuki unvanı, marka tescili veya privacy metninin hukuki danışmanlık kapsamında yeniden yazılması.

## Resolved Operational Question

- Netlify GitHub App did not automatically follow the new clean-history repository. It was installed for only `DuniaOps/duniaops`, and the existing production project was manually relinked to that repository without changing the site, domain, Forms data, or deploy history.

## Suggested Next Step

Complete the two time-dependent follow-ups above: confirm the consented page view in GA4 Realtime with an authorized analytics user and perform the 24-hour operational recheck. The optional device/performance pass can be scheduled separately if measured release evidence is required.
