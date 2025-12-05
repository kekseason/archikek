'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'

// Icons
const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const LayersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)

const PaletteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
  </svg>
)

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const GlobeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const DownloadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const RulerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
    <line x1="21" y1="12" x2="21" y2="3"/>
    <line x1="21" y1="3" x2="12" y2="3"/>
  </svg>
)

const TrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="3" width="16" height="16" rx="2"/>
    <path d="M4 11h16"/>
    <path d="M12 3v8"/>
    <circle cx="8" cy="15" r="1"/>
    <circle cx="16" cy="15" r="1"/>
    <path d="M8 19l-2 3"/>
    <path d="M16 19l2 3"/>
  </svg>
)

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const { user, profile, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    { icon: <LayersIcon />, title: 'Layered SVG Export', desc: 'Every element on its own layer. Buildings, roads, water, parks — all separately editable in Illustrator.' },
    { icon: <PaletteIcon />, title: '12 Analysis Themes', desc: 'Figure Ground, Nolli, Street Hierarchy, Transit Analysis, Green Space, Blue-Green Network, and more.' },
    { icon: <ZapIcon />, title: 'Ready in 30 Seconds', desc: 'No more hours in QGIS or CAD. Select area, pick theme, download. Your analysis is done.' },
    { icon: <GlobeIcon />, title: 'Global Coverage', desc: 'Powered by OpenStreetMap. Generate professional maps for any location worldwide.' },
    { icon: <TrainIcon />, title: 'Transit Icons', desc: 'Metro, tram, bus, and ferry stops automatically marked with professional symbols.' },
    { icon: <RulerIcon />, title: 'Scale Bar & North', desc: 'Professional cartographic elements included. Scale bar auto-calculated for your extent.' },
  ]

  const steps = [
    { num: '01', title: 'Select Location', desc: 'Search any address or click on the map' },
    { num: '02', title: 'Define Area', desc: 'Set your analysis boundary size' },
    { num: '03', title: 'Choose Theme', desc: 'Pick from 12 professional palettes' },
    { num: '04', title: 'Download SVG', desc: 'Get your Illustrator-ready file' },
  ]

  const themes = [
    { name: 'Figure Ground', bg: '#ffffff', fg: '#1a1a1a' },
    { name: 'Nolli Map', bg: '#0d0d0d', fg: '#ffffff' },
    { name: 'Blueprint', bg: '#0a2342', fg: '#ffffff' },
    { name: 'Street Hierarchy', bg: '#1a1a2e', fg: '#ff6600' },
    { name: 'Transit Analysis', bg: '#0f0f1a', fg: '#ff0055' },
    { name: 'Green Space', bg: '#f5f9f5', fg: '#2d8a2d' },
  ]

  return (
    <main className="bg-[#050505] text-white min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-[#222]' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="ArchiKEK" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <span className="font-serif text-xl font-semibold tracking-tight">
              Archi<span className="text-amber-500">KEK</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</a>
            <a href="#themes" className="text-gray-400 hover:text-white text-sm transition-colors">Themes</a>
            <a href="#pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</a>
            
            {user ? (
              <>
                {profile && (
                  <span className="text-gray-400 text-sm">
                    {profile.is_pro ? '✨ Pro' : `${profile.credits} credits`}
                  </span>
                )}
                <button 
                  onClick={signOut}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Sign Out
                </button>
                <Link 
                  href="/create" 
                  className="px-5 py-2.5 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-all hover:-translate-y-0.5"
                >
                  Create Map
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Sign In
                </Link>
                <Link 
                  href="/create" 
                  className="px-5 py-2.5 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-all hover:-translate-y-0.5"
                >
                  Create Map
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Link href="/create" className="md:hidden px-4 py-2 bg-amber-500 text-black font-medium rounded-lg text-sm">
            Create
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-20 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Gradient orb */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-amber-500 text-sm font-medium">Now Live — Start Creating</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight mb-6">
              Site analysis maps
              <br />
              <span className="text-amber-500 italic">in seconds</span>
            </h1>

            {/* Subhead */}
            <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
              Generate professional, Illustrator-ready site analysis maps for your architecture projects. No GIS skills required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link 
                href="/create" 
                className="inline-flex items-center gap-2 px-7 py-4 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/20"
              >
                <PlayIcon />
                Start Creating
              </Link>
              <a 
                href="#how-it-works" 
                className="inline-flex items-center gap-2 px-7 py-4 bg-transparent border border-[#333] text-white font-medium rounded-xl hover:bg-[#111] hover:border-[#444] transition-all"
              >
                See How It Works
                <ArrowRightIcon />
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8 border-t border-[#222]">
              <div>
                <div className="font-serif text-4xl font-medium text-amber-500">12</div>
                <div className="text-gray-500 text-sm mt-1">Analysis Themes</div>
              </div>
              <div>
                <div className="font-serif text-4xl font-medium">SVG</div>
                <div className="text-gray-500 text-sm mt-1">Vector Export</div>
              </div>
              <div>
                <div className="font-serif text-4xl font-medium">&lt;30s</div>
                <div className="text-gray-500 text-sm mt-1">Generation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero visual - Map preview */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[70%] hidden xl:block">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505] z-10" />
            <div className="w-full h-full bg-[#111] rounded-l-3xl border-l border-t border-b border-[#222] overflow-hidden">
              {/* Fake map preview */}
              <svg viewBox="0 0 400 500" className="w-full h-full opacity-60">
                <rect fill="#0a0a0a" width="400" height="500"/>
                {/* Roads */}
                <path d="M0 200 L400 180" stroke="#333" strokeWidth="8" fill="none"/>
                <path d="M150 0 L180 500" stroke="#333" strokeWidth="6" fill="none"/>
                <path d="M300 0 L280 500" stroke="#222" strokeWidth="4" fill="none"/>
                {/* Buildings */}
                <rect x="50" y="80" width="60" height="80" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                <rect x="180" y="60" width="80" height="100" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                <rect x="300" y="100" width="50" height="60" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                <rect x="60" y="250" width="70" height="90" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                <rect x="200" y="220" width="100" height="120" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                <rect x="80" y="400" width="90" height="70" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                <rect x="220" y="380" width="60" height="80" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                {/* Green areas */}
                <ellipse cx="350" cy="400" rx="40" ry="50" fill="#1a2e1a"/>
                {/* Transit */}
                <circle cx="150" cy="200" r="10" fill="#f59e0b"/>
                <text x="150" y="204" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#000">M</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 border-t border-[#151515]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-20">
            <div className="text-amber-500 text-xs uppercase tracking-[0.2em] font-semibold mb-4">Features</div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-5">
              Everything for site analysis
            </h2>
            <p className="text-gray-400 text-lg">
              Professional tools designed specifically for architects and urban planners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div 
                key={i} 
                className="group bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 hover:border-[#333] hover:bg-[#0f0f0f] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-5 group-hover:bg-amber-500/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-[#080808] border-y border-[#151515]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="text-amber-500 text-xs uppercase tracking-[0.2em] font-semibold mb-4">How It Works</div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">
              Four simple steps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#333] to-transparent" />
                )}
                <div className="w-20 h-20 bg-[#111] border border-[#222] rounded-2xl flex items-center justify-center mx-auto mb-6 font-serif text-2xl text-amber-500 relative z-10">
                  {s.num}
                </div>
                <h3 className="font-semibold mb-2 text-lg">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/create" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-all"
            >
              Try It Now — Free
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Themes Preview */}
      <section id="themes" className="py-32 border-b border-[#151515]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="text-amber-500 text-xs uppercase tracking-[0.2em] font-semibold mb-4">Themes</div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-5">
              12 professional themes
            </h2>
            <p className="text-gray-400 text-lg">
              From classic Figure Ground to modern Transit Analysis.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {themes.map((theme, i) => (
              <div 
                key={i}
                className="aspect-[3/4] rounded-xl overflow-hidden border border-[#222] hover:border-amber-500/50 transition-all cursor-pointer group relative"
                style={{ background: theme.bg }}
              >
                {/* Mini map preview */}
                <svg viewBox="0 0 100 130" className="w-full h-full p-3">
                  <rect x="10" y="15" width="25" height="20" fill={theme.fg} opacity="0.8"/>
                  <rect x="45" y="10" width="35" height="30" fill={theme.fg} opacity="0.8"/>
                  <rect x="15" y="50" width="30" height="25" fill={theme.fg} opacity="0.8"/>
                  <rect x="55" y="55" width="30" height="35" fill={theme.fg} opacity="0.8"/>
                  <rect x="20" y="95" width="25" height="20" fill={theme.fg} opacity="0.8"/>
                  <path d="M0 45 L100 40" stroke={theme.fg} strokeWidth="2" opacity="0.4"/>
                  <path d="M40 0 L45 130" stroke={theme.fg} strokeWidth="1.5" opacity="0.4"/>
                </svg>
                
                {/* Theme name overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-white text-xs font-medium">{theme.name}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            + 6 more themes including Density Study, Land Use, Historical Layer, and Presentation
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-[#080808]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="text-amber-500 text-xs uppercase tracking-[0.2em] font-semibold mb-4">Pricing</div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-5">
              Simple pricing
            </h2>
            <p className="text-gray-400 text-lg">Start free. Upgrade when you need more.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Credits Pack */}
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 hover:border-[#333] transition-all">
              <div className="font-semibold text-lg mb-1">Starter Pack</div>
              <div className="text-gray-500 text-sm mb-6">5 Map Credits</div>
              <div className="font-serif text-5xl font-medium mb-6">
                $15
                <span className="text-gray-500 text-lg font-sans ml-1">once</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {['5 Map Downloads', 'All 12 Themes', 'Full Customization', 'SVG Export', 'Commercial License'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <span className="text-green-500"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link 
                href="/pricing"
                className="block w-full py-3.5 bg-[#1a1a1a] text-white text-center rounded-xl font-medium hover:bg-[#222] transition-colors"
              >
                Buy Credits
              </Link>
            </div>

            {/* Pro Subscription */}
            <div className="bg-[#0a0a0a] border-2 border-amber-500 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                Best Value
              </div>
              
              <div className="font-semibold text-lg mb-1">Pro</div>
              <div className="text-gray-500 text-sm mb-6">Unlimited maps</div>
              <div className="font-serif text-5xl font-medium mb-6">
                $19
                <span className="text-gray-500 text-lg font-sans ml-1">/mo</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {['Unlimited Downloads', 'All Premium Themes', 'Priority Support', 'Early Access Features', 'Cancel Anytime'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <span className="text-amber-500"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link 
                href="/pricing"
                className="block w-full py-3.5 bg-amber-500 text-black text-center rounded-xl font-semibold hover:bg-amber-400 transition-colors"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-[#151515]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6">
            Ready to create your first map?
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto">
            Join thousands of architects using ArchiKEK for their site analysis projects.
          </p>
          <Link 
            href="/create" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-amber-500 text-black font-semibold rounded-xl text-lg hover:bg-amber-400 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/20"
          >
            <DownloadIcon />
            Create Your Map — Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#151515]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="ArchiKEK" 
                width={32} 
                height={32}
                className="rounded-lg opacity-80"
              />
              <span className="text-gray-500 text-sm">© 2024 ArchiKEK. All rights reserved.</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="mailto:support@archikek.com" className="text-gray-500 hover:text-white text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
