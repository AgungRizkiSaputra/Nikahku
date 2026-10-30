'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  musicUrl?: string;
  autoPlay?: boolean;
}

export default function AudioPlayer({ musicUrl, autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fallback romantic piano audio if musicUrl is empty
  const defaultAudio = 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c89b2db975.mp3';
  const audioSrc = musicUrl || defaultAudio;

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay was blocked by browser policy; user can click button
          setIsPlaying(false);
        });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback prevented:', err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause Musik' : 'Play Musik'}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer border ${
          isPlaying
            ? 'bg-amber-800 border-amber-600 animate-pulse-slow'
            : 'bg-stone-800 border-stone-600 opacity-80'
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 animate-bounce" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-stone-300" />
        )}
      </button>
    </div>
  );
}

