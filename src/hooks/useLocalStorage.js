/**
 * 🔹 Task 18.1: useLocalStorage Custom Hook
 * Persist state to localStorage with automatic sync
 */
import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided default
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })
  
  // Update localStorage when value changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])
  
  // Return a wrapped version of setState
  const setValue = (value) => {
    try {
      // Allow value to be a function for consistency with useState
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value
      setStoredValue(valueToStore)
    } catch (error) {
      console.error(`Error updating localStorage key "${key}":`, error)
    }
  }
  
  // Remove item from localStorage
  const remove = () => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }
  
  return [storedValue, setValue, remove]
}

export default useLocalStorage