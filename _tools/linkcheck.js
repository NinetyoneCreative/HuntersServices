const fs = require('fs');
const path = require('path');
const base = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-site');

function walk(dir, acc){
  for (const e of fs.readdirSync(dir, {withFileTypes:true})){
    const fp = path.join(dir, e.name);
    if (e.isDirectory()){ if (e.name === 'assets' || e.name==='css' || e.name==='js') { /* still walk for completeness */ } walk(fp, acc); }
    else if (e.name.endsWith('.html')) acc.push(fp);
  }
  return acc;
}

const htmls = walk(base, []);
const attrRe = /(?:href|src|srcset)="([^"]+)"/g;
let missing = [], checked = 0;

for (const fp of htmls){
  const dir = path.dirname(fp);
  const html = fs.readFileSync(fp, 'utf8');
  let m;
  while ((m = attrRe.exec(html))){
    let ref = m[1].trim();
    // srcset may hold a single url here (we only used single-url srcset)
    if (/^(https?:|tel:|mailto:|#|data:|javascript:)/i.test(ref)) continue;
    if (ref === '' ) continue;
    ref = ref.split('#')[0].split('?')[0];
    if (!ref) continue;
    let target;
    if (ref.startsWith('/')) target = path.join(base, ref);
    else target = path.resolve(dir, ref);
    checked++;
    if (!fs.existsSync(target)){
      missing.push(path.relative(base, fp) + '  ->  ' + m[1]);
    }
  }
}

console.log('HTML files:', htmls.length, '| local refs checked:', checked);
if (missing.length){ console.log('MISSING (' + missing.length + '):'); missing.forEach(x=>console.log('  ' + x)); process.exit(1); }
else console.log('All local references resolve. ✔');
