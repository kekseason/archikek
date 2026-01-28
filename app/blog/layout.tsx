import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Architecture Blog - Site Analysis Guides & Tutorials | ArchiKEK',
    template: '%s | ArchiKEK Blog'
  },
  description: 'Learn architecture site analysis, figure ground diagrams, urban planning maps. Free tutorials for Rhino, SketchUp, AutoCAD, Illustrator. Create professional presentations.',
  keywords: [
    'site analysis tutorial',
    'figure ground diagram',
    'urban planning map',
    'architecture presentation',
    'site plan generator',
    'Rhino site model',
    'SketchUp context',
    'AutoCAD site plan',
    'SVG map architecture',
    'OpenStreetMap architecture'
  ],
  openGraph: {
    title: 'Architecture Blog - Site Analysis Guides | ArchiKEK',
    description: 'Free tutorials for architecture site analysis, figure ground diagrams, and urban planning maps.',
    url: 'https://archikek.com/blog',
    siteName: 'ArchiKEK',
    type: 'website',
    images: [
      {
        url: 'https://archikek.com/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'ArchiKEK Architecture Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architecture Blog | ArchiKEK',
    description: 'Site analysis tutorials, figure ground guides, and urban planning tips.',
  },
  alternates: {
    canonical: 'https://archikek.com/blog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "ArchiKEK Architecture Blog",
            "description": "Tutorials and guides for architecture site analysis, figure ground maps, and urban planning.",
            "url": "https://archikek.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "ArchiKEK",
              "url": "https://archikek.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://archikek.com/logo.png"
              }
            }
          })
        }}
      />
      {children}
    </>
  )
}
