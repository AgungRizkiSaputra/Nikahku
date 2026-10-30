'use client';

import React, { useState } from 'react';
import { RsvpAttendance } from '@/types';
import { storageAdapter } from '@/lib/storage/storage-adapter';
import { CheckCircle2, Send, Users, HelpCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RsvpSectionProps {
  invitationId: string;
  initialGuestName?: string;
  themeStyle?: 'editorial' | 'botanical' | 'royal' | 'celestial';
  onSubmitted?: () => void;
}

export default function RsvpSection({
  invitationId,
  initialGuestName = '',
  themeStyle = 'editorial',
  onSubmitted,
}: RsvpSectionProps) {
  const [guestName, setGuestName] = useState(initialGuestName);
  const [attendance, setAttendance] = useState<RsvpAttendance>('attending');
  const [guestCount, setGuestCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setIsSubmitting(true);
    try {
      await storageAdapter.submitRSVP({
        invitation_id: invitationId,
        guest_name: guestName.trim(),
        attendance,
        guest_count: attendance === 'attending' ? Number(guestCount) : 0,
        notes: notes.trim(),
      });

      if (attendance === 'attending') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }

      setSubmitted(true);
      if (onSubmitted) onSubmitted();
    } catch (err) {
      console.error('Error submitting RSVP:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getThemeClasses = () => {
    switch (themeStyle) {
      case 'botanical':
        return {
          badge: 'bg-[#E8EFE9] text-[#2C4233] border-[#CCDCD0]',
          heading: 'font-cormorant text-[#1B291E]',
          desc: 'text-[#3E5C46]',
          card: 'bg-[#FAF8F5] border-2 border-[#D5E1D8]',
          input: 'border-[#CCDCD0] bg-white text-[#1B291E] focus:ring-emerald-500/30',
          btnSubmit: 'bg-[#2C4233] hover:bg-[#1E3024] text-white',
        };
      case 'royal':
        return {
          badge: 'bg-[#24170E] text-[#D4AF37] border-[#D4AF37]/40',
          heading: 'font-cinzel text-[#F5EDE0]',
          desc: 'text-[#D4AF37]/80 font-serif',
          card: 'bg-[#1C120A] border-2 border-[#D4AF37]/50',
          input: 'border-[#D4AF37]/40 bg-[#24170E] text-[#F5EDE0] focus:ring-amber-500/30',
          btnSubmit: 'bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-[#120B06] font-cinzel font-bold',
        };
      case 'celestial':
        return {
          badge: 'bg-slate-900 border border-sky-400/40 text-[#E6C687]',
          heading: 'font-playfair text-white',
          desc: 'text-slate-300 font-outfit',
          card: 'bg-white/[0.04] border border-sky-400/30 backdrop-blur-xl',
          input: 'border-sky-400/30 bg-slate-900/80 text-white focus:ring-sky-400/30',
          btnSubmit: 'bg-[#E6C687] hover:bg-[#F3D99C] text-slate-950 font-outfit font-bold',
        };
      case 'editorial':
      default:
        return {
          badge: 'bg-[#F2EEE7] text-[#947141] border-[#E2DDD3] font-mono',
          heading: 'font-bodoni text-[#181B19]',
          desc: 'text-stone-600 font-mono',
          card: 'bg-white border border-[#E2DDD3]',
          input: 'border-[#E2DDD3] bg-[#FAF7F2] text-[#181B19] focus:ring-stone-400/30 font-mono',
          btnSubmit: 'bg-[#181B19] hover:bg-[#947141] text-white font-mono',
        };
    }
  };

  const st = getThemeClasses();

  return (
    <section className="text-center max-w-lg mx-auto">
      <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border ${st.badge} mb-3`}>
        <Users className="w-3.5 h-3.5" />
        <span>Konfirmasi Kehadiran</span>
      </div>
      <h3 className={`text-3xl sm:text-4xl font-normal mb-2 ${st.heading}`}>RSVP Kehadiran</h3>
      <p className={`text-xs sm:text-sm mb-8 ${st.desc}`}>
        Bantu kami mempersiapkan jamuan terbaik dengan mengonfirmasi kehadiran Anda melalui form di bawah ini.
      </p>

      {submitted ? (
        <div className={`p-6 rounded-2xl ${st.card} text-center`}>
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h4 className={`text-lg font-bold mb-1 ${st.heading}`}>
            Terima Kasih atas Konfirmasi Anda!
          </h4>
          <p className={`text-xs ${st.desc}`}>
            Respon kehadiran Anda telah tersimpan dengan aman ke dalam sistem daftar tamu.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 text-xs font-semibold underline cursor-pointer opacity-80 hover:opacity-100"
          >
            Ubah Tanggapan
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`p-6 sm:p-8 rounded-2xl ${st.card} text-left space-y-4 shadow-sm`}
        >
          <div>
            <label className="block text-xs font-semibold mb-1 opacity-90">
              Nama Lengkap Tamu
            </label>
            <input
              type="text"
              required
              placeholder="Masukkan nama Anda..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${st.input}`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 opacity-90">
              Apakah Anda Berkenan Hadir?
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAttendance('attending')}
                className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition cursor-pointer ${
                  attendance === 'attending'
                    ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Hadir</span>
              </button>

              <button
                type="button"
                onClick={() => setAttendance('not_attending')}
                className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition cursor-pointer ${
                  attendance === 'not_attending'
                    ? 'bg-rose-600 text-white border-rose-600 font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <XCircle className="w-4 h-4" />
                <span>Berhalangan</span>
              </button>

              <button
                type="button"
                onClick={() => setAttendance('uncertain')}
                className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition cursor-pointer ${
                  attendance === 'uncertain'
                    ? 'bg-amber-600 text-white border-amber-600 font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Masih Ragu</span>
              </button>
            </div>
          </div>

          {attendance === 'attending' && (
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-90">
                Jumlah Tamu yang Hadir
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${st.input}`}
              >
                <option value={1}>1 Orang</option>
                <option value={2}>2 Orang</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4 Orang</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-90">
              Catatan / Pesan Singkat (Opsional)
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Kami hadir saat resepsi..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${st.input}`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer font-bold ${st.btnSubmit}`}
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}</span>
          </button>
        </form>
      )}
    </section>
  );
}
