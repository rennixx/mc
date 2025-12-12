import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CarouselImage {
  id: number;
  url: string;
  captionKey: string;
  locationKey: string;
}

const images: CarouselImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940',
    captionKey: 'sunrise.caption',
    locationKey: 'sunrise.location',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2832',
    captionKey: 'sunset.caption',
    locationKey: 'sunset.location',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2874',
    captionKey: 'mistyMorning.caption',
    locationKey: 'mistyMorning.location',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=2873',
    captionKey: 'goldenHour.caption',
    locationKey: 'goldenHour.location',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2940',
    captionKey: 'wildflowers.caption',
    locationKey: 'wildflowers.location',
  },
];

export const ViewGallery = () => {
  const { t } = useTranslation('lifestyle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation (desktop only)
  useEffect(() => {
    if (isPaused || window.innerWidth < 768) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="space-y-6">
      {/* Main Carousel */}
      <div
        className="relative aspect-video bg-slate-800 overflow-hidden shadow-luxury group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Image */}
        <img
          src={currentImage.url}
          alt={t(`gallery.images.${currentImage.captionKey}`)}
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        {/* Caption Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-800/60 backdrop-blur-sm p-6 text-cream-200">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-sans text-gold-400 mb-1">{t(`gallery.images.${currentImage.locationKey}`)}</p>
            <p className="text-lg font-serif">{t(`gallery.images.${currentImage.captionKey}`)}</p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900/90 text-cream-200 w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={t('gallery.controls.previous')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900/90 text-cream-200 w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={t('gallery.controls.next')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Pause Indicator */}
        {isPaused && (
          <div className="absolute top-4 right-4 bg-slate-900/70 px-3 py-1 text-xs font-sans text-cream-200">
            {t('gallery.controls.pause')}
          </div>
        )}
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 h-3 bg-gold-500'
                : 'w-3 h-3 bg-slate-400 dark:bg-slate-600 hover:bg-gold-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center text-sm font-sans text-slate-600 dark:text-cream-400">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};
