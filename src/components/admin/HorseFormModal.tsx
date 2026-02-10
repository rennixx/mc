import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import type { Horse, Gender, ExperienceLevel } from '../../services';

interface HorseFormModalProps {
  horse?: Horse;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const EXPERIENCE_LEVELS: ExperienceLevel[] = ['beginner', 'novice', 'intermediate', 'advanced'];
const GENDERS: Gender[] = ['male', 'female', 'stallion', 'mare'];

export const HorseFormModal = ({ horse, onClose, onSubmit }: HorseFormModalProps) => {
  const { t } = useTranslation('admin');
  const isEditing = !!horse;

  const [formData, setFormData] = useState({
    name: horse?.name || '',
    breed: horse?.breed || '',
    age: horse?.age || 5,
    gender: horse?.gender || 'male' as Gender,
    color: horse?.color || '',
    description: horse?.description || '',
    image: horse?.image || '🐴',
    available: horse?.available ?? true,
    unavailableReason: horse?.unavailableReason || '',
    suitableFor: horse?.suitableFor || ['beginner'] as ExperienceLevel[],
    maxWeight: horse?.maxWeight || 90,
  });

  const toggleExperienceLevel = (level: ExperienceLevel) => {
    setFormData(prev => ({
      ...prev,
      suitableFor: prev.suitableFor.includes(level)
        ? prev.suitableFor.filter(l => l !== level)
        : [...prev.suitableFor, level],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-forest-900 border border-gold-400/20 shadow-luxury-lg">
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
          <h2 className="text-2xl font-serif font-bold text-cream-100">
            {isEditing ? t('horses.form.editTitle') : t('horses.form.addTitle')}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name & Breed Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-cream-200 font-sans font-semibold mb-2">
                {t('horses.form.name')} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
              />
            </div>
            <div>
              <label className="block text-cream-200 font-sans font-semibold mb-2">
                {t('horses.form.breed')} *
              </label>
              <input
                type="text"
                required
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="w-full px-4 py-2 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          {/* Age & Gender Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-cream-200 font-sans font-semibold mb-2">
                {t('horses.form.age')} *
              </label>
              <input
                type="number"
                required
                min="1"
                max="30"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
              />
            </div>
            <div>
              <label className="block text-cream-200 font-sans font-semibold mb-2">
                {t('horses.form.gender')} *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                className="w-full px-4 py-2 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
              >
                {GENDERS.map(g => (
                  <option key={g} value={g} className="bg-forest-900">
                    {t(`horses.genders.${g}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Color & Max Weight Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-cream-200 font-sans font-semibold mb-2">
                {t('horses.form.color')} *
              </label>
              <input
                type="text"
                required
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-4 py-2 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
              />
            </div>
            <div>
              <label className="block text-cream-200 font-sans font-semibold mb-2">
                {t('horses.form.maxWeight')} (kg)
              </label>
              <input
                type="number"
                min="30"
                max="200"
                value={formData.maxWeight}
                onChange={(e) => setFormData({ ...formData, maxWeight: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-cream-200 font-sans font-semibold mb-2">
              {t('horses.form.image')} (emoji or URL)
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
              placeholder="🐴"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-cream-200 font-sans font-semibold mb-2">
              {t('horses.form.description')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400 resize-none"
            />
          </div>

          {/* Suitable For */}
          <div>
            <label className="block text-cream-200 font-sans font-semibold mb-2">
              {t('horses.form.suitableFor')}
            </label>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_LEVELS.map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => toggleExperienceLevel(level)}
                  className={`px-3 py-2 font-sans text-sm transition-colors ${
                    formData.suitableFor.includes(level)
                      ? 'bg-gold-400 text-forest-900 font-semibold'
                      : 'glass text-cream-100'
                  }`}
                >
                  {t(`horses.levels.${level}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="p-4 bg-cream-400/5 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                id="available"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                className="w-5 h-5"
              />
              <label htmlFor="available" className="text-cream-200 font-sans font-semibold">
                {t('horses.form.available')}
              </label>
            </div>
            {!formData.available && (
              <input
                type="text"
                value={formData.unavailableReason}
                onChange={(e) => setFormData({ ...formData, unavailableReason: e.target.value })}
                placeholder={t('horses.form.unavailableReason')}
                className="w-full px-4 py-2 bg-cream-400/10 border border-cream-400/20 text-cream-100 font-sans focus:outline-none focus:border-gold-400"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-cream-400/20">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 glass text-cream-100 font-sans font-semibold hover:bg-white/10 transition-colors"
            >
              {t('horses.form.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold transition-colors"
            >
              {isEditing ? t('horses.form.update') : t('horses.form.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
