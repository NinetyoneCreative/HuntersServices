const fs = require('fs');
const path = require('path');
const SRC = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src');
const ORIGIN = 'https://www.hunterspestcontrol.com';

const KF_ITEMS = [
  'Family owned &amp; local since <b>1992</b>',
  '<b>50,000+</b> NorCal homes &amp; businesses protected',
  'Eco-certified, <b>IPM-first</b> approach',
  'Licensed &amp; insured · <b>CA Lic. OPR 9803</b>',
  '<b>4.3★</b> on Google · 708 reviews',
  'Free estimates · <b>same-day</b> response',
];
function keyfacts(extraFirst) {
  const items = (extraFirst ? [extraFirst] : []).concat(KF_ITEMS).map(i => `<li>${i}</li>`).join('');
  return `<div class="keyfacts"><b class="kf-h">Hunters Services at a glance</b><ul>${items}</ul></div>`;
}
function bc(items) {
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url }))
  })}</script>`;
}
function appendSchema(h, scriptLine) {
  if (h.includes('BreadcrumbList')) return h; // idempotent
  const fmEnd = h.indexOf('\n---\n', 3);
  if (fmEnd < 0) throw new Error('front matter end not found');
  return h.slice(0, fmEnd) + '\n  ' + scriptLine + h.slice(fmEnd);
}

// ---- Service pages ----
const SERVICES = [
  ['pest-control', 'Residential & Commercial Pest Control', 'Pest Control'],
  ['termites', 'Termite Inspection & Repair', 'Termite Inspection & Repair'],
  ['bed-bugs', 'Bed Bug Treatment', 'Bed Bug Treatment'],
  ['rodents', 'Rodent Control & Exclusion', 'Rodent Control'],
  ['wildlife', 'Wildlife, Bird & Bat Abatement', 'Wildlife Abatement'],
  ['weed-abatement', 'Weed Abatement', 'Weed Abatement'],
  ['tree-services', 'Tree Injections & Treatments', 'Tree Services'],
];
for (const [slug, h1, crumb] of SERVICES) {
  const fp = path.join(SRC, 'services', slug + '.html');
  let h = fs.readFileSync(fp, 'utf8');
  // H1 + location
  h = h.replace(`<h1>${h1}</h1>`, `<h1>${h1} in Northern California</h1>`);
  // Key facts before the eco callout
  if (!h.includes('class="keyfacts"')) {
    h = h.replace('<div class="callout eco">', keyfacts() + '\n    <div class="callout eco">');
  }
  // Breadcrumb schema
  h = appendSchema(h, bc([
    { name: 'Home', url: ORIGIN + '/' },
    { name: 'Services', url: ORIGIN + '/services.html' },
    { name: crumb, url: `${ORIGIN}/services/${slug}.html` },
  ]));
  fs.writeFileSync(fp, h);
  console.log('service:', slug, '— H1+location, keyfacts, breadcrumb');
}

// ---- Area pages ----
const AREAS = {
  'chico': ['Chico', 'Chico, CA'], 'oroville': ['Oroville', 'Oroville, CA'], 'paradise': ['Paradise', 'Paradise, CA'],
  'durham': ['Durham', 'Durham, CA'], 'gridley': ['Gridley', 'Gridley, CA'], 'sacramento': ['Sacramento', 'Sacramento, CA'],
  'redding': ['Redding', 'Redding, CA'], 'stockton': ['Stockton', 'Stockton, CA'],
  'plumas-county': ['Plumas County', 'Plumas County'], 'shasta-county': ['Shasta County', 'Shasta County'], 'colusa-county': ['Colusa County', 'Colusa County'],
};
for (const [slug, [name, crumb]] of Object.entries(AREAS)) {
  const fp = path.join(SRC, 'areas', slug + '.html');
  let h = fs.readFileSync(fp, 'utf8');
  if (!h.includes('class="keyfacts"')) {
    const anchor = `<div class="callout"><p><b>Areas we serve around ${name}:</b>`;
    if (!h.includes(anchor)) { console.log('  WARN area anchor not found:', slug); }
    h = h.replace(anchor, keyfacts(`Local pest control across <b>${name}</b>`) + '\n    ' + anchor);
  }
  h = appendSchema(h, bc([
    { name: 'Home', url: ORIGIN + '/' },
    { name: 'Service Areas', url: ORIGIN + '/index.html#service-areas' },
    { name: crumb, url: `${ORIGIN}/areas/${slug}.html` },
  ]));
  fs.writeFileSync(fp, h);
  console.log('area:', slug, '— keyfacts, breadcrumb');
}
console.log('Done.');
