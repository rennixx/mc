import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, WhatsAppButton, Testimonials, StatsCounter, useDefaultStats } from '../components/common';
import { SEOMeta } from '../components/common/SEOMeta';
import { Target, Coffee, Building2, Camera, Users } from 'lucide-react';
import heroImage from '../assets/images/horses/show-jumping-1.jpg';
import horseLessonImg from '../assets/images/services/horse-lesson.jpg';
import privateTrainingImg from '../assets/images/services/private-training.jpg';
import ridingSafariImg from '../assets/images/services/riding-safari.jpg';

export const HomePage = () => {
  const { t } = useTranslation('home');
  const stats = useDefaultStats();

  return (
    <div>
      <SEOMeta />
      {/* Single Hero with Image Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Image Background */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.6)',
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/30 to-slate-900/60" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight drop-shadow-2xl">
            {t('hero.title', 'Mam Center')}
          </h1>
          <p className="text-xl md:text-3xl mb-12 opacity-95 drop-shadow-lg">
            {t('hero.subtitle', 'Where passion meets nature')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/academy">
              <Button variant="action" className="min-w-[200px] text-lg py-6 shadow-luxury-lg">
                {t('hero.cta.academy', 'Explore Academy')}
              </Button>
            </Link>
            <Link to="/safari">
              <Button variant="primary" className="min-w-[200px] text-lg py-6 shadow-luxury-lg">
                {t('hero.cta.safari', 'Book Safari')}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Statistics Counter */}
      <StatsCounter stats={stats} />

      {/* Persona Selector */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-4 text-cream-100">{t('personas.sectionTitle')}</h2>
          <p className="text-center text-cream-200 mb-12 text-lg font-sans">{t('personas.sectionSubtitle')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Persona Card 1 */}
            <Link to="/academy" className="group">
              <div className="glass-card p-10 text-center hover:shadow-luxury transition-all duration-300 hover:-translate-y-3 hover:border-gold-400">
                <div className="relative z-10">
                  <Target className="w-12 h-12 mx-auto mb-4 text-gold-400" />
                  <h3 className="text-xl font-serif font-bold mb-3 text-cream-100">{t('personas.cards.learner.title')}</h3>
                  <p className="text-cream-200 text-sm mb-4 font-sans">{t('personas.cards.learner.description')}</p>
                  <span className="text-gold-400 font-sans font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                    <span>{t('personas.cards.learner.cta')}</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Persona Card 2 */}
            <Link to="/lifestyle" className="group">
              <div className="glass-card p-10 text-center hover:shadow-luxury transition-all duration-300 hover:-translate-y-3 hover:border-gold-400">
                <div className="relative z-10">
                  <Coffee className="w-12 h-12 mx-auto mb-4 text-gold-400" />
                  <h3 className="text-xl font-serif font-bold mb-3 text-cream-100">{t('personas.cards.coffee.title')}</h3>
                  <p className="text-cream-200 text-sm mb-4 font-sans">{t('personas.cards.coffee.description')}</p>
                  <span className="text-gold-400 font-sans font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                    <span>{t('personas.cards.coffee.cta')}</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Persona Card 3 */}
            <a href="#contact" className="group">
              <div className="glass-card p-10 text-center hover:shadow-luxury transition-all duration-300 hover:-translate-y-3 hover:border-gold-400">
                <div className="relative z-10">
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-gold-400" />
                  <h3 className="text-xl font-serif font-bold mb-3 text-cream-100">{t('personas.cards.venue.title')}</h3>
                  <p className="text-cream-200 text-sm mb-4 font-sans">{t('personas.cards.venue.description')}</p>
                  <span className="text-gold-400 font-sans font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                    <span>{t('personas.cards.venue.cta')}</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </a>

            {/* Persona Card 4 */}
            <Link to="/safari" className="group">
              <div className="glass-card p-10 text-center hover:shadow-luxury transition-all duration-300 hover:-translate-y-3 hover:border-gold-400">
                <div className="relative z-10">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-gold-400" />
                  <h3 className="text-xl font-serif font-bold mb-3 text-cream-100">{t('personas.cards.photographer.title')}</h3>
                  <p className="text-cream-200 text-sm mb-4 font-sans">{t('personas.cards.photographer.description')}</p>
                  <span className="text-gold-400 font-sans font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                    <span>{t('personas.cards.photographer.cta')}</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Persona Card 5 */}
            <Link to="/academy?age=kids" className="group">
              <div className="glass-card p-10 text-center hover:shadow-luxury transition-all duration-300 hover:-translate-y-3 hover:border-gold-400">
                <div className="relative z-10">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gold-400" />
                  <h3 className="text-xl font-serif font-bold mb-3 text-cream-100">{t('personas.cards.parent.title')}</h3>
                  <p className="text-cream-200 text-sm mb-4 font-sans">{t('personas.cards.parent.description')}</p>
                  <span className="text-gold-400 font-sans font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                    <span>{t('personas.cards.parent.cta')}</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Programs Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-serif font-bold text-center mb-16 text-cream-100">{t('featured.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] glass-card mb-6 overflow-hidden group-hover:shadow-tactile-hover transition-shadow duration-300">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: `url(${horseLessonImg})`}} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-cream-100">{t('featured.programs.beginner.title')}</h3>
              <p className="text-cream-200 mb-6 font-sans">{t('featured.programs.beginner.description')}</p>
              <Button variant="outline">{t('featured.programs.beginner.cta')}</Button>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] glass-card mb-6 overflow-hidden group-hover:shadow-tactile-hover transition-shadow duration-300">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: `url(${privateTrainingImg})`}} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-cream-100">{t('featured.programs.jumping.title')}</h3>
              <p className="text-cream-200 mb-6 font-sans">{t('featured.programs.jumping.description')}</p>
              <Button variant="outline">{t('featured.programs.jumping.cta')}</Button>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] glass-card mb-6 overflow-hidden group-hover:shadow-tactile-hover transition-shadow duration-300">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: `url(${ridingSafariImg})`}} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-cream-100">{t('featured.programs.camp.title')}</h3>
              <p className="text-cream-200 mb-6 font-sans">{t('featured.programs.camp.description')}</p>
              <Button variant="outline">{t('featured.programs.camp.cta')}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials 
        title={t('testimonials.title', 'What Our Clients Say')}
        subtitle={t('testimonials.subtitle', 'Real experiences from our community')}
      />

      {/* WhatsApp Button */}
      <WhatsAppButton message="Hi! I'm interested in learning more about MAM Center programs." />
    </div>
  );
};
