'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  themeStyle?: 'editorial' | 'botanical' | 'royal' | 'celestial';
}

export default function CountdownTimer({ targetDate, themeStyle = 'editorial' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    function calculate() {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const getStyle = () => {
    switch (themeStyle) {
      case 'botanical':
        return {
          card: 'bg-[#E8EFE9] border-[#CCDCD0] text-[#1B291E]',
          number: 'text-[#2C4233] font-cormorant',
          label: 'text-[#3E5C46]',
        };
      case 'royal':
        return {
          card: 'bg-[#20130A] border-[#D4AF37]/40 text-[#F5EDE0]',
          number: 'text-[#D4AF37] font-cinzel',
          label: 'text-[#D4AF37]/80',
        };
      case 'celestial':
        return {
          card: 'bg-white/[0.04] border-sky-400/30 text-white backdrop-blur-xl',
          number: 'text-[#E6C687] font-outfit',
          label: 'text-sky-300',
        };
      case 'editorial':
      default:
        return {
          card: 'bg-[#F2EEE7] border-[#E2DDD3] text-[#181B19]',
          number: 'text-[#181B19] font-bodoni',
          label: 'text-stone-500 font-mono',
        };
    }
  };

  const style = getStyle();

  const items = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-md mx-auto my-6">
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-transform hover:scale-105 ${style.card}`}
          >
            <span className={`text-2xl sm:text-3xl font-bold tracking-tight ${style.number}`}>
              {String(item.value).padStart(2, '0')}
            </span>
            <span className={`text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 ${style.label}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      {timeLeft.isPassed && (
        <p className="text-center text-xs mt-3 text-amber-700 italic font-medium">
          Momen bahagia telah berlangsung atau sedang berbahagia hari ini!
        </p>
      )}
    </div>
  );
}

