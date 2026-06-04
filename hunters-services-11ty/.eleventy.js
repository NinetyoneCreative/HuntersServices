const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

module.exports = function (eleventyConfig) {
  // Date filters for the blog collection + sitemap
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  eleventyConfig.addFilter("readableDate", (d) => {
    const dt = new Date(d);
    return `${MONTHS[dt.getUTCMonth()]} ${dt.getUTCDate()}, ${dt.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  // Static assets copied verbatim to the output root
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  // Root-served files: robots.txt, sitemap.xml, netlify.toml, logo.png, og.png
  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  // Rebuild the browser when CSS/JS change during `npm run dev`
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");

  // Cache-bust local asset URLs with a content hash so updated files (at stable
  // filenames) are always picked up by browsers, while unchanged files stay cached.
  // Pairs with the long/immutable Cache-Control on /assets in netlify.toml.
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const out = dir.output;
    const cache = {};
    const hashOf = (urlPath) => {
      if (urlPath in cache) return cache[urlPath];
      let h = "";
      try { h = crypto.createHash("md5").update(fs.readFileSync(path.join(out, urlPath))).digest("hex").slice(0, 8); } catch (_) {}
      return (cache[urlPath] = h);
    };
    const re = /((?:href|src|srcset)=")(\/(?:assets|css|js)\/[^"?#]+?\.(?:webp|jpe?g|png|svg|css|js|ico))(")/g;
    const walk = (d) => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const fp = path.join(d, e.name);
        if (e.isDirectory()) walk(fp);
        else if (e.name.endsWith(".html")) {
          const html = fs.readFileSync(fp, "utf8").replace(re, (m, a, u, z) => {
            const h = hashOf(u);
            return h ? a + u + "?v=" + h + z : m;
          });
          fs.writeFileSync(fp, html);
        }
      }
    };
    walk(out);
  });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    // Page bodies are verbatim HTML — don't run them through a template engine.
    // Only the .njk layout is templated.
    htmlTemplateEngine: false,
    markdownTemplateEngine: false,
    templateFormats: ["html", "njk"],
  };
};
