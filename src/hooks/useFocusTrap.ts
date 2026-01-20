import { useEffect, type RefObject } from 'react'

/**
 * Focus Trap Hook
 * Traps keyboard focus within a container (e.g., modal, dialog)
 * Essential for accessibility and WCAG compliance
 *
 * @param isActive - Whether the focus trap should be active
 * @param containerRef - Reference to the container element
 *
 * @example
 * const modalRef = useRef<HTMLDivElement>(null)
 * useFocusTrap(isOpen, modalRef)
 */
export const useFocusTrap = (
  isActive: boolean,
  containerRef: RefObject<HTMLElement>
) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current

    // Get all focusable elements within the container
    const focusableElements = container.querySelectorAll<
      HTMLElement
    >(
      'a[href], button:not([disabled]), textarea:not([disabled]), ' +
        'input:not([disabled]), select:not([disabled]), ' +
        '[tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus the first element when trap activates
    firstElement?.focus()

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      // Shift + Tab: Move to previous element
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      }
      // Tab: Move to next element
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Trigger escape event for parent to handle
        container.dispatchEvent(
          new CustomEvent('focusTrapEscape', { bubbles: true })
        )
      }
    }

    container.addEventListener('keydown', handleTab)
    container.addEventListener('keydown', handleEscape)

    return () => {
      container.removeEventListener('keydown', handleTab)
      container.removeEventListener('keydown', handleEscape)
    }
  }, [isActive, containerRef])
}

/**
 * Return Focus Hook
 * Returns focus to a trigger element after an action (e.g., closing a modal)
 *
 * @param isActive - Whether the return focus should happen
 * @param triggerRef - Reference to the trigger element
 */
export const useReturnFocus = (
  shouldReturn: boolean,
  triggerRef: RefObject<HTMLElement>
) => {
  useEffect(() => {
    if (!shouldReturn || !triggerRef.current) return

    // Return focus to the trigger element
    triggerRef.current.focus()
  }, [shouldReturn, triggerRef])
}
