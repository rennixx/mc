import { useAppStore } from '../store'

//removed
// Individual selectors for Zustand to avoid infinite re-renders
// Use individual selectors instead of object selectors

// Theme hooks
export const useTheme = () => {
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  const setTheme = useAppStore((state) => state.setTheme)
  return { theme, toggleTheme, setTheme }
}

// Language hooks
export const useLanguage = () => {
  const language = useAppStore((state) => state.language)
  const setLanguage = useAppStore((state) => state.setLanguage)
  return { language, setLanguage }
}

// User hooks
export const useUser = () => {
  const user = useAppStore((state) => state.user)
  const setUser = useAppStore((state) => state.setUser)
  return { user, setUser }
}

// Booking hooks
export const useBookingDraft = () => {
  const draft = useAppStore((state) => state.bookingDraft)
  const setDraft = useAppStore((state) => state.setBookingDraft)
  return { draft, setDraft }
}

// Mobile menu hooks
export const useMobileMenu = () => {
  const isOpen = useAppStore((state) => state.isMobileMenuOpen)
  const toggle = useAppStore((state) => state.toggleMobileMenu)
  const close = useAppStore((state) => state.closeMobileMenu)
  return { isOpen, toggle, close }
}

// Booking modal hooks
export const useBookingModal = () => {
  const isOpen = useAppStore((state) => state.isBookingModalOpen)
  const open = useAppStore((state) => state.openBookingModal)
  const close = useAppStore((state) => state.closeBookingModal)
  return { isOpen, open, close }
}
