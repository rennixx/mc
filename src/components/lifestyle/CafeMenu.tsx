import { useState } from 'react';
import { Coffee, Martini, Cookie, Cake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type MenuCategory = 'coffee' | 'mocktails' | 'snacks' | 'sweets';

interface MenuItem {
  id: number;
  nameKey: string;
  descriptionKey: string;
  price: string;
  category: MenuCategory;
  dietary?: ('V' | 'GF')[];
  image?: string;
}

const menuItems: MenuItem[] = [
  // Coffee
  { id: 1, nameKey: 'kurdishDibekCoffee.name', descriptionKey: 'kurdishDibekCoffee.description', price: '35,000 IQD', category: 'coffee' },
  { id: 2, nameKey: 'lavenderLatte.name', descriptionKey: 'lavenderLatte.description', price: '40,000 IQD', category: 'coffee', dietary: ['V'] },
  { id: 3, nameKey: 'coldBrew.name', descriptionKey: 'coldBrew.description', price: '38,000 IQD', category: 'coffee' },
  { id: 4, nameKey: 'cardamomCappuccino.name', descriptionKey: 'cardamomCappuccino.description', price: '37,000 IQD', category: 'coffee' },
  { id: 5, nameKey: 'turkishCoffee.name', descriptionKey: 'turkishCoffee.description', price: '32,000 IQD', category: 'coffee' },
  
  // Mocktails
  { id: 6, nameKey: 'pomegranateSunset.name', descriptionKey: 'pomegranateSunset.description', price: '30,000 IQD', category: 'mocktails', dietary: ['V', 'GF'] },
  { id: 7, nameKey: 'mountainBerryFizz.name', descriptionKey: 'mountainBerryFizz.description', price: '32,000 IQD', category: 'mocktails', dietary: ['V', 'GF'] },
  { id: 8, nameKey: 'honeyLemonade.name', descriptionKey: 'honeyLemonade.description', price: '28,000 IQD', category: 'mocktails', dietary: ['V', 'GF'] },
  { id: 9, nameKey: 'roseWaterCooler.name', descriptionKey: 'roseWaterCooler.description', price: '29,000 IQD', category: 'mocktails', dietary: ['V', 'GF'] },
  
  // Snacks
  { id: 10, nameKey: 'kurdishCheesePlate.name', descriptionKey: 'kurdishCheesePlate.description', price: '45,000 IQD', category: 'snacks', dietary: ['GF'] },
  { id: 11, nameKey: 'flatbreadDips.name', descriptionKey: 'flatbreadDips.description', price: '38,000 IQD', category: 'snacks', dietary: ['V'] },
  { id: 12, nameKey: 'fruitPlatter.name', descriptionKey: 'fruitPlatter.description', price: '35,000 IQD', category: 'snacks', dietary: ['V', 'GF'] },
  { id: 13, nameKey: 'mixedNuts.name', descriptionKey: 'mixedNuts.description', price: '25,000 IQD', category: 'snacks', dietary: ['V', 'GF'] },
  
  // Sweets
  { id: 14, nameKey: 'baklavaAssortment.name', descriptionKey: 'baklavaAssortment.description', price: '42,000 IQD', category: 'sweets' },
  { id: 15, nameKey: 'kurdishKlecha.name', descriptionKey: 'kurdishKlecha.description', price: '28,000 IQD', category: 'sweets', dietary: ['V'] },
  { id: 16, nameKey: 'halva.name', descriptionKey: 'halva.description', price: '30,000 IQD', category: 'sweets', dietary: ['V', 'GF'] },
  { id: 17, nameKey: 'carrotCake.name', descriptionKey: 'carrotCake.description', price: '36,000 IQD', category: 'sweets' },
];

const categories = [
  { id: 'coffee' as MenuCategory, key: 'coffee', Icon: Coffee },
  { id: 'mocktails' as MenuCategory, key: 'mocktails', Icon: Martini },
  { id: 'snacks' as MenuCategory, key: 'snacks', Icon: Cookie },
  { id: 'sweets' as MenuCategory, key: 'sweets', Icon: Cake },
];

interface MenuItemCardProps {
  item: MenuItem;
  t: (key: string) => string;
}

const MenuItemCard = ({ item, t }: MenuItemCardProps) => (
  <div className="bg-cream-100 dark:bg-slate-700 p-4 flex gap-4 shadow-tactile hover:shadow-tactile-hover transition-shadow">
    {/* Thumbnail */}
    <div className="w-20 h-20 flex-shrink-0 bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-3xl">
      {item.image ? (
        <img src={item.image} alt={t(`menu.items.${item.nameKey}`)} className="w-full h-full object-cover" />
      ) : (
        <span>🍽️</span>
      )}
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-sans font-semibold text-forest-700 dark:text-cream-200 text-base">
          {t(`menu.items.${item.nameKey}`)}
        </h3>
        <span className="text-gold-500 font-sans font-bold text-sm whitespace-nowrap flex-shrink-0">
          {item.price}
        </span>
      </div>
      
      <p className="text-slate-600 dark:text-cream-400 font-sans text-sm mb-2">
        {t(`menu.items.${item.descriptionKey}`)}
      </p>

      {/* Dietary Badges */}
      {item.dietary && item.dietary.length > 0 && (
        <div className="flex gap-2">
          {item.dietary.map((badge) => (
            <span
              key={badge}
              className={`${badge === 'V' ? 'bg-forest-600' : 'bg-gold-600'} text-white text-xs px-2 py-0.5 font-sans`}
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

export const CafeMenu = () => {
  const { t } = useTranslation('lifestyle');
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('coffee');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = t(`menu.items.${item.nameKey}`).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={t('menu.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 ps-12 bg-cream-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 focus:border-forest-600 dark:focus:border-gold-500 outline-none font-sans text-slate-800 dark:text-cream-200"
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          {categories.map((category) => {
            const IconComponent = category.Icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 font-sans font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-saddle-500 text-cream-200 shadow-tactile'
                    : 'bg-cream-200 dark:bg-slate-700 text-slate-600 dark:text-cream-400 hover:bg-saddle-400 hover:text-cream-200'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {t(`menu.categories.${category.key}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <MenuItemCard key={item.id} item={item} t={t} />)
        ) : (
          <div className="text-center py-12 text-slate-600 dark:text-cream-400 font-sans">
            <span className="text-4xl mb-4 block">🔍</span>
            No items found matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-slate-300 dark:border-slate-600 flex flex-wrap gap-4 text-sm font-sans text-slate-600 dark:text-cream-400">
        <div className="flex items-center gap-2">
          <span className="bg-forest-600 text-white text-xs px-2 py-0.5">V</span>
          <span>{t('menu.dietary.V')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-gold-600 text-white text-xs px-2 py-0.5">GF</span>
          <span>{t('menu.dietary.GF')}</span>
        </div>
        <div className="ms-auto text-xs">
          💡 {t('menu.legend.note')}
        </div>
      </div>
    </div>
  );
};
