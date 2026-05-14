/**
 * 🔹 Task 17.2: Fetch Posts with Loading/Error States
 */
import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

function PostList({ limit = 10 }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
      )
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }
      
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    const loadPosts = async () => {
      await fetchPosts()
    }
    loadPosts()
  }, [limit])
  
  if (loading) return <LoadingSpinner text="Loading posts..." />
  if (error) return <ErrorMessage message={error} onRetry={fetchPosts} />
  
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📝 Recent Posts</h3>
      <div style={styles.list}>
        {posts.map(post => (
          <article key={post.id} style={styles.card}>
            <h4 style={styles.postTitle}>{post.title}</h4>
            <p style={styles.excerpt}>{post.body.slice(0, 100)}...</p>
            <span style={styles.id}>Post #{post.id}</span>
          </article>
        ))}
      </div>
      <button style={styles.refresh} onClick={fetchPosts}>
        🔄 Refresh Posts
      </button>
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
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem'
  },
  card: {
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0'
  },
  postTitle: {
    margin: '0 0 0.5rem 0',
    color: '#1e293b',
    fontSize: '1rem'
  },
  excerpt: {
    margin: '0 0 0.5rem 0',
    color: '#64748b',
    fontSize: '0.875rem',
    lineHeight: '1.4'
  },
  id: {
    fontSize: '0.75rem',
    color: '#94a3b8'
  },
  refresh: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#64748b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
  }
}

export default PostList