import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SEOMeta } from '../components/common/SEOMeta';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactPage = () => {
  const { t } = useTranslation('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <SEOMeta
        title={t('hero.title')}
        description={t('hero.subtitle')}
        keywords="contact, MAM Center, equestrian, Erbil, Kurdistan, horse riding"
      />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] bg-gradient-to-br from-forest-800 to-forest-600 flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center w-full">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-cream-200 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-cream-300 font-sans max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-cream-200 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 p-8 shadow-luxury">
                <h2 className="text-3xl font-serif font-bold mb-8 text-forest-700 dark:text-gold-400">
                  {t('form.title')}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-sans font-semibold mb-2 text-slate-700 dark:text-cream-300">
                      {t('form.name.label')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('form.name.placeholder')}
                      className="w-full px-4 py-3 border-2 border-forest-600/20 dark:border-gold-500/30 bg-cream-100 dark:bg-slate-700 text-slate-900 dark:text-cream-200 font-sans focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-sans font-semibold mb-2 text-slate-700 dark:text-cream-300">
                        {t('form.email.label')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t('form.email.placeholder')}
                        className="w-full px-4 py-3 border-2 border-forest-600/20 dark:border-gold-500/30 bg-cream-100 dark:bg-slate-700 text-slate-900 dark:text-cream-200 font-sans focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-sans font-semibold mb-2 text-slate-700 dark:text-cream-300">
                        {t('form.phone.label')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('form.phone.placeholder')}
                        className="w-full px-4 py-3 border-2 border-forest-600/20 dark:border-gold-500/30 bg-cream-100 dark:bg-slate-700 text-slate-900 dark:text-cream-200 font-sans focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-sans font-semibold mb-2 text-slate-700 dark:text-cream-300">
                      {t('form.subject.label')}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-forest-600/20 dark:border-gold-500/30 bg-cream-100 dark:bg-slate-700 text-slate-900 dark:text-cream-200 font-sans focus:outline-none focus:border-gold-500 transition-colors [&>option]:font-sans"
                    >
                      <option value="" className="font-sans">{t('form.subject.placeholder')}</option>
                      <option value="general" className="font-sans">{t('form.subject.options.general')}</option>
                      <option value="academy" className="font-sans">{t('form.subject.options.academy')}</option>
                      <option value="safari" className="font-sans">{t('form.subject.options.safari')}</option>
                      <option value="venue" className="font-sans">{t('form.subject.options.venue')}</option>
                      <option value="other" className="font-sans">{t('form.subject.options.other')}</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-sans font-semibold mb-2 text-slate-700 dark:text-cream-300">
                      {t('form.message.label')}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder={t('form.message.placeholder')}
                      className="w-full px-4 py-3 border-2 border-forest-600/20 dark:border-gold-500/30 bg-cream-100 dark:bg-slate-700 text-slate-900 dark:text-cream-200 font-sans focus:outline-none focus:border-gold-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gold-400 text-forest-900 font-sans font-bold text-lg hover:bg-gold-300 transition-colors shadow-luxury"
                  >
                    {t('form.submit')}
                  </button>

                  {/* Status Messages */}
                  {status === 'success' && (
                    <div className="p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-800 dark:text-green-300 font-sans">
                      {t('form.success')}
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-800 dark:text-red-300 font-sans">
                      {t('form.error')}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 shadow-luxury">
                <h3 className="text-2xl font-serif font-bold mb-6 text-forest-700 dark:text-gold-400">
                  {t('info.title')}
                </h3>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-sans font-bold text-slate-700 dark:text-cream-300 mb-1">
                        {t('info.location.title')}
                      </h4>
                      <p className="text-slate-600 dark:text-cream-400 font-sans text-sm">
                        {t('info.location.address')}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-sans font-bold text-slate-700 dark:text-cream-300 mb-1">
                        {t('info.phone.title')}
                      </h4>
                      <a 
                        href="tel:+9647501234567" 
                        dir="ltr"
                        className="text-slate-600 dark:text-cream-400 font-sans text-sm hover:text-gold-500 transition-colors"
                      >
                        {t('info.phone.number')}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-sans font-bold text-slate-700 dark:text-cream-300 mb-1">
                        {t('info.email.title')}
                      </h4>
                      <a 
                        href="mailto:info@mamcenter.com" 
                        dir="ltr"
                        className="text-slate-600 dark:text-cream-400 font-sans text-sm hover:text-gold-500 transition-colors"
                      >
                        {t('info.email.address')}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <Clock className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-sans font-bold text-slate-700 dark:text-cream-300 mb-2">
                        {t('info.hours.title')}
                      </h4>
                      <div className="space-y-1 text-slate-600 dark:text-cream-400 font-sans text-sm">
                        <p>{t('info.hours.academy')}</p>
                        <p>{t('info.hours.safari')}</p>
                        <p>{t('info.hours.cafe')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map CTA */}
              <div className="bg-gradient-to-br from-forest-800 to-forest-600 p-6 shadow-luxury text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gold-400" />
                <h4 className="text-xl font-serif font-bold text-cream-200 mb-4">
                  {t('map.title')}
                </h4>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gold-400 text-forest-900 font-sans font-bold hover:bg-gold-300 transition-colors"
                >
                  {t('map.button')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
