/**
 * 🔹 SocialHub: Footer Component
 */
import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  const links = [
    { label: 'Home', to: '/' },
    { label: 'Explore', to: '/explore' },
    { label: 'About', to: '/about' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' }
  ]
  
  const social = [
    { label: 'GitHub', url: 'https://github.com', icon: '🐙' },
    { label: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
    { label: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' }
  ]
  
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Links */}
        <nav style={styles.nav}>
          {links.map(link => (
            <Link 
              key={link.to} 
              to={link.to}
              style={styles.link}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* Social */}
        <div style={styles.social}>
          {social.map(social => (
            <a 
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialLink}
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
        
        {/* Copyright */}
        <p style={styles.copyright}>
          &copy; {currentYear} SocialHub. Built with ❤️ for IYF Summer 2026.
        </p>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: '#1e293b',
    color: '#94a3b8',
    padding: '2rem 0',
    marginTop: 'auto'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    textAlign: 'center'
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color 0.2s'
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1rem'
  },
  socialLink: {
    fontSize: '1.25rem',
    color: '#94a3b8',
    textDecoration: 'none',
    transition: 'transform 0.2s, color 0.2s'
  },
  copyright: {
    margin: 0,
    fontSize: '0.875rem',
    opacity: 0.8
  }
}

export default Footer