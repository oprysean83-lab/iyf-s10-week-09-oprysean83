/**
 * 🔹 Task 18.1: useForm Custom Hook
 * Handle form state, validation, and submission
 */
import { useState } from 'react'

function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
    }
  }
  
  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true)
    
    // Run validation on submit
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
      setTouched(
        Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      )
      
      if (Object.keys(validationErrors).length > 0) {
        setIsSubmitting(false)
        return false
      }
    }
    
    try {
      await onSubmit(values)
      return true
    } catch (error) {
      setErrors({ submit: error.message })
      return false
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }
  
  const setFieldValue = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
  }
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setValues
  }
}

export default useForm