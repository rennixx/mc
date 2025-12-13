import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SEOMeta } from '../../components/common/SEOMeta';
import { Lightbox } from '../../components/common/Lightbox';
import { Instagram, Camera, ArrowLeft, FolderOpen, Image as ImageIcon } from 'lucide-react';

// Import images
import horse1 from '../../assets/images/horses/horse-1.jpg';
import horse2 from '../../assets/images/horses/horse-2.jpg';
import equestrianTraining from '../../assets/images/horses/equestrian-training.jpg';
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

interface GalleryImage {
  id: number;
  alt: string;
  src: string;
}

interface Album {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  images: GalleryImage[];
}

export const GalleryPage = () => {
  const { t } = useTranslation('gallery');
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Albums with images
  const albums: Album[] = [
    {
      id: 1,
      title: 'Safari Adventures',
      description: 'Explore breathtaking mountain trails and scenic landscapes',
      coverImage: ridingSafari,
      images: [
        { id: 1, alt: 'Horse riding safari through scenic trails', src: ridingSafari },
        { id: 2, alt: 'Beautiful horse ready for safari', src: horse1 },
        { id: 3, alt: 'Riding training in natural setting', src: ridingTraining },
        { id: 4, alt: 'Safari mountain views', src: ridingArena },
      ]
    },
    {
      id: 2,
      title: 'Academy Training',
      description: 'Professional lessons for all skill levels',
      coverImage: horseLesson,
      images: [
        { id: 5, alt: 'Professional equestrian training session', src: equestrianTraining },
        { id: 6, alt: 'Horse lesson with instructor', src: horseLesson },
        { id: 7, alt: 'Private training session', src: privateTraining },
        { id: 8, alt: 'Riding training practice', src: ridingTraining },
      ]
    },
    {
      id: 3,
      title: 'Show Jumping',
      description: 'Championship-level jumping competitions and training',
      coverImage: showJumping1,
      images: [
        { id: 9, alt: 'Show jumping competition', src: showJumping1 },
        { id: 10, alt: 'Show jumping in action', src: showJumping2 },
        { id: 11, alt: 'Advanced show jumping', src: showJumping3 },
        { id: 12, alt: 'Professional equestrian training', src: equestrianTraining },
      ]
    },
    {
      id: 4,
      title: 'Cafe & Lifestyle',
      description: 'Baran Coffee and relaxation spaces',
      coverImage: clubhouse,
      images: [
        { id: 13, alt: 'Premium clubhouse exterior', src: clubhouse },
        { id: 14, alt: 'MAM Center entrance', src: entrance },
        { id: 15, alt: 'Premium horse', src: horse2 },
        { id: 16, alt: 'Outdoor riding arena', src: ridingArena },
      ]
    },
    {
      id: 5,
      title: 'Facilities',
      description: 'World-class stables, arenas, and training grounds',
      coverImage: indoorArena,
      images: [
        { id: 17, alt: 'Modern indoor arena', src: indoorArena },
        { id: 18, alt: 'Outdoor riding arena', src: ridingArena },
        { id: 19, alt: 'Well-maintained stable exterior', src: stableExterior },
        { id: 20, alt: 'Clean stable interior', src: stableInterior },
        { id: 21, alt: 'Stable facility overview', src: stableFacility },
      ]
    },
    {
      id: 6,
      title: 'Our Horses',
      description: 'Meet our beautiful and well-trained horses',
      coverImage: horse1,
      images: [
        { id: 22, alt: 'Beautiful Arabian horse', src: horse1 },
        { id: 23, alt: 'Premium trained horse', src: horse2 },
        { id: 24, alt: 'Horse ready for training', src: equestrianTraining },
        { id: 25, alt: 'Horses in stable', src: stableFacility },
      ]
    }
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (selectedAlbum) {
      setCurrentImageIndex((prev) => Math.min(prev + 1, selectedAlbum.images.length - 1));
    }
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => Math.max(prev - 1, 0));
  };

  const backToAlbums = () => {
    setSelectedAlbum(null);
    setLightboxOpen(false);
  };

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
            {selectedAlbum ? selectedAlbum.description : t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Albums View */}
      {!selectedAlbum ? (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 glass px-6 py-3 mb-6">
                <FolderOpen className="w-6 h-6 text-gold-400" />
                <span className="text-cream-100 font-sans text-sm tracking-wider uppercase">Photo Albums</span>
              </div>
              <h2 className="text-4xl font-serif font-bold text-cream-100 mb-4">
                Browse Our Collections
              </h2>
              <p className="text-lg text-cream-200 font-sans">
                {albums.reduce((total, album) => total + album.images.length, 0)} photos across {albums.length} albums
              </p>
            </div>

            {/* Albums Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => setSelectedAlbum(album)}
                  className="group cursor-pointer glass-card overflow-hidden hover:scale-105 hover:border-gold-400 transition-all"
                >
                  {/* Album Cover */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Image Count Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="glass px-3 py-1 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-cream-100" />
                        <span className="text-cream-100 font-sans text-sm font-semibold">
                          {album.images.length}
                        </span>
                      </div>
                    </div>

                    {/* Album Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-serif font-bold text-cream-100 mb-2">
                        {album.title}
                      </h3>
                      <p className="text-cream-200 font-sans text-sm">
                        {album.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div className="p-4 bg-gradient-to-r from-forest-800 to-forest-700">
                    <div className="flex items-center justify-between text-cream-100 font-sans font-semibold">
                      <span>View Album</span>
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Album Detail View */
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Back Button */}
            <button
              onClick={backToAlbums}
              className="flex items-center gap-2 glass-card px-6 py-3 mb-8 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-cream-100" />
              <span className="text-cream-100 font-sans font-semibold">Back to Albums</span>
            </button>

            {/* Album Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream-100 mb-4">
                {selectedAlbum.title}
              </h2>
              <p className="text-lg text-cream-200 font-sans mb-2">
                {selectedAlbum.description}
              </p>
              <p className="text-cream-300 font-sans text-sm">
                {selectedAlbum.images.length} {selectedAlbum.images.length === 1 ? 'photo' : 'photos'}
              </p>
            </div>

            {/* Images Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedAlbum.images.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square overflow-hidden cursor-pointer glass-card hover:scale-105 hover:border-gold-400 transition-all"
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
                  
                  {/* Zoom indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="glass-card p-2">
                      <Camera className="w-5 h-5 text-cream-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
            href="https://instagram.com/mamcenter2011"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-semibold transition-colors"
            dir="ltr"
          >
            <Instagram className="w-5 h-5" />
            <span>@mamcenter2011</span>
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && selectedAlbum && (
        <Lightbox
          images={selectedAlbum.images}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={previousImage}
        />
      )}
    </>
  );
};

