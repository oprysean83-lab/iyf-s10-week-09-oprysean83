/**
 * 🔹 SocialHub: PostList Component
 * Fetches and displays posts with search/filter
 */
import { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Input, Button } from '../shared'
import PostCard from './PostCard'
import LoadingSpinner from '../Lesson17/LoadingSpinner'
import ErrorMessage from '../Lesson17/ErrorMessage'

function PostList({ limit = 10, searchable = true }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filter, setFilter] = useState('all')
  
  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 300)
    return () => clearTimeout(handler)
  }, [searchTerm])
  
  // Fetch posts
  const fetchUrl = debouncedSearch
    ? `https://jsonplaceholder.typicode.com/posts?q=${debouncedSearch}&_limit=${limit}`
    : `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    
  const {  posts, loading, error, refetch } = useFetch(fetchUrl)
  
  // Filter by category (simulated)
  const filteredPosts = posts?.filter(() => {
    if (filter === 'all') return true
    // In real app, filter by post.category or tags
    return true
  }) || []
  
  return (
    <div style={styles.container}>
      {/* Search & Filter Bar */}
      {searchable && (
        <div style={styles.toolbar}>
          <div style={styles.searchWrapper}>
            <Input
              type="search"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                style={styles.clearBtn}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          
          <div style={styles.filters}>
            {['all', 'recent', 'popular'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  ...styles.filterBtn,
                  ...(filter === f ? styles.filterActive : {})
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Loading/Error States */}
      {loading && <LoadingSpinner text="Loading posts..." />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      
      {/* Posts Grid */}
      {!loading && !error && (
        <>
          {debouncedSearch && (
            <p style={styles.results}>
              Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} for "{debouncedSearch}"
            </p>
          )}
          
          {filteredPosts.length === 0 ? (
            <div style={styles.empty}>
              <p>📭 No posts found</p>
              {searchTerm && (
                <Button variant="ghost" onClick={() => setSearchTerm('')}>
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <div style={styles.grid}>
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={{
                  ...post,
                  author: `User ${post.userId}`,
                  date: new Date().toLocaleDateString(),
                  likes: post.id % 50
                }} />
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Load More */}
      {!loading && !error && filteredPosts.length > 0 && (
        <div style={styles.loadMore}>
          <Button variant="outline" onClick={refetch}>
            🔄 Refresh Posts
          </Button>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  toolbar: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  searchWrapper: {
    position: 'relative',
    flex: 1,
    maxWidth: '400px'
  },
  clearBtn: {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#94a3b8',
    fontSize: '1rem',
    padding: '0.25rem'
  },
  filters: {
    display: 'flex',
    gap: '0.5rem'
  },
  filterBtn: {
    padding: '0.375rem 0.75rem',
    backgroundColor: '#f1f5f9',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: '#475569',
    transition: 'all 0.2s'
  },
  filterActive: {
    backgroundColor: '#3b82f6',
    color: 'white'
  },
  results: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginBottom: '-0.5rem'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  empty: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: '#94a3b8'
  },
  loadMore: {
    textAlign: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0'
  }
}

export default PostList