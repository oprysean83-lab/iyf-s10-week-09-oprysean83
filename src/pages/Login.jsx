/**
 * 🔹 SocialHub: Login Page (Simulated Auth)
 */
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { Input, Button, Card } from '../components/shared'
import useForm from '../hooks/useForm'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Get redirect path or default to home
  const from = location.state?.from?.pathname || '/'
  
  const { values, handleChange, handleSubmit } = useForm(
    { username: '' },
    (values) => {
      const errors = {}
      if (!values.username.trim()) {
        errors.username = 'Username is required'
      } else if (values.username.length < 3) {
        errors.username = 'Username must be at least 3 characters'
      }
      return errors
    }
  )
  
  const onSubmit = async (formData) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Login with provided username
      await login(formData.username)
      
      // Redirect to original destination
      navigate(from, { replace: true })
    } catch {
      setError('Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div style={styles.container}>
      <Card title="🔐 Sign In to SocialHub" className="max-w-md mx-auto">
        <form onSubmit={(e) => handleSubmit(e, onSubmit)} noValidate>
          <Input
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            disabled={isSubmitting}
          />
          
          {error && (
            <p style={styles.error}>⚠️ {error}</p>
          )}
          
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
            className="mt-4"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        
        <div style={styles.footer}>
          <p style={styles.hint}>
            💡 This is a demo. Enter any username to continue.
          </p>
          <p style={styles.signup}>
            Don't have an account?{' '}
            <Link to="/signup" style={styles.link}>Sign up</Link>
          </p>
        </div>
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
  error: {
    margin: '0.5rem 0',
    color: '#ef4444',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  footer: {
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0'
  },
  hint: {
    margin: '0 0 0.5rem 0',
    fontSize: '0.875rem',
    color: '#64748b',
    textAlign: 'center'
  },
  signup: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#64748b',
    textAlign: 'center'
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500'
  }
}

export default Login