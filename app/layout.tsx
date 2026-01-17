import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    default: 'ArchiKEK - Site Plan Generator | Free SVG & DXF Maps for Architects',
    template: '%s | ArchiKEK'
  },
  description: 'Generate site plans, figure ground maps, and 3D city models instantly. Free SVG export, DXF for AutoCAD, 3DM for Rhino, DAE for SketchUp. 34 themes, real terrain data. Best free Cadmapper alternative.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    // Primary keywords (high volume)
    'site plan generator', 'CAD map download', '3D city model', 'figure ground map',
    'architecture site plan', 'DXF map export', 'topographic map maker',
    // Competitor keywords
    'cadmapper alternative', 'cadmapper free', 'free cadmapper alternative',
    'snazzy maps alternative', 'better than cadmapper',
    // Secondary keywords
    'urban map SVG', 'building footprint map', 'city map generator',
    'AutoCAD site plan', 'Rhino 3DM map', 'architecture map',
    // Long-tail keywords
    'free architecture tools', 'site analysis map generator', 'OpenStreetMap architecture',
    'SVG map download', 'vector city map', 'urban design map',
    'contour map generator', 'elevation map maker', '3D terrain model',
    // Tool-specific (updated with 3DM/DAE)
    'Illustrator site plan', 'Figma city map', 'SketchUp DAE import',
    'Blender city model', 'Rhino 3DM city model', '3D printing city',
    'STL city model', 'GLB 3D model', 'Collada DAE architecture',
    // Use case keywords
    'architecture student tools', 'urban planning map', 'competition site plan',
    'portfolio site analysis', 'nolli map generator', 'context map architecture'
  ],
  authors: [{ name: 'ArchiKEK', url: 'https://archikek.com' }],
  creator: 'ArchiKEK',
  publisher: 'ArchiKEK',
  metadataBase: new URL('https://archikek.com'),
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
  openGraph: {
    title: 'ArchiKEK - Site Plan Generator | Free Maps for Architects',
    description: 'Generate site plans, figure ground maps, and 3D city models in seconds. Free SVG export. DXF for AutoCAD. 3D for Blender & 3D printing.',
    type: 'website',
    url: 'https://archikek.com',
    siteName: 'ArchiKEK',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ArchiKEK - Generate Site Plans and 3D City Models',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArchiKEK - Site Plan Generator | Free Maps for Architects',
    description: 'Generate site plans and 3D city models in seconds. Free SVG export.',
    creator: '@archikek',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://archikek.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
  other: {
    'apple-mobile-web-app-title': 'ArchiKEK',
  },
}

// Enhanced JSON-LD Structured Data
const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ArchiKEK',
  url: 'https://archikek.com',
  description: 'Site plan generator for architects. Create maps and 3D models from any location.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://archikek.com/create?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
}

const jsonLdSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ArchiKEK',
  applicationCategory: 'DesignApplication',
  applicationSubCategory: 'Architecture Software',
  operatingSystem: 'Web Browser',
  description: 'Generate professional site plans, figure ground maps, and 3D city models instantly. Export to SVG, DXF, 3DM, DAE, GLB, and STL formats.',
  url: 'https://archikek.com',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Plan',
      price: '0',
      priceCurrency: 'USD',
      description: 'Unlimited SVG and PNG exports',
    },
    {
      '@type': 'Offer',
      name: 'Pro Plan',
      price: '19',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      description: 'DXF export, 3D models (3DM, DAE, GLB, STL), commercial license',
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '247',
    bestRating: '5',
    worstRating: '1'
  },
  author: {
    '@type': 'Organization',
    name: 'ArchiKEK',
    url: 'https://archikek.com',
  },
  screenshot: 'https://archikek.com/og-image.png',
  featureList: [
    'Site plan generation from any location',
    'Figure ground map creation',
    '3D city model export',
    '34 professional themes',
    'SVG export with organized layers',
    'DXF export for AutoCAD and Rhino',
    '3DM native Rhino format',
    'DAE Collada for SketchUp',
    'GLB for Blender and web',
    'STL for 3D printing',
    'Real terrain elevation data',
    'Topographic contour lines',
    'Building classification by type',
    'Road network with proper widths',
    'Transit stops overlay'
  ],
  softwareRequirements: 'Modern web browser',
  releaseNotes: 'Version 8.0 - Native 3DM/DAE export, 34 themes, improved 3D rendering'
}

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ArchiKEK',
  url: 'https://archikek.com',
  logo: 'https://archikek.com/logo.png',
  sameAs: [
    'https://twitter.com/archikek',
    'https://instagram.com/archikek'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://archikek.com/contact'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="p:domain_verify" content="bc7f55ef554f9c7a4bf953c81cc5dec9"/>
      </head>
      <body className="antialiased">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZZ7S8086G0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZZ7S8086G0', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        
        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('D4RI2DRC77UET7S4GB5G');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
        
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uijjyqvlsq");
          `}
        </Script>
        
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
