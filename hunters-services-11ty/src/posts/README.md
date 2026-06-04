# Blog posts (Eleventy collection)

Every file in this folder automatically becomes a blog post: it joins the `posts`
collection, gets the blog layout, a `/blog/<filename>.html` URL, BlogPosting +
BreadcrumbList schema, and auto-appears on `/blog.html` (newest first) and in `sitemap.xml`.

## Add a new post
1. Create `src/posts/my-post-title.html` (the filename becomes the URL slug).
2. Add front matter, then the article body (plain HTML — `<p>`, `<h2>`, `<h3>`, `<ul>`, etc.):

```html
---
title: "My Post Title"
date: 2026-07-01
author: "Hunters Services"
hero: "my-post-title"        # base name of the image in /assets/blog/ (omit for no hero)
description: "150-ish char SEO description."
excerpt: "One-sentence teaser shown on the blog index card."
---
<p>First paragraph…</p>
<h2>A subheading</h2>
<p>More copy…</p>
```

3. Add the hero image as `src/assets/blog/my-post-title.webp` (and a `.jpg` fallback).
   Inline images go in `/assets/blog/` too. Run `npm run build` (or `npm run dev`).

That's it — no scripts to run. The index, schema, and sitemap update themselves.

> This README is ignored by the build (only `.html`/`.njk` are processed).
