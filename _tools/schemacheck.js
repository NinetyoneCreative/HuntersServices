const fs = require('fs');
const path = require('path');
const base = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-site');
function walk(dir, acc){ for(const e of fs.readdirSync(dir,{withFileTypes:true})){ const fp=path.join(dir,e.name); if(e.isDirectory()) walk(fp,acc); else if(e.name.endsWith('.html')) acc.push(fp);} return acc; }
const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let bad = 0;
for (const fp of walk(base, []).sort()){
  const html = fs.readFileSync(fp,'utf8');
  let m, types=[];
  while ((m = re.exec(html))){
    try { const o = JSON.parse(m[1]); types.push(o['@type'] || (Array.isArray(o)?'[array]':'?')); }
    catch(e){ bad++; console.log('INVALID JSON in', path.relative(base,fp), '->', e.message); }
  }
  console.log(path.relative(base,fp).padEnd(34), types.join(', ') || '(none)');
}
console.log(bad ? ('\\n' + bad + ' invalid block(s)') : '\\nAll JSON-LD blocks valid. ✔');
process.exit(bad?1:0);
