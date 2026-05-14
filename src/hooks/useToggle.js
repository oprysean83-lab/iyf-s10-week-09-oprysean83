/**
 * 🔹 Task 18.1: useToggle Custom Hook
 * Simple boolean state toggle with helper methods
 */
import { useState } from 'react'

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = () => setValue(v => !v)
  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  const reset = () => setValue(initialValue)
  
  return [
    value,
    {
      toggle,
      setTrue,
      setFalse,
      reset,
      set: setValue
    }
  ]
}

export default useToggle