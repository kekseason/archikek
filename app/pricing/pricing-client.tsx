'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { trackInitiateCheckout } from '@/lib/tiktok'

interface PricingClientProps {
  discount: { percent: number; name: string; code: string } | null
  country: string
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
)

const LoaderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
    <path d="M21 12a9 9 0 11-6.219-8.56"/>
  </svg>
)

export default function PricingClient({ discount, country }: PricingClientProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  // Calculate discounted prices
  const baseProPrice = 19
  const proPrice = discount ? Math.round(baseProPrice * (1 - discount.percent / 100)) : baseProPrice

  const handlePurchase = async (variantId: string | undefined, planType: string) => {
    if (!user) {
      router.push('/login')
      return
    }

    if (!variantId) {
      setError('Product configuration error. Please try again later.')
      return
    }

    // Track TikTok InitiateCheckout event
    const basePrice = 18.99
    const finalPrice = discount ? basePrice * (1 - discount.percent / 100) : basePrice
    trackInitiateCheckout(finalPrice, 'USD', planType)

    setLoading(planType)
    setError('')

    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          variantId, 
          planType,
          userId: user.id,
          userEmail: user.email 
        }),
      })

      const data = await response.json()

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        setError(data.error || 'Failed to create checkout session.')
      }
    } catch (err) {
      console.error('Purchase error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
            <ArrowLeftIcon />
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="ArchiKEK" width={32} height={32} className="rounded-lg" />
              <span className="font-serif text-xl font-semibold tracking-tight">
                Archi<span className="text-amber-500">KEK</span>
              </span>
            </div>
          </Link>
          
          <Link 
            href="/create" 
            className="px-5 py-2.5 bg-[#1a1a1a] text-white font-medium rounded-lg hover:bg-[#222] transition-colors text-sm"
          >
            Try Free
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-amber-500 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              Pricing
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Start free, upgrade when ready
            </h1>
            <p className="text-gray-400 text-lg">
              SVG and PNG exports are always free. Upgrade to Pro for DXF, 3D models, and unlimited access.
            </p>
          </div>

          {/* Regional Discount Banner */}
          {discount && (
            <div className="max-w-4xl mx-auto mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
              <p className="text-green-400">
                🎉 <strong>{discount.percent}% discount</strong> applied for {discount.name}! Prices shown below.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Pricing Cards - 2 columns */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Free Tier */}
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 hover:border-[#333] transition-all flex flex-col">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-1">Free</h3>
                <p className="text-gray-500 text-sm">For personal projects</p>
              </div>
              
              <div className="mb-8">
                <span className="font-serif text-5xl font-medium">$0</span>
                <span className="text-gray-500 text-lg ml-2">forever</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-green-500 flex-shrink-0"><CheckIcon /></span>
                  Unlimited SVG exports
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-green-500 flex-shrink-0"><CheckIcon /></span>
                  Unlimited PNG exports
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-green-500 flex-shrink-0"><CheckIcon /></span>
                  All 34 themes
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-green-500 flex-shrink-0"><CheckIcon /></span>
                  Full color customization
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-green-500 flex-shrink-0"><CheckIcon /></span>
                  Topographic contours
                </li>
                <li className="flex items-center gap-3 text-gray-500 text-sm">
                  <span className="text-gray-600 flex-shrink-0"><XIcon /></span>
                  DXF export (AutoCAD/Rhino)
                </li>
                <li className="flex items-center gap-3 text-gray-500 text-sm">
                  <span className="text-gray-600 flex-shrink-0"><XIcon /></span>
                  3D models (3DM/DAE/GLB/STL)
                </li>
              </ul>

              <Link
                href="/create"
                className="w-full py-4 bg-[#1a1a1a] text-white rounded-xl font-medium hover:bg-[#222] transition-all flex items-center justify-center gap-2 text-center"
              >
                Start Creating →
              </Link>
            </div>

            {/* Pro Subscription */}
            <div 
              onClick={() => !loading && handlePurchase(process.env.NEXT_PUBLIC_LEMONSQUEEZY_SUBSCRIPTION_VARIANT_ID, 'subscription')}
              className="bg-[#0a0a0a] border-2 border-amber-500 rounded-2xl p-8 relative flex flex-col cursor-pointer hover:border-amber-400 hover:bg-[#0f0f0f] transition-all"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-1">Pro</h3>
                <p className="text-gray-500 text-sm">For professionals & architects</p>
              </div>
              
              <div className="mb-8">
                {discount ? (
                  <>
                    <span className="text-gray-500 line-through text-2xl mr-2">${baseProPrice}</span>
                    <span className="font-serif text-5xl font-medium text-green-400">${proPrice}</span>
                  </>
                ) : (
                  <span className="font-serif text-5xl font-medium">${baseProPrice}</span>
                )}
                <span className="text-gray-500 text-lg ml-2">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-amber-500 flex-shrink-0"><CheckIcon /></span>
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-center gap-3 text-white text-sm font-medium">
                  <span className="text-amber-500 flex-shrink-0"><CheckIcon /></span>
                  DXF export (AutoCAD/Rhino)
                </li>
                <li className="flex items-center gap-3 text-white text-sm font-medium">
                  <span className="text-amber-500 flex-shrink-0"><CheckIcon /></span>
                  3D models (3DM/DAE/GLB/STL)
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-amber-500 flex-shrink-0"><CheckIcon /></span>
                  Professional DXF with layers
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-amber-500 flex-shrink-0"><CheckIcon /></span>
                  Terrain with real elevation
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-amber-500 flex-shrink-0"><CheckIcon /></span>
                  Commercial license
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-amber-500 flex-shrink-0"><CheckIcon /></span>
                  Cancel anytime
                </li>
              </ul>

              <button
                onClick={() => handlePurchase(process.env.NEXT_PUBLIC_LEMONSQUEEZY_SUBSCRIPTION_VARIANT_ID, 'subscription')}
                disabled={loading === 'subscription'}
                className="w-full py-4 bg-amber-500 text-black rounded-xl font-semibold hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading === 'subscription' ? (
                  <>
                    <LoaderIcon />
                    Processing...
                  </>
                ) : (
                  'Upgrade to Pro'
                )}
              </button>
            </div>
          </div>

          {/* Feature Comparison */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl font-medium text-center mb-10">
              Compare Plans
            </h2>
            
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1a1a1a]">
                    <th className="text-left p-4 text-gray-400 font-normal">Feature</th>
                    <th className="p-4 text-center">Free</th>
                    <th className="p-4 text-center text-amber-400">Pro</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-[#1a1a1a]">
                    <td className="p-4 text-gray-300">SVG Export</td>
                    <td className="p-4 text-center text-green-400">Unlimited</td>
                    <td className="p-4 text-center text-green-400">Unlimited</td>
                  </tr>
                  <tr className="border-b border-[#1a1a1a]">
                    <td className="p-4 text-gray-300">PNG Export</td>
                    <td className="p-4 text-center text-green-400">Unlimited</td>
                    <td className="p-4 text-center text-green-400">Unlimited</td>
                  </tr>
                  <tr className="border-b border-[#1a1a1a]">
                    <td className="p-4 text-gray-300">DXF Export (CAD)</td>
                    <td className="p-4 text-center text-gray-500">—</td>
                    <td className="p-4 text-center text-green-400">✓</td>
                  </tr>
                  <tr className="border-b border-[#1a1a1a]">
                    <td className="p-4 text-gray-300">3D Models (3DM/DAE/GLB/STL)</td>
                    <td className="p-4 text-center text-gray-500">—</td>
                    <td className="p-4 text-center text-green-400">✓</td>
                  </tr>
                  <tr className="border-b border-[#1a1a1a]">
                    <td className="p-4 text-gray-300">All 34 Themes</td>
                    <td className="p-4 text-center text-green-400">✓</td>
                    <td className="p-4 text-center text-green-400">✓</td>
                  </tr>
                  <tr className="border-b border-[#1a1a1a]">
                    <td className="p-4 text-gray-300">Color Customization</td>
                    <td className="p-4 text-center text-green-400">✓</td>
                    <td className="p-4 text-center text-green-400">✓</td>
                  </tr>
                  <tr className="border-b border-[#1a1a1a]">
                    <td className="p-4 text-gray-300">Topographic Contours</td>
                    <td className="p-4 text-center text-green-400">✓</td>
                    <td className="p-4 text-center text-green-400">✓</td>
                  </tr>
                  <tr className="border-b border-[#1a1a1a]">
                    <td className="p-4 text-gray-300">3D Terrain Elevation</td>
                    <td className="p-4 text-center text-gray-500">—</td>
                    <td className="p-4 text-center text-green-400">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-300">Commercial License</td>
                    <td className="p-4 text-center text-gray-500">Personal only</td>
                    <td className="p-4 text-center text-green-400">Full commercial</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-8">
              Secure payments powered by Lemon Squeezy. VAT may apply.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Secure Checkout
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Money Back Guarantee
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Instant Access
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl font-medium text-center mb-10">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  q: 'Is the free plan really free forever?',
                  a: 'Yes! SVG and PNG exports are completely free with no limits. Create as many maps as you want.'
                },
                {
                  q: 'What\'s included in the DXF export?',
                  a: 'Professional DXF files with organized layers for buildings, roads, water, green areas, and contours. Fully compatible with AutoCAD, Rhino, and other CAD software.'
                },
                {
                  q: 'What 3D formats do you support?',
                  a: 'We export 3DM (Rhino), DAE (SketchUp), GLB (Blender), and STL (for 3D printing). All include real terrain elevation data.'
                },
                {
                  q: 'Can I cancel my Pro subscription?',
                  a: 'Yes, you can cancel anytime. Your access continues until the end of your billing period.'
                },
                {
                  q: 'Can I use the maps commercially?',
                  a: 'Free plan is for personal use only. Pro includes full commercial license for client projects, publications, and products.'
                }
              ].map((faq, i) => (
                <div key={i} className="border-b border-[#1a1a1a] pb-6">
                  <h3 className="font-medium mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 ArchiKEK. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
