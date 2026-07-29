import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth
    if (email === 'admin@restaurant.com' && password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password. Try admin@restaurant.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute -top-12 left-0 sm:left-auto flex items-center gap-2 text-slate-500 hover:text-amber-500 transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('Back to Menu', 'ወደ ማውጫ ተመለስ')}
        </button>
        <div className="flex justify-center mb-6">
          <div className="bg-amber-500 w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-black text-3xl shadow-lg shadow-amber-500/20">
            T
          </div>
        </div>
        <h2 className="text-center text-3xl font-serif tracking-tight text-slate-100">
          TINSAE BURGER & PIZZA <span className="text-amber-500 italic">Admin</span>
        </h2>
        <p className="mt-2 text-center text-[10px] text-slate-500 uppercase tracking-widest">
          Secure Control Panel Access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#121214] py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/10 text-red-400 text-xs font-medium p-3 rounded-lg border border-red-500/20 text-center">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 sm:text-sm bg-[#1A1A1C] border-white/10 text-slate-100 placeholder-slate-600 rounded-lg py-2.5 border focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
                  placeholder="admin@restaurant.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 sm:text-sm bg-[#1A1A1C] border-white/10 text-slate-100 placeholder-slate-600 rounded-lg py-2.5 border focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-xs font-bold uppercase tracking-widest text-black bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-[#121214] transition-colors"
              >
                Authorize Access
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
