'use client';

import React from 'react';
import { Heart, MailOpen, Calendar, MapPin, Sparkles, Crown, Flower2, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OpeningCoverProps {
  groomNickname: string;
  brideNickname: string;
  guestName?: string;
  eventDate?: string;
  venueName?: string;
  themeStyle: 'editorial' | 'botanical' | 'royal' | 'celestial';
  onOpen: () => void;
}

export default function OpeningCover({
  groomNickname,
  brideNickname,
  guestName,
  eventDate,
  venueName,
  themeStyle,
  onOpen,
}: OpeningCoverProps) {
  const handleOpenClick = () => {
    try {
      if (themeStyle === 'royal') {
        confetti({
          particleCount: 80,
          spread: 70,
          colors: ['#D4AF37', '#9C7C38', '#F5EDE0', '#1C130B'],
          origin: { y: 0.75 },
        });
      } else if (themeStyle === 'botanical') {
        confetti({
          particleCount: 75,
          spread: 70,
          colors: ['#2C4233', '#8FA893', '#FAF7F2', '#E8DDD3'],
          origin: { y: 0.75 },
        });
      } else if (themeStyle === 'celestial') {
        confetti({
          particleCount: 90,
          spread: 80,
          colors: ['#E6C687', '#93C5FD', '#FFFFFF', '#38BDF8'],
          origin: { y: 0.75 },
        });
      } else {
        confetti({
          particleCount: 70,
          spread: 60,
          colors: ['#181B19', '#947141', '#FAF7F2'],
          origin: { y: 0.75 },
        });
      }
    } catch {
      // ignore
    }
    onOpen();
  };

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Save The Date';

  // 1. EDITORIAL THEME COVER
  if (themeStyle === 'editorial') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/70 backdrop-blur-md">
        <div className="max-w-md w-full bg-[#FAF7F2] border border-[#D8D2C5] p-8 sm:p-10 shadow-2xl relative">
          {/* Top Editorial Monogram & Issue Tag */}
          <div className="flex items-center justify-between border-b border-[#E2DDD3] pb-4 mb-8">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#947141]">
              ISSUE NO. 01 — 2026
            </span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-stone-500">
              OFFICIAL INVITATION
            </span>
          </div>

          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full border border-[#947141] flex items-center justify-center text-[#947141] font-bodoni text-xl italic bg-[#F2EEE7]">
              {groomNickname[0]} &amp; {brideNickname[0]}
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.3em] text-[#947141] font-semibold block">
                The Wedding Celebration of
              </span>
              <h1 className="text-4xl sm:text-5xl font-bodoni font-normal text-[#181B19] tracking-tight">
                {groomNickname} <span className="italic font-normal text-[#947141]">&amp;</span> {brideNickname}
              </h1>
            </div>

            {/* Guest Personalization Envelope Badge */}
            <div className="p-4 bg-[#F2EEE7] border border-[#E2DDD3] text-center space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block">
                Kepada Yth. Tamu Undangan:
              </span>
              <p className="text-base font-serif font-bold text-[#181B19]">
                {guestName || 'Bapak / Ibu / Rekan Terkasih'}
              </p>
            </div>

            <div className="text-xs text-stone-600 space-y-1 font-mono">
              <p>{formattedDate}</p>
              <p>{venueName || 'Semarang, Indonesia'}</p>
            </div>

            <button
              onClick={handleOpenClick}
              className="w-full py-4 px-6 bg-[#181B19] text-[#FAF7F2] font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#947141] transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <MailOpen className="w-4 h-4" />
              <span>Buka Undangan Eksklusif</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. BOTANICAL GARDEN ROMANCE COVER
  if (themeStyle === 'botanical') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B291E]/75 backdrop-blur-md">
        <div className="max-w-md w-full bg-[#FAF8F5] border-2 border-[#D9E3DA] rounded-[32px] p-8 sm:p-10 shadow-2xl relative text-center">
          {/* Subtle floral laurel decoration */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8EFE9] text-xs font-semibold text-[#2C4233] mb-6">
            <Flower2 className="w-3.5 h-3.5" />
            <span>Botanical Garden Romance</span>
          </div>

          <div className="space-y-4">
            <p className="font-script text-3xl text-[#2C4233]">The Wedding of</p>
            <h1 className="text-4xl sm:text-5xl font-cormorant font-normal text-[#1B291E] tracking-wide">
              {groomNickname} <span className="italic text-[#2C4233]">&amp;</span> {brideNickname}
            </h1>

            {/* Arched guest envelope plaque */}
            <div className="pt-2 pb-2">
              <div className="p-4 rounded-2xl bg-[#EFF4EF] border border-[#D9E3DA]">
                <span className="text-xs uppercase tracking-widest text-[#2C4233] font-semibold block mb-1">
                  Kepada Yang Terhormat
                </span>
                <p className="text-lg font-cormorant font-bold text-[#1B291E]">
                  {guestName || 'Tamu Undangan Istimewa'}
                </p>
                <span className="text-[11px] text-[#4F6854] block mt-1">
                  *Mohon maaf bila ada kesalahan penulisan gelar &amp; nama
                </span>
              </div>
            </div>

            <div className="text-xs text-[#3E5C46] space-y-1 font-medium">
              <p>{formattedDate}</p>
              <p>{venueName || 'Jakarta, Indonesia'}</p>
            </div>

            <button
              onClick={handleOpenClick}
              className="w-full py-3.5 px-6 bg-[#2C4233] hover:bg-[#1E3024] text-white rounded-full font-serif text-sm tracking-wider transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 cursor-pointer font-semibold"
            >
              <MailOpen className="w-4 h-4" />
              <span>Buka Surat Undangan</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. ROYAL KERATON HERITAGE COVER
  if (themeStyle === 'royal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0604]/85 backdrop-blur-md">
        <div className="max-w-md w-full bg-[#1A110B] border-2 border-[#D4AF37] rounded-2xl p-8 sm:p-10 shadow-2xl relative text-center text-[#F5ECE1]">
          {/* Ornate Gold Filigree Crest */}
          <div className="w-16 h-16 mx-auto rounded-full bg-[#2A1C12] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-6 shadow-lg shadow-amber-950/50">
            <Crown className="w-8 h-8" />
          </div>

          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-cinzel font-bold block">
              Serat Ulem Dhaup Ageng
            </span>
            <h1 className="text-3xl sm:text-4xl font-cinzel font-normal text-[#F5ECE1] tracking-wider leading-relaxed">
              {groomNickname} <span className="text-[#D4AF37]">&amp;</span> {brideNickname}
            </h1>

            {/* Royal guest scroll plaque */}
            <div className="pt-2 pb-2">
              <div className="p-4 rounded-xl bg-[#24170E] border border-[#D4AF37]/50 shadow-inner">
                <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-cinzel block mb-1">
                  Katur Panjenenganipun:
                </span>
                <p className="text-lg font-cinzel font-bold text-[#F5ECE1]">
                  {guestName || 'Para Rawuh Ingkang Minulyo'}
                </p>
                <span className="text-[11px] text-[#D4AF37]/80 block mt-1 italic">
                  Ing Palungguhan
                </span>
              </div>
            </div>

            <div className="text-xs text-[#D4AF37] space-y-1 font-serif">
              <p>{formattedDate}</p>
              <p>{venueName || 'Surakarta Hadiningrat'}</p>
            </div>

            <button
              onClick={handleOpenClick}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] hover:brightness-110 text-[#140D07] font-cinzel font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-amber-950/60 cursor-pointer"
            >
              <MailOpen className="w-4 h-4" />
              <span>Buka Serat Ulem</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. CELESTIAL NIGHT COVER
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070F]/85 backdrop-blur-md">
      <div className="max-w-md w-full bg-[#0D1426] border border-sky-400/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative text-center text-[#F8FAFC]">
        {/* Glow orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-sky-500/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="w-14 h-14 mx-auto rounded-full bg-slate-900 border border-sky-400/50 flex items-center justify-center text-[#E6C687] shadow-lg shadow-sky-950">
            <Moon className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E6C687] font-outfit font-semibold block">
              Under The Starlight
            </span>
            <h1 className="text-4xl sm:text-5xl font-playfair font-normal text-white tracking-wide">
              {groomNickname} <span className="italic text-[#E6C687]">&amp;</span> {brideNickname}
            </h1>
          </div>

          {/* Frosted starlight guest badge */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
            <span className="text-[11px] uppercase tracking-widest text-sky-300 font-outfit block mb-1">
              Dear Honored Guest
            </span>
            <p className="text-lg font-outfit font-semibold text-white">
              {guestName || 'Special Invited Guest'}
            </p>
          </div>

          <div className="text-xs text-slate-300 space-y-1 font-outfit">
            <p>{formattedDate}</p>
            <p>{venueName || 'Bandung, Indonesia'}</p>
          </div>

          <button
            onClick={handleOpenClick}
            className="w-full py-3.5 px-6 bg-[#E6C687] hover:bg-[#F3D99C] text-slate-950 font-outfit font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <MailOpen className="w-4 h-4" />
            <span>Open Celestial Invitation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
