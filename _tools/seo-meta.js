const fs = require('fs');
const path = require('path');
const SRC = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src');

// title <=60 chars (keyword-first), description <=155 (CTA + phone). Use &amp; for ampersands.
const META = {
  'index.html': {
    t: 'Eco-Friendly Pest Control in Northern CA | Hunters Services',
    d: 'Family-owned, eco-friendly pest, termite, rodent, weed &amp; tree control across Northern California since 1992. Free estimates — call (530) 342-8950.' },
  'services.html': {
    t: 'Pest, Termite, Weed &amp; Tree Services | Hunters Services',
    d: 'Eco-friendly pest control, termite, bed bug, rodent, wildlife, weed &amp; tree services across Northern California. Free estimates — (530) 342-8950.' },
  'about.html': {
    t: 'About Hunters Services | NorCal Pest Control Since 1992',
    d: 'Hunters Services is a family-owned, eco-certified pest control company serving Northern California since 1992 — 50,000+ customers. Call (530) 342-8950.' },
  'contact.html': {
    t: 'Contact Hunters Services | Free Pest Control Estimate',
    d: 'Get a free pest control estimate from Hunters Services. Serving NorCal since 1992 — Oroville (530) 342-8950, Sacramento (916) 273-8911.' },
  'services/pest-control.html': {
    t: 'Pest Control in Northern California | Hunters Services',
    d: 'Eco-friendly residential &amp; commercial pest control across Northern California. Family-owned, IPM-first since 1992. Free estimates — (530) 342-8950.' },
  'services/termites.html': {
    t: 'Termite Inspection &amp; Repair in NorCal | Hunters',
    d: 'Termite inspection, treatment &amp; repair across Northern California. Eco-friendly, family-owned since 1992. Free estimates — call (530) 342-8950.' },
  'services/bed-bugs.html': {
    t: 'Bed Bug Treatment in Northern California | Hunters',
    d: 'Discreet, effective bed bug treatment across Northern California. Eco-friendly &amp; family-owned since 1992. Free estimates — call (530) 342-8950.' },
  'services/rodents.html': {
    t: 'Rodent Control &amp; Exclusion in NorCal | Hunters',
    d: 'Rodent control &amp; exclusion across Northern California — humane trapping, sealing &amp; sanitation. Since 1992. Free estimates — (530) 342-8950.' },
  'services/wildlife.html': {
    t: 'Wildlife, Bird &amp; Bat Control in NorCal | Hunters',
    d: 'Humane wildlife, bird &amp; bat abatement across Northern California — netting, exclusion &amp; cleanup. Since 1992. Free estimates — (530) 342-8950.' },
  'services/weed-abatement.html': {
    t: 'Weed Abatement &amp; Fire Prevention | Hunters Services',
    d: 'Weed abatement &amp; vegetation control for fire safety across Northern California. Family-owned since 1992. Free estimates — (530) 342-8950.' },
  'services/tree-services.html': {
    t: 'Tree Injection &amp; Treatment in NorCal | Hunters',
    d: 'Tree injection &amp; treatment to protect your trees across Northern California. Eco-friendly since 1992. Free estimates — call (530) 342-8950.' },
};
// Area pages
const AREAS = {
  'chico': ['Chico', 'Chico, CA'], 'oroville': ['Oroville', 'Oroville, CA'], 'paradise': ['Paradise', 'Paradise, CA'],
  'durham': ['Durham', 'Durham, CA'], 'gridley': ['Gridley', 'Gridley, CA'], 'sacramento': ['Sacramento', 'Sacramento, CA'],
  'redding': ['Redding', 'Redding, CA'], 'stockton': ['Stockton', 'Stockton, CA'],
  'plumas-county': ['Plumas County', 'Plumas County'], 'shasta-county': ['Shasta County', 'Shasta County'], 'colusa-county': ['Colusa County', 'Colusa County'],
};
for (const [slug, [name, loc]] of Object.entries(AREAS)) {
  META[`areas/${slug}.html`] = {
    t: `${name} Pest Control | Hunters Services`,
    d: `Eco-friendly pest, termite, rodent, weed &amp; tree control in ${loc}. Family-owned &amp; local since 1992. Free estimates — call (530) 342-8950.` };
}

let n = 0;
for (const [rel, m] of Object.entries(META)) {
  const fp = path.join(SRC, rel);
  let h = fs.readFileSync(fp, 'utf8');
  const before = h;
  h = h.replace(/^title: .*$/m, 'title: ' + JSON.stringify(m.t));
  h = h.replace(/^description: .*$/m, 'description: ' + JSON.stringify(m.d));
  if (h === before) { console.log('NO CHANGE (check):', rel); continue; }
  fs.writeFileSync(fp, h);
  n++;
  const plain = s => s.replace(/&amp;/g,'&');
  console.log(`${rel.padEnd(30)} title ${plain(m.t).length}  desc ${plain(m.d).length}`);
}
console.log(`\nUpdated ${n} pages.`);
