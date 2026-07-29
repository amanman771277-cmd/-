import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Utensils, Globe, Shield, MoreVertical } from 'lucide-react';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageToggle = () => {
    toggleLanguage();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-amber-500 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-black text-xl">
              <Utensils className="h-6 w-6" />
            </div>
            <span className="font-serif font-bold text-xl text-slate-100 tracking-tight">
              {t('TINSAE BURGER & PIZZA', 'ትንሳኤ በርገር እና ፒዛ')}
            </span>
          </Link>
          
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-400 hover:text-amber-500 hover:bg-white/5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              aria-label="Menu"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#121214] border border-white/10 rounded-xl shadow-2xl py-1.5 overflow-hidden z-50 origin-top-right">
                <button
                  onClick={handleLanguageToggle}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                >
                  <Globe className="h-4 w-4 text-slate-500 flex-shrink-0" />
                  <span>{language === 'en' ? '🇪🇹 አማርኛ' : '🇬🇧 English'}</span>
                </button>
                <div className="h-px bg-white/5 my-1" />
                <Link
                  to="/admin/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Shield className="h-4 w-4 text-slate-500 flex-shrink-0" />
                  <span>{t('Admin Login', 'የአድሚን መግቢያ')}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
