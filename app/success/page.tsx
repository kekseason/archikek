'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { trackCompletePayment } from '@/lib/tiktok'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [tracked, setTracked] = useState(false)

  useEffect(() => {
    if (!tracked) {
      // Get price from URL params if available, otherwise use default
      const priceParam = searchParams.get('price')
      const price = priceParam ? parseFloat(priceParam) : 14.99
      const planType = searchParams.get('plan') || 'credits'
      
      trackCompletePayment(price, 'USD', planType === 'subscription' ? 'ArchiKEK Pro' : 'ArchiKEK Credits')
      setTracked(true)
    }
  }, [searchParams, tracked])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-6">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <Image src="/logo.png" alt="ArchiKEK" width={40} height={40} className="rounded-lg" />
          <span className="text-xl font-semibold">
            <span className="text-amber-500">Archi</span>KEK
          </span>
        </Link>

        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">
          Thank you for your purchase. Your credits have been added to your account and you're ready to create amazing maps.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/create"
            className="w-full py-3 bg-amber-500 text-black rounded-xl font-semibold hover:bg-amber-400 transition-colors"
          >
            Start Creating Maps →
          </Link>
          <Link
            href="/"
            className="w-full py-3 bg-[#1a1a1a] border border-[#333] text-white rounded-xl font-medium hover:bg-[#222] transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Support */}
        <p className="text-gray-600 text-sm mt-8">
          Need help? Contact us at{' '}
          <a href="mailto:support@archikek.com" className="text-amber-500 hover:underline">
            support@archikek.com
          </a>
        </p>
      </div>
    </div>
  )
}
