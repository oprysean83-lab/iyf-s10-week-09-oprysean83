/**
 * 🔹 Task 17.3: Header with Navigation Links
 */
import { NavLink } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
function Header({ user, onLogin, onLogout }) {
  const { user: authUser } = useAuth()
  const currentUser = user || authUser
  
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <NavLink to="/" style={styles.logo}>
          🏘️ SocialHub
        </NavLink>
        
        <nav style={styles.nav}>
          <NavLink 
            to="/" 
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {})
            })}
          >
            Home
          </NavLink>
          <NavLink 
            to="/explore" 
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {})
            })}
          >
            Explore
          </NavLink>
          <NavLink 
            to="/about" 
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {})
            })}
          >
            About
          </NavLink>
        </nav>
        
        <div style={styles.userSection}>
          {currentUser ? (
            <>
              <span style={styles.userName}>👤 {currentUser.name}</span>
              <NavLink 
                to="/create"
                style={styles.createBtn}
              >
                + New Post
              </NavLink>
              <button style={styles.logoutBtn} onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <button style={styles.loginBtn} onClick={onLogin}>
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

const styles = {
  header: {
    backgroundImage: 'linear-gradient(270deg, #ff00cc, #dc3545)',
    color: 'white',
    padding: '0.75rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none'
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.95rem',
    padding: '0.25rem 0',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    transition: 'border-color 0.2s'
  },
  activeLink: {
    borderBottomColor: 'white'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  userName: {
    fontWeight: '500',
    fontSize: '0.9rem'
  },
  createBtn: {
    padding: '0.375rem 0.75rem',
    backgroundColor: '#10b981',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  loginBtn: {
    padding: '0.375rem 0.75rem',
    backgroundColor: 'white',
    color: '#3b82f6',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.9rem'
  },
  logoutBtn: {
    padding: '0.375rem 0.75rem',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.9rem'
  }
}

export default Header
