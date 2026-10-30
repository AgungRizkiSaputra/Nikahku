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
  Leaf,
  Flower2,
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';

interface LayoutProps {
  invitation: Invitation;
  guestName?: string;
}

export default function BotanicalLayout({ invitation, guestName }: LayoutProps) {
  const content = invitation.content;
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  if (!content) return null;

  return (
    <article className="min-h-screen bg-[#FBF8F3] text-[#1E2D20] font-sans antialiased selection:bg-[#2C4233] selection:text-white">
      {/* 1. BOTANICAL GARDEN HEADER */}
      <header className="pt-24 pb-20 px-6 sm:px-12 max-w-4xl mx-auto text-center space-y-6">
        <div className="space-y-4">
          <p className="font-script text-4xl text-[#3E5C46]">
            The Garden Wedding of
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-cormorant font-normal text-[#1B291E] tracking-normal leading-[1.05]">
            {content.groom_nickname} <span className="italic font-light text-[#3E5C46]">&amp;</span> {content.bride_nickname}
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#3E5C46] font-semibold pt-1">
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

        {/* Botanical Arch Frame Photo */}
        <div className="pt-6 max-w-xs sm:max-w-sm mx-auto">
          <div className="aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden bg-white p-3 shadow-md shadow-stone-300/30">
            <img
              src={
                content.groom_photo ||
                content.bride_photo ||
                'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80'
              }
              alt="Mempelai"
              className="w-full h-full object-cover rounded-t-full rounded-b-2xl"
            />
          </div>
        </div>

        {/* Romantic Quote */}
        {content.quote && (
          <div className="pt-8 max-w-xl mx-auto">
            <p className="font-cormorant italic text-lg sm:text-2xl text-[#1E2D20] leading-relaxed">
              &ldquo;{content.quote}&rdquo;
            </p>
            {content.quote_source && (
              <span className="block mt-3 text-xs uppercase tracking-widest text-[#3E5C46] font-semibold">
                — {content.quote_source}
              </span>
            )}
          </div>
        )}

        {invitation.event_date && (
          <div className="pt-6 max-w-md mx-auto">
            <CountdownTimer targetDate={invitation.event_date} themeStyle="botanical" />
          </div>
        )}
      </header>

      {/* 2. BRIDE & GROOM: Twin Arched Portraits */}
      <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto">
        <div className="mb-16 text-center space-y-2">
          <p className="font-script text-3xl text-[#3E5C46]">With Joyful Hearts</p>
          <h2 className="text-4xl sm:text-5xl font-cormorant font-normal text-[#1B291E]">
            Kedua Mempelai
          </h2>
          <p className="text-xs text-[#3E5C46] max-w-md mx-auto pt-1 leading-relaxed">
            Memohon doa restu Bapak/Ibu/Saudara/i sekalian dalam menyatukan kasih suci kami di hadapan Tuhan dan keluarga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {/* Groom Arched Frame */}
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="w-56 sm:w-64 aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden bg-white p-2.5 shadow-md shadow-stone-300/30">
              <img
                src={
                  content.groom_photo ||
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80'
                }
                alt={content.groom_name}
                className="w-full h-full object-cover rounded-t-full rounded-b-2xl"
              />
            </div>

            <div className="space-y-1.5 max-w-xs">
              <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1B291E]">
                {content.groom_name}
              </h3>
              <p className="text-xs text-[#3E5C46] leading-relaxed font-serif">
                Putra dari Pasangan <br />
                <span className="font-semibold text-[#1B291E]">{content.groom_father}</span> &amp; <span className="font-semibold text-[#1B291E]">{content.groom_mother}</span>
              </p>
              {content.groom_instagram && (
                <a
                  href={`https://instagram.com/${content.groom_instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#3E5C46] hover:text-[#1B291E] font-medium pt-1"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@{content.groom_instagram}</span>
                </a>
              )}
            </div>
          </div>

          {/* Bride Arched Frame */}
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="w-56 sm:w-64 aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden bg-white p-2.5 shadow-md shadow-stone-300/30">
              <img
                src={
                  content.bride_photo ||
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80'
                }
                alt={content.bride_name}
                className="w-full h-full object-cover rounded-t-full rounded-b-2xl"
              />
            </div>

            <div className="space-y-1.5 max-w-xs">
              <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1B291E]">
                {content.bride_name}
              </h3>
              <p className="text-xs text-[#3E5C46] leading-relaxed font-serif">
                Putri dari Pasangan <br />
                <span className="font-semibold text-[#1B291E]">{content.bride_father}</span> &amp; <span className="font-semibold text-[#1B291E]">{content.bride_mother}</span>
              </p>
              {content.bride_instagram && (
                <a
                  href={`https://instagram.com/${content.bride_instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#3E5C46] hover:text-[#1B291E] font-medium pt-1"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@{content.bride_instagram}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVENT SCHEDULE: Garden Conservatory Sessions */}
      {content.events && content.events.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto bg-[#F2EDE4]/70">
          <div className="mb-16 text-center space-y-2">
            <p className="font-script text-3xl text-[#3E5C46]">Save The Date</p>
            <h2 className="text-4xl sm:text-5xl font-cormorant font-normal text-[#1B291E]">
              Agenda Pernikahan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.events.map((ev, idx) => (
              <div
                key={ev.id || idx}
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-6 text-center"
              >
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-[#3E5C46] font-semibold block">
                    {ev.title}
                  </span>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 font-cormorant text-2xl font-bold text-[#1B291E]">
                      <Calendar className="w-4 h-4 text-[#3E5C46]" />
                      <span>
                        {new Date(ev.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-[#3E5C46] font-medium font-serif">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {ev.startTime} — {ev.endTime || 'Selesai'} {ev.timezone || 'WIB'}
                      </span>
                    </div>

                    <div className="pt-3 space-y-1">
                      <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-[#1B291E]">
                        <MapPin className="w-4 h-4 text-[#3E5C46]" />
                        <span>{ev.venueName}</span>
                      </div>
                      <p className="text-xs text-[#4F6854] max-w-sm mx-auto">
                        {ev.address}
                      </p>
                    </div>

                    {ev.notes && (
                      <p className="text-xs text-[#3E5C46] italic pt-2 font-serif">
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
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#2C4233] hover:underline"
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

      {/* 4. LOVE STORY: Romantic Narrative */}
      {content.love_stories && content.love_stories.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto">
          <div className="mb-16 text-center space-y-2">
            <p className="font-script text-3xl text-[#3E5C46]">Our Journey</p>
            <h2 className="text-4xl sm:text-5xl font-cormorant font-normal text-[#1B291E]">
              Kisah Kasih Kami
            </h2>
          </div>

          <div className="space-y-12">
            {content.love_stories.map((st, idx) => (
              <div key={st.id || idx} className="text-center space-y-2 max-w-xl mx-auto">
                <span className="font-cormorant text-2xl text-[#3E5C46] font-semibold block">
                  {st.year} — {st.title}
                </span>
                <p className="text-sm sm:text-base text-[#4F6854] leading-relaxed italic font-serif">
                  &ldquo;{st.story}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PHOTO GALLERY: Rounded Organic Flow */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
          <div className="mb-14 text-center space-y-2">
            <p className="font-script text-3xl text-[#3E5C46]">Sweet Moments</p>
            <h2 className="text-4xl sm:text-5xl font-cormorant font-normal text-[#1B291E]">
              Galeri Momen Kasih
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {invitation.gallery.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => setActivePhoto(img.image_url)}
                className="group aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-sm cursor-pointer relative"
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
              className="fixed inset-0 z-50 bg-[#1B291E]/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setActivePhoto(null)}
            >
              <div className="max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl p-2 bg-[#FBF8F3]">
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
        <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto">
          <GiftSection
            bankAccounts={content.bank_accounts}
            themeStyle="botanical"
          />
        </section>
      )}

      {/* 7. RSVP FORM */}
      <section className="py-24 px-6 sm:px-12 max-w-2xl mx-auto bg-[#F2EDE4]/70 rounded-3xl">
        <RsvpSection
          invitationId={invitation.id}
          initialGuestName={guestName}
          themeStyle="botanical"
        />
      </section>

      {/* 8. WISHES WALL */}
      <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto">
        <WishesSection
          invitationId={invitation.id}
          wishes={invitation.wishes || []}
          initialSenderName={guestName}
          themeStyle="botanical"
        />
      </section>

      {/* 9. BOTANICAL FOOTER */}
      <footer className="py-20 px-6 text-center text-[#3E5C46] text-xs space-y-2">
        <p className="font-script text-3xl text-[#1B291E]">
          {content.groom_nickname} &amp; {content.bride_nickname}
        </p>
        <p className="font-serif">Ungkapan Kasih &amp; Rasa Syukur Kami yang Terdalam</p>
      </footer>
    </article>
  );
}
