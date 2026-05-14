/**
 * 🔹 Task 18.1: Settings Component using useLocalStorage
 */
import { useLocalStorage } from '../../hooks/useLocalStorage'

function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16)
  const [notifications, setNotifications] = useLocalStorage('notifications', true)
  
  // Apply theme to document
  if (typeof document !== 'undefined') {
    document.body.setAttribute('data-theme', theme)
  }
  
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>⚙️ Settings</h3>
      
      <div style={styles.section}>
        <label style={styles.label}>Theme</label>
        <select 
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={styles.select}
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="system">💻 System</option>
        </select>
      </div>
      
      <div style={styles.section}>
        <label style={styles.label}>Font Size: {fontSize}px</label>
        <input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          style={styles.range}
        />
      </div>
      
      <div style={styles.section}>
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Enable notifications
        </label>
      </div>
      
      <button 
        style={styles.resetBtn}
        onClick={() => {
          setTheme('light')
          setFontSize(16)
          setNotifications(true)
        }}
      >
        Reset to Defaults
      </button>
    </div>
  )
}

const styles = {
  container: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    maxWidth: '400px'
  },
  title: {
    margin: '0 0 1.5rem 0',
    color: '#1e293b'
  },
  section: {
    marginBottom: '1.25rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#1e293b',
    fontSize: '0.875rem'
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: 'white'
  },
  range: {
    width: '100%'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#475569',
    cursor: 'pointer'
  },
  resetBtn: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#64748b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    marginTop: '0.5rem'
  }
}

export default Settings