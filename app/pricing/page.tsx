import { headers } from 'next/headers'
import PricingClient from './pricing-client'
import { getDiscountForCountry } from '@/lib/regional-discounts'

export const metadata = {
  title: 'Pricing - ArchiKEK',
  description: 'Simple, transparent pricing for architectural urban analysis maps'
}

export default function PricingPage() {
  const headersList = headers()
  const country = headersList.get('x-vercel-ip-country') || ''
  const discount = getDiscountForCountry(country)

  return <PricingClient discount={discount} />
}
