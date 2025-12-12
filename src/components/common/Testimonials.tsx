import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image?: string;
  rating: number;
  text: string;
  date: string;
}

interface TestimonialsProps {
  title: string;
  subtitle?: string;
}

export const Testimonials = ({ title, subtitle }: TestimonialsProps) => {
  const { t } = useTranslation('components');
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      role: 'Academy Student',
      rating: 5,
      text: 'MAM Center transformed my daughter from nervous to confident! The instructors are patient, professional, and truly care about each student. Highly recommend for kids!',
      date: 'December 2025'
    },
    {
      id: 2,
      name: 'Omar Hassan',
      role: 'Safari Experience',
      rating: 5,
      text: 'The mountain safari was breathtaking! Our guide was knowledgeable, the horses were well-trained, and the scenery was unforgettable. Perfect for photographers!',
      date: 'November 2025'
    },
    {
      id: 3,
      name: 'Layla Kareem',
      role: 'Coffee Shop Regular',
      rating: 5,
      text: 'Baran Coffee is my go-to spot for work. Amazing views, great coffee, and peaceful atmosphere. The lavender latte is a must-try!',
      date: 'December 2025'
    },
    {
      id: 4,
      name: 'Kamal Ibrahim',
      role: 'Event Host',
      rating: 5,
      text: 'Hosted our corporate event here. The facilities are top-notch, staff is professional, and our guests loved the unique equestrian experience!',
      date: 'October 2025'
    },
    {
      id: 5,
      name: 'Nadia Youssef',
      role: 'Private Lessons',
      rating: 5,
      text: 'As an adult beginner, I was hesitant. But the private lessons gave me confidence. Now I ride weekly! The instructors make it fun and safe.',
      date: 'November 2025'
    },
    {
      id: 6,
      name: 'Ranya Mahmoud',
      role: 'Family Safari',
      rating: 5,
      text: 'Took my whole family on the safari. From age 8 to 65, everyone had a blast! Well-organized and accommodating for different skill levels.',
      date: 'September 2025'
    }
  ];

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

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
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
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-forest-900 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
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
                <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-forest-900 font-bold text-lg">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
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
            {t('testimonials.joinSatisfied')}
          </p>
          <a
            href="https://www.google.com/maps/place/MAM+Center"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass-card text-cream-100 font-sans font-semibold hover:bg-white/10 transition-colors"
          >
            <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
            {t('testimonials.readMoreReviews')}
          </a>
        </div>
      </div>
    </section>
  );
};
