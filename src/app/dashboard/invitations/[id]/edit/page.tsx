'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import InvitationEditorForm from '@/components/dashboard/InvitationEditorForm';
import { useParams } from 'next/navigation';
import { storageAdapter } from '@/lib/storage/storage-adapter';
import { Invitation } from '@/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditInvitationPage() {
  const params = useParams();
  const id = (params?.id as string) || '';

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const data = await storageAdapter.getInvitationById(id);
        setInvitation(data);
      } catch (err) {
        console.error('Error fetching invitation for editing:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20 bg-[#FAF8F5]">
          <div className="w-8 h-8 rounded-full border-4 border-amber-800 border-t-transparent animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  if (!invitation) {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center bg-[#FAF8F5]">
          <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">
            Undangan Tidak Ditemukan
          </h2>
          <p className="text-xs text-stone-500 mb-6">
            Data undangan tidak tersedia atau sudah dihapus.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FAF8F5] pb-20">
        <InvitationEditorForm initialInvitation={invitation} isEdit={true} />
      </main>
      <Footer />
    </>
  );
}

