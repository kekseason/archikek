'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Blog post data
const blogPosts = [
  {
    slug: 'how-to-create-figure-ground-map',
    title: 'How to Create a Figure Ground Map in 5 Minutes',
    description: 'Learn the fastest way to generate professional figure ground maps for your architecture projects without any GIS knowledge.',
    date: '2024-12-08',
    readTime: '5 min read',
    category: 'Tutorial',
    featured: true,
    image: '/examples/technical.png',
  },
  {
    slug: 'what-is-nolli-map',
    title: 'What is a Nolli Map? Complete Guide for Architects',
    description: 'Discover the history of Nolli maps, why they matter in urban analysis, and how to create one for your next project.',
    date: '2024-12-07',
    readTime: '7 min read',
    category: 'Guide',
    featured: true,
    image: '/examples/barcelona.png',
  },
  {
    slug: 'barcelona-eixample-urban-analysis',
    title: "Barcelona's Eixample: A Perfect Grid for Urban Analysis",
    description: "Explore how Ildefons Cerdà's revolutionary grid design makes Barcelona ideal for site analysis studies.",
    date: '2024-12-09',
    readTime: '8 min read',
    category: 'Case Study',
    featured: true,
    image: '/examples/warm-sunset.png',
  },
  {
    slug: 'site-analysis-architecture-students',
    title: 'Site Analysis 101: A Complete Guide for Architecture Students',
    description: 'Everything you need to know about site analysis - from data collection to presentation. Perfect for studio projects.',
    date: '2024-12-06',
    readTime: '10 min read',
    category: 'Guide',
    featured: false,
  },
  {
    slug: 'qgis-vs-archikek',
    title: 'QGIS vs ArchiKEK: Which is Better for Quick Site Analysis?',
    description: 'A honest comparison of traditional GIS software vs modern web tools for architecture site analysis.',
    date: '2024-12-05',
    readTime: '6 min read',
    category: 'Comparison',
    featured: false,
  },
  {
    slug: 'export-maps-to-illustrator',
    title: 'How to Export Site Analysis Maps to Adobe Illustrator',
    description: 'Step-by-step guide to exporting and editing your site analysis maps in Illustrator with organized layers.',
    date: '2024-12-04',
    readTime: '4 min read',
    category: 'Tutorial',
    featured: false,
  },
  {
    slug: 'best-themes-site-analysis',
    title: '24 Map Themes for Different Site Analysis Types',
    description: 'Explore different map styles - from minimal figure ground to detailed blueprint - and when to use each one.',
    date: '2024-12-03',
    readTime: '5 min read',
    category: 'Guide',
    featured: false,
  },
  {
    slug: 'urban-morphology-explained',
    title: 'Urban Morphology: Reading Cities Through Their Shapes',
    description: 'Understanding how cities evolve through their physical form. A primer for architecture students.',
    date: '2024-12-02',
    readTime: '9 min read',
    category: 'Theory',
    featured: false,
  },
  {
    slug: 'color-theory-architecture-maps',
    title: 'Color Theory for Architecture Maps: Choosing the Right Palette',
    description: 'Why some map colors work better than others. Learn to pick themes that enhance your presentations.',
    date: '2024-12-01',
    readTime: '6 min read',
    category: 'Design',
    featured: false,
  },
]

export default function BlogPage() {
  const router = useRouter()
  const featuredPosts = blogPosts.filter(post => post.featured)
  const recentPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ArchiKEK" width={32} height={32} className="rounded-lg" />
            <span className="text-white font-semibold">ArchiKEK</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/blog" className="text-amber-500 text-sm">Blog</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition">Pricing</Link>
            <a 
              href="https://instagram.com/archikekapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <Link href="/create" className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-sm font-medium transition">
              Create Map
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ArchiKEK Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Tutorials, guides, and tips for architects and urban planners. Learn how to create better site analysis maps.
          </p>
        </div>
      </section>

      {/* Featured Posts with Images */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-sm uppercase tracking-widest text-amber-500 mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group bg-[#111] border border-[#222] rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300"
              >
                {post.image && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-1 rounded">{post.category}</span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-500 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {post.description}
                  </p>
                  <div className="mt-4 text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Banner */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          <a 
            href="https://instagram.com/archikekapp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-pink-500/20 rounded-xl hover:border-pink-500/40 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Follow @archikekapp</p>
                <p className="text-gray-400 text-sm">Daily architecture maps & design inspiration</p>
              </div>
            </div>
            <span className="text-pink-400 text-sm font-medium hidden md:block">View on Instagram →</span>
          </a>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-12 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8">More Articles</h2>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-6 p-4 -mx-4 rounded-lg hover:bg-[#111] transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-amber-500">{post.category}</span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-white font-medium group-hover:text-amber-500 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {post.description}
                  </p>
                </div>
                <div className="text-xs text-gray-600 whitespace-nowrap">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to create your site analysis?</h2>
          <p className="text-gray-400 mb-8">Generate professional maps in seconds, not hours.</p>
          <Link 
            href="/create"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-black px-8 py-3 rounded-lg font-medium transition"
          >
            Start Creating — Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2024 ArchiKEK</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/create" className="hover:text-white transition">Create</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <a 
              href="https://instagram.com/archikekapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
