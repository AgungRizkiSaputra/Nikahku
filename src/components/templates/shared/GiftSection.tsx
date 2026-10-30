'use client';

import React, { useState } from 'react';
import { BankAccount } from '@/types';
import { CreditCard, Copy, Check, Gift } from 'lucide-react';

interface GiftSectionProps {
  bankAccounts?: BankAccount[];
  themeStyle?: 'editorial' | 'botanical' | 'royal' | 'celestial';
}

export default function GiftSection({ bankAccounts = [], themeStyle = 'editorial' }: GiftSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!bankAccounts || bankAccounts.length === 0) return null;

  const handleCopy = (id: string, num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getThemeClasses = () => {
    switch (themeStyle) {
      case 'botanical':
        return {
          badge: 'bg-[#E8EFE9] text-[#2C4233] border-[#CCDCD0]',
          heading: 'font-cormorant text-[#1B291E]',
          desc: 'text-[#3E5C46]',
          card: 'bg-[#FAF8F5] border-2 border-[#D5E1D8]',
          tag: 'bg-[#E8EFE9] text-[#2C4233]',
          icon: 'text-[#3E5C46]',
          num: 'text-[#1B291E] font-cormorant text-xl',
          name: 'text-[#3E5C46]',
          button: 'bg-[#2C4233] hover:bg-[#1E3024] text-white',
        };
      case 'royal':
        return {
          badge: 'bg-[#24170E] text-[#D4AF37] border-[#D4AF37]/40',
          heading: 'font-cinzel text-[#F5EDE0]',
          desc: 'text-[#D4AF37]/80 font-serif',
          card: 'bg-[#1C120A] border-2 border-[#D4AF37]/50',
          tag: 'bg-[#26180E] text-[#D4AF37]',
          icon: 'text-[#D4AF37]',
          num: 'text-[#F5EDE0] font-cinzel text-xl',
          name: 'text-[#F5EDE0]/80',
          button: 'bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-[#120B06] font-bold font-cinzel',
        };
      case 'celestial':
        return {
          badge: 'bg-slate-900 border border-sky-400/40 text-[#E6C687]',
          heading: 'font-playfair text-white',
          desc: 'text-slate-300 font-outfit',
          card: 'bg-white/[0.04] border border-sky-400/30 backdrop-blur-xl',
          tag: 'bg-slate-900 text-sky-300',
          icon: 'text-[#E6C687]',
          num: 'text-[#E6C687] font-playfair text-xl',
          name: 'text-slate-300 font-outfit',
          button: 'bg-[#E6C687] hover:bg-[#F3D99C] text-slate-950 font-bold font-outfit',
        };
      case 'editorial':
      default:
        return {
          badge: 'bg-[#F2EEE7] text-[#947141] border-[#E2DDD3] font-mono',
          heading: 'font-bodoni text-[#181B19]',
          desc: 'text-stone-600 font-mono',
          card: 'bg-white border border-[#E2DDD3]',
          tag: 'bg-[#F2EEE7] text-stone-900 font-mono',
          icon: 'text-[#947141]',
          num: 'text-[#181B19] font-mono text-xl',
          name: 'text-stone-600 font-mono',
          button: 'bg-[#181B19] hover:bg-[#947141] text-white font-mono',
        };
    }
  };

  const st = getThemeClasses();

  return (
    <section className="text-center">
      <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border ${st.badge} mb-3`}>
        <Gift className="w-3.5 h-3.5" />
        <span>Wedding Gift &amp; Tanda Kasih</span>
      </div>
      <h3 className={`text-3xl sm:text-4xl font-normal mb-3 ${st.heading}`}>Tanda Kasih &amp; Doa Restu</h3>
      <p className={`text-xs sm:text-sm max-w-md mx-auto mb-8 ${st.desc}`}>
        Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih secara digital, Anda dapat mentransfer melalui rekening berikut:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
        {bankAccounts.map((acc) => {
          const isCopied = copiedId === acc.id;
          return (
            <div
              key={acc.id}
              className={`p-6 rounded-2xl ${st.card} shadow-sm text-left flex flex-col justify-between relative group`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`font-bold text-xs tracking-wider uppercase px-2.5 py-1 rounded-md ${st.tag}`}>
                  {acc.bankName}
                </span>
                <CreditCard className={`w-5 h-5 ${st.icon}`} />
              </div>

              <div className="mb-4">
                <p className="text-[10px] uppercase tracking-wider opacity-70">Nomor Rekening</p>
                <p className={`font-bold tracking-wider ${st.num}`}>
                  {acc.accountNumber}
                </p>
                <p className={`text-xs mt-0.5 ${st.name}`}>
                  a.n. <span className="font-semibold">{acc.accountHolder}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(acc.id, acc.accountNumber)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : st.button
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tersalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Nomor Rekening</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
