import React, { useState, useEffect } from 'react';
import { X, Upload, Save } from 'lucide-react';
import { MenuItem, Category } from '../types';

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
  activeSpecialsCount: number;
}

const CATEGORIES: Category[] = ['Burger', 'Pizza', 'Fast Food', 'Drinks', 'Desserts'];

export default function ItemModal({ item, isOpen, onClose, onSave, activeSpecialsCount }: ItemModalProps) {
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: { en: '', am: '' },
    category: 'Burger',
    price: 0,
    description: { en: '', am: '' },
    image_url: '',
    is_available: true,
    is_daily_special: false,
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        name: { en: '', am: '' },
        category: 'Burger',
        price: 0,
        description: { en: '', am: '' },
        image_url: '',
        is_available: true,
        is_daily_special: false,
        tags: [],
      });
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, index) => index !== indexToRemove)
    }));
  };

  const uploadToCloudinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Tinsae");

      const res = await fetch("https://api.cloudinary.com/v1_1/du5fpqadb/image/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to upload image to Cloudinary");
      }

      return data.secure_url;
    } catch (error: any) {
      console.error("Cloudinary Upload Error:", error);
      alert(`Image Upload Error: ${error.message}`);
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const secureUrl = await uploadToCloudinary(file);
    if (secureUrl) {
      setFormData(prev => ({ ...prev, image_url: secureUrl }));
    }
    setIsUploading(false);
  };

  const handleDailySpecialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    
    // If the item is being checked and it wasn't already checked
    if (isChecked && !formData.is_daily_special) {
      // Check if we're creating a new item or editing an existing one
      const isCurrentlySpecial = item?.is_daily_special;
      const currentCount = activeSpecialsCount;
      
      // If this item was not already a special, checking it will increase the count
      if (!isCurrentlySpecial && currentCount >= 3) {
        alert('You can only highlight up to 3 Daily Specials. / ከ3 በላይ የዕለቱ ልዩ ምግቦችን መምረጥ አይችሉም።');
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, is_daily_special: isChecked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.en || !formData.price) {
      alert('English name and price are required');
      return;
    }

    const newItem: MenuItem = {
      id: item?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name as any,
      category: formData.category as string,
      price: Number(formData.price),
      description: formData.description as any,
      image_url: formData.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
      is_available: formData.is_available ?? true,
      is_daily_special: formData.is_daily_special ?? false,
      tags: formData.tags || [],
      created_at: item?.created_at || new Date().toISOString(),
    };

    onSave(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-[#0A0A0B]/80 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#121214] shadow-2xl rounded-2xl border border-white/10">
          <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/10">
            <h3 className="text-xl font-serif font-semibold text-slate-100 tracking-tight">
              {item ? 'Edit Menu Item' : 'Add New Item'}
            </h3>
            <button onClick={onClose} className="text-slate-500 hover:text-amber-500 bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors border border-transparent hover:border-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* English Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-amber-500 pb-2 border-b border-white/5 text-xs uppercase tracking-widest">English Details</h4>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Name</label>
                  <input
                    type="text"
                    name="name.en"
                    value={formData.name?.en}
                    onChange={handleChange}
                    required
                    className="block w-full bg-[#1A1A1C] border border-white/10 rounded-lg shadow-sm py-2.5 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Description</label>
                  <textarea
                    name="description.en"
                    value={formData.description?.en}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full bg-[#1A1A1C] border border-white/10 rounded-lg shadow-sm py-2.5 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Amharic Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-amber-500 pb-2 border-b border-white/5 text-xs uppercase tracking-widest">Amharic Details</h4>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Name (ስም)</label>
                  <input
                    type="text"
                    name="name.am"
                    value={formData.name?.am}
                    onChange={handleChange}
                    className="block w-full bg-[#1A1A1C] border border-white/10 rounded-lg shadow-sm py-2.5 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Description (መግለጫ)</label>
                  <textarea
                    name="description.am"
                    value={formData.description?.am}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full bg-[#1A1A1C] border border-white/10 rounded-lg shadow-sm py-2.5 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full bg-[#1A1A1C] border border-white/10 rounded-lg shadow-sm py-2.5 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm transition-colors"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price (ETB)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="block w-full bg-[#1A1A1C] border border-white/10 rounded-lg shadow-sm py-2.5 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm font-mono transition-colors"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Food Image</label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="shrink-0">
                  <img
                    className="h-24 w-24 object-cover rounded-xl shadow-sm border border-white/10"
                    src={formData.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200'}
                    alt="Current preview"
                  />
                </div>
                <div className="flex-1 w-full">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    disabled={isUploading} 
                    className={`block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-amber-500 file:text-black hover:file:bg-amber-400 focus:outline-none transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                  {isUploading && (
                    <p className="mt-2 text-xs font-bold text-amber-500 uppercase tracking-widest">Uploading...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tags (Press Enter)</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="e.g. 🔥 Popular, 🌱 Vegan"
                className="block w-full bg-[#1A1A1C] border border-white/10 rounded-lg shadow-sm py-2.5 px-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm mb-3 transition-colors"
              />
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag, index) => (
                  <span key={index} className="inline-flex items-center py-1 pl-2.5 pr-1.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
                    {tag}
                    <button type="button" onClick={() => removeTag(index)} className="ml-1.5 inline-flex text-slate-500 hover:text-red-500 focus:outline-none transition-colors">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            {/* Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-[#1A1A1C] border border-white/5 rounded-lg">
                <input
                  id="is_available"
                  name="is_available"
                  type="checkbox"
                  checked={formData.is_available}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_available: e.target.checked }))}
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500/50 bg-[#121214] border-white/20 rounded accent-amber-500"
                />
                <label htmlFor="is_available" className="ml-3 block text-sm text-slate-300 font-medium">
                  Item is currently in stock
                </label>
              </div>

              <div className="flex items-center p-4 bg-[#1A1A1C] border border-white/5 rounded-lg">
                <input
                  id="is_daily_special"
                  name="is_daily_special"
                  type="checkbox"
                  checked={formData.is_daily_special || false}
                  onChange={handleDailySpecialChange}
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500/50 bg-[#121214] border-white/20 rounded accent-amber-500"
                />
                <label htmlFor="is_daily_special" className="ml-3 block text-sm text-slate-300 font-medium">
                  Daily Special
                </label>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense pt-5 border-t border-white/10">
              <button
                type="submit"
                disabled={isUploading}
                className={`w-full inline-flex justify-center items-center gap-2 rounded-lg border border-transparent px-4 py-3 bg-amber-500 text-xs font-bold uppercase tracking-widest text-black hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-[#121214] sm:col-start-2 transition-colors shadow-lg shadow-amber-500/10 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Save className="w-4 h-4" />
                {item ? 'Save Changes' : 'Create Item'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-lg border border-white/10 px-4 py-3 bg-[#1A1A1C] text-xs font-bold uppercase tracking-widest text-slate-300 hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-[#121214] sm:mt-0 sm:col-start-1 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
