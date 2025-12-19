import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

// Verify webhook signature
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    const body = await request.text()
    const signature = request.headers.get('x-signature') || ''
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET

    // Verify signature if secret is set
    if (webhookSecret && !verifySignature(body, signature, webhookSecret)) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    const eventName = event.meta?.event_name
    const data = event.data?.attributes

    console.log('Webhook received:', eventName)

    // Handle order completed (credit purchase)
    if (eventName === 'order_created') {
      const email = data?.user_email
      const variantId = event.data?.relationships?.variant?.data?.id
      const orderId = event.data?.id
      const amount = data?.total

      console.log('Order created:', { email, variantId, orderId })

      // Find user by email
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single()

      if (profileError || !profile) {
        console.error('User not found:', email)
        // Store for later? Or create pending credit
        return NextResponse.json({ message: 'User not found, order logged' })
      }

      // Determine credits to add based on variant
      const creditsVariantId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CREDITS_VARIANT_ID
      const subscriptionVariantId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_SUBSCRIPTION_VARIANT_ID
      const unlimitedSvgVariantId = process.env.LEMON_SQUEEZY_UNLIMITED_SVG_VARIANT_ID

      let creditsToAdd = 0
      let isPro = false
      let isUnlimitedSvg = false

      if (variantId === creditsVariantId) {
        creditsToAdd = 5 // Starter pack = 5 credits
      } else if (variantId === subscriptionVariantId) {
        isPro = true // Pro subscription
      } else if (variantId === unlimitedSvgVariantId) {
        isUnlimitedSvg = true // Unlimited SVG+DXF subscription
      }

      // Update user profile
      if (creditsToAdd > 0) {
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({ 
            credits: profile.credits + creditsToAdd,
            updated_at: new Date().toISOString()
          })
          .eq('id', profile.id)

        if (updateError) {
          console.error('Failed to add credits:', updateError)
          return NextResponse.json({ error: 'Failed to add credits' }, { status: 500 })
        }

        console.log(`Added ${creditsToAdd} credits to user ${profile.id}`)
      }

      if (isPro) {
        // Set pro status for 1 month
        const expiresAt = new Date()
        expiresAt.setMonth(expiresAt.getMonth() + 1)

        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({ 
            is_pro: true,
            pro_expires_at: expiresAt.toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', profile.id)

        if (updateError) {
          console.error('Failed to set pro status:', updateError)
          return NextResponse.json({ error: 'Failed to set pro status' }, { status: 500 })
        }

        console.log(`Set pro status for user ${profile.id}`)
      }

      if (isUnlimitedSvg) {
        // Set unlimited SVG status for 1 month
        const expiresAt = new Date()
        expiresAt.setMonth(expiresAt.getMonth() + 1)

        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({ 
            has_unlimited_svg: true,
            unlimited_svg_expires_at: expiresAt.toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', profile.id)

        if (updateError) {
          console.error('Failed to set unlimited SVG status:', updateError)
          return NextResponse.json({ error: 'Failed to set unlimited SVG status' }, { status: 500 })
        }

        console.log(`Set unlimited SVG status for user ${profile.id}`)
      }

      // Log payment
      await supabaseAdmin.from('payments').insert({
        user_id: profile.id,
        lemon_order_id: orderId,
        variant_id: variantId,
        amount: amount,
        status: 'completed'
      })

      return NextResponse.json({ success: true })
    }

    // Handle subscription payment (monthly renewal)
    if (eventName === 'subscription_payment_success') {
      const email = data?.user_email
      const variantId = event.data?.relationships?.variant?.data?.id
      const subscriptionVariantId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_SUBSCRIPTION_VARIANT_ID
      const unlimitedSvgVariantId = process.env.LEMON_SQUEEZY_UNLIMITED_SVG_VARIANT_ID
      
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single()

      if (profile) {
        const expiresAt = new Date()
        expiresAt.setMonth(expiresAt.getMonth() + 1)

        if (variantId === subscriptionVariantId) {
          // Extend pro status by 1 month
          await supabaseAdmin
            .from('profiles')
            .update({ 
              is_pro: true,
              pro_expires_at: expiresAt.toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', profile.id)

          console.log(`Extended pro status for user ${profile.id}`)
        } else if (variantId === unlimitedSvgVariantId) {
          // Extend unlimited SVG status by 1 month
          await supabaseAdmin
            .from('profiles')
            .update({ 
              has_unlimited_svg: true,
              unlimited_svg_expires_at: expiresAt.toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', profile.id)

          console.log(`Extended unlimited SVG status for user ${profile.id}`)
        }
      }

      return NextResponse.json({ success: true })
    }

    // Handle subscription cancelled
    if (eventName === 'subscription_cancelled') {
      const email = data?.user_email
      
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single()

      if (profile) {
        // Don't remove pro immediately, let it expire
        console.log(`Subscription cancelled for user ${profile.id}, will expire at ${profile.pro_expires_at}`)
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ message: 'Event received' })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
