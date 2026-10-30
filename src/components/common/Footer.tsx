'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-[#181B19] text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#947141] flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                NikahKu
              </span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Platform undangan pernikahan digital premium berbasis Next.js dan Supabase. Rancang momen sakral Anda dengan tipografi elegan, audio romantis, dan sistem RSVP terintegrasi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 font-serif">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#D4AF37]">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-[#D4AF37]">
                  Katalog Template
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#D4AF37]">
                  Fitur Unggulan
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#D4AF37]">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#D4AF37]">
                  Dashboard Pengantin
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 font-serif">
              Gaya Template
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/templates?category=modern-minimalist" className="hover:text-[#D4AF37]">
                  Modern & Minimalist
                </Link>
              </li>
              <li>
                <Link href="/templates?category=floral-botanical" className="hover:text-[#D4AF37]">
                  Floral & Botanical
                </Link>
              </li>
              <li>
                <Link href="/templates?category=traditional-heritage" className="hover:text-[#D4AF37]">
                  Traditional Heritage
                </Link>
              </li>
              <li>
                <Link href="/templates?category=dark-celestial" className="hover:text-[#D4AF37]">
                  Dark Celestial
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 font-serif">
              Kontak
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Jakarta & Semarang, Indonesia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>halo@nikahku.id</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>@nikahku.digital</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 NikahKu Digital Invitation Platform. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400">Kebijakan Privasi</span>
            <span className="hover:text-stone-400">Syarat & Ketentuan</span>
            <span className="text-[#D4AF37] font-medium">Built with Next.js & Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
