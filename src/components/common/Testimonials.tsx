import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchGoogleReviews, getGoogleMapsUrl, FALLBACK_TESTIMONIALS, type Testimonial } from '../../services/googlePlaces';

interface TestimonialsProps {
  title: string;
  subtitle?: string;
}

export const Testimonials = ({ title, subtitle }: TestimonialsProps) => {
  const { t } = useTranslation('components');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews from Google Places API on mount
  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      setError(null);

      const reviews = await fetchGoogleReviews();

      if (reviews.length === 0) {
        // Use fallback if no reviews returned
        setTestimonials(FALLBACK_TESTIMONIALS);
        setError('Using default testimonials');
      } else {
        setTestimonials(reviews);
      }

      setIsLoading(false);
    };

    loadReviews();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ];

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-transparent to-forest-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream-100 mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-cream-200 font-sans max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-cream-400/20 h-12 w-12"></div>
              <div className="rounded-full bg-cream-400/20 h-12 w-12"></div>
              <div className="rounded-full bg-cream-400/20 h-12 w-12"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-forest-800/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream-100 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-cream-200 font-sans max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          {/* Debug info - remove in production */}
          {error && import.meta.env.DEV && (
            <p className="text-sm text-gold-400/60 mt-2">{error}</p>
          )}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 glass-card p-3 hover:bg-white/20 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-cream-100" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 glass-card p-3 hover:bg-white/20 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-cream-100" />
          </button>

          {/* Testimonials Grid - Desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`glass-card p-8 transition-all ${
                  index === 0 ? 'md:scale-105 border-gold-400' : ''
                }`}
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-gold-400 fill-gold-400'
                          : 'text-cream-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-cream-200 font-sans mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {testimonial.profilePhotoUrl ? (
                    <img
                      src={testimonial.profilePhotoUrl}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-forest-900 font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-sans font-bold text-cream-100">
                      {testimonial.name}
                    </h4>
                    <p className="text-cream-300 font-sans text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="mt-4 pt-4 border-t border-cream-400/20">
                  <p className="text-cream-400 font-sans text-xs">
                    {testimonial.date}
                  </p>
                </div>

                {/* Google Review Link */}
                {testimonial.authorUrl && (
                  <a
                    href={testimonial.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <Star className="w-3 h-3 fill-gold-400" />
                    View on Google Maps
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: Show single card */}
          <div className="md:hidden">
            <div className="glass-card p-8">
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonials[currentIndex].rating
                        ? 'text-gold-400 fill-gold-400'
                        : 'text-cream-400'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-cream-200 font-sans mb-6 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {testimonials[currentIndex].profilePhotoUrl ? (
                  <img
                    src={testimonials[currentIndex].profilePhotoUrl}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-forest-900 font-bold text-lg">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-sans font-bold text-cream-100">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-cream-300 font-sans text-sm">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="mt-4 pt-4 border-t border-cream-400/20">
                <p className="text-cream-400 font-sans text-xs">
                  {testimonials[currentIndex].date}
                </p>
              </div>

              {/* Google Review Link */}
              {testimonials[currentIndex].authorUrl && (
                <a
                  href={testimonials[currentIndex].authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <Star className="w-3 h-3 fill-gold-400" />
                  View on Google Maps
                </a>
              )}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 transition-all ${
                  index === currentIndex ? 'bg-gold-400 w-8' : 'bg-cream-400/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-cream-200 font-sans mb-4">
            {t('testimonials.joinSatisfied', 'Join our satisfied customers')}
          </p>
          <a
            href={getGoogleMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass-card text-cream-100 font-sans font-semibold hover:bg-white/10 transition-colors"
          >
            <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
            {t('testimonials.readMoreReviews', 'Read More Reviews on Google')}
          </a>
        </div>
      </div>
    </section>
  );
};
