/**
 * 🔹 Task 17.1: useEffect - Fetch data on mount with dependency
 */
import { useState, useEffect } from 'react'

function UserProfile({ userId = 1 }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    let isMounted = true
    
    async function fetchUser() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        )
        
        if (!response.ok) throw new Error('Failed to fetch user')
        
        const data = await response.json()
        
        // Only update if still mounted (prevents memory leaks)
        if (isMounted) {
          setUser(data)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      }
    }
    
    fetchUser()
    
    // Cleanup function
    return () => {
      isMounted = false
    }
  }, [userId])  // Re-fetch when userId changes
  
  if (loading) return <div style={styles.loading}>🔄 Loading user...</div>
  if (error) return <div style={styles.error}>❌ Error: {error}</div>
  if (!user) return <div style={styles.empty}>No user found</div>
  
  return (
    <div style={styles.card}>
      <div style={styles.avatar}>
        {user.name.charAt(0).toUpperCase()}
      </div>
      <h3 style={styles.name}>{user.name}</h3>
      <p style={styles.username}>@{user.username}</p>
      <p style={styles.email}>📧 {user.email}</p>
      <p style={styles.company}>🏢 {user.company.name}</p>
      <button 
        style={styles.button}
        onClick={() => window.open(`https://jsonplaceholder.typicode.com/users/${userId}`, '_blank')}
      >
        View API Response
      </button>
    </div>
  )
}

const styles = {
  card: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    maxWidth: '300px',
    margin: '0 auto'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 auto 1rem'
  },
  name: {
    margin: '0 0 0.25rem 0',
    color: '#1e293b'
  },
  username: {
    margin: '0 0 0.5rem 0',
    color: '#64748b',
    fontSize: '0.875rem'
  },
  email: {
    margin: '0.25rem 0',
    color: '#475569',
    fontSize: '0.875rem'
  },
  company: {
    margin: '0.25rem 0 1rem 0',
    color: '#475569',
    fontSize: '0.875rem'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#64748b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem'
  },
  loading: {
    padding: '1rem',
    textAlign: 'center',
    color: '#64748b'
  },
  error: {
    padding: '1rem',
    textAlign: 'center',
    color: '#ef4444',
    backgroundColor: '#fef2f2',
    borderRadius: '6px'
  },
  empty: {
    padding: '1rem',
    textAlign: 'center',
    color: '#94a3b8'
  }
}

export default UserProfile