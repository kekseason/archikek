import { NextRequest, NextResponse } from 'next/server'
import { getDiscountForCountry } from '@/lib/regional-discounts'

export async function POST(request: NextRequest) {
  try {
    const { variantId, userId, userEmail, planType } = await request.json()
    
    if (!userEmail) {
      return NextResponse.json({ error: 'User email required' }, { status: 400 })
    }
    
    // Get country from Vercel's geo header
    const country = request.headers.get('x-vercel-ip-country') || ''
    const discount = getDiscountForCountry(country)
    
    // Calculate price for success page tracking
    const basePrice = planType === 'subscription' ? 18.99 : 14.99
    const finalPrice = discount ? (basePrice * (1 - discount.percent / 100)).toFixed(2) : basePrice.toFixed(2)
    
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
    
    // Success redirect URL with tracking params
    const successUrl = `https://archikek.com/success?plan=${planType || 'credits'}&price=${finalPrice}`
    
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
            checkout_data: checkoutData,
            checkout_options: {
              embed: false,
              media: false,
              button_color: '#f59e0b'
            },
            product_options: {
              redirect_url: successUrl,
              enabled_variants: [variantId]
            },
            preview: true
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
