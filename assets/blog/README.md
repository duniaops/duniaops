# Blog images

Add one unique 1200×630 `.jpg`, `.jpeg`, or `.png` image for every published
article. Reference it from the article front matter with a root-relative path,
for example:

```yaml
image: "/assets/blog/my-article-1200x630.jpg"
imageAlt: "A concise description of the image"
```

The blog build verifies the file type, dimensions, and alternative text. It
also adds a content hash to generated image URLs so updated images are not
hidden by the site's immutable asset cache.
