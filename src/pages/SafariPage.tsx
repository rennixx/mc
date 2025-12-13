import { RouteMap } from '../components/safari/RouteMap';
import { DifficultyToggle } from '../components/safari/DifficultyToggle';
import { WhatToBring } from '../components/safari/WhatToBring';
import { Button } from '../components/common/Button';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { FAQ } from '../components/common/FAQ';
import { BookingCalendar } from '../components/common/BookingCalendar';
import { SEOMeta } from '../components/common/SEOMeta';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Users } from 'lucide-react';
import safariImage from '../assets/images/services/riding-safari.jpg';

export const SafariPage = () => {
  const { t } = useTranslation('safari');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  
  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      window.location.href = `mailto:info@mamcenter.com?subject=Safari Booking Request&body=I'd like to book a safari for ${dateStr} at ${selectedTime}`;
    } else {
      // Scroll to calendar
      document.getElementById('booking-calendar')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGroupRates = () => {
    // Open WhatsApp or phone
    window.open('https://wa.me/9647501234567?text=I%27d%20like%20to%20ask%20about%20group%20rates', '_blank');
  };

  const faqItems = Array.from({ length: 8 }, (_, i) => ({
    question: t(`safari:faq.q${i + 1}.question`),
    answer: t(`safari:faq.q${i + 1}.answer`)
  }));

  return (
    <div className="min-h-screen bg-cream-200 dark:bg-slate-900">
      <SEOMeta
        title={{
          en: 'Horse Riding Safari | Mam Center Erbil',
          ku: 'سەفاری ئەسپ سواری | سەنتەری مام هەولێر',
          ar: 'سفاري ركوب الخيل | مركز مام أربيل',
        }}
        description={{
          en: 'Experience guided horse riding tours through Kurdistan mountains. Beginner to advanced trails with stunning valley views. Group rates available.',
          ku: 'ئەزموونی گەشتی ئەسپ سواری بە ڕێنوێنی لە چیاکانی کوردستان. ڕێڕەوەکان بۆ دەستپێکەر تا پێشکەوتوو.',
          ar: 'جولات ركوب الخيل الموجهة عبر جبال كردستان. مسارات للمبتدئين والمتقدمين مع مناظر خلابة.',
        }}
        keywords={{
          en: 'horse riding safari, mountain trails erbil, guided horse tours kurdistan, beginner horse riding, group safari rates',
          ku: 'سەفاری ئەسپ سواری, ڕێڕەوی چیا هەولێر, گەشتی ئەسپ سواری کوردستان',
          ar: 'سفاري ركوب الخيل, مسارات جبلية أربيل, جولات خيل موجهة كردستان',
        }}
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-slate-700 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${safariImage})`,
            filter: 'brightness(0.7)',
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream-200 mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-cream-300 font-sans max-w-2xl">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 space-y-20">
        {/* Route Map Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-forest-700 dark:text-cream-200 mb-4">
              {t('route.title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-cream-400 font-sans max-w-2xl mx-auto">
              {t('route.subtitle')}
            </p>
          </div>
          <RouteMap />
        </section>

        {/* Difficulty Toggle Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-forest-700 dark:text-cream-200 mb-4">
              {t('route.title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-cream-400 font-sans max-w-2xl mx-auto">
              {t('route.subtitle')}
            </p>
          </div>
          <DifficultyToggle />
        </section>

        {/* What to Bring Section */}
        <section>
          <WhatToBring />
        </section>

        {/* CTA Section */}
        <section className="bg-forest-700 dark:bg-forest-800 p-12 text-center shadow-luxury">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-cream-200 mb-4">
            {t('booking.title')}
          </h2>
          <p className="text-cream-300 font-sans text-lg mb-8 max-w-xl mx-auto">
            {t('booking.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="action" onClick={handleBooking} className="backdrop-blur-md bg-action-500/90 hover:bg-action-600/90 border border-white/20">
              {t('booking.ctaPrimary')}
            </Button>
            <button
              onClick={handleGroupRates}
              className="text-gold-400 hover:text-gold-300 font-sans font-semibold underline"
            >
              {t('booking.ctaSecondary')} →
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-cream-400/20 grid grid-cols-1 md:grid-cols-3 gap-6 text-cream-300 font-sans">
            <div>
              <div className="text-gold-400 font-bold mb-2">{t('booking.info.duration.label')}</div>
              <div>{t('booking.info.duration.value')}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gold-400 font-bold mb-2">
                <Users className="w-5 h-5" />
                <span>{t('booking.info.groupSize.label')}</span>
              </div>
              <div>{t('booking.info.groupSize.value')}</div>
            </div>
            <div>
              <div className="text-gold-400 font-bold mb-2">{t('booking.info.availability.label')}</div>
              <div>{t('booking.info.availability.value')}</div>
            </div>
          </div>
        </section>
      </div>

      {/* Booking Calendar Section */}
      <div id="booking-calendar" className="py-16 bg-gradient-to-b from-forest-900/40 to-transparent">
        <div className="container mx-auto px-4 max-w-3xl">
          <BookingCalendar
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
          />
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ
        title={t('faq.title')}
        subtitle={t('faq.subtitle')}
        items={faqItems}
      />

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-cream-200/98 dark:bg-slate-800/98 border-t border-forest-600/20 shadow-luxury z-40">
        <Button variant="action" onClick={handleBooking} className="w-full backdrop-blur-md bg-action-500/90 hover:bg-action-600/90 border border-white/20">
          {t('booking.cta.mobile')}
        </Button>
      </div>

      {/* Desktop Fixed CTA */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <Button variant="action" onClick={handleBooking} className="shadow-luxury-lg backdrop-blur-md bg-action-500/90 hover:bg-action-600/90 border border-white/20">
          {t('booking.cta.desktop')}
        </Button>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton message="Hi! I'd like to book a horse riding safari. Can you provide more details?" />
    </div>
  );
};
