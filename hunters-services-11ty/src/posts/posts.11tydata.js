const ORIGIN = "https://www.hunterspestcontrol.com";

// Directory data: applies to every file in src/posts/.
// Drop a new .html (or .md) file here with the front matter shown in posts/README,
// and it auto-joins the "posts" collection, gets the blog layout, a /blog/<slug>.html
// URL, and BlogPosting + BreadcrumbList schema — no script needed.
module.exports = {
  layout: "layouts/post.njk",
  tags: "posts",
  nav: "blog",
  permalink: (data) => `/blog/${data.page.fileSlug}.html`,
  eleventyComputed: {
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
