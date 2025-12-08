import { headers } from 'next/headers'
import HomeClient from './home-client'

// Regional discounts - must match Lemon Squeezy!
const REGIONAL_DISCOUNTS: Record<string, { percent: number; name: string }> = {
  'TR': { percent: 60, name: 'Turkey' },
  'IN': { percent: 50, name: 'India' },
  'BR': { percent: 50, name: 'Brazil' },
  'PK': { percent: 50, name: 'Pakistan' },
  'EG': { percent: 50, name: 'Egypt' },
  'ID': { percent: 50, name: 'Indonesia' },
  'PH': { percent: 50, name: 'Philippines' },
  'NG': { percent: 60, name: 'Nigeria' },
  'MX': { percent: 30, name: 'Mexico' },
  'BD': { percent: 50, name: 'Bangladesh' },
  'PL': { percent: 30, name: 'Poland' },
  'AZ': { percent: 50, name: 'Azerbaijan' },
  'ZA': { percent: 50, name: 'South Africa' },
}

export default function Home() {
  const headersList = headers()
  const country = headersList.get('x-vercel-ip-country') || ''
  const discount = REGIONAL_DISCOUNTS[country] || null

  return <HomeClient discount={discount} country={country} />
}
