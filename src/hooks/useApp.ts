import { useAppStore } from '../store'

// Theme hooks
export const useTheme = () => useAppStore((state) => ({
  theme: state.theme,
  toggleTheme: state.toggleTheme,
  setTheme: state.setTheme,
}))

// Language hooks
export const useLanguage = () => useAppStore((state) => ({
  language: state.language,
  setLanguage: state.setLanguage,
}))

// User hooks
export const useUser = () => useAppStore((state) => ({
  user: state.user,
  setUser: state.setUser,
}))

// Booking hooks
export const useBookingDraft = () => useAppStore((state) => ({
  draft: state.bookingDraft,
  setDraft: state.setBookingDraft,
}))

// Mobile menu hooks
export const useMobileMenu = () => useAppStore((state) => ({
  isOpen: state.isMobileMenuOpen,
  toggle: state.toggleMobileMenu,
  close: state.closeMobileMenu,
}))

// Booking modal hooks
export const useBookingModal = () => useAppStore((state) => ({
  isOpen: state.isBookingModalOpen,
  open: state.openBookingModal,
  close: state.closeBookingModal,
}))
