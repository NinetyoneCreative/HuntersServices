# Hunters Services — Wix Content & Structure Map

A page-by-page guide for porting this site's copy and structure into Wix (or any CMS) if the
business stays on its current platform. The HTML files are the authoritative source of the exact
wording; this map gives the structure, headlines, and key copy so you can rebuild each page
section-by-section. **Use the business facts exactly as written — they're verified.**

---

## Global elements (every page)

**Top bar:** `2060 3rd Street, Oroville, CA 95965` · `Mon–Thu 8AM–5PM · Fri 8AM–3PM` ·
`★ 4.3 on Google` · `pest@huntersservices.com`

**Header nav:** Logo → Home · Services (dropdown: All Services + 7 services) ·
Service Areas (dropdown: All Service Areas + Chico/Oroville/Paradise/Sacramento/Redding) ·
About · Contact · phone `(530) 342-8950` · **Free Estimate** button.

**Footer:** Logo + blurb ("Family owned and locally operated by California natives since 1992. The
first eco-friendly pest control company in Northern California — protecting over 50,000 homes and
businesses with Integrated Pest Management.") · Eco Certified · IPM First badge · Facebook +
Instagram · Services list · Service Areas list · Contact (address, both phones, email, hours) ·
`© Hunters Services Inc. · Licensed & Insured · CA Pest Control`.

**Primary CTA everywhere:** "Get Free Estimate" + click-to-call `(530) 342-8950`.

**Brand colors:** Navy `#0B2545`, Steel `#7CB8E4`, Logo Blue `#1A75D2`, Bright Blue `#00BFFF`,
Green `#00E64D` (sparingly), Orange `#E87722` (CTAs only). **Fonts:** Barlow / Barlow Condensed
(headings), Open Sans (body).

**Contacts:** Oroville/main `(530) 342-8950`; Sacramento `(916) 273-8911`;
`pest@huntersservices.com` (service) / `info@huntersservices.net` (general);
new-lead notifications → `marketingcoordinator@huntersservices.net`.
Facebook: facebook.com/HuntersPestservices · Instagram: instagram.com/hunterspestcontrol

---

## Home — `index.html`
- **Title:** Hunters Services | Eco-Friendly Pest, Termite, Weed & Tree Control — NorCal
- **Meta:** Family-owned, eco-friendly pest control, termite inspection & repair, rodent exclusion, wildlife abatement, weed abatement & tree care across Northern California since 1992. Free estimates.
- **H1:** "Protect your home from pests — the *eco-friendly* way."
- **Sections:**
  1. **Hero** — rating (4.3 · 708), eyebrow "Family Owned & Eco-Certified Since 1992", subhead, dual CTA (Get Free Estimate + call), trust badges (Licensed & Insured · Eco-Friendly IPM · Same-Day Response · 50,000+ Homes Protected), technician image + Eco Certified badge.
  2. **Trust strip:** 1992 (Serving NorCal Since) · 50K+ (Homes Protected) · 4.3★ (708 Google Reviews) · 30+ (Years Experience) · 100% (Eco-Certified / IPM).
  3. **Services grid (H2 "One local team for every pest problem")** — 7 cards.
  4. **Why-us split (H2 "Your neighbors in pest control — not a national chain")** — 30+ years stat card + 3 checkmarks.
  5. **The Hunters Difference (H2 "Built on experience, respect & integrity")** — 4 features: Licensed & Insured, Eco-Friendly IPM, 30+ Years Local, 50,000+ Protected.
  6. **Reviews (H2 "What Northern California says about us")** — Google badge 4.3/708 + 6 real reviews (see Reviews list below).
  7. **Service-area grid (H2 "Serving Northern California")** — 5 city chips + 6 serviced-area chips.
  8. **Estimate form section (H2 "Not sure what kind of pest problem you have?")** — benefits list + form.
  9. **CTA band:** "Ready for a pest-free home?"

## Services index — `services.html`
- **H1:** All services overview; same 7-card grid as home. Intro emphasizes one local team, eco-friendly, full-spectrum (pest, termite, bed bug, rodent, wildlife, weed, tree).

## About — `about.html`
- **Title:** about Hunters Services. **H1:** "California's best value in pest, termite, weed & tree control"
- **Sections:** Who We Are (H2 "Three decades of protecting NorCal homes" — founded Oroville 1992, first eco-friendly in NorCal, 50,000+ customers, community roots) · What We Stand For (H2 "Built on experience, respect & integrity" — Family Owned & Local, Eco-Friendly/IPM First, Experience & Trust, Community Commitment) · **Stats strip:** 1992 Established · 25 Team Members · 1,050 Residential Clients · 550 Commercial Partners · 50K+ Homes Protected · Our Mission (H2 "Peace of mind, the eco-friendly way") · Reviews · CTA.

## Contact — `contact.html`
- **Title:** Contact Hunters Services | Free Estimate — NorCal Pest Control
- **H1:** "Get your free estimate". **Sections:** estimate form + direct-contact sidebar (Oroville/Sacramento phones, service + general email, address, hours, social) · embedded Google map of the Oroville office · service-area grid · CTA.

---

## Service pages — `services/{slug}.html`
Each follows the **same template**. Replace the bracketed parts per service.

**Structure:** Page hero (breadcrumb Home › Services › [Service]) → H1 [Service name] → intro
paragraph → badges (Eco-Friendly IPM · Family Owned Since 1992 · Free Estimates · 4.3★ on Google)
→ body prose (localized hero image, intro, "Common pests/issues we manage", "Our approach" with
*IPM first* + *A plan built for your property*, "How it works" 4 steps: Inspection & assessment →
Customized treatment plan → Targeted treatment → Ongoing protection, "Why homeowners choose Hunters
Services" checklist) → sidebar (quote form + "Other Services" cross-links + call box) → 4 unique
FAQs → reviews → CTA.

| Slug | H1 | Title tag | One-line intro |
|---|---|---|---|
| `pest-control` | Residential & Commercial Pest Control | Residential & Commercial Pest Control \| Hunters Services — Northern California | Year-round, eco-friendly protection from ants, spiders, roaches, wasps & seasonal invaders. |
| `termites` | Termite Inspection & Repair | Termite Inspection & Repair \| Hunters Services — Northern California | Early detection + treatment + in-house structural repair; termites cause thousands in damage before you notice. |
| `bed-bugs` | Bed Bug Treatment | Bed Bug Treatment \| Hunters Services — Northern California | Discreet, effective, customized bed-bug plans that protect your privacy and your sleep. |
| `rodents` | Rodent Control & Exclusion | Rodent Control \| Hunters Services — Northern California | Humane trapping, sanitation, and sealing entry points to keep rats & mice out. |
| `wildlife` | Wildlife, Bird & Bat Abatement | Wildlife, Bird & Bat Abatement \| Hunters Services — Northern California | Humane exclusion for pigeons, bats & nuisance wildlife — netting, cleanup, prevention. |
| `weed-abatement` | Weed Abatement | Weed Abatement \| Hunters Services — Northern California | Fire-risk reduction and compliance through responsible weed & vegetation control. |
| `tree-services` | Tree Injections & Treatments | Tree Injections & Treatments \| Hunters Services — Northern California | Injections & treatments that protect and strengthen trees so they thrive for years. |

*(FAQs differ per service — copy the 4 questions/answers from each file's FAQ section.)*

---

## City pages — `areas/{slug}.html`
Same **template**, localized. **Structure:** Page hero (breadcrumb Home › Service Areas › [City]) →
H1 "Pest Control in [City], California" → local intro → badges (Serving all of [City] · Same-Day
Response · 4.3★ on Google) → "Your local [City] pest control team" (county + neighborhood + seasonal
copy) → sidebar quote form → embedded Google map of the city → 4 local FAQs → CTA.

Every service area now has its own dedicated page (11 total). There is no longer an "All Service
Areas" catch-all link — the nav "Service Areas" item lists all 11 pages and links to the home
"Serving Northern California" section (`/index.html#service-areas`).

| Slug | H1 | County / locale notes |
|---|---|---|
| `chico` | Pest Control in Chico, California | Butte County; Bidwell Park, student rentals, mature trees, warm summers |
| `oroville` | Pest Control in Oroville, California | Butte County; home/HQ city, foothills |
| `paradise` | Pest Control in Paradise, California | Butte County; ridge community, rebuilding |
| `durham` | Pest Control in Durham, California | Butte County; rural/ag, orchards, country properties |
| `gridley` | Pest Control in Gridley, California | Butte County; "Kiwi Capital," Feather River farm country |
| `sacramento` | Pest Control in Sacramento, California | Sacramento region; second office `(916) 273-8911` |
| `redding` | Pest Control in Redding, California | Shasta County; hot valley summers |
| `stockton` | Pest Control in Stockton, California | San Joaquin County; Delta climate, commercial corridors |
| `plumas-county` | Pest Control in Plumas County, California | Mountain communities: Quincy, Portola, Graeagle, Chester; cabins |
| `shasta-county` | Pest Control in Shasta County, California | Redding/Anderson/Shasta Lake; very hot summers |
| `colusa-county` | Pest Control in Colusa County, California | Sacramento Valley ag: Colusa, Williams, Arbuckle, Maxwell; rice country |

---

## Reviews (use ONLY these real Google reviews — do not fabricate)
1. **Ian Macmillan** — "I use Hunter's for both my home and my business — always prompt, always professional, with billing that's completely transparent. It's a level of service I hadn't found at any other pest company. Highly recommend!"
2. **Becky Williams** (Keller Williams Realty, Chico) — "As a busy Realtor I need a company that's responsive and diligent, and Hunter's reports and repairs have always been timely. They take great care of my clients — they're at the top of my list."
3. **Teresa Lindahl** (Oroville) — "Hunter's is the best! Friendly and reliable service every time, and the local Oroville team genuinely cares about doing right by their customers."
4. **Commercial Property Owner** — "They took over pigeon abatement at our commercial building — netted the solar panels and cleaned the entire roof. The problem was solved within the first week. On time, on budget, and always professional."
5. **Vincent Ybarra** — "Great service and very effective results. The whole staff is professional and friendly from the first call to the finished job."
6. **Homeowner (Chico)** — "We had serious termite damage and dry rot in our crawlspace. Cory walked me through every repair option at a price we could afford, and Kenia kept everything coordinated. Thorough, honest work."

Google rating to display: **4.3 stars, 708 reviews** (never "5-star").

---

## Lead-form fields (for the Wix form / CRM mapping)
`Full Name` (required) · `Phone` (required) · `Email` (required) · `Service Needed` (select: the 7
services + "Other / Not sure") · `Your City` (select: Chico, Oroville, Paradise, Sacramento,
Redding, Durham, Gridley, Other NorCal) · `How can we help?` (message) · hidden `source-page`
(which page the lead came from). Route submissions to `marketingcoordinator@huntersservices.net`.

## Brand voice reminders
Knowledgeable · Neighborly · Protective · Eco-Conscious — "a knowledgeable neighbor who happens to
be a pest expert." Use contractions; reference NorCal cities/seasons. Power phrases: peace of mind,
family owned and locally operated, California natives, eco-friendly solutions, Integrated Pest
Management (IPM), 30+ years, over 50,000 homeowners, free estimate. **Avoid** eradicate / destroy /
exterminate and any "5-star" claim.
