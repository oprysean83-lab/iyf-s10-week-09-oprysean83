/**
 * 🟢 Day 1: Timer Component with useEffect cleanup
 */
import { useState, useEffect } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  
  useEffect(() => {
    let interval = null
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    }
    
    // Cleanup on unmount or when isRunning changes
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])
  
  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>⏱️ Timer</h3>
      <div style={styles.display}>{formatTime(seconds)}</div>
      
      <div style={styles.controls}>
        <button 
          style={{...styles.button, ...(!isRunning ? styles.primary : {})}}
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
        >
          ▶ Start
        </button>
        <button 
          style={{...styles.button, ...(isRunning ? styles.primary : {})}}
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
        >
          ⏸ Pause
        </button>
        <button 
          style={{...styles.button, ...styles.danger}}
          onClick={() => {
            setIsRunning(false)
            setSeconds(0)
          }}
        >
          ⟲ Reset
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    textAlign: 'center'
  },
  title: {
    margin: '0 0 1rem 0',
    color: '#1e293b'
  },
  display: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#3b82f6',
    fontFamily: 'monospace',
    marginBottom: '1.5rem',
    padding: '0.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '6px'
  },
  controls: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#64748b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'opacity 0.2s'
  },
  primary: {
    backgroundColor: '#3b82f6'
  },
  danger: {
    backgroundColor: '#ef4444'
  }
}

export default Timer