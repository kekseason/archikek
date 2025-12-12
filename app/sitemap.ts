import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://archikek.com'
  
  // All blog post slugs - existing + new SEO-optimized posts
  const blogSlugs = [
    // Existing posts
    'how-to-create-figure-ground-map',
    'what-is-nolli-map',
    'barcelona-eixample-urban-analysis',
    'site-analysis-architecture-students',
    'qgis-vs-archikek',
    'export-maps-to-illustrator',
    'best-themes-site-analysis',
    'urban-morphology-explained',
    'color-theory-architecture-maps',
    'autocad-architecture-maps',
    'rhino-grasshopper-maps',
    'revit-site-analysis',
    'openstreetmap-architecture',
    'portfolio-site-analysis',
    'free-architecture-tools',
    
    // NEW SEO-optimized posts (high-value keywords)
    'site-plan-generator-free',           // 2,400 searches/mo
    'cad-map-download-dxf',               // 1,900 searches/mo
    '3d-city-model-generator',            // 3,600 searches/mo
    'urban-map-svg-download',             // 720 searches/mo
    'architecture-site-plan-guide',       // 1,300 searches/mo
    'dxf-map-export-autocad',             // 480 searches/mo
    'topographic-map-maker-online',       // 1,600 searches/mo
    'openstreetmap-architecture-maps',    // 800 searches/mo
    'free-architecture-tools-2024',       // 900 searches/mo
    'figure-ground-map-urban-design',     // 1,100 searches/mo
  ]

  // Static pages with optimized priorities
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/create`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,  // Main product page - very high priority
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Blog posts with varied priorities based on SEO value
  const highValueSlugs = [
    'site-plan-generator-free',
    '3d-city-model-generator', 
    'cad-map-download-dxf',
    'topographic-map-maker-online',
    'architecture-site-plan-guide',
    'figure-ground-map-urban-design',
    'free-architecture-tools-2024',
  ]

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: highValueSlugs.includes(slug) ? 0.8 : 0.6,
  }))

  return [...staticPages, ...blogPages]
}
