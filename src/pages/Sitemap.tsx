import { useEffect } from 'react';

export default function Sitemap() {
  useEffect(() => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vulninsights.com/</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vulninsights.com/blogs</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://vulninsights.com/tools</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vulninsights.com/about</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    // Set the content type to XML
    document.contentType = 'application/xml';
    
    // Clear any existing content
    document.body.innerHTML = '';
    
    // Create a text node with the sitemap content
    const textNode = document.createTextNode(sitemap);
    document.body.appendChild(textNode);
    
    // Set the document title
    document.title = 'Sitemap';
    
    // Add XML content type meta tag
    const meta = document.createElement('meta');
    meta.setAttribute('http-equiv', 'Content-Type');
    meta.setAttribute('content', 'application/xml; charset=UTF-8');
    document.head.appendChild(meta);
  }, []);

  return null;
}
