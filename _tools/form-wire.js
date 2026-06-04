const fs = require('fs');
const path = require('path');
const base = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-site');

const files = [
  'index.html','services.html','contact.html',
  'services/pest-control.html','services/termites.html','services/bed-bugs.html',
  'services/rodents.html','services/wildlife.html','services/weed-abatement.html','services/tree-services.html',
  'areas/chico.html','areas/oroville.html','areas/paradise.html','areas/sacramento.html','areas/redding.html',
];

// Matches the opening form tag, capturing any attrs between class="lead-form" and data-lead
const formRe = /<form class="lead-form"([^>]*?)\sdata-lead>/g;

let total = 0;
for (const rel of files) {
  const fp = path.join(base, rel);
  let html = fs.readFileSync(fp, 'utf8');
  const pageId = rel.replace(/\.html$/, '');
  let count = 0;
  html = html.replace(formRe, (m, mid) => {
    count++; total++;
    const open = `<form class="lead-form"${mid} data-lead name="estimate" method="POST" action="/thank-you.html" data-netlify="true" data-netlify-honeypot="bot-field">`;
    const hidden =
      `\n  <input type="hidden" name="form-name" value="estimate">` +
      `\n  <input type="hidden" name="source-page" value="${pageId}">` +
      `\n  <p class="hp-field" hidden aria-hidden="true"><label>Don't fill this out if you're human: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>`;
    return open + hidden;
  });
  if (count !== 1) console.warn(`WARN ${rel}: matched ${count} forms`);
  fs.writeFileSync(fp, html);
  console.log(`${rel}: ${count} form wired (source-page=${pageId})`);
}
console.log(`Total forms wired: ${total}`);
