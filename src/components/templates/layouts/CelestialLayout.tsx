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

export default function CelestialLayout({ invitation, guestName }: LayoutProps) {
  const content = invitation.content;
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  if (!content) return null;

  return (
    <article className="min-h-screen bg-[#060913] text-[#F8FAFC] font-sans antialiased selection:bg-[#DFC180] selection:text-black relative overflow-x-hidden">
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
              ? new Date(invitation.event_date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : 'Save The Date'}
          </p>
        </div>

        {/* Starlight Framed Portrait */}
        <div className="pt-4 max-w-xs sm:max-w-sm mx-auto">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900/80 border border-sky-400/30 p-2 shadow-2xl shadow-sky-950/80">
            <img
              src={
                content.groom_photo ||
                content.bride_photo ||
                'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&auto=format&fit=crop&q=80'
              }
              alt="Mempelai"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Celestial Quote */}
        {content.quote && (
          <div className="pt-8 max-w-lg mx-auto">
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

      {/* 2. BRIDE & GROOM: Celestial Portraits */}
      <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto relative z-10">
        <div className="mb-16 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-[#DFC180] font-outfit font-bold">
            The Lovers
          </p>
          <h2 className="text-4xl sm:text-5xl font-playfair font-normal text-white">
            Kedua Mempelai
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto font-outfit pt-1">
            Dua insan yang dipersatukan dalam keindahan takdir yang tak bertepi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {/* Groom */}
          <div className="text-center space-y-6">
            <div className="w-52 sm:w-60 aspect-[4/5] mx-auto rounded-2xl overflow-hidden border border-sky-400/30 p-1.5 bg-slate-900 shadow-xl">
              <img
                src={
                  content.groom_photo ||
                  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80'
                }
                alt={content.groom_name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#DFC180] font-outfit block">
                The Groom
              </span>
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                {content.groom_name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-outfit">
                Putra dari Pasangan <br />
                <span className="text-slate-200">{content.groom_father} &amp; {content.groom_mother}</span>
              </p>
              {content.groom_instagram && (
                <a
                  href={`https://instagram.com/${content.groom_instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#DFC180] hover:underline pt-2 font-outfit"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@{content.groom_instagram}</span>
                </a>
              )}
            </div>
          </div>

          {/* Bride */}
          <div className="text-center space-y-6">
            <div className="w-52 sm:w-60 aspect-[4/5] mx-auto rounded-2xl overflow-hidden border border-sky-400/30 p-1.5 bg-slate-900 shadow-xl">
              <img
                src={
                  content.bride_photo ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
                }
                alt={content.bride_name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#DFC180] font-outfit block">
                The Bride
              </span>
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                {content.bride_name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-outfit">
                Putri dari Pasangan <br />
                <span className="text-slate-200">{content.bride_father} &amp; {content.bride_mother}</span>
              </p>
              {content.bride_instagram && (
                <a
                  href={`https://instagram.com/${content.bride_instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#DFC180] hover:underline pt-2 font-outfit"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@{content.bride_instagram}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVENT SCHEDULE: Gala Itinerary */}
      {content.events && content.events.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto bg-slate-950/80 relative z-10">
          <div className="mb-16 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-[#DFC180] font-outfit font-bold">
              Gala Itinerary
            </p>
            <h2 className="text-4xl sm:text-5xl font-playfair font-normal text-white">
              Rangkaian Perayaan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.events.map((ev, idx) => (
              <div
                key={ev.id || idx}
                className="bg-slate-900/90 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between space-y-6 text-center border border-white/10"
              >
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-[#DFC180] font-outfit font-bold block">
                    {ev.title}
                  </span>

                  <div className="space-y-3 font-outfit text-slate-200">
                    <div className="flex items-center justify-center gap-2 font-playfair text-xl text-white font-bold">
                      <Calendar className="w-4 h-4 text-[#DFC180]" />
                      <span>
                        {new Date(ev.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-[#DFC180] font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {ev.startTime} — {ev.endTime || 'Selesai'} {ev.timezone || 'WIB'}
                      </span>
                    </div>

                    <div className="pt-3 space-y-1">
                      <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-white">
                        <MapPin className="w-4 h-4 text-[#DFC180]" />
                        <span>{ev.venueName}</span>
                      </div>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        {ev.address}
                      </p>
                    </div>

                    {ev.notes && (
                      <p className="text-xs text-[#DFC180] italic pt-2">
                        * {ev.notes}
                      </p>
                    )}
                  </div>
                </div>

                {ev.mapsUrl && (
                  <div className="pt-2">
                    <a
                      href={ev.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-outfit font-bold text-[#DFC180] hover:underline"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Buka Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. LOVE STORY: Constellation Story */}
      {content.love_stories && content.love_stories.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10">
          <div className="mb-16 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-[#DFC180] font-outfit font-bold">
              Written In The Stars
            </p>
            <h2 className="text-4xl sm:text-5xl font-playfair font-normal text-white">
              Perjalanan Kasih
            </h2>
          </div>

          <div className="space-y-12">
            {content.love_stories.map((st, idx) => (
              <div key={st.id || idx} className="text-center space-y-2 max-w-xl mx-auto">
                <span className="font-playfair text-xl text-[#DFC180] font-bold block">
                  {st.year} — {st.title}
                </span>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-outfit italic">
                  &ldquo;{st.story}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PHOTO GALLERY: Starlight Moments */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto relative z-10">
          <div className="mb-14 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-[#DFC180] font-outfit font-bold">
              Gallery
            </p>
            <h2 className="text-4xl sm:text-5xl font-playfair font-normal text-white">
              Galeri Kenangan
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {invitation.gallery.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => setActivePhoto(img.image_url)}
                className="group aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl cursor-pointer relative"
              >
                <img
                  src={img.image_url}
                  alt={img.caption || `Galeri Foto ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          {activePhoto && (
            <div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setActivePhoto(null)}
            >
              <div className="max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl p-2 bg-slate-900 border border-sky-400/40">
                <img
                  src={activePhoto}
                  alt="Enlarged"
                  className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
                />
              </div>
            </div>
          )}
        </section>
      )}

      {/* 6. WEDDING GIFT SECTION */}
      {content.bank_accounts && content.bank_accounts.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10">
          <GiftSection
            bankAccounts={content.bank_accounts}
            themeStyle="celestial"
          />
        </section>
      )}

      {/* 7. RSVP FORM */}
      <section className="py-24 px-6 sm:px-12 max-w-2xl mx-auto bg-slate-950/80 rounded-3xl relative z-10">
        <RsvpSection
          invitationId={invitation.id}
          initialGuestName={guestName}
          themeStyle="celestial"
        />
      </section>

      {/* 8. WISHES WALL */}
      <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10">
        <WishesSection
          invitationId={invitation.id}
          wishes={invitation.wishes || []}
          initialSenderName={guestName}
          themeStyle="celestial"
        />
      </section>

      {/* 9. CELESTIAL FOOTER */}
      <footer className="py-20 px-6 text-center text-slate-400 text-xs space-y-2 relative z-10 font-outfit">
        <p className="font-playfair text-xl text-white font-bold">
          {content.groom_nickname} &amp; {content.bride_nickname}
        </p>
        <p className="text-slate-400">With Eternal Love &amp; Boundless Gratitude</p>
      </footer>
    </article>
  );
}
