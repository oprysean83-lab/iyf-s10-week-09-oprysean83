/**
 * 🔹 Task 17.3: Layout Component with Outlet
 */
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  return (
    <div style={styles.layout}>
      <Header 
        user={user} 
        onLogin={() => navigate('/login')}
        onLogout={handleLogout}
      />
      
      <div style={styles.content}>
        <Sidebar />
        
        <main style={styles.main}>
          <Outlet />
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  },
  content: {
    display: 'flex',
    flex: 1,
    gap: '1.5rem',
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box'
  },
  main: {
    flex: 1,
    minWidth: 0
  }
}

export default Layout