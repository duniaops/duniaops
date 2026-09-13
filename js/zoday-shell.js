(() => {
  const names = {en:['Support','Privacy'],tr:['Destek','Gizlilik'],es:['Ayuda','Privacidad'],'pt-BR':['Ajuda','Privacidade'],de:['Hilfe','Datenschutz']};
  const cookies = {
    en:['Your cookie choices','We use optional cookies to understand how people use our website and help us improve it. We never send your contact details or project description to analytics.','Cookie and privacy details','Accept optional cookies','Reject optional cookies'],
    tr:['Çerez tercihlerin','Web sitemizin nasıl kullanıldığını anlamak ve geliştirmek için isteğe bağlı çerezler kullanıyoruz. İletişim bilgilerini veya proje açıklamanı analitik araçlarına asla göndermiyoruz.','Çerez ve gizlilik bilgileri','İsteğe bağlı çerezleri kabul et','İsteğe bağlı çerezleri reddet'],
    es:['Tus preferencias de cookies','Usamos cookies opcionales para entender cómo se utiliza nuestro sitio web y mejorarlo. Nunca enviamos tus datos de contacto ni la descripción de tu proyecto a las herramientas de análisis.','Información sobre cookies y privacidad','Aceptar cookies opcionales','Rechazar cookies opcionales'],
    'pt-BR':['Suas preferências de cookies','Usamos cookies opcionais para entender como nosso site é usado e melhorá-lo. Nunca enviamos seus dados de contato ou a descrição do seu projeto às ferramentas de análise.','Informações sobre cookies e privacidade','Aceitar cookies opcionais','Recusar cookies opcionais'],
    de:['Deine Cookie-Einstellungen','Wir verwenden optionale Cookies, um die Nutzung unserer Website zu verstehen und sie zu verbessern. Wir senden niemals deine Kontaktdaten oder Projektbeschreibung an Analysetools.','Informationen zu Cookies und Datenschutz','Optionale Cookies akzeptieren','Optionale Cookies ablehnen']
  };
  function sync() {
    const lang = Object.hasOwn(names,document.documentElement.lang)?document.documentElement.lang:'en';
    ['#cookie-title','#cookie-description','.cookie-copy a','[data-consent=granted]','[data-consent=denied]'].forEach((selector,i)=>{const el=document.querySelector(selector);if(el)el.textContent=cookies[lang][i];});
    const cookieLink=document.querySelector('.cookie-copy a');
    if(cookieLink)cookieLink.href='https://www.duniaops.com/privacy#analytics-cookies';
    const local = ['localhost','127.0.0.1'].includes(location.hostname);
    document.querySelectorAll('a[href]').forEach(link=>{
      if(link.closest('#legal-language-menu'))return;
      const url=new URL(link.href,location.href);
      if(local && url.host===location.host) {
        if(url.pathname==='/products/zoday')url.pathname='/';
        else if(url.pathname.startsWith('/zoday/'))url.pathname=url.pathname.slice(6);
        else return;
      } else if(url.hostname!=='zoday.duniaops.com')return;
      if(!/^\/(support|privacy-policy)(\/|$)/.test(url.pathname)&&url.pathname!=='/')return;
      url.searchParams.set('lang',lang);
      if(local){url.host=location.host;url.protocol=location.protocol;url.pathname=url.pathname==='/'?'/products/zoday':'/zoday'+url.pathname;}
      link.href=url.toString();
    });
    document.querySelectorAll('[data-zoday-support]').forEach(el=>el.textContent=names[lang][0]);
    document.querySelectorAll('[data-zoday-privacy]').forEach(el=>el.textContent=names[lang][1]);
  }
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  sync();
})();
