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

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
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

const BoxIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)

export default function HomeClient({ discount, country }: HomeClientProps) {
  const [scrolled, setScrolled] = useState(false)
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const { user, profile, signOut } = useAuth()

  // Calculate discounted Pro price
  const baseProPrice = 19
  const proPrice = discount ? Math.round(baseProPrice * (1 - discount.percent / 100)) : baseProPrice

  // Direct checkout handler for Pro
  const handlePurchase = async () => {
    if (!user) {
      window.location.href = '/login'
      return
    }

    setPurchaseLoading(true)
    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          variantId: process.env.NEXT_PUBLIC_LEMONSQUEEZY_SUBSCRIPTION_VARIANT_ID,
          planType: 'subscription',
          userId: user.id,
          userEmail: user.email 
        }),
      })

      const data = await response.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (err) {
      console.error('Purchase error:', err)
    } finally {
      setPurchaseLoading(false)
    }
  }

  // Direct checkout handler for Unlimited SVG+DXF
  const handleUnlimitedPurchase = async () => {
    if (!user) {
      window.location.href = '/login'
      return
    }

    setPurchaseLoading(true)
    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          variantId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_UNLIMITED_SVG_VARIANT_ID,
          planType: 'unlimited',
          userId: user.id,
          userEmail: user.email 
        }),
      })

      const data = await response.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (err) {
      console.error('Purchase error:', err)
    } finally {
      setPurchaseLoading(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    { icon: <BoxIcon />, title: '3D Model Export', desc: 'Native 3DM for Rhino, DAE for SketchUp, GLB for Blender, STL for 3D printing. Full city models.' },
    { icon: <LayersIcon />, title: 'Layered SVG & DXF', desc: 'Export to SVG for Illustrator or DXF for AutoCAD. Every element on its own layer.' },
    { icon: <PaletteIcon />, title: '34 Total Themes', desc: '24 analysis themes for 2D maps + 10 material themes for 3D models. From Blueprint to Neon.' },
    { icon: <ZapIcon />, title: 'Ready in 30 Seconds', desc: 'No more hours in QGIS or CAD. Select area, pick theme, download. Optimized file sizes.' },
    { icon: <GlobeIcon />, title: 'Real Terrain Data', desc: 'Accurate building heights, topography contours, and ground plane. Ready for site analysis.' },
    { icon: <MapPinIcon />, title: 'Global Coverage', desc: 'Any location worldwide. OpenStreetMap data with smart filtering and landmark labels.' },
  ]

  const themes = [
    { name: 'Technical', bg: '#ffffff', fg: '#212121', accent: '#1976d2', desc: 'Clean B&W for analysis' },
    { name: 'Warm Sunset', bg: '#fff8e7', fg: '#d84315', accent: '#ff7043', desc: 'Mediterranean warmth' },
    { name: 'Gold Edition', bg: '#0a0a0a', fg: '#d4af37', accent: '#ffd700', desc: 'Luxury night aesthetic' },
    { name: 'Blueprint', bg: '#0a1628', fg: '#4fc3f7', accent: '#29b6f6', desc: 'Classic engineering style' },
    { name: 'Neon City', bg: '#0a0a0a', fg: '#ff00ff', accent: '#00ffff', desc: 'Cyberpunk vibes' },
    { name: 'Arctic', bg: '#e3f2fd', fg: '#1565c0', accent: '#42a5f5', desc: 'Cool minimal tones' },
  ]

  const exampleMaps = [
    { 
      src: '/examples/technical.png', 
      theme: 'Technical', 
      city: 'Barcelona',
      desc: 'High contrast B&W for presentations'
    },
    { 
      src: '/examples/warm-sunset.png', 
      theme: 'Warm Sunset', 
      city: 'Barcelona',
      desc: 'Mediterranean color palette'
    },
    { 
      src: '/examples/barcelona.png', 
      theme: 'Gold Edition', 
      city: 'Barcelona',
      desc: 'Luxury dark theme with gold accents'
    },
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
                {profile?.is_pro && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <span className="text-amber-500 text-sm font-medium">✨ Pro</span>
                  </div>
                )}
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
                2D & 3D site maps
                <br />
                <span className="text-amber-500 italic font-serif font-medium">in seconds</span>
              </h1>

              {/* Subhead */}
              <p className="text-lg md:text-xl text-white/50 mb-10 leading-relaxed">
                Generate layered SVG maps for Illustrator and 3D models for Rhino, SketchUp & Blender. No GIS skills required.
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
                  <div className="text-3xl md:text-4xl font-bold text-amber-500">24</div>
                  <div className="text-white/40 text-sm mt-1">2D Themes</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-amber-500">10</div>
                  <div className="text-white/40 text-sm mt-1">3D Themes</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">SVG</div>
                  <div className="text-white/40 text-sm mt-1">Illustrator Ready</div>
                </div>
              </div>
            </div>

            {/* Right - Clean Preview Cards */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/5 rounded-3xl blur-2xl" />
                
                {/* 3D Model Preview Card - Smaller height */}
                <div className="relative mb-4 bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-amber-500/20 rounded-2xl p-4 overflow-hidden" style={{ height: '180px' }}>
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }} />
                  
                  {/* 3D Isometric City - Proper solid buildings with depth */}
                  <svg viewBox="0 0 300 130" className="w-full h-full relative z-10">
                    <defs>
                      {/* Gradients for depth effect */}
                      <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24"/>
                        <stop offset="100%" stopColor="#f59e0b"/>
                      </linearGradient>
                      <linearGradient id="grayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#555"/>
                        <stop offset="100%" stopColor="#333"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Ground plane with subtle gradient */}
                    <polygon points="150,118 10,75 150,32 290,75" fill="#141414"/>
                    <polygon points="150,118 10,75 150,32 290,75" fill="url(#grayGradient)" opacity="0.3"/>
                    <polygon points="150,118 10,75 150,32 290,75" stroke="#2a2a2a" strokeWidth="1" fill="none"/>
                    
                    {/* Main Road */}
                    <path d="M80,52 Q150,75 220,92" stroke="#252525" strokeWidth="8" fill="none" strokeLinecap="round"/>
                    <path d="M80,52 Q150,75 220,92" stroke="#333" strokeWidth="1" strokeDasharray="4,4" fill="none"/>
                    
                    {/* Building 1 - Tall Tower (Amber) - Left side */}
                    <g>
                      {/* Left face */}
                      <polygon points="40,72 40,28 60,20 60,64" fill="#b45309"/>
                      {/* Right face */}
                      <polygon points="60,20 92,32 92,76 60,64" fill="#f59e0b"/>
                      {/* Top face */}
                      <polygon points="40,28 60,20 92,32 72,40" fill="#fcd34d"/>
                      {/* Roof detail */}
                      <polygon points="52,30 60,27 80,33 72,36" fill="#fbbf24" opacity="0.8"/>
                    </g>
                    
                    {/* Building 2 - Medium Office (Gray) */}
                    <g>
                      <polygon points="105,82 105,52 125,44 125,74" fill="#2a2a2a"/>
                      <polygon points="125,44 160,58 160,88 125,74" fill="#404040"/>
                      <polygon points="105,52 125,44 160,58 140,66" fill="#505050"/>
                      {/* Windows */}
                      <rect x="130" y="52" width="4" height="6" fill="#1a1a1a" opacity="0.5"/>
                      <rect x="138" y="56" width="4" height="6" fill="#1a1a1a" opacity="0.5"/>
                      <rect x="146" y="60" width="4" height="6" fill="#1a1a1a" opacity="0.5"/>
                    </g>
                    
                    {/* Building 3 - Wide Complex (Dark Gray) */}
                    <g>
                      <polygon points="168,94 168,70 198,58 198,82" fill="#1f1f1f"/>
                      <polygon points="198,58 248,76 248,100 198,82" fill="#333"/>
                      <polygon points="168,70 198,58 248,76 218,88" fill="#444"/>
                    </g>
                    
                    {/* Building 4 - Small Tower (Amber accent) - Right side */}
                    <g>
                      <polygon points="252,90 252,70 268,64 268,84" fill="#92400e"/>
                      <polygon points="268,64 290,72 290,92 268,84" fill="#d97706"/>
                      <polygon points="252,70 268,64 290,72 274,78" fill="#fbbf24"/>
                    </g>
                    
                    {/* Water feature */}
                    <ellipse cx="58" cy="92" rx="18" ry="8" fill="#2563eb" opacity="0.5"/>
                    <ellipse cx="58" cy="91" rx="14" ry="6" fill="#3b82f6" opacity="0.6"/>
                    
                    {/* Trees/Green areas */}
                    <ellipse cx="35" cy="85" rx="6" ry="3" fill="#166534" opacity="0.8"/>
                    <circle cx="35" cy="82" r="5" fill="#22c55e" opacity="0.9"/>
                    <ellipse cx="132" cy="100" rx="5" ry="2.5" fill="#166534" opacity="0.7"/>
                    <circle cx="132" cy="98" r="4" fill="#16a34a" opacity="0.8"/>
                    <ellipse cx="225" cy="106" rx="6" ry="3" fill="#166534" opacity="0.8"/>
                    <circle cx="225" cy="103" r="5" fill="#22c55e" opacity="0.9"/>
                  </svg>
                  
                  {/* 3D Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded">
                    <span className="text-amber-400 text-[9px] font-bold tracking-wide">3D MODEL</span>
                  </div>
                  
                  {/* Format badges - Updated */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <span className="px-1.5 py-0.5 bg-amber-500/20 rounded text-[8px] text-amber-400 font-medium">3DM</span>
                    <span className="px-1.5 py-0.5 bg-white/10 rounded text-[8px] text-white/60 font-medium">GLB</span>
                    <span className="px-1.5 py-0.5 bg-white/10 rounded text-[8px] text-white/60 font-medium">DAE</span>
                  </div>
                </div>
                
                {/* Create screen container */}
                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Window controls */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    <span className="ml-4 text-white/30 text-xs font-mono">archikek.com/create</span>
                  </div>
                  
                  {/* Create screen mockup */}
                  <div className="flex">
                    {/* Sidebar mockup */}
                    <div className="w-48 bg-[#0a0a0a] border-r border-white/10 p-3 space-y-3">
                      {/* Search */}
                      <div className="bg-[#111] border border-[#222] rounded-lg px-3 py-2 text-xs text-gray-500 flex items-center gap-2">
                        <span>🔍</span> Search location...
                      </div>
                      
                      {/* 2D/3D Toggle */}
                      <div className="flex gap-1 p-1 bg-[#111] rounded-lg">
                        <div className="flex-1 py-1.5 bg-amber-500 text-black text-[10px] font-bold rounded text-center">2D</div>
                        <div className="flex-1 py-1.5 text-gray-500 text-[10px] rounded text-center">3D</div>
                      </div>
                      
                      {/* Theme selector */}
                      <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg p-2">
                        <div className="grid grid-cols-4 gap-1">
                          {[
                            { bg: '#fff', fg: '#1a1a1a' },
                            { bg: '#0a0a0a', fg: '#d4af37' },
                            { bg: '#fff8e7', fg: '#d84315' },
                            { bg: '#0a1628', fg: '#4fc3f7' },
                          ].map((t, i) => (
                            <div 
                              key={i} 
                              className={`aspect-square rounded border ${i === 0 ? 'border-amber-500 ring-1 ring-amber-500/50' : 'border-[#333]'}`}
                              style={{ background: t.bg }}
                            >
                              <div className="w-full h-full p-0.5 flex flex-col gap-px">
                                <div className="flex-1 rounded-sm" style={{ background: t.fg }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Preview button */}
                      <div className="bg-amber-500 text-black text-xs font-medium py-2 rounded-lg text-center">
                        Preview (Free)
                      </div>
                    </div>
                    
                    {/* Map area mockup */}
                    <div className="w-64 h-44 bg-[#111] relative">
                      {/* Simple map representation */}
                      <svg viewBox="0 0 256 176" className="w-full h-full">
                        <rect fill="#111" width="256" height="176"/>
                        <path d="M0 60 L256 55" stroke="#222" strokeWidth="6"/>
                        <path d="M0 120 L256 115" stroke="#222" strokeWidth="4"/>
                        <path d="M80 0 L85 176" stroke="#222" strokeWidth="4"/>
                        <path d="M180 0 L175 176" stroke="#222" strokeWidth="4"/>
                        
                        {/* Selection box */}
                        <rect x="100" y="65" width="70" height="55" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4">
                          <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite"/>
                        </rect>
                        
                        {/* Center point */}
                        <circle cx="135" cy="92" r="4" fill="#f59e0b"/>
                      </svg>
                      
                      {/* Tutorial overlay */}
                      <div className="absolute top-2 left-2 bg-black/80 backdrop-blur px-2 py-1.5 rounded-lg">
                        <p className="text-white text-[9px]">🎯 Click to select area</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tutorial steps floating - positioned to not overlap 3D card */}
                <div className="absolute -right-4 top-56 flex flex-col gap-2 max-w-[140px] z-20">
                  <div className="bg-amber-500 text-black px-3 py-2 rounded-lg shadow-lg">
                    <p className="text-[10px] font-bold">1. Search Location</p>
                    <p className="text-[8px] opacity-80">Type any city or address</p>
                  </div>
                  <div className="bg-[#111] border border-amber-500/30 text-white px-3 py-2 rounded-lg">
                    <p className="text-[10px] font-medium">2. Pick 2D or 3D</p>
                    <p className="text-[8px] opacity-60">34 total themes</p>
                  </div>
                  <div className="bg-[#111] border border-amber-500/30 text-white px-3 py-2 rounded-lg">
                    <p className="text-[10px] font-medium">3. Download</p>
                    <p className="text-[8px] opacity-60">SVG, DXF, 3DM, GLB, DAE</p>
                  </div>
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
              24 professional themes
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
                  <path d={`M0 45 L100 42`} stroke={theme.accent} strokeWidth="2.5" opacity="0.8"/>
                  <path d={`M40 0 L42 130`} stroke={theme.fg} strokeWidth="1.5" opacity="0.3"/>
                </svg>
                
                {/* Theme name overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <span className="text-white text-sm font-medium">{theme.name}</span>
                  <p className="text-white/50 text-xs mt-0.5">{theme.desc}</p>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors" />
              </div>
            ))}
          </div>

          <p className="text-center text-white/30 text-sm mt-8">
            + 18 more themes including Nolli, Schwarzplan, Midnight, Sepia, Pastel, Blueprint, and more
          </p>
        </div>
      </section>

      {/* Gallery Section - Real Examples */}
      <section className="py-24 md:py-32 relative bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-[0.2em] mb-4">Gallery</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Same city, different stories
            </h2>
            <p className="text-white/50 text-lg">
              Barcelona's iconic Eixample grid rendered in three distinct styles. Each theme tells a different story.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {exampleMaps.map((map, i) => (
              <div 
                key={i}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all"
              >
                <Image 
                  src={map.src} 
                  alt={`${map.city} - ${map.theme}`}
                  width={600}
                  height={800}
                  className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <span className="text-amber-500 text-sm font-medium">{map.theme}</span>
                  <h3 className="text-white text-xl font-semibold mt-1">{map.city}</h3>
                  <p className="text-white/50 text-sm mt-1">{map.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className="mt-12 text-center">
            <a 
              href="https://instagram.com/archikekapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow @archikekapp for more
            </a>
            <p className="text-white/30 text-sm mt-4">Daily architecture maps & design inspiration</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-[0.2em] mb-4">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Simple pricing
            </h2>
            <p className="text-white/50 text-lg">PNG free forever. Upgrade for SVG, DXF and 3D exports.</p>
          </div>

          {/* Regional Discount Banner */}
          {discount && (
            <div className="max-w-5xl mx-auto mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
              <p className="text-green-400">
                🎉 <strong>{discount.percent}% discount</strong> applied for {discount.name}! Prices shown below.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="relative p-6 bg-white/[0.02] border border-white/10 rounded-3xl hover:border-white/20 transition-all">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">Free</h3>
                <p className="text-white/40 text-sm">For exploring</p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-green-400">$0</span>
                <span className="text-white/40 ml-2">forever</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited PNG Export',
                  'All 34 Themes',
                  'Color Customization',
                  'Real-time Preview',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="text-green-500"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
                {[
                  'SVG Export',
                  'DXF Export',
                  '3D Models',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/30 text-sm">
                    <span className="text-white/20"><XIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link 
                href="/create"
                className="block w-full py-3 bg-white/5 border border-white/10 text-white text-center rounded-xl font-semibold hover:bg-white/10 transition-colors text-sm"
              >
                Start Free
              </Link>
            </div>

            {/* Unlimited Plan */}
            <div className="relative p-6 bg-white/[0.02] border border-blue-500/30 rounded-3xl hover:border-blue-500/50 transition-all">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">Unlimited</h3>
                <p className="text-white/40 text-sm">For designers & students</p>
              </div>
              
              <div className="mb-8">
                {discount ? (
                  <>
                    <span className="text-white/40 line-through text-xl mr-2">$8</span>
                    <span className="text-4xl font-bold text-green-400">${Math.round(8 * (1 - discount.percent / 100))}</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">$8</span>
                )}
                <span className="text-white/40 ml-2">/month</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Free',
                  'Unlimited SVG Export',
                  'Unlimited DXF Export',
                  'AutoCAD/Rhino Compatible',
                  'Cancel Anytime',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="text-blue-500"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
                {[
                  '3D Models',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/30 text-sm">
                    <span className="text-white/20"><XIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={handleUnlimitedPurchase}
                disabled={purchaseLoading}
                className="block w-full py-3 bg-blue-500 text-white text-center rounded-xl font-bold hover:bg-blue-400 transition-colors disabled:opacity-50 text-sm"
              >
                {purchaseLoading ? 'Loading...' : 'Get Unlimited'}
              </button>
            </div>

            {/* Pro Subscription */}
            <div className="relative p-6 bg-gradient-to-b from-amber-500/10 to-transparent border-2 border-amber-500/50 rounded-3xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                BEST VALUE
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">Pro</h3>
                <p className="text-white/40 text-sm">For professionals</p>
              </div>
              
              <div className="mb-8">
                {discount ? (
                  <>
                    <span className="text-white/40 line-through text-xl mr-2">${baseProPrice}</span>
                    <span className="text-4xl font-bold text-green-400">${proPrice}</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">${baseProPrice}</span>
                )}
                <span className="text-white/40 ml-2">/month</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Unlimited',
                  '3D Models (GLB/STL/3DM)',
                  'Real Elevation Terrain',
                  '3D Print Ready (STL)',
                  'Commercial License',
                  'Priority Support',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="text-amber-500"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={handlePurchase}
                disabled={purchaseLoading}
                className="block w-full py-3 bg-amber-500 text-black text-center rounded-xl font-bold hover:bg-amber-400 transition-colors disabled:opacity-50 text-sm"
              >
                {purchaseLoading ? 'Loading...' : 'Upgrade to Pro'}
              </button>
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
            Ready to create your first site model?
          </h2>
          <p className="text-white/50 text-xl mb-10 max-w-xl mx-auto">
            Generate 2D maps & 3D models in seconds. Export to Illustrator, Rhino, Blender, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/create" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-amber-500 text-black font-bold rounded-full text-lg hover:bg-amber-400 transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/25"
            >
              Start Creating — Free
              <ArrowRightIcon />
            </Link>
          </div>
          <p className="text-white/30 text-sm mt-6">No credit card required • Free forever</p>
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
              <span className="text-white/40 text-sm">© 2025 ArchiKEK. Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">OpenStreetMap</a> contributors.</span>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/blog" className="text-white/40 hover:text-white text-sm transition-colors">Blog</Link>
              <Link href="/terms" className="text-white/40 hover:text-white text-sm transition-colors">Terms</Link>
              <Link href="/privacy" className="text-white/40 hover:text-white text-sm transition-colors">Privacy</Link>
              <Link href="/contact" className="text-white/40 hover:text-white text-sm transition-colors">Contact</Link>
              <a 
                href="https://instagram.com/archikekapp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-pink-400 transition-colors"
                title="Follow us on Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
