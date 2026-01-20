import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single instance with proper session handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'archikek-auth-token',
    storage: typeof window !== 'undefined' ? {
      getItem: (key: string) => {
        try {
          const item = window.localStorage.getItem(key)
          // Also try sessionStorage as fallback
          if (!item) {
            return window.sessionStorage.getItem(key)
          }
          return item
        } catch {
          return null
        }
      },
      setItem: (key: string, value: string) => {
        try {
          window.localStorage.setItem(key, value)
          // Also set in sessionStorage as backup
          window.sessionStorage.setItem(key, value)
        } catch {
          // Ignore storage errors
        }
      },
      removeItem: (key: string) => {
        try {
          window.localStorage.removeItem(key)
          window.sessionStorage.removeItem(key)
        } catch {
          // Ignore storage errors
        }
      }
    } : undefined,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Helper to get session with retry
export async function getSessionWithRetry(retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (session) return session
      if (error) console.error(`[Supabase] Session attempt ${i + 1} error:`, error)
      // Small delay before retry
      if (i < retries - 1) await new Promise(r => setTimeout(r, 100 * (i + 1)))
    } catch (e) {
      console.error(`[Supabase] Session attempt ${i + 1} exception:`, e)
    }
  }
  return null
}

// Types
export type Profile = {
  id: string
  email: string
  credits: number
  is_pro: boolean
  pro_expires_at: string | null
  has_unlimited_svg: boolean
  unlimited_svg_expires_at: string | null
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
