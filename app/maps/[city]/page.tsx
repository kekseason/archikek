// app/maps/[city]/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCityBySlug, getAllCitySlugs, CITIES, type City } from '@/lib/cities'

// Static params generation - tüm şehirler için sayfa oluştur
export async function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({
    city: city,
  }))
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const city = getCityBySlug(params.city)
  
  if (!city) {
    return {
      title: 'City Not Found | ArchiKEK',
    }
  }

  const title = `${city.name} Site Plan & Figure Ground Map Generator | ArchiKEK`
  const description = `Create professional site plans, figure ground maps, and urban analysis maps of ${city.name}, ${city.country}. ${city.description}. Export to SVG, DXF, PNG. Free online tool.`

  return {
    title,
    description,
    keywords: [
      `${city.name} site plan`,
      `${city.name} figure ground map`,
      `${city.name} urban map`,
      `${city.name} city map`,
      `${city.name} architecture map`,
      `${city.name.toLowerCase()} map generator`,
      ...city.keywords,
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://archikek.com/maps/${city.slug}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${city.name} Site Plan Map`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://archikek.com/maps/${city.slug}`,
    },
  }
}

// Related cities - aynı ülke veya random
function getRelatedCities(currentCity: City, count: number = 6): City[] {
  // Önce aynı ülkeden
  const sameCountry = CITIES.filter(c => c.country === currentCity.country && c.slug !== currentCity.slug)
  
  // Yetmezse diğerlerinden ekle
  const others = CITIES.filter(c => c.country !== currentCity.country && c.slug !== currentCity.slug)
    .sort(() => 0.5 - Math.random())
  
  return [...sameCountry, ...others].slice(0, count)
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city)

  if (!city) {
    notFound()
  }

  const relatedCities = getRelatedCities(city)

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${city.name} Site Plan Generator`,
    description: `Create site plans and urban maps of ${city.name}`,
    url: `https://archikek.com/maps/${city.slug}`,
    mainEntity: {
      '@type': 'Place',
      name: city.name,
      address: {
        '@type': 'PostalAddress',
        addressCountry: city.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.lat,
        longitude: city.lng,
      },
    },
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Header */}
        <header className="border-b border-[#1a1a1a]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="ArchiKEK" width={32} height={32} className="rounded-lg" />
              <span className="text-white font-semibold">ArchiKEK</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/maps" className="text-gray-400 hover:text-white text-sm transition">Maps</Link>
              <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition">Blog</Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition">Pricing</Link>
              <Link 
                href={`/create?lat=${city.lat}&lng=${city.lng}&name=${encodeURIComponent(city.name)}`}
                className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Create Map
              </Link>
            </nav>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-amber-500 transition">Home</Link>
            <span>/</span>
            <Link href="/maps" className="hover:text-amber-500 transition">Maps</Link>
            <span>/</span>
            <span className="text-gray-300">{city.name}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-amber-500 text-sm font-medium">{city.country}</span>
                {city.famous_for && (
                  <>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400 text-sm">{city.famous_for}</span>
                  </>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {city.name} Site Plan<br />
                <span className="text-amber-500">Map Generator</span>
              </h1>

              <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                {city.description}
              </p>

              <p className="text-gray-500 mb-8">
                Create professional figure ground maps, urban analysis diagrams, and site plans 
                of {city.name} in seconds. Export to SVG for Illustrator, DXF for AutoCAD, 
                or PNG for presentations.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href={`/create?lat=${city.lat}&lng=${city.lng}&name=${encodeURIComponent(city.name)}`}
                  className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Create {city.name} Map
                </Link>
                <Link
                  href="/create"
                  className="border border-[#333] hover:border-amber-500/50 text-white px-8 py-4 rounded-xl font-medium transition"
                >
                  Explore All Locations
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-8 text-sm">
                <div>
                  <div className="text-2xl font-bold text-white">34</div>
                  <div className="text-gray-500">Map Themes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">2D + 3D</div>
                  <div className="text-gray-500">Export Options</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-gray-500">PNG Export</div>
                </div>
              </div>
            </div>

            {/* Right: Map Preview Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-[#111] border border-[#222] rounded-2xl overflow-hidden relative">
                {/* Placeholder pattern - gerçek harita preview'ı eklenebilir */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    {/* Abstract city blocks */}
                    {[...Array(12)].map((_, row) => (
                      [...Array(10)].map((_, col) => (
                        <rect
                          key={`${row}-${col}`}
                          x={col * 40 + 10 + Math.random() * 5}
                          y={row * 35 + 10 + Math.random() * 5}
                          width={25 + Math.random() * 10}
                          height={20 + Math.random() * 10}
                          fill="#ffd700"
                          opacity={0.3 + Math.random() * 0.5}
                        />
                      ))
                    ))}
                    {/* Roads */}
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#fff" strokeWidth="3" opacity="0.3" />
                    <line x1="0" y1="200" x2="400" y2="200" stroke="#fff" strokeWidth="3" opacity="0.3" />
                    <line x1="0" y1="300" x2="400" y2="300" stroke="#fff" strokeWidth="3" opacity="0.3" />
                    <line x1="130" y1="0" x2="130" y2="400" stroke="#fff" strokeWidth="3" opacity="0.3" />
                    <line x1="270" y1="0" x2="270" y2="400" stroke="#fff" strokeWidth="3" opacity="0.3" />
                  </svg>
                </div>

                {/* Overlay info */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{city.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {city.lat.toFixed(4)}°, {city.lng.toFixed(4)}°
                  </p>
                  <Link
                    href={`/create?lat=${city.lat}&lng=${city.lng}&name=${encodeURIComponent(city.name)}`}
                    className="text-amber-500 hover:text-amber-400 text-sm font-medium transition"
                  >
                    Click to generate map →
                  </Link>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-amber-500/20" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-amber-500/20" />
              </div>
            </div>
          </div>
        </section>

        {/* Features for this city */}
        <section className="max-w-6xl mx-auto px-6 py-12 border-t border-[#1a1a1a]">
          <h2 className="text-2xl font-bold text-white mb-8">
            What You Can Create for {city.name}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#111] border border-[#222] rounded-xl p-6 hover:border-amber-500/30 transition">
              <div className="text-3xl mb-4">🏗️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Figure Ground Map</h3>
              <p className="text-gray-400 text-sm">
                Classic black and white building footprint analysis showing urban density and patterns in {city.name}.
              </p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6 hover:border-amber-500/30 transition">
              <div className="text-3xl mb-4">🛣️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Street Network</h3>
              <p className="text-gray-400 text-sm">
                Road hierarchy analysis with highways, primary roads, and pedestrian paths in {city.name}.
              </p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6 hover:border-amber-500/30 transition">
              <div className="text-3xl mb-4">🚇</div>
              <h3 className="text-lg font-semibold text-white mb-2">Transit Map</h3>
              <p className="text-gray-400 text-sm">
                Public transportation overlay with metro, tram, bus stops and ferry terminals in {city.name}.
              </p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6 hover:border-amber-500/30 transition">
              <div className="text-3xl mb-4">🌳</div>
              <h3 className="text-lg font-semibold text-white mb-2">Green Space Analysis</h3>
              <p className="text-gray-400 text-sm">
                Parks, forests, and vegetation mapping for environmental site analysis in {city.name}.
              </p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6 hover:border-amber-500/30 transition">
              <div className="text-3xl mb-4">📐</div>
              <h3 className="text-lg font-semibold text-white mb-2">Topography</h3>
              <p className="text-gray-400 text-sm">
                Contour lines and elevation data for terrain analysis around {city.name}.
              </p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6 hover:border-amber-500/30 transition">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="text-lg font-semibold text-white mb-2">3D City Model</h3>
              <p className="text-gray-400 text-sm">
                Export 3D building models of {city.name} for Rhino, SketchUp, or Blender.
              </p>
            </div>
          </div>
        </section>

        {/* About the city */}
        {city.keywords.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 py-12 border-t border-[#1a1a1a]">
            <h2 className="text-2xl font-bold text-white mb-6">
              About {city.name}'s Urban Form
            </h2>
            <p className="text-gray-400 mb-6 max-w-3xl">
              {city.description}. {city.name} is known for its unique urban characteristics 
              that make it a fascinating subject for architectural and urban analysis.
            </p>
            <div className="flex flex-wrap gap-2">
              {city.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="bg-[#1a1a1a] text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Related Cities */}
        <section className="max-w-6xl mx-auto px-6 py-12 border-t border-[#1a1a1a]">
          <h2 className="text-xl font-bold text-white mb-6">
            Explore More Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedCities.map((relatedCity) => (
              <Link
                key={relatedCity.slug}
                href={`/maps/${relatedCity.slug}`}
                className="bg-[#111] border border-[#222] rounded-lg p-4 hover:border-amber-500/50 transition text-center"
              >
                <div className="text-lg font-medium text-white mb-1">{relatedCity.name}</div>
                <div className="text-xs text-gray-500">{relatedCity.country}</div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/maps"
              className="text-amber-500 hover:text-amber-400 text-sm font-medium transition"
            >
              View all {CITIES.length} cities →
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[#1a1a1a] text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to create your {city.name} site plan?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Generate professional maps in seconds. Free PNG export, no account required.
          </p>
          <Link
            href={`/create?lat=${city.lat}&lng=${city.lng}&name=${encodeURIComponent(city.name)}`}
            className="inline-block bg-amber-500 hover:bg-amber-400 text-black px-10 py-4 rounded-xl font-semibold text-lg transition"
          >
            Start Creating — Free
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
    </>
  )
}
