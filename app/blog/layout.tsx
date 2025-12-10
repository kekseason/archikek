import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Architecture tutorials, site analysis guides, and tips for architects and urban planners. Learn to create better maps and presentations.',
  openGraph: {
    title: 'Blog | ArchiKEK',
    description: 'Tutorials and guides for architecture site analysis, figure ground maps, and urban planning.',
    url: 'https://archikek.com/blog',
  },
  alternates: {
    canonical: 'https://archikek.com/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
