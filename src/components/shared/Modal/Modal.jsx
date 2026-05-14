/**
 * 🔹 Task 18.3: Reusable Modal Component
 */
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  closeOnEscape = true,
  closeOnOverlay = true
}) {
  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEscape])
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  const sizes = {
    small: { maxWidth: '400px' },
    medium: { maxWidth: '600px' },
    large: { maxWidth: '800px' },
    full: { maxWidth: '95vw', maxHeight: '95vh' }
  }
  
  const modalContent = (
    <div style={styles.overlay} onClick={closeOnOverlay ? onClose : undefined}>
      <div 
        style={{
          ...styles.modal,
          ...sizes[size]
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {(title || onClose) && (
          <div style={styles.header}>
            {title && (
              <h3 id="modal-title" style={styles.title}>{title}</h3>
            )}
            {onClose && (
              <button 
                onClick={onClose}
                style={styles.closeBtn}
                aria-label="Close modal"
              >
                ✕
              </button>
            )}
          </div>
        )}
        
        {/* Body */}
        <div style={styles.body}>
          {children}
        </div>
      </div>
    </div>
  )
  
  return createPortal(modalContent, document.body)
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    animation: 'modalSlideIn 0.2s ease-out'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #e2e8f0'
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#64748b',
    padding: '0.25rem',
    lineHeight: 1,
    transition: 'color 0.2s'
  },
  body: {
    padding: '1.5rem',
    overflow: 'auto'
  }
}

// Add animation keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
  document.head.appendChild(style)
}

export default Modal