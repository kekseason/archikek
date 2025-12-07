'use client'

import Link from 'next/link'
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
  },
  {
    slug: 'what-is-nolli-map',
    title: 'What is a Nolli Map? Complete Guide for Architects',
    description: 'Discover the history of Nolli maps, why they matter in urban analysis, and how to create one for your next project.',
    date: '2024-12-07',
    readTime: '7 min read',
    category: 'Guide',
    featured: true,
  },
  {
    slug: 'site-analysis-architecture-students',
    title: 'Site Analysis 101: A Complete Guide for Architecture Students',
    description: 'Everything you need to know about site analysis - from data collection to presentation. Perfect for studio projects.',
    date: '2024-12-06',
    readTime: '10 min read',
    category: 'Guide',
    featured: true,
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
    title: '13 Map Themes for Different Site Analysis Types',
    description: 'Explore different map styles - from minimal figure ground to detailed blueprint - and when to use each one.',
    date: '2024-12-03',
    readTime: '5 min read',
    category: 'Guide',
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
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">A</span>
            </div>
            <span className="text-white font-semibold">ArchiKEK</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/blog" className="text-amber-500 text-sm">Blog</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition">Pricing</Link>
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

      {/* Featured Posts */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-sm uppercase tracking-widest text-amber-500 mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group bg-[#111] border border-[#222] rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300"
              >
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
              </Link>
            ))}
          </div>
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
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-gray-500">
          <span>© 2024 ArchiKEK</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/create" className="hover:text-white transition">Create</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
