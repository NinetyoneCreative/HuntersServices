const fs = require('fs');
const path = require('path');
const SRC = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src/areas');
const ORIGIN = 'https://www.hunterspestcontrol.com';

// Reuse shared blocks verbatim from an existing area page for fidelity
const ref = fs.readFileSync(path.join(SRC, 'chico.html'), 'utf8');
const SERVICES_LIST = ref.match(/<ul class="sidebar-list" style="columns:2;gap:1rem">[\s\S]*?<\/ul>/)[0];
const revStart = ref.indexOf('<section class="sec "><div class="container">');
const revEnd = ref.indexOf('<section class="sec-sm"><div class="container"><div class="cta-band reveal">');
const REVIEWS = ref.slice(revStart, revEnd);
if (!SERVICES_LIST || !REVIEWS) throw new Error('shared block extraction failed');

const PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
const CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';

const AREAS = [
  { slug:'crescent-city', name:'Crescent City', crumb:'Crescent City, CA', region:'Crescent City &amp; Del Norte County', county:'Del Norte County', type:'City', map:'41.7558,-124.2026', zoom:11,
    intro:"Eco-friendly pest, rodent, and tree services for Crescent City and Del Norte County — coastal, family-owned care from Hunters Services.",
    p1:"Crescent City's cool, wet coastal climate and proximity to the redwoods bring their own pest pressures — moisture-loving insects, rodents seeking shelter from the rain, and wood-destroying organisms that thrive in damp conditions. We bring the same eco-friendly, IPM-first approach to the far North Coast.",
    sub:['Downtown Crescent City','Pelican Bay &amp; the harbor','Bertsch-Oceanview','Redwood-edge properties','Coastal &amp; rural homes'],
    pests:[['Rodents &amp; moisture pests',"The damp coastal climate draws rodents and moisture-loving pests toward homes — sealing and sanitation keep them out."],['Ants &amp; spiders',"Cool, wet weather pushes ants and spiders indoors looking for dry shelter year-round."],['Wood-destroying organisms',"High humidity near the coast and redwoods makes termite and dry-rot inspections especially valuable before buying or selling."],['Wildlife',"Wooded lots invite raccoons, rodents, and other wildlife we exclude humanely."]] },
  { slug:'klamath', name:'Klamath', crumb:'Klamath, CA', region:'Klamath &amp; the Klamath River area', county:'Del Norte County', type:'City', map:'41.5263,-124.0382', zoom:12,
    intro:"Eco-friendly pest, rodent, and tree services for Klamath and the Klamath River area — redwood-country care from Hunters Services.",
    p1:"Tucked along the Klamath River amid towering redwoods, Klamath's wet, wooded setting is prime habitat for rodents, moisture pests, and wood-destroying organisms. Our IPM-first approach protects river-area and rural homes alike.",
    sub:['Klamath townsite','Klamath Glen','Requa &amp; the river mouth','Redwood-edge properties','Rural &amp; riverfront homes'],
    pests:[['Rodents',"Forest and riverbank cover keeps rats, mice, and wood rats close to homes — exclusion is key."],['Moisture &amp; wood pests',"Damp, shaded conditions favor termites and dry rot; inspections catch problems early."],['Ants &amp; spiders',"Wet weather drives ants and spiders indoors for shelter."],['Wildlife',"Wooded, riverside lots attract raccoons and other wildlife we remove humanely."]] },
  { slug:'alturas', name:'Alturas', crumb:'Alturas, CA', region:'Alturas &amp; Modoc County', county:'Modoc County', type:'City', map:'41.4871,-120.5424', zoom:12,
    intro:"Eco-friendly pest, rodent, weed, and tree services for Alturas and Modoc County — high-desert, family-owned care from Hunters Services.",
    p1:"Out in Modoc County's high desert, Alturas sees hot summers, cold winters, and wide-open ranch land — conditions that send rodents and overwintering pests indoors and keep weed and brush management front of mind. We bring our IPM-first approach to far Northeastern California.",
    sub:['Downtown Alturas','Ranch &amp; farm properties','West Valley','Rural &amp; acreage homes','Surrounding Modoc County'],
    pests:[['Rodents',"Cold winters and surrounding ranch land push mice and rats indoors — sealing and sanitation protect your home."],['Ants &amp; overwintering pests',"Seasonal swings drive ants and occasional invaders inside as temperatures shift."],['Spiders',"Outbuildings and woodpiles on rural lots harbor spiders, including black widows."],['Weeds &amp; brush',"Dry summers make weed abatement and brush clearing important for fire safety on open properties."]] },
  { slug:'yreka', name:'Yreka', crumb:'Yreka, CA', region:'Yreka &amp; Siskiyou County', county:'Siskiyou County', type:'City', map:'41.7354,-122.6345', zoom:12,
    intro:"Eco-friendly pest, termite, rodent, weed, and tree services for Yreka and Siskiyou County — mountain-valley care from Hunters Services.",
    p1:"In the shadow of Mt. Shasta along the I-5 corridor, Yreka's historic homes, hot summers, and cold winters create year-round pest pressure. From Gold Rush-era houses downtown to rural acreage, our IPM-first approach keeps Siskiyou County homes protected.",
    sub:['Historic Downtown Yreka','Greenhorn &amp; west side','Montague &amp; the valley floor','Rural &amp; ranch properties','Surrounding Siskiyou County'],
    pests:[['Rodents',"Cold mountain winters drive mice and rats indoors; we trap, sanitize, and seal entry points."],['Termites &amp; wood pests',"Yreka's historic housing stock makes termite inspection important before buying, selling, or remodeling."],['Ants &amp; spiders',"Hot, dry summers keep ants and spiders active around foundations and outbuildings."],['Weeds &amp; brush',"Dry foothill conditions make weed abatement valuable for fire-season safety."]] },
  { slug:'weaverville', name:'Weaverville', crumb:'Weaverville, CA', region:'Weaverville &amp; Trinity County', county:'Trinity County', type:'City', map:'40.7310,-122.9417', zoom:12,
    intro:"Eco-friendly pest, rodent, weed, and tree services for Weaverville and Trinity County — forest-community care from Hunters Services.",
    p1:"Surrounded by the Trinity Alps and national forest, Weaverville's wooded, historic setting brings rodents, wood-destroying pests, and wildlife close to home. Our IPM-first approach protects mountain and historic-district properties throughout Trinity County.",
    sub:['Historic Downtown Weaverville','Lewiston','Douglas City','Forest-edge &amp; cabin properties','Rural &amp; acreage homes'],
    pests:[['Rodents',"Forest cover and cold winters make deer mice and wood rats a year-round concern — sealing and sanitation are essential."],['Carpenter ants &amp; wood pests',"Wooded, damp conditions and historic wood structures invite carpenter ants and termites."],['Wildlife',"Forest-edge lots attract wildlife into attics and outbuildings, which we exclude humanely."],['Weeds &amp; brush',"Heavy forest fuels make weed abatement and defensible-space clearing important for fire safety."]] },
  { slug:'burney', name:'Burney', crumb:'Burney, CA', region:'Burney &amp; the Intermountain area', county:'Shasta County', type:'City', map:'40.8821,-121.6603', zoom:12,
    intro:"Eco-friendly pest, rodent, weed, and tree services for Burney and the Intermountain area — mountain-community care from Hunters Services.",
    p1:"Up in the pines near Burney Falls, Burney's forested, high-elevation setting and cold winters bring rodents, wood pests, and wildlife toward homes. Our IPM-first approach keeps Intermountain-area properties protected through every season.",
    sub:['Burney townsite','Johnson Park','Fall River Mills &amp; McArthur','Forest-edge &amp; cabin properties','Rural &amp; acreage homes'],
    pests:[['Rodents',"Pine-forest cover and cold winters drive mice and wood rats indoors — exclusion and sanitation keep them out."],['Carpenter ants &amp; wood pests',"Damp, wooded conditions invite carpenter ants and wood-boring pests; inspections catch damage early."],['Wildlife',"Forest-edge properties attract wildlife into attics and outbuildings, removed humanely."],['Weeds &amp; brush',"Heavy forest fuels make weed abatement and defensible-space work important for fire safety."]] },
];

function faqsFor(d){
  return [
    [`Do you provide pest control in ${d.name}?`, `Yes — ${d.name} is part of our Northern California service area. We provide eco-friendly pest, rodent, weed, and tree services to ${d.name} homes and businesses, with the same IPM-first approach we've used since 1992.`],
    [`How do I schedule service in ${d.name}?`, `Call (530) 342-8950 or request a free estimate online. We'll confirm timing for your ${d.name} property and build a treatment plan that fits.`],
    [`Are your treatments eco-friendly?`, `They are. As the first eco-certified pest control company in Northern California, we lead with Integrated Pest Management — targeted, low-impact methods that are safe around your family and pets.`],
    [`Is Hunters Services local and family owned?`, `Yes. We're family owned and operated by California natives, established in 1992. We're not a national chain — we've protected Northern California for over 30 years.`],
  ];
}
const J = JSON.stringify;
function faqSchema(faqs){ return `<script type="application/ld+json">${J({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))})}</script>`; }
function bizSchema(d){ return `<script type="application/ld+json">${J({"@context":"https://schema.org","@type":"PestControlService",name:`Hunters Services — ${d.name}`,telephone:"+15303428950",areaServed:{"@type":d.type,name:d.name},address:{"@type":"PostalAddress",streetAddress:"2060 3rd Street",addressLocality:"Oroville",addressRegion:"CA",postalCode:"95965"}})}</script>`; }
function bcSchema(d){ return `<script type="application/ld+json">${J({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:ORIGIN+"/"},{"@type":"ListItem",position:2,name:"Service Areas",item:ORIGIN+"/index.html#service-areas"},{"@type":"ListItem",position:3,name:d.crumb,item:`${ORIGIN}/areas/${d.slug}.html`}]})}</script>`; }
function faqHtml(faqs){ return `<div class="faq">${faqs.map(([q,a])=>`<div class="faq-item"><button class="faq-q">${q.replace(/&/g,'&amp;')}<span class="pm"></span></button><div class="faq-a"><div>${a.replace(/&/g,'&amp;')}</div></div></div>`).join('')}</div>`; }

function page(d){
  const title = `${d.name} Pest Control | Hunters Services`;
  const desc = `Eco-friendly pest, rodent, weed &amp; tree control in ${d.name}, CA (${d.county}). Family-owned &amp; local since 1992. Free estimates — call (530) 342-8950.`;
  const faqs = faqsFor(d);
  const fm = ['---','layout: layouts/base.njk',`permalink: "/areas/${d.slug}.html"`,'nav: areas',
    `title: ${J(title)}`, `description: ${J(desc)}`, `canonical: "${ORIGIN}/areas/${d.slug}.html"`,
    'extraSchema: |', '  '+faqSchema(faqs), '  '+bizSchema(d), '  '+bcSchema(d), '---',''].join('\n');
  const subList = d.sub.map(s=>`<li>${s}</li>`).join('');
  const pestBlocks = d.pests.map(([h,p])=>`<h3>${h}</h3><p>${p}</p>`).join('');
  const body =
`<section class="page-hero"><div class="container">
  <div class="breadcrumb"><a href="/index.html">Home</a><span>›</span><a href="/index.html#service-areas">Service Areas</a><span>›</span>${d.crumb}</div>
  <h1>Pest Control in ${d.name}, California</h1>
  <p>${d.intro}</p>
  <div class="ph-badges"><span>${PIN} Serving all of ${d.name}</span><span>${CHK} Free Estimates</span><span>${CHK} 4.3★ on Google</span></div>
</div></section>

<section class="sec"><div class="container"><div class="content-wrap">
  <div class="prose reveal">
    <h2>Your local ${d.name} pest control team</h2>
    <p>${d.p1}</p>
    <p>Whatever's bugging your ${d.name} home, business, or property, we bring the same eco-friendly, IPM-first approach that's earned the trust of more than 50,000 California homeowners — backed by 30+ years of Northern California experience.</p>
    <div class="keyfacts"><b class="kf-h">Hunters Services at a glance</b><ul><li>Serving <b>${d.name}</b> &amp; ${d.county}</li><li>Family owned &amp; local since <b>1992</b></li><li><b>50,000+</b> NorCal homes &amp; businesses protected</li><li>Eco-certified, <b>IPM-first</b> approach</li><li>Licensed &amp; insured · <b>CA Lic. OPR 9803</b></li><li><b>4.3★</b> on Google · 708 reviews</li><li>Free estimates · custom local plans</li></ul></div>
    <div class="callout"><p><b>Areas we serve around ${d.name}:</b></p><ul style="margin-top:.6rem">${subList}</ul></div>
    <h2>Common pest issues in ${d.name}</h2>
    ${pestBlocks}
    <div class="callout eco"><p><b>Eco-friendly, always.</b> Every ${d.name} treatment uses Integrated Pest Management — sealing entry points, removing what attracts pests, and applying targeted, low-impact solutions that protect your family, pets, and the local environment.</p></div>
    <h2>Full-service protection for ${d.name}</h2>
    <p>From a single nuisance pest to whole-property care, we handle it all:</p>
    ${SERVICES_LIST}
    <div class="mini-map" style="margin-top:1.8rem"><iframe src="https://maps.google.com/maps?q=${d.map}&z=${d.zoom}&output=embed" loading="lazy" title="${d.name} service area map"></iframe></div>
  </div>
  <aside>
    <div class="sidebar-card">
      <div class="top"><h3>Free ${d.name} Estimate</h3><p>Eco-friendly · Family owned · Local</p></div>
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
    <div class="field"><label>Your City</label><select name="city" aria-label="Your city"><option value="">Select…</option><option>${d.name}</option><option>Crescent City</option><option>Klamath</option><option>Alturas</option><option>Yreka</option><option>Weaverville</option><option>Burney</option><option>Other NorCal</option></select></div>
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

for (const d of AREAS){ fs.writeFileSync(path.join(SRC, d.slug + '.html'), page(d)); console.log('wrote areas/'+d.slug+'.html'); }
console.log('Done: '+AREAS.length+' new area pages.');
