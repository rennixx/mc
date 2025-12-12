import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SEOMeta } from '../../components/common/SEOMeta';
import { WhatsAppButton } from '../../components/common/WhatsAppButton';
import { FAQ } from '../../components/common/FAQ';
import { BookingCalendar } from '../../components/common/BookingCalendar';

export const AcademyPage = () => {
  const { t, i18n } = useTranslation('academy');
  const isRTL = i18n.language === 'ar' || i18n.language === 'ku';
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const programs = ['beginner', 'intermediate', 'jumping', 'private'];
  const instructors = ['sara', 'omar', 'layla'];
  const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const times = ['morning', 'midday', 'afternoon', 'evening'];

  const faqItems = Array.from({ length: 8 }, (_, i) => ({
    question: t(`academy:faq.q${i + 1}.question`),
    answer: t(`academy:faq.q${i + 1}.answer`)
  }));

  // Mock schedule availability
  const schedule: Record<string, string[]> = {
    saturday: ['available', 'available', 'full', 'available'],
    sunday: ['available', 'full', 'available', 'available'],
    monday: ['private', 'available', 'available', 'full'],
    tuesday: ['available', 'available', 'full', 'private'],
    wednesday: ['full', 'available', 'available', 'available'],
    thursday: ['available', 'full', 'available', 'private'],
    friday: ['private', 'private', 'private', 'private'],
  };

  return (
    <>
      <SEOMeta
        title={t('hero.title')}
        description={t('hero.subtitle')}
        keywords="riding academy, horse lessons, equestrian training, show jumping, Iraq, Kurdistan"
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-forest-800 to-forest-600 flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="inline-block px-4 py-2 bg-gold-400/20 border border-gold-400 mb-6">
            <span className="text-gold-400 font-sans text-sm tracking-wider uppercase">{t('hero.badge')}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-cream-200 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-cream-300 font-sans max-w-3xl mx-auto mb-8">
            {t('hero.subtitle')}
          </p>
          <a
            href="#programs"
            className="inline-block px-8 py-4 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-semibold transition-colors"
          >
            {t('hero.cta')}
          </a>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 bg-cream-200 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-forest-700 dark:text-cream-200 mb-4">
              {t('programs.title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-cream-400 font-sans">
              {t('programs.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <div
                key={program}
                className="bg-white dark:bg-slate-800 p-8 border-2 border-forest-600 hover:border-gold-400 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif font-bold text-forest-700 dark:text-cream-200">
                    {t(`programs.${program}.title`)}
                  </h3>
                  <span className="px-3 py-1 bg-gold-400/20 text-gold-600 dark:text-gold-400 text-sm font-sans font-semibold">
                    {t(`programs.${program}.level`)}
                  </span>
                </div>

                <div className={`flex gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="text-2xl font-serif font-bold text-saddle-600 dark:text-gold-400">
                    {t(`programs.${program}.price`)}
                  </div>
                  <div className="text-slate-600 dark:text-cream-400 font-sans">
                    {t(`programs.${program}.duration`)}
                  </div>
                </div>

                <p className="text-slate-700 dark:text-cream-300 font-sans mb-6">
                  {t(`programs.${program}.description`)}
                </p>

                <ul className={`space-y-2 ${isRTL ? 'pr-6' : 'pl-6'}`}>
                  {(t(`programs.${program}.features`, { returnObjects: true }) as string[]).map((feature, i) => (
                    <li key={i} className="text-slate-600 dark:text-cream-400 font-sans flex items-start gap-2">
                      <span className="text-gold-600 dark:text-gold-400 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-forest-700 dark:text-cream-200 mb-4">
              {t('instructors.title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-cream-400 font-sans">
              {t('instructors.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div key={instructor} className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-forest-600 to-saddle-600 flex items-center justify-center">
                  <div className="text-6xl text-cream-200">👤</div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-forest-700 dark:text-cream-200 mb-2">
                  {t(`instructors.${instructor}.name`)}
                </h3>
                <p className="text-gold-600 dark:text-gold-400 font-sans font-semibold mb-4">
                  {t(`instructors.${instructor}.role`)}
                </p>
                <p className="text-slate-600 dark:text-cream-400 font-sans mb-6">
                  {t(`instructors.${instructor}.bio`)}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {(t(`instructors.${instructor}.specialties`, { returnObjects: true }) as string[]).map((specialty, i) => (
                    <span key={i} className="px-3 py-1 bg-forest-600/10 dark:bg-forest-400/10 text-forest-700 dark:text-cream-200 text-sm font-sans">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 bg-cream-200 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-forest-700 dark:text-cream-200 mb-4">
              {t('schedule.title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-cream-400 font-sans">
              {t('schedule.subtitle')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-slate-800 border-2 border-forest-600">
              <thead>
                <tr className="bg-forest-600 text-cream-200">
                  <th className="p-4 text-start font-serif font-bold">{isRTL ? 'الوقت' : 'Time'}</th>
                  {days.map((day) => (
                    <th key={day} className="p-4 text-center font-serif font-bold">
                      {t(`schedule.days.${day}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map((time, timeIdx) => (
                  <tr key={time} className="border-b border-forest-600/20">
                    <td className="p-4 font-sans font-semibold text-forest-700 dark:text-cream-200">
                      {t(`schedule.times.${time}`)}
                    </td>
                    {days.map((day) => {
                      const status = schedule[day][timeIdx];
                      const bgColor =
                        status === 'available'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : status === 'full'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400';
                      
                      return (
                        <td key={`${day}-${time}`} className="p-2 text-center">
                          <span className={`inline-block px-3 py-1 ${bgColor} text-sm font-sans font-semibold`}>
                            {t(`schedule.${status}`)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Booking Calendar Section */}
      <div id="booking-calendar" className="py-16 bg-gradient-to-b from-saddle-900/40 to-transparent">
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

      {/* Booking CTA */}
      <section className="py-20 bg-gradient-to-br from-saddle-600 to-saddle-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold text-cream-200 mb-6">
            {t('booking.title')}
          </h2>
          <p className="text-xl text-cream-300 font-sans mb-8">
            {t('booking.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+9647501234567"
              dir="ltr"
              className="px-8 py-4 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-semibold transition-colors"
            >
              {t('booking.ctaPrimary')}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-cream-200 hover:bg-cream-200/10 text-cream-200 font-sans font-semibold transition-colors"
            >
              {t('booking.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton message="Hello! I'm interested in enrolling in riding academy programs. Can you help?" />
    </>
  );
};

