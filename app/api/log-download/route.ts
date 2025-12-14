import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimiters, getIP } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = getIP(request);
    const { success: rateLimitOk, remaining } = await rateLimiters.mapGeneration.limit(ip);
    
    if (!rateLimitOk) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429, headers: { 'X-RateLimit-Remaining': remaining.toString() } }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { userId, theme, location, size, format } = await request.json();

    // Log the download (analytics only)
    if (userId) {
      await supabaseAdmin.from('map_downloads').insert({
        user_id: userId,
        theme,
        location,
        size,
        format: format || 'unknown'
      })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Log download error:', error)
    // Don't fail the request if logging fails
    return NextResponse.json({ success: true })
  }
}
