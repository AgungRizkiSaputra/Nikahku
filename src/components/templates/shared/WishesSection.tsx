'use client';

import React, { useState, useEffect } from 'react';
import { Wish } from '@/types';
import { storageAdapter } from '@/lib/storage/storage-adapter';
import { MessageSquareHeart, Send, Clock } from 'lucide-react';

interface WishesSectionProps {
  invitationId: string;
  wishes?: Wish[];
  initialSenderName?: string;
  themeStyle?: 'editorial' | 'botanical' | 'royal' | 'celestial';
}

export default function WishesSection({
  invitationId,
  wishes = [],
  initialSenderName = '',
  themeStyle = 'editorial',
}: WishesSectionProps) {
  const [extraWishes, setExtraWishes] = useState<Wish[]>([]);
  const [senderName, setSenderName] = useState(initialSenderName);
  const [relationship, setRelationship] = useState('Teman / Sahabat');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wishesList = [...extraWishes, ...wishes];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const newWish = await storageAdapter.submitWish({
        invitation_id: invitationId,
        sender_name: senderName.trim(),
        relationship,
        message: message.trim(),
        is_approved: true,
      });

      setExtraWishes((prev) => [newWish, ...prev]);
      setMessage('');
    } catch (err) {
      console.error('Error submitting wish:', err);
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
          itemCard: 'bg-white border border-[#D5E1D8]',
          avatar: 'bg-[#E8EFE9] text-[#2C4233]',
          name: 'text-[#1B291E]',
          meta: 'text-[#3E5C46]',
          msg: 'text-[#1E2E22]',
        };
      case 'royal':
        return {
          badge: 'bg-[#24170E] text-[#D4AF37] border-[#D4AF37]/40',
          heading: 'font-cinzel text-[#F5EDE0]',
          desc: 'text-[#D4AF37]/80 font-serif',
          card: 'bg-[#1C120A] border-2 border-[#D4AF37]/50',
          input: 'border-[#D4AF37]/40 bg-[#24170E] text-[#F5EDE0] focus:ring-amber-500/30',
          btnSubmit: 'bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-[#120B06] font-cinzel font-bold',
          itemCard: 'bg-[#24170E] border border-[#D4AF37]/40',
          avatar: 'bg-[#D4AF37] text-[#120B06]',
          name: 'text-[#F5EDE0] font-cinzel',
          meta: 'text-[#D4AF37]',
          msg: 'text-[#F5EDE0]/90 font-serif',
        };
      case 'celestial':
        return {
          badge: 'bg-slate-900 border border-sky-400/40 text-[#E6C687]',
          heading: 'font-playfair text-white',
          desc: 'text-slate-300 font-outfit',
          card: 'bg-white/[0.04] border border-sky-400/30 backdrop-blur-xl',
          input: 'border-sky-400/30 bg-slate-900/80 text-white focus:ring-sky-400/30',
          btnSubmit: 'bg-[#E6C687] hover:bg-[#F3D99C] text-slate-950 font-outfit font-bold',
          itemCard: 'bg-white/[0.03] border border-white/10 backdrop-blur-md',
          avatar: 'bg-slate-800 text-[#E6C687] border border-sky-400/30',
          name: 'text-white font-outfit',
          meta: 'text-sky-300 font-outfit',
          msg: 'text-slate-200 font-outfit',
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
          itemCard: 'bg-white border border-[#E2DDD3]',
          avatar: 'bg-[#F2EEE7] text-[#181B19] font-mono',
          name: 'text-[#181B19] font-bodoni font-bold',
          meta: 'text-[#947141] font-mono',
          msg: 'text-stone-700 font-serif',
        };
    }
  };

  const st = getThemeClasses();

  return (
    <section className="text-center max-w-xl mx-auto">
      <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border ${st.badge} mb-3`}>
        <MessageSquareHeart className="w-3.5 h-3.5" />
        <span>Ucapan &amp; Doa Restu</span>
      </div>
      <h3 className={`text-3xl sm:text-4xl font-normal mb-2 ${st.heading}`}>Papan Harapan &amp; Doa</h3>
      <p className={`text-xs sm:text-sm mb-8 ${st.desc}`}>
        Tinggalkan untaian doa dan harapan terbaik Anda untuk kedua mempelai di lembaran kenangan ini.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className={`p-6 sm:p-8 rounded-2xl ${st.card} text-left space-y-4 shadow-sm mb-8`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold mb-1 opacity-90">
              Nama Pengirim
            </label>
            <input
              type="text"
              required
              placeholder="Nama lengkap Anda..."
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${st.input}`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-90">
              Hubungan / Relasi
            </label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${st.input}`}
            >
              <option value="Teman / Sahabat">Teman / Sahabat</option>
              <option value="Keluarga Besar">Keluarga Besar</option>
              <option value="Rekan Kerja">Rekan Kerja</option>
              <option value="Sahabat Sekolah / Kuliah">Sahabat Sekolah / Kuliah</option>
              <option value="Tamu Undangan">Tamu Undangan</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 opacity-90">
            Untaian Doa &amp; Pesan
          </label>
          <textarea
            rows={3}
            required
            placeholder="Tuliskan doa restu yang tulus..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${st.input}`}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer font-bold ${st.btnSubmit}`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSubmitting ? 'Mengirim Doa...' : 'Kirim Doa Restu'}</span>
        </button>
      </form>

      {/* Wishes Stream Feed */}
      <div className="space-y-3.5 text-left max-h-[440px] overflow-y-auto pr-1">
        {wishesList.length === 0 ? (
          <div className={`p-8 text-center text-xs opacity-75 italic rounded-2xl border ${st.itemCard}`}>
            Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
          </div>
        ) : (
          wishesList.map((w) => (
            <div
              key={w.id}
              className={`p-4 sm:p-5 rounded-2xl ${st.itemCard} shadow-sm space-y-2`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${st.avatar}`}>
                    {w.sender_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className={`text-xs block ${st.name}`}>
                      {w.sender_name}
                    </span>
                    <span className={`text-[10px] ${st.meta}`}>
                      {w.relationship}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] opacity-60">
                  <Clock className="w-3 h-3" />
                  <span>
                    {new Date(w.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
              </div>

              <p className={`text-xs leading-relaxed italic pl-10 ${st.msg}`}>
                &ldquo;{w.message}&rdquo;
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
