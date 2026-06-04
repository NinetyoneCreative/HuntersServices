const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const src = 'C:/Users/emvee/Downloads/Generate_an_image_of_a_mouse_g_Nano_Banana_2_15582.png';
const outDir = path.resolve('C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-11ty/src/assets/services');

(async () => {
  const buf = fs.readFileSync(src);
  const meta = await sharp(buf).metadata();
  console.log('source:', meta.width + 'x' + meta.height);
  // Card thumbnail: 760x441 cover, matching the declared <img> dimensions.
  await sharp(buf).resize({ width: 760, height: 441, fit: 'cover', position: 'centre' })
    .webp({ quality: 74 }).toFile(path.join(outDir, 'rodents-card.webp'));
  await sharp(buf).resize({ width: 760, height: 441, fit: 'cover', position: 'centre' })
    .jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(outDir, 'rodents-card.jpg'));
  for (const f of ['rodents-card.webp', 'rodents-card.jpg']) {
    console.log(f, (fs.statSync(path.join(outDir, f)).size / 1024).toFixed(1) + 'KB');
  }
})().catch(e => { console.error(e); process.exit(1); });
