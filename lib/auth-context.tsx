'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { supabase, Profile } from './supabase'
import { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  profile: Profile | null
  loading: boolean
  signInWithGoogle: () => Promise<boolean>
  signInWithMicrosoft: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>
  signUpWithEmail: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (data && !error) {
        setProfile(data)
      }
    } catch (e) {
      console.error('[AUTH] Profile fetch error:', e)
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }, [user, fetchProfile])

  const refreshSession = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id)
      }
    } catch (e) {
      console.error('[AUTH] Session refresh error:', e)
    }
  }, [fetchProfile])

  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      setLoading(false)
    }, 3000)

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        fetchProfile(session.user.id)
      }
      setLoading(false)
      clearTimeout(safetyTimeout)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[AUTH] Event:', event)
        
        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(safetyTimeout)
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  // Popup-based Google OAuth - stays on same page
  const signInWithGoogle = async (): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        // Get OAuth URL without redirecting
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            skipBrowserRedirect: true
          }
        })

        if (error || !data.url) {
          console.error('[AUTH] OAuth URL error:', error)
          resolve(false)
          return
        }

        // Open popup
        const width = 500
        const height = 600
        const left = window.screenX + (window.outerWidth - width) / 2
        const top = window.screenY + (window.outerHeight - height) / 2
        
        const popup = window.open(
          data.url,
          'google-auth',
          `width=${width},height=${height},left=${left},top=${top}`
        )

        if (!popup) {
          console.error('[AUTH] Popup blocked, falling back to redirect')
          window.location.href = data.url
          resolve(false)
          return
        }

        // Poll for popup close
        const pollInterval = setInterval(async () => {
          if (popup.closed) {
            clearInterval(pollInterval)
            
            // Check if we got a session
            const { data: { session } } = await supabase.auth.getSession()
            
            if (session?.user) {
              console.log('[AUTH] Popup login success:', session.user.email)
              setUser(session.user)
              await fetchProfile(session.user.id)
              resolve(true)
            } else {
              console.log('[AUTH] Popup closed without session')
              resolve(false)
            }
          }
        }, 500)

        // Timeout after 5 minutes
        setTimeout(() => {
          clearInterval(pollInterval)
          if (popup && !popup.closed) popup.close()
          resolve(false)
        }, 5 * 60 * 1000)

      } catch (e) {
        console.error('[AUTH] Popup error:', e)
        resolve(false)
      }
    })
  }

  const signInWithMicrosoft = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        skipBrowserRedirect: true,
        scopes: 'email profile openid'
      }
    })
    
    if (data?.url) {
      const width = 500
      const height = 600
      const left = window.screenX + (window.outerWidth - width) / 2
      const top = window.screenY + (window.outerHeight - height) / 2
      window.open(data.url, 'microsoft-auth', `width=${width},height=${height},left=${left},top=${top}`)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    return { error: error?.message ?? null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signInWithGoogle,
      signInWithMicrosoft,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      refreshProfile,
      refreshSession
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
