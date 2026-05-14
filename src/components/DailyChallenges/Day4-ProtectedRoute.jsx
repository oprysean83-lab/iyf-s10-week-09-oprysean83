/**
 * 🔹 Protected Route - Fixed version
 */
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()
  
  // ✅ Show loading while checking auth (prevents flash of redirect)
  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
        🔐 Verifying access...
      </div>
    )
  }
  
  // ✅ Redirect to login if not authenticated, save return path
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  // ✅ Render children if authenticated
  return children
}

export default ProtectedRoute