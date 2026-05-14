/**
 * Custom Hook: useAuth
 * Provides authenticated user context with error handling.
 */
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextValue'

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error(
      'useAuth must be used within an AuthProvider. ' +
      'Ensure <AuthProvider> wraps your app in main.jsx'
    )
  }

  return context
}
