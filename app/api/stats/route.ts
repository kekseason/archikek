// app/api/stats/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Başlangıç offset - bu sayı üzerine gerçek indirmeler eklenir
const BASE_OFFSET = 7500;

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      // Supabase yoksa sadece offset döndür
      return NextResponse.json({ 
        maps_created: BASE_OFFSET,
        success: true 
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey!);

    // Toplam indirme sayısını al
    const { count, error } = await supabase
      .from('map_downloads')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Stats error:', error);
      return NextResponse.json({ 
        maps_created: BASE_OFFSET,
        success: true 
      });
    }

    const realCount = count || 0;
    const totalCount = BASE_OFFSET + realCount;

    return NextResponse.json({ 
      maps_created: totalCount,
      success: true 
    });

  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ 
      maps_created: BASE_OFFSET,
      success: true 
    });
  }
}
