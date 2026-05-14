/**
 * 🔹 Task 17.4: Professional Loading Component
 */
function LoadingSpinner({ size = 'medium', text = 'Loading...', fullScreen = false }) {
  const sizes = {
    small: { width: '20px', height: '20px', borderWidth: '2px' },
    medium: { width: '40px', height: '40px', borderWidth: '3px' },
    large: { width: '60px', height: '60px', borderWidth: '4px' }
  }
  
  const spinnerStyle = {
    ...sizes[size],
    border: `${sizes[size].borderWidth} solid #e2e8f0`,
    borderTop: `${sizes[size].borderWidth} solid #3b82f6`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: fullScreen ? '4rem 2rem' : '2rem',
    backgroundColor: fullScreen ? 'rgba(255,255,255,0.9)' : 'transparent',
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000
    })
  }
  
  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      {text && <p style={styles.text}>{text}</p>}
      
      {/* Add keyframes for spin animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

const styles = {
  text: {
    margin: 0,
    color: '#64748b',
    fontSize: '1rem'
  }
}

export default LoadingSpinner