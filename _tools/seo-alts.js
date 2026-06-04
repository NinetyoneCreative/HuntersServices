const fs = require('fs');
const path = require('path');
const SRC = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src');

// Service-card thumbnail alts (appear on index.html + services.html). Describe the image +
// service + Northern California for local SEO and accessibility.
const cardAlts = {
  'Pest Control': 'Eco-friendly residential and commercial pest control service in Northern California',
  'Termite Inspection & Repair': 'Hunters Services technician performing a termite inspection in a Northern California home',
  'Bed Bug Treatment': 'Pest control technician treating a mattress for bed bugs in Northern California',
  'Rodent Control': 'Mouse caught in a snap trap during rodent control service in Northern California',
  'Wildlife, Bird & Bat Abatement': 'Humane wildlife, bird and bat abatement service in Northern California',
  'Weed Abatement': 'Weed abatement and vegetation control for fire safety in Northern California',
  'Tree Injections & Treatments': 'Tree injection and treatment service to protect trees in Northern California',
};

let total = 0;
for (const rel of ['index.html', 'services.html']) {
  const fp = path.join(SRC, rel);
  let html = fs.readFileSync(fp, 'utf8');
  let n = 0;
  for (const [oldAlt, newAlt] of Object.entries(cardAlts)) {
    const needle = `alt="${oldAlt}"`;
    const repl = `alt="${newAlt}"`;
    const before = html;
    html = html.split(needle).join(repl);
    if (html !== before) n++;
  }
  fs.writeFileSync(fp, html);
  console.log(`${rel}: ${n} card alts upgraded`);
  total += n;
}

// About page: make the framed logo alt more descriptive
{
  const fp = path.join(SRC, 'about.html');
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;
  html = html.replace('alt="Hunters Services logo"',
    'alt="Hunters Services logo — eco-friendly pest control in Northern California since 1992"');
  if (html !== before) { fs.writeFileSync(fp, html); console.log('about.html: framed logo alt upgraded'); }
}

console.log('Done.');
