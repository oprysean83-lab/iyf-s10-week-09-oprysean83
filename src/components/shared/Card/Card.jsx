/**
 * 🔹 Task 18.3: Reusable Card Component
 */
function Card({ 
  children, 
  title, 
  subtitle, 
  variant = 'default', 
  className = '',
  header,
  footer
}) {
  const variants = {
    default: 'border-gray-200',
    primary: 'border-l-4 border-l-blue-500',
    success: 'border-l-4 border-l-green-500',
    warning: 'border-l-4 border-l-yellow-500',
    danger: 'border-l-4 border-l-red-500'
  }
  
  return (
    <div className={`
      bg-white rounded-lg shadow-sm
      border ${variants[variant]}
      ${className}
    `.trim()}>
      {(header || title) && (
        <div className="px-6 py-4 border-b border-gray-100">
          {header || (
            <>
              {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </>
          )}
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card