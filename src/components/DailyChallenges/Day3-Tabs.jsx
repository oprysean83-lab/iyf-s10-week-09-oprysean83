/**
 * 🟡 Day 3: Reusable Tabs Component
 */
import { useState } from 'react'

function Tabs({ tabs, defaultActive = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultActive)
  
  return (
    <div style={styles.container}>
      {/* Tab Headers */}
      <div style={styles.tabList} role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.id || index}
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`tabpanel-${index}`}
            onClick={() => setActiveIndex(index)}
            style={{
              ...styles.tab,
              ...(activeIndex === index ? styles.activeTab : {})
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div 
        role="tabpanel"
        id={`tabpanel-${activeIndex}`}
        style={styles.tabPanel}
      >
        {tabs[activeIndex]?.content}
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden'
  },
  tabList: {
    display: 'flex',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc'
  },
  tab: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontWeight: '500',
    color: '#64748b',
    transition: 'all 0.2s',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent'
  },
  activeTab: {
    color: '#3b82f6',
    borderBottomColor: '#3b82f6',
    backgroundColor: 'white'
  },
  tabPanel: {
    padding: '1.5rem'
  }
}

// Example usage component
function TabDemo() {
  const tabs = [
    {
      id: 'about',
      label: '👤 About',
      content: (
        <div>
          <p>Welcome to the About tab! This is where you can share information about yourself or your project.</p>
        </div>
      )
    },
    {
      id: 'posts',
      label: '📝 Posts',
      content: (
        <div>
          <p>Your posts will appear here. Create a new post to get started!</p>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}>
            + Create Post
          </button>
        </div>
      )
    },
    {
      id: 'settings',
      label: '⚙️ Settings',
      content: (
        <div>
          <p>Manage your preferences and account settings here.</p>
        </div>
      )
    }
  ]
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>🗂️ Tab Component Demo</h3>
      <Tabs tabs={tabs} />
    </div>
  )
}

export { Tabs, TabDemo }
export default Tabs
