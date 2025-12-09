'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'

interface HomeClientProps {
  discount: { percent: number; name: string; code: string } | null
  country: string
}

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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const LayersIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)

const PaletteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
  </svg>
)

const ZapIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const GlobeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const MapPinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const TrainIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="3" width="16" height="16" rx="2"/>
    <path d="M4 11h16"/>
    <path d="M12 3v8"/>
    <circle cx="8" cy="15" r="1"/>
    <circle cx="16" cy="15" r="1"/>
    <path d="M8 19l-2 3"/>
    <path d="M16 19l2 3"/>
  </svg>
)

export default function HomeClient({ discount, country }: HomeClientProps) {
  const [scrolled, setScrolled] = useState(false)
  const { user, profile, signOut } = useAuth()

  // Calculate discounted prices
  const baseCreditsPrice = 15
  const baseProPrice = 19
  const creditsPrice = discount ? Math.round(baseCreditsPrice * (1 - discount.percent / 100)) : baseCreditsPrice
  const proPrice = discount ? Math.round(baseProPrice * (1 - discount.percent / 100)) : baseProPrice

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    { icon: <LayersIcon />, title: 'Layered SVG & DXF', desc: 'Export to SVG for Illustrator or DXF for AutoCAD, Rhino, SketchUp. Every element on its own layer.' },
    { icon: <PaletteIcon />, title: '13 Analysis Themes', desc: 'Figure Ground, Nolli, Street Hierarchy, Transit, Topographic, and more with height shading.' },
    { icon: <ZapIcon />, title: 'Ready in 30 Seconds', desc: 'No more hours in QGIS or CAD. Select area, pick theme, download. Optimized file sizes.' },
    { icon: <GlobeIcon />, title: 'Topography Contours', desc: 'Smooth elevation contour lines with customizable intervals. Real terrain data for site analysis.' },
    { icon: <TrainIcon />, title: 'Smart Transit Icons', desc: 'Metro, tram, bus stops auto-filtered by zoom level. Clean maps at any scale.' },
    { icon: <MapPinIcon />, title: 'Landmark Labels', desc: 'Important buildings (hospitals, schools, mosques) automatically labeled. Scale bar & north arrow included.' },
  ]

  const themes = [
    { name: 'Figure Ground', bg: '#ffffff', fg: '#1a1a1a', accent: '#d64045' },
    { name: 'Nolli Map', bg: '#0d0d0d', fg: '#ffffff', accent: '#ff6b6b' },
    { name: 'Topographic', bg: '#faf8f5', fg: '#8b4513', accent: '#d32f2f' },
    { name: 'Street Hierarchy', bg: '#1a1a2e', fg: '#ff6600', accent: '#ffcc00' },
    { name: 'Green Space', bg: '#f5f9f5', fg: '#2d8a2d', accent: '#4caf50' },
    { name: 'Historical', bg: '#f4efe4', fg: '#5d4037', accent: '#8d6e63' },
  ]

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="ArchiKEK" 
                width={44} 
                height={44}
                className="object-contain"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Archi<span className="text-amber-500">KEK</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Features</a>
            <a href="#themes" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Themes</a>
            <a href="#pricing" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Pricing</a>
            <Link href="/blog" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Blog</Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  {profile?.is_pro ? (
                    <span className="text-amber-500 text-sm font-medium">✨ Pro</span>
                  ) : (
                    <span className="text-white/70 text-sm">{profile?.credits || 0} credits</span>
                  )}
                </div>
                <button onClick={signOut} className="text-white/60 hover:text-white text-sm transition-colors">
                  Sign Out
                </button>
                <Link 
                  href="/create" 
                  className="px-5 py-2.5 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all hover:scale-105"
                >
                  Create Map
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-white/60 hover:text-white text-sm transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors">
                  Sign Up
                </Link>
                <Link 
                  href="/create" 
                  className="px-5 py-2.5 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all hover:scale-105"
                >
                  Create Map
                </Link>
              </div>
            )}
          </div>

          {/* Mobile CTA */}
          <Link href="/create" className="md:hidden px-4 py-2 bg-amber-500 text-black font-semibold rounded-full text-sm">
            Create
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[100px]" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-amber-500 text-sm font-medium">Now Live — Start Creating</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                Site analysis maps
                <br />
                <span className="text-amber-500 italic font-serif font-medium">in seconds</span>
              </h1>

              {/* Subhead */}
              <p className="text-lg md:text-xl text-white/50 mb-10 leading-relaxed">
                Generate professional, Illustrator-ready site analysis maps for your architecture projects. No GIS skills required.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link 
                  href="/create" 
                  className="group inline-flex items-center gap-2 px-7 py-4 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                >
                  <PlayIcon />
                  Start Creating
                </Link>
                <a 
                  href="#features" 
                  className="inline-flex items-center gap-2 px-7 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  See How It Works
                  <ArrowRightIcon />
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 md:gap-12 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-amber-500">13</div>
                  <div className="text-white/40 text-sm mt-1">Analysis Themes</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">SVG</div>
                  <div className="text-white/40 text-sm mt-1">Vector Export</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">&lt;30s</div>
                  <div className="text-white/40 text-sm mt-1">Generation</div>
                </div>
              </div>
            </div>

            {/* Right - Map Preview */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/5 rounded-3xl blur-2xl" />
                
                {/* Map container */}
                <div className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Window controls */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    <span className="ml-4 text-white/30 text-xs font-mono">ArchiKEK — Figure Ground</span>
                  </div>
                  
                  {/* Map preview */}
                  <div className="p-6 bg-white">
                    <svg viewBox="0 0 400 280" className="w-full h-auto">
                      {/* Background */}
                      <rect fill="#ffffff" width="400" height="280"/>
                      
                      {/* Roads */}
                      <path d="M0 110 Q100 105 200 115 T400 105" stroke="#e8e8e8" strokeWidth="14" fill="none" strokeLinecap="round"/>
                      <path d="M0 190 Q150 185 250 195 T400 185" stroke="#e8e8e8" strokeWidth="10" fill="none" strokeLinecap="round"/>
                      <path d="M110 0 Q105 70 115 140 T105 280" stroke="#eeeeee" strokeWidth="8" fill="none" strokeLinecap="round"/>
                      <path d="M290 0 Q285 90 295 180 T285 280" stroke="#eeeeee" strokeWidth="8" fill="none" strokeLinecap="round"/>
                      
                      {/* Main road accent */}
                      <path d="M0 110 Q100 105 200 115 T400 105" stroke="#d64045" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                      
                      {/* Buildings with shadow effect */}
                      <g filter="url(#shadow)">
                        <rect x="25" y="25" width="55" height="45" fill="#1a1a1a" rx="1"/>
                        <rect x="35" y="140" width="50" height="65" fill="#1a1a1a" rx="1"/>
                        <rect x="140" y="30" width="75" height="50" fill="#1a1a1a" rx="1"/>
                        <rect x="135" y="145" width="40" height="35" fill="#1a1a1a" rx="1"/>
                        <rect x="190" y="135" width="50" height="45" fill="#1a1a1a" rx="1"/>
                        <rect x="310" y="28" width="60" height="55" fill="#1a1a1a" rx="1"/>
                        <rect x="300" y="130" width="65" height="40" fill="#1a1a1a" rx="1"/>
                        <rect x="25" y="220" width="50" height="40" fill="#1a1a1a" rx="1"/>
                        <rect x="150" y="210" width="55" height="50" fill="#1a1a1a" rx="1"/>
                        <rect x="310" y="205" width="60" height="55" fill="#1a1a1a" rx="1"/>
                      </g>
                      
                      {/* Green space */}
                      <ellipse cx="250" cy="235" rx="30" ry="22" fill="#e8f5e9"/>
                      
                      {/* Transit marker */}
                      <circle cx="200" cy="115" r="7" fill="#d64045"/>
                      <text x="200" y="118" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">M</text>
                      
                      {/* Scale bar */}
                      <rect x="15" y="258" width="50" height="3" fill="#1a1a1a"/>
                      <text x="40" y="253" textAnchor="middle" fontSize="7" fill="#666">100m</text>
                      
                      {/* North arrow */}
                      <polygon points="378,18 373,32 378,27 383,32" fill="#1a1a1a"/>
                      <text x="378" y="42" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1a1a1a">N</text>
                      
                      {/* Shadow filter */}
                      <defs>
                        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                          <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.15"/>
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
                
                {/* Floating theme pills */}
                <div className="absolute -right-2 top-1/4 flex flex-col gap-2">
                  {['Figure Ground', 'Nolli', 'Blueprint'].map((theme, i) => (
                    <div 
                      key={theme}
                      className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs text-white/80"
                      style={{ transform: `translateX(${i * 8}px)` }}
                    >
                      {theme}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-[0.2em] mb-4">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Everything for site analysis
            </h2>
            <p className="text-white/50 text-lg">
              Professional tools designed specifically for architects and urban planners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div 
                key={i} 
                className="group p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section id="themes" className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-[0.2em] mb-4">Themes</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              13 professional themes
            </h2>
            <p className="text-white/50 text-lg">
              From classic Figure Ground to modern Transit Analysis. Each carefully designed for presentations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {themes.map((theme, i) => (
              <div 
                key={i}
                className="group aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all cursor-pointer relative"
                style={{ background: theme.bg }}
              >
                {/* Mini map preview */}
                <svg viewBox="0 0 100 130" className="w-full h-full p-4">
                  <rect x="10" y="15" width="25" height="20" fill={theme.fg} opacity="0.9" rx="1"/>
                  <rect x="45" y="10" width="35" height="30" fill={theme.fg} opacity="0.9" rx="1"/>
                  <rect x="15" y="50" width="30" height="25" fill={theme.fg} opacity="0.9" rx="1"/>
                  <rect x="55" y="55" width="30" height="35" fill={theme.fg} opacity="0.9" rx="1"/>
                  <rect x="20" y="95" width="25" height="20" fill={theme.fg} opacity="0.9" rx="1"/>
                  <rect x="60" y="100" width="25" height="15" fill={theme.fg} opacity="0.9" rx="1"/>
                  <path d="M0 45 L100 42" stroke={theme.accent} strokeWidth="2.5" opacity="0.8"/>
                  <path d="M40 0 L42 130" stroke={theme.fg} strokeWidth="1.5" opacity="0.3"/>
                </svg>
                
                {/* Theme name overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <span className="text-white text-sm font-medium">{theme.name}</span>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors" />
              </div>
            ))}
          </div>

          <p className="text-center text-white/30 text-sm mt-8">
            + 7 more themes including Blueprint, Density Study, Pedestrian Flow, Land Use, and Presentation
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-[0.2em] mb-4">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Simple pricing
            </h2>
            <p className="text-white/50 text-lg">Start free with 1 credit. Upgrade when you need more.</p>
          </div>

          {/* Regional Discount Banner */}
          {discount && (
            <div className="max-w-4xl mx-auto mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
              <p className="text-green-400">
                🎉 <strong>{discount.percent}% discount</strong> applied for {discount.name}! Prices shown below.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Credits Pack */}
            <div className="relative p-8 bg-white/[0.02] border border-white/10 rounded-3xl hover:border-white/20 transition-all">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">Starter Pack</h3>
                <p className="text-white/40 text-sm">5 Map Credits</p>
              </div>
              
              <div className="mb-8">
                {discount ? (
                  <>
                    <span className="text-white/40 line-through text-2xl mr-2">${baseCreditsPrice}</span>
                    <span className="text-5xl font-bold text-green-400">${creditsPrice}</span>
                  </>
                ) : (
                  <span className="text-5xl font-bold">${baseCreditsPrice}</span>
                )}
                <span className="text-white/40 ml-2">one-time</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {['5 Map Downloads', 'All 12 Themes', 'Full Customization', 'SVG Export', 'Commercial License'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <span className="text-green-500"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link 
                href="/pricing"
                className="block w-full py-4 bg-white/5 border border-white/10 text-white text-center rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Buy Credits
              </Link>
            </div>

            {/* Pro Subscription */}
            <div className="relative p-8 bg-gradient-to-b from-amber-500/10 to-transparent border-2 border-amber-500/50 rounded-3xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-amber-500 text-black text-sm font-bold rounded-full">
                BEST VALUE
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">Pro</h3>
                <p className="text-white/40 text-sm">Unlimited maps</p>
              </div>
              
              <div className="mb-8">
                {discount ? (
                  <>
                    <span className="text-white/40 line-through text-2xl mr-2">${baseProPrice}</span>
                    <span className="text-5xl font-bold text-green-400">${proPrice}</span>
                  </>
                ) : (
                  <span className="text-5xl font-bold">${baseProPrice}</span>
                )}
                <span className="text-white/40 ml-2">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {['Unlimited Downloads', 'All Premium Themes', 'Priority Support', 'Early Access Features', 'Cancel Anytime'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <span className="text-amber-500"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link 
                href="/pricing"
                className="block w-full py-4 bg-amber-500 text-black text-center rounded-xl font-bold hover:bg-amber-400 transition-colors"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to create your first map?
          </h2>
          <p className="text-white/50 text-xl mb-10 max-w-xl mx-auto">
            Join architects worldwide using ArchiKEK for their site analysis projects.
          </p>
          <Link 
            href="/create" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-amber-500 text-black font-bold rounded-full text-lg hover:bg-amber-400 transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/25"
          >
            Create Your Map — Free
            <ArrowRightIcon />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="ArchiKEK" 
                width={32} 
                height={32}
                className="opacity-70"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-white/40 text-sm">© 2024 ArchiKEK. All rights reserved.</span>
            </div>
            <div className="flex gap-8">
              <Link href="/blog" className="text-white/40 hover:text-white text-sm transition-colors">Blog</Link>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Terms</a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="mailto:support@archikek.com" className="text-white/40 hover:text-white text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
