/**
 * 🔴 Day 5: Full User Profile Page
 * Fetches user, posts, and todos with tabs
 */
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Tabs } from './Day3-Tabs'
import { Card } from '../../components/shared'
import LoadingSpinner from '../Lesson17/LoadingSpinner'
import ErrorMessage from '../Lesson17/ErrorMessage'

function UserProfile() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    let isMounted = true
    
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch all data in parallel
        const [userRes, postsRes, todosRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
          fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
        ])
        
        if (!userRes.ok) throw new Error('User not found')
        
        const userData = await userRes.json()
        const postsData = await postsRes.json()
        const todosData = await todosRes.json()
        
        if (isMounted) {
          setUser(userData)
          setPosts(postsData.slice(0, 5))
          setTodos(todosData.slice(0, 5))
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      }
    }
    
    fetchData()
    return () => { isMounted = false }
  }, [userId])
  
  if (loading) return <LoadingSpinner text="Loading profile..." />
  if (error) return <ErrorMessage message={error} />
  if (!user) return <ErrorMessage message="User not found" />
  
  const completedTodos = todos.filter(t => t.completed).length
  const completionRate = todos.length ? Math.round((completedTodos / todos.length) * 100) : 0
  
  const tabs = [
    {
      id: 'info',
      label: '👤 Info',
      content: (
        <div style={styles.infoContent}>
          <div style={styles.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h3 style={styles.name}>{user.name}</h3>
          <p style={styles.username}>@{user.username}</p>
          
          <div style={styles.details}>
            <p><strong>📧</strong> {user.email}</p>
            <p><strong>🏢</strong> {user.company.name}</p>
            <p><strong>🌐</strong> {user.website}</p>
            <p><strong>📍</strong> {user.address.city}, {user.address.country}</p>
          </div>
        </div>
      )
    },
    {
      id: 'posts',
      label: `📝 Posts (${posts.length})`,
      content: (
        <div style={styles.listContent}>
          {posts.length === 0 ? (
            <p style={styles.empty}>No posts yet</p>
          ) : (
            posts.map(post => (
              <Card key={post.id} className="mb-3">
                <h4 style={styles.postTitle}>{post.title}</h4>
                <p style={styles.postBody}>{post.body.slice(0, 100)}...</p>
              </Card>
            ))
          )}
        </div>
      )
    },
    {
      id: 'todos',
      label: `✅ Todos (${completionRate}%)`,
      content: (
        <div style={styles.listContent}>
          {/* Progress bar */}
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${completionRate}%`
              }}
            />
          </div>
          <p style={styles.progressText}>
            {completedTodos} of {todos.length} tasks completed
          </p>
          
          {/* Todo list */}
          {todos.map(todo => (
            <div 
              key={todo.id} 
              style={{
                ...styles.todoItem,
                ...(todo.completed ? styles.todoCompleted : {})
              }}
            >
              <span style={styles.todoCheckbox}>
                {todo.completed ? '✅' : '⬜'}
              </span>
              <span style={styles.todoText}>{todo.title}</span>
            </div>
          ))}
        </div>
      )
    }
  ]
  
  return (
    <div style={styles.container}>
      <Tabs tabs={tabs} />
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto'
  },
  infoContent: {
    textAlign: 'center'
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 auto 1rem'
  },
  name: {
    margin: '0 0 0.25rem 0',
    color: '#1e293b',
    fontSize: '1.5rem'
  },
  username: {
    margin: '0 0 1.5rem 0',
    color: '#64748b'
  },
  details: {
    textAlign: 'left',
    color: '#475569'
  },
  listContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  empty: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: '2rem'
  },
  postTitle: {
    margin: '0 0 0.5rem 0',
    color: '#1e293b',
    fontSize: '1rem'
  },
  postBody: {
    margin: 0,
    color: '#64748b',
    fontSize: '0.875rem'
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    transition: 'width 0.3s'
  },
  progressText: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '6px'
  },
  todoCompleted: {
    opacity: 0.6
  },
  todoCheckbox: {
    fontSize: '1.1rem'
  },
  todoText: {
    flex: 1,
    fontSize: '0.875rem',
    color: '#475569'
  }
}

export default UserProfile