import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { variantId } = await request.json()

    if (!variantId) {
      return NextResponse.json({ error: 'Variant ID required' }, { status: 400 })
    }

    const API_KEY = process.env.LEMONSQUEEZY_API_KEY
    const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID

    if (!API_KEY || !STORE_ID) {
      console.error('Missing Lemon Squeezy credentials')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

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
              custom: {
                // Add user_id here later for tracking
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
