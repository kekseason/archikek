import { MetadataRoute } from 'next'
import { getAllCitySlugs } from '@/lib/cities'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://archikek.com'
  
  // All blog post slugs
  const blogSlugs = [
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
    'site-plan-generator-free',
    'cad-map-download-dxf',
    '3d-city-model-generator',
    'urban-map-svg-download',
    'architecture-site-plan-guide',
    'dxf-map-export-autocad',
    'topographic-map-maker-online',
    'openstreetmap-architecture-maps',
    'free-architecture-tools-2024',
    'figure-ground-map-urban-design',
    '3d-site-model-rhino-obj',
    '3d-print-city-model',
    'blender-glb-site-model',
    'sketchup-obj-import',
    '3d-themes-explained',
  ]

  // All city slugs for programmatic SEO
  const citySlugs = getAllCitySlugs()

  // Static pages
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
      priority: 0.95,
    },
    {
      url: `${baseUrl}/maps`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
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

  // High-value blog slugs for priority boost
  const highValueBlogSlugs = [
    'site-plan-generator-free',
    '3d-city-model-generator', 
    'cad-map-download-dxf',
    'topographic-map-maker-online',
    'architecture-site-plan-guide',
    'figure-ground-map-urban-design',
    'free-architecture-tools-2024',
  ]

  // Blog pages
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: highValueBlogSlugs.includes(slug) ? 0.8 : 0.6,
  }))

  // City pages - HIGH PRIORITY for SEO
  // Popular cities get higher priority
  const popularCities = [
    'barcelona', 'new-york', 'paris', 'tokyo', 'london', 'rome',
    'amsterdam', 'berlin', 'istanbul', 'singapore', 'dubai',
    'chicago', 'san-francisco', 'sydney', 'hong-kong', 'shanghai',
    'vienna', 'copenhagen', 'seoul', 'bangkok', 'mumbai', 'toronto',
  ]

  const cityPages = citySlugs.map((slug) => ({
    url: `${baseUrl}/maps/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: popularCities.includes(slug) ? 0.85 : 0.7,
  }))

  return [...staticPages, ...blogPages, ...cityPages]
}
