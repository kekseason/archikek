import { headers } from 'next/headers'
import PricingClient from './pricing-client'
import { getDiscountForCountry } from '@/lib/regional-discounts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for ArchiKEK site analysis maps. Start free with 1 credit. 5 maps for $15 or unlimited Pro access. Student discounts available.',
  openGraph: {
    title: 'Pricing | ArchiKEK',
    description: 'Start free, pay as you go. 5 maps for $15 or unlimited Pro access.',
    url: 'https://archikek.com/pricing',
  },
  alternates: {
    canonical: 'https://archikek.com/pricing',
  },
}

export default function PricingPage() {
  const headersList = headers()
  const country = headersList.get('x-vercel-ip-country') || ''
  const discount = getDiscountForCountry(country)

  return <PricingClient discount={discount} country={country} />
}
