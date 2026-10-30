'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { storageAdapter } from '@/lib/storage/storage-adapter';
import { Template } from '@/types';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ArrowRight,
  Eye,
  Check,
  Smartphone,
  Music,
  MapPin,
  Calendar,
  Gift,
  Share2,
  Users,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import AuthModal from '@/components/auth/AuthModal';
import confetti from 'canvas-confetti';

export default function LandingPage() {
  const router = useRouter();
  const { role } = useAuth();
  const [featuredTemplates, setFeaturedTemplates] = useState<Template[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // The Live Thing: Interactive stationery customizer
  const [liveGroom, setLiveGroom] = useState('Arya');
  const [liveBride, setLiveBride] = useState('Dinda');
  const [liveGuest, setLiveGuest] = useState('Bpk. Hendrawan & Rekan');
  const [sealOpen, setSealOpen] = useState(false);

  useEffect(() => {
    async function loadFeatured() {
      const all = await storageAdapter.getTemplates(true);
      setFeaturedTemplates(all.slice(0, 4));
    }
    loadFeatured();
  }, []);

  const handleCreateCTA = () => {
    if (role === 'guest') {
      setAuthModalOpen(true);
    } else {
      router.push('/dashboard/invitations/create');
    }
  };

  const handleSealClick = () => {
    setSealOpen(!sealOpen);
    if (!sealOpen) {
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const faqs = [
    {
      q: 'Apakah undangan dapat dibuka dengan mulus di semua smartphone?',
      a: 'Seluruh template dibangun secara mobile-first dan berjalan responsif di perangkat iOS maupun Android tanpa perlu memasang aplikasi tambahan.',
    },
    {
      q: 'Bagaimana cara membagikan undangan dengan nama tamu yang berbeda?',
      a: 'Pada dashboard pengantin, Anda cukup memasukkan nama tamu pada alat bagikan. Sistem langsung menyusun tautan personal (?to=...) beserta teks salam WhatsApp yang sopan.',
    },
    {
      q: 'Apakah musik latar langsung berputar saat undangan dibuka?',
      a: 'Ketika tamu menekan tombol buka undangan pada amplop sampul, musik latar otomatis diputar secara halus mengikuti standar interaksi browser terkini.',
    },
    {
      q: 'Bisakah saya mengedit informasi setelah undangan diterbitkan?',
      a: 'Tentu. Perubahan jadwal, lokasi, galeri foto, atau nomor rekening dapat disimpan kapan saja melalui editor tanpa merusak tautan yang sudah tersebar.',
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#FAF7F2] text-[#181B19]">
        {/* HERO SECTION: The Page is the Object */}
        <section className="pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Two-line Title & Plain Assertion */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#181B19] leading-[1.1] tracking-tight">
                Undangan Pernikahan Digital dengan Estetika Abadi
              </h1>

              <p className="text-base sm:text-lg text-stone-700 max-w-xl leading-relaxed">
                Rancang undangan digital berstandar cetak letterpress dengan tipografi anggun, amplop nama tamu personal, musik romantis, dan sistem RSVP instan.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={handleCreateCTA}
                  className="py-3 px-6 rounded bg-[#947141] hover:bg-[#7D5E34] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Mulai Buat Undangan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/templates"
                  className="py-3 px-6 rounded bg-[#F2EEE7] hover:bg-[#E8E2D7] text-stone-800 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4 text-stone-600" />
                  <span>Katalog Template</span>
                </Link>
              </div>

              {/* Factual assertions */}
              <div className="pt-6 grid grid-cols-3 gap-4 text-xs text-stone-600">
                <div>
                  <span className="font-bold text-stone-900 block text-sm">100%</span>
                  <span>Responsif di ponsel</span>
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-sm">Bebas</span>
                  <span>Nama tamu personal</span>
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-sm">Real-Time</span>
                  <span>Data RSVP & ucapan</span>
                </div>
              </div>
            </div>

            {/* Right Column: The Live Thing — Interactive Invitation Stationery Object */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-[#F2EEE7] p-6 rounded-2xl">
                <div className="flex items-center justify-between pb-3 mb-4">
                  <span className="font-serif font-bold text-sm text-[#181B19]">
                    Simulasi Kartu Undangan
                  </span>
                  <span className="text-xs text-stone-500">Ketik untuk mencoba</span>
                </div>

                {/* Input Controls */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Mempelai Pria</label>
                    <input
                      type="text"
                      value={liveGroom}
                      onChange={(e) => setLiveGroom(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-white border border-[#D8D2C5] text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Mempelai Wanita</label>
                    <input
                      type="text"
                      value={liveBride}
                      onChange={(e) => setLiveBride(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-white border border-[#D8D2C5] text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Nama Tamu pada Amplop</label>
                  <input
                    type="text"
                    value={liveGuest}
                    onChange={(e) => setLiveGuest(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-white border border-[#D8D2C5] text-xs text-stone-900 focus:outline-none"
                  />
                </div>

                {/* The Physical Stationery Card */}
                <div className="bg-[#FAF7F2] p-6 rounded-xl text-center relative overflow-hidden transition-opacity">
                  <span className="text-[10px] uppercase tracking-wider text-[#947141] font-semibold block mb-1">
                    The Wedding of
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-[#181B19] mb-2">
                    {liveGroom || 'Pria'} & {liveBride || 'Wanita'}
                  </h2>
                  <p className="text-xs text-stone-500 mb-5">Minggu, 20 Desember 2026</p>

                  <div className="p-3 rounded bg-[#F2EEE7] text-xs mb-4">
                    <span className="text-[11px] text-stone-500 block mb-0.5">Kepada Yth:</span>
                    <span className="font-serif font-bold text-stone-900 text-sm block">
                      {liveGuest || 'Tamu Terhormat'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSealClick}
                    className="w-full py-2.5 px-4 rounded bg-[#181B19] hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span>{sealOpen ? 'Amplop Terbuka (Sentuh Lagi)' : 'Buka Segel Amplop'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEMPLATE SHOWCASE: Physical stationery editions */}
        <section id="templates-showcase" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#947141] font-semibold block">
              Desain &amp; Karakter
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#181B19] leading-tight">
              Empat Edisi Seni Undangan
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Masing-masing karya dirancang dengan tipografi orisinil, filosofi tata letak, dan ornamen khas yang tidak akan Anda temukan di platform undangan generik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-[#F2EEE7] rounded-2xl overflow-hidden border border-[#E8E2D7] flex flex-col justify-between transition-colors hover:border-[#947141]"
              >
                <div className="aspect-[16/11] overflow-hidden bg-stone-200 relative">
                  <img
                    src={tpl.thumbnail_url}
                    alt={tpl.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#181B19] text-[#FAF7F2] text-[10px] font-bold px-2.5 py-1 rounded">
                    {tpl.theme_config.layout.toUpperCase()} STYLE
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] text-[#947141] font-semibold block mb-1">
                      Tipografi: {tpl.theme_config.fontHeading}
                    </span>
                    <h3 className="font-serif font-bold text-xl text-[#181B19] mb-1">
                      {tpl.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <Link
                      href={`/invitation/${tpl.slug}`}
                      target="_blank"
                      className="text-xs font-bold text-[#947141] hover:underline flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Demo (Tab Baru)</span>
                    </Link>

                    <Link
                      href={`/templates`}
                      className="text-xs font-semibold text-stone-700 hover:text-stone-900"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#181B19] hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
            >
              <span>Jelajahi Seluruh Koleksi &amp; Uji Pratinjau Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* FEATURES: Capabilities as an editorial menu */}
        <section id="features" className="py-20 bg-[#181B19] text-[#FAF7F2] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Kelengkapan Fitur Undangan
              </h2>
              <p className="text-stone-400 text-sm">
                Dirancang untuk memudahkan pasangan pengantin dan memberikan kenyamanan membaca bagi para tamu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Nama Tamu Khusus & Amplop Pembuka',
                  desc: 'Hasilkan tautan personal untuk setiap kerabat dengan amplop pembuka bersampul resmi dan letupan konfeti perayaan.',
                },
                {
                  title: 'Musik Latar Romantis',
                  desc: 'Audio romantis mengalun otomatis dengan tombol kendali putar atau jeda yang ramah pengguna.',
                },
                {
                  title: 'Panduan Lokasi Google Maps',
                  desc: 'Arahkan para tamu langsung ke lokasi akad dan resepsi dengan satu sentuhan navigasi akurat.',
                },
                {
                  title: 'Konfirmasi Kehadiran (RSVP)',
                  desc: 'Pantau data kepastian jumlah tamu yang hadir secara langsung guna mempermudah estimasi katering.',
                },
                {
                  title: 'Amplop Digital & Rekening Hadiah',
                  desc: 'Sediakan kemudahan tanda kasih melalui rekening bank dengan fitur salin nomor satu sentuhan serta kode QRIS.',
                },
                {
                  title: 'Generator Teks Pesan WhatsApp',
                  desc: 'Format pesan salam undangan resmi terisi otomatis dengan nama tamu yang dituju siap kirim.',
                },
              ].map((feat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-stone-900 space-y-2"
                >
                  <h3 className="font-serif font-bold text-base text-white">{feat.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS: Sequential flow without decorative numbers */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#181B19] mb-3">
              Alur Penerbitan Undangan
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Dari memilih desain hingga menyebarkan undangan ke seluruh kerabat dalam hitungan menit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Pilih Template Desain',
                desc: 'Pilih salah satu dari 4 gaya tipografi dan tata letak yang paling mewakili konsep pernikahan Anda.',
              },
              {
                title: 'Lengkapi Data Acara',
                desc: 'Tulis biodata mempelai, jadwal akad dan resepsi, cerita perjalanan cinta, dan rekening tanda kasih.',
              },
              {
                title: 'Periksa di Simulator',
                desc: 'Lihat simulasi langsung di layar ponsel dan simpan draf hingga seluruh detail terisi sempurna.',
              },
              {
                title: 'Publikasi dan Sebarkan',
                desc: 'Terbitkan undangan ke URL unik dan sebar tautan ke keluarga serta sahabat melalui pesan WhatsApp.',
              },
            ].map((st, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#F2EEE7] space-y-2"
              >
                <h3 className="font-serif font-bold text-base text-[#181B19]">{st.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-serif font-bold text-[#181B19] mb-2">
              Pertanyaan yang Kerap Diajukan
            </h2>
            <p className="text-xs text-stone-600">
              Informasi teknis dan panduan penggunaan platform undangan digital.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-[#F2EEE7] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-serif font-bold text-[#181B19] text-sm cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#947141] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-stone-700 leading-relaxed pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM CTA: The Reply Card */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F2EEE7] text-center">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#181B19]">
              Wujudkan Undangan Digital Pernikahan Anda
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Sambut hari bahagia dengan undangan digital yang sopan, fungsional, dan meninggalkan kesan mendalam bagi setiap tamu yang diundang.
            </p>
            <div className="pt-2">
              <button
                onClick={handleCreateCTA}
                className="py-3 px-8 rounded bg-[#181B19] hover:bg-stone-800 text-white font-semibold text-sm cursor-pointer inline-flex items-center gap-2 transition-colors"
              >
                <span>Mulai Buat Undangan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode="register"
      />

      <Footer />
    </>
  );
}
