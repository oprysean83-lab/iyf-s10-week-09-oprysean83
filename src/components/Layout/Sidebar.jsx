/**
 * 🔹 SocialHub: Sidebar Component
 * About, Popular Posts, Tags
 */
import { Link } from 'react-router-dom'
import { Card } from '../shared'

function Sidebar() {
  const popularPosts = [
    { id: 1, title: "Getting Started with React", likes: 42 },
    { id: 2, title: "JavaScript Best Practices", likes: 38 },
    { id: 3, title: "Building Your First App", likes: 31 }
  ]
  
  const tags = ['react', 'javascript', 'webdev', 'tutorial', 'beginner', 'frontend', 'css', 'nodejs']
  
  return (
    <aside style={styles.sidebar}>
      {/* About Card */}
      <Card title="📚 About SocialHub" variant="primary">
        <p style={styles.text}>
          SocialHub connects developers to share knowledge, 
          ask questions, and grow together through code.
        </p>
        <Link to="/about" style={styles.learnMore}>
          Learn more →
        </Link>
      </Card>
      
      {/* Popular Posts */}
      <Card title="🔥 Popular Posts">
        <ul style={styles.list}>
          {popularPosts.map(post => (
            <li key={post.id} style={styles.listItem}>
              <Link to={`/posts/${post.id}`} style={styles.postLink}>
                {post.title}
              </Link>
              <span style={styles.likes}>❤️ {post.likes}</span>
            </li>
          ))}
        </ul>
      </Card>
      
      {/* Tags */}
      <Card title="🏷️ Browse Tags">
        <div style={styles.tags}>
          {tags.map(tag => (
            <Link 
              key={tag} 
              to={`/posts?tag=${tag}`}
              style={styles.tag}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </Card>
      
      {/* CTA Card */}
      <Card variant="success">
        <h4 style={styles.ctaTitle}>✨ Ready to share?</h4>
        <p style={styles.ctaText}>
          Create your first post and join the conversation.
        </p>
        <Link to="/create">
          <button style={styles.ctaButton}>+ Create Post</button>
        </Link>
      </Card>
    </aside>
  )
}

const styles = {
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '280px',
    flexShrink: 0
  },
  text: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#475569',
    lineHeight: '1.5'
  },
  learnMore: {
    display: 'inline-block',
    marginTop: '0.75rem',
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '0.875rem'
  },
  postLink: {
    color: '#1e293b',
    textDecoration: 'none',
    fontWeight: '500',
    flex: 1,
    marginRight: '0.5rem'
  },
  likes: {
    color: '#64748b',
    fontSize: '0.75rem',
    flexShrink: 0
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  tag: {
    padding: '0.25rem 0.5rem',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    fontSize: '0.75rem',
    color: '#475569',
    textDecoration: 'none',
    transition: 'background-color 0.2s'
  },
  ctaTitle: {
    margin: '0 0 0.5rem 0',
    color: '#1e293b'
  },
  ctaText: {
    margin: '0 0 1rem 0',
    fontSize: '0.875rem',
    color: '#475569'
  },
  ctaButton: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.875rem'
  }
}

export default Sidebar