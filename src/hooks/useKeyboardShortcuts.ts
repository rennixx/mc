import { useEffect } from 'react'

type ShortcutHandler = () => void

interface Shortcuts {
  [key: string]: ShortcutHandler
}

interface KeyboardShortcutsOptions {
  /**
   * Whether the shortcuts should be active
   */
  disabled?: boolean
  /**
   * Keyboard event target (defaults to window)
   */
  target?: HTMLElement | Window
}

/**
 * Keyboard Shortcuts Hook
 * Registers global keyboard shortcuts for power users
 *
 * @example
 * useKeyboardShortcuts({
 *   'h': () => navigate('/home'),
 *   'b': () => openBooking(),
 *   '?': () => showHelp(),
 * })
 */
export const useKeyboardShortcuts = (
  shortcuts: Shortcuts,
  options: KeyboardShortcutsOptions = {}
) => {
  const { disabled = false, target = window } = options

  useEffect(() => {
    if (disabled) return

    const handleKeyDown = (e: Event) => {
      const keyEvent = e as KeyboardEvent
      const key = keyEvent.key.toLowerCase()

      // Check for Alt + Key combinations
      if (keyEvent.altKey && shortcuts[key]) {
        keyEvent.preventDefault()
        shortcuts[key]()
      }

      // Check for plain key shortcuts (single letters)
      if (!keyEvent.altKey && !keyEvent.ctrlKey && !keyEvent.metaKey && shortcuts[key]) {
        // Only trigger if not typing in an input
        const targetEl = keyEvent.target as HTMLElement
        const isInputField =
          targetEl.tagName === 'INPUT' ||
          targetEl.tagName === 'TEXTAREA' ||
          targetEl.tagName === 'SELECT' ||
          targetEl.contentEditable === 'true'

        if (!isInputField) {
          keyEvent.preventDefault()
          shortcuts[key]()
        }
      }
    }

    target.addEventListener('keydown', handleKeyDown as EventListener)

    return () => {
      target.removeEventListener('keydown', handleKeyDown as EventListener)
    }
  }, [shortcuts, disabled, target])
}

/**
 * Common keyboard shortcuts for the application
 */
export const useAppShortcuts = (
  handlers: {
    onHome?: () => void
    onBooking?: () => void
    onMenu?: () => void
    onHelp?: () => void
    onSearch?: () => void
  },
  disabled?: boolean
) => {
  useKeyboardShortcuts(
    {
      ...(handlers.onHome && { h: handlers.onHome }),
      ...(handlers.onBooking && { b: handlers.onBooking }),
      ...(handlers.onMenu && { m: handlers.onMenu }),
      ...(handlers.onHelp && { '?': handlers.onHelp }),
      ...(handlers.onSearch && { '/': handlers.onSearch }),
    },
    { disabled }
  )
}
