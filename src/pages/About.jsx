/**
 * 🔹 SocialHub: About Page
 */
import { Card } from '../components/shared'

function About() {
  const features = [
    {
      icon: '📝',
      title: 'Share Knowledge',
      description: 'Post tutorials, tips, and insights to help fellow developers.'
    },
    {
      icon: '💬',
      title: 'Connect & Discuss',
      description: 'Engage with the community through comments and discussions.'
    },
    {
      icon: '🔍',
      title: 'Discover Content',
      description: 'Find relevant posts through search, tags, and recommendations.'
    },
    {
      icon: '🚀',
      title: 'Grow Together',
      description: 'Learn from others and share your journey as a developer.'
    }
  ]
  
  const stats = [
    { label: 'Active Users', value: '5,000+' },
    { label: 'Posts Shared', value: '12,000+' },
    { label: 'Countries', value: '80+' },
    { label: 'Happy Devs', value: '98%' }
  ]
  
  return (
    <div style={styles.container}>
      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.title}>About SocialHub</h1>
        <p style={styles.subtitle}>
          A platform built by developers, for developers.
        </p>
      </section>
      
      {/* Mission */}
      <section style={styles.section}>
        <Card>
          <h2 style={styles.sectionTitle}>🎯 Our Mission</h2>
          <p style={styles.paragraph}>
            SocialHub was created to bridge the gap between learning and doing. 
            We believe that the best way to learn is by sharing, and the best way 
            to grow is by connecting with others on the same journey.
          </p>
          <p style={styles.paragraph}>
            Whether you're just starting out or you're a seasoned professional, 
            there's a place for you here. Share your wins, ask for help, and 
            celebrate the progress of others.
          </p>
        </Card>
      </section>
      
      {/* Features */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>✨ What You Can Do</h2>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Card key={index} variant="primary">
              <span style={styles.featureIcon}>{feature.icon}</span>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Stats */}
      <section style={styles.section}>
        <Card variant="success">
          <h2 style={styles.sectionTitle}>📊 Community Impact</h2>
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} style={styles.stat}>
                <span style={styles.statValue}>{stat.value}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
      
      {/* CTA */}
      <section style={styles.cta}>
        <Card>
          <h2 style={styles.ctaTitle}>Ready to get started?</h2>
          <p style={styles.ctaText}>
            Join thousands of developers already sharing and learning on SocialHub.
          </p>
          <div style={styles.ctaButtons}>
            <a href="/explore" style={styles.ctaButtonPrimary}>
              Browse Posts
            </a>
            <a href="/create" style={styles.ctaButtonSecondary}>
              Create Account
            </a>
          </div>
        </Card>
      </section>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  hero: {
    textAlign: 'center',
    padding: '2rem 1rem',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto'
  },
  section: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#1e293b',
    marginBottom: '1rem',
    margin: '0 0 1rem 0'
  },
  paragraph: {
    margin: '0 0 1rem 0',
    color: '#475569',
    lineHeight: '1.7'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    display: 'block'
  },
  featureTitle: {
    margin: '0 0 0.5rem 0',
    color: '#1e293b',
    fontSize: '1.125rem'
  },
  featureDesc: {
    margin: 0,
    color: '#64748b',
    fontSize: '0.875rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    textAlign: 'center'
  },
  stat: {
    padding: '0.5rem'
  },
  statValue: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#3b82f6'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#64748b'
  },
  cta: {
    textAlign: 'center'
  },
  ctaTitle: {
    margin: '0 0 0.5rem 0',
    color: '#1e293b'
  },
  ctaText: {
    margin: '0 0 1.5rem 0',
    color: '#64748b'
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  ctaButtonPrimary: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '500'
  },
  ctaButtonSecondary: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#3b82f6',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    border: '2px solid #3b82f6'
  }
}

export default About