'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { X, Sparkles, Shield, User, Heart, ArrowRight } from 'lucide-react';
import { UserRole } from '@/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const { loginAs, loginWithEmail, registerWithEmail } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === 'register') {
      await registerWithEmail(fullName || 'Calon Pengantin', email || 'user@example.com', password);
    } else {
      await loginWithEmail(email || 'customer@pernikahan.id', password);
    }
    setLoading(false);
    onClose();
  };

  const handleQuickRole = async (targetRole: UserRole) => {
    setLoading(true);
    await loginAs(targetRole);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400">
              <Heart className="w-5 h-5 fill-amber-400 text-amber-400" />
            </span>
            <span className="text-xl font-serif font-bold tracking-tight">NikahKu Digital</span>
          </div>
          <p className="text-stone-300 text-sm">
            {mode === 'login'
              ? 'Selamat datang kembali! Kelola undangan pernikahan impian Anda.'
              : 'Mulai buat undangan pernikahan digital elegan dalam hitungan menit.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick 1-Click Role Login for instant testing */}
          <div className="mb-6 p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl">
            <div className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              1-Click Instant Demo Login:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickRole('customer')}
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white border border-amber-200 hover:border-amber-400 hover:shadow-sm text-stone-800 text-xs font-medium transition"
              >
                <Sparkles className="w-4 h-4 text-amber-600 mb-1" />
                <span>Customer</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole('admin')}
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:shadow-sm text-stone-800 text-xs font-medium transition"
              >
                <Shield className="w-4 h-4 text-purple-600 mb-1" />
                <span>Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole('guest')}
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white border border-stone-200 hover:border-stone-400 hover:shadow-sm text-stone-800 text-xs font-medium transition"
              >
                <User className="w-4 h-4 text-stone-500 mb-1" />
                <span>Guest</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Nama Lengkap Pasangan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Arya & Dinda"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Alamat Email</label>
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Kata Sandi</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-medium text-sm flex items-center justify-center gap-2 transition shadow-md shadow-amber-900/10 cursor-pointer"
            >
              {loading ? (
                'Memproses...'
              ) : mode === 'login' ? (
                <>
                  <span>Masuk ke Akun</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Daftar Akun Baru</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="mt-5 text-center text-xs text-stone-500">
            {mode === 'login' ? (
              <>
                Belum memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-semibold text-amber-800 hover:underline cursor-pointer"
                >
                  Daftar Sekarang
                </button>
              </>
            ) : (
              <>
                Sudah memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-semibold text-amber-800 hover:underline cursor-pointer"
                >
                  Masuk di sini
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

