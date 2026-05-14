/**
 * 🔹 Task 18.1: useToggle Hook Example - Modal Component
 */
import { useState } from 'react'
import useToggle from '../../hooks/useToggle'
import { Button, Card } from '../shared'

function ModalExample() {
  const [isOpen, { toggle, setFalse }] = useToggle(false)
  const [content, setContent] = useState('Default modal content')
  
  return (
    <div style={styles.container}>
      <Card title="🪟 Modal Demo">
        <p style={styles.description}>
          Click the button below to open a modal. The modal uses the 
          <code style={styles.code}>useToggle</code> hook for state management.
        </p>
        
        <div style={styles.buttons}>
          <Button variant="primary" onClick={toggle}>
            Open Modal
          </Button>
          <Button variant="secondary" onClick={() => {
            setContent('Different content!')
            toggle()
          }}>
            Open with Custom Content
          </Button>
        </div>
      </Card>
      
      {/* Modal Overlay */}
      {isOpen && (
        <div style={styles.overlay} onClick={setFalse}>
          <div 
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div style={styles.header}>
              <h3 style={styles.title}>✨ Modal Title</h3>
              <button 
                onClick={setFalse}
                style={styles.closeBtn}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            
            <div style={styles.body}>
              <p>{content}</p>
              <p style={styles.hint}>
                💡 Click outside or press Escape to close
              </p>
            </div>
            
            <div style={styles.footer}>
              <Button variant="secondary" onClick={setFalse}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => {
                alert('Action confirmed!')
                setFalse()
              }}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  description: {
    marginBottom: '1rem',
    color: '#475569',
    lineHeight: '1.6'
  },
  code: {
    backgroundColor: '#f1f5f9',
    padding: '0.125rem 0.25rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontFamily: 'monospace',
    color: '#3b82f6'
  },
  buttons: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
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
    padding: '1rem',
    animation: 'fadeIn 0.2s ease'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideIn 0.2s ease'
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
    lineHeight: 1
  },
  body: {
    padding: '1.5rem',
    flex: 1,
    overflow: 'auto'
  },
  hint: {
    marginTop: '1rem',
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontStyle: 'italic'
  },
  footer: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end',
    backgroundColor: '#f8fafc'
  }
}

// Add animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
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

export default ModalExample