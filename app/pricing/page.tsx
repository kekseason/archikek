import { headers } from 'next/headers'
import PricingClient from './pricing-client'
import { getDiscountForCountry } from '@/lib/regional-discounts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for ArchiKEK. PNG exports free forever. Pro subscription for SVG, DXF and 3D exports.',
  openGraph: {
    title: 'Pricing | ArchiKEK',
    description: 'PNG free forever. Pro for SVG, DXF and 3D exports.',
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
