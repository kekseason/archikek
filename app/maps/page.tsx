// app/maps/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { CITIES, getCitiesByCountry } from '@/lib/cities'

export const metadata: Metadata = {
  title: 'City Maps & Site Plans | 100+ Cities Worldwide | ArchiKEK',
  description: 'Generate professional site plans, figure ground maps, and urban analysis diagrams for 100+ cities worldwide. Barcelona, Paris, New York, Tokyo, and more. Free online tool for architects.',
  keywords: [
    'city maps',
    'site plan generator',
    'figure ground map',
    'urban map',
    'architecture map',
    'world cities map',
  ],
  openGraph: {
    title: 'City Maps & Site Plans | ArchiKEK',
    description: 'Generate site plans for 100+ cities worldwide',
    url: 'https://archikek.com/maps',
  },
  alternates: {
    canonical: 'https://archikek.com/maps',
  },
}

export default function MapsPage() {
  const citiesByCountry = getCitiesByCountry()
  const countries = Object.keys(citiesByCountry).sort()

  // Featured cities
  const featuredSlugs = ['barcelona', 'new-york', 'tokyo', 'paris', 'istanbul', 'singapore']
  const featuredCities = CITIES.filter(c => featuredSlugs.includes(c.slug))

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
            <Link href="/maps" className="text-amber-500 text-sm">Maps</Link>
            <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition">Blog</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition">Pricing</Link>
            <Link href="/create" className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-sm font-medium transition">
              Create Map
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Site Plans for<br />
          <span className="text-amber-500">{CITIES.length}+ Cities Worldwide</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Generate professional figure ground maps, urban analysis diagrams, and 3D city models 
          for any location. Click a city to start.
        </p>
        <Link
          href="/create"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-xl font-semibold transition"
        >
          Or Search Any Location →
        </Link>
      </section>

      {/* Featured Cities */}
      <section className="max-w-6xl mx-auto px-6 py-8 border-t border-[#1a1a1a]">
        <h2 className="text-sm uppercase tracking-widest text-amber-500 mb-6">Featured Cities</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCities.map((city) => (
            <Link
              key={city.slug}
              href={`/maps/${city.slug}`}
              className="group bg-[#111] border border-[#222] rounded-xl p-6 hover:border-amber-500/50 transition text-center"
            >
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="text-lg font-semibold text-white group-hover:text-amber-500 transition">
                {city.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{city.country}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* All Cities by Country */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-[#1a1a1a]">
        <h2 className="text-2xl font-bold text-white mb-8">All Cities by Country</h2>
        
        <div className="space-y-8">
          {countries.map((country) => (
            <div key={country}>
              <h3 className="text-lg font-semibold text-amber-500 mb-4 flex items-center gap-2">
                <span>{country}</span>
                <span className="text-xs text-gray-500 font-normal">
                  ({citiesByCountry[country].length} {citiesByCountry[country].length === 1 ? 'city' : 'cities'})
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {citiesByCountry[country].map((city) => (
                  <Link
                    key={city.slug}
                    href={`/maps/${city.slug}`}
                    className="bg-[#111] border border-[#222] hover:border-amber-500/50 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[#1a1a1a] text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Don't see your city?
        </h2>
        <p className="text-gray-400 mb-8">
          ArchiKEK works for any location worldwide. Just search and create.
        </p>
        <Link
          href="/create"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-black px-10 py-4 rounded-xl font-semibold text-lg transition"
        >
          Search Any Location
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2025 ArchiKEK. Map data © OpenStreetMap contributors.</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/maps" className="hover:text-white transition">Maps</Link>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
