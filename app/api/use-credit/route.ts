import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    const { userId, theme, location, size } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const isPro = profile.is_pro && 
      profile.pro_expires_at && 
      new Date(profile.pro_expires_at) > new Date()

    if (isPro) {
      await supabaseAdmin.from('map_downloads').insert({
        user_id: userId, theme, location, size
      })
      return NextResponse.json({ success: true, credits: 'unlimited', isPro: true })
    }

    if (profile.credits <= 0) {
      return NextResponse.json({ error: 'No credits remaining', credits: 0 }, { status: 403 })
    }

    await supabaseAdmin
      .from('profiles')
      .update({ credits: profile.credits - 1, updated_at: new Date().toISOString() })
      .eq('id', userId)

    await supabaseAdmin.from('map_downloads').insert({
      user_id: userId, theme, location, size
    })

    return NextResponse.json({ success: true, credits: profile.credits - 1, isPro: false })

  } catch (error) {
    console.error('Use credit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
