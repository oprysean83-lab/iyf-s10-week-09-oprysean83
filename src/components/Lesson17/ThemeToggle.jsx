/**
 * 🔹 Task 17.1: useEffect - Sync with localStorage
 */
import { useState, useEffect } from 'react'

function ThemeToggle() {
  // Initialize from localStorage or default
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'light'
  })
  
  // Sync to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.setAttribute('data-theme', theme)
    document.documentElement.style.setProperty(
      '--bg-color',
      theme === 'dark' ? '#1e293b' : '#f8fafc'
    )
    document.documentElement.style.setProperty(
      '--text-color',
      theme === 'dark' ? '#f1f5f9' : '#1e293b'
    )
  }, [theme])
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return (
    <div style={{
      ...styles.container,
      backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9'
    }}>
      <h3 style={styles.title}>🎨 Theme Toggle</h3>
      <p style={styles.current}>Current: <strong>{theme}</strong></p>
      
      <button 
        style={{
          ...styles.button,
          backgroundColor: theme === 'dark' ? '#fbbf24' : '#3b82f6'
        }}
        onClick={toggleTheme}
      >
        {theme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light'}
      </button>
      
      <p style={styles.hint}>💡 Theme persists across page refreshes</p>
    </div>
  )
}

const styles = {
  container: {
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    transition: 'background-color 0.3s'
  },
  title: {
    margin: '0 0 0.5rem 0',
    color: 'inherit'
  },
  current: {
    margin: '0 0 1rem 0',
    color: 'inherit',
    opacity: 0.8
  },
  button: {
    padding: '0.75rem 1.5rem',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  hint: {
    marginTop: '1rem',
    fontSize: '0.875rem',
    color: 'inherit',
    opacity: 0.7,
    fontStyle: 'italic'
  }
}

export default ThemeToggle