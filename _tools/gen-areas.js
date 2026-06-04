const fs = require('fs');
const path = require('path');
const SRCDIR = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src/areas');

// Pull the shared review block + services list verbatim from the existing Chico page for fidelity.
const chico = fs.readFileSync(path.join(SRCDIR, 'chico.html'), 'utf8');
const revStart = chico.indexOf('<section class="sec "><div class="container">');
const ctaStart = chico.indexOf('<section class="sec-sm"><div class="container"><div class="cta-band reveal">');
const REVIEWS = chico.slice(revStart, ctaStart);
const SERVICES_LIST = chico.match(/<ul class="sidebar-list" style="columns:2;gap:1rem">[\s\S]*?<\/ul>/)[0];
if (!REVIEWS || !SERVICES_LIST) throw new Error('Could not extract shared blocks');

const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
const PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
const CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

const areas = [
  {
    slug: 'durham', name: 'Durham', type: 'City', isCounty: false,
    county: 'Butte County', region: 'Durham & Butte County',
    intro: "Eco-friendly pest, termite, weed & tree services for Durham and the surrounding Butte County countryside — from your neighbors at Hunters Services, protecting this region since 1992.",
    p1: "Durham's country properties, almond orchards, and family homes sit right between our Oroville headquarters and Chico, so we know this little community well. Rural lots and nearby ag land bring their own pest pressures, and we stay on top of them year-round.",
    sub: ['Durham–Dayton area', 'Midway & Durham Pump Road', 'Country & orchard properties', 'Durham schools neighborhood', 'Surrounding Butte County farmland'],
    pests: [
      ['Ants & spiders', "Orchard edges and country yards keep ants and spiders active around Durham homes through the warm months."],
      ['Rodents', "Barns, outbuildings, and adjacent fields make rats and mice a year-round concern on rural Durham properties."],
      ['Ground squirrels & wildlife', "Open land around Durham invites ground squirrels and nuisance wildlife, which we exclude humanely."],
      ['Termites', "Older country homes and add-ons benefit from regular termite inspections before small problems get expensive."],
    ],
    map: '39.6457,-121.7997', zoom: 12,
  },
  {
    slug: 'gridley', name: 'Gridley', type: 'City', isCounty: false,
    county: 'Butte County', region: 'Gridley & south Butte County',
    intro: "Eco-friendly pest, termite, weed & tree services for Gridley and south Butte County — local, family-owned protection from Hunters Services since 1992.",
    p1: "From Gridley's historic downtown to the orchards and row crops that surround the self-proclaimed Kiwi Capital, our technicians know the pests that come with Feather River farm country. We've served south Butte County for over 30 years.",
    sub: ['Downtown Gridley', 'Biggs & the Highway 99 corridor', 'Feather River–side properties', 'Orchard & farm properties', 'Gridley residential neighborhoods'],
    pests: [
      ['Rodents', "Surrounding orchards and rice ground push rats and mice toward Gridley homes, especially after harvest and into fall."],
      ['Ants & spiders', "Warm valley summers keep ants and spiders busy around foundations, eaves, and gardens."],
      ['Mosquitoes & occasional invaders', "Proximity to the Feather River and irrigation canals can raise mosquito and earwig pressure in the warmer months."],
      ['Termites', "Gridley's older downtown and farmhouse homes make termite inspection important before buying, selling, or remodeling."],
    ],
    map: '39.3638,-121.6936', zoom: 12,
  },
  {
    slug: 'stockton', name: 'Stockton', type: 'City', isCounty: false,
    county: 'San Joaquin County', region: 'Stockton & San Joaquin County',
    intro: "Eco-friendly pest, termite, rodent, wildlife, weed & tree services for Stockton and San Joaquin County — dependable, family-owned protection from Hunters Services.",
    p1: "Stockton's Delta climate, established neighborhoods, and busy commercial corridors create steady, year-round pest pressure. Our team brings the same eco-friendly, IPM-first service to San Joaquin County that's protected Northern California since 1992.",
    sub: ['Downtown & the Miracle Mile', 'Lincoln Village & Brookside', 'Weston Ranch & Spanos Park', 'Delta-side properties', 'Commercial & multi-unit properties'],
    pests: [
      ['Cockroaches', "Warm weather and Delta humidity make cockroaches a common concern in Stockton kitchens, restaurants, and multi-unit buildings."],
      ['Ants & spiders', "Stockton's long warm season keeps ants and spiders active around homes and businesses for much of the year."],
      ['Rodents', "Older neighborhoods and commercial areas give rats and mice plenty of entry points; we trap, sanitize, and seal."],
      ['Termites', "Delta moisture and mature housing stock make regular termite inspection a smart investment in Stockton."],
    ],
    map: '37.9577,-121.2908', zoom: 11,
  },
  {
    slug: 'plumas-county', name: 'Plumas County', type: 'AdministrativeArea', isCounty: true,
    county: 'Plumas County', region: 'Plumas County',
    intro: "Eco-friendly pest, rodent, wildlife & tree services for Plumas County's mountain communities — from Quincy to Portola — backed by Hunters Services since 1992.",
    p1: "Plumas County's forests, cabins, and mountain homes face very different pests than the valley floor — and we know them well. From full-time residences to vacation cabins, we protect properties across the region with eco-friendly, IPM-first care.",
    sub: ['Quincy & East Quincy', 'Portola', 'Graeagle & Blairsden', 'Chester & Lake Almanor', 'Cabins & vacation properties'],
    pests: [
      ['Rodents', "Mountain cabins and seasonal homes are prime targets for deer mice and wood rats — sealing and sanitation are essential, especially after winter."],
      ['Carpenter ants & wood-borers', "Forest settings and wood construction invite carpenter ants and wood-boring pests that can damage structures over time."],
      ['Wildlife, bats & squirrels', "We humanely exclude bats, squirrels, and other wildlife from the attics, eaves, and outbuildings common to mountain properties."],
      ['Yellowjackets & wasps', "Warm mountain summers bring yellowjacket and wasp nests around decks, eaves, and woodpiles."],
    ],
    map: '39.9368,-120.9469', zoom: 9,
  },
  {
    slug: 'shasta-county', name: 'Shasta County', type: 'AdministrativeArea', isCounty: true,
    county: 'Shasta County', region: 'Shasta County',
    intro: "Eco-friendly pest, termite, rodent, wildlife, weed & tree services across Shasta County — Redding, Anderson, and beyond — from family-owned Hunters Services.",
    p1: "Shasta County's hot summers and mix of city and rural properties drive strong pest pressure from spring through fall. Our team delivers the same eco-friendly, IPM-first protection to the Redding area that's earned the trust of more than 50,000 Northern California homeowners.",
    sub: ['Redding & Enterprise', 'Anderson', 'Shasta Lake', 'Palo Cedro & Bella Vista', 'Rural & foothill properties'],
    pests: [
      ['Ants', "Shasta County's intense summer heat sends ants indoors in search of water, making them the area's number-one nuisance pest."],
      ['Spiders, including black widows', "Hot, dry conditions favor spiders — including black widows along foundations, eaves, and outbuildings."],
      ['Wasps & yellowjackets', "Long, hot seasons bring aggressive wasp and yellowjacket nests around homes and businesses."],
      ['Rodents & termites', "Foothill properties see rodent activity in fall, and the area's mature homes make termite inspection worthwhile."],
    ],
    map: '40.5865,-122.3917', zoom: 10,
  },
  {
    slug: 'colusa-county', name: 'Colusa County', type: 'AdministrativeArea', isCounty: true,
    county: 'Colusa County', region: 'Colusa County',
    intro: "Eco-friendly pest, rodent, weed & tree services across Colusa County — Colusa, Williams, and the surrounding Sacramento Valley farmland — from Hunters Services since 1992.",
    p1: "Colusa County's rice fields, orchards, and valley towns bring distinct, ag-driven pest pressures. We've protected Sacramento Valley properties for over 30 years with the same eco-friendly, IPM-first approach, customized to rural and in-town homes alike.",
    sub: ['Colusa', 'Williams', 'Arbuckle', 'Maxwell', 'Farm & orchard properties'],
    pests: [
      ['Rodents', "Rice ground and orchards push rats and mice toward homes and outbuildings, especially after harvest — sealing and sanitation are key."],
      ['Mosquitoes & occasional invaders', "Flood-irrigated fields and canals can raise mosquito, earwig, and beetle pressure through the warm season."],
      ['Ants & spiders', "Hot valley summers keep ants and spiders active around foundations, gardens, and farm structures."],
      ['Termites', "Older valley farmhouses and in-town homes benefit from regular termite inspection before problems spread."],
    ],
    map: '39.2143,-122.0094', zoom: 10,
  },
];

function faqsFor(d) {
  const where = d.isCounty ? d.name : `${d.name}`;
  return [
    [`Do you provide pest control in ${where}?`,
     `Yes — ${where} is part of our Northern California service area, served from our Oroville headquarters. We provide the full range of eco-friendly pest, termite, rodent, wildlife, weed, and tree services to ${where} homes and businesses.`],
    [`How fast can you get to my ${d.name} property?`,
     `We offer flexible scheduling and keep a team on standby for urgent issues, so ${d.name} appointments are often available the same day. Call (530) 342-8950 and we'll find the soonest time that works.`],
    [`Are your treatments eco-friendly?`,
     `They are. As the first eco-certified pest control company in Northern California, we lead with Integrated Pest Management — targeted, low-impact methods that are safe around your family and pets.`],
    [`Is Hunters Services local?`,
     `We're family owned and operated by California natives, headquartered in Oroville since 1992. We're not a national chain — we're your neighbors, and we've protected this region for over 30 years.`],
  ];
}

function faqHtml(faqs) {
  const items = faqs.map(([q, a]) =>
    `<div class="faq-item"><button class="faq-q">${q}<span class="pm"></span></button><div class="faq-a"><div>${a}</div></div></div>`
  ).join('');
  return `<div class="faq">${items}</div>`;
}
function faqSchema(faqs) {
  return JSON.stringify({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
  });
}
function bizSchema(d) {
  return JSON.stringify({
    "@context": "https://schema.org", "@type": "PestControlService",
    name: `Hunters Services — ${d.name}`, telephone: "+15303428950",
    areaServed: { "@type": d.type, name: d.name },
    address: { "@type": "PostalAddress", streetAddress: "2060 3rd Street", addressLocality: "Oroville", addressRegion: "CA", postalCode: "95965" }
  });
}

function page(d) {
  const titleLoc = d.isCounty ? d.name : `${d.name}, CA`;
  const title = `Pest Control in ${titleLoc} | Hunters Services — Eco-Friendly &amp; Local`;
  const desc = `Eco-friendly pest control, termite, rodent, wildlife, weed &amp; tree services in ${d.name}, California. Family owned since 1992. Free estimates — call (530) 342-8950.`;
  const faqs = faqsFor(d);
  const crumb = d.isCounty ? d.name : `${d.name}, CA`;
  const subList = d.sub.map(s => `<li>${s}</li>`).join('');
  const pestBlocks = d.pests.map(([h, p]) => `<h3>${h}</h3><p>${p}</p>`).join('');

  const fm =
`---
layout: layouts/base.njk
permalink: "/areas/${d.slug}.html"
nav: areas
title: ${JSON.stringify(title)}
description: ${JSON.stringify(desc)}
canonical: "https://www.hunterspestcontrol.com/areas/${d.slug}.html"
extraSchema: |
  <script type="application/ld+json">${faqSchema(faqs)}</script>
  <script type="application/ld+json">${bizSchema(d)}</script>
---
`;

  const body =
`<section class="page-hero"><div class="container">
  <div class="breadcrumb"><a href="/index.html">Home</a><span>›</span><a href="/index.html#service-areas">Service Areas</a><span>›</span>${crumb}</div>
  <h1>Pest Control in ${d.name}, California</h1>
  <p>${d.intro}</p>
  <div class="ph-badges"><span>${PIN} Serving all of ${d.name}</span><span>${CHK} Same-Day Response</span><span>${CHK} 4.3★ on Google</span></div>
</div></section>

<section class="sec"><div class="container"><div class="content-wrap">
  <div class="prose reveal">
    <h2>Your local ${d.name} pest control team</h2>
    <p>${d.p1}</p>
    <p>Whatever's bugging your ${d.name} home, business, or property, we bring the same eco-friendly, IPM-first approach that's earned the trust of more than 50,000 California homeowners. We know this area's pests, seasons, and properties — because we live and work here too.</p>
    <div class="callout"><p><b>Areas we serve around ${d.name}:</b></p><ul style="margin-top:.6rem">${subList}</ul></div>
    <h2>Common pest issues in ${d.name}</h2>
    ${pestBlocks}
    <div class="callout eco"><p><b>Eco-friendly, always.</b> Every ${d.name} treatment uses Integrated Pest Management — sealing entry points, removing what attracts pests, and applying targeted, low-impact solutions that protect your family, pets, and the local environment.</p></div>
    <h2>Full-service protection for ${d.name}</h2>
    <p>From a single nuisance pest to whole-property care, we handle it all locally:</p>
    ${SERVICES_LIST}
    <div class="mini-map" style="margin-top:1.8rem"><iframe src="https://maps.google.com/maps?q=${d.map}&z=${d.zoom}&output=embed" loading="lazy" title="${d.name} service area map"></iframe></div>
  </div>
  <aside>
    <div class="sidebar-card">
      <div class="top"><h3>Free ${d.name} Estimate</h3><p>Same-day response · Eco-friendly · Local</p></div>
      <div class="body"><form class="lead-form" style="box-shadow:none;border:0;padding:0" data-lead name="estimate" method="POST" action="/thank-you.html" data-netlify="true" data-netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="estimate">
  <input type="hidden" name="source-page" value="areas/${d.slug}">
  <p class="hp-field" hidden aria-hidden="true"><label>Don't fill this out if you're human: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
  <div class="ttl">Get a Quote</div>
  <p class="sub">Serving all of ${d.region}.</p>
  <div class="field-row">
    <div class="field"><label>Full Name</label><input type="text" name="name" aria-label="Full name" placeholder="Jane Smith" required></div>
    <div class="field"><label>Phone</label><input type="tel" name="phone" aria-label="Phone number" placeholder="(530) 000-0000" required></div>
  </div>
  <div class="field"><label>Email</label><input type="email" name="email" aria-label="Email address" placeholder="you@email.com" required></div>
  <div class="field-row">
    <div class="field"><label>Service Needed</label><select name="service" aria-label="Service needed"><option value="">Select a service…</option><option>Pest Control</option><option>Termite Inspection & Repair</option><option>Bed Bug Treatment</option><option>Rodent Control</option><option>Wildlife, Bird & Bat Abatement</option><option>Weed Abatement</option><option>Tree Injections & Treatments</option><option>Other / Not sure</option></select></div>
    <div class="field"><label>Your City</label><select name="city" aria-label="Your city"><option value="">Select…</option><option>Chico</option><option>Oroville</option><option>Paradise</option><option>Sacramento</option><option>Redding</option><option>Durham</option><option>Gridley</option><option>Stockton</option><option>Other NorCal</option></select></div>
  </div>
  <div class="field"><label>How can we help?</label><textarea name="message" aria-label="How can we help?" placeholder="Describe what you're seeing — where, how long, and any concerns."></textarea></div>
  <button type="submit" class="btn btn-primary btn-lg btn-block">${ARROW} Request My Free Estimate</button>
  <p class="form-note">No obligation · Eco-friendly IPM · Family owned since 1992</p>
  <div class="form-success">✓ Thanks! Your request is in. A local Hunters Services team member will reach out shortly. Need us now? Call <a href="tel:+15303428950">(530) 342-8950</a>.</div>
</form></div>
    </div>
  </aside>
</div></div></section>

<section class="sec-sm bg-gray"><div class="container">
  <div class="sec-head center"><div class="eyebrow center">${d.name} · FAQs</div><h2>Pest control in ${d.name}, answered</h2></div>
  ${faqHtml(faqs)}
</div></section>${REVIEWS}<section class="sec-sm"><div class="container"><div class="cta-band reveal">
      <div class="inner">
        <div><h2>${d.name}'s eco-friendly pest control is one call away</h2><p>Get your free, no-obligation estimate for your ${d.name} home or business today.</p></div>
        <div class="acts">
          <a class="btn btn-primary btn-lg" href="/contact.html">${ARROW} Get Free Estimate</a>
          <a class="btn btn-ghost btn-lg" href="tel:+15303428950">${PHONE} (530) 342-8950</a>
        </div>
      </div>
    </div></div></section>
`;
  return fm + body;
}

for (const d of areas) {
  fs.writeFileSync(path.join(SRCDIR, d.slug + '.html'), page(d));
  console.log('wrote areas/' + d.slug + '.html');
}
console.log('Done: ' + areas.length + ' area pages.');
