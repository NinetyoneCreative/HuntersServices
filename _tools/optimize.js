const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const base = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-site');
const src = path.join(base, '_srcimg');
const outDir = path.join(base, 'assets', 'services');
fs.mkdirSync(outDir, { recursive: true });

const slugs = ['pest-control','termites','bed-bugs','rodents','wildlife','weed-abatement','tree-services'];

// Two variants per image: card (760w) for grid cards, wide (1100w) for hero/split media.
const variants = [
  { suffix: '-card', width: 760, quality: 72 },
  { suffix: '-wide', width: 1100, quality: 74 },
];

(async () => {
  for (const slug of slugs) {
    const input = path.join(src, slug + '.jpg');
    const meta = await sharp(input).metadata();
    for (const v of variants) {
      // WebP (primary)
      const webpOut = path.join(outDir, slug + v.suffix + '.webp');
      await sharp(input).resize({ width: v.width, withoutEnlargement: true })
        .webp({ quality: v.quality }).toFile(webpOut);
      // JPEG fallback
      const jpgOut = path.join(outDir, slug + v.suffix + '.jpg');
      await sharp(input).resize({ width: v.width, withoutEnlargement: true })
        .jpeg({ quality: v.quality + 6, mozjpeg: true }).toFile(jpgOut);
      const w = (fs.statSync(webpOut).size/1024).toFixed(1);
      const j = (fs.statSync(jpgOut).size/1024).toFixed(1);
      console.log(`${slug}${v.suffix}  src ${meta.width}x${meta.height}  webp ${w}KB  jpg ${j}KB`);
    }
  }
  console.log('Done.');
})().catch(e => { console.error(e); process.exit(1); });
