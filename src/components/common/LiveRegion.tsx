import { useState, useEffect } from 'react'

export interface LiveRegionProps {
  message: string
  role: 'status' | 'alert'
  politeness?: 'polite' | 'assertive'
  className?: string
}

/**
 * LiveRegion Component
 * Announces dynamic content changes to screen readers
 * Essential for accessibility (WCAG 2.1 AAA requirement)
 *
 * @example
 * <LiveRegion message="Form submitted successfully" role="status" />
 * <LiveRegion message="Error occurred" role="alert" politeness="assertive" />
 */
export const LiveRegion = ({
  message,
  role,
  politeness = 'polite',
  className,
}: LiveRegionProps) => {
  const [announced, setAnnounced] = useState(false)

  useEffect(() => {
    // Reset announcement state
    setAnnounced(false)

    // Small delay to ensure screen registers the change
    const timer = setTimeout(() => {
      setAnnounced(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [message])

  if (!message) return null

  return (
    <div
      role={role}
      aria-live={politeness}
      aria-atomic="true"
      className={`sr-only ${className || ''}`}
    >
      {announced ? message : ''}
    </div>
  )
}
