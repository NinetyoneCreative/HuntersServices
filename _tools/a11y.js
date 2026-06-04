const fs = require('fs');
const path = require('path');
const base = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-site');

const all = [
  'index.html','services.html','about.html','contact.html','thank-you.html','404.html',
  'services/pest-control.html','services/termites.html','services/bed-bugs.html',
  'services/rodents.html','services/wildlife.html','services/weed-abatement.html','services/tree-services.html',
  'areas/chico.html','areas/oroville.html','areas/paradise.html','areas/sacramento.html','areas/redding.html',
];

const LABELS = {
  name: 'Full name', phone: 'Phone number', email: 'Email address',
  service: 'Service needed', city: 'Your city', message: 'How can we help?'
};

let stats = { logos: 0, fields: 0 };
for (const rel of all) {
  const fp = path.join(base, rel);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');

  // Logo dimensions + decoding (header brand + footer flogo). Only if not already sized.
  html = html.replace(/<img src="((?:\.\.\/)?assets\/logo\.png)" alt="Hunters Services — Pests, Termites, Weeds, Trees">/g,
    (m, src) => { stats.logos++; return `<img src="${src}" alt="Hunters Services — Pests, Termites, Weeds, Trees" width="1042" height="321" decoding="async">`; });
  html = html.replace(/<img class="flogo" src="((?:\.\.\/)?assets\/logo\.png)" alt="Hunters Services">/g,
    (m, src) => { stats.logos++; return `<img class="flogo" src="${src}" alt="Hunters Services" width="1042" height="321" loading="lazy" decoding="async">`; });

  // aria-label on the 6 lead-form controls (skip if already present)
  for (const name of Object.keys(LABELS)) {
    const label = LABELS[name];
    // input
    html = html.replace(new RegExp('(<input\\b(?![^>]*aria-label)[^>]*\\bname="' + name + '")', 'g'),
      (m) => { stats.fields++; return m + ' aria-label="' + label + '"'; });
    // select
    html = html.replace(new RegExp('(<select\\b(?![^>]*aria-label)[^>]*\\bname="' + name + '")', 'g'),
      (m) => { stats.fields++; return m + ' aria-label="' + label + '"'; });
    // textarea
    html = html.replace(new RegExp('(<textarea\\b(?![^>]*aria-label)[^>]*\\bname="' + name + '")', 'g'),
      (m) => { stats.fields++; return m + ' aria-label="' + label + '"'; });
  }

  fs.writeFileSync(fp, html);
}
console.log('logos sized:', stats.logos, '| fields labeled:', stats.fields);

// LCP preload for the home hero (idempotent)
const idx = path.join(base, 'index.html');
let ih = fs.readFileSync(idx, 'utf8');
if (!ih.includes('rel="preload" as="image"')) {
  ih = ih.replace('<link rel="stylesheet" href="css/styles.css">',
    '<link rel="preload" as="image" href="assets/technician.webp" type="image/webp" fetchpriority="high">\n<link rel="stylesheet" href="css/styles.css">');
  fs.writeFileSync(idx, ih);
  console.log('Added hero preload to index.html');
}
