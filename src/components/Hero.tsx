import { MapPin, Phone, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0A0A0B]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
          {t('The Best Burgers & Pizzas in Town', 'ምርጥ በርገር እና ፒዛ በከተማችን')}
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
          {t('Savor our specially crafted burgers and freshly baked pizzas made with love and the finest ingredients.', 'በጥንቃቄ እና በፍቅር የተዘጋጁ ምርጥ በርገሮች እና ትኩስ ፒዛዎችን ይቅመሱ።')}
        </p>
        <button 
          onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 px-10 rounded-full shadow-lg shadow-amber-500/20 transition-transform hover:scale-105 active:scale-95 uppercase tracking-widest text-xs"
        >
          {t('View Menu', 'ማውጫውን ይመልከቱ')}
        </button>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="bg-[#121214] border border-white/10 rounded-[2rem] shadow-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="flex items-center gap-4 pt-4 md:pt-0 pl-2">
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-amber-500">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{t('Working Hours', 'የስራ ሰዓት')}</p>
              <p className="font-semibold text-slate-200">8:00 AM - 10:00 PM</p>
            </div>
          </div>
          <a href="tel:+251977127799" className="flex items-center gap-4 pt-4 md:pt-0 md:pl-8 hover:bg-white/5 p-2 -my-2 rounded-xl transition-colors group cursor-pointer">
            <div className="bg-white/5 border border-white/10 group-hover:border-amber-500/50 p-3 rounded-xl text-amber-500 transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{t('Contact Us', 'አድራሻችን')}</p>
              <p className="font-semibold text-amber-500 group-hover:text-amber-400 transition-colors">0977127799</p>
            </div>
          </a>
          <a 
            href="https://maps.app.goo.gl/Kn2ZdcyGzP1s9cAK8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 pt-4 md:pt-0 md:pl-8 hover:bg-white/5 p-2 -my-2 rounded-xl transition-colors group cursor-pointer"
          >
            <div className="bg-white/5 border border-white/10 group-hover:border-amber-500/50 p-3 rounded-xl text-amber-500 transition-colors">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{t('Location', 'ቦታ')}</p>
              <p className="font-semibold text-amber-500 group-hover:text-amber-400 transition-colors">{t('21 Mazoriya, Wolaita Sodo', '21 ማዞሪያ፣ ወላይታ ሶዶ')}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
