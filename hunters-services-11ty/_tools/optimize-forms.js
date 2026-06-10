/* One-off: apply Netlify form best-practices uniformly across every lead form.
   - add a hidden `subject` field (clean notification email subject)
   - add autocomplete to name/phone/email (faster real-user completion)
   Idempotent: safe to re-run. */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const SUBJECT = '  <input type="hidden" name="subject" value="New Free Estimate Request — Hunters Services website">';

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const repl = [
  // hidden subject right after the source-page hidden input (CRLF/LF tolerant)
  {
    find: /( *<input type="hidden" name="source-page" value="[^"]*">)(\r?\n)(?! *<input type="hidden" name="subject")/,
    to: (m, g1, nl) => g1 + nl + SUBJECT + nl,
  },
  // autocomplete on the three real fields
  {
    find: /<input type="text" name="name" aria-label="Full name"(?! [^>]*autocomplete)/g,
    to: '<input type="text" name="name" autocomplete="name" aria-label="Full name"',
  },
  {
    find: /<input type="tel" name="phone" aria-label="Phone number"(?! [^>]*autocomplete)/g,
    to: '<input type="tel" name="phone" autocomplete="tel" aria-label="Phone number"',
  },
  {
    find: /<input type="email" name="email" aria-label="Email address"(?! [^>]*autocomplete)/g,
    to: '<input type="email" name="email" autocomplete="email" aria-label="Email address"',
  },
];

let changed = 0;
for (const file of walk(SRC)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!/name="estimate"/.test(html)) continue;
  const before = html;
  for (const r of repl) html = html.replace(r.find, r.to);
  if (html !== before) {
    fs.writeFileSync(file, html);
    changed++;
    console.log('updated', path.relative(SRC, file));
  }
}
console.log(`\n${changed} form file(s) updated.`);
