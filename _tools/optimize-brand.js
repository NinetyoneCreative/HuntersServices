const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const A = 'C:/Users/emvee/OneDrive/Desktop/Hunter Services/hunters-services-site/assets';

(async () => {
  // Technician hero: WebP primary @820w + recompressed PNG fallback @820w (both alpha)
  const techSrc = await sharp(path.join(A,'technician.png')).toBuffer();
  await sharp(techSrc).resize({width:820}).webp({quality:80,alphaQuality:90}).toFile(path.join(A,'technician.webp'));
  await sharp(techSrc).resize({width:820}).png({compressionLevel:9,effort:9}).toFile(path.join(A,'technician.png'));

  // Logo: recompress in place, keep dimensions (used by JSON-LD/OG). Palette cuts size hugely.
  const ROOT = path.join(A, '..');
  const logoSrc = await sharp(path.join(A,'logo.png')).toBuffer();
  await sharp(logoSrc).png({palette:true,quality:90,compressionLevel:9,effort:9}).toFile(path.join(A,'logo.png'));
  await sharp(logoSrc).webp({quality:88,alphaQuality:95}).toFile(path.join(A,'logo.webp'));
  // Root copy referenced by JSON-LD schema (https://.../logo.png)
  await sharp(logoSrc).png({palette:true,quality:90,compressionLevel:9,effort:9}).toFile(path.join(ROOT,'logo.png'));

  for (const f of ['technician.png','technician.webp','logo.png','logo.webp']){
    console.log(f, (fs.statSync(path.join(A,f)).size/1024).toFixed(1)+'KB');
  }
})().catch(e=>{console.error(e);process.exit(1);});
