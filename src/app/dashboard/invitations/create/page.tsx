'use client';

import React, { Suspense } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import InvitationEditorForm from '@/components/dashboard/InvitationEditorForm';
import { useSearchParams } from 'next/navigation';

function CreateFormContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId') || undefined;
  return <InvitationEditorForm initialTemplateId={templateId} isEdit={false} />;
}

export default function CreateInvitationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FAF8F5] pb-20">
        <Suspense fallback={<div className="p-12 text-center text-xs text-stone-500">Memuat editor...</div>}>
          <CreateFormContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

