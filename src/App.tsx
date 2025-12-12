import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { HomePage } from './pages/HomePage';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Lazy load routes
const AcademyPage = lazy(() => import('./features/academy/AcademyPage').then(m => ({ default: m.AcademyPage })));
const SafariPage = lazy(() => import('./pages/SafariPage').then(m => ({ default: m.SafariPage })));
const LifestylePage = lazy(() => import('./pages/LifestylePage').then(m => ({ default: m.LifestylePage })));
const GalleryPage = lazy(() => import('./features/gallery/GalleryPage').then(m => ({ default: m.GalleryPage })));
const CoffeePage = lazy(() => import('./pages/CoffeePage').then(m => ({ default: m.CoffeePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const BookingPage = lazy(() => import('./pages/BookingPage').then(m => ({ default: m.BookingPage })));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen pb-16 md:pb-0">
          <Header />
          <main>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-16 h-16 animate-spin text-gold-500 mx-auto mb-4" />
                  <p className="text-lg font-sans text-slate-600 dark:text-cream-400">Loading...</p>
                </div>
              </div>
            }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/academy" element={<AcademyPage />} />
              <Route path="/safari" element={<SafariPage />} />
              <Route path="/lifestyle" element={<LifestylePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/coffee" element={<CoffeePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/booking" element={<BookingPage />} />
            </Routes>
            </Suspense>
          </main>
          <Footer />
          <MobileBottomNav />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
