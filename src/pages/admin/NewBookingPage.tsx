import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Mail, Phone, User, MessageSquare, Check, ArrowLeft } from 'lucide-react';
import { addBooking, updateBooking, type ServiceType, type BookingStatus } from '../../services/bookingStorage';
import { BookingCalendar } from '../../components/common/BookingCalendar';

interface BookingFormData {
  service: ServiceType;
  name: string;
  email: string;
  phone: string;
  experienceLevel: string;
  groupSize: string;
  specialRequests: string;
  date?: Date;
  time?: string;
  status: BookingStatus;
  notes?: string;
}

export const NewBookingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingFormData>({
    service: 'safari',
    name: '',
    email: '',
    phone: '',
    experienceLevel: 'beginner',
    groupSize: '1',
    specialRequests: '',
    status: 'pending',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const services = [
    { id: 'safari', name: 'Horse Riding Safari', icon: '🏇' },
    { id: 'academy', name: 'Riding Academy', icon: '🎓' },
    { id: 'private', name: 'Private Lessons', icon: '👤' },
    { id: 'event', name: 'Special Event', icon: '🎉' },
  ];

  const experienceLevels = [
    { id: 'beginner', name: 'Beginner (Never ridden)' },
    { id: 'novice', name: 'Novice (A few times)' },
    { id: 'intermediate', name: 'Intermediate (Comfortable)' },
    { id: 'advanced', name: 'Advanced (Expert rider)' },
  ];

  const statusOptions = [
    { id: 'pending', name: 'Pending' },
    { id: 'confirmed', name: 'Confirmed' },
    { id: 'completed', name: 'Completed' },
    { id: 'cancelled', name: 'Cancelled' },
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate() && formData.date && formData.time) {
      try {
        const booking = addBooking({
          service: formData.service,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          experienceLevel: formData.experienceLevel,
          groupSize: parseInt(formData.groupSize),
          specialRequests: formData.specialRequests,
          date: formData.date.toISOString().split('T')[0],
          time: formData.time,
        });

        // Update status and notes if provided
        if (formData.status !== 'pending' || formData.notes) {
          updateBooking(booking.id, {
            status: formData.status,
            notes: formData.notes,
          });
        }

        setBookingId(booking.id);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error creating booking:', error);
      }
    }
  };

  const updateFormData = (field: keyof BookingFormData, value: string | Date | undefined) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/bookings')}
          className="flex items-center gap-2 text-cream-400 hover:text-cream-100 font-sans mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Bookings
        </button>
        <h1 className="text-3xl font-serif font-bold text-cream-100 mb-2">
          New Booking
        </h1>
        <p className="text-cream-400 font-sans">
          Create a new booking manually
        </p>
      </div>

      {/* Content */}
      <div className="glass-card p-8 max-w-3xl">
        {isSubmitted ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 mb-6">
              <Check className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-cream-100 mb-4">
              Booking Created!
            </h2>
            <p className="text-cream-200 font-sans text-lg mb-2">
              Booking for {formData.name} has been created successfully.
            </p>
            {bookingId && (
              <p className="text-gold-400 font-sans text-lg mb-6 font-semibold">
                Reference: {bookingId}
              </p>
            )}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/admin/bookings')}
                className="px-6 py-3 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold transition-colors"
              >
                View All Bookings
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setBookingId(null);
                  setFormData({
                    service: 'safari',
                    name: '',
                    email: '',
                    phone: '',
                    experienceLevel: 'beginner',
                    groupSize: '1',
                    specialRequests: '',
                    status: 'pending',
                    notes: '',
                  });
                }}
                className="px-6 py-3 glass-card text-cream-100 font-sans font-semibold hover:bg-white/10 transition-colors"
              >
                Create Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-3">
                <Calendar className="w-4 h-4" />
                Service *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => updateFormData('service', service.id as ServiceType)}
                    className={`p-4 text-left transition-all ${
                      formData.service === service.id
                        ? 'bg-gold-400 text-forest-900 border-2 border-gold-400'
                        : 'glass-card text-cream-100 hover:bg-white/10 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{service.icon}</span>
                    <span className="text-sm font-sans font-bold">{service.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-2">
                  <User className="w-4 h-4" />
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
                  placeholder="Customer name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm font-sans mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
                  placeholder="email@example.com"
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
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
                  placeholder="+964 7XX XXX XXXX"
                  dir="ltr"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm font-sans mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Group Size */}
              <div>
                <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-2">
                  <Users className="w-4 h-4" />
                  Group Size
                </label>
                <select
                  value={formData.groupSize}
                  onChange={(e) => updateFormData('groupSize', e.target.value)}
                  className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num} className="bg-forest-900">
                      {num} {num === 1 ? 'person' : 'people'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Experience & Status */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-cream-200 font-sans font-semibold mb-2 block">
                  Experience Level
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

              <div>
                <label className="text-cream-200 font-sans font-semibold mb-2 block">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => updateFormData('status', e.target.value as BookingStatus)}
                  className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
                >
                  {statusOptions.map((status) => (
                    <option key={status.id} value={status.id} className="bg-forest-900">
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-3">
                <Calendar className="w-4 h-4" />
                Date & Time *
              </label>
              <BookingCalendar
                selectedDate={formData.date}
                selectedTime={formData.time}
                onDateSelect={(date) => updateFormData('date', date)}
                onTimeSelect={(time) => updateFormData('time', time)}
              />
              {(errors.date || errors.time) && (
                <p className="text-red-400 text-sm font-sans mt-2">
                  Please select both date and time
                </p>
              )}
            </div>

            {/* Special Requests */}
            <div>
              <label className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-2">
                <MessageSquare className="w-4 h-4" />
                Special Requests
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => updateFormData('specialRequests', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400 resize-none"
                placeholder="Any special requirements or notes..."
              />
            </div>

            {/* Admin Notes */}
            <div>
              <label className="text-cream-200 font-sans font-semibold mb-2 block">
                Admin Notes (Internal)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400 resize-none"
                placeholder="Internal notes for staff..."
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin/bookings')}
                className="px-6 py-3 glass-card text-cream-100 font-sans font-semibold hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold transition-colors"
              >
                Create Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
