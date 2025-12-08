import { NextRequest, NextResponse } from 'next/server'
import { REGIONAL_DISCOUNTS } from '@/lib/regional-discounts'

export async function POST(request: NextRequest) {
  try {
    const { variantId, userId, userEmail } = await request.json()
    
    // Get country from Vercel's geo header
    const country = request.headers.get('x-vercel-ip-country') || ''
    const discount = REGIONAL_DISCOUNTS[country]
    
    const checkoutData: any = {
      email: userEmail,
      custom: {
        user_id: userId
      }
    }
    
    // Add discount code if applicable
    if (discount) {
      checkoutData.discount_code = discount.code
    }
    
    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: checkoutData
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: process.env.LEMON_SQUEEZY_STORE_ID
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
      console.error('Lemon Squeezy error:', data)
      return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
    }

    return NextResponse.json({ 
      checkoutUrl: data.data.attributes.url,
      discountApplied: discount ? discount.code : null
    })
  } catch (error) {
    console.error('Purchase error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
