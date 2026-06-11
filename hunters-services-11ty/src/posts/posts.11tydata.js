const ORIGIN = "https://www.hunterspestcontrol.com";

// A post whose `date` is in the future is hidden from PRODUCTION builds (no page,
// not in the index, not in the sitemap) until its date passes. It stays visible in
// `npm run dev` so you can preview scheduled drafts. A rebuild after the date (e.g.
// the scheduled GitHub Action) publishes it automatically.
const isHiddenFuture = (data) => {
  if (process.env.PREVIEW_FUTURE === "1") return false;        // force-include for previews
  if (process.env.ELEVENTY_RUN_MODE !== "build") return false; // dev/serve = always preview
  const d = new Date((data.page && data.page.date) || data.date).getTime();
  return d > Date.now();
};

// Directory data: applies to every file in src/posts/.
// Drop a new .html (or .md) file here with the front matter shown in posts/README,
// and it auto-joins the "posts" collection, gets the blog layout, a /blog/<slug>.html
// URL, and BlogPosting + BreadcrumbList schema, no script needed.
module.exports = {
  layout: "layouts/post.njk",
  tags: "posts",
  nav: "blog",
  permalink: (data) => (isHiddenFuture(data) ? false : `/blog/${data.page.fileSlug}.html`),
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => isHiddenFuture(data),
    canonical: (data) => `${ORIGIN}/blog/${data.page.fileSlug}.html`,
    extraSchema: (data) => {
      const slug = data.page.fileSlug;
      const iso = data.page.date ? new Date(data.page.date).toISOString() : "";
      const plain = (s) => (s || "").replace(/&amp;/g, "&");
      const author = data.author === "Hunters Services"
        ? { "@type": "Organization", name: "Hunters Services" }
        : { "@type": "Person", name: data.author || "Hunters Services" };
      const blogPosting = {
        "@context": "https://schema.org", "@type": "BlogPosting",
        headline: plain(data.title), description: plain(data.description),
        image: `${ORIGIN}/assets/blog/${data.hero || slug}.jpg`,
        datePublished: iso, dateModified: iso, author,
        publisher: { "@type": "Organization", name: "Hunters Services", logo: { "@type": "ImageObject", url: `${ORIGIN}/logo.png` } },
        mainEntityOfPage: `${ORIGIN}/blog/${slug}.html`,
      };
      const breadcrumb = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: ORIGIN + "/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: ORIGIN + "/blog.html" },
          { "@type": "ListItem", position: 3, name: plain(data.title), item: `${ORIGIN}/blog/${slug}.html` },
        ],
      };
      return `<script type="application/ld+json">${JSON.stringify(blogPosting)}</script>\n  <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`;
    },
  },
};
