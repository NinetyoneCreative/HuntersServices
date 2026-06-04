const fs = require('fs');
const path = require('path');
const base = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-site');
let src = fs.readFileSync(path.join(base, 'contact.html'), 'utf8');

// Keep everything up to the first content section, and everything from <footer onward.
const head = src.slice(0, src.indexOf('<section class="page-hero">'));
const tail = src.slice(src.indexOf('<footer class="site-footer">'));

let out = head;
// Head tweaks
out = out
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Thank You | Hunters Services — We’ll Be In Touch Soon</title>')
  .replace(/<meta name="description"[^>]*>/, '<meta name="description" content="Thanks for reaching out to Hunters Services. A local, family-owned team member will get back to you shortly — usually the same day.">')
  .replace(/<link rel="canonical"[^>]*>/, '<link rel="canonical" href="https://www.hunterspestcontrol.com/thank-you.html">\n<meta name="robots" content="noindex,follow">')
  .replace(/<meta property="og:title"[^>]*>/, '<meta property="og:title" content="Thank You | Hunters Services">')
  .replace(/<meta property="og:description"[^>]*>/, '<meta property="og:description" content="Thanks for reaching out — a local, family-owned team member will get back to you shortly.">');

const middle = `<section class="page-hero"><div class="container">
  <div class="breadcrumb"><a href="index.html">Home</a><span>›</span>Thank You</div>
  <h1>Thanks — your request is in!</h1>
  <p>A local, family-owned Hunters Services team member will reach out shortly, usually the same day. Need us sooner? Give us a call and we’ll take care of you.</p>
  <div class="ph-badges"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Request received</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg> (530) 342-8950</span></div>
</div></section>

<section class="sec"><div class="container"><div class="cta-band reveal in">
  <div class="inner">
    <div><h2>While you wait…</h2><p>Explore our eco-friendly services or read why over 50,000 Northern California homeowners trust Hunters Services — family owned and locally operated since 1992.</p></div>
    <div class="acts">
      <a class="btn btn-primary btn-lg" href="services.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> View Our Services</a>
      <a class="btn btn-ghost btn-lg" href="tel:+15303428950"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg> (530) 342-8950</a>
    </div>
  </div>
</div></div></section>

<script>window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'generate_lead',form_name:'estimate',form_location:'thank-you'});if(typeof gtag==='function'){gtag('event','generate_lead',{form_name:'estimate'});}if(typeof fbq==='function'){fbq('track','Lead');}</script>

`;

out += middle + tail;
fs.writeFileSync(path.join(base, 'thank-you.html'), out);
console.log('thank-you.html written (' + out.length + ' bytes)');
