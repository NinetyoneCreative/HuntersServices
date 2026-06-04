const fs = require('fs');
const path = require('path');
const SRC = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src');

const PAGES = {
  'index.html': { heading: 'Pest control questions, answered', faqs: [
    ['Is Hunters Services’ pest control safe for kids and pets?', 'Yes. We’re the first eco-certified pest control company in Northern California and lead with Integrated Pest Management (IPM) — sealing entry points, removing what attracts pests, and using targeted, low-impact treatments that are safe around your family and pets.'],
    ['How much does pest control cost?', 'Every home and business is different, so we provide a free, no-obligation estimate with honest, up-front pricing. Most estimates come back the same day — call (530) 342-8950 or request one online.'],
    ['What areas does Hunters Services cover?', 'We’re based in Oroville and serve Chico, Oroville, Paradise, Durham, Gridley, Sacramento, Redding and Stockton, plus Plumas, Shasta and Colusa counties across Northern California.'],
    ['How quickly can you come out?', 'We offer flexible scheduling and keep a team on standby for urgent issues, so appointments are often available the same day. Call (530) 342-8950 and we’ll find the soonest time that works.'],
    ['What makes Hunters Services different?', 'Family owned and locally operated by California natives since 1992, we’ve protected more than 50,000 homes and businesses, hold a 4.3-star Google rating from 708 reviews, and were Northern California’s first eco-certified pest control company. Licensed and insured — CA Lic. OPR 9803.'],
  ]},
  'services.html': { heading: 'Service questions, answered', faqs: [
    ['What pest control services does Hunters Services offer?', 'We offer general pest control, termite inspection & repair, bed bug treatment, rodent control & exclusion, wildlife/bird/bat abatement, weed abatement, and tree injections & treatments — all under one roof for homes and businesses across Northern California.'],
    ['Are your treatments eco-friendly?', 'Yes. As the first eco-certified pest control company in Northern California, we lead with Integrated Pest Management (IPM) — biological agents, exclusion, and targeted, low-impact products that are safe around your family and pets.'],
    ['Do you serve both residential and commercial properties?', 'We do. From single-family homes to restaurants, retail, offices, and multi-unit housing, we provide discreet, documented service throughout Northern California.'],
    ['How do I get a quote?', 'Request a free, no-obligation estimate online or call (530) 342-8950 (Oroville) or (916) 273-8911 (Sacramento). Most estimates come back the same day.'],
  ]},
  'about.html': { heading: 'About Hunters Services — FAQs', faqs: [
    ['How long has Hunters Services been in business?', 'Since 1992 — more than 30 years serving Northern California. In that time we’ve protected over 50,000 homes and businesses.'],
    ['Is Hunters Services licensed and insured?', 'Yes. We’re fully licensed and insured in California, operating under CA Structural Pest Control License OPR 9803.'],
    ['What do “eco-certified” and “IPM” mean?', 'We were the first eco-certified pest control company in Northern California. We lead with Integrated Pest Management (IPM) — using biological agents, growth regulators, mechanical controls, and minimal targeted pesticide instead of a chemical-first approach.'],
    ['Where is Hunters Services located?', 'Our headquarters is at 2060 3rd Street, Oroville, CA 95965, with a second office serving the Sacramento area. Call Oroville (530) 342-8950 or Sacramento (916) 273-8911.'],
  ]},
  'contact.html': { heading: 'Contact & scheduling FAQs', faqs: [
    ['How do I get a free estimate?', 'Fill out the estimate form on this page or call us — Oroville (530) 342-8950 or Sacramento (916) 273-8911. Most estimates come back the same day, with no obligation.'],
    ['What are your hours?', 'We’re open Monday–Thursday 8 AM–5 PM and Friday 8 AM–3 PM (closed weekends). Emergency service is available when you need us.'],
    ['Do you offer emergency service?', 'Yes. While our regular hours are Mon–Thu 8–5 and Fri 8–3, we keep a team available for urgent pest emergencies — call (530) 342-8950.'],
    ['What’s the best number to call?', 'For Oroville and the surrounding north valley, call (530) 342-8950. For the Sacramento area, call (916) 273-8911. You can also email pest@huntersservices.com.'],
  ]},
};

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function faqHtml(heading, faqs) {
  const items = faqs.map(([q,a]) => `<div class="faq-item"><button class="faq-q">${esc(q)}<span class="pm"></span></button><div class="faq-a"><div>${esc(a)}</div></div></div>`).join('');
  return `<section class="sec-sm bg-gray"><div class="container">\n  <div class="sec-head center"><div class="eyebrow center">FAQs</div><h2>${esc(heading)}</h2></div>\n  <div class="faq">${items}</div>\n</div></section>\n`;
}
function faqSchema(faqs) {
  return `<script type="application/ld+json">${JSON.stringify({
    '@context':'https://schema.org','@type':'FAQPage',
    mainEntity: faqs.map(([q,a]) => ({'@type':'Question', name:q, acceptedAnswer:{'@type':'Answer', text:a}}))
  })}</script>`;
}
function addSchema(h, scriptLine) {
  const fmEnd = h.indexOf('\n---\n', 3);
  if (fmEnd < 0) throw new Error('fm end not found');
  if (h.slice(0, fmEnd).includes('extraSchema:')) {
    return h.slice(0, fmEnd) + '\n  ' + scriptLine + h.slice(fmEnd);
  }
  return h.slice(0, fmEnd) + '\nextraSchema: |\n  ' + scriptLine + h.slice(fmEnd);
}

const CTA = '<section class="sec-sm"><div class="container"><div class="cta-band reveal">';
for (const [rel, cfg] of Object.entries(PAGES)) {
  const fp = path.join(SRC, rel);
  let h = fs.readFileSync(fp, 'utf8');
  if (h.includes('class="faq"')) { console.log(rel, '— already has FAQ, skipping'); continue; }
  const section = faqHtml(cfg.heading, cfg.faqs);
  const ctaIdx = h.indexOf(CTA);
  if (ctaIdx >= 0) h = h.slice(0, ctaIdx) + section + h.slice(ctaIdx);
  else h = h.replace(/\s*$/, '\n') + section; // append at end
  h = addSchema(h, faqSchema(cfg.faqs));
  fs.writeFileSync(fp, h);
  console.log(rel, `— added ${cfg.faqs.length} FAQs + FAQPage schema (${ctaIdx>=0?'before CTA':'appended'})`);
}
console.log('Done.');
