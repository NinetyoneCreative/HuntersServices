/* Remove every em dash (—, U+2014) from site copy, replacing it with a comma.
   Em dashes here are clause separators, so ", " is the grammatically correct
   substitute. Collapses horizontal whitespace around the dash; never touches
   newlines (so long HTML lines aren't joined). Idempotent. */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const EXT = new Set(['.html', '.njk', '.js']);
// horizontal whitespace (spaces/tabs) around an em dash -> ", "
const RE = /[^\S\r\n]*—[^\S\r\n]*/g;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p, out); }
    else if (EXT.has(path.extname(e.name))) out.push(p);
  }
  return out;
}

let files = 0, total = 0;
for (const f of walk(SRC)) {
  const before = fs.readFileSync(f, 'utf8');
  const n = (before.match(/—/g) || []).length;
  if (!n) continue;
  const after = before.replace(RE, ', ');
  fs.writeFileSync(f, after);
  files++; total += n;
  console.log(`  ${String(n).padStart(3)}  ${path.relative(SRC, f)}`);
}
console.log(`\nReplaced ${total} em dash(es) across ${files} file(s).`);
