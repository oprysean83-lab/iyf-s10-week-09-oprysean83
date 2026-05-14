/**
 * 🔹 Task 18.3: Reusable Avatar Component
 */
function Avatar({ 
  name, 
  src, 
  size = 'medium', 
  variant = 'initials',
  className = ''
}) {
  const sizes = {
    small: { width: '32px', height: '32px', fontSize: '0.75rem' },
    medium: { width: '48px', height: '48px', fontSize: '1rem' },
    large: { width: '64px', height: '64px', fontSize: '1.25rem' },
    xlarge: { width: '96px', height: '96px', fontSize: '1.75rem' }
  }
  
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
  ]
  
  // Generate consistent color based on name
  const getColor = (name) => {
    if (!name) return colors[0]
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }
  
  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }
  
  const sizeStyle = sizes[size] || sizes.medium
  const bgColor = getColor(name)
  
  if (variant === 'image' && src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        style={{
          ...styles.image,
          ...sizeStyle,
          borderRadius: size === 'xlarge' ? '50%' : '8px'
        }}
        className={className}
        onError={(e) => {
          // Fallback to initials if image fails
          e.target.style.display = 'none'
          e.target.nextSibling?.style?.display?.('flex')
        }}
      />
    )
  }
  
  return (
    <div
      style={{
        ...styles.avatar,
        ...sizeStyle,
        backgroundColor: bgColor,
        borderRadius: size === 'xlarge' ? '50%' : '8px'
      }}
      className={className}
      title={name}
    >
      {variant === 'initials' ? getInitials(name) : '👤'}
    </div>
  )
}

const styles = {
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    flexShrink: 0,
    transition: 'transform 0.2s'
  },
  image: {
    objectFit: 'cover',
    border: '2px solid white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
}

export default Avatar