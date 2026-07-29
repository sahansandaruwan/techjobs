import fs from 'fs';
import path from 'path';

const postsDataPath = path.resolve('src/postsData.json');
const distPath = path.resolve('dist');
const sitemapPath = path.join(distPath, 'sitemap.xml');

let posts = [];
if (fs.existsSync(postsDataPath)) {
  posts = JSON.parse(fs.readFileSync(postsDataPath, 'utf-8'));
}

const baseUrl = 'https://sahansandaruwan.github.io/techjobs'; // In a real app this would be an env var

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/posts</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;

for (const post of posts) {
  xml += `  <url>
    <loc>${baseUrl}/post/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
}

xml += `</urlset>`;

if (fs.existsSync(distPath)) {
  fs.writeFileSync(sitemapPath, xml);
  console.log('Sitemap generated!');
} else {
  console.log('dist directory not found, skipping sitemap.');
}
