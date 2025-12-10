import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    default: 'ArchiKEK - Site Analysis Maps in Seconds',
    template: '%s | ArchiKEK'
  },
  description: 'Generate professional figure ground, nolli, and site analysis maps instantly. Export to SVG and DXF with organized layers for Illustrator and AutoCAD. No GIS skills needed. Free for architecture students.',
  keywords: [
    'site analysis', 'figure ground map', 'nolli map', 'architecture', 'urban planning',
    'map generator', 'SVG export', 'DXF export', 'Illustrator', 'AutoCAD',
    'architecture student', 'site plan', 'urban analysis', 'QGIS alternative',
    'topography map', 'building footprint', 'city map generator', 'urban morphology',
    'site context map', 'rhino grasshopper', 'revit site', 'architecture portfolio',
    'free architecture tools', 'openstreetmap architecture'
  ],
  authors: [{ name: 'ArchiKEK' }],
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
    title: 'ArchiKEK - Site Analysis Maps in Seconds',
    description: 'Generate professional figure ground and nolli maps for architecture projects. Free SVG & DXF export with organized layers.',
    type: 'website',
    url: 'https://archikek.com',
    siteName: 'ArchiKEK',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ArchiKEK - Site Analysis Maps for Architects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArchiKEK - Site Analysis Maps in Seconds',
    description: 'Generate professional site analysis maps for architecture projects.',
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
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ArchiKEK',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web',
  description: 'Generate professional figure ground and site analysis maps for architecture projects. Export to SVG and DXF with organized layers.',
  url: 'https://archikek.com',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier available with 1 credit',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '120',
  },
  author: {
    '@type': 'Organization',
    name: 'ArchiKEK',
    url: 'https://archikek.com',
  },
  screenshot: 'https://archikek.com/og-image.png',
  featureList: [
    'Figure ground map generation',
    'Nolli map generation',
    '24 professional themes',
    'SVG export with layers',
    'DXF export for AutoCAD',
    'Transit and topography overlays',
  ],
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
        <link rel="icon" href="/favicon.ico" />
        <meta name="p:domain_verify" content="bc7f55ef554f9c7a4bf953c81cc5dec9"/>
      </head>
      <body className="antialiased">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
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
