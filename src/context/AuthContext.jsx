/**
 * Auth Context Provider
 * Manages authentication state and persistence.
 */
import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContextValue'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('socialhub_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Failed to load auth state:', error)
        localStorage.removeItem('socialhub_user')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username) => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const userData = {
        id: Date.now(),
        name: username,
        email: `${username.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=3b82f6&color=fff`
      }

      setUser(userData)
      localStorage.setItem('socialhub_user', JSON.stringify(userData))

      return userData
    } catch (error) {
      console.error('Login failed:', error)
      throw new Error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('socialhub_user')
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
