import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, Power, PowerOff } from 'lucide-react';
import { getAllHorses, addHorse, updateHorse, deleteHorse, toggleHorseAvailability, initializeSampleHorses } from '../../services';
import { HorseFormModal } from './HorseFormModal';

export const HorsesManagementPage = () => {
  const { t } = useTranslation('admin');
  const [horses, setHorses] = useState(getAllHorses());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHorse, setEditingHorse] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    initializeSampleHorses();

    const handleUpdate = () => {
      setHorses(getAllHorses());
    };
    window.addEventListener('horsesUpdated', handleUpdate);
    return () => window.removeEventListener('horsesUpdated', handleUpdate);
  }, []);

  const handleEdit = (horseId: string) => {
    setEditingHorse(horseId);
    setIsFormOpen(true);
  };

  const handleDelete = (horseId: string) => {
    if (deleteConfirm === horseId) {
      deleteHorse(horseId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(horseId);
    }
  };

  const handleToggleAvailability = (horseId: string) => {
    toggleHorseAvailability(horseId);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingHorse(null);
  };

  const handleFormSubmit = (data: any) => {
    if (editingHorse) {
      updateHorse(editingHorse, data);
    } else {
      addHorse(data);
    }
    handleFormClose();
  };

  const editingHorseData = editingHorse ? horses.find(h => h.id === editingHorse) : null;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-sans font-bold text-cream-100">
            {t('horses.title')}
          </h2>
          <p className="text-sm md:text-base text-cream-300 font-sans">
            {t('horses.description')}
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold transition-colors text-sm"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          {t('horses.addHorse')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="glass-card p-2 md:p-4 text-center">
          <div className="text-2xl md:text-3xl font-serif font-bold text-gold-400">{horses.length}</div>
          <div className="text-cream-300 font-sans text-[10px] md:text-sm">{t('horses.stats.total')}</div>
        </div>
        <div className="glass-card p-2 md:p-4 text-center">
          <div className="text-2xl md:text-3xl font-serif font-bold text-green-400">
            {horses.filter(h => h.available).length}
          </div>
          <div className="text-cream-300 font-sans text-[10px] md:text-sm">{t('horses.stats.available')}</div>
        </div>
        <div className="glass-card p-2 md:p-4 text-center">
          <div className="text-2xl md:text-3xl font-serif font-bold text-red-400">
            {horses.filter(h => !h.available).length}
          </div>
          <div className="text-cream-300 font-sans text-[10px] md:text-sm">{t('horses.stats.unavailable')}</div>
        </div>
      </div>

      {/* Horses List */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <table className="w-full">
            <thead className="bg-cream-400/10">
              <tr>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-cream-200 font-sans font-semibold text-[10px] md:text-sm">{t('horses.table.name')}</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-cream-200 font-sans font-semibold text-[10px] md:text-sm">{t('horses.table.breed')}</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-cream-200 font-sans font-semibold text-[10px] md:text-sm">{t('horses.table.age')}</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-cream-200 font-sans font-semibold text-[10px] md:text-sm">{t('horses.table.gender')}</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-cream-200 font-sans font-semibold text-[10px] md:text-sm">{t('horses.table.status')}</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-right text-cream-200 font-sans font-semibold text-[10px] md:text-sm">{t('horses.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-400/10">
              {horses.map((horse) => (
                <tr key={horse.id} className={!horse.available ? 'bg-cream-400/5' : ''}>
                  <td className="px-2 md:px-4 py-2 md:py-3">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="text-xl md:text-2xl">{horse.image || '🐴'}</span>
                      <span className="font-sans font-semibold text-cream-100 text-xs md:text-sm">{horse.name}</span>
                    </div>
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-cream-200 font-sans text-xs md:text-sm">{horse.breed}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-cream-200 font-sans text-xs md:text-sm">{horse.age}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-cream-200 font-sans text-xs md:text-sm">
                    {t(`horses.genders.${horse.gender}`)}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3">
                    {horse.available ? (
                      <span className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 bg-green-500/20 text-green-400 text-[10px] md:text-xs font-sans rounded-full">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full" />
                        <span className="hidden sm:inline">{t('horses.status.available')}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 bg-red-500/20 text-red-400 text-[10px] md:text-xs font-sans rounded-full">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-400 rounded-full" />
                        <span className="hidden sm:inline">{horse.unavailableReason || t('horses.status.unavailable')}</span>
                      </span>
                    )}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3">
                    <div className="flex items-center justify-end gap-1 md:gap-2">
                      <button
                        onClick={() => handleToggleAvailability(horse.id)}
                        className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                          horse.available
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }`}
                        title={horse.available ? t('horses.actions.makeUnavailable') : t('horses.actions.makeAvailable')}
                      >
                        {horse.available ? <PowerOff className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Power className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(horse.id)}
                        className="p-1.5 md:p-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-colors"
                        title={t('horses.actions.edit')}
                      >
                        <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(horse.id)}
                        className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                          deleteConfirm === horse.id
                            ? 'bg-red-500 text-white'
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        }`}
                        title={deleteConfirm === horse.id ? t('horses.actions.confirmDelete') : t('horses.actions.delete')}
                      >
                        <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {horses.length === 0 && (
          <div className="p-8 md:p-12 text-center">
            <p className="text-cream-300 font-sans text-sm md:text-base">
              {t('horses.noHorses')}
            </p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <HorseFormModal
          horse={editingHorseData || undefined}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};
