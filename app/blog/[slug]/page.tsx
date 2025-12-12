import Link from 'next/link'
import Image from 'next/image'
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
  'barcelona-eixample-urban-analysis': {
    title: "Barcelona's Eixample: A Perfect Grid for Urban Analysis",
    description: "Explore how Ildefons Cerdà's revolutionary grid design makes Barcelona ideal for site analysis studies.",
    date: '2024-12-09',
    readTime: '8 min read',
    category: 'Case Study',
    content: `
## The Cerdà Plan: A Revolution in Urban Planning

In 1859, Ildefons Cerdà presented his plan for Barcelona's expansion—the Eixample (meaning "extension" in Catalan). This wasn't just city planning; it was a radical reimagining of how cities could work.

## Why Barcelona's Grid is Special

### The Chamfered Corners

Unlike typical American grids with 90-degree corners, Cerdà's blocks have 45-degree chamfers (cuts) at each corner. This creates:

- **Better visibility** at intersections
- **Small plazas** at every crossing
- **Improved air circulation**
- **More interesting figure-ground patterns**

### The Superblock Concept

Cerdà designed the grid with "superblocks" in mind—groups of blocks that share interior courtyards. This creates:

- Semi-private green spaces
- Pedestrian-priority zones
- Community gathering areas

## Figure Ground Analysis of Eixample

When you generate a figure ground map of Eixample, you'll notice:

### The Octagonal Pattern
The chamfered corners create a distinctive octagonal rhythm that's immediately recognizable. This is why Barcelona maps are so popular for architectural presentations—they're visually striking.

### Building Perimeters
Most blocks follow the perimeter building typology—structures around the edges with courtyards in the center. This creates a clear distinction between public streets and private interiors.

### Density Variations
While the grid is regular, building heights and densities vary. Some courtyards have been filled in over time, visible in detailed figure-ground studies.

## Best Themes for Barcelona Analysis

For Eixample specifically, try these ArchiKEK themes:

- **Figure Ground**: Classic black/white shows the octagonal pattern clearly
- **Nolli**: Reveals public vs private space relationships
- **Blueprint**: Technical feel perfect for urban analysis presentations
- **Warm Sunset**: Beautiful for portfolio pieces

## Urban Lessons from Eixample

Cerdà's design teaches us:

1. **Grid doesn't mean boring**: The chamfered corners add visual interest
2. **Scale matters**: 113m x 113m blocks are walkable
3. **Flexibility within structure**: The grid accommodates diverse uses
4. **Green space integration**: Interior courtyards provide relief

## Create Your Barcelona Map

Generate a map of Eixample and see these patterns yourself.

[Create Barcelona Map →](/create)
    `
  },
  'urban-morphology-explained': {
    title: 'Urban Morphology: Reading Cities Through Their Shapes',
    description: 'Understanding how cities evolve through their physical form. A primer for architecture students.',
    date: '2024-12-02',
    readTime: '9 min read',
    category: 'Theory',
    content: `
## What is Urban Morphology?

Urban morphology is the study of the physical form of cities—how they're shaped, how they grew, and what patterns emerge from their development. For architects, it's a fundamental tool for understanding context.

## The Three Scales of Urban Form

### 1. Street Pattern (Macro Scale)
The overall layout of streets and blocks:
- **Grid**: Planned cities (New York, Barcelona)
- **Radial**: Cities centered on a point (Paris, Moscow)
- **Organic**: Medieval cities (Venice, Marrakech)
- **Linear**: Cities along routes (strip developments)

### 2. Plot Pattern (Meso Scale)
How land is divided into individual parcels:
- **Regular plots**: Planned subdivisions
- **Irregular plots**: Organic growth over time
- **Burgage plots**: Medieval long, narrow lots

### 3. Building Pattern (Micro Scale)
The footprints and arrangements of buildings:
- **Perimeter blocks**: Buildings around edges
- **Freestanding**: Isolated buildings in space
- **Row houses**: Connected street frontage
- **Courtyard**: Buildings around central space

## Reading a Figure Ground Map

When you look at a figure ground map, ask yourself:

### What's the dominant pattern?
- Regular grid suggests planned development
- Irregular organic patterns suggest gradual growth
- Mixed patterns suggest different eras of development

### Where are the anomalies?
- Large footprints often indicate institutions or industry
- Voids might be parks, plazas, or former sites
- Dense clusters might be historic cores

### What's the grain?
- Fine grain (small plots, many buildings) = pedestrian-friendly
- Coarse grain (large plots, few buildings) = car-oriented

## Historical Layers in Cities

Cities are palimpsests—they accumulate layers over time:

1. **Medieval core**: Organic streets, small plots
2. **Renaissance/Baroque**: Formal axes, symmetry
3. **Industrial era**: Large factories, worker housing
4. **Modernist period**: Towers in parks, wide roads
5. **Contemporary**: Mixed approaches, infill

## Morphological Analysis for Design

Understanding morphology helps architects:

- **Respect context**: Match grain and scale
- **Identify opportunities**: Find gaps and anomalies
- **Justify proposals**: Ground designs in urban logic
- **Predict impacts**: Understand how changes affect surroundings

## Tools for Morphological Study

### Figure Ground Maps
Show building footprints vs open space. Essential first step.

### Solid-Void Diagrams
Invert figure-ground to focus on public space.

### Street Hierarchy Maps
Show primary, secondary, tertiary routes.

### Historical Overlays
Compare maps from different eras.

## Start Your Analysis

Generate figure ground maps to begin understanding any city's morphology.

[Create Map →](/create)
    `
  },
  'color-theory-architecture-maps': {
    title: 'Color Theory for Architecture Maps: Choosing the Right Palette',
    description: 'Why some map colors work better than others. Learn to pick themes that enhance your presentations.',
    date: '2024-12-01',
    readTime: '6 min read',
    category: 'Design',
    content: `
## Why Color Matters in Site Analysis

The colors you choose for your site analysis maps affect how your work is perceived. The right palette can make your analysis clearer, more professional, and more memorable.

## Color Psychology in Architecture Presentations

### Black and White
**Feeling**: Professional, timeless, analytical
**Best for**: Academic presentations, publications, technical analysis
**ArchiKEK themes**: Figure Ground, Minimal Light

### Blue Tones
**Feeling**: Technical, trustworthy, precise
**Best for**: Engineering-focused presentations, technical documentation
**ArchiKEK themes**: Blueprint, Technical

### Warm Tones (Orange, Amber)
**Feeling**: Inviting, creative, energetic
**Best for**: Client presentations, portfolio pieces
**ArchiKEK themes**: Warm Sunset, Desert

### Earth Tones
**Feeling**: Natural, grounded, contextual
**Best for**: Landscape-focused projects, environmental analysis
**ArchiKEK themes**: Satellite, Terrain

### Dark Themes
**Feeling**: Modern, sophisticated, dramatic
**Best for**: Digital presentations, evening reviews
**ArchiKEK themes**: Midnight, Neon

## Contrast and Readability

### High Contrast
Black on white (or vice versa) provides maximum readability. Use for:
- Complex urban areas with many buildings
- Maps that will be printed
- Presentations in bright rooms

### Low Contrast
Subtle color differences create atmosphere. Use for:
- Background context maps
- Mood boards and concept presentations
- Digital-only presentations

## Color for Information Hierarchy

Use color strategically to guide the eye:

### Primary Elements (Buildings)
Should be the most visually prominent. Use solid, saturated colors.

### Secondary Elements (Roads)
Should be visible but not dominant. Use medium values.

### Tertiary Elements (Water, Green)
Provide context without competing. Use lighter values.

## Common Mistakes to Avoid

### Too Many Colors
Stick to 3-5 colors maximum. More creates visual chaos.

### Fighting Colors
Avoid colors that vibrate when placed together (like red and cyan).

### Ignoring Print
What looks good on screen may not print well. Test your outputs.

### Forgetting Context
Your map doesn't exist in isolation. Consider the overall presentation.

## Matching Your Design Aesthetic

Your site analysis should feel cohesive with your design presentation:

- **Minimalist design?** Use Minimal Light/Dark themes
- **Bold, expressive design?** Try Neon or Warm Sunset
- **Technical approach?** Blueprint or Technical themes
- **Contextual/sensitive design?** Satellite or Terrain themes

## Experiment with Themes

ArchiKEK's preview feature lets you try different themes instantly. Don't settle for the first option—explore what works best for your specific project and presentation context.

[Try Different Themes →](/create)
    `
  },
  'autocad-architecture-maps': {
    title: 'How to Import Site Maps into AutoCAD: Complete DXF Guide',
    description: 'Step-by-step tutorial for importing ArchiKEK DXF exports into AutoCAD with proper layers and scaling.',
    date: '2024-12-10',
    readTime: '5 min read',
    category: 'Tutorial',
    content: `
## Why DXF for AutoCAD?

While SVG works great for Illustrator and graphic design, AutoCAD users need DXF (Drawing Exchange Format) for proper CAD integration. ArchiKEK exports clean DXF files ready for architectural workflows.

## Step-by-Step Import Process

### 1. Generate Your Map
- Go to archikek.com/create
- Select your location and area
- Choose any theme (colors won't transfer to CAD)
- Select "DXF" as export format
- Click Download

### 2. Open in AutoCAD
- File → Open
- Select your .dxf file
- AutoCAD will import with layers intact

### 3. Check Your Layers
Your DXF includes organized layers:
- **buildings** - All building footprints
- **roads_highway** - Major roads
- **roads_primary** - Primary streets
- **roads_secondary** - Secondary streets
- **roads_residential** - Local streets
- **water** - Rivers, lakes, sea
- **green** - Parks and vegetation

### 4. Scale Verification

ArchiKEK exports are in real-world meters. To verify scale:

1. Draw a line between two known points
2. Use DIST command to measure
3. Compare with Google Maps measurement

If scaling is off:
- SCALE command
- Select all objects
- Apply scale factor

## Working with the Import

### Cleaning Up
- Delete unnecessary layers (LAYDEL)
- Purge unused elements (PURGE)
- Freeze layers you don't need visible

### Modifying Buildings
Building footprints are closed polylines. You can:
- OFFSET to create setbacks
- HATCH to fill areas
- PEDIT to modify shapes

### Adding Your Design
Create new layers for your design:
- proposed_buildings
- site_boundary
- landscape
- circulation

## Tips for Best Results

### Before Export
- Use larger area sizes (1000m+) for context
- Disable "Frame" option (not needed in CAD)
- Check that your selection includes all needed context

### In AutoCAD
- Save as DWG immediately after import
- Set up your layers before detailed work
- Use XREF if combining multiple exports

### Layer Standards
Consider renaming layers to match your office standards:
- A-BLDG-EXIST (existing buildings)
- A-ROAD-MAJR (major roads)
- C-TOPO-WATR (water features)

## Common Issues and Solutions

### File Won't Open
- Update AutoCAD to latest version
- Try opening in a blank drawing and INSERT as block

### Everything on One Layer
- Check Layer Manager (LA command)
- Layers exist but might all be same color

### Scale is Wrong
- Most likely unit mismatch
- Try UNITS command, set to Meters
- Re-import the DXF

### Missing Elements
- Some themes hide certain layers
- Try a different theme or enable all options

## DXF vs DWG

ArchiKEK exports DXF because:
- Universal format (works in any CAD software)
- No version compatibility issues
- Smaller file sizes
- Open standard

You can save as DWG after import for full AutoCAD features.

[Generate Your DXF →](/create)
    `
  },
  'rhino-grasshopper-maps': {
    title: 'Using Site Maps in Rhino and Grasshopper for Parametric Design',
    description: 'Import ArchiKEK exports into Rhino for 3D site modeling and Grasshopper parametric workflows.',
    date: '2024-12-09',
    readTime: '7 min read',
    category: 'Tutorial',
    content: `
## Rhino + Site Analysis = Powerful Combination

Rhino's precision and Grasshopper's parametric power make them ideal for site analysis and urban design. ArchiKEK exports work seamlessly with both.

## Importing into Rhino

### SVG Import
1. File → Import → Select your .svg file
2. Choose import options:
   - Scale: 1 unit = 1 meter
   - Curves: Keep as curves
3. Position at origin or georeferenced location

### DXF Import
1. File → Import → Select your .dxf file
2. DXF imports with layers intact
3. Check layer panel for organization

## Setting Up Your Site Model

### Organize Layers
Create a layer structure:
\`\`\`
SITE
├── CONTEXT
│   ├── buildings_existing
│   ├── roads
│   ├── water
│   └── green
├── BOUNDARY
│   └── site_limit
└── DESIGN
    ├── buildings_proposed
    └── landscape
\`\`\`

### Create Building Masses
From 2D footprints to 3D:
1. Select building curves
2. ExtrudeCrv command
3. Enter height (or use variable heights)

### Add Topography
If you have contour data:
1. Import contour lines
2. Use Patch or NetworkSrf
3. Project buildings onto terrain

## Grasshopper Workflows

### Parametric Site Analysis

**Building Density Analysis**
1. Reference building curves from Rhino
2. Calculate areas with Area component
3. Sum for total built area
4. Divide by site area for FAR

**Shadow Studies**
1. Create building masses
2. Use Ladybug plugin for sun position
3. Generate shadow projections
4. Animate through day/year

**Circulation Analysis**
1. Reference road centerlines
2. Create network graph
3. Calculate distances and connectivity
4. Visualize accessibility

### Urban Design Tools

**Random Building Heights**
\`\`\`
Curves → Extrude → Random(min, max) → Masses
\`\`\`

**Setback Generation**
\`\`\`
Curves → Offset → Extrude → Buildings with setbacks
\`\`\`

**View Corridor Analysis**
\`\`\`
Key viewpoints → Ray intersection → Height limits
\`\`\`

## Plugins That Help

### Ladybug Tools
Environmental analysis:
- Sun path diagrams
- Shadow studies
- Radiation analysis
- Wind visualization

### Elk
OpenStreetMap data directly in Grasshopper:
- Good for large-scale analysis
- Real-time data fetching
- Complements ArchiKEK exports

### Urbano
Urban analysis toolkit:
- Street network analysis
- Walkability scoring
- Land use modeling

## Tips for Best Results

### Scale Consistency
Always work in meters for site-scale projects. ArchiKEK exports are in meters by default.

### Layer Management
Keep imported context on locked layers to prevent accidental modification.

### Performance
Large site models can slow down. Use:
- Meshes instead of surfaces where possible
- Display modes that hide complex geometry
- Selective layer visibility

### Baking Workflow
In Grasshopper, bake analysis results to specific layers for documentation.

## Export for Presentations

From Rhino back to 2D:
- Make2D command for elevations/plans
- Export as PDF or SVG
- Use in Illustrator with ArchiKEK base maps

[Get Your Site Map →](/create)
    `
  },
  'revit-site-analysis': {
    title: 'Site Analysis Workflow in Revit: From ArchiKEK to BIM',
    description: 'How to use ArchiKEK exports as site context in Revit for BIM projects.',
    date: '2024-12-08',
    readTime: '6 min read',
    category: 'Tutorial',
    content: `
## Revit and Site Context

Revit excels at building modeling but often lacks easy site context tools. ArchiKEK fills this gap by providing quick context maps that you can reference in your BIM workflow.

## Import Methods

### Method 1: Linked CAD (Recommended)
Best for context that won't change:

1. Export DXF from ArchiKEK
2. In Revit: Insert → Link CAD
3. Choose your .dxf file
4. Set positioning:
   - Origin to Origin (if georeferenced)
   - Or manual placement
5. Link appears in your view

Benefits:
- File stays external (smaller Revit file)
- Easy to update (relink)
- Layers become Revit subcategories

### Method 2: Import CAD
For geometry you'll trace over:

1. Insert → Import CAD
2. Select .dxf file
3. Check "Current view only" if not needed in 3D
4. Explode if needed for tracing

### Method 3: Image Reference
Quick and simple for early design:

1. Export PNG from ArchiKEK (screenshot)
2. Insert → Image
3. Scale to match (use known dimension)

## Working with Imported Context

### Visibility Control
Manage imported layers:
1. Visibility/Graphics (VG)
2. Imported Categories tab
3. Expand your linked file
4. Toggle individual layers

### Scaling Verification
ArchiKEK exports are in meters. In Revit:
1. Use Measure tool
2. Check known distance (street width, etc.)
3. If off, delete and re-import with correct units

### Tracing Context Buildings

For buildings you want as Revit masses:
1. Create In-Place Mass
2. Trace footprint using Pick Lines
3. Extrude to approximate height
4. Use for shadow/view studies

## Site Analysis in Revit

### Sun Studies
With context buildings as masses:
1. View → Sun Path
2. Enable shadows
3. Create solar study animation
4. Export for presentations

### View Analysis
Check sight lines from your building:
1. Create section views through site
2. Use 3D views with context visible
3. Generate view corridors

### Area Calculations
With imported roads/boundaries:
1. Create area boundary from context
2. Calculate site area
3. Use for FAR/coverage calculations

## Tips for Revit Integration

### Keep It Light
- Link instead of import when possible
- Use 2D for context (import to plan views only)
- Delete what you don't need

### Coordinate with Team
If sharing the model:
- Keep linked files in project folder
- Use relative paths
- Document the context source

### Update Workflow
If site changes:
1. Generate new export from ArchiKEK
2. Save with same filename
3. Revit will update automatically (if linked)

## From Analysis to Design

Use your context map to:
1. Identify building setbacks
2. Align with street grid
3. Respond to neighboring masses
4. Justify design decisions

[Create Your Site Context →](/create)
    `
  },
  'openstreetmap-architecture': {
    title: 'OpenStreetMap for Architects: The Ultimate Free Data Source',
    description: 'Understanding OSM data and how architects can leverage this free resource for site analysis.',
    date: '2024-12-07',
    readTime: '8 min read',
    category: 'Guide',
    content: `
## What is OpenStreetMap?

OpenStreetMap (OSM) is a collaborative project to create a free, editable map of the world. Think of it as Wikipedia for maps—anyone can contribute, and the data is free to use.

## Why Architects Should Care

### Free and Open
No licensing fees, no usage limits. Use OSM data in your projects, publications, and commercial work (with attribution).

### Global Coverage
From New York to rural villages, OSM has data worldwide. Perfect for international projects.

### Detailed Building Data
Many cities have complete building footprints with:
- Accurate geometries
- Height information (where available)
- Building types and uses

### Constantly Updated
Volunteer mappers keep data current. Major cities update frequently.

## OSM Data Layers Useful for Architecture

### Buildings
- Footprint geometry
- Building height
- Number of levels
- Building type (residential, commercial, etc.)
- Roof shape (in detailed areas)

### Roads
- Hierarchy (motorway → residential)
- Width information
- Surface type
- Speed limits

### Land Use
- Residential areas
- Commercial zones
- Industrial areas
- Green spaces

### Natural Features
- Water bodies
- Parks and forests
- Elevation contours
- Trees (in detailed areas)

### Points of Interest
- Transit stops
- Schools, hospitals
- Shops and restaurants
- Historical markers

## OSM Data Quality

### Where It's Great
- Major cities worldwide
- Europe (especially Germany, France, UK)
- USA urban areas
- Japan
- Areas with active mapping communities

### Where It's Limited
- Rural areas in developing countries
- Private developments
- Very recent construction
- Building heights (inconsistent coverage)

### How to Check Quality
Before relying on OSM data:
1. View the area on openstreetmap.org
2. Compare with satellite imagery
3. Check when data was last updated
4. Generate a test map

## How ArchiKEK Uses OSM

ArchiKEK queries OSM through the Overpass API to:

1. **Fetch building footprints** for your selected area
2. **Get road networks** with proper hierarchy
3. **Include water and green spaces** for context
4. **Organize into layers** for easy editing

The raw data is processed into clean, architect-friendly exports.

## Contributing Back

If you find missing or incorrect data:

1. Create an account at openstreetmap.org
2. Use the iD editor (browser-based)
3. Add missing buildings or correct errors
4. Your changes help everyone

Even tracing a few buildings helps improve the resource for all architects.

## OSM vs Paid Alternatives

| Feature | OSM | Google Maps | Proprietary GIS |
|---------|-----|-------------|-----------------|
| Cost | Free | Expensive | Expensive |
| Building footprints | Yes | Limited | Yes |
| Downloadable | Yes | No | Varies |
| Editable | Yes | No | No |
| Global coverage | Good | Best | Varies |
| Update frequency | Community | Google | Varies |

## Legal Considerations

OSM uses the Open Database License (ODbL):
- **You can**: Use, share, modify, use commercially
- **You must**: Attribute OSM, share modifications under same license
- **You cannot**: Claim exclusive rights to the data

For architectural projects:
- Include "© OpenStreetMap contributors" in your credits
- This applies to ArchiKEK exports too

## Get Started

See OSM data quality for your project site:

[Generate Map →](/create)
    `
  },
  'portfolio-site-analysis': {
    title: 'Create Stunning Portfolio Site Analysis Pages',
    description: 'Tips for presenting site analysis work in your architecture portfolio that stands out.',
    date: '2024-12-06',
    readTime: '7 min read',
    category: 'Guide',
    content: `
## Why Site Analysis Matters in Portfolios

Site analysis pages demonstrate that you:
- Understand context
- Research before designing
- Think systematically
- Can communicate complex information clearly

Many portfolios skip this. Don't. It sets you apart.

## The Anatomy of Great Site Analysis

### 1. Location Context
Start with orientation:
- Country → City → District → Site
- Progressive zoom levels
- Clear labeling

### 2. Figure Ground
The essential base map:
- Shows urban fabric
- Identifies your site
- Reveals patterns and voids

### 3. Analytical Layers
Build upon the base:
- Circulation (vehicular, pedestrian)
- Green space and water
- Building heights
- Land use
- Historical development

### 4. Site-Specific Studies
- Sun path and shadows
- Views and vistas
- Noise and pollution
- Microclimate

### 5. Synthesis
Bring it together:
- Key opportunities
- Main constraints
- Design drivers

## Visual Hierarchy Tips

### Consistency is Key
- Same scale across all maps
- Consistent north orientation
- Matching color palette
- Uniform line weights

### Less is More
- One main idea per diagram
- Remove unnecessary information
- Let the analysis breathe

### Guide the Eye
- Use color to highlight key elements
- Size indicates importance
- White space is your friend

## Using ArchiKEK for Portfolio Work

### Choose the Right Theme
- **Figure Ground**: For urban morphology spread
- **Minimal**: For base maps you'll annotate
- **Blueprint**: For technical portfolios
- **Warm/Atmospheric**: For mood-setting pages

### Build Your Layers
Generate multiple exports:
1. Base figure-ground
2. Roads only
3. Water and green
4. Transit

Combine in Illustrator for custom diagrams.

### Customize Colors
Match your portfolio palette:
1. Generate with any theme
2. Open SVG in Illustrator
3. Select layers
4. Apply your colors

## Layout Suggestions

### The Classic Grid
4-6 small maps showing different analyses, equal size, strong alignment.

### The Hero Map
One large figure-ground with smaller analytical diagrams around it.

### The Process Sequence
Left to right progression from research to synthesis.

### The Layered Build-up
Sequential pages that add information progressively.

## Common Mistakes to Avoid

### Information Overload
Don't show everything at once. Spread across pages.

### Poor Scale Choice
Too zoomed in = no context
Too zoomed out = no detail
Find the balance.

### Inconsistent Style
Your site analysis should feel like it belongs with your design pages.

### Missing Synthesis
Raw analysis isn't enough. Show what you learned.

### Generic Analysis
Every site is unique. Show what's special about yours.

## Stand Out Strategies

### Show Your Process
Include sketches, notes, photos from site visits.

### Tell a Story
Connect analysis findings to design decisions.

### Be Selective
Show the analyses that mattered most to your design.

### Beautiful Execution
Even analytical work should be visually engaging.

[Create Your Base Map →](/create)
    `
  },
  'free-architecture-tools': {
    title: '10 Free Tools Every Architecture Student Needs',
    description: 'Essential free software and resources for architecture students, including mapping, visualization, and productivity tools.',
    date: '2024-12-05',
    readTime: '6 min read',
    category: 'Resources',
    content: `
## Build Your Toolkit Without Breaking the Bank

Architecture school is expensive. Software shouldn't be. Here are 10 free tools that rival paid alternatives.

## 1. ArchiKEK (Site Analysis Maps)
**What it does**: Generates figure ground maps, urban analysis diagrams in SVG and DXF
**Replaces**: Manual tracing, expensive GIS software
**Best for**: Site analysis, urban studies, quick context maps
**Link**: archikek.com

## 2. Blender (3D Modeling & Rendering)
**What it does**: Full 3D modeling, animation, rendering
**Replaces**: 3ds Max, Cinema 4D
**Best for**: Visualizations, animations, complex modeling
**Learning curve**: Steep but worth it
**Link**: blender.org

## 3. QGIS (Geographic Information System)
**What it does**: Full GIS analysis, mapping, data processing
**Replaces**: ArcGIS
**Best for**: Large-scale urban analysis, data-driven design
**Learning curve**: Moderate
**Link**: qgis.org

## 4. Figma (Diagrams & Presentations)
**What it does**: Vector graphics, collaborative design
**Replaces**: Illustrator for diagrams
**Best for**: Concept diagrams, presentation graphics, collaboration
**Link**: figma.com

## 5. Canva (Quick Graphics)
**What it does**: Easy graphic design with templates
**Replaces**: Photoshop for simple tasks
**Best for**: Social media, quick presentations, posters
**Link**: canva.com

## 6. Notion (Organization)
**What it does**: Notes, databases, project management
**Replaces**: Evernote, Trello
**Best for**: Research organization, thesis tracking, project logs
**Link**: notion.so

## 7. Photopea (Image Editing)
**What it does**: Browser-based Photoshop alternative
**Replaces**: Photoshop for many tasks
**Best for**: Quick photo editing, compositing
**Link**: photopea.com

## 8. Ladybug Tools (Environmental Analysis)
**What it does**: Climate analysis for Grasshopper
**Replaces**: Ecotect, paid environmental plugins
**Best for**: Sun studies, energy analysis, comfort modeling
**Link**: ladybug.tools

## 9. OpenStreetMap (Map Data)
**What it does**: Free, open map data worldwide
**Replaces**: Paid map services
**Best for**: Base maps, site context, urban data
**Link**: openstreetmap.org

## 10. Sketchfab (3D Sharing)
**What it does**: Share 3D models online
**Replaces**: Complex web viewers
**Best for**: Portfolio, presentations, client sharing
**Link**: sketchfab.com

## Bonus: Student Discounts

If you need paid software, get student versions:
- **Autodesk** (AutoCAD, Revit): Free for students
- **Adobe CC**: Heavy discount with .edu email
- **Rhino**: Student license ~$195 (vs $995)

## How to Learn These Tools

### YouTube
Search "[tool name] architecture tutorial"

### Official Documentation
Most tools have free learning resources

### Online Courses
- Coursera and edX have free options
- LinkedIn Learning (often free through universities)

### Practice Projects
Best way to learn: use tools on real projects

## Building Your Workflow

Don't try to learn everything. Build around your focus:

**Visualization Track**
Blender + Photopea + Figma

**Urban Design Track**
QGIS + ArchiKEK + Blender

**Technical Track**
Free Autodesk + QGIS + Ladybug

**Presentation Track**
Figma + Canva + Notion

[Start with Site Analysis →](/create)
    `
  },
  '3d-site-model-rhino-obj': {
    title: 'How to Create 3D Site Models for Rhino in Minutes',
    description: 'Export ready-to-use OBJ files with buildings, roads, water and terrain. Complete guide for Rhino users.',
    date: '2024-12-12',
    readTime: '6 min read',
    category: '3D Export',
    content: `
## Why 3D Site Models Matter

Every architecture project needs context. A 3D site model shows your design in relation to existing buildings, roads, terrain, and landscape features. But creating accurate 3D context models traditionally takes hours of manual work.

## The ArchiKEK 3D Export

ArchiKEK now exports 3D models directly to OBJ format—the industry standard for Rhino, SketchUp, and most 3D software. Your export includes:

- **Buildings**: Extruded to real heights from OpenStreetMap data
- **Roads**: As 3D surfaces with proper widths
- **Water**: Rivers, lakes, and coastlines
- **Terrain**: Ground plane for your site
- **Green areas**: Parks and vegetation zones

## Step-by-Step: ArchiKEK to Rhino

### 1. Generate Your 3D Model
1. Go to archikek.com/create
2. Search for your location
3. Select **3D** export mode
4. Choose your theme (Default, Blueprint, Neon, etc.)
5. Pick **OBJ** format
6. Enable "Include Materials" for colors
7. Click Generate

### 2. Download the ZIP
Your download includes:
- \`archikek_model.obj\` - The 3D geometry
- \`archikek.mtl\` - Material definitions
- \`import_to_rhino.py\` - Automation script
- \`README.txt\` - Instructions

### 3. Import to Rhino

**Option A: Manual Import**
1. Open Rhino
2. File → Import → Select the .obj file
3. Materials load automatically with the MTL file

**Option B: Use the Script**
1. Open Rhino
2. Run the import_to_rhino.py script
3. Everything imports with correct layers and colors

## 10 Material Themes

Choose the right mood for your project:

| Theme | Best For |
|-------|----------|
| Default | Realistic presentations |
| Dark | Dramatic night renders |
| Light | Clean white models |
| Blueprint | Technical drawings |
| Satellite | Earth-tone context |
| Vintage | Warm, retro aesthetic |
| Neon | Futuristic concepts |
| Minimal | Abstract diagrams |
| Autumn | Seasonal warmth |
| Ocean | Coastal projects |

## Tips for Rhino Users

### Scale Correctly
Models export in meters. Use \`Scale\` command if you need different units.

### Organize Layers
The OBJ imports as groups:
- Buildings_Residential
- Buildings_Commercial
- Roads_Primary
- Roads_Residential
- Water
- Green_Park
- Terrain

### Add Your Design
Place your building model at coordinates (0,0) for center of the exported area.

### Render with Materials
The MTL file includes basic colors. For better renders, assign Rhino materials to each layer.

## File Sizes

Typical exports:
- 500m area: ~2-5 MB
- 1000m area: ~5-15 MB
- 2000m area: ~15-40 MB

Dense urban areas = larger files (more buildings).

## Ready to Try?

Generate your first 3D site model in under a minute.

[Create 3D Model →](/create)
    `
  },
  '3d-print-city-model': {
    title: '3D Print Your City: STL Export Guide for Architecture Models',
    description: 'Learn how to export and prepare 3D city models for FDM and SLA printers. Tips for scale and detail.',
    date: '2024-12-11',
    readTime: '8 min read',
    category: '3D Export',
    content: `
## Physical Site Models in the Digital Age

3D printed site models are making a comeback. They're perfect for:
- Client presentations
- Design reviews
- Public exhibitions
- Portfolio photography

ArchiKEK's STL export makes it easy to print any location worldwide.

## Understanding STL Export

STL (Stereolithography) is the standard format for 3D printing. Unlike OBJ, STL:
- Contains only geometry (no materials)
- Uses triangulated mesh
- Requires watertight geometry

ArchiKEK handles all this automatically.

## STL Export Settings

### Raft Thickness
The "raft" is a solid base under your model. Recommended settings:
- **2mm**: Standard desktop prints
- **3mm**: Larger models (>15cm)
- **5mm**: Exhibition models

### Layers to Include
Consider what you need:
- ✅ Buildings: Essential
- ✅ Terrain: Provides base
- ⚡ Roads: Optional (adds detail but print time)
- ⚡ Water: Nice for coastal areas
- ❌ Green: Usually skip (hard to print well)

## Choosing the Right Scale

| Print Size | Area | Scale | Detail Level |
|------------|------|-------|--------------|
| 10×10 cm | 500m | 1:5000 | Low |
| 15×15 cm | 1000m | 1:6600 | Medium |
| 20×20 cm | 1000m | 1:5000 | Good |
| 30×30 cm | 2000m | 1:6600 | High |

## FDM Printing Tips

For standard filament printers (Ender, Prusa, etc.):

### Layer Height
- 0.2mm for speed
- 0.12mm for detail
- 0.08mm for maximum detail

### Infill
- 15-20% is enough for models
- Gyroid or cubic pattern recommended

### Supports
Buildings usually print fine without supports if:
- Layer height ≤ 0.2mm
- Overhang angle < 45°

### Material
- PLA: Easy, good detail
- PETG: Stronger, slight stringing
- White filament: Best for architectural models

## SLA/Resin Printing

For resin printers (Elegoo, Anycubic, Formlabs):

### Advantages
- Amazing detail
- Smooth surfaces
- Perfect for small scales

### Settings
- 50µm layer height for detail
- Standard grey resin
- Careful with supports (can damage buildings)

## Post-Processing

### FDM Models
1. Remove any supports
2. Light sanding (220 grit)
3. Primer spray (grey)
4. Optional: Paint with acrylics

### Resin Models
1. Wash in IPA
2. UV cure
3. Remove supports
4. Light sanding if needed
5. Prime and paint

## Common Issues

### Model Won't Slice
- File too large → reduce area size
- Geometry errors → re-export from ArchiKEK

### Weak Buildings
- Increase wall thickness in slicer
- Print larger scale
- Use resin for tiny details

### Poor Layer Adhesion
- Increase print temperature
- Slower print speed
- Check bed leveling

## Printing Services

Don't have a printer? Use online services:
- **Shapeways**: Professional quality
- **Sculpteo**: Good for architecture
- **Local makerspaces**: Often cheapest

Upload your STL and choose material.

## Project Ideas

### Urban Study Model
Print 2km of a city in sections, assemble for exhibition.

### Site Context
Print 500m around your project site at 1:500.

### Before/After
Print existing + proposed for comparison.

### Cityscape Art
Print in resin, photograph with dramatic lighting.

[Generate STL Export →](/create)
    `
  },
  'blender-glb-site-model': {
    title: 'Import ArchiKEK 3D Models into Blender: GLB Workflow',
    description: 'Step-by-step guide for importing GLB files into Blender. Perfect for rendering and animation.',
    date: '2024-12-10',
    readTime: '5 min read',
    category: '3D Export',
    content: `
## Why GLB for Blender?

GLB (binary glTF) is the web-native 3D format that Blender handles brilliantly:
- Single file (geometry + materials + textures)
- Small file size
- Fast import
- Preserves layer structure

## Importing GLB to Blender

### Basic Import
1. File → Import → glTF 2.0 (.glb/.gltf)
2. Navigate to your ArchiKEK export
3. Click "Import glTF 2.0"

### Import Settings
Keep defaults, but check:
- ☑️ Import Materials
- ☑️ Import Shading

## Working with Imported Models

### Scene Organization
GLB imports as a hierarchy:
\`\`\`
ArchiKEK_Model
├── Buildings
│   ├── Residential
│   ├── Commercial
│   └── Default
├── Roads
├── Water
├── Green
└── Terrain
\`\`\`

### Converting Materials
ArchiKEK exports basic colors. For better renders:

1. Select all buildings
2. Go to Material Properties
3. Add new material or modify existing
4. Adjust roughness/metallic for realism

## Rendering Your Site Model

### Quick Setup
1. Add HDRI for environment lighting
2. Set camera position
3. Enable Cycles or Eevee
4. Render!

### Recommended Settings

**For Previews (Eevee)**
- Ambient Occlusion: On
- Screen Space Reflections: On
- Render samples: 64

**For Finals (Cycles)**
- Render samples: 256-512
- Denoising: On
- Light bounces: 4-8

## Adding Your Design

### Positioning
The model is centered at origin (0,0,0). Your site center.

### Scaling
Model is in meters. No conversion needed in Blender.

### Inserting Buildings
1. Model your design
2. Position at appropriate coordinates
3. Match scale with context

## Animation Ideas

### Camera Flythrough
- Add camera path (Bezier curve)
- Add Follow Path constraint
- Animate!

### Day-Night Cycle
- Animate sun position
- Add HDRI rotation
- Create timelapse effect

### Construction Sequence
- Animate building visibility
- Show "before" context, then "after"

## Exporting from Blender

### For Web (Sketchfab)
File → Export → glTF 2.0
- Format: GLB
- Include: Selected objects if you've added content

### For Video
Render → Render Animation
- Output: MP4 with H.264
- Quality: High or Perceptual Lossless

## Tips & Tricks

### Performance
Large models can be slow. Tips:
- Use viewport simplify
- Hide layers you're not using
- Enable GPU rendering

### Materials by Theme
Match ArchiKEK themes in Blender:
- **Dark theme**: Add emission to buildings
- **Neon**: Use glow effects in compositing
- **Blueprint**: Freestyle lines + blue background

### Photorealism
For realistic renders:
1. Add scatter objects (cars, trees)
2. Use PBR materials
3. Add atmospheric fog
4. Match real sun angle

[Export GLB for Blender →](/create)
    `
  },
  'sketchup-obj-import': {
    title: 'SketchUp OBJ Import: Add Real Context to Your Designs',
    description: 'How to import ArchiKEK OBJ exports into SketchUp with proper materials and layers.',
    date: '2024-12-09',
    readTime: '5 min read',
    category: '3D Export',
    content: `
## SketchUp + ArchiKEK = Perfect Context

SketchUp is great for design. ArchiKEK is great for context. Together, they're unstoppable.

## Importing OBJ to SketchUp

### Step 1: Download from ArchiKEK
1. Go to archikek.com/create
2. Select your site location
3. Choose 3D → OBJ format
4. Enable "Include Materials"
5. Download the ZIP

### Step 2: Import to SketchUp
1. File → Import
2. Change file type to "OBJ Files"
3. Select archikek_model.obj
4. Click Import

### Step 3: Check Import Options
- ☑️ Preserve drawing origin
- ☑️ Merge coplanar faces (optional)

## Working with the Model

### Layers/Tags
Imported geometry comes in groups:
- Buildings_Residential
- Buildings_Commercial
- Roads_Primary
- Water
- Green_Park
- Terrain

Create tags for each group for easy control.

### Materials
The MTL file should load colors automatically. If not:
1. Select geometry
2. Open Materials panel
3. Apply colors manually

### Scale
Models export in meters. SketchUp should handle this, but verify with the tape measure tool.

## Adding Your Design

### Best Workflow
1. Import ArchiKEK model
2. Create new tag for "Proposed"
3. Model your building at site center (0,0)
4. Use context for massing studies

### Tips
- Hide terrain when working at ground level
- Use X-ray mode to see through context
- Create scenes for different views

## Export for Presentation

### Styles
Apply SketchUp styles for different effects:
- "Architectural Design" for clean look
- "Sketchy Edges" for conceptual
- "X-Ray" for transparency studies

### Scenes
Save views as scenes:
- Bird's eye
- Street level
- Aerial approach
- Key viewpoints

### Export
- 2D: File → Export → 2D Graphic
- 3D: File → Export → 3D Model (for rendering in other software)

## Common Issues

### Model Too Slow
- Hide distant buildings
- Reduce shadow quality
- Use smaller export area

### Missing Materials
- Check MTL file is in same folder
- Manually apply colors if needed

### Scale Wrong
- Model menu → Units
- Verify meters are selected

[Create SketchUp-Ready OBJ →](/create)
    `
  },
  '3d-themes-explained': {
    title: '10 3D Themes Explained: From Default to Neon Cyberpunk',
    description: 'Understand each 3D theme and when to use them. Material colors for different presentation styles.',
    date: '2024-12-08',
    readTime: '4 min read',
    category: '3D Export',
    content: `
## Why 3D Themes Matter

The right color scheme sets the tone for your entire presentation. ArchiKEK offers 10 carefully designed 3D themes.

## The 10 Themes

### 1. Default
**Colors**: Natural grays, muted greens, blue water
**Best for**: Standard presentations, realistic context
**Mood**: Professional, neutral

### 2. Dark Mode
**Colors**: Dark background, light buildings, accent colors
**Best for**: Night renders, dramatic presentations
**Mood**: Modern, sophisticated

### 3. Light Mode
**Colors**: White/cream buildings, light roads, pastel accents
**Best for**: Clean presentations, daytime studies
**Mood**: Fresh, minimal

### 4. Blueprint
**Colors**: Navy background, blue/white geometry
**Best for**: Technical presentations, engineering context
**Mood**: Professional, technical

### 5. Satellite
**Colors**: Earth tones, brown/green/blue
**Best for**: Environmental studies, landscape projects
**Mood**: Natural, grounded

### 6. Vintage
**Colors**: Sepia tones, warm browns, muted colors
**Best for**: Historical projects, heritage sites
**Mood**: Nostalgic, warm

### 7. Neon Cyberpunk
**Colors**: Black background, hot pink, cyan, purple
**Best for**: Futuristic concepts, tech projects
**Mood**: Edgy, futuristic

### 8. Minimal
**Colors**: Pure white buildings, black/gray roads
**Best for**: Abstract diagrams, massing studies
**Mood**: Clean, diagrammatic

### 9. Autumn
**Colors**: Orange/brown foliage, warm buildings
**Best for**: Seasonal presentations, cozy projects
**Mood**: Warm, inviting

### 10. Ocean
**Colors**: Blues and teals, coastal palette
**Best for**: Waterfront projects, marine context
**Mood**: Calm, refreshing

## Choosing Your Theme

### By Project Type
| Project | Recommended Theme |
|---------|-------------------|
| Residential | Default, Light |
| Commercial | Dark, Minimal |
| Cultural | Vintage, Blueprint |
| Tech Campus | Neon, Dark |
| Waterfront | Ocean, Light |
| Historic | Vintage, Satellite |

### By Presentation Style
- **Client meeting**: Default, Light
- **Competition**: Neon, Dark (stand out!)
- **Technical review**: Blueprint, Minimal
- **Public exhibition**: Ocean, Autumn (approachable)

## Customizing After Export

All themes export with separate layers. In your 3D software:
1. Select layer
2. Modify material
3. Add textures if desired

The theme is a starting point—make it yours!

[Try All 10 Themes →](/create)
    `
  },
}

  // ============================================
  // NEW SEO-OPTIMIZED BLOG POSTS
  // Target keywords with high search volume
  // ============================================
  
  // TARGET: "site plan generator" - 2,400 monthly searches
  'site-plan-generator-free': {
    title: 'Free Site Plan Generator for Architects [2024 Guide]',
    description: 'Generate professional site plans in seconds. Free online tool with SVG, DXF, and 3D export. No CAD skills required. Perfect for architects and students.',
    date: '2024-12-13',
    readTime: '8 min read',
    category: 'Tool Guide',
    content: \`
## What is a Site Plan Generator?

A site plan generator is an online tool that automatically creates architectural site plans from geographic data. Instead of spending hours tracing building footprints in CAD software, you can generate accurate site plans in seconds.

## Why Architects Need Site Plan Generators

Creating site plans manually is time-consuming:

- **Traditional Method**: Download GIS data → Import to CAD → Trace buildings → Add roads → Style layers → Export (4-8 hours)
- **With ArchiKEK**: Search location → Select theme → Download (30 seconds)

## Features of a Good Site Plan Generator

### Essential Features
- **Accurate Building Footprints**: Real data from OpenStreetMap
- **Road Network**: Classified by type (highway, residential, pedestrian)
- **Green Spaces**: Parks, forests, gardens differentiated
- **Water Bodies**: Rivers, lakes, coastlines
- **Export Formats**: SVG for Illustrator, DXF for AutoCAD

### Advanced Features
- **Topographic Contours**: Real elevation data
- **3D Models**: Export to OBJ, GLB, or STL
- **Multiple Themes**: Figure ground, Nolli, analytical styles
- **Custom Colors**: Full control over appearance

## How to Generate a Site Plan with ArchiKEK

### Step 1: Navigate to Your Site
Open ArchiKEK and search for your project location.

### Step 2: Select Your Area
Choose your area size (250m to 3000m).

### Step 3: Choose a Theme
Select from 34 professional themes.

### Step 4: Export Your Plan
Download in your preferred format: SVG (free), DXF (Pro), or 3D (Pro).

## Site Plan Generator vs Traditional Methods

| Feature | ArchiKEK | QGIS | Manual CAD |
|---------|----------|------|------------|
| Time | 30 seconds | 2-4 hours | 4-8 hours |
| Learning Curve | None | Steep | Moderate |
| Cost | Free/Pro | Free | Software license |

## Frequently Asked Questions

### Is the site plan generator free?
Yes! SVG and PNG exports are completely free. DXF and 3D exports require a Pro subscription ($19/month).

### How accurate is the data?
ArchiKEK uses OpenStreetMap data, which is continuously updated by a global community.

[Generate Your Site Plan →](/create)
    \`
  },

  // TARGET: "CAD map download" - 1,900 monthly searches
  'cad-map-download-dxf': {
    title: 'Download CAD Maps (DXF) for Any Location [Free Tool]',
    description: 'Download DXF CAD maps with building footprints, roads, and contours. AutoCAD and Rhino ready. Organized layers included.',
    date: '2024-12-13',
    readTime: '6 min read',
    category: 'Tutorial',
    content: \`
## Download CAD Maps in DXF Format

Need a CAD-ready map for your architecture project? ArchiKEK lets you download professional DXF files with organized layers for any location worldwide.

## What's Included in the DXF Download

### Layer Structure
Your DXF export includes 15+ organized layers:

**Buildings**
- BUILDINGS_RESIDENTIAL
- BUILDINGS_COMMERCIAL
- BUILDINGS_PUBLIC

**Roads**
- ROADS_HIGHWAY
- ROADS_PRIMARY
- ROADS_RESIDENTIAL

**Environment**
- WATER
- GREEN_PARKS
- CONTOURS

## How to Download CAD Maps

1. **Select Location**: Navigate to your project site
2. **Select DXF Format**: Choose DXF from the format dropdown
3. **Generate**: Click "Generate DXF"
4. **Download**: File downloads automatically

## Compatibility

| Software | Compatibility |
|----------|--------------|
| AutoCAD | ✓ Native |
| Rhino | ✓ Native |
| SketchUp | ✓ Import |
| BricsCAD | ✓ Native |

## Pricing

DXF export is a Pro feature at $19/month.

[Export DXF Map →](/create)
    \`
  },

  // TARGET: "3D city model" - 3,600 monthly searches
  '3d-city-model-generator': {
    title: '3D City Model Generator: Create Urban Models Instantly',
    description: 'Generate 3D city models with real terrain and buildings. Export to OBJ, GLB, or STL for Blender, SketchUp, or 3D printing.',
    date: '2024-12-13',
    readTime: '7 min read',
    category: 'Tool Guide',
    content: \`
## Generate 3D City Models in Seconds

Creating 3D urban context models used to require hours of manual work. With ArchiKEK, you can generate detailed 3D city models with real terrain elevation and building footprints instantly.

## What's Included in 3D Models

### Terrain
- Real elevation data from global DEMs
- Accurate topography with hills and valleys

### Buildings
- Footprints from OpenStreetMap
- Heights from OSM data where available
- Estimated heights by building type

### Infrastructure
- Road surfaces with proper widths
- Water bodies (rivers, lakes)
- Green areas (parks, forests)

## Export Formats

### OBJ (Wavefront)
Best for: Blender, 3ds Max, Cinema 4D

### GLB (Binary glTF)
Best for: Web, AR/VR, modern workflows

### STL (Stereolithography)
Best for: 3D printing

## How to Generate 3D City Models

1. **Select Your Area** (up to 2km × 2km)
2. **Switch to 3D Mode**
3. **Choose Theme Colors**
4. **Preview & Export**

## Use Cases

- Architecture Visualization
- Urban Planning
- 3D Printing
- Game Development
- AR/VR

[Create 3D Model →](/create)
    \`
  },

  // TARGET: "urban map SVG" - 720 monthly searches
  'urban-map-svg-download': {
    title: 'Download Urban Maps as SVG: Vector City Maps for Design',
    description: 'Download urban maps as SVG vectors. Perfect for Illustrator, Figma, and web design. Organized layers, scalable quality.',
    date: '2024-12-13',
    readTime: '5 min read',
    category: 'Tutorial',
    content: \`
## Vector Urban Maps for Designers

SVG (Scalable Vector Graphics) is the ideal format for urban maps in design work. Unlike raster images, SVG maps can be scaled infinitely without losing quality.

## Why SVG for Urban Maps?

### Advantages
- **Infinite Scalability**: Print at any size
- **Editable**: Modify colors, shapes, styles
- **Small File Size**: Efficient for web
- **Layer Support**: Organized groups

## Layer Structure

ArchiKEK SVGs include organized Inkscape-compatible layers:
- Background
- Contours
- Water
- Green Areas (Forest, Park, Sports, Grass)
- Roads (Highway, Primary, Residential)
- Buildings (by category)
- Transit
- Frame

## 34 Theme Options

- **Classic**: Minimal, Figure Ground, Nolli
- **Modern**: Midnight, Neon, Blueprint
- **Natural**: Forest, Ocean, Desert

## Free SVG Downloads

SVG exports are **completely free** with ArchiKEK.

[Download SVG Map →](/create)
    \`
  },

  // TARGET: "architecture site plan" - 1,300 monthly searches
  'architecture-site-plan-guide': {
    title: 'Architecture Site Plan: Complete Guide + Free Generator',
    description: 'Learn how to create professional architecture site plans. Free online tool generates site plans with buildings, roads, and topography.',
    date: '2024-12-13',
    readTime: '10 min read',
    category: 'Guide',
    content: \`
## What is an Architecture Site Plan?

An architecture site plan is a scaled drawing showing the horizontal arrangement of a building project and its surrounding context.

## Essential Elements

### 1. Site Boundary
Clear demarcation of project limits.

### 2. Building Footprints
Representation of all structures.

### 3. Access and Circulation
Movement patterns including roads, pedestrian paths.

### 4. Landscape Elements
Natural and designed features.

### 5. Topography
Ground level information with contour lines.

## Site Plan Scales

| Scale | Use Case |
|-------|----------|
| 1:100 | Detailed design |
| 1:500 | Planning applications |
| 1:1000 | Context plan |

## Generate Your Site Plan

Start with an accurate base map from ArchiKEK:

1. **Generate base map** with buildings and roads
2. **Export to SVG** or DXF
3. **Add your design** on top
4. **Style and annotate**

[Create Site Plan →](/create)
    \`
  },

  // TARGET: "DXF map export" - 480 monthly searches
  'dxf-map-export-autocad': {
    title: 'DXF Map Export: Get AutoCAD-Ready Maps Instantly',
    description: 'Export maps to DXF format for AutoCAD, Rhino, and other CAD software. Organized layers, real-world scale.',
    date: '2024-12-13',
    readTime: '5 min read',
    category: 'Tutorial',
    content: \`
## Export Maps to DXF for CAD Software

DXF (Drawing Exchange Format) is the universal format for CAD data exchange. ArchiKEK exports professional DXF files with organized layers.

## DXF Export Features

### Organized Layers
15+ pre-organized layers with AutoCAD-standard naming.

### Real-World Scale
1:1 scale in meters, accurate dimensions.

### Building Data
2.5D extrusion capability with height from OSM.

## Layer Structure

- BUILDINGS (by category)
- ROADS (by type)
- WATER
- GREEN_PARKS
- CONTOURS

## Export Process

1. Create Your Map
2. Select DXF Format
3. Generate
4. Download

[Export DXF Map →](/create)
    \`
  },

  // TARGET: "topographic map maker" - 1,600 monthly searches
  'topographic-map-maker-online': {
    title: 'Topographic Map Maker: Create Contour Maps Online',
    description: 'Generate topographic maps with contour lines online. Real elevation data, customizable intervals.',
    date: '2024-12-13',
    readTime: '6 min read',
    category: 'Tool Guide',
    content: \`
## Create Topographic Maps Online

Topographic maps show terrain elevation through contour lines. ArchiKEK generates topographic maps using real elevation data.

## Contour Map Features

### Real Elevation Data
- Global DEM coverage
- ~30m resolution

### Customizable Intervals
- 1m for flat terrain
- 5m default
- 10m+ for mountains

### Visual Differentiation
- Major contours: Bold, labeled
- Minor contours: Light, unlabeled

## Contour Interval Guide

| Terrain Type | Recommended Interval |
|--------------|---------------------|
| Flat coastal | 1-2m |
| Urban areas | 2-5m |
| Rolling hills | 5-10m |
| Mountains | 10-20m |

## Use Cases

- Site grading analysis
- Foundation planning
- Stormwater design
- Flood risk assessment

[Create Topographic Map →](/create)
    \`
  },

  // TARGET: "OpenStreetMap architecture" - 800 monthly searches
  'openstreetmap-architecture-maps': {
    title: 'How to Use OpenStreetMap Data for Architecture Projects',
    description: 'Extract and use OpenStreetMap data for architecture site analysis. Get building footprints, roads, and terrain.',
    date: '2024-12-13',
    readTime: '8 min read',
    category: 'Guide',
    content: \`
## OpenStreetMap for Architects

OpenStreetMap (OSM) is a free, collaborative map of the world with:
- Building footprints
- Road networks
- Land use data
- Natural features

## Why Use OpenStreetMap?

- **Free**: No licensing fees
- **Global**: Coverage worldwide
- **Current**: Continuously updated
- **Detailed**: Building-level accuracy

## OSM Data Quality

### Well-Mapped Areas
- Major cities worldwide
- Europe (excellent)
- North America (very good)

### Variable Coverage
- Rural areas
- New construction

## Easy Way: ArchiKEK

ArchiKEK automates the entire process:

1. **Search** for your location
2. **Preview** the map
3. **Download** in your format

[Generate OSM Map →](/create)
    \`
  },

  // TARGET: "free architecture tools" - 900 monthly searches  
  'free-architecture-tools-2024': {
    title: 'Best Free Architecture Tools in 2024: Complete List',
    description: 'Discover the best free tools for architecture students and professionals. CAD, rendering, site analysis, and more.',
    date: '2024-12-13',
    readTime: '12 min read',
    category: 'Resource',
    content: \`
## Free Tools Every Architect Needs

### Site Analysis & Mapping
- **ArchiKEK**: Site plans, figure ground maps (archikek.com)
- **QGIS**: Advanced GIS analysis (qgis.org)
- **Google Earth Pro**: Satellite imagery (free since 2015)

### 3D Modeling
- **Blender**: Full 3D modeling, rendering (blender.org)
- **SketchUp Free**: Web-based 3D (app.sketchup.com)
- **FreeCAD**: Parametric modeling (freecad.org)

### 2D CAD & Drafting
- **LibreCAD**: 2D drafting (librecad.org)
- **NanoCAD Free**: AutoCAD alternative (nanocad.com)

### Vector Graphics
- **Inkscape**: SVG editing (inkscape.org)
- **Figma**: Collaborative design (figma.com)

### Image Editing
- **GIMP**: Photo editing (gimp.org)
- **Photopea**: Browser-based (photopea.com)

## Comparison Table

| Category | Best Free Tool | Paid Alternative |
|----------|---------------|------------------|
| Site Plans | ArchiKEK | CADMapper |
| 3D Modeling | Blender | 3ds Max |
| 2D CAD | LibreCAD | AutoCAD |
| Vectors | Inkscape | Illustrator |

[Start with Site Analysis →](/create)
    \`
  },

  // TARGET: "figure ground map" - 1,100 monthly searches
  'figure-ground-map-urban-design': {
    title: 'Figure Ground Map: Urban Design Analysis Technique',
    description: 'Learn about figure ground maps in urban design. History, technique, and how to create them.',
    date: '2024-12-13',
    readTime: '9 min read',
    category: 'Guide',
    content: \`
## Understanding Figure Ground Maps

The figure ground map is one of the most powerful tools in urban design analysis. Buildings are shown as solid shapes (figure) against a blank background (ground).

## What is a Figure Ground Map?

A binary representation that reveals:
- Urban fabric density
- Building patterns
- Public vs private space
- Street and block structure

## History

### Origins
The technique dates to 1748 when Giambattista Nolli created his famous map of Rome.

### Modern Development
In the 1960s-70s, Colin Rowe and Fred Koetter developed figure ground analysis in "Collage City" (1978).

## Reading Figure Ground Maps

### Density Patterns
- **Dense fabric**: Historic cores
- **Open fabric**: Suburban areas

### Building Types
- Perimeter blocks
- Towers
- Row houses

## Creating Figure Ground Maps

### With ArchiKEK (30 seconds)
1. Navigate to your location
2. Select "Figure Ground" theme
3. Download SVG or DXF

[Create Figure Ground Map →](/create)
    \`
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
            <Image src="/logo.png" alt="ArchiKEK" width={32} height={32} className="rounded-lg" />
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
