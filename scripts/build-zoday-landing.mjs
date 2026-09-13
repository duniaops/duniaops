import { readFile, writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = new URL('../', import.meta.url);
const original = JSON.parse(await readFile(new URL('content/zoday-landing/en.json', base), 'utf8'));
const template = await readFile(new URL('products/zoday.html', base), 'utf8');
const unchanged = new Set([2,13,40,43,46,49,52,74,88,100,101,102,103,104,134]);
const labels = { en:'Language',tr:'Dil',es:'Idioma','pt-BR':'Idioma',de:'Sprache' };
const ogLocales = {en:'en_US',tr:'tr_TR',es:'es_ES','pt-BR':'pt_BR',de:'de_DE'};
const out = new URL('dist/products/zoday-locales/', base);
await mkdir(out,{recursive:true});
const attr = text => text.replaceAll('"','&quot;').replaceAll('<','&lt;');
for (const lang of Object.keys(labels)) {
  const translated = [...original];
  if (lang !== 'en') {
    const entries = (await readFile(new URL(`content/zoday-landing/${lang}.txt`,base),'utf8')).trim().split('\n').map(line=>{const i=line.indexOf('|');return [Number(line.slice(0,i)),line.slice(i+1)];});
    const map = new Map(entries);
    assert.equal(map.size, entries.length, `${lang}: duplicate translation keys`);
    original.forEach((text,index)=>{if(!unchanged.has(index))assert.ok(map.get(index),`${lang}: missing ${index}: ${text}`); translated[index]=map.get(index)??text;});
  }
  const dictionary = new Map(original.map((text,i)=>[text,translated[i]]));
  const split = template.indexOf('<body');
  let body = template.slice(split).replace(/>([^<>]+)</g,(match,value)=>{
    const key=value.trim();return dictionary.has(key)?`>${value.replace(key,dictionary.get(key))}<`:match;
  });
  body = body.replace('data-legal-panel="en"',`data-legal-panel="${lang}"`)
    .replace('data-language-label>Language','data-language-label>'+labels[lang])
    .replace(`option value="${lang}"`,`option value="${lang}" selected`)
    .replaceAll('?lang=en',`?lang=${lang}`);
  const imageLabels={'01-today':translated[41],'02-daily-horoscope':translated[44],'05-moon-calendar':translated[47],'06-new-check-in':translated[50],'07-journal-history':translated[53],'04-personal-reading':translated[81]};
  for(const [file,label] of Object.entries(imageLabels)){
    if(lang!=='en')body=body.replaceAll(`/zoday-preview/${file}.jpg`,`/zoday-preview/${lang}/${file}.jpg`);
    body=body.replace(new RegExp(`(<img[^>]+src="[^"]*${file}\\.jpg"[^>]*alt=")[^"]*"`,'g'),`$1${attr('Zoday · '+label)}"`);
  }
  body=body.replace(/aria-label="(?:View[^\"]*screenshot[^\"]*|App screenshot walkthrough)"/g,`aria-label="${attr(translated[3])}"`)
    .replace('aria-label="Zoday navigation"','aria-label="Zoday"')
    .replaceAll('aria-label="Get Zoday on Google Play — Google Play\'den indir"',`aria-label="${attr(translated[14])}"`);
  const title = 'Zoday — '+translated[8]+' '+translated[9]+' '+translated[10];
  let head=template.slice(0,split).replace('<html lang="en">',`<html lang="${lang}">`)
    .replace(/<title>.*?<\/title>/,`<title>${title}</title>`)
    .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*"/g,`$1${attr(translated[11])}"`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*"/g,`$1${attr(title)}"`)
    .replace('</head>',`<meta property="og:locale" content="${ogLocales[lang]}">\n</head>`);
  await writeFile(new URL(`${lang}.html`,out),head+body);
}
console.log('Built and checked five complete Zoday landing translations with matching screenshot locales.');
