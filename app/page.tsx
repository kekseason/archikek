import { headers } from 'next/headers'
import HomeClient from './home-client'
import { getDiscountForCountry } from '@/lib/regional-discounts'

export default function Home() {
  const headersList = headers()
  const country = headersList.get('x-vercel-ip-country') || ''
  const discount = getDiscountForCountry(country)

  return <HomeClient discount={discount} country={country} />
}
