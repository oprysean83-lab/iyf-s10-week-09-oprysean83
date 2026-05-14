/**
 * Category definitions & mock data enrichment for demo
 */
export const CATEGORIES = {
  opportunities: {
    label: 'Opportunities',
    icon: '📍',
    color: '#10b981',
    fields: ['type', 'location', 'deadline', 'compensation']
  },
  collaborations: {
    label: 'Collaborations',
    icon: '🤝',
    color: '#8b5cf6',
    fields: ['skillsNeeded', 'projectType', 'portfolioUrl']
  },
  learn: {
    label: 'Learn & Share',
    icon: '💻',
    color: '#3b82f6',
    fields: ['language', 'difficulty', 'codeSnippet']
  }
}

// Enrich API posts with categories for demo purposes
export const enrichPosts = (posts) => {
  if (!posts) return []
  return posts.map((post, i) => ({
    ...post,
    category: i % 3 === 0 ? 'opportunities' 
            : i % 3 === 1 ? 'collaborations' 
            : 'learn',
    location: ['Nairobi', 'Mombasa', 'Kisumu', 'Remote (KE)'][i % 4],
    type: ['Internship', 'Gig', 'Volunteer', 'Event'][i % 4],
    skillsNeeded: ['React', 'Node.js', 'UI/UX', 'Copywriting'][i % 4],
    language: ['JavaScript', 'Python', 'HTML/CSS', 'TypeScript'][i % 4],
    difficulty: ['Beginner', 'Intermediate', 'Advanced'][i % 3]
  }))
}