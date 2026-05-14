/**
 * 🔹 Task 17.3: Dynamic Route with useParams
 */
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoadingSpinner from '../components/Lesson17/LoadingSpinner'
import ErrorMessage from '../components/Lesson17/ErrorMessage'

function PostDetail() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    let isMounted = true
    
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        )
        if (!response.ok) throw new Error('Post not found')
        const data = await response.json()
        
        // Fetch user info too
        const userRes = await fetch(
          `https://jsonplaceholder.typicode.com/users/${data.userId}`
        )
        const userData = await userRes.json()
        
        if (isMounted) {
          setPost({ ...data, author: userData.name })
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      }
    }
    
    fetchPost()
    
    return () => { isMounted = false }
  }, [postId])
  
  if (loading) return <LoadingSpinner text="Loading post..." />
  if (error) return <ErrorMessage message={error} onRetry={() => navigate('/explore')} />
  if (!post) return <ErrorMessage message="Post not found" onRetry={() => navigate('/explore')} />
  
  return (
    <article style={styles.article}>
      <Link to="/explore" style={styles.backLink}>← Back to Explore</Link>
      
      <h1 style={styles.title}>{post.title}</h1>
      
      <div style={styles.meta}>
        <span>By {post.author}</span>
        <span>•</span>
        <span>Post #{post.id}</span>
      </div>
      
      <div style={styles.content}>
        {post.body}
      </div>
      
      <div style={styles.actions}>
        <button style={styles.button} onClick={() => navigate('/explore')}>
          ← All Posts
        </button>
        <button style={{...styles.button, ...styles.primary}} onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          alert('Link copied!')
        }}>
          🔗 Share
        </button>
      </div>
    </article>
  )
}

const styles = {
  article: {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    maxWidth: '800px',
    margin: '0 auto'
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '1.5rem',
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500'
  },
  title: {
    margin: '0 0 0.5rem 0',
    color: '#1e293b',
    fontSize: '1.75rem',
    lineHeight: '1.3'
  },
  meta: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    color: '#64748b',
    fontSize: '0.875rem',
    marginBottom: '1.5rem'
  },
  content: {
    color: '#475569',
    lineHeight: '1.7',
    marginBottom: '2rem',
    whiteSpace: 'pre-wrap'
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#64748b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  primary: {
    backgroundColor: '#3b82f6'
  }
}

export default PostDetail