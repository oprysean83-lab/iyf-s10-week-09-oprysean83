/**
 * 🟡 Day 2: API Search with Debouncing
 */
import { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Input, Card } from '../../components/shared'
import LoadingSpinner from '../Lesson17/LoadingSpinner'

function APISearch() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  
  // Debounce: wait 300ms after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)
    
    return () => clearTimeout(handler)
  }, [query])
  
  // Fetch users when debounced query changes
  const {  users, loading } = useFetch(
    debouncedQuery 
      ? `https://jsonplaceholder.typicode.com/users?name_like=${debouncedQuery}`
      : null
  )
  
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🔍 User Search</h3>
      
      <Input
        placeholder="Search users by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {loading && query && <LoadingSpinner size="small" />}
      
      {!loading && debouncedQuery && users?.length === 0 && (
        <p style={styles.empty}>No users found for "{debouncedQuery}"</p>
      )}
      
      {!loading && users?.length > 0 && (
        <div style={styles.results}>
          {users.map(user => (
            <Card key={user.id} className="mb-2">
              <strong>{user.name}</strong>
              <p style={styles.email}>{user.email}</p>
              <p style={styles.company}>{user.company.name}</p>
            </Card>
          ))}
        </div>
      )}
      
      {!debouncedQuery && (
        <p style={styles.hint}>💡 Type a name to search users</p>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  title: {
    margin: '0 0 1rem 0',
    color: '#1e293b'
  },
  empty: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: '1rem'
  },
  results: {
    marginTop: '1rem'
  },
  email: {
    margin: '0.25rem 0',
    color: '#64748b',
    fontSize: '0.875rem'
  },
  company: {
    margin: '0.25rem 0 0 0',
    color: '#475569',
    fontSize: '0.875rem'
  },
  hint: {
    textAlign: 'center',
    color: '#94a3b8',
    fontStyle: 'italic',
    marginTop: '1rem'
  }
}

export default APISearch