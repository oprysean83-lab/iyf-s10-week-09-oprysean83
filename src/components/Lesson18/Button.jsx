/**
 * 🔹 Task 18.2: Button with CSS Modules
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
  className = '',
  ...props 
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
        ${(disabled || loading) ? styles.disabled : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {loading ? (
        <span className={styles.loading}>
          <span className={styles.spinner}></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button