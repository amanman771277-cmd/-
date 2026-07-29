import React from 'react';
import { MenuItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { language, t } = useLanguage();
  
  return (
    <div className={`bg-[#1A1A1C] rounded-[1.5rem] overflow-hidden shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-amber-500/5 transition-shadow border border-white/5 flex flex-col h-full ${!item.is_available ? 'opacity-50' : ''}`}>
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img 
          src={item.image_url} 
          alt={item.name[language]} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          loading="lazy"
        />
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white text-black px-2 py-1 rotate-12 shadow-lg">
              {t('Sold Out', 'ያለቀ')}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.tags.map((tag) => {
            const isPopular = tag.includes('Popular');
            const isVegan = tag.includes('Vegan') || tag.includes('Vegetarian');
            const isSpecial = tag.includes('Special');
            
            let tagStyles = "bg-white/10 backdrop-blur-md text-slate-200 border border-white/20";
            if (isPopular) tagStyles = "bg-red-500/20 text-red-400 border border-red-500/20";
            if (isVegan) tagStyles = "bg-green-500/20 text-green-400 border border-green-500/20";
            if (isSpecial) tagStyles = "bg-amber-500/20 text-amber-400 border border-amber-500/20";
            
            return (
              <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${tagStyles}`}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="text-lg font-semibold text-slate-100 leading-tight">
            {item.name[language]}
          </h3>
          <span className="font-mono font-bold text-amber-500 whitespace-nowrap text-sm">
            {item.price.toFixed(2)} ETB
          </span>
        </div>
        
        <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow">
          {item.description[language]}
        </p>
        
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-medium pt-3 border-t border-white/5">
          {t('Category', 'ምድብ')}: <span className="text-slate-400">{item.category}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
