import { X, MapPin, Mail, Phone, Calendar, Clock, Users, FileText, Globe } from 'lucide-react';
import { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import { type Booking } from '../../services';
import { StatusBadge } from './StatusBadge';
import { useTranslation } from 'react-i18next';

interface BookingDetailModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

// Fix for default marker icons in Leaflet with webpack/vite
const iconDefault = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Delete the default icon from L which can cause issues
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;

export const BookingDetailModal = ({ booking, isOpen, onClose }: BookingDetailModalProps) => {
  const { t } = useTranslation('admin');
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (isOpen && booking?.location && mapContainerRef.current) {
      // Initialize map if it doesn't exist
      if (!mapRef.current) {
        mapRef.current = L.map(mapContainerRef.current, {
          center: [booking.location.latitude, booking.location.longitude],
          zoom: 13,
          scrollWheelZoom: false,
        });

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);

        // Add marker
        markerRef.current = L.marker([booking.location.latitude, booking.location.longitude], { icon: iconDefault })
          .addTo(mapRef.current)
          .bindPopup(`<b>${booking.location.city}, ${booking.location.country}</b>`)
          .openPopup();
      } else {
        // Update existing map
        mapRef.current.setView([booking.location.latitude, booking.location.longitude], 13);

        if (markerRef.current) {
          markerRef.current.setLatLng([booking.location.latitude, booking.location.longitude]);
          markerRef.current.bindPopup(`<b>${booking.location.city}, ${booking.location.country}</b>`).openPopup();
        }
      }
    }

    // Cleanup map when modal closes
    return () => {
      if (!isOpen && mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [isOpen, booking]);

  if (!isOpen || !booking) return null;

  const serviceLabels: Record<string, string> = {
    'safari': t('services.safari'),
    'academy': t('services.academy'),
    'private': t('services.private'),
    'event': t('services.event'),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-forest-900 border border-gold-400/20 shadow-luxury-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-cream-100" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-cream-400/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-cream-100 mb-2">
                {booking.name}
              </h2>
              <p className="text-cream-400 font-sans text-sm">
                {t('actions.view')}: {booking.id}
              </p>
            </div>
            <StatusBadge status={booking.status} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Service & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-cream-400/5 rounded-lg border border-cream-400/10">
              <p className="text-cream-400 text-xs font-sans mb-1">{t('table.service')}</p>
              <p className="text-cream-100 font-semibold font-sans">{serviceLabels[booking.service] || booking.service}</p>
            </div>
            <div className="p-4 bg-cream-400/5 rounded-lg border border-cream-400/10">
              <p className="text-cream-400 text-xs font-sans mb-1">{t('table.groupSize')}</p>
              <p className="text-cream-100 font-semibold font-sans">{booking.groupSize} {booking.groupSize === 1 ? 'Person' : 'People'}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-cream-400/5 rounded-lg border border-cream-400/10">
              <div className="flex items-center gap-2 text-cream-400 text-xs font-sans mb-1">
                <Calendar className="w-3 h-3" />
                {t('table.date')}
              </div>
              <p className="text-cream-100 font-semibold font-sans">{booking.date}</p>
            </div>
            <div className="p-4 bg-cream-400/5 rounded-lg border border-cream-400/10">
              <div className="flex items-center gap-2 text-cream-400 text-xs font-sans mb-1">
                <Clock className="w-3 h-3" />
                {t('table.time')}
              </div>
              <p className="text-cream-100 font-semibold font-sans">{booking.time}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-cream-400/5 rounded-lg border border-cream-400/10">
              <div className="flex items-center gap-2 text-cream-400 text-xs font-sans mb-1">
                <Mail className="w-3 h-3" />
                {t('table.email')}
              </div>
              <p className="text-cream-100 font-semibold font-sans text-sm">{booking.email}</p>
            </div>
            <div className="p-4 bg-cream-400/5 rounded-lg border border-cream-400/10">
              <div className="flex items-center gap-2 text-cream-400 text-xs font-sans mb-1">
                <Phone className="w-3 h-3" />
                {t('table.phone')}
              </div>
              <p className="text-cream-100 font-semibold font-sans" dir="ltr">{booking.phone}</p>
            </div>
          </div>

          {/* Experience Level */}
          <div className="p-4 bg-cream-400/5 rounded-lg border border-cream-400/10">
            <p className="text-cream-400 text-xs font-sans mb-1">{t('form.experience')}</p>
            <p className="text-cream-100 font-semibold font-sans">{booking.experienceLevel}</p>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="p-4 bg-cream-400/5 rounded-lg border border-cream-400/10">
              <div className="flex items-center gap-2 text-cream-400 text-xs font-sans mb-1">
                <FileText className="w-3 h-3" />
                {t('form.specialRequests')}
              </div>
              <p className="text-cream-100 font-sans text-sm">{booking.specialRequests}</p>
            </div>
          )}

          {/* Location Section */}
          {booking.location ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cream-100 font-semibold">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>{t('actions.view')} Location</span>
              </div>

              {/* Location Info */}
              <div className="p-4 bg-cream-400/5 rounded-lg border border-cream-400/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cream-100 font-semibold font-sans">
                      {booking.location.city}, {booking.location.region}
                    </p>
                    <p className="text-cream-400 text-sm font-sans">
                      {booking.location.country} ({booking.location.countryCode})
                    </p>
                  </div>
                  <Globe className="w-5 h-5 text-gold-400" />
                </div>
                <div className="text-xs text-cream-400 font-sans space-y-1">
                  <p>IP: {booking.location.ip}</p>
                  {booking.location.org && <p>ISP: {booking.location.org}</p>}
                  <p dir="ltr">
                    Coordinates: {booking.location.latitude.toFixed(4)}, {booking.location.longitude.toFixed(4)}
                  </p>
                </div>
              </div>

              {/* Map */}
              <div
                ref={mapContainerRef}
                className="w-full h-64 rounded-lg border border-cream-400/20 z-0"
                style={{ minHeight: '256px' }}
              />
            </div>
          ) : (
            <div className="p-4 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
              <p className="text-yellow-400 text-sm font-sans">Location data not available for this booking.</p>
            </div>
          )}

          {/* Admin Notes */}
          {booking.notes && (
            <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
              <p className="text-blue-400 text-xs font-sans mb-1">{t('form.notes')}</p>
              <p className="text-cream-100 font-sans text-sm">{booking.notes}</p>
            </div>
          )}

          {/* Created At */}
          <div className="text-center text-cream-400 text-xs font-sans">
            Created: {new Date(booking.createdAt).toLocaleString()}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-cream-400/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
