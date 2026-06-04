const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const base = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-site');
const src = path.join(base, '_srcimg2');
const outDir = path.join(base, 'assets', 'services');
const slugs = ['weed-abatement','tree-services'];
const variants = [
  { suffix: '-card', width: 760, webpQ: 58, jpgQ: 74 },
  { suffix: '-wide', width: 1100, webpQ: 60, jpgQ: 76 },
];
(async () => {
  for (const slug of slugs) {
    const input = path.join(src, slug + '.jpg');
    for (const v of variants) {
      const webpOut = path.join(outDir, slug + v.suffix + '.webp');
      await sharp(input).resize({ width: v.width, withoutEnlargement: true }).webp({ quality: v.webpQ }).toFile(webpOut);
      const jpgOut = path.join(outDir, slug + v.suffix + '.jpg');
      await sharp(input).resize({ width: v.width, withoutEnlargement: true }).jpeg({ quality: v.jpgQ, mozjpeg: true }).toFile(jpgOut);
      console.log(`${slug}${v.suffix}  webp ${(fs.statSync(webpOut).size/1024).toFixed(1)}KB  jpg ${(fs.statSync(jpgOut).size/1024).toFixed(1)}KB`);
    }
  }
})();
