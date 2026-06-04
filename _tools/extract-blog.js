const cheerio = require('cheerio');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src/assets/blog');
fs.mkdirSync(ASSETS, { recursive: true });

const URLS = [
  'why-year-round-pest-control-is-essential-for-northern-california-homes',
  'why-rodent-problems-spike-in-summer-and-how-to-stop-them-before-they-start',
  '5-signs-you-have-a-termite-problem-before-it-s-too-late',
  'how-to-keep-ants-out-of-your-kitchen-this-summer',
  'keeping-your-home-up-to-date-the-key-to-protecting-what-matters-most',
  'fun-in-the-sun-pest-free',
  'keepingmosquitoesatbay',
  'preventing-bed-bugs',
  'summer-spiders',
  'thanksgiving-pests',
  'top-5-pests-winter',
  'winter-prep',
  'winter-weed-treatments',
  'pest-free-summer',
  'keeping-ants-out',
  'year-round-pest-control',
].map(s => 'https://www.hunterspestcontrol.com/post/' + s);

const clean = t => (t || '').replace(/\s+/g, ' ').trim();
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(iso){ if(!iso) return ''; const d=new Date(iso); return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`; }

async function dl(url){ const r = await fetch(url, {headers:{'user-agent':'Mozilla/5.0'}}); if(!r.ok) throw new Error('img '+r.status); return Buffer.from(await r.arrayBuffer()); }
async function saveImg(url, baseName, width){
  const buf = await dl(url);
  await sharp(buf).resize({width, withoutEnlargement:true}).webp({quality:78}).toFile(path.join(ASSETS, baseName+'.webp'));
  await sharp(buf).resize({width, withoutEnlargement:true}).jpeg({quality:82, mozjpeg:true}).toFile(path.join(ASSETS, baseName+'.jpg'));
}

function buildBody($, container, slug, imgJobs){
  const $c = container.clone();
  // flatten Wix structural wrappers
  for(let k=0;k<10;k++){ $c.find('span,font,section,article,figure').each((i,n)=>$(n).replaceWith($(n).contents())); }
  for(let k=0;k<10;k++){ $c.find('div').each((i,n)=>{ // unwrap divs that don't directly wrap an image
    $(n).replaceWith($(n).contents()); }); }
  // strip attributes; keep href on <a>; collect imgs
  let imgN = 0;
  $c.find('*').each((i,n)=>{
    const t=(n.tagName||'').toLowerCase();
    if(t==='img'){
      const src = $(n).attr('src')||'';
      if(/wixstatic\.com/.test(src)){
        imgN++; const base = `${slug}-img${imgN}`;
        imgJobs.push({url: src.split(' ')[0], base, width: 900});
        n.attribs = { src:`/assets/blog/${base}.jpg`, alt: clean($(n).attr('alt'))||'', loading:'lazy', decoding:'async' };
      } else { $(n).remove(); }
      return;
    }
    const href = t==='a' ? $(n).attr('href') : null;
    n.attribs = {};
    if(t==='a' && href){ n.attribs.href=href; if(/^https?:/.test(href)){ n.attribs.target='_blank'; n.attribs.rel='noopener'; } }
  });
  const out=[];
  $c.children().each((i,el)=>{
    const t=(el.tagName||'').toLowerCase();
    const inner = clean($(el).html()||'');
    const text = clean($(el).text());
    if(/^h[1-6]$/.test(t)){ const lvl = (t==='h1'||t==='h2')?'h2':'h3'; if(text) out.push(`<${lvl}>${inner}</${lvl}>`); }
    else if(t==='ul'||t==='ol'){ const items=$(el).find('li').map((j,li)=>`<li>${clean($(li).html()||'')}</li>`).get().filter(x=>clean(x).replace(/<[^>]+>/g,'')).join(''); if(items) out.push(`<${t}>${items}</${t}>`); }
    else if(t==='blockquote'){ if(text) out.push(`<blockquote>${inner}</blockquote>`); }
    else if(t==='img'){ out.push($.html(el)); }
    else if(t==='p'){ if(text||/img/.test(inner)) out.push(`<p>${inner}</p>`); }
    else if(text||/img/.test(inner)) out.push(`<p>${inner}</p>`);
  });
  return out.join('\n    ');
}

(async()=>{
  const posts=[]; const imgJobs=[];
  for(const url of URLS){
    const r = await fetch(url, {headers:{'user-agent':'Mozilla/5.0'}});
    const html = await r.text();
    const $ = cheerio.load(html);
    const slug = url.split('/post/')[1];
    const title = clean($('meta[property="og:title"]').attr('content')) || clean($('h1').first().text());
    const ogImg = ($('meta[property="og:image"]').attr('content')||'').split(' ')[0];
    let date='', author='', desc='';
    $('script[type="application/ld+json"]').each((i,el)=>{ try{ const o=JSON.parse($(el).contents().text()); for(const it of (Array.isArray(o)?o:[o])){ if(it['@type']==='BlogPosting'){ date=it.datePublished||date; if(it.author) author=it.author.name||author; desc=it.description||desc; } } }catch(e){} });
    desc = clean(desc) || clean($('meta[property="og:description"]').attr('content'));
    const container = $('[data-hook="post-description"]').first();
    const body = buildBody($, container, slug, imgJobs);
    if(ogImg) imgJobs.push({url: ogImg, base: slug, width: 1100});
    const firstP = (body.match(/<p>([\s\S]*?)<\/p>/)||[])[1]||'';
    const excerpt = clean(firstP.replace(/<[^>]+>/g,'')).slice(0,160);
    posts.push({ slug, title, date, dateDisplay: fmtDate(date), author: author||'Hunters Services', desc: desc.slice(0,155), excerpt, hasHero: !!ogImg, body });
    console.log(`✓ ${slug}  (${title.length} title, ${body.length} body chars, hero:${!!ogImg})`);
  }
  console.log(`\nDownloading/optimizing ${imgJobs.length} images...`);
  for(const j of imgJobs){ try{ await saveImg(j.url, j.base, j.width); }catch(e){ console.log('  IMG FAIL', j.base, e.message); } }
  fs.writeFileSync(path.join(__dirname,'blog-data.json'), JSON.stringify(posts,null,1));
  console.log(`\nWrote blog-data.json (${posts.length} posts). Sorted by date desc.`);
})().catch(e=>{console.error(e);process.exit(1);});
