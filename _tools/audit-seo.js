const fs = require('fs');
const path = require('path');
const base = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/_site');
function walk(d, a){ for(const e of fs.readdirSync(d,{withFileTypes:true})){const fp=path.join(d,e.name); if(e.isDirectory()) walk(fp,a); else if(e.name.endsWith('.html')) a.push(fp);} return a; }
const decode = s => s.replace(/&amp;/g,'&').replace(/&[a-z]+;/g,' ');
const rows = [];
for (const fp of walk(base, []).sort()) {
  const html = fs.readFileSync(fp, 'utf8');
  const rel = path.relative(base, fp).replace(/\\/g,'/');
  const title = (html.match(/<title>([\s\S]*?)<\/title>/)||[])[1]||'';
  const desc = (html.match(/<meta name="description" content="([\s\S]*?)">/)||[])[1]||'';
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m=>decode(m[1].replace(/<[^>]+>/g,'').trim()));
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m=>decode(m[1].replace(/<[^>]+>/g,'').trim()));
  const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m=>decode(m[1].replace(/<[^>]+>/g,'').trim()));
  // body text word count (strip head, scripts, tags)
  const body = (html.split('</head>')[1]||html).replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<[^>]+>/g,' ');
  const words = decode(body).split(/\s+/).filter(w=>/[a-z0-9]/i.test(w)).length;
  const schema = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>{try{const o=JSON.parse(m[1]);return o['@type']||'?';}catch{ return 'INVALID';}});
  const intLinks = (html.match(/href="\/(?!\/)[^"]*"/g)||[]).length;
  const faqCount = (html.match(/class="faq-item"/g)||[]).length;
  rows.push({rel, titleLen:decode(title).length, descLen:decode(desc).length, h1:h1s.length, h1text:h1s[0]||'', h2:h2s.length, h3:h3s.length, words, schema:schema.join('+'), faqs:faqCount, intLinks});
}
console.log(JSON.stringify(rows,null,1));
