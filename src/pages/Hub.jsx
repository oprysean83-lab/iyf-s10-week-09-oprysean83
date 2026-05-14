/**
 * Main unified explore page combining Opportunities + Collaborations + Learn
 */
import { useState, useEffect } from 'react'
import { Input, Button, Card } from '../components/shared'
import CategoryTabs from '../components/Hub/CategoryTabs'
import CategoryCard from '../components/Hub/CategoryCard'
import { enrichPosts } from '../utils/categoryUtils'
import { useFetch } from '../hooks/useFetch'
import LoadingSpinner from '../components/Lesson17/LoadingSpinner'
import ErrorMessage from '../components/Lesson17/ErrorMessage'

export default function Hub() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  
  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  // Fetch & enrich data
  const {  posts, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=12'
  )
  
  const enrichedPosts = enrichPosts(posts)
  
  // Filter by tab + search
  const filtered = enrichedPosts.filter(post => {
    const matchesTab = activeTab === 'all' || post.category === activeTab
    const matchesSearch = !debouncedSearch || 
      post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      post.body.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (post.location || '').toLowerCase().includes(debouncedSearch.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>🇰🇪 Explore SocialHub</h1>
        <p style={styles.subtitle}>
          Discover opportunities, find collaborators, and level up your tech skills in Kenya
        </p>
      </div>

      <CategoryTabs active={activeTab} onChange={setActiveTab} />

      <div style={styles.toolbar}>
        <div style={styles.searchWrapper}>
          <Input
            type="search"
            placeholder="Search gigs, projects, code snippets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} style={styles.clearBtn}>✕</button>
          )}
        </div>
        <Button variant="outline" onClick={refetch}>🔄 Refresh</Button>
      </div>

      {loading && <LoadingSpinner text="Loading community posts..." />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <p style={styles.results}>
            Showing {filtered.length} post{filtered.length !== 1 ? 's' : ''}
            {activeTab !== 'all' && ` in ${CATEGORIES[activeTab]?.label || activeTab}`}
            {debouncedSearch && ` for "${debouncedSearch}"`}
          </p>

          {filtered.length === 0 ? (
            <Card className="text-center" style={{ padding: '3rem' }}>
              <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</p>
              <p style={{ color: '#64748b' }}>No matches found. Try a different search or category.</p>
              <Button variant="ghost" onClick={() => { setSearch(''); setActiveTab('all'); }}>
                Reset filters
              </Button>
            </Card>
          ) : (
            <div style={styles.grid}>
              {filtered.map(post => (
                <CategoryCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

import { CATEGORIES } from '../utils/categoryUtils'

const styles = {
  header: { textAlign: 'center', marginBottom: '2rem' },
  title: { fontSize: '1.75rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem' },
  subtitle: { fontSize: '1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' },
  toolbar: { display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' },
  searchWrapper: { position: 'relative', flex: 1, maxWidth: '400px' },
  clearBtn: { position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' },
  results: { fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }
}