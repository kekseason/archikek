import { headers } from 'next/headers'
import CreateClient from './create-client'
import { getDiscountForCountry } from '@/lib/regional-discounts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Site Analysis Map',
  description: 'Generate professional figure ground maps, nolli maps, and urban analysis diagrams. Choose from 24 themes, export to SVG or DXF. Free preview available.',
  openGraph: {
    title: 'Create Site Analysis Map | ArchiKEK',
    description: 'Generate professional architecture maps in seconds. 24 themes, SVG & DXF export.',
    url: 'https://archikek.com/create',
  },
  alternates: {
    canonical: 'https://archikek.com/create',
  },
}

export default function CreatePage() {
  const headersList = headers()
  const country = headersList.get('x-vercel-ip-country') || ''
  const discount = getDiscountForCountry(country)

  return <CreateClient discount={discount} country={country} />
}
