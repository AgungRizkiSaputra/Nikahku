'use client';

import React, { useState } from 'react';
import { Invitation } from '@/types';
import CountdownTimer from '../shared/CountdownTimer';
import GiftSection from '../shared/GiftSection';
import RsvpSection from '../shared/RsvpSection';
import WishesSection from '../shared/WishesSection';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Crown,
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';

interface LayoutProps {
  invitation: Invitation;
  guestName?: string;
}

function RoyalOrnaments() {
  return (
    <>
      <style>{`
        @keyframes royal-shimmer { 0%,100%{opacity:0.04} 50%{opacity:0.1} }
        @keyframes royal-glow { 0%,100%{box-shadow:0 0 20px rgba(201,160,80,0.05)} 50%{box-shadow:0 0 40px rgba(201,160,80,0.12)} }
        @keyframes batik-pulse { 0%,100%{opacity:0.03} 50%{opacity:0.07} }
        .royal-shimmer { animation: royal-shimmer 6s ease-in-out infinite; }
        .royal-shimmer-2 { animation: royal-shimmer 8s ease-in-out 2s infinite; }
        .royal-glow { animation: royal-glow 5s ease-in-out infinite; }
        .batik-pulse { animation: batik-pulse 10s ease-in-out infinite; }
      `}</style>

      {/* Top ornamental border */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#C9A050]/30 to-transparent pointer-events-none z-[1]" />

      {/* Javanese kawung batik pattern - top left */}
      <div className="fixed top-0 left-0 w-72 h-72 pointer-events-none z-0 batik-pulse">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
          {[0, 1, 2, 3, 4].map(row =>
            [0, 1, 2, 3, 4].map(col => (
              <g key={`${row}-${col}`} transform={`translate(${col * 60 + 15}, ${row * 60 + 15})`}>
                <circle cx="15" cy="15" r="12" stroke="#C9A050" strokeWidth="0.5" opacity="0.15" />
                <circle cx="15" cy="15" r="6" fill="#C9A050" opacity="0.04" />
                <circle cx="15" cy="3" r="2" fill="#C9A050" opacity="0.06" />
                <circle cx="15" cy="27" r="2" fill="#C9A050" opacity="0.06" />
                <circle cx="3" cy="15" r="2" fill="#C9A050" opacity="0.06" />
                <circle cx="27" cy="15" r="2" fill="#C9A050" opacity="0.06" />
              </g>
            ))
          )}
        </svg>
      </div>

      {/* Bottom right batik */}
      <div className="fixed bottom-0 right-0 w-72 h-72 pointer-events-none z-0 batik-pulse" style={{ animationDelay: '3s' }}>
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full rotate-45">
          {[0, 1, 2, 3].map(row =>
            [0, 1, 2, 3].map(col => (
              <g key={`b-${row}-${col}`} transform={`translate(${col * 70 + 20}, ${row * 70 + 20})`}>
                <path d="M15 0 L30 15 L15 30 L0 15 Z" stroke="#C9A050" strokeWidth="0.6" opacity="0.1" />
                <circle cx="15" cy="15" r="4" fill="#C9A050" opacity="0.05" />
              </g>
            ))
          )}
        </svg>
      </div>

      {/* Gold shimmer particles */}
      <div className="royal-shimmer fixed top-[20%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#C9A050] pointer-events-none z-0" />
      <div className="royal-shimmer-2 fixed top-[35%] right-[12%] w-2 h-2 rounded-full bg-[#C9A050] pointer-events-none z-0" />
      <div className="royal-shimmer fixed top-[60%] left-[15%] w-1 h-1 rounded-full bg-[#C9A050] pointer-events-none z-0" style={{ animationDelay: '4s' }} />
      <div className="royal-shimmer-2 fixed bottom-[25%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#C9A050] pointer-events-none z-0" />

      {/* Bottom ornamental border */}
      <div className="fixed bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#C9A050]/30 to-transparent pointer-events-none z-[1]" />
    </>
  );
}

export default function RoyalLayout({ invitation, guestName }: LayoutProps) {
  const content = invitation.content;
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  if (!content) return null;

  return (
    <article className="min-h-screen bg-[#0E0804] text-[#F7EFE3] font-sans antialiased selection:bg-[#C9A050] selection:text-[#0E0804] relative overflow-hidden">
      <RoyalOrnaments />

      {/* 1. ROYAL KERATON HEADER */}
      <header className="pt-28 pb-20 px-6 sm:px-12 max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#1C120A] border border-[#C9A050]/60 flex items-center justify-center text-[#C9A050] shadow-lg shadow-black/60 royal-glow">
            <Crown className="w-7 h-7" />
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#C9A050] font-cinzel font-semibold block">
            Kagungan Dalem Pawiwahan Ageng
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-cinzel font-normal text-[#F7EFE3] tracking-wider leading-tight">
            {content.groom_nickname} <span className="text-[#C9A050] font-cinzel-dec">&amp;</span> {content.bride_nickname}
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A050] font-serif pt-1">
            {invitation.event_date
              ? new Date(invitation.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
              : 'Save The Date'}
          </p>
        </div>

        {/* Royal ornamental divider */}
        <div className="max-w-sm mx-auto py-2">
          <svg viewBox="0 0 300 50" fill="none" className="w-full h-auto" aria-hidden="true">
            <path d="M0 25 L60 25" stroke="#C9A050" strokeWidth="0.5" opacity="0.4" />
            <path d="M240 25 L300 25" stroke="#C9A050" strokeWidth="0.5" opacity="0.4" />
            <path d="M80 25 C100 5 120 5 150 15 C180 5 200 5 220 25" stroke="#C9A050" strokeWidth="0.8" opacity="0.3" />
            <path d="M80 25 C100 45 120 45 150 35 C180 45 200 45 220 25" stroke="#C9A050" strokeWidth="0.8" opacity="0.3" />
            <path d="M100 25 L115 15 L130 25 L115 35 Z" stroke="#C9A050" strokeWidth="0.6" opacity="0.2" />
            <path d="M170 25 L185 15 L200 25 L185 35 Z" stroke="#C9A050" strokeWidth="0.6" opacity="0.2" />
            <circle cx="150" cy="25" r="4" fill="#C9A050" opacity="0.2" />
            <circle cx="150" cy="25" r="2" fill="#C9A050" opacity="0.4" />
          </svg>
        </div>

        {/* Quote */}
        {content.quote && (
          <div className="pt-4 max-w-xl mx-auto">
            <p className="font-serif italic text-base sm:text-xl text-[#F7EFE3]/90 leading-relaxed">
              &ldquo;{content.quote}&rdquo;
            </p>
            {content.quote_source && (
              <span className="block mt-3 text-xs uppercase tracking-widest text-[#C9A050] font-cinzel font-bold">
                — {content.quote_source}
              </span>
            )}
          </div>
        )}

        {invitation.event_date && (
          <div className="pt-6 max-w-md mx-auto">
            <CountdownTimer targetDate={invitation.event_date} themeStyle="royal" />
          </div>
        )}
      </header>

      {/* 2. BRIDE & GROOM */}
      <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto relative z-10">
        <div className="mb-16 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A050] font-cinzel font-bold">Sang Pinanganten Kekalih</p>
          <h2 className="text-4xl sm:text-5xl font-cinzel font-normal text-[#F7EFE3]">Kedua Mempelai</h2>
          <p className="text-xs text-[#C9A050]/80 max-w-md mx-auto italic font-serif pt-1">
            Nyuwun lumunturing sih donga pangestu saking para sesepuh saha para rawuh ingkang kinurmatan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          <div className="space-y-6 text-center">
            <div className="w-52 sm:w-60 aspect-[4/5] mx-auto rounded-xl overflow-hidden border border-[#C9A050]/60 p-1.5 bg-[#1A1008] shadow-xl">
              <img src={content.groom_photo || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80'} alt={content.groom_name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#C9A050] font-cinzel block">Mempelai Kakung</span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#F7EFE3]">{content.groom_name}</h3>
              <p className="text-xs text-[#F7EFE3]/80 font-serif leading-relaxed">
                Putra kinasih saking Bapak <span className="text-[#C9A050] font-medium">{content.groom_father}</span> <br />
                saha Ibu <span className="text-[#C9A050] font-medium">{content.groom_mother}</span>
              </p>
              {content.groom_instagram && (
                <a href={`https://instagram.com/${content.groom_instagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#C9A050] hover:underline pt-2 font-medium">
                  <InstagramIcon className="w-3.5 h-3.5" /><span>@{content.groom_instagram}</span>
                </a>
              )}
            </div>
          </div>

          <div className="space-y-6 text-center">
            <div className="w-52 sm:w-60 aspect-[4/5] mx-auto rounded-xl overflow-hidden border border-[#C9A050]/60 p-1.5 bg-[#1A1008] shadow-xl">
              <img src={content.bride_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'} alt={content.bride_name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#C9A050] font-cinzel block">Mempelai Putri</span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#F7EFE3]">{content.bride_name}</h3>
              <p className="text-xs text-[#F7EFE3]/80 font-serif leading-relaxed">
                Putri kinasih saking Bapak <span className="text-[#C9A050] font-medium">{content.bride_father}</span> <br />
                saha Ibu <span className="text-[#C9A050] font-medium">{content.bride_mother}</span>
              </p>
              {content.bride_instagram && (
                <a href={`https://instagram.com/${content.bride_instagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#C9A050] hover:underline pt-2 font-medium">
                  <InstagramIcon className="w-3.5 h-3.5" /><span>@{content.bride_instagram}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVENT SCHEDULE */}
      {content.events && content.events.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto bg-[#160E07]/80 relative z-10">
          <div className="mb-16 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A050] font-cinzel font-bold">Tata Adicara Pahargyan</p>
            <h2 className="text-4xl sm:text-5xl font-cinzel font-normal text-[#F7EFE3]">Rangkaian Acara Sakral</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.events.map((ev, idx) => (
              <div key={ev.id || idx} className="bg-[#1C120A] rounded-2xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between space-y-6 text-center border border-[#C9A050]/30">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-[#C9A050] font-cinzel font-bold block">{ev.title}</span>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 font-cinzel text-xl text-[#F7EFE3] font-bold">
                      <Calendar className="w-4 h-4 text-[#C9A050]" />
                      <span>{new Date(ev.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-[#C9A050] font-serif font-bold">
                      <Clock className="w-3.5 h-3.5" /><span>{ev.startTime} — {ev.endTime || 'Selesai'} {ev.timezone || 'WIB'}</span>
                    </div>
                    <div className="pt-3 space-y-1">
                      <div className="flex items-center justify-center gap-1.5 text-sm font-cinzel font-bold text-[#F7EFE3]">
                        <MapPin className="w-4 h-4 text-[#C9A050]" /><span>{ev.venueName}</span>
                      </div>
                      <p className="text-xs text-[#F7EFE3]/70 max-w-sm mx-auto font-serif">{ev.address}</p>
                    </div>
                    {ev.notes && <p className="text-xs text-[#C9A050] italic pt-2 font-serif">* {ev.notes}</p>}
                  </div>
                </div>
                {ev.mapsUrl && (
                  <div className="pt-2">
                    <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-cinzel font-bold text-[#C9A050] hover:underline">
                      <MapPin className="w-3.5 h-3.5" /><span>Panduan Lokasi (Google Maps)</span><ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. LOVE STORY */}
      {content.love_stories && content.love_stories.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10">
          <div className="mb-16 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A050] font-cinzel font-bold">Serat Lampah Tresna</p>
            <h2 className="text-4xl sm:text-5xl font-cinzel font-normal text-[#F7EFE3]">Lelampahan Kasih</h2>
          </div>
          <div className="space-y-12">
            {content.love_stories.map((st, idx) => (
              <div key={st.id || idx} className="text-center space-y-2 max-w-xl mx-auto">
                <span className="font-cinzel text-xl text-[#C9A050] font-bold block">Tahun {st.year} — {st.title}</span>
                <p className="font-serif italic text-sm sm:text-base text-[#F7EFE3]/80 leading-relaxed">&ldquo;{st.story}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PHOTO GALLERY */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto relative z-10">
          <div className="mb-14 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A050] font-cinzel font-bold">Pasarean Foto</p>
            <h2 className="text-4xl sm:text-5xl font-cinzel font-normal text-[#F7EFE3]">Galeri Momen Sakral</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {invitation.gallery.map((img, idx) => (
              <div key={img.id || idx} onClick={() => setActivePhoto(img.image_url)} className="group aspect-[4/5] rounded-xl overflow-hidden bg-[#1A1008] border border-[#C9A050]/40 shadow-xl cursor-pointer relative">
                <img src={img.image_url} alt={img.caption || `Galeri Foto ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
          {activePhoto && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer" onClick={() => setActivePhoto(null)}>
              <div className="max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl p-2 bg-[#1C120A] border border-[#C9A050]">
                <img src={activePhoto} alt="Enlarged" className="w-full h-auto max-h-[85vh] object-contain rounded-xl" />
              </div>
            </div>
          )}
        </section>
      )}

      {/* 6. WEDDING GIFT */}
      {content.bank_accounts && content.bank_accounts.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10">
          <GiftSection bankAccounts={content.bank_accounts} themeStyle="royal" />
        </section>
      )}

      {/* 7. RSVP */}
      <section className="py-24 px-6 sm:px-12 max-w-2xl mx-auto bg-[#160E07]/80 rounded-2xl relative z-10">
        <RsvpSection invitationId={invitation.id} initialGuestName={guestName} themeStyle="royal" />
      </section>

      {/* 8. WISHES */}
      <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10">
        <WishesSection invitationId={invitation.id} wishes={invitation.wishes || []} initialSenderName={guestName} themeStyle="royal" />
      </section>

      {/* 9. FOOTER */}
      <footer className="py-20 px-6 text-center text-[#C9A050] text-xs space-y-2 relative z-10">
        <p className="font-cinzel text-xl text-[#F7EFE3] tracking-widest font-bold">
          {content.groom_nickname} &amp; {content.bride_nickname}
        </p>
        <p className="font-serif italic text-[#F7EFE3]/80">
          Maturnuwun Sanget Awit Kawigatosan Saha Donga Pangestunipun Sedaya
        </p>
      </footer>
    </article>
  );
}
