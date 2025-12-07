import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    default: 'ArchiKEK - Site Analysis Maps in Seconds',
    template: '%s | ArchiKEK'
  },
  description: 'Generate professional figure ground, nolli, and site analysis maps instantly. Export to SVG with organized layers for Illustrator. No GIS skills needed. Free for architecture students.',
  keywords: [
    'site analysis', 'figure ground map', 'nolli map', 'architecture', 'urban planning',
    'map generator', 'SVG export', 'DXF export', 'Illustrator', 'AutoCAD',
    'architecture student', 'site plan', 'urban analysis', 'QGIS alternative',
    'topography map', 'building footprint', 'city map generator'
  ],
  authors: [{ name: 'ArchiKEK' }],
  creator: 'ArchiKEK',
  publisher: 'ArchiKEK',
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
    description: 'Generate professional figure ground and nolli maps for architecture projects. Free SVG export with organized layers.',
    type: 'website',
    url: 'https://archikek.com',
    siteName: 'ArchiKEK',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArchiKEK - Site Analysis Maps in Seconds',
    description: 'Generate professional site analysis maps for architecture projects.',
    creator: '@archikek',
  },
  alternates: {
    canonical: 'https://archikek.com',
  },
  verification: {
    google: 'your-google-verification-code', // Google Search Console'dan al
  },
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
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
