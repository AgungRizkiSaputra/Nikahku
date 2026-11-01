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
  Quote,
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';

interface LayoutProps {
  invitation: Invitation;
  guestName?: string;
}

function EditorialOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 60" fill="none" className={className} aria-hidden="true">
      <path d="M0 30 Q50 0 100 30 Q150 60 200 30" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <path d="M0 30 Q50 60 100 30 Q150 0 200 30" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <circle cx="100" cy="30" r="3" fill="currentColor" opacity="0.25" />
      <circle cx="60" cy="22" r="1.5" fill="currentColor" opacity="0.15" />
      <circle cx="140" cy="38" r="1.5" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

export default function EditorialLayout({ invitation, guestName }: LayoutProps) {
  const content = invitation.content;
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  if (!content) return null;

  return (
    <article className="min-h-screen bg-[#FBF9F5] text-[#1F1E1B] font-sans antialiased selection:bg-[#9E7D47] selection:text-white relative overflow-hidden">
      {/* Animated floating golden particles */}
      <style>{`
        @keyframes editorial-float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.12; }
          50% { transform: translateY(-40px) rotate(8deg); opacity: 0.25; }
        }
        @keyframes editorial-drift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(15px, -20px); }
          66% { transform: translate(-10px, -10px); }
        }
        .editorial-particle { animation: editorial-float 8s ease-in-out infinite; }
        .editorial-particle-2 { animation: editorial-float 12s ease-in-out 2s infinite; }
        .editorial-particle-3 { animation: editorial-float 10s ease-in-out 4s infinite; }
        .editorial-ornament-drift { animation: editorial-drift 20s ease-in-out infinite; }
      `}</style>

      {/* Decorative corner flourishes */}
      <div className="fixed top-0 left-0 w-48 h-48 pointer-events-none z-0 opacity-[0.06]">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#9E7D47]">
          <path d="M0 0 C40 0 80 20 100 60 C120 100 100 160 60 180 C40 190 20 180 10 160 C0 140 10 120 30 110 C50 100 60 120 50 140" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        </svg>
      </div>
      <div className="fixed bottom-0 right-0 w-48 h-48 pointer-events-none z-0 opacity-[0.06] rotate-180">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#9E7D47]">
          <path d="M0 0 C40 0 80 20 100 60 C120 100 100 160 60 180 C40 190 20 180 10 160 C0 140 10 120 30 110 C50 100 60 120 50 140" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        </svg>
      </div>

      {/* Floating golden dots */}
      <div className="editorial-particle fixed top-[15%] left-[10%] w-2 h-2 rounded-full bg-[#9E7D47] pointer-events-none z-0" />
      <div className="editorial-particle-2 fixed top-[40%] right-[8%] w-3 h-3 rounded-full bg-[#9E7D47] pointer-events-none z-0" />
      <div className="editorial-particle-3 fixed top-[70%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#9E7D47] pointer-events-none z-0" />
      <div className="editorial-particle fixed bottom-[20%] right-[15%] w-2.5 h-2.5 rounded-full bg-[#9E7D47] pointer-events-none z-0" style={{ animationDelay: '3s' }} />

      {/* 1. EDITORIAL HERO */}
      <header className="pt-24 pb-20 px-6 sm:px-12 max-w-5xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9E7D47] font-medium">
            The Wedding Celebration
          </p>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bodoni font-normal tracking-tight leading-[0.92] text-[#141311]">
            {content.groom_nickname} <span className="italic font-light text-[#9E7D47]">&amp;</span><br />
            {content.bride_nickname}
          </h1>
          <p className="text-sm text-stone-600 font-serif pt-2">
            {invitation.event_date
              ? new Date(invitation.event_date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : 'Save The Date'}
          </p>
        </div>

        {/* Elegant ornamental divider */}
        <div className="editorial-ornament-drift max-w-xs mx-auto mb-10">
          <EditorialOrnament className="w-full h-auto text-[#9E7D47]" />
        </div>

        {/* Quote */}
        {content.quote && (
          <div className="max-w-2xl mx-auto text-center space-y-3 py-6">
            <Quote className="w-5 h-5 text-[#9E7D47] mx-auto opacity-70" />
            <p className="font-bodoni italic text-lg sm:text-xl text-stone-800 leading-relaxed">
              &ldquo;{content.quote}&rdquo;
            </p>
            {content.quote_source && (
              <span className="text-xs uppercase tracking-widest text-[#9E7D47] font-medium block">
                {content.quote_source}
              </span>
            )}
          </div>
        )}

        {invitation.event_date && (
          <div className="pt-6 max-w-md mx-auto">
            <CountdownTimer targetDate={invitation.event_date} themeStyle="editorial" />
          </div>
        )}
      </header>

      {/* 2. THE COUPLE */}
      <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-[#9E7D47] font-medium">
            The Couple
          </p>
          <h2 className="text-4xl sm:text-5xl font-bodoni font-normal text-[#141311]">
            Kedua Mempelai
          </h2>
          <p className="text-sm text-stone-600 max-w-md mx-auto pt-1 font-serif">
            Dengan penuh rasa syukur kepada Tuhan Yang Maha Esa, kami mempersembahkan ikrar suci pernikahan ini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          <div className="space-y-6 text-center">
            <div className="aspect-[3/4] max-w-sm mx-auto overflow-hidden bg-stone-200 shadow-sm">
              <img
                src={
                  content.groom_photo ||
                  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80'
                }
                alt={content.groom_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bodoni font-normal text-[#141311]">
                {content.groom_name}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-serif">
                Putra dari Pasangan <br />
                <span className="font-medium text-stone-900">{content.groom_father}</span> &amp; <span className="font-medium text-stone-900">{content.groom_mother}</span>
              </p>
              {content.groom_instagram && (
                <a
                  href={`https://instagram.com/${content.groom_instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#9E7D47] hover:underline pt-2 font-medium"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@{content.groom_instagram}</span>
                </a>
              )}
            </div>
          </div>

          <div className="space-y-6 text-center">
            <div className="aspect-[3/4] max-w-sm mx-auto overflow-hidden bg-stone-200 shadow-sm">
              <img
                src={
                  content.bride_photo ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
                }
                alt={content.bride_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bodoni font-normal text-[#141311]">
                {content.bride_name}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-serif">
                Putri dari Pasangan <br />
                <span className="font-medium text-stone-900">{content.bride_father}</span> &amp; <span className="font-medium text-stone-900">{content.bride_mother}</span>
              </p>
              {content.bride_instagram && (
                <a
                  href={`https://instagram.com/${content.bride_instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#9E7D47] hover:underline pt-2 font-medium"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@{content.bride_instagram}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVENT SCHEDULE */}
      {content.events && content.events.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto bg-[#F4EFEA]/60 relative z-10">
          <div className="text-center mb-16 space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9E7D47] font-medium">
              Celebration
            </p>
            <h2 className="text-4xl sm:text-5xl font-bodoni font-normal text-[#141311]">
              Rangkaian Acara
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.events.map((ev, idx) => (
              <div
                key={ev.id || idx}
                className="bg-white p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-[#9E7D47] font-semibold block">
                    {ev.title}
                  </span>
                  <div className="space-y-2 text-stone-800">
                    <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#141311]">
                      <Calendar className="w-4 h-4 text-[#9E7D47]" />
                      <span>
                        {new Date(ev.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-600 font-serif">
                      <Clock className="w-4 h-4 text-[#9E7D47]" />
                      <span>
                        {ev.startTime} — {ev.endTime || 'Selesai'} {ev.timezone || 'WIB'}
                      </span>
                    </div>
                    <div className="pt-3 space-y-1">
                      <div className="flex items-start gap-2 text-xs text-stone-700">
                        <MapPin className="w-4 h-4 text-[#9E7D47] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-stone-900">{ev.venueName}</p>
                          <p className="text-stone-500 pt-0.5">{ev.address}</p>
                        </div>
                      </div>
                    </div>
                    {ev.notes && (
                      <p className="text-xs text-[#9E7D47] italic pt-2 font-serif">
                        * {ev.notes}
                      </p>
                    )}
                  </div>
                </div>
                {ev.mapsUrl && (
                  <div className="pt-4">
                    <a
                      href={ev.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#141311] hover:text-[#9E7D47] font-bold"
                    >
                      <span>Panduan Lokasi (Google Maps)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
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
          <div className="text-center mb-16 space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9E7D47] font-medium">Our Journey</p>
            <h2 className="text-4xl sm:text-5xl font-bodoni font-normal text-[#141311]">Untaian Kisah Kasih</h2>
          </div>
          <div className="space-y-12">
            {content.love_stories.map((st, idx) => (
              <div key={st.id || idx} className="space-y-3">
                <div className="flex items-baseline gap-4">
                  <span className="text-2xl font-bodoni text-[#9E7D47] font-normal">{st.year}</span>
                  <h3 className="text-xl font-bodoni font-bold text-[#141311]">{st.title}</h3>
                </div>
                <p className="font-serif text-sm sm:text-base text-stone-700 leading-relaxed italic pl-10">
                  &ldquo;{st.story}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PHOTO GALLERY */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9E7D47] font-medium">Memories</p>
            <h2 className="text-4xl sm:text-5xl font-bodoni font-normal text-[#141311]">Galeri Kenangan</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {invitation.gallery.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => setActivePhoto(img.image_url)}
                className="group aspect-[3/4] overflow-hidden bg-stone-200 cursor-pointer relative shadow-sm"
              >
                <img
                  src={img.image_url}
                  alt={img.caption || `Foto Momen ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
          {activePhoto && (
            <div
              className="fixed inset-0 z-50 bg-[#141311]/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setActivePhoto(null)}
            >
              <div className="max-w-4xl max-h-[90vh] overflow-hidden p-2 bg-[#FBF9F5]">
                <img src={activePhoto} alt="Enlarged" className="w-full h-auto max-h-[85vh] object-contain" />
              </div>
            </div>
          )}
        </section>
      )}

      {/* 6. WEDDING GIFT */}
      {content.bank_accounts && content.bank_accounts.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10">
          <GiftSection bankAccounts={content.bank_accounts} themeStyle="editorial" />
        </section>
      )}

      {/* 7. RSVP */}
      <section className="py-24 px-6 sm:px-12 max-w-2xl mx-auto bg-[#F4EFEA]/60 relative z-10">
        <RsvpSection invitationId={invitation.id} initialGuestName={guestName} themeStyle="editorial" />
      </section>

      {/* 8. WISHES */}
      <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10">
        <WishesSection
          invitationId={invitation.id}
          wishes={invitation.wishes || []}
          initialSenderName={guestName}
          themeStyle="editorial"
        />
      </section>

      {/* 9. FOOTER */}
      <footer className="py-20 px-6 text-center text-stone-500 font-serif text-xs space-y-2 relative z-10">
        <EditorialOrnament className="w-32 h-auto text-[#9E7D47] mx-auto mb-4" />
        <p className="text-xl font-bodoni text-[#141311]">
          {content.groom_nickname} &amp; {content.bride_nickname}
        </p>
        <p className="text-stone-600">Dengan Penuh Rasa Syukur &amp; Cinta Kasih</p>
      </footer>
    </article>
  );
}
