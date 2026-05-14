/**
 * 🔹 SocialHub: Posts List Page with Search & Filter
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { Input, Button, Card } from '../components/shared'
import LoadingSpinner from '../components/Lesson17/LoadingSpinner'
import ErrorMessage from '../components/Lesson17/ErrorMessage'

function Posts() {
  const [searchTerm, setSearchTerm] = useState('')
  const {  posts, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  )
  
  // Filter posts by search term
  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []
  
  return (
    <div>
      {/* Search Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📝 All Posts</h1>
        <div style={styles.searchContainer}>
          <Input
            type="search"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Button variant="ghost" onClick={() => setSearchTerm('')}>
            Clear
          </Button>
        </div>
      </div>
      
      {/* Loading/Error States */}
      {loading && <LoadingSpinner text="Loading posts..." />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      
      {/* Results */}
      {!loading && !error && (
        <>
          <p style={styles.results}>
            Showing {filteredPosts.length} of {posts?.length || 0} posts
            {searchTerm && ` for "${searchTerm}"`}
          </p>
          
          {filteredPosts.length === 0 ? (
            <Card>
              <p style={styles.empty}>
                {searchTerm 
                  ? `No posts match "${searchTerm}"` 
                  : 'No posts found'}
              </p>
            </Card>
          ) : (
            <div style={styles.list}>
              {filteredPosts.map(post => (
                <Link to={`/posts/${post.id}`} key={post.id} style={styles.link}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <h3 style={styles.postTitle}>{post.title}</h3>
                    <p style={styles.excerpt}>{post.body.slice(0, 120)}...</p>
                    <span style={styles.id}>Post #{post.id}</span>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

const styles = {
  header: {
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1rem'
  },
  searchContainer: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  results: {
    color: '#64748b',
    fontSize: '0.875rem',
    marginBottom: '1rem'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  postTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 0.5rem 0'
  },
  excerpt: {
    color: '#64748b',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    margin: '0 0 0.5rem 0'
  },
  id: {
    fontSize: '0.75rem',
    color: '#94a3b8'
  },
  empty: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: '2rem'
  }
}

export default Posts