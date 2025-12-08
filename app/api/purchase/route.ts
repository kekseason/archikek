import { NextRequest, NextResponse } from 'next/server';
import { rateLimiters, getIP } from '@/lib/rate-limit';

// Regional discount codes - must match Lemon Squeezy exactly!
const REGIONAL_DISCOUNTS: Record<string, string> = {
  'TR': 'TR60',    // Turkey - 60% off
  'IN': 'IN50',    // India - 50% off
  'BR': 'BR50',    // Brazil - 50% off
  'PK': 'PK50',    // Pakistan - 50% off
  'EG': 'EG50',    // Egypt - 50% off
  'ID': 'ID50',    // Indonesia - 50% off
  'PH': 'PH50',    // Philippines - 50% off
  'NG': 'NG60',    // Nigeria - 60% off
  'MX': 'MX30',    // Mexico - 30% off
  'BD': 'BD50',    // Bangladesh - 50% off
  'PL': 'PL30',    // Poland - 30% off
  'AZ': 'AZ50',    // Azerbaijan - 50% off
  'ZA': 'ZA50',    // South Africa - 50% off
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = getIP(request);
    const { success: rateLimitOk } = await rateLimiters.purchase.limit(ip);
    
    if (!rateLimitOk) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const { variantId } = await request.json();

    if (!variantId) {
      return NextResponse.json({ error: 'Variant ID required' }, { status: 400 })
    }

    const API_KEY = process.env.LEMONSQUEEZY_API_KEY
    const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID

    if (!API_KEY || !STORE_ID) {
      console.error('Missing Lemon Squeezy credentials')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Get country from Vercel header
    const country = request.headers.get('x-vercel-ip-country') || '';
    const discountCode = REGIONAL_DISCOUNTS[country] || null;

    // Create checkout session with Lemon Squeezy
    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              discount_code: discountCode,
              custom: {
                country: country,
              }
            },
            product_options: {
              redirect_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://archikek.com'}/create?success=true`,
            }
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: STORE_ID
              }
            },
            variant: {
              data: {
                type: 'variants',
                id: variantId
              }
            }
          }
        }
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Lemon Squeezy API error:', data)
      return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
    }

    const checkoutUrl = data.data?.attributes?.url

    if (!checkoutUrl) {
      return NextResponse.json({ error: 'No checkout URL returned' }, { status: 500 })
    }

    return NextResponse.json({ checkoutUrl })

  } catch (error) {
    console.error('Purchase error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
