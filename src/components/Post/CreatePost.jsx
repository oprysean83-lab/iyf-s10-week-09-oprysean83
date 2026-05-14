/**
 * 🔹 SocialHub: CreatePost Component
 * Unified form for Opportunities, Collaborations, and Learn posts
 */
import { useState } from 'react'
import { Input, Button, Card } from '../shared'
import useForm from '../../hooks/useForm'

function CreatePost({ onSubmit, onCancel, initialData = {} }) {
  const [submitStatus, setSubmitStatus] = useState('idle') // idle | loading | success | error
  const [submitError, setSubmitError] = useState('')

  // Validation logic
  const validate = (values) => {
    const errors = {}
    if (!values.title.trim()) {
      errors.title = 'Title is required'
    } else if (values.title.length < 5) {
      errors.title = 'Title must be at least 5 characters'
    }

    if (!values.category) {
      errors.category = 'Please select a category'
    }

    if (!values.content.trim()) {
      errors.content = 'Content is required'
    } else if (values.content.length < 20) {
      errors.content = 'Content must be at least 20 characters'
    }

    return errors
  }

  // Form hook initialization
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  } = useForm(
    {
      title: initialData.title || '',
      category: initialData.category || '',
      content: initialData.content || '',
      tags: initialData.tags || ''
    },
    validate
  )

  // Submit handler
  const handleFormSubmit = async (formData) => {
    setSubmitStatus('loading')
    setSubmitError('')
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Prepare payload
      const postData = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),
        createdAt: new Date().toISOString(),
        likes: 0,
        status: 'published'
      }

      // Trigger parent callback
      await onSubmit?.(postData)
      setSubmitStatus('success')
      reset()

      // Auto-clear success message
      setTimeout(() => setSubmitStatus('idle'), 2500)
    } catch (err) {
      setSubmitError(err.message || 'Failed to publish post')
      setSubmitStatus('error')
      throw err
    }
  }

  // Success state UI
  if (submitStatus === 'success') {
    return (
      <Card variant="success" className="text-center" style={styles.successCard}>
        <div style={styles.successIcon}>✅</div>
        <h3 style={styles.successTitle}>Post Published!</h3>
        <p style={styles.successText}>Your post is now live on SocialHub.</p>
        <Button 
          variant="primary" 
          onClick={() => window.history.back()}
          className="mt-4"
        >
          Back to Explore
        </Button>
      </Card>
    )
  }

  return (
    <Card title="✍️ Create New Post">
      <form onSubmit={(e) => handleSubmit(e, handleFormSubmit)} noValidate>
        {/* Title */}
        <Input
          label="Title *"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="What are you sharing?"
          error={touched.title && errors.title}
          disabled={isSubmitting}
        />

        {/* Category Selector */}
        <div style={styles.field}>
          <label htmlFor="category" style={styles.label}>
            Category *
            <span style={styles.required}>*</span>
          </label>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...styles.select,
              ...(touched.category && errors.category ? styles.errorInput : {})
            }}
            disabled={isSubmitting}
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="opportunities">📍 Opportunities (Gigs / Internships / Events)</option>
            <option value="collaborations">🤝 Collaborations (Projects / Team-ups)</option>
            <option value="learn">💻 Learn & Share (Code / Q&A / Mentorship)</option>
          </select>
          {touched.category && errors.category && (
            <p style={styles.errorText}>⚠️ {errors.category}</p>
          )}
        </div>

        {/* Content */}
        <div style={styles.field}>
          <label htmlFor="content" style={styles.label}>
            Content *
            <span style={styles.required}>*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={
              values.category === 'opportunities' ? 'Describe the opportunity, requirements, and how to apply...' :
              values.category === 'collaborations' ? 'Explain the project, tech stack, and roles you need...' :
              'Share your code, question, or tutorial...'
            }
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

        {/* Tags */}
        <Input
          label="Tags (comma-separated)"
          name="tags"
          value={values.tags}
          onChange={handleChange}
          placeholder="react, nodejs, kenya, internship"
          hint="Helps others discover your post"
          disabled={isSubmitting}
        />

        {/* Submit Error */}
        {submitError && (
          <p style={styles.submitError}>⚠️ {submitError}</p>
        )}

        {/* Actions */}
        <div style={styles.actions}>
          {onCancel && (
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            variant="primary"
            loading={isSubmitting || submitStatus === 'loading'}
            disabled={isSubmitting || submitStatus === 'loading'}
          >
            {submitStatus === 'loading' ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

const styles = {
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
  select: {
    width: '100%',
    padding: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#cbd5e1',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    backgroundColor: 'white',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
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
    transition: 'border-color 0.2s, box-shadow 0.2s',
    lineHeight: '1.5'
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
    gap: '0.25rem',
    padding: '0.5rem',
    backgroundColor: '#fef2f2',
    borderRadius: '6px'
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end',
    marginTop: '1.5rem',
    flexWrap: 'wrap'
  },
  successCard: {
    textAlign: 'center',
    padding: '2rem 1.5rem'
  },
  successIcon: {
    fontSize: '3rem',
    marginBottom: '0.5rem'
  },
  successTitle: {
    margin: '0 0 0.5rem 0',
    color: '#166534',
    fontSize: '1.25rem'
  },
  successText: {
    margin: 0,
    color: '#15803d',
    opacity: 0.9
  }
}

export default CreatePost
