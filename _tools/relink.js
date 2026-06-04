const fs = require('fs');
const path = require('path');

const base = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-site');

const ID2SLUG = {
  '0b7d4c13092b42e1b970b330519d5560': 'pest-control',
  'd80a08f008d549ddab210a432d3d9f81': 'termites',
  '17bc90e5d2b44b349f8df91107fb8ede': 'bed-bugs',
  '9a3ee2594ea24bda908252e52ca72934': 'rodents',
  '1847c76f9d964dd492506fd999d994d4': 'wildlife',
  '573f5ce8069e45a6ada713529d6bbec5': 'weed-abatement',
  '3fe2e69857a645678cf6eee84c85626e': 'tree-services',
};
const DIMS = { card: { w: 760, h: 441 }, wide: { w: 1100, h: 639 } };

const files = [
  'index.html', 'services.html', 'about.html',
  'services/pest-control.html','services/termites.html','services/bed-bugs.html',
  'services/rodents.html','services/wildlife.html','services/weed-abatement.html','services/tree-services.html',
];

const imgRe = /<img\b[^>]*?src="https:\/\/static\.wixstatic\.com\/media\/8c8a06_([0-9a-f]+)~mv2\.[a-z]+\/v1\/fill\/w_(\d+),[^"]*"[^>]*?>/g;

function attr(tag, name) {
  const m = tag.match(new RegExp(name + '="([^"]*)"'));
  return m ? m[1] : null;
}

let total = 0;
for (const rel of files) {
  const fp = path.join(base, rel);
  let html = fs.readFileSync(fp, 'utf8');
  const prefix = rel.includes('/') ? '../' : '';
  let count = 0;
  html = html.replace(imgRe, (tag, id, w) => {
    const slug = ID2SLUG[id];
    if (!slug) return tag; // leave untouched if unknown
    const variant = (w === '620') ? 'card' : 'wide';
    const d = DIMS[variant];
    const alt = attr(tag, 'alt') || '';
    const style = attr(tag, 'style');
    const styleAttr = style ? ` style="${style}"` : '';
    const p = `${prefix}assets/services/${slug}-${variant}`;
    count++; total++;
    return `<picture><source srcset="${p}.webp" type="image/webp">` +
      `<img src="${p}.jpg" alt="${alt}"${styleAttr} width="${d.w}" height="${d.h}" ` +
      `loading="lazy" decoding="async" onerror="this.style.display='none'"></picture>`;
  });
  fs.writeFileSync(fp, html);
  console.log(`${rel}: ${count} image(s) relinked`);
}
console.log(`Total: ${total}`);
