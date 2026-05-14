/**
 * 🔹 Task 17.4: Professional Error Component
 */
function ErrorMessage({ message, onRetry, variant = 'default' }) {
  const variants = {
    default: {
      bg: '#fef2f2',
      border: '#fecaca',
      text: '#991b1b',
      icon: '⚠️'
    },
    warning: {
      bg: '#fffbeb',
      border: '#fcd34d',
      text: '#92400e',
      icon: '⚡'
    },
    info: {
      bg: '#eff6ff',
      border: '#93c5fd',
      text: '#1e40af',
      icon: 'ℹ️'
    }
  }
  
  const style = variants[variant] || variants.default
  
  return (
    <div style={{
      ...styles.container,
      backgroundColor: style.bg,
      borderColor: style.border,
      color: style.text
    }}>
      <span style={styles.icon}>{style.icon}</span>
      <p style={styles.message}>{message}</p>
      {onRetry && (
        <button 
          style={styles.retryBtn}
          onClick={onRetry}
        >
          🔄 Try Again
        </button>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  icon: {
    fontSize: '1.25rem'
  },
  message: {
    margin: 0,
    flex: 1,
    minWidth: '200px'
  },
  retryBtn: {
    padding: '0.375rem 0.75rem',
    backgroundColor: 'currentColor',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    opacity: 0.9,
    transition: 'opacity 0.2s'
  }
}

export default ErrorMessage