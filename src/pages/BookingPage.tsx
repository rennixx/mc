import { Calendar, Users, Mail, Phone, User, MessageSquare, ChevronRight, ChevronLeft, Check, Compass, GraduationCap, UserCircle, PartyPopper } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookingCalendar } from '../components/common/BookingCalendar';
import { SEOMeta } from '../components/common/SEOMeta';
import { WhatsAppButton } from '../components/common/WhatsAppButton';

interface BookingFormData {
  service: string;
  name: string;
  email: string;
  phone: string;
  experienceLevel: string;
  groupSize: string;
  specialRequests: string;
  date?: Date;
  time?: string;
}

export const BookingPage = () => {
  const { t } = useTranslation('booking');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    service: '',
    name: '',
    email: '',
    phone: '',
    experienceLevel: 'beginner',
    groupSize: '1',
    specialRequests: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    { id: 'safari', name: t('step1.services.safari'), icon: <Compass className="w-full h-full" /> },
    { id: 'academy', name: t('step1.services.academy'), icon: <GraduationCap className="w-full h-full" /> },
    { id: 'private', name: t('step1.services.private'), icon: <UserCircle className="w-full h-full" /> },
    { id: 'event', name: t('step1.services.event'), icon: <PartyPopper className="w-full h-full" /> },
  ];

  const experienceLevels = [
    { id: 'beginner', name: t('step2.fields.experienceLevel.options.beginner') },
    { id: 'novice', name: t('step2.fields.experienceLevel.options.novice') },
    { id: 'intermediate', name: t('step2.fields.experienceLevel.options.intermediate') },
    { id: 'advanced', name: t('step2.fields.experienceLevel.options.advanced') },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (step === 1) {
      if (!formData.service) newErrors.service = t('step1.errors.selectService');
    }

    if (step === 2) {
      if (!formData.name.trim()) newErrors.name = t('step2.errors.nameRequired');
      if (!formData.email.trim()) newErrors.email = t('step2.errors.emailRequired');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('step2.errors.emailInvalid');
      if (!formData.phone.trim()) newErrors.phone = t('step2.errors.phoneRequired');
    }

    if (step === 3) {
      if (!formData.date) newErrors.date = t('step3.errors.selectDateTime');
      if (!formData.time) newErrors.time = t('step3.errors.selectDateTime');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      // Here you would send the data to your backend
      console.log('Booking submitted:', formData);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateFormData = (field: keyof BookingFormData, value: string | Date) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <>
      <SEOMeta
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
      />

      <div className="min-h-screen pt-44 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream-100 mb-4">
              {t('header.title')}
            </h1>
            <p className="text-xl text-cream-300 font-sans">
              {t('header.subtitle')}
            </p>

            {/* Progress Indicator */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center" style={{ flex: step < 3 ? '1 1 0%' : '0 0 auto' }}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex items-center justify-center w-12 h-12 font-sans font-bold transition-colors ${
                          currentStep >= step
                            ? 'bg-gold-400 text-forest-900'
                            : 'bg-cream-400/20 text-cream-400'
                        }`}
                      >
                        {currentStep > step ? <Check className="w-6 h-6" /> : step}
                      </div>
                      <span className={`mt-3 text-sm font-sans whitespace-nowrap ${currentStep === step ? 'text-gold-400 font-semibold' : 'text-cream-300'}`}>
                        {step === 1 ? t('progress.step1') : step === 2 ? t('progress.step2') : t('progress.step3')}
                      </span>
                    </div>
                    {step < 3 && (
                      <div
                        className={`flex-1 h-1 mx-4 ${
                          currentStep > step ? 'bg-gold-400' : 'bg-cream-400/20'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="glass-card p-8 md:p-12">
            {!isSubmitted ? (
              <>
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-sans font-bold text-cream-100 mb-6">
                      {t('step1.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => updateFormData('service', service.id)}
                          className={`p-8 text-left transition-all ${
                            formData.service === service.id
                              ? 'bg-gold-400 text-forest-900 border-2 border-gold-400'
                              : 'glass-card text-cream-100 hover:bg-white/10 border-2 border-transparent'
                          }`}
                        >
                          <div className="w-12 h-12 mb-4">{service.icon}</div>
                          <div className="text-xl font-sans font-bold">{service.name}</div>
                        </button>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="text-red-400 text-sm font-sans mt-2">{errors.service}</p>
                    )}
                  </div>
                )}

                {/* Step 2: Personal Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-sans font-bold text-cream-100 mb-6">
                      {t('step2.title')}
                    </h2>

                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-2">
                        <User className="w-4 h-4" />
                        {t('step2.fields.name.label')} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
                        placeholder={t('step2.fields.name.placeholder')}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm font-sans mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-2">
                        <Mail className="w-4 h-4" />
                        {t('step2.fields.email.label')} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
                        placeholder={t('step2.fields.email.placeholder')}
                        dir="ltr"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm font-sans mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-2">
                        <Phone className="w-4 h-4" />
                        {t('step2.fields.phone.label')} *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
                        placeholder={t('step2.fields.phone.placeholder')}
                        dir="ltr"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm font-sans mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Experience Level */}
                    <div>
                      <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-2">
                        {t('step2.fields.experienceLevel.label')}
                      </label>
                      <select
                        value={formData.experienceLevel}
                        onChange={(e) => updateFormData('experienceLevel', e.target.value)}
                        className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
                      >
                        {experienceLevels.map((level) => (
                          <option key={level.id} value={level.id} className="bg-forest-900">
                            {level.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Group Size */}
                    <div>
                      <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-2">
                        <Users className="w-4 h-4" />
                        {t('step2.fields.groupSize.label')}
                      </label>
                      <select
                        value={formData.groupSize}
                        onChange={(e) => updateFormData('groupSize', e.target.value)}
                        className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num} className="bg-forest-900">
                            {num} {num === 1 ? t('step2.fields.groupSize.person') : t('step2.fields.groupSize.people')}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-2">
                        <MessageSquare className="w-4 h-4" />
                        {t('step2.fields.specialRequests.label')}
                      </label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => updateFormData('specialRequests', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400 resize-none"
                        placeholder={t('step2.fields.specialRequests.placeholder')}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Date & Time */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-sans font-bold text-cream-100 mb-6">
                      {t('step3.title')}
                    </h2>
                    <BookingCalendar
                      selectedDate={formData.date}
                      selectedTime={formData.time}
                      onDateSelect={(date) => updateFormData('date', date)}
                      onTimeSelect={(time) => updateFormData('time', time)}
                    />
                    {(errors.date || errors.time) && (
                      <p className="text-red-400 text-sm font-sans">
                        {t('step3.errors.selectDateTime')}
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : (
              /* Success Message */
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 mb-6">
                  <Check className="w-12 h-12 text-green-400" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-cream-100 mb-4">
                  {t('success.title')}
                </h2>
                <p className="text-cream-200 font-sans text-lg mb-2">
                  {t('success.message', { name: formData.name })}
                </p>
                <p className="text-cream-300 font-sans" dir="ltr">
                  {t('success.contact', { phone: formData.phone })}
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {!isSubmitted && (
            <div className="mt-8 flex justify-between gap-4">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 glass-card text-cream-100 font-sans font-semibold hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  {t('actions.back')}
                </button>
              )}

              <div className="flex-1" />

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold transition-colors"
                >
                  {t('actions.continue')}
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  {t('actions.confirmBooking')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <WhatsAppButton />
    </>
  );
};
