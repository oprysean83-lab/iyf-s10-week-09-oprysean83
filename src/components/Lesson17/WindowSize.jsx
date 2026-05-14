/**
 * 🔹 Task 17.1: useEffect - Event listeners with cleanup
 */
import { useState, useEffect } from 'react'

function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup: remove listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])  // Empty deps = run once on mount
  
  // Calculate responsive category
  const getCategory = () => {
    if (size.width < 640) return '📱 Mobile'
    if (size.width < 1024) return '💻 Tablet'
    return '🖥️ Desktop'
  }
  
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📐 Window Dimensions</h3>
      <div style={styles.dimensions}>
        <div style={styles.dimension}>
          <span style={styles.label}>Width</span>
          <span style={styles.value}>{size.width}px</span>
        </div>
        <div style={styles.dimension}>
          <span style={styles.label}>Height</span>
          <span style={styles.value}>{size.height}px</span>
        </div>
      </div>
      <p style={styles.category}>Category: <strong>{getCategory()}</strong></p>
      <p style={styles.hint}>💡 Resize your browser to see updates</p>
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
  dimensions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '1rem'
  },
  dimension: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  label: {
    fontSize: '0.875rem',
    color: '#64748b'
  },
  value: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#3b82f6'
  },
  category: {
    margin: '0 0 0.5rem 0',
    color: '#475569'
  },
  hint: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontStyle: 'italic'
  }
}

export default WindowSize