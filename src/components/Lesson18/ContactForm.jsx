/**
 * 🔹 Task 18.1: useForm Hook Example - Contact Form
 */
import { useState } from 'react'
import useForm from '../../hooks/useForm'
import { Button, Input, Card } from '../shared'

function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState(null)
  
  // Validation function
  const validate = (values) => {
    const errors = {}
    if (!values.name.trim()) {
      errors.name = 'Name is required'
    } else if (values.name.length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    if (!values.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Please enter a valid email'
    }
    if (!values.message.trim()) {
      errors.message = 'Message is required'
    } else if (values.message.length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }
    return errors
  }
  
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
    { name: '', email: '', message: '' },
    validate
  )
  
  const onSubmit = async (formData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', formData)
    setSubmitStatus('success')
    reset()
    
    // Clear status after 3 seconds
    setTimeout(() => setSubmitStatus(null), 3000)
  }
  
  return (
    <Card title="📬 Contact Us" className="max-w-lg mx-auto">
      <form onSubmit={(e) => handleSubmit(e, onSubmit)} noValidate>
        <Input
          label="Name *"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your name"
          error={touched.name && errors.name}
          disabled={isSubmitting}
        />
        
        <Input
          label="Email *"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@example.com"
          error={touched.email && errors.email}
          disabled={isSubmitting}
        />
        
        <div style={styles.field}>
          <label style={styles.label}>
            Message *
            <span style={styles.required}>*</span>
          </label>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your message..."
            rows="5"
            style={{
              ...styles.textarea,
              ...(touched.message && errors.message ? styles.errorInput : {})
            }}
            disabled={isSubmitting}
          />
          {touched.message && errors.message && (
            <p style={styles.errorText}>⚠️ {errors.message}</p>
          )}
        </div>
        
        {submitStatus === 'success' && (
          <p style={styles.success}>✅ Message sent successfully!</p>
        )}
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
          className="mt-4"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
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
    transition: 'border-color 0.2s'
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
  success: {
    margin: '0.5rem 0',
    color: '#166534',
    backgroundColor: '#dcfce7',
    padding: '0.5rem',
    borderRadius: '6px',
    textAlign: 'center'
  }
}

export default ContactForm
