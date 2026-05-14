/**
 * 🔹 SocialHub: 404 Not Found Page
 */
import { Link } from 'react-router-dom'
import { Button, Card } from '../components/shared'

function NotFound() {
  return (
    <div style={styles.container}>
      <Card className="max-w-md mx-auto text-center">
        <div style={styles.icon}>🔍</div>
        <h1 style={styles.title}>404</h1>
        <h2 style={styles.subtitle}>Page Not Found</h2>
        <p style={styles.text}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div style={styles.actions}>
          <Link to="/">
            <Button variant="primary">Go Home</Button>
          </Link>
          <Button variant="secondary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
        
        <p style={styles.hint}>
          💡 Try searching for what you need in the posts section.
        </p>
      </Card>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 200px)',
    padding: '2rem 1rem'
  },
  icon: {
    fontSize: '4rem',
    marginBottom: '1rem'
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#3b82f6',
    margin: '0 0 0.5rem 0',
    lineHeight: 1
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#1e293b',
    margin: '0 0 1rem 0'
  },
  text: {
    margin: '0 0 1.5rem 0',
    color: '#64748b'
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  hint: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontStyle: 'italic'
  }
}

export default NotFound