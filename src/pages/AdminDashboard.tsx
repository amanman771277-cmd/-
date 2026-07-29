import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, LayoutDashboard, Search, Eye, EyeOff } from 'lucide-react';
import { MenuItem } from '../types';
import { mockMenuItems } from '../data';
import ItemModal from './ItemModal';

export default function AdminDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load from local storage on mount (simulating DB)
  useEffect(() => {
    const saved = localStorage.getItem('restaurant_menu_items');
    if (saved) {
      setMenuItems(JSON.parse(saved));
    }
  }, []);

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const handleDeleteItem = (id: string) => {
    setItemToDelete(id);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const updatedList = menuItems.filter(item => item.id !== itemToDelete);
      setMenuItems(updatedList);
      localStorage.setItem('restaurant_menu_items', JSON.stringify(updatedList));
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
  };

  const handleToggleAvailability = (id: string) => {
    const updatedList = menuItems.map(item => 
      item.id === id ? { ...item, is_available: !item.is_available } : item
    );
    setMenuItems(updatedList);
    localStorage.setItem('restaurant_menu_items', JSON.stringify(updatedList));
  };

  const handleSaveItem = (item: MenuItem) => {
    let updatedList;
    if (editingItem) {
      updatedList = menuItems.map(i => i.id === item.id ? item : i);
    } else {
      updatedList = [item, ...menuItems];
    }
    setMenuItems(updatedList);
    localStorage.setItem('restaurant_menu_items', JSON.stringify(updatedList));
  };

  const openNewModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const filteredItems = menuItems.filter(item => 
    item.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-[#121214] border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-amber-500 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-black text-xl">
            T
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-200">TINSAE B&P <span className="text-amber-500 italic font-serif">Admin</span></h1>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/5 text-amber-500 rounded-xl transition-colors text-xs font-bold uppercase tracking-widest border border-white/10 shadow-inner shadow-white/5">
            <LayoutDashboard className="w-5 h-5" />
            Menu Builder
          </a>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-white/5 hover:text-slate-200 rounded-xl transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <Eye className="w-5 h-5" />
            Live Preview
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-[#0A0A0B] border-b border-white/10 px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10">
          <div className="flex justify-between items-center w-full md:w-auto">
            <div>
              <h2 className="text-xl md:text-2xl font-serif tracking-tight text-slate-100">Menu Management</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Manage items, prices and stock levels</p>
            </div>
            <button onClick={handleLogout} className="md:hidden text-slate-400 hover:text-slate-100 p-2">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-200 focus:ring-amber-500/50 focus:border-amber-500 w-full sm:w-64 placeholder-slate-500 transition-colors"
              />
            </div>
            <button 
              onClick={openNewModal}
              className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 rounded font-bold text-xs flex items-center justify-center gap-2 transition-colors uppercase tracking-widest whitespace-nowrap"
            >
              + Add New Item
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="bg-[#121214] rounded-xl shadow-inner border border-white/10 overflow-hidden flex flex-col min-h-[400px]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/5">
                <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <tr>
                    <th scope="col" className="px-4 md:px-6 py-4 text-left whitespace-nowrap">Item</th>
                    <th scope="col" className="px-4 md:px-6 py-4 text-left whitespace-nowrap">Category</th>
                    <th scope="col" className="px-4 md:px-6 py-4 text-left whitespace-nowrap">Price (ETB)</th>
                    <th scope="col" className="px-4 md:px-6 py-4 text-center whitespace-nowrap">Stock</th>
                    <th scope="col" className="px-4 md:px-6 py-4 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-lg object-cover border border-white/10" src={item.image_url} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-200">{item.name.en}</div>
                            <div className="text-[10px] text-slate-500 italic">{item.name.am}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 inline-flex text-[10px] font-bold uppercase tracking-wider rounded border border-white/10 bg-white/5 text-slate-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-slate-300 font-mono">
                        {item.price.toFixed(2)}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-center">
                        <button 
                          onClick={() => handleToggleAvailability(item.id)}
                          className="focus:outline-none"
                        >
                          {item.is_available ? (
                            <div className="inline-flex w-10 h-5 bg-amber-500/20 rounded-full p-1 items-center justify-end border border-amber-500/20">
                              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                            </div>
                          ) : (
                            <div className="inline-flex w-10 h-5 bg-white/10 rounded-full p-1 items-center border border-white/5">
                              <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                            </div>
                          )}
                        </button>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(item)}
                            className="flex items-center gap-1 text-slate-300 hover:text-amber-500 bg-white/5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest">Edit</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="flex items-center gap-1 text-red-400 hover:text-red-500 bg-red-500/10 px-3 py-2 rounded-lg hover:bg-red-500/20 transition-colors border border-transparent hover:border-red-500/20"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-20 flex-1 flex flex-col items-center justify-center">
                <p className="text-slate-500 font-mono text-sm">No items found matching your search.</p>
              </div>
            )}
            
            {/* Quick Stats Footer */}
            <div className="bg-white/[0.03] px-6 py-4 mt-auto flex gap-8 items-center text-[10px] uppercase tracking-widest text-slate-500 border-t border-white/5">
              <div>Total Items: <span className="text-white ml-1">{menuItems.length}</span></div>
              <div>Out of Stock: <span className="text-red-500 ml-1">{menuItems.filter(i => !i.is_available).length}</span></div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span className="text-green-500">Database Active</span>
              </div>
            </div>
          </div>
          
          <footer className="mt-8 flex justify-between text-[8px] uppercase tracking-[0.2em] text-slate-600">
            <div>© {new Date().getFullYear()} TINSAE BURGER AND PIZZA</div>
            <div className="flex gap-4">
              <span className="text-amber-500/50">Admin Mode Active</span>
            </div>
          </footer>
        </main>
      </div>

      <ItemModal 
        isOpen={isModalOpen}
        item={editingItem}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
      />

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-serif text-slate-100 mb-2">Delete Item</h3>
            <p className="text-sm text-slate-400 mb-6">Are you sure you want to delete this menu item? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-300 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
