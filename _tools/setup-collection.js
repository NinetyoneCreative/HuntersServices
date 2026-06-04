const fs = require('fs');
const path = require('path');
const SRC = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src');
const posts = require('./blog-data.json');

const esc = s => (s||'').replace(/&(?!amp;|lt;|gt;|quot;|#)/g,'&amp;');
const cleanBody = b => b.replace(/<li>\s*<p>/g,'<li>').replace(/<\/p>\s*<\/li>/g,'</li>');

// Remove the old script-generated pages (now replaced by the collection)
fs.rmSync(path.join(SRC,'blog'), {recursive:true, force:true});
fs.rmSync(path.join(SRC,'blog.html'), {force:true});

// Write collection source: src/posts/{slug}.html = front matter + article body only
const dir = path.join(SRC,'posts');
fs.mkdirSync(dir, {recursive:true});
for (const p of posts){
  const fm = ['---',
    `title: ${JSON.stringify(esc(p.title))}`,
    `date: ${p.date}`,
    `author: ${JSON.stringify(p.author)}`,
    `hero: ${JSON.stringify(p.slug)}`,
    `description: ${JSON.stringify(esc(p.desc))}`,
    `excerpt: ${JSON.stringify(esc(p.excerpt))}`,
    '---',''].join('\n');
  fs.writeFileSync(path.join(dir, p.slug + '.html'), fm + cleanBody(p.body) + '\n');
}
console.log(`Wrote ${posts.length} collection posts to src/posts/. Removed old src/blog/ + src/blog.html.`);
