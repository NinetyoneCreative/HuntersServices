const fs = require('fs');
const path = require('path');

const SRC = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-site');
const OUT = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src');

const pages = [
  { rel: 'index.html',                 nav: 'home',     preloadHero: true },
  { rel: 'services.html',              nav: 'services' },
  { rel: 'about.html',                 nav: 'about' },
  { rel: 'contact.html',               nav: 'contact' },
  { rel: 'thank-you.html',             nav: '' },
  { rel: '404.html',                   nav: '' },
  { rel: 'services/pest-control.html', nav: 'services' },
  { rel: 'services/termites.html',     nav: 'services' },
  { rel: 'services/bed-bugs.html',     nav: 'services' },
  { rel: 'services/rodents.html',      nav: 'services' },
  { rel: 'services/wildlife.html',     nav: 'services' },
  { rel: 'services/weed-abatement.html', nav: 'services' },
  { rel: 'services/tree-services.html',nav: 'services' },
  { rel: 'areas/chico.html',           nav: 'areas' },
  { rel: 'areas/oroville.html',        nav: 'areas' },
  { rel: 'areas/paradise.html',        nav: 'areas' },
  { rel: 'areas/sacramento.html',      nav: 'areas' },
  { rel: 'areas/redding.html',         nav: 'areas' },
];

function pick(re, html) { const m = html.match(re); return m ? m[1] : null; }

const posix = path.posix;
function normalizeLinks(html, pageDir) {
  // pageDir is the page's directory as a root-absolute path, e.g. "/" or "/services/"
  return html.replace(/\b(href|src|srcset)="([^"]*)"/g, (m, attr, val) => {
    if (/^(https?:|tel:|mailto:|#|data:|\/)/i.test(val)) return m;       // absolute / protocol / root
    // Resolve the relative link against the page's directory, then collapse ../ and ./
    let v = posix.normalize(pageDir + val);
    if (!v.startsWith('/')) v = '/' + v;
    return `${attr}="${v}"`;
  });
}

let count = 0;
for (const p of pages) {
  const html = fs.readFileSync(path.join(SRC, p.rel), 'utf8');

  const title = pick(/<title>([\s\S]*?)<\/title>/, html);
  const description = pick(/<meta name="description" content="([\s\S]*?)">/, html);
  const canonical = pick(/<link rel="canonical" href="([\s\S]*?)">/, html);
  const noindex = /name="robots"\s+content="noindex/i.test(html);

  // JSON-LD: drop the first (the shared LocalBusiness block, now in the layout)
  const blocks = html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
  const extra = blocks.slice(1);

  // Page body = between the scrim and the footer
  const start = html.indexOf('<div class="scrim"></div>') + '<div class="scrim"></div>'.length;
  const end = html.indexOf('<footer class="site-footer">');
  if (start < 0 || end < 0) throw new Error('Boundary not found in ' + p.rel);
  const dir = path.posix.dirname('/' + p.rel.replace(/\\/g, '/'));
  const pageDir = dir === '/' ? '/' : dir + '/';
  let content = normalizeLinks(html.slice(start, end).trim(), pageDir);

  // Build front matter
  const fm = ['---', 'layout: layouts/base.njk', `permalink: "/${p.rel}"`];
  if (p.nav) fm.push(`nav: ${p.nav}`);
  fm.push(`title: ${JSON.stringify(title)}`);
  fm.push(`description: ${JSON.stringify(description)}`);
  if (canonical) fm.push(`canonical: ${JSON.stringify(canonical)}`);
  if (noindex) fm.push('noindex: true');
  if (p.preloadHero) fm.push('preloadHero: true');
  if (extra.length) {
    fm.push('extraSchema: |');
    for (const b of extra) fm.push('  ' + b.replace(/\r?\n/g, ' '));
  }
  fm.push('---', '');

  const outPath = path.join(OUT, p.rel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, fm.join('\n') + content + '\n');
  count++;
  console.log(`${p.rel.padEnd(30)} title:${title ? 'y' : 'n'} canon:${canonical ? 'y' : 'n'} extra:${extra.length} noindex:${noindex}`);
}
console.log(`\nMigrated ${count} pages -> ${OUT}`);
