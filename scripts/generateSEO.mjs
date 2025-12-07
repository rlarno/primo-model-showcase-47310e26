import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the images configuration
const imagesConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/config/images.json'), 'utf-8')
);

const domain = 'https://loic.larno.be';

// Generate robots.txt
function generateRobotsTxt() {
  const allowedImages = [
    imagesConfig.hero.filename,
    ...imagesConfig.gallery.map(img => img.filename),
    ...imagesConfig.portfolio.map(img => img.filename),
  ];

  let robotsTxt = `# Allow all bots to index the site
User-agent: *
Allow: /

# Block indexing of the full assets folder
Disallow: /assets/
# Block variant images that aren't shown by default
Disallow: /assets/*-2.jpg
Disallow: /assets/*-3.jpg
Disallow: /assets/*-4.jpg

# Allow indexing of specific images used on the site

`;

  allowedImages.forEach(filename => {
    robotsTxt += `Allow: /assets/${filename}\n`;
  });

  robotsTxt += `\n# Sitemap location\nSitemap: ${domain}/sitemap.xml\n`;

  return robotsTxt;
}

// Generate sitemap.xml
function generateSitemapXml() {
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Main Portfolio Page -->
  <url>
    <loc>${domain}/</loc>
    <lastmod>2025-12-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    
`;

  // Add hero image
  sitemapXml += `    <!-- Hero Image -->
    <image:image>
      <image:loc>${domain}/assets/${imagesConfig.hero.filename}</image:loc>
      <image:caption>${imagesConfig.hero.caption}</image:caption>
      <image:title>${imagesConfig.hero.title}</image:title>
    </image:image>
    
    <!-- Gallery Images -->
`;

  // Add gallery images
  imagesConfig.gallery.forEach(img => {
    sitemapXml += `    <image:image>
      <image:loc>${domain}/assets/${img.filename}</image:loc>
      <image:caption>${img.caption}</image:caption>
    </image:image>
`;
  });

  sitemapXml += `    
    <!-- Portfolio Carousel Images -->
`;

  // Add portfolio images
  imagesConfig.portfolio.forEach(img => {
    sitemapXml += `    <image:image>
      <image:loc>${domain}/assets/${img.filename}</image:loc>
      <image:caption>${img.caption}</image:caption>
    </image:image>
`;
  });

  sitemapXml += `  </url>
  
  <!-- Privacy Notice Page -->
  <url>
    <loc>${domain}/privacy.html</loc>
    <lastmod>2025-12-06</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Direct Image Link -->
  <url>
    <loc>${domain}/portrait.jpg</loc>
    <lastmod>2025-12-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>
`;

  return sitemapXml;
}

// Write files
const publicDir = path.join(__dirname, '../public');

fs.writeFileSync(
  path.join(publicDir, 'robots.txt'),
  generateRobotsTxt()
);

fs.writeFileSync(
  path.join(publicDir, 'sitemap.xml'),
  generateSitemapXml()
);

console.log('✓ Generated robots.txt');
console.log('✓ Generated sitemap.xml');
