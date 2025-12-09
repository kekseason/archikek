import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Blog post data with full content
const blogPosts: Record<string, {
  title: string
  description: string
  date: string
  readTime: string
  category: string
  content: string
}> = {
  'how-to-create-figure-ground-map': {
    title: 'How to Create a Figure Ground Map in 5 Minutes',
    description: 'Learn the fastest way to generate professional figure ground maps for your architecture projects without any GIS knowledge.',
    date: '2024-12-08',
    readTime: '5 min read',
    category: 'Tutorial',
    content: `
## What is a Figure Ground Map?

A figure ground map is a graphic representation of urban form that shows the relationship between built and unbuilt space. Buildings are shown as solid black shapes (figure) against a white background (ground), creating a powerful visual that reveals urban patterns, density, and spatial relationships.

## Why Architects Use Figure Ground Maps

Figure ground maps are essential for:

- **Site Analysis**: Understanding the urban context of your project site
- **Urban Studies**: Analyzing city morphology and development patterns
- **Presentations**: Creating compelling visuals for juries and clients
- **Design Development**: Identifying opportunities and constraints

## The Traditional Way (3+ Hours)

Traditionally, creating a figure ground map required:

1. Downloading OpenStreetMap data or CAD files
2. Opening QGIS or similar GIS software
3. Filtering building footprints
4. Styling layers correctly
5. Exporting and cleaning up in Illustrator
6. Fixing broken paths and organizing layers

This process takes 3-6 hours for someone experienced with GIS tools.

## The ArchiKEK Way (30 Seconds)

With ArchiKEK, the process is simple:

1. **Go to archikek.com** and click "Start Creating"
2. **Search for your location** or navigate on the map
3. **Select "Figure Ground" theme** from the theme panel
4. **Click Preview** to see your map instantly
5. **Download** your SVG with organized layers

That's it. Your figure ground map is ready to use in Illustrator with all layers properly organized.

## Tips for Great Figure Ground Maps

### Choose the Right Scale
- **500m**: Detailed neighborhood analysis
- **1000m**: District-level context
- **2000m**: City-wide patterns

### Consider Your Context
Some areas work better than others for figure ground:
- Dense urban centers show clear patterns
- Suburban areas may appear sparse
- Historic districts often have interesting morphology

### Post-Processing in Illustrator
Your ArchiKEK export comes with organized layers:
- Buildings layer (the figure)
- Background layer (the ground)
- Optional: roads, water, green spaces

You can easily adjust colors, add your site boundary, or combine with other analysis layers.

## Ready to Try?

Create your first figure ground map in seconds. No account required for preview.

[Start Creating →](/create)
    `
  },
  'what-is-nolli-map': {
    title: 'What is a Nolli Map? Complete Guide for Architects',
    description: 'Discover the history of Nolli maps, why they matter in urban analysis, and how to create one for your next project.',
    date: '2024-12-07',
    readTime: '7 min read',
    category: 'Guide',
    content: `
## The History of the Nolli Map

In 1748, Italian architect Giambattista Nolli created his famous map of Rome, known as "La Pianta Grande di Roma." What made this map revolutionary wasn't just its accuracy—it was how Nolli represented public and private space.

## What Makes a Nolli Map Special?

Unlike traditional figure ground maps that show all buildings as solid, Nolli maps distinguish between:

- **Private buildings**: Shown as solid/hatched (the "poche")
- **Public interiors**: Shown as white/open (churches, civic buildings)
- **Streets and plazas**: Shown as white/open

This reveals the true public realm of a city—including interior public spaces like church naves and market halls that are often missed in conventional mapping.

## Nolli Maps vs Figure Ground Maps

| Feature | Figure Ground | Nolli Map |
|---------|--------------|-----------|
| Buildings | All solid | Public interiors shown open |
| Public space | Only outdoor | Indoor + outdoor |
| Complexity | Simple | More nuanced |
| Best for | Quick context | Public realm analysis |

## Why Architects Still Use Nolli Maps

275+ years later, Nolli's approach remains relevant:

- **Public Space Analysis**: Understanding the true extent of public realm
- **Circulation Studies**: Mapping pedestrian flow through buildings
- **Urban Design**: Planning interventions that connect public spaces
- **Historic Preservation**: Documenting significant public interiors

## Creating a Nolli Map with ArchiKEK

ArchiKEK's "Nolli" theme provides a starting point for your Nolli analysis:

1. Generate your base map with the Nolli theme
2. Export to Illustrator (SVG with layers)
3. Manually adjust significant public buildings
4. Add hatching or poche to private structures

Since true Nolli mapping requires knowledge of which buildings have public interiors, the final customization is up to you—but ArchiKEK saves you hours on the base map.

## Famous Examples of Nolli-Style Analysis

Many architects have used Nolli's approach:

- **Colin Rowe's "Collage City"**: Used figure-ground analysis extensively
- **Rome Interrotta (1978)**: 12 architects reimagined Nolli's map
- **Modern urban studies**: Nolli analysis remains standard in architecture education

## Try It Yourself

Generate a Nolli-style base map for any city in the world.

[Create Your Map →](/create)
    `
  },
  'site-analysis-architecture-students': {
    title: 'Site Analysis 101: A Complete Guide for Architecture Students',
    description: 'Everything you need to know about site analysis - from data collection to presentation. Perfect for studio projects.',
    date: '2024-12-06',
    readTime: '10 min read',
    category: 'Guide',
    content: `
## Why Site Analysis Matters

Before you design anything, you need to understand your site. Site analysis is the foundation of good architecture—it reveals opportunities, constraints, and context that should inform your design decisions.

## Components of Site Analysis

A comprehensive site analysis typically includes:

### 1. Physical Analysis
- **Topography**: Slopes, elevation changes, drainage
- **Climate**: Sun path, wind patterns, rainfall
- **Vegetation**: Existing trees, green spaces
- **Water**: Rivers, lakes, flood zones

### 2. Built Environment
- **Building footprints**: Surrounding structures
- **Heights and density**: Urban form
- **Land use**: Residential, commercial, industrial
- **Infrastructure**: Roads, utilities, transit

### 3. Circulation
- **Vehicular**: Roads, parking, traffic flow
- **Pedestrian**: Sidewalks, paths, desire lines
- **Public transit**: Stops, routes, accessibility

### 4. Sensory Analysis
- **Views**: What you see from the site
- **Noise**: Traffic, neighbors, ambient sound
- **Smell**: Industrial areas, restaurants, nature

## Creating Site Analysis Maps

For most studio projects, you'll need several maps:

### Figure Ground Map
Shows building footprints vs open space. Essential for understanding urban context.

### Circulation Map
Overlays showing vehicular and pedestrian movement patterns.

### Land Use Map
Color-coded zones showing different uses around your site.

### Topography Map
Contour lines showing elevation changes.

## Tools for Site Analysis

### Traditional Approach
- Google Earth for satellite imagery
- QGIS for data analysis
- CAD software for drawing
- Hours of manual work

### Modern Approach with ArchiKEK
- Generate multiple themed maps in minutes
- Export organized layers to Illustrator
- Focus on analysis, not data processing

## Presentation Tips

### Keep It Clear
Don't overcrowd your analysis boards. Each map should communicate one main idea.

### Use Consistent Styling
Same scale, same north orientation, complementary colors across all maps.

### Add Your Insights
Raw data isn't analysis. Add annotations explaining what the patterns mean for your design.

### Layer Information
Start with base maps, then overlay analytical information progressively.

## Common Mistakes to Avoid

1. **Too much data**: Focus on what's relevant to your project
2. **No scale bar**: Always include scale reference
3. **Missing north arrow**: Orient your audience
4. **Generic analysis**: Every site is unique—show what makes yours special

## Quick Start

Generate your base maps in minutes, spend your time on actual analysis.

[Start Your Site Analysis →](/create)
    `
  },
  'qgis-vs-archikek': {
    title: 'QGIS vs ArchiKEK: Which is Better for Quick Site Analysis?',
    description: 'A honest comparison of traditional GIS software vs modern web tools for architecture site analysis.',
    date: '2024-12-05',
    readTime: '6 min read',
    category: 'Comparison',
    content: `
## The Honest Truth

Let's be clear upfront: QGIS and ArchiKEK serve different purposes. This isn't about which is "better"—it's about which is right for your needs.

## QGIS: The Powerful Giant

QGIS is a full-featured Geographic Information System used by professionals worldwide.

### Strengths
- **Complete control**: Every aspect is customizable
- **Advanced analysis**: Spatial queries, geoprocessing, plugins
- **Multiple data sources**: Shapefiles, databases, web services
- **Free and open source**: No cost, active community

### Weaknesses
- **Steep learning curve**: Takes weeks to become proficient
- **Complex interface**: Overwhelming for simple tasks
- **Setup time**: Installing, configuring, finding data
- **Overkill for architects**: Most features aren't needed for site analysis

## ArchiKEK: The Specialist Tool

ArchiKEK is built specifically for architecture site analysis maps.

### Strengths
- **Instant results**: 30 seconds from idea to map
- **No learning curve**: Point, click, download
- **Architect-focused**: Themes designed for architecture presentation
- **Illustrator-ready**: Organized SVG layers, not GIS data

### Weaknesses
- **Limited customization**: Pre-set themes and styles
- **No advanced GIS**: Can't do spatial analysis
- **Web-dependent**: Needs internet connection
- **Specific use case**: Only for site analysis maps

## When to Use QGIS

Choose QGIS when you need:
- Complex spatial analysis
- Custom data processing
- Large-scale mapping projects
- Integration with other GIS workflows
- Maximum control over output

## When to Use ArchiKEK

Choose ArchiKEK when you need:
- Quick context maps for presentations
- Studio project site analysis
- Multiple themed maps fast
- Illustrator-ready exports
- No time to learn GIS

## The Real Comparison

| Task | QGIS | ArchiKEK |
|------|------|----------|
| Learning time | Weeks | Minutes |
| Figure ground map | 2-4 hours | 30 seconds |
| Multiple themes | Hours each | Instant switch |
| Layer organization | Manual | Automatic |
| Illustrator export | Complex | One click |

## Our Recommendation

**For architecture students**: Start with ArchiKEK for quick site analysis. Learn QGIS later if you go into urban planning or need advanced GIS.

**For practicing architects**: Use ArchiKEK for day-to-day site context. Keep QGIS for projects requiring deep spatial analysis.

**For urban planners**: QGIS is likely your primary tool, but ArchiKEK can speed up presentation graphics.

## Try Both

QGIS is free to download. ArchiKEK is free to preview.

[Try ArchiKEK →](/create)
    `
  },
  'export-maps-to-illustrator': {
    title: 'How to Export Site Analysis Maps to Adobe Illustrator',
    description: 'Step-by-step guide to exporting and editing your site analysis maps in Illustrator with organized layers.',
    date: '2024-12-04',
    readTime: '4 min read',
    category: 'Tutorial',
    content: `
## Why Illustrator?

Adobe Illustrator is the industry standard for architecture graphics. Vector-based editing gives you complete control over your site analysis maps.

## ArchiKEK's Illustrator-Ready Export

When you download an SVG from ArchiKEK, you get:

- **Organized layers**: Buildings, roads, water, green areas, transit
- **Clean vectors**: No raster images, infinitely scalable
- **Editable paths**: Every element can be modified
- **Proper grouping**: Logical structure for easy editing

## Step-by-Step Export Process

### 1. Generate Your Map
- Select your location
- Choose your theme
- Adjust settings (contours, transit, etc.)
- Click Download

### 2. Open in Illustrator
- File → Open → Select your SVG
- Or drag and drop into Illustrator
- Layers panel will show organized structure

### 3. Explore the Layers
Your ArchiKEK export includes:
- **Background**: Base color layer
- **Contours**: Topography lines (if enabled)
- **Water**: Rivers, lakes, sea
- **Green**: Parks, forests, grass
- **Roads**: Organized by type
- **Buildings**: With height shading
- **Transit**: Metro, bus, tram stops
- **Frame**: Legend and info (if enabled)

### 4. Common Edits

#### Change Building Color
1. Select Buildings layer
2. Select All (Cmd/Ctrl + A while layer is targeted)
3. Change fill color

#### Add Your Site Boundary
1. Create new layer above Buildings
2. Draw your site boundary
3. Style with dashed line or fill

#### Adjust Road Weights
1. Expand Roads layer group
2. Select specific road type
3. Adjust stroke weight

#### Add Annotations
1. Create new layer for annotations
2. Add text, arrows, symbols
3. Keep analysis separate from base map

## Pro Tips

### Preserve Original
Always keep an unmodified copy of your ArchiKEK export. Create a duplicate before editing.

### Use Layer Comps
Save different layer visibility states for different analysis views.

### Consistent Scale
If using multiple ArchiKEK maps, generate them at the same size and resolution for consistent scaling.

### Color Themes
Create a color palette that works across all your analysis maps for a cohesive presentation.

## Troubleshooting

### Text Not Editable
ArchiKEK uses outlined text for compatibility. To edit text, delete and retype.

### File Won't Open
Make sure you're opening .svg file, not previewing in browser.

### Layers Missing
Check that all layers are visible (eye icon in Layers panel).

## Start Creating

Generate your first Illustrator-ready site analysis map.

[Create Map →](/create)
    `
  },
  'best-themes-site-analysis': {
    title: '24 Map Themes for Different Site Analysis Types',
    description: 'Explore different map styles - from minimal figure ground to detailed blueprint - and when to use each one.',
    date: '2024-12-03',
    readTime: '5 min read',
    category: 'Guide',
    content: `
## Why Theme Choice Matters

The right map theme can make your site analysis clearer and more impactful. Different themes suit different analysis types and presentation contexts.

## ArchiKEK's 24 Themes Explained

### Urban Form Themes

#### 1. Figure Ground
**Best for**: Pure urban morphology analysis
- Black buildings on white background
- Classic architectural representation
- Maximum contrast and clarity

#### 2. Nolli
**Best for**: Public space analysis
- Inspired by Giambattista Nolli's 1748 Rome map
- Shows building mass vs public realm
- Warm, historic aesthetic

#### 3. Solid Void
**Best for**: Mass studies
- Similar to figure ground, inverted options
- Focus on positive/negative space
- Clean, minimal presentation

### Atmospheric Themes

#### 4. Midnight
**Best for**: Dramatic presentations
- Dark background with glowing elements
- Modern, tech-forward aesthetic
- Great for digital presentations

#### 5. Blueprint
**Best for**: Technical presentations
- Classic blue engineering drawing style
- Professional, technical feel
- Works well printed or digital

#### 6. Satellite
**Best for**: Realistic context
- Earth-tone colors
- Natural, geographic feeling
- Good for environmental analysis

### Analytical Themes

#### 7. Terrain
**Best for**: Topography focus
- Emphasizes elevation and contours
- Natural color palette
- Ideal for sloped sites

#### 8. Infrastructure
**Best for**: Circulation analysis
- Highlights roads and transit
- Shows connectivity
- Good for access studies

#### 9. Land Use
**Best for**: Zoning analysis
- Color-coded by use type
- Shows urban diversity
- Planning-focused

### Minimal Themes

#### 10. Minimal Light
**Best for**: Clean presentations
- Subtle, muted colors
- Easy to annotate over
- Won't compete with your design

#### 11. Minimal Dark
**Best for**: Modern presentations
- Dark mode aesthetic
- Sophisticated look
- Great for screens

### Special Themes

#### 12. Vintage
**Best for**: Historic sites
- Aged paper aesthetic
- Classic cartography style
- Nostalgic feeling

#### 13. Neon
**Best for**: Creative presentations
- Bold, vibrant colors
- Unconventional approach
- Stand out from typical analysis

## Choosing the Right Theme

### Consider Your Purpose
- Academic jury? Classic themes (Figure Ground, Blueprint)
- Client presentation? Atmospheric themes (Midnight, Satellite)
- Publication? Clean themes (Minimal Light/Dark)

### Consider Your Site
- Dense urban? Figure Ground works great
- Natural landscape? Terrain or Satellite
- Historic district? Vintage or Nolli

### Consider Your Design Style
Match your analysis maps to your overall presentation aesthetic.

## Try Them All

Preview is free—experiment with different themes to find what works.

[Explore Themes →](/create)
    `
  },
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug]
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['ArchiKEK'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n')
    const elements: JSX.Element[] = []
    let inList = false
    let listItems: string[] = []
    let inTable = false
    let tableRows: string[][] = []

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 text-gray-300 my-4 ml-4">
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        )
        listItems = []
      }
      inList = false
    }

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
            <table className="w-full text-sm text-gray-300">
              <thead>
                <tr className="border-b border-[#333]">
                  {tableRows[0].map((cell, i) => (
                    <th key={i} className="text-left py-2 px-4 text-amber-500 font-medium" dangerouslySetInnerHTML={{ __html: cell }} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, i) => (
                  <tr key={i} className="border-b border-[#222]">
                    {row.map((cell, j) => (
                      <td key={j} className="py-2 px-4" dangerouslySetInnerHTML={{ __html: cell }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        tableRows = []
      }
      inTable = false
    }

    lines.forEach((line, index) => {
      const trimmed = line.trim()

      // Table detection
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        if (!inTable) {
          flushList()
          inTable = true
        }
        const cells = trimmed.split('|').filter(c => c.trim()).map(c => c.trim())
        if (!trimmed.includes('---')) {
          tableRows.push(cells)
        }
        return
      } else if (inTable) {
        flushTable()
      }

      // Skip empty lines
      if (!trimmed) {
        flushList()
        return
      }

      // Headers
      if (trimmed.startsWith('## ')) {
        flushList()
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-white mt-10 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        )
        return
      }

      if (trimmed.startsWith('### ')) {
        flushList()
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-white mt-8 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        )
        return
      }

      if (trimmed.startsWith('#### ')) {
        flushList()
        elements.push(
          <h4 key={index} className="text-lg font-medium text-amber-500 mt-6 mb-2">
            {trimmed.replace('#### ', '')}
          </h4>
        )
        return
      }

      // List items
      if (trimmed.startsWith('- ')) {
        inList = true
        let item = trimmed.replace('- ', '')
        // Handle bold
        item = item.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
        listItems.push(item)
        return
      }

      // Numbered list
      if (/^\d+\.\s/.test(trimmed)) {
        inList = true
        let item = trimmed.replace(/^\d+\.\s/, '')
        item = item.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
        listItems.push(item)
        return
      }

      // Links
      if (trimmed.startsWith('[') && trimmed.includes('](/')) {
        flushList()
        const match = trimmed.match(/\[([^\]]+)\]\(([^)]+)\)/)
        if (match) {
          elements.push(
            <p key={index} className="my-6">
              <Link href={match[2]} className="inline-block bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-lg font-medium transition">
                {match[1]}
              </Link>
            </p>
          )
        }
        return
      }

      // Regular paragraph
      flushList()
      let text = trimmed
      text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
      elements.push(
        <p key={index} className="text-gray-300 leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: text }} />
      )
    })

    flushList()
    flushTable()

    return elements
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">A</span>
            </div>
            <span className="text-white font-semibold">ArchiKEK</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition">Blog</Link>
            <Link href="/create" className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-sm font-medium transition">
              Create Map
            </Link>
          </nav>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/blog" className="hover:text-amber-500 transition">Blog</Link>
          <span>/</span>
          <span className="text-gray-400">{post.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-[#222]">
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span className="text-amber-500">{post.category}</span>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {renderContent(post.content)}
        </div>

        {/* Author / CTA */}
        <div className="mt-16 p-8 bg-[#111] border border-[#222] rounded-xl text-center">
          <h3 className="text-xl font-bold text-white mb-2">Ready to create your site analysis?</h3>
          <p className="text-gray-400 mb-6">Generate professional maps in seconds. Free preview, no account required.</p>
          <Link href="/create" className="inline-block bg-amber-500 hover:bg-amber-400 text-black px-8 py-3 rounded-lg font-medium transition">
            Start Creating →
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-sm text-gray-500">
          <span>© 2024 ArchiKEK</span>
          <div className="flex gap-6">
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <Link href="/create" className="hover:text-white transition">Create</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
