import { headers } from 'next/headers'
import CreateClient from './create-client'
import { getDiscountForCountry } from '@/lib/regional-discounts'

export default function CreatePage() {
  const headersList = headers()
  const country = headersList.get('x-vercel-ip-country') || ''
  const discount = getDiscountForCountry(country)

  return <CreateClient discount={discount} country={country} />
}
