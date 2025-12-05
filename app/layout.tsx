import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ArchiKEK - Site Analysis Maps in Seconds',
  description: 'Generate professional, Illustrator-ready site analysis maps for architecture projects. 12 themes, SVG export, global coverage.',
  keywords: 'site analysis, architecture, urban planning, map generator, SVG, Illustrator, figure ground, nolli map',
  openGraph: {
    title: 'ArchiKEK - Site Analysis Maps in Seconds',
    description: 'Generate professional site analysis maps for architecture projects.',
    type: 'website',
    url: 'https://archikek.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArchiKEK - Site Analysis Maps in Seconds',
    description: 'Generate professional site analysis maps for architecture projects.',
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
        {children}
      </body>
    </html>
  )
}
