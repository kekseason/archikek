import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type Profile = {
  id: string
  email: string
  credits: number
  is_pro: boolean
  pro_expires_at: string | null
  created_at: string
  updated_at: string
}

export type Payment = {
  id: string
  user_id: string
  lemon_order_id: string
  variant_id: string
  amount: number
  currency: string
  status: string
  created_at: string
}

export type MapDownload = {
  id: string
  user_id: string
  theme: string
  location: string
  size: number
  created_at: string
}
