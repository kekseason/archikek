import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.text();
    const signature = request.headers.get('x-signature') || '';
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (webhookSecret && !verifySignature(body, signature, webhookSecret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);
    const eventName = event.meta?.event_name;
    const data = event.data?.attributes;

    if (eventName === 'order_created') {
      const email = data?.user_email;
      const variantId = event.data?.relationships?.variant?.data?.id;
      const orderId = event.data?.id;
      const amount = data?.total;

      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (!profile) {
        return NextResponse.json({ message: 'User not found' });
      }

      const creditsVariantId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CREDITS_VARIANT_ID;
      const subscriptionVariantId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_SUBSCRIPTION_VARIANT_ID;

      if (variantId === creditsVariantId) {
        await supabaseAdmin
          .from('profiles')
          .update({ credits: profile.credits + 5, updated_at: new Date().toISOString() })
          .eq('id', profile.id);
      }

      if (variantId === subscriptionVariantId) {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        await supabaseAdmin
          .from('profiles')
          .update({ is_pro: true, pro_expires_at: expiresAt.toISOString(), updated_at: new Date().toISOString() })
          .eq('id', profile.id);
      }

      await supabaseAdmin.from('payments').insert({
        user_id: profile.id,
        lemon_order_id: orderId,
        variant_id: variantId,
        amount: amount,
        status: 'completed'
      });

      return NextResponse.json({ success: true });
    }

    if (eventName === 'subscription_payment_success') {
      const email = data?.user_email;
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (profile) {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        await supabaseAdmin
          .from('profiles')
          .update({ is_pro: true, pro_expires_at: expiresAt.toISOString(), updated_at: new Date().toISOString() })
          .eq('id', profile.id);
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ message: 'Event received' });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
