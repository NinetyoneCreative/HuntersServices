module.exports = function (eleventyConfig) {
  // Static assets copied verbatim to the output root
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  // Root-served files: robots.txt, sitemap.xml, netlify.toml, logo.png, og.png
  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  // Rebuild the browser when CSS/JS change during `npm run dev`
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    // Page bodies are verbatim HTML — don't run them through a template engine.
    // Only the .njk layout is templated.
    htmlTemplateEngine: false,
    markdownTemplateEngine: false,
    templateFormats: ["html", "njk"],
  };
};
