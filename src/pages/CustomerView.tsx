import { useState, useMemo, useEffect } from 'react';
import { Search, PhoneCall, MessageCircle, ArrowUpDown } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MenuCard from '../components/MenuCard';
import { mockMenuItems } from '../data';
import { Category, MenuItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../lib/firebase';

const CATEGORIES: Category[] = ['All', 'Burger', 'Pizza', 'Fast Food', 'Drinks', 'Desserts'];

export default function CustomerView() {
  const { language, t } = useLanguage();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'menu_items'));
        if (querySnapshot.empty) {
          setMenuItems(mockMenuItems);
        } else {
          const items = querySnapshot.docs.map(doc => doc.data() as MenuItem);
          setMenuItems(items);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setMenuItems(mockMenuItems);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    let result = menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        item.name.en.toLowerCase().includes(searchLower) ||
        item.name.am.toLowerCase().includes(searchLower) ||
        item.description.en.toLowerCase().includes(searchLower) ||
        item.description.am.toLowerCase().includes(searchLower);
        
      return matchesCategory && matchesSearch && item.is_available;
    });

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, searchQuery, menuItems, sortOrder]);

  const handleSortToggle = () => {
    setSortOrder(prev => {
      if (prev === 'default') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'default';
    });
  };

  const specialItems = menuItems.filter(item => item.tags.some(tag => tag.includes("Special")) && item.is_available);

  return (
    <div className="min-h-screen bg-[#0A0A0B] font-sans">
      <Navbar />
      <Hero />
      
      <main id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Today's Specials */}
        {specialItems.length > 0 && searchQuery === '' && activeCategory === 'All' && (
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-100 mb-2">{t('Today\'s Specials', 'የዕለቱ ልዩ ምግቦች')}</h2>
            <div className="w-20 h-1 bg-amber-500 rounded-full mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {specialItems.map(item => (
                <MenuCard key={`special-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <h2 className="text-3xl font-serif font-bold text-slate-100 mb-2">{t('Our Menu', 'ማውጫ')}</h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full mb-8"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Category Filter */}
            <div className="flex overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/10'
                      : 'bg-[#1A1A1C] text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-white/5'
                  }`}
                >
                  {category === 'All' ? t('All', 'ሁሉም') : category}
                </button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative w-full md:w-72 flex-shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('Search dishes...', 'ምግቦችን ይፈልጉ...')}
                  className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl leading-5 bg-[#1A1A1C] text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm transition-shadow"
                />
              </div>

              {/* Sort Button */}
              <button
                onClick={handleSortToggle}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1A1A1C] border border-white/10 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
                title="Sort by price"
              >
                <ArrowUpDown className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {sortOrder === 'default' && t('Sort by Price', 'በዋጋ ደርድር')}
                  {sortOrder === 'asc' && t('Price: Low to High', 'ዋጋ: ከዝቅተኛ ወደ ከፍተኛ')}
                  {sortOrder === 'desc' && t('Price: High to Low', 'ዋጋ: ከከፍተኛ ወደ ዝቅተኛ')}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {isLoading ? (
          <div className="text-center py-20 bg-[#121214] rounded-[2.5rem] border border-dashed border-white/10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mb-4"></div>
            <p className="text-slate-400 text-lg">{t('Loading menu...', 'ማውጫውን በመጫን ላይ...')}</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#121214] rounded-[2.5rem] border border-dashed border-white/10">
            <p className="text-slate-400 text-lg">{t('No items found matching your search.', 'ከፍለጋዎ ጋር የሚዛመድ ምግብ አልተገኘም።')}</p>
          </div>
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a 
          href="https://wa.me/251977127799" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-xl transition-transform hover:scale-110 flex items-center justify-center group"
          title={t('Order via WhatsApp', 'በዋትስአፕ ይዘዙ')}
        >
          <MessageCircle className="h-6 w-6" />
        </a>
        <a 
          href="tel:+251977127799" 
          className="bg-amber-500 hover:bg-amber-400 text-black p-4 rounded-full shadow-xl shadow-amber-500/20 transition-transform hover:scale-110 flex items-center justify-center"
          title={t('Call to Order', 'ለመደወል')}
        >
          <PhoneCall className="h-6 w-6" />
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-[#121214] py-12 text-center text-slate-500 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-amber-500 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-black">
              T
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-200">
              TINSAE BURGER & PIZZA
            </h2>
          </div>
          <div className="flex gap-6 mb-8 text-xs font-medium uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-amber-500 transition-colors">Facebook</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Twitter</a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
            &copy; {new Date().getFullYear()} TINSAE BURGER AND PIZZA
          </p>
        </div>
      </footer>
    </div>
  );
}
