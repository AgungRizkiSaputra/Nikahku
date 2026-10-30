'use client';

import React, { useState } from 'react';
import { Invitation } from '@/types';
import OpeningCover from './shared/OpeningCover';
import AudioPlayer from './shared/AudioPlayer';
import EditorialLayout from './layouts/EditorialLayout';
import BotanicalLayout from './layouts/BotanicalLayout';
import RoyalLayout from './layouts/RoyalLayout';
import CelestialLayout from './layouts/CelestialLayout';

interface TemplateRendererProps {
  invitation: Invitation;
  guestName?: string;
  isPreview?: boolean;
}

export default function TemplateRenderer({
  invitation,
  guestName,
  isPreview = false,
}: TemplateRendererProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStartedMusic, setHasStartedMusic] = useState(false);

  const content = invitation.content;
  const layout =
    invitation.template?.theme_config?.layout ||
    (invitation.template_id === 'tpl-2' || invitation.slug === 'botanica-garden'
      ? 'botanical'
      : invitation.template_id === 'tpl-3' || invitation.slug === 'keraton-royal'
      ? 'royal'
      : invitation.template_id === 'tpl-4' || invitation.slug === 'midnight-celestial'
      ? 'celestial'
      : 'editorial');

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setHasStartedMusic(true);
  };

  const renderLayout = () => {
    switch (layout) {
      case 'botanical':
        return <BotanicalLayout invitation={invitation} guestName={guestName} />;
      case 'royal':
        return <RoyalLayout invitation={invitation} guestName={guestName} />;
      case 'celestial':
        return <CelestialLayout invitation={invitation} guestName={guestName} />;
      case 'editorial':
      default:
        return <EditorialLayout invitation={invitation} guestName={guestName} />;
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* 1. Opening Cover Envelope */}
      {!isOpen && (
        <OpeningCover
          groomNickname={content?.groom_nickname || 'Groom'}
          brideNickname={content?.bride_nickname || 'Bride'}
          guestName={guestName}
          eventDate={invitation.event_date}
          venueName={content?.events?.[0]?.venueName}
          themeStyle={layout}
          onOpen={handleOpenInvitation}
        />
      )}

      {/* 2. Main Invitation Layout */}
      {renderLayout()}

      {/* 3. Audio Player floating toggle */}
      <AudioPlayer
        musicUrl={content?.music_url}
        autoPlay={hasStartedMusic}
      />
    </div>
  );
}

