/**
 * 🔹 SocialHub: Home Page
 * Welcome + recent posts + quick stats
 */
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { Card, Button } from '../components/shared'
import LoadingSpinner from '../components/Lesson17/LoadingSpinner'
import ErrorMessage from '../components/Lesson17/ErrorMessage'

function Home() {
  const {  posts, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5'
  )
  
  return (
    <div>
      {/* Welcome Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Welcome to SocialHub 👋</h1>
        <p style={styles.subtitle}>
          Connect, share, and grow with developers worldwide.
        </p>
        <div style={styles.actions}>
          <Link to="/explore">
            <Button variant="primary" size="large">Browse Posts</Button>
          </Link>
          <Link to="/create">
            <Button variant="outline" size="large">Create Post</Button>
          </Link>
        </div>
      </section>
      
      {/* Recent Posts */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>📝 Recent Posts</h2>
          <Link to="/explore" style={styles.viewAll}>View All →</Link>
        </div>
        
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && posts && (
          <div style={styles.postGrid}>
            {posts.map(post => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postExcerpt}>
                  {post.body.slice(0, 80)}...
                </p>
                <Link to={`/posts/${post.id}`} style={styles.readMore}>
                  Read more
                </Link>
              </Card>
            ))}
          </div>
        )}
      </section>
      
      {/* Stats */}
      <section style={styles.stats}>
        <Card variant="primary">
          <div style={styles.statsGrid}>
            <div style={styles.stat}>
              <span style={styles.statValue}>1,234</span>
              <span style={styles.statLabel}>Total Posts</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statValue}>567</span>
              <span style={styles.statLabel}>Active Users</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statValue}>89%</span>
              <span style={styles.statLabel}>Satisfaction</span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}

const styles = {
  hero: {
    textAlign: 'center',
    padding: '3rem 1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    marginBottom: '2rem',
    border: '1px solid #e2e8f0'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#64748b',
    marginBottom: '1.5rem',
    maxWidth: '600px',
    margin: '0 auto 1.5rem'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  section: {
    marginBottom: '2rem'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#1e293b',
    margin: 0
  },
  viewAll: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.875rem'
  },
  postGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem'
  },
  postTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.5rem',
    margin: '0 0 0.5rem 0'
  },
  postExcerpt: {
    color: '#64748b',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    marginBottom: '0.75rem'
  },
  readMore: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  stats: {
    marginTop: '2rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    textAlign: 'center'
  },
  stat: {
    padding: '1rem'
  },
  statValue: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#3b82f6'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#64748b'
  }
}

export default Home