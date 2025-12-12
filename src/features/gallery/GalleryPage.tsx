import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SEOMeta } from '../../components/common/SEOMeta';
import { Instagram, Camera } from 'lucide-react';

// Import images
import horse1 from '../../assets/images/horses/horse-1.jpg';
import horse2 from '../../assets/images/horses/horse-2.jpg';
import equestrianTraining from '../../assets/images/horses/equestrian-training.jpg';
import horseJumping from '../../assets/images/horses/horse-jumping.jpg';
import ridingTraining from '../../assets/images/horses/riding-training.jpg';
import showJumping1 from '../../assets/images/horses/show-jumping-1.jpg';
import showJumping2 from '../../assets/images/horses/show-jumping-2.jpg';
import showJumping3 from '../../assets/images/horses/show-jumping-3.jpg';
import stableFacility from '../../assets/images/horses/stable-facility.jpg';
import ridingSafari from '../../assets/images/services/riding-safari.jpg';
import horseLesson from '../../assets/images/services/horse-lesson.jpg';
import privateTraining from '../../assets/images/services/private-training.jpg';
import clubhouse from '../../assets/images/facility/clubhouse.png';
import entrance from '../../assets/images/facility/entrance.jpg';
import indoorArena from '../../assets/images/facility/indoor-arena.png';
import ridingArena from '../../assets/images/facility/riding-arena.png';
import stableExterior from '../../assets/images/facility/stable-exterior.png';
import stableInterior from '../../assets/images/facility/stable-interior.png';

type Category = 'all' | 'safari' | 'lifestyle' | 'academy';

interface GalleryImage {
  id: number;
  category: Category;
  alt: string;
  src: string;
}

export const GalleryPage = () => {
  const { t } = useTranslation('gallery');
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  // Gallery images organized by category
  const images: GalleryImage[] = [
    // Safari
    { id: 1, category: 'safari', alt: 'Horse riding safari through scenic trails', src: ridingSafari },
    { id: 2, category: 'safari', alt: 'Beautiful horse ready for safari', src: horse1 },
    { id: 3, category: 'safari', alt: 'Riding training in natural setting', src: ridingTraining },
    
    // Academy
    { id: 4, category: 'academy', alt: 'Professional equestrian training session', src: equestrianTraining },
    { id: 5, category: 'academy', alt: 'Horse jumping training', src: horseJumping },
    { id: 6, category: 'academy', alt: 'Show jumping competition', src: showJumping1 },
    { id: 7, category: 'academy', alt: 'Show jumping in action', src: showJumping2 },
    { id: 8, category: 'academy', alt: 'Advanced show jumping', src: showJumping3 },
    { id: 9, category: 'academy', alt: 'Horse lesson with instructor', src: horseLesson },
    { id: 10, category: 'academy', alt: 'Private training session', src: privateTraining },
    
    // Lifestyle (Facilities)
    { id: 11, category: 'lifestyle', alt: 'Premium clubhouse exterior', src: clubhouse },
    { id: 12, category: 'lifestyle', alt: 'MAM Center entrance', src: entrance },
    { id: 13, category: 'lifestyle', alt: 'Modern indoor arena', src: indoorArena },
    { id: 14, category: 'lifestyle', alt: 'Outdoor riding arena', src: ridingArena },
    { id: 15, category: 'lifestyle', alt: 'Well-maintained stable exterior', src: stableExterior },
    { id: 16, category: 'lifestyle', alt: 'Clean stable interior', src: stableInterior },
    { id: 17, category: 'lifestyle', alt: 'Stable facility overview', src: stableFacility },
    { id: 18, category: 'lifestyle', alt: 'Premium horse', src: horse2 },
  ];

  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  const filters: Category[] = ['all', 'safari', 'lifestyle', 'academy'];

  return (
    <>
      <SEOMeta
        title={t('hero.title')}
        description={t('hero.subtitle')}
        keywords="gallery, photos, horse riding, cafe, equestrian, Kurdistan, Iraq"
      />

      {/* Hero */}
      <section className="relative min-h-[40vh] bg-gradient-to-br from-forest-800 to-forest-600 flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-cream-200 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-cream-300 font-sans max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-cream-200 dark:bg-slate-900 py-8 sticky top-16 z-10 border-b-2 border-forest-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-4 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 font-sans font-semibold transition-all ${
                  activeFilter === filter
                    ? 'bg-forest-600 text-cream-200'
                    : 'bg-white dark:bg-slate-800 text-forest-700 dark:text-cream-200 hover:bg-forest-600/10 dark:hover:bg-forest-600/20'
                }`}
              >
                {t(`filters.${filter}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-cream-200 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-luxury"
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/60 transition-colors flex items-end p-6">
                    <p className="text-cream-200 font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                      {image.alt}
                    </p>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gold-400 text-forest-900 text-sm font-sans font-semibold">
                      {t(`filters.${image.category}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 mx-auto mb-6 text-gold-500" />
              <p className="text-2xl font-serif text-forest-700 dark:text-cream-200 mb-4">
                {t('placeholder')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-saddle-600 to-saddle-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-cream-200 mb-4">
            {t('hero.subtitle')}
          </h2>
          <p className="text-lg text-cream-300 font-sans mb-6">
            Follow us on Instagram for daily updates
          </p>
          <a
            href="https://instagram.com/mamcenter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-semibold transition-colors"
            dir="ltr"
          >
            <Instagram className="w-5 h-5" />
            <span>@mamcenter</span>
          </a>
        </div>
      </section>
    </>
  );
};

