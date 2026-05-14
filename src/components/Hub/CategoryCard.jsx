/**
 * Conditional card rendering based on category type
 */
import { Link } from 'react-router-dom'
import { Card, Avatar, Button } from '../shared'
import { CATEGORIES } from '../../utils/categoryUtils'

export default function CategoryCard({ post }) {
  const catConfig = CATEGORIES[post.category] || CATEGORIES.opportunities
  
  // Category-specific metadata
  const renderMeta = () => {
    if (post.category === 'opportunities') {
      return (
        <div style={styles.metaRow}>
          <span style={styles.badge(catConfig.color)}>📍 {post.location || 'Remote'}</span>
          <span style={styles.badge(catConfig.color)}>🏷️ {post.type || 'General'}</span>
          {post.deadline && <span style={styles.deadline}>Due: {post.deadline}</span>}
        </div>
      )
    }
    if (post.category === 'collaborations') {
      return (
        <div style={styles.metaRow}>
          <span style={styles.badge(catConfig.color)}>🎯 {post.skillsNeeded || 'Open Skills'}</span>
          <span style={styles.badge(catConfig.color)}>👥 Looking for collaborators</span>
        </div>
      )
    }
    if (post.category === 'learn') {
      return (
        <div style={styles.metaRow}>
          <span style={styles.badge(catConfig.color)}>🔤 {post.language || 'JS'}</span>
          <span style={styles.badge(catConfig.color)}>📊 {post.difficulty || 'All Levels'}</span>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.author}>
          <Avatar name={post.author || `User ${post.userId}`} size="small" />
          <div>
            <span style={styles.authorName}>{post.author || 'Community Member'}</span>
            <span style={styles.dot}>•</span>
            <span style={styles.date}>{post.date || 'Recently'}</span>
          </div>
        </div>
        <span style={styles.categoryBadge(catConfig.color)}>
          {catConfig.icon} {catConfig.label}
        </span>
      </div>

      {/* Content */}
      <Link to={`/posts/${post.id}`} style={styles.contentLink}>
        <h3 style={styles.title}>{post.title}</h3>
        <p style={styles.excerpt}>{post.body.slice(0, 120)}...</p>
      </Link>

      {/* Category Meta */}
      {renderMeta()}

      {/* Actions */}
      <div style={styles.footer}>
        <Button variant="ghost" size="small">
          ❤️ {post.likes || 0}
        </Button>
        <Link to={`/posts/${post.id}`}>
          <Button variant="primary" size="small">
            {post.category === 'opportunities' ? 'Apply' : 
             post.category === 'collaborations' ? 'Connect' : 
             post.category === 'learn' ? 'View Details' : 'Read More'}
          </Button>
        </Link>
      </div>
    </Card>
  )
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' },
  author: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  authorName: { fontWeight: '500', fontSize: '0.875rem', color: '#1e293b' },
  dot: { color: '#cbd5e1', margin: '0 0.25rem' },
  date: { fontSize: '0.75rem', color: '#94a3b8' },
  categoryBadge: (color) => ({
    padding: '0.25rem 0.5rem',
    backgroundColor: `${color}15`,
    color: color,
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500'
  }),
  contentLink: { textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '0.75rem' },
  title: { margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' },
  excerpt: { margin: 0, color: '#64748b', fontSize: '0.875rem', lineHeight: '1.6' },
  metaRow: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' },
  badge: (color) => ({
    padding: '0.125rem 0.375rem',
    backgroundColor: `${color}10`,
    color: '#475569',
    borderRadius: '3px',
    fontSize: '0.75rem'
  }),
  deadline: { fontSize: '0.75rem', color: '#94a3b8', marginLeft: 'auto' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0' }
}