'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { storageAdapter } from '@/lib/storage/storage-adapter';
import { Invitation } from '@/types';
import TemplateRenderer from '@/components/templates/TemplateRenderer';
import { useAuth } from '@/lib/auth-context';
import { Heart, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function InvitationContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { user, role } = useAuth();

  const slug = (params?.slug as string) || '';
  const guestName = searchParams?.get('to') || undefined;

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvitation() {
      if (!slug) return;
      try {
        const inv = await storageAdapter.getInvitationBySlug(slug);
        setInvitation(inv);
        if (inv) {
          storageAdapter.incrementViews(slug);
        }
      } catch (err) {
        console.error('Error fetching invitation:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchInvitation();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-4 border-amber-800 border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-serif text-stone-600 animate-pulse">
          Membuka Undangan Pernikahan...
        </p>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">
          Undangan Tidak Ditemukan
        </h1>
        <p className="text-sm text-stone-600 max-w-sm mb-6">
          Tautan undangan &apos;{slug}&apos; tidak terdaftar atau telah diarsipkan oleh pemiliknya.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    );
  }

  // Check draft permissions:
  // If status is draft, only author or admin can view
  const isOwner = user && user.id === invitation.user_id;
  const isAdmin = role === 'admin';
  if (invitation.status === 'draft' && !isOwner && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">
          Undangan Masih Berstatus Draf
        </h1>
        <p className="text-sm text-stone-600 max-w-sm mb-6">
          Undangan ini belum diterbitkan oleh calon mempelai. Hanya pemilik undangan atau admin yang dapat melihat pratinjau.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      {/* Draft banner for owner or admin */}
      {invitation.status === 'draft' && (
        <div className="bg-amber-600 text-white text-xs py-2 px-4 text-center font-medium sticky top-0 z-50 flex items-center justify-center gap-2 shadow-md">
          <Lock className="w-3.5 h-3.5" />
          <span>Mode Pratinjau Draf — Undangan ini belum dipublikasikan untuk umum.</span>
          <Link
            href={`/dashboard/invitations/${invitation.id}/edit`}
            className="underline font-bold ml-2 hover:text-amber-100"
          >
            Publikasikan di Editor
          </Link>
        </div>
      )}

      <TemplateRenderer
        invitation={invitation}
        guestName={guestName}
      />
    </div>
  );
}

export default function PublicInvitationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
          <div className="w-12 h-12 rounded-full border-4 border-amber-800 border-t-transparent animate-spin mb-4" />
          <p className="text-sm font-serif text-stone-600">Memuat Undangan...</p>
        </div>
      }
    >
      <InvitationContent />
    </Suspense>
  );
}

