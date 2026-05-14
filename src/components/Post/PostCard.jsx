/**
 * 🔹 SocialHub: PostCard Component (Reusable)
 */
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Card, Button, Avatar } from '../shared'

function PostCard({ post, showActions = true, compact = false }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes || 0)
  
  const handleLike = () => {
    setLiked(!liked)
    setLikes(prev => liked ? prev - 1 : prev + 1)
  }
  
  if (compact) {
    return (
      <Link to={`/posts/${post.id}`} style={styles.compactLink}>
        <div style={styles.compactCard}>
          <h4 style={styles.compactTitle}>{post.title}</h4>
          <span style={styles.compactMeta}>
            {post.author} • {post.date}
          </span>
        </div>
      </Link>
    )
  }
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.author}>
          <Avatar name={post.author} size="small" />
          <div>
            <span style={styles.authorName}>{post.author}</span>
            <span style={styles.authorDate}>• {post.date}</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <Link to={`/posts/${post.id}`} style={styles.contentLink}>
        <h3 style={styles.title}>{post.title}</h3>
        <p style={styles.excerpt}>
          {post.body || post.excerpt || post.content}
        </p>
      </Link>
      
      {/* Footer Actions */}
      {showActions && (
        <div style={styles.footer}>
          <Button
            variant={liked ? 'primary' : 'ghost'}
            size="small"
            onClick={handleLike}
            className="flex items-center gap-1"
          >
            {liked ? '❤️' : '🤍'} {likes}
          </Button>
          
          <Link to={`/posts/${post.id}`}>
            <Button variant="ghost" size="small">
              Read more →
            </Button>
          </Link>
        </div>
      )}
    </Card>
  )
}

const styles = {
  compactLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block'
  },
  compactCard: {
    padding: '0.75rem 1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    transition: 'background-color 0.2s'
  },
  compactTitle: {
    margin: '0 0 0.25rem 0',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#1e293b'
  },
  compactMeta: {
    fontSize: '0.75rem',
    color: '#64748b'
  },
  header: {
    marginBottom: '0.75rem'
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  authorName: {
    fontWeight: '500',
    fontSize: '0.875rem',
    color: '#1e293b'
  },
  authorDate: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    marginLeft: '0.25rem'
  },
  contentLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block'
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1e293b',
    transition: 'color 0.2s'
  },
  excerpt: {
    margin: '0 0 1rem 0',
    color: '#64748b',
    fontSize: '0.875rem',
    lineHeight: '1.6'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.75rem',
    borderTop: '1px solid #e2e8f0'
  }
}

export default PostCard