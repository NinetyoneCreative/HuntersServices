const fs = require('fs');
const path = require('path');
const SRC = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src');
const ORIGIN = 'https://www.hunterspestcontrol.com';
const posts = require('./blog-data.json').slice().sort((a,b)=>new Date(b.date)-new Date(a.date));
fs.mkdirSync(path.join(SRC,'blog'),{recursive:true});

const esc = s => (s||'').replace(/&(?!amp;|lt;|gt;|quot;|#)/g,'&amp;');
const ARROW='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const PHONE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
const CTA = `<section class="sec-sm"><div class="container"><div class="cta-band reveal">
      <div class="inner">
        <div><h2>Ready for a pest-free home?</h2><p>Get your free, no-obligation estimate today — and the peace of mind that comes with 30+ years of local, eco-friendly experience.</p></div>
        <div class="acts">
          <a class="btn btn-primary btn-lg" href="/contact.html">${ARROW} Get Free Estimate</a>
          <a class="btn btn-ghost btn-lg" href="tel:+15303428950">${PHONE} (530) 342-8950</a>
        </div>
      </div>
    </div></div></section>`;

function cleanBody(b){ return b.replace(/<li>\s*<p>/g,'<li>').replace(/<\/p>\s*<\/li>/g,'</li>'); }

// ---- Individual post pages ----
for (const p of posts) {
  const authorObj = p.author === 'Hunters Services'
    ? {'@type':'Organization','name':'Hunters Services'}
    : {'@type':'Person','name':p.author};
  const blogPosting = {
    '@context':'https://schema.org','@type':'BlogPosting',
    headline:p.title, description:p.desc,
    image:`${ORIGIN}/assets/blog/${p.slug}.jpg`,
    datePublished:p.date, dateModified:p.date,
    author:authorObj,
    publisher:{'@type':'Organization','name':'Hunters Services','logo':{'@type':'ImageObject','url':`${ORIGIN}/logo.png`}},
    mainEntityOfPage:`${ORIGIN}/blog/${p.slug}.html`
  };
  const breadcrumb = {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
    {'@type':'ListItem','position':1,'name':'Home','item':ORIGIN+'/'},
    {'@type':'ListItem','position':2,'name':'Blog','item':ORIGIN+'/blog.html'},
    {'@type':'ListItem','position':3,'name':p.title,'item':`${ORIGIN}/blog/${p.slug}.html`}]};
  const fm = ['---','layout: layouts/base.njk',`permalink: "/blog/${p.slug}.html"`,'nav: blog',
    `title: ${JSON.stringify(esc(p.title))}`,
    `description: ${JSON.stringify(esc(p.desc))}`,
    `canonical: "${ORIGIN}/blog/${p.slug}.html"`,
    'extraSchema: |',
    '  <script type="application/ld+json">'+JSON.stringify(blogPosting)+'</script>',
    '  <script type="application/ld+json">'+JSON.stringify(breadcrumb)+'</script>',
    '---',''].join('\n');
  const body =
`<section class="page-hero"><div class="container">
  <div class="breadcrumb"><a href="/index.html">Home</a><span>›</span><a href="/blog.html">Blog</a><span>›</span>${esc(p.title)}</div>
  <h1>${esc(p.title)}</h1>
  <p class="post-meta">By ${esc(p.author)} · ${p.dateDisplay}</p>
</div></section>
<section class="sec"><div class="container"><div class="post-wrap">
  <article class="prose reveal">
    <p class="post-hero"><picture><source srcset="/assets/blog/${p.slug}.webp" type="image/webp"><img src="/assets/blog/${p.slug}.jpg" alt="${esc(p.title)}" loading="eager" decoding="async"></picture></p>
    ${cleanBody(p.body)}
  </article>
  <p class="post-back"><a href="/blog.html">${ARROW} Back to all posts</a></p>
</div></div></section>
${CTA}
`;
  fs.writeFileSync(path.join(SRC,'blog',p.slug+'.html'), fm+body);
}
console.log('Wrote', posts.length, 'post pages.');

// ---- Blog index ----
const cards = posts.map(p => `<a class="blog-card reveal" href="/blog/${p.slug}.html">
      <div class="bc-media"><picture><source srcset="/assets/blog/${p.slug}.webp" type="image/webp"><img src="/assets/blog/${p.slug}.jpg" alt="${esc(p.title)}" loading="lazy" decoding="async" onerror="this.style.display='none'"></picture></div>
      <div class="bc-body"><div class="bc-date">${p.dateDisplay}</div><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p><span class="more">Read more ${ARROW}</span></div>
    </a>`).join('\n    ');
const idxFm = ['---','layout: layouts/base.njk','permalink: "/blog.html"','nav: blog',
  'title: "Pest Control Blog & Tips | Hunters Services"',
  'description: "Eco-friendly pest control tips, seasonal pest guides, and home-protection advice for Northern California from the Hunters Services team."',
  `canonical: "${ORIGIN}/blog.html"`,
  '---',''].join('\n');
const idxBody =
`<section class="page-hero"><div class="container">
  <div class="breadcrumb"><a href="/index.html">Home</a><span>›</span>Blog</div>
  <h1>Pest control tips & resources</h1>
  <p>Seasonal pest guides, prevention tips, and home-protection advice from your local, eco-friendly Northern California pest experts.</p>
</div></section>
<section class="sec"><div class="container">
  <div class="blog-grid">
    ${cards}
  </div>
</div></section>
${CTA}
`;
fs.writeFileSync(path.join(SRC,'blog.html'), idxFm+idxBody);
console.log('Wrote blog.html index with', posts.length, 'cards.');

// ---- Sitemap ----
const smPath = path.join(SRC,'static','sitemap.xml');
let sm = fs.readFileSync(smPath,'utf8');
if(!sm.includes('/blog.html')){
  const entries = [`  <url><loc>${ORIGIN}/blog.html</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`]
    .concat(posts.map(p=>`  <url><loc>${ORIGIN}/blog/${p.slug}.html</loc><lastmod>${p.date.slice(0,10)}</lastmod><changefreq>yearly</changefreq><priority>0.6</priority></url>`));
  sm = sm.replace('</urlset>', entries.join('\n')+'\n</urlset>');
  fs.writeFileSync(smPath, sm);
  console.log('Added blog URLs to sitemap.');
}
console.log('Done.');
