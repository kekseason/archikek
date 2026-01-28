'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { supabase, Profile } from './supabase'
import { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  profile: Profile | null
  loading: boolean
  signInWithGoogle: (returnTo?: string) => Promise<void>
  signInWithMicrosoft: (returnTo?: string) => Promise<void>
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
    console.log('[AUTH] Initializing...')
    
    const safetyTimeout = setTimeout(() => {
      setLoading(false)
    }, 3000)

    // Check for OAuth callback tokens in URL (when /create is used as callback)
    const processOAuthCallback = async () => {
      if (typeof window === 'undefined') return false
      
      const hash = window.location.hash
      const search = window.location.search
      
      // Check hash for tokens
      if (hash && hash.includes('access_token')) {
        console.log('[AUTH] Found tokens in URL hash')
        const hashParams = new URLSearchParams(hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        
        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          
          if (data.session) {
            console.log('[AUTH] Session set from hash:', data.session.user.email)
            // Clean URL
            window.history.replaceState(null, '', window.location.pathname)
            return true
          }
          if (error) console.error('[AUTH] setSession error:', error)
        }
      }
      
      // Check for code in URL
      if (search && search.includes('code=')) {
        console.log('[AUTH] Found code in URL')
        const urlParams = new URLSearchParams(search)
        const code = urlParams.get('code')
        
        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          
          if (data.session) {
            console.log('[AUTH] Session from code:', data.session.user.email)
            // Clean URL
            window.history.replaceState(null, '', window.location.pathname)
            return true
          }
          if (error) console.error('[AUTH] exchangeCode error:', error)
        }
      }
      
      return false
    }

    const init = async () => {
      // First try to process OAuth callback
      await processOAuthCallback()
      
      // Then get session
      const { data: { session } } = await supabase.auth.getSession()
      console.log('[AUTH] Session:', session?.user?.email || 'none')
      
      if (session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id)
      }
      
      setLoading(false)
      clearTimeout(safetyTimeout)
    }
    
    init()

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

  // returnTo parametresi ile doğrudan o sayfaya dön
  const signInWithGoogle = async (returnTo?: string) => {
    const redirectUrl = returnTo || window.location.href
    console.log('[AUTH] Google sign in, redirect to:', redirectUrl)
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl
      }
    })
    if (error) console.error('[AUTH] Google error:', error)
  }

  const signInWithMicrosoft = async (returnTo?: string) => {
    const redirectUrl = returnTo || window.location.href
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: redirectUrl,
        scopes: 'email profile openid'
      }
    })
    if (error) console.error('[AUTH] Microsoft error:', error)
  }

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.href }
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
