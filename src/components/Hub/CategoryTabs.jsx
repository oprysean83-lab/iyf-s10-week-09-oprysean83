/**
 * Unified tab navigation for Opportunities / Collaborations / Learn
 */
import { CATEGORIES } from '../../utils/categoryUtils'

const TABS = [
  { id: 'all', label: 'All', icon: '🌐' },
  ...Object.entries(CATEGORIES).map(([id, c]) => ({ id, label: c.label, icon: c.icon }))
]

export default function CategoryTabs({ active, onChange }) {
  return (
    <div style={styles.container} role="tablist">
      {TABS.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            ...styles.tab,
            ...(active === tab.id ? { ...styles.active, color: CATEGORIES[tab.id]?.color || '#1e293b' } : {})
          }}
        >
          <span style={styles.icon}>{tab.icon}</span>
          <span style={styles.label}>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    overflowX: 'auto',
    paddingBottom: '0.25rem',
    scrollbarWidth: 'none'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.5rem 1rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e2e8f0',
    borderRadius: '999px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#64748b',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    flexShrink: 0
  },
  active: {
    backgroundColor: '#f8fafc',
    borderColor: 'currentColor',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  icon: { fontSize: '1rem' },
  label: { marginLeft: '0.25rem' }
}
