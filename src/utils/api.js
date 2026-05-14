/**
 * 🔹 Task 17.1: useEffect - Understanding the Hook
 * Demonstrates: mount, update, cleanup patterns
 */
import { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const [showEffects, setShowEffects] = useState(true)
  
  // Runs after EVERY render
  useEffect(() => {
    if (showEffects) console.log('🔄 Effect ran! Count is:', count)
  })
  
  // Runs ONLY on mount
  useEffect(() => {
    if (showEffects) console.log('🚀 Component mounted!')
    return () => {
      if (showEffects) console.log('🧹 Component unmounted!')
    }
  }, [])
  
  // Runs when count CHANGES
  useEffect(() => {
    if (showEffects) console.log('📊 Count changed to:', count)
    document.title = `Count: ${count}`
  }, [count])
  
  // Cleanup: interval example
  useEffect(() => {
    const interval = setInterval(() => {
      if (showEffects) console.log('⏰ Tick...')
    }, 2000)
    
    return () => {
      clearInterval(interval)
      if (showEffects) console.log('🧹 Interval cleaned up!')
    }
  }, [])
  
  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={showEffects}
            onChange={(e) => setShowEffects(e.target.checked)}
          />
          Show console logs
        </label>
      </div>
      
      <p style={styles.display}>Count: <strong>{count}</strong></p>
      
      <div style={styles.buttons}>
        <button style={styles.button} onClick={() => setCount(c => c - 1)}>
          − Decrement
        </button>
        <button style={{...styles.button, ...styles.reset}} onClick={() => setCount(0)}>
          ⟲ Reset
        </button>
        <button style={styles.button} onClick={() => setCount(c => c + 1)}>
          + Increment
        </button>
      </div>
      
      <p style={styles.hint}>💡 Open browser console to see useEffect logs</p>
    </div>
  )
}

const styles = {
  container: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    maxWidth: '400px',
    margin: '0 auto'
  },
  controls: {
    marginBottom: '1rem',
    textAlign: 'left'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#64748b',
    cursor: 'pointer'
  },
  display: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#1e293b'
  },
  buttons: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  reset: {
    backgroundColor: '#64748b'
  },
  hint: {
    marginTop: '1rem',
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontStyle: 'italic'
  }
}

export default Counter