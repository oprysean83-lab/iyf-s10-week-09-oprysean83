/**
 * 🔹 Task 18.3: Reusable Button Component with CSS Modules
 */
import styles from './Button.module.css'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = ''
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${fullWidth ? styles.fullWidth : ''}
        ${disabled || loading ? styles.disabled : ''}
        ${className}
      `.trim()}
    >
      {loading ? (
        <span className={styles.loading}>
          <svg className={styles.spinner} viewBox="0 0 24 24">
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3"
              strokeDasharray="60"
              strokeDashoffset="30"
            />
          </svg>
          Loading...
        </span>
      ) : children}
    </button>
  )
}

export default Button