import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton pattern - tek bir client instance
let supabaseInstance: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance
  }
  
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      storageKey: 'archikek-auth',
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    }
  })
  
  return supabaseInstance
}

export const supabase = getSupabaseClient()

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
