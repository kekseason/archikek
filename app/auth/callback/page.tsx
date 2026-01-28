'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get session from URL
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('[CALLBACK] Error:', error)
          router.push('/login')
          return
        }

        if (session) {
          console.log('[CALLBACK] Session found:', session.user.email)
          
          // Check for return URL
          const returnUrl = localStorage.getItem('archikek_return_url')
          localStorage.removeItem('archikek_return_url')
          
          router.push(returnUrl || '/create')
        } else {
          console.log('[CALLBACK] No session')
          router.push('/login')
        }
      } catch (e) {
        console.error('[CALLBACK] Exception:', e)
        router.push('/login')
      }
    }

    // Small delay to let Supabase process the callback
    setTimeout(handleCallback, 100)
  }, [router])

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Signing you in...</p>
      </div>
    </div>
  )
}
