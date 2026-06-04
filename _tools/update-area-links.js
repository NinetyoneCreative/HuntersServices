const fs = require('fs');
const path = require('path');
const SRC = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src');

const slug = n => n.toLowerCase().replace(/ /g, '-');
const chipRe = /<div class="area-chip plain( reveal)?">(<svg[\s\S]*?<\/svg>)<b>([^<]+)<\/b><small>[^<]*<\/small><\/div>/g;
function convertChips(html) {
  let count = 0;
  const out = html.replace(chipRe, (m, rev, svg, name) => {
    count++;
    const cls = rev ? 'area-chip reveal' : 'area-chip';
    const label = rev ? 'View local page' : 'Local page';
    return `<a class="${cls}" href="/areas/${slug(name)}.html">${svg}<b>${name}</b><small>${label}</small></a>`;
  });
  return [out, count];
}

// index.html: add section anchor + convert chips
let idx = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
const before = idx;
idx = idx.replace('<section class="sec bg-navy"><div class="container">\n    <div class="sec-head center">\n      <div class="eyebrow light center">Proudly Local</div>',
                   '<section class="sec bg-navy" id="service-areas"><div class="container">\n    <div class="sec-head center">\n      <div class="eyebrow light center">Proudly Local</div>');
const idAdded = idx !== before;
let idxCount; [idx, idxCount] = convertChips(idx);
fs.writeFileSync(path.join(SRC, 'index.html'), idx);
console.log(`index.html: anchor added=${idAdded}, chips converted=${idxCount}`);

// contact.html: convert chips
let con = fs.readFileSync(path.join(SRC, 'contact.html'), 'utf8');
let conCount; [con, conCount] = convertChips(con);
fs.writeFileSync(path.join(SRC, 'contact.html'), con);
console.log(`contact.html: chips converted=${conCount}`);

// existing area pages: repoint "Service Areas" breadcrumb to the home anchor
for (const f of ['chico', 'oroville', 'paradise', 'sacramento', 'redding']) {
  const fp = path.join(SRC, 'areas', f + '.html');
  let h = fs.readFileSync(fp, 'utf8');
  const n = (h.match(/<a href="\/contact\.html">Service Areas<\/a>/g) || []).length;
  h = h.replace(/<a href="\/contact\.html">Service Areas<\/a>/g, '<a href="/index.html#service-areas">Service Areas</a>');
  fs.writeFileSync(fp, h);
  console.log(`areas/${f}.html: breadcrumb repointed=${n}`);
}
