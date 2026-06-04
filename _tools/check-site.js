const fs = require('fs');
const path = require('path');
const base = process.argv[2];
function walk(d, a){ for(const e of fs.readdirSync(d,{withFileTypes:true})){const fp=path.join(d,e.name); if(e.isDirectory()) walk(fp,a); else if(e.name.endsWith('.html')) a.push(fp);} return a; }
const htmls = walk(base, []);

// link check (root-relative + relative)
const attrRe = /(?:href|src|srcset)="([^"]+)"/g;
let missing=[], checked=0;
for (const fp of htmls){
  const dir=path.dirname(fp); const html=fs.readFileSync(fp,'utf8'); let m;
  while((m=attrRe.exec(html))){
    let ref=m[1].trim();
    if(/^(https?:|tel:|mailto:|#|data:|javascript:)/i.test(ref)||!ref) continue;
    ref=ref.split('#')[0].split('?')[0]; if(!ref) continue;
    const target = ref.startsWith('/') ? path.join(base, ref) : path.resolve(dir, ref);
    checked++;
    if(!fs.existsSync(target)) missing.push(path.relative(base,fp)+'  ->  '+m[1]);
  }
}
// schema check
let badJson=0;
const sRe=/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
for(const fp of htmls){ const html=fs.readFileSync(fp,'utf8'); let m; while((m=sRe.exec(html))){ try{JSON.parse(m[1]);}catch(e){badJson++; console.log('BAD JSON',path.relative(base,fp),e.message);} } }

console.log(`pages:${htmls.length} refs:${checked} missing:${missing.length} badJSON:${badJson}`);
if(missing.length){ missing.slice(0,40).forEach(x=>console.log('  MISSING '+x)); process.exit(1);}
console.log('OK ✔');
