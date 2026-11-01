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
  Moon,
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';

interface LayoutProps {
  invitation: Invitation;
  guestName?: string;
}

function CelestialStars() {
  return (
    <>
      <style>{`
        @keyframes twinkle-1 { 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
        @keyframes twinkle-2 { 0%,100%{opacity:0.1;transform:scale(1)} 50%{opacity:0.45;transform:scale(1.2)} }
        @keyframes twinkle-3 { 0%,100%{opacity:0.08;transform:scale(1)} 50%{opacity:0.35;transform:scale(1.15)} }
        @keyframes shooting-star { 0%{transform:translateX(0) translateY(0) rotate(-45deg);opacity:0} 10%{opacity:0.8} 30%{opacity:0.4} 100%{transform:translateX(300px) translateY(300px) rotate(-45deg);opacity:0} }
        @keyframes nebula-drift { 0%,100%{transform:translate(0,0) scale(1);opacity:0.03} 50%{transform:translate(20px,-15px) scale(1.05);opacity:0.06} }
        .twinkle-1 { animation: twinkle-1 3s ease-in-out infinite; }
        .twinkle-2 { animation: twinkle-2 4s ease-in-out 1s infinite; }
        .twinkle-3 { animation: twinkle-3 5s ease-in-out 2s infinite; }
        .shooting-star { animation: shooting-star 6s ease-out 8s infinite; }
        .nebula-drift { animation: nebula-drift 15s ease-in-out infinite; }
        .nebula-drift-2 { animation: nebula-drift 20s ease-in-out 5s infinite; }
      `}</style>

      {/* Nebula clouds */}
      <div className="nebula-drift fixed top-[10%] left-[5%] w-96 h-96 rounded-full bg-indigo-600/5 blur-3xl pointer-events-none z-0" />
      <div className="nebula-drift-2 fixed top-[50%] right-[10%] w-80 h-80 rounded-full bg-purple-500/4 blur-3xl pointer-events-none z-0" />
      <div className="nebula-drift fixed bottom-[10%] left-[30%] w-72 h-72 rounded-full bg-sky-500/3 blur-3xl pointer-events-none z-0" style={{ animationDelay: '7s' }} />

      {/* Star field */}
      {[
        { top: '5%', left: '12%', size: 'w-1 h-1', cls: 'twinkle-1' },
        { top: '8%', left: '45%', size: 'w-0.5 h-0.5', cls: 'twinkle-2' },
        { top: '12%', left: '78%', size: 'w-1.5 h-1.5', cls: 'twinkle-3' },
        { top: '18%', left: '25%', size: 'w-0.5 h-0.5', cls: 'twinkle-1', delay: '0.5s' },
        { top: '22%', left: '90%', size: 'w-1 h-1', cls: 'twinkle-2', delay: '1.5s' },
        { top: '30%', left: '5%', size: 'w-1 h-1', cls: 'twinkle-3', delay: '0.8s' },
        { top: '35%', left: '60%', size: 'w-0.5 h-0.5', cls: 'twinkle-1', delay: '2s' },
        { top: '42%', left: '35%', size: 'w-1.5 h-1.5', cls: 'twinkle-2', delay: '3s' },
        { top: '48%', left: '82%', size: 'w-1 h-1', cls: 'twinkle-3', delay: '1s' },
        { top: '55%', left: '15%', size: 'w-0.5 h-0.5', cls: 'twinkle-1', delay: '4s' },
        { top: '62%', left: '70%', size: 'w-1 h-1', cls: 'twinkle-2', delay: '2.5s' },
        { top: '68%', left: '42%', size: 'w-1.5 h-1.5', cls: 'twinkle-3', delay: '1.8s' },
        { top: '75%', left: '88%', size: 'w-0.5 h-0.5', cls: 'twinkle-1', delay: '3.5s' },
        { top: '80%', left: '20%', size: 'w-1 h-1', cls: 'twinkle-2', delay: '0.3s' },
        { top: '85%', left: '55%', size: 'w-0.5 h-0.5', cls: 'twinkle-3', delay: '4.5s' },
        { top: '92%', left: '8%', size: 'w-1.5 h-1.5', cls: 'twinkle-1', delay: '2.2s' },
        { top: '95%', left: '75%', size: 'w-1 h-1', cls: 'twinkle-2', delay: '1.2s' },
      ].map((star, i) => (
        <div
          key={i}
          className={`${star.cls} fixed ${star.size} rounded-full bg-white pointer-events-none z-0`}
          style={{ top: star.top, left: star.left, animationDelay: star.delay || '0s' }}
        />
      ))}

      {/* Shooting star */}
      <div className="shooting-star fixed top-[15%] left-[20%] pointer-events-none z-0">
        <div className="w-16 h-[1px] bg-gradient-to-r from-white/60 to-transparent" />
      </div>

      {/* Constellation lines */}
      <svg className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="12" y1="5" x2="25" y2="18" stroke="white" strokeWidth="0.1" />
        <line x1="25" y1="18" x2="45" y2="8" stroke="white" strokeWidth="0.1" />
        <line x1="78" y1="12" x2="90" y2="22" stroke="white" strokeWidth="0.1" />
        <line x1="5" y1="30" x2="15" y2="42" stroke="white" strokeWidth="0.1" />
        <line x1="60" y1="35" x2="70" y2="48" stroke="white" strokeWidth="0.1" />
        <line x1="70" y1="48" x2="82" y2="42" stroke="white" strokeWidth="0.1" />
        <line x1="20" y1="62" x2="35" y2="68" stroke="white" strokeWidth="0.1" />
        <line x1="55" y1="75" x2="42" y2="68" stroke="white" strokeWidth="0.1" />
        <line x1="75" y1="80" x2="88" y2="75" stroke="white" strokeWidth="0.1" />
        <line x1="8" y1="85" x2="20" y2="92" stroke="white" strokeWidth="0.1" />
      </svg>
    </>
  );
}

export default function CelestialLayout({ invitation, guestName }: LayoutProps) {
  const content = invitation.content;
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  if (!content) return null;

  return (
    <article className="min-h-screen bg-[#060913] text-[#F8FAFC] font-sans antialiased selection:bg-[#DFC180] selection:text-black relative overflow-x-hidden">
      <CelestialStars />

      {/* 1. CELESTIAL NIGHT HEADER */}
      <header className="pt-28 pb-20 px-6 sm:px-12 max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-slate-900 border border-sky-400/30 flex items-center justify-center text-[#DFC180] shadow-lg shadow-sky-950">
            <Moon className="w-6 h-6" />
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#DFC180] font-outfit font-semibold block">
            Under The Starlight Celebration
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-playfair font-normal text-white tracking-wide leading-[1.05]">
            {content.groom_nickname} <span className="font-playfair italic text-[#DFC180]">&amp;</span> {content.bride_nickname}
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#DFC180] font-outfit font-semibold pt-1">
            {invitation.event_date
              ? new Date(invitation.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
              : 'Save The Date'}
          </p>
        </div>

        {/* Celestial ornamental divider */}
        <div className="max-w-xs mx-auto py-2">
          <svg viewBox="0 0 200 30" fill="none" className="w-full h-auto" aria-hidden="true">
            <line x1="0" y1="15" x2="70" y2="15" stroke="#DFC180" strokeWidth="0.4" opacity="0.3" />
            <line x1="130" y1="15" x2="200" y2="15" stroke="#DFC180" strokeWidth="0.4" opacity="0.3" />
            <circle cx="100" cy="15" r="5" stroke="#DFC180" strokeWidth="0.6" opacity="0.3" />
            <circle cx="100" cy="15" r="2" fill="#DFC180" opacity="0.4" />
            <circle cx="80" cy="15" r="1.5" fill="#DFC180" opacity="0.2" />
            <circle cx="120" cy="15" r="1.5" fill="#DFC180" opacity="0.2" />
            <circle cx="75" cy="10" r="0.8" fill="white" opacity="0.3" />
            <circle cx="125" cy="10" r="0.8" fill="white" opacity="0.3" />
            <circle cx="75" cy="20" r="0.8" fill="white" opacity="0.2" />
            <circle cx="125" cy="20" r="0.8" fill="white" opacity="0.2" />
          </svg>
        </div>

        {/* Quote */}
        {content.quote && (
          <div className="pt-4 max-w-lg mx-auto">
            <p className="font-playfair italic text-base sm:text-xl text-slate-300 leading-relaxed">
              &ldquo;{content.quote}&rdquo;
            </p>
            {content.quote_source && (
              <span className="block mt-3 text-xs uppercase tracking-widest text-[#DFC180] font-outfit font-bold">
                — {content.quote_source}
              </span>
            )}
          </div>
        )}

        {invitation.event_date && (
          <div className="pt-6 max-w-md mx-auto">
            <CountdownTimer targetDate={invitation.event_date} themeStyle="celestial" />
          </div>
        )}
      </header>

      {/* 2. BRIDE & GROOM */}
      <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto relative z-10">
        <div className="mb-16 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-[#DFC180] font-outfit font-bold">The Lovers</p>
          <h2 className="text-4xl sm:text-5xl font-playfair font-normal text-white">Kedua Mempelai</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto font-outfit pt-1">Dua insan yang dipersatukan dalam keindahan takdir yang tak bertepi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          <div className="text-center space-y-6">
            <div className="w-52 sm:w-60 aspect-[4/5] mx-auto rounded-2xl overflow-hidden border border-sky-400/30 p-1.5 bg-slate-900 shadow-xl">
              <img src={content.groom_photo || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80'} alt={content.groom_name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#DFC180] font-outfit block">The Groom</span>
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">{content.groom_name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-outfit">
                Putra dari Pasangan <br /><span className="text-slate-200">{content.groom_father} &amp; {content.groom_mother}</span>
              </p>
              {content.groom_instagram && (
                <a href={`https://instagram.com/${content.groom_instagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#DFC180] hover:underline pt-2 font-outfit">
                  <InstagramIcon className="w-3.5 h-3.5" /><span>@{content.groom_instagram}</span>
                </a>
              )}
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="w-52 sm:w-60 aspect-[4/5] mx-auto rounded-2xl overflow-hidden border border-sky-400/30 p-1.5 bg-slate-900 shadow-xl">
              <img src={content.bride_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'} alt={content.bride_name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#DFC180] font-outfit block">The Bride</span>
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">{content.bride_name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-outfit">
                Putri dari Pasangan <br /><span className="text-slate-200">{content.bride_father} &amp; {content.bride_mother}</span>
              </p>
              {content.bride_instagram && (
                <a href={`https://instagram.com/${content.bride_instagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#DFC180] hover:underline pt-2 font-outfit">
                  <InstagramIcon className="w-3.5 h-3.5" /><span>@{content.bride_instagram}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVENT SCHEDULE */}
      {content.events && content.events.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto bg-slate-950/80 relative z-10">
          <div className="mb-16 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-[#DFC180] font-outfit font-bold">Gala Itinerary</p>
            <h2 className="text-4xl sm:text-5xl font-playfair font-normal text-white">Rangkaian Perayaan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.events.map((ev, idx) => (
              <div key={ev.id || idx} className="bg-slate-900/90 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between space-y-6 text-center border border-white/10">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-[#DFC180] font-outfit font-bold block">{ev.title}</span>
                  <div className="space-y-3 font-outfit text-slate-200">
                    <div className="flex items-center justify-center gap-2 font-playfair text-xl text-white font-bold">
                      <Calendar className="w-4 h-4 text-[#DFC180]" />
                      <span>{new Date(ev.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-[#DFC180] font-bold">
                      <Clock className="w-3.5 h-3.5" /><span>{ev.startTime} — {ev.endTime || 'Selesai'} {ev.timezone || 'WIB'}</span>
                    </div>
                    <div className="pt-3 space-y-1">
                      <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-white">
                        <MapPin className="w-4 h-4 text-[#DFC180]" /><span>{ev.venueName}</span>
                      </div>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">{ev.address}</p>
                    </div>
                    {ev.notes && <p className="text-xs text-[#DFC180] italic pt-2">* {ev.notes}</p>}
                  </div>
                </div>
                {ev.mapsUrl && (
                  <div className="pt-2">
                    <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-outfit font-bold text-[#DFC180] hover:underline">
                      <MapPin className="w-3.5 h-3.5" /><span>Buka Google Maps</span><ExternalLink className="w-3 h-3" />
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
            <p className="text-xs uppercase tracking-[0.25em] text-[#DFC180] font-outfit font-bold">Written In The Stars</p>
            <h2 className="text-4xl sm:text-5xl font-playfair font-normal text-white">Perjalanan Kasih</h2>
          </div>
          <div className="space-y-12">
            {content.love_stories.map((st, idx) => (
              <div key={st.id || idx} className="text-center space-y-2 max-w-xl mx-auto">
                <span className="font-playfair text-xl text-[#DFC180] font-bold block">{st.year} — {st.title}</span>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-outfit italic">&ldquo;{st.story}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PHOTO GALLERY */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto relative z-10">
          <div className="mb-14 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-[#DFC180] font-outfit font-bold">Gallery</p>
            <h2 className="text-4xl sm:text-5xl font-playfair font-normal text-white">Galeri Kenangan</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {invitation.gallery.map((img, idx) => (
              <div key={img.id || idx} onClick={() => setActivePhoto(img.image_url)} className="group aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl cursor-pointer relative">
                <img src={img.image_url} alt={img.caption || `Galeri Foto ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
          {activePhoto && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer" onClick={() => setActivePhoto(null)}>
              <div className="max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl p-2 bg-slate-900 border border-sky-400/40">
                <img src={activePhoto} alt="Enlarged" className="w-full h-auto max-h-[85vh] object-contain rounded-2xl" />
              </div>
            </div>
          )}
        </section>
      )}

      {/* 6. WEDDING GIFT */}
      {content.bank_accounts && content.bank_accounts.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10">
          <GiftSection bankAccounts={content.bank_accounts} themeStyle="celestial" />
        </section>
      )}

      {/* 7. RSVP */}
      <section className="py-24 px-6 sm:px-12 max-w-2xl mx-auto bg-slate-950/80 rounded-3xl relative z-10">
        <RsvpSection invitationId={invitation.id} initialGuestName={guestName} themeStyle="celestial" />
      </section>

      {/* 8. WISHES */}
      <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10">
        <WishesSection invitationId={invitation.id} wishes={invitation.wishes || []} initialSenderName={guestName} themeStyle="celestial" />
      </section>

      {/* 9. FOOTER */}
      <footer className="py-20 px-6 text-center text-slate-400 text-xs space-y-2 relative z-10 font-outfit">
        <p className="font-playfair text-xl text-white font-bold">{content.groom_nickname} &amp; {content.bride_nickname}</p>
        <p className="text-slate-400">With Eternal Love &amp; Boundless Gratitude</p>
      </footer>
    </article>
  );
}
