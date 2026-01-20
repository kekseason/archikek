'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react'
import { supabase, Profile, getSessionWithRetry } from './supabase'
import { User, Session } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  profile: Profile | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithMicrosoft: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>
  signUpWithEmail: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Debug logger
const log = (msg: string, data?: any) => {
  if (typeof window !== 'undefined') {
    console.log(`[AUTH ${new Date().toISOString().slice(11, 19)}] ${msg}`, data || '')
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const initialized = useRef(false)
  const fetchingProfile = useRef(false)

  // Fetch profile with retry logic
  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    if (fetchingProfile.current) {
      log('Profile fetch already in progress, skipping')
      return null
    }
    
    fetchingProfile.current = true
    log('Fetching profile for:', userId)
    
    try {
      // Try up to 3 times
      for (let attempt = 1; attempt <= 3; attempt++) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()
        
        if (data && !error) {
          log('Profile fetched successfully:', { email: data.email, is_pro: data.is_pro })
          setProfile(data)
          fetchingProfile.current = false
          return data
        }
        
        if (error) {
          log(`Profile fetch attempt ${attempt} failed:`, error.message)
          if (attempt < 3) {
            await new Promise(r => setTimeout(r, 200 * attempt))
          }
        }
      }
      
      log('All profile fetch attempts failed')
      fetchingProfile.current = false
      return null
    } catch (e) {
      log('Profile fetch exception:', e)
      fetchingProfile.current = false
      return null
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }, [user, fetchProfile])

  const refreshSession = useCallback(async () => {
    log('Manually refreshing session...')
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession()
      if (session?.user) {
        log('Session refreshed:', session.user.email)
        setUser(session.user)
        await fetchProfile(session.user.id)
      } else if (error) {
        log('Session refresh error:', error.message)
      }
    } catch (e) {
      log('Session refresh exception:', e)
    }
  }, [fetchProfile])

  // Initialize session
  useEffect(() => {
    // Prevent double initialization
    if (initialized.current) {
      log('Already initialized, skipping')
      return
    }
    initialized.current = true
    
    log('Initializing auth...')

    const initializeAuth = async () => {
      try {
        // Method 1: Try getSession
        log('Trying getSession...')
        let session = await getSessionWithRetry(3)
        
        // Method 2: If no session, try to get from URL hash (OAuth callback)
        if (!session && typeof window !== 'undefined') {
          const hash = window.location.hash
          if (hash && (hash.includes('access_token') || hash.includes('refresh_token'))) {
            log('Found tokens in URL hash, processing...')
            const hashParams = new URLSearchParams(hash.substring(1))
            const accessToken = hashParams.get('access_token')
            const refreshToken = hashParams.get('refresh_token')
            
            if (accessToken && refreshToken) {
              const { data, error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
              })
              if (data.session) {
                session = data.session
                log('Session set from URL hash')
                // Clean up URL
                window.history.replaceState(null, '', window.location.pathname)
              } else if (error) {
                log('Error setting session from hash:', error.message)
              }
            }
          }
        }
        
        // Method 3: Check URL for code parameter (PKCE flow)
        if (!session && typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search)
          const code = urlParams.get('code')
          if (code) {
            log('Found code in URL, exchanging...')
            const { data, error } = await supabase.auth.exchangeCodeForSession(code)
            if (data.session) {
              session = data.session
              log('Session set from code exchange')
              // Clean up URL
              window.history.replaceState(null, '', window.location.pathname)
            } else if (error) {
              log('Error exchanging code:', error.message)
            }
          }
        }

        // Set user and fetch profile if we have a session
        if (session?.user) {
          log('Session found:', session.user.email)
          setUser(session.user)
          await fetchProfile(session.user.id)
        } else {
          log('No session found')
        }
      } catch (e) {
        log('Init error:', e)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        log('Auth state change:', { event, user: session?.user?.email || 'no user' })
        
        switch (event) {
          case 'SIGNED_IN':
            if (session?.user) {
              setUser(session.user)
              await fetchProfile(session.user.id)
            }
            break
            
          case 'SIGNED_OUT':
            setUser(null)
            setProfile(null)
            break
            
          case 'TOKEN_REFRESHED':
            if (session?.user) {
              log('Token refreshed, updating user')
              setUser(session.user)
            }
            break
            
          case 'USER_UPDATED':
            if (session?.user) {
              setUser(session.user)
              await fetchProfile(session.user.id)
            }
            break

          case 'INITIAL_SESSION':
            // Already handled in initializeAuth
            break
        }
      }
    )

    return () => {
      log('Cleaning up auth subscription')
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  // Periodic session check (every 5 minutes)
  useEffect(() => {
    if (!user) return
    
    const interval = setInterval(async () => {
      log('Periodic session check...')
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        log('Session lost during periodic check!')
        setUser(null)
        setProfile(null)
      }
    }, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [user])

  // Visibility change handler - refresh on tab focus
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && user) {
        log('Tab became visible, checking session...')
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          log('Session lost while tab was hidden, attempting refresh...')
          await refreshSession()
        }
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [user, refreshSession])

  const signInWithGoogle = async () => {
    log('Signing in with Google...')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
    if (error) log('Google sign in error:', error.message)
  }

  const signInWithMicrosoft = async () => {
    log('Signing in with Microsoft...')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'email profile openid'
      }
    })
    if (error) log('Microsoft sign in error:', error.message)
  }

  const signInWithEmail = async (email: string, password: string) => {
    log('Signing in with email:', email)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) log('Email sign in error:', error.message)
    return { error: error?.message ?? null }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    log('Signing up with email:', email)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    if (error) log('Email sign up error:', error.message)
    return { error: error?.message ?? null }
  }

  const signOut = async () => {
    log('Signing out...')
    
    // Clear local state first
    setUser(null)
    setProfile(null)
    
    // Clear all storage
    if (typeof window !== 'undefined') {
      try {
        // Clear Supabase specific keys
        const keysToRemove = Object.keys(localStorage).filter(
          key => key.startsWith('sb-') || key.includes('supabase') || key.includes('archikek-auth')
        )
        keysToRemove.forEach(key => {
          localStorage.removeItem(key)
          sessionStorage.removeItem(key)
        })
      } catch (e) {
        log('Error clearing storage:', e)
      }
    }
    
    // Sign out from Supabase
    await supabase.auth.signOut()
    
    // Force redirect to home
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
