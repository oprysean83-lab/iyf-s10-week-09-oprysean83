/**
 * 🔹 SocialHub: Create Post Page (Protected)
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { Input, Button, Card } from '../components/shared'
import useForm from '../hooks/useForm'

function CreatePost() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset } = useForm(
    { title: '', content: '' },
    (values) => {
      const errors = {}
      if (!values.title.trim()) {
        errors.title = 'Title is required'
      } else if (values.title.length < 5) {
        errors.title = 'Title must be at least 5 characters'
      }
      if (!values.content.trim()) {
        errors.content = 'Content is required'
      } else if (values.content.length < 20) {
        errors.content = 'Content must be at least 20 characters'
      }
      return errors
    }
  )
  
  const onSubmit = async (formData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would POST to your backend
      console.log('Creating post:', {
        ...formData,
        author: user?.name,
        userId: user?.id,
        createdAt: new Date().toISOString()
      })
      
      setSuccess(true)
      reset()
      
      // Redirect after success
      setTimeout(() => {
        navigate('/explore')
      }, 1500)
      
    } catch  {
      setSubmitError('Failed to create post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (success) {
    return (
      <Card variant="success" className="max-w-2xl mx-auto">
        <h2 style={styles.successTitle}>✅ Post Created!</h2>
        <p style={styles.successText}>
          Your post has been published. Redirecting to posts...
        </p>
      </Card>
    )
  }
  
  return (
    <div style={styles.container}>
      <Card title="✍️ Create New Post" className="max-w-2xl mx-auto">
        <form onSubmit={(e) => handleSubmit(e, onSubmit)} noValidate>
          <Input
            label="Post Title *"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="What's on your mind?"
            error={touched.title && errors.title}
            disabled={isSubmitting}
          />
          
          <div style={styles.field}>
            <label style={styles.label}>
              Content *
              <span style={styles.required}>*</span>
            </label>
            <textarea
              name="content"
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Share your thoughts, tips, or questions..."
              rows="8"
              style={{
                ...styles.textarea,
                ...(touched.content && errors.content ? styles.errorInput : {})
              }}
              disabled={isSubmitting}
            />
            {touched.content && errors.content && (
              <p style={styles.errorText}>⚠️ {errors.content}</p>
            )}
          </div>
          
          {submitError && (
            <p style={styles.submitError}>⚠️ {submitError}</p>
          )}
          
          <div style={styles.actions}>
            <Button 
              type="button" 
              variant="secondary"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem 1rem'
  },
  field: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.25rem',
    fontWeight: '500',
    color: '#1e293b',
    fontSize: '0.875rem'
  },
  required: {
    color: '#ef4444',
    marginLeft: '0.25rem'
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#cbd5e1',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  },
  errorInput: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2'
  },
  errorText: {
    margin: '0.25rem 0 0 0',
    fontSize: '0.875rem',
    color: '#ef4444',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  submitError: {
    margin: '0.5rem 0',
    color: '#ef4444',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end',
    marginTop: '1.5rem',
    flexWrap: 'wrap'
  },
  successTitle: {
    margin: '0 0 0.5rem 0',
    color: '#166534'
  },
  successText: {
    margin: 0,
    color: '#166534',
    opacity: 0.9
  }
}

export default CreatePost
