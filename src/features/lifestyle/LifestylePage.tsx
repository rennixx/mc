import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SEOMeta } from '../../components/common/SEOMeta';
import { WhatsAppButton } from '../../components/common/WhatsAppButton';
import { Coffee, Clock, Users, MapPin, Phone, ChevronLeft, ChevronRight, Search } from 'lucide-react';

// Import cafe images (using existing assets)
import clubhouse from '../../assets/images/facility/clubhouse.png';
import entrance from '../../assets/images/facility/entrance.jpg';
import ridingArena from '../../assets/images/facility/riding-arena.png';

type MenuCategory = 'all' | 'coffee' | 'mocktails' | 'snacks' | 'sweets';

interface MenuItem {
  id: string;
  category: MenuCategory;
  price: string;
  dietary?: string[];
}

export const LifestylePage = () => {
  const { t } = useTranslation('lifestyle');
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const menuItems: MenuItem[] = [
    // Coffee
    { id: 'kurdishDibekCoffee', category: 'coffee', price: '$4.50', dietary: ['V'] },
    { id: 'lavenderLatte', category: 'coffee', price: '$5.00' },
    { id: 'coldBrew', category: 'coffee', price: '$4.00', dietary: ['V'] },
    { id: 'cardamomCappuccino', category: 'coffee', price: '$4.50' },
    { id: 'turkishCoffee', category: 'coffee', price: '$3.50', dietary: ['V', 'GF'] },
    
    // Mocktails
    { id: 'pomegranateSunset', category: 'mocktails', price: '$6.00', dietary: ['V', 'GF'] },
    { id: 'mountainBerryFizz', category: 'mocktails', price: '$5.50', dietary: ['V', 'GF'] },
    { id: 'honeyLemonade', category: 'mocktails', price: '$4.50', dietary: ['V', 'GF'] },
    { id: 'roseWaterCooler', category: 'mocktails', price: '$5.00', dietary: ['V', 'GF'] },
    
    // Snacks
    { id: 'kurdishCheesePlate', category: 'snacks', price: '$12.00', dietary: ['GF'] },
    { id: 'flatbreadDips', category: 'snacks', price: '$10.00', dietary: ['V'] },
    { id: 'fruitPlatter', category: 'snacks', price: '$8.00', dietary: ['V', 'GF'] },
    { id: 'mixedNuts', category: 'snacks', price: '$6.00', dietary: ['V', 'GF'] },
    
    // Sweets
    { id: 'baklavaAssortment', category: 'sweets', price: '$7.00' },
    { id: 'kurdishKlecha', category: 'sweets', price: '$5.00', dietary: ['V'] },
    { id: 'halva', category: 'sweets', price: '$4.50', dietary: ['V', 'GF'] },
    { id: 'carrotCake', category: 'sweets', price: '$6.00' },
  ];

  const galleryImages = [
    { src: clubhouse, caption: t('gallery.images.sunrise.caption'), location: t('gallery.images.sunrise.location') },
    { src: entrance, caption: t('gallery.images.sunset.caption'), location: t('gallery.images.sunset.location') },
    { src: ridingArena, caption: t('gallery.images.mistyMorning.caption'), location: t('gallery.images.mistyMorning.location') },
  ];

  const filteredMenu = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      t(`menu.items.${item.id}.name`).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(`menu.items.${item.id}.description`).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: MenuCategory[] = ['all', 'coffee', 'mocktails', 'snacks', 'sweets'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <>
      <SEOMeta
        title={t('hero.title')}
        description={t('hero.subtitle')}
        keywords="coffee shop, cafe, mountain view, Kurdistan coffee, mocktails, Erbil cafe"
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-forest-800 to-forest-600 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-3 glass px-6 py-3 mb-6">
            <Coffee className="w-6 h-6 text-gold-400" />
            <span className="text-cream-100 font-sans text-sm tracking-wider uppercase">Baran Coffee</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream-200 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-cream-300 font-sans max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold text-cream-100 mb-6">
            {t('about.title')}
          </h2>
          <p className="text-lg text-cream-200 font-sans leading-relaxed">
            {t('about.description')}
          </p>
        </div>
      </section>

      {/* View Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-forest-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-cream-100 mb-4">
              {t('sections.view.title')}
            </h2>
            <p className="text-lg text-cream-200 font-sans">
              {t('sections.view.subtitle')}
            </p>
          </div>

          <div className="glass-card overflow-hidden max-w-5xl mx-auto">
            <div className="relative aspect-video">
              <img
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].caption}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 glass p-3 hover:bg-white/20 transition-colors"
                aria-label={t('gallery.controls.previous')}
              >
                <ChevronLeft className="w-6 h-6 text-cream-100" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 glass p-3 hover:bg-white/20 transition-colors"
                aria-label={t('gallery.controls.next')}
              >
                <ChevronRight className="w-6 h-6 text-cream-100" />
              </button>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 glass-nav p-6">
                <h3 className="text-xl font-serif font-bold text-cream-100 mb-1">
                  {galleryImages[currentImageIndex].caption}
                </h3>
                <p className="text-cream-200 font-sans">
                  {galleryImages[currentImageIndex].location}
                </p>
              </div>
            </div>

            {/* Image Dots */}
            <div className="flex justify-center gap-2 p-4">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 transition-all ${
                    index === currentImageIndex ? 'bg-gold-400 w-8' : 'bg-cream-400/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-cream-100 mb-4">
              {t('sections.menu.title')}
            </h2>
            <p className="text-lg text-cream-200 font-sans">
              {t('sections.menu.subtitle')}
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream-300" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('menu.search')}
                  className="w-full glass-card pl-12 pr-4 py-3 text-cream-100 placeholder:text-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 font-sans font-semibold transition-all ${
                    activeCategory === category
                      ? 'bg-gold-500 text-forest-900 shadow-luxury'
                      : 'glass-card text-cream-100 hover:bg-white/10'
                  }`}
                >
                  {t(`menu.categories.${category}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <div key={item.id} className="glass-card p-6 hover:border-gold-400 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-serif font-bold text-cream-100">
                    {t(`menu.items.${item.id}.name`)}
                  </h3>
                  <span className="text-gold-400 font-sans font-bold text-lg">
                    {item.price}
                  </span>
                </div>
                
                <p className="text-cream-200 font-sans mb-3">
                  {t(`menu.items.${item.id}.description`)}
                </p>

                {item.dietary && item.dietary.length > 0 && (
                  <div className="flex gap-2">
                    {item.dietary.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-sans font-semibold rounded">
                        {t(`menu.dietary.${tag}`)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="text-center py-12">
              <p className="text-cream-300 font-sans text-lg">No items match your search</p>
            </div>
          )}

          {/* Payment Note */}
          <div className="mt-8 text-center">
            <p className="text-cream-300 font-sans text-sm italic">
              {t('menu.legend.note')}
            </p>
          </div>
        </div>
      </section>

      {/* Atmosphere Section */}
      <section className="py-20 bg-gradient-to-b from-forest-800/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-cream-100 mb-4">
              {t('sections.atmosphere.title')}
            </h2>
            <p className="text-lg text-cream-200 font-sans">
              {t('sections.atmosphere.subtitle')}
            </p>
          </div>

          {/* Peak & Quiet Times */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-500 flex items-center justify-center">
                <Users className="w-8 h-8 text-forest-900" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-cream-100 mb-2">
                {t('atmosphere.peak')}
              </h3>
              <p className="text-cream-200 font-sans">
                {t('atmosphere.peakTime')}
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 flex items-center justify-center">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-cream-100 mb-2">
                {t('atmosphere.quiet')}
              </h3>
              <p className="text-cream-200 font-sans">
                {t('atmosphere.quietTime')}
              </p>
            </div>
          </div>

          {/* Atmosphere Indicators */}
          <div className="grid md:grid-cols-3 gap-6">
            {['coffeeLovers', 'nightOwls', 'dayVisitors'].map((indicator) => (
              <div key={indicator} className="glass-card p-6 text-center">
                <h4 className="text-lg font-serif font-bold text-gold-400 mb-2">
                  {t(`atmosphere.indicators.${indicator}.label`)}
                </h4>
                <p className="text-cream-200 font-sans">
                  {t(`atmosphere.indicators.${indicator}.value`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card p-10">
            <h2 className="text-4xl font-serif font-bold text-cream-100 mb-8 text-center">
              {t('contact.title')}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans font-bold text-cream-100 mb-1">{t('contact.hours')}</h3>
                    <p className="text-cream-200 font-sans">{t('contact.hoursValue')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans font-bold text-cream-100 mb-1">{t('contact.walkIns')}</h3>
                    <p className="text-cream-200 font-sans">{t('contact.walkInsValue')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-sans font-bold text-cream-100 mb-1">{t('contact.capacity')}</h3>
                    <p className="text-cream-200 font-sans">{t('contact.capacityValue')}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:+9647501234567"
                  dir="ltr"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gold-500 hover:bg-gold-600 text-forest-900 font-sans font-bold transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {t('contact.call')}
                </a>
                
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 glass-card text-cream-100 font-sans font-bold hover:bg-white/10 transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  {t('contact.directions')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton message="Hi! I'd like to know more about Baran Coffee and visiting times." />
    </>
  );
};
