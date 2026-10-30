'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import {
  Heart,
  LayoutGrid,
  Sparkles,
  Shield,
  Menu,
  X,
  Plus,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import AuthModal from '../auth/AuthModal';

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const openAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F2] border-b border-[#E8E2D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#181B19] flex items-center justify-center text-[#FAF7F2]">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#181B19] block leading-none">
                NikahKu
              </span>
              <span className="text-xs text-stone-500 block font-sans mt-0.5">
                Undangan Pernikahan Digital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-stone-700 hover:text-[#947141]"
            >
              Beranda
            </Link>
            <Link
              href="/templates"
              className="text-sm font-medium text-stone-700 hover:text-[#947141]"
            >
              Koleksi Template
            </Link>
            <Link
              href="/#features"
              className="text-sm font-medium text-stone-700 hover:text-[#947141]"
            >
              Fitur
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-stone-700 hover:text-[#947141]"
            >
              Cara Kerja
            </Link>
            <Link
              href="/#faq"
              className="text-sm font-medium text-stone-700 hover:text-[#947141]"
            >
              Pertanyaan
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {role === 'admin' ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#181B19] text-white text-xs font-semibold hover:bg-stone-800"
                >
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  <span>Admin Panel</span>
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded bg-[#F2EEE7] text-xs font-medium text-stone-800 cursor-pointer"
                  >
                    <span>Admin</span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border border-[#E8E2D7] py-1.5 z-50">
                      <div className="px-3 py-2 border-b border-[#E8E2D7]">
                        <p className="text-xs font-semibold text-stone-800">{user?.full_name}</p>
                        <p className="text-xs text-stone-500">{user?.email}</p>
                      </div>
                      <Link
                        href="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-3 py-2 text-xs text-stone-700 hover:bg-[#F2EEE7]"
                      >
                        Platform Overview
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-rose-700 hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Keluar</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : role === 'customer' ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="text-xs font-medium text-stone-700 hover:text-stone-900 px-3 py-2 rounded hover:bg-[#F2EEE7]"
                >
                  Dashboard Saya
                </Link>
                <Link
                  href="/dashboard/invitations/create"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#947141] text-white text-xs font-semibold hover:bg-[#7D5E34]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat Undangan</span>
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded bg-[#F2EEE7] text-xs font-medium text-stone-800 cursor-pointer"
                  >
                    <span className="truncate max-w-[100px]">{user?.full_name?.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border border-[#E8E2D7] py-1.5 z-50">
                      <div className="px-3 py-2 border-b border-[#E8E2D7]">
                        <p className="text-xs font-semibold text-stone-800 truncate">{user?.full_name}</p>
                        <p className="text-xs text-stone-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-3 py-2 text-xs text-stone-700 hover:bg-[#F2EEE7]"
                      >
                        Kelola Undangan
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-rose-700 hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Keluar</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openAuth('login')}
                  className="text-xs font-semibold text-stone-700 hover:text-stone-900 px-3 py-2 cursor-pointer"
                >
                  Masuk
                </button>
                <button
                  onClick={() => openAuth('register')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#181B19] text-white text-xs font-semibold hover:bg-stone-800 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Daftar Sekarang</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:bg-[#F2EEE7] rounded cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-t border-[#E8E2D7] px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-800"
            >
              Beranda
            </Link>
            <Link
              href="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-800"
            >
              Koleksi Template
            </Link>
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-800"
            >
              Fitur
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-800"
            >
              Cara Kerja
            </Link>

            <div className="pt-3 border-t border-[#E8E2D7] flex flex-col gap-2">
              {role === 'admin' ? (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded bg-[#181B19] text-white text-center text-xs font-semibold"
                >
                  Ke Admin Panel
                </Link>
              ) : role === 'customer' ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 rounded bg-[#F2EEE7] text-stone-800 text-center text-xs font-semibold"
                  >
                    Dashboard Saya
                  </Link>
                  <Link
                    href="/dashboard/invitations/create"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 rounded bg-[#947141] text-white text-center text-xs font-semibold"
                  >
                    Buat Undangan Baru
                  </Link>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openAuth('login')}
                    className="py-2.5 px-4 rounded bg-[#F2EEE7] text-stone-800 text-xs font-semibold cursor-pointer"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => openAuth('register')}
                    className="py-2.5 px-4 rounded bg-[#181B19] text-white text-xs font-semibold cursor-pointer"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </>
  );
}
