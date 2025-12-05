'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
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

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  const handlePurchase = async (variantId: string | undefined, planType: string) => {
    // Check if user is logged in
    if (!user) {
      router.push('/login')
      return
    }

    if (!variantId) {
      setError('Product configuration error. Please try again later.')
      return
    }

    setLoading(planType)
    setError('')

    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId }),
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
            Try Demo
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-amber-500 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              Pricing
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-gray-400 text-lg">
              Start with credits or go unlimited with Pro. No hidden fees.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Starter Pack */}
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 hover:border-[#333] transition-all flex flex-col">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-1">Starter Pack</h3>
                <p className="text-gray-500 text-sm">5 Map Credits</p>
              </div>
              
              <div className="mb-8">
                <span className="font-serif text-5xl font-medium">$15</span>
                <span className="text-gray-500 text-lg ml-2">one-time</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  '5 Map Downloads',
                  'All 12 Analysis Themes',
                  'Full Color Customization',
                  'SVG Export (Illustrator-ready)',
                  'Commercial License',
                  'Credits Never Expire'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <span className="text-green-500 flex-shrink-0"><CheckIcon /></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(process.env.NEXT_PUBLIC_LEMONSQUEEZY_CREDITS_VARIANT_ID, 'credits')}
                disabled={loading === 'credits'}
                className="w-full py-4 bg-[#1a1a1a] text-white rounded-xl font-medium hover:bg-[#222] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading === 'credits' ? (
                  <>
                    <LoaderIcon />
                    Processing...
                  </>
                ) : (
                  'Buy Credits'
                )}
              </button>
            </div>

            {/* Pro Subscription */}
            <div className="bg-[#0a0a0a] border-2 border-amber-500 rounded-2xl p-8 relative flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                Best Value
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-1">Pro</h3>
                <p className="text-gray-500 text-sm">Unlimited maps</p>
              </div>
              
              <div className="mb-8">
                <span className="font-serif text-5xl font-medium">$19</span>
                <span className="text-gray-500 text-lg ml-2">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  'Unlimited Map Downloads',
                  'All Premium Themes',
                  'Advanced Customization',
                  'Priority Support',
                  'Early Access to New Features',
                  'Cancel Anytime'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <span className="text-amber-500 flex-shrink-0"><CheckIcon /></span>
                    {feature}
                  </li>
                ))}
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
                  'Subscribe Now'
                )}
              </button>
            </div>
          </div>

          {/* FAQ / Trust signals */}
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
                  q: 'What do I get with each map credit?',
                  a: 'Each credit allows you to generate and download one SVG map with all customization options, any theme, and full commercial license.'
                },
                {
                  q: 'Do credits expire?',
                  a: 'No! Your credits never expire. Use them whenever you need them.'
                },
                {
                  q: 'Can I cancel my Pro subscription?',
                  a: 'Yes, you can cancel anytime. Your access continues until the end of your billing period.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, PayPal, and Apple Pay through our secure payment provider.'
                },
                {
                  q: 'Can I use the maps commercially?',
                  a: 'Yes! All plans include a commercial license. Use your maps in client presentations, publications, and projects.'
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
