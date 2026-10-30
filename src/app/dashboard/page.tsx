'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { useAuth } from '@/lib/auth-context';
import { storageAdapter } from '@/lib/storage/storage-adapter';
import { Invitation } from '@/types';
import {
  PlusCircle,
  Eye,
  Edit3,
  Share2,
  Trash2,
  Calendar,
  Users,
  MessageSquareHeart,
  ExternalLink,
  Copy,
  Check,
  Send,
  AlertCircle,
  Lock,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function CustomerDashboardPage() {
  const { user, role } = useAuth();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  // Share modal state
  const [shareInv, setShareInv] = useState<Invitation | null>(null);
  const [guestName, setGuestName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWa, setCopiedWa] = useState(false);

  useEffect(() => {
    async function loadInvitations() {
      if (!user) return;
      try {
        const data = await storageAdapter.getInvitations(user.id, role);
        setInvitations(data);
      } catch (err) {
        console.error('Error fetching customer invitations:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInvitations();
  }, [user, role]);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus undangan "${title}"?`)) {
      await storageAdapter.deleteInvitation(id);
      setInvitations(invitations.filter((i) => i.id !== id));
    }
  };

  const toggleStatus = async (inv: Invitation) => {
    const newStatus = inv.status === 'published' ? 'draft' : 'published';
    const updated = await storageAdapter.updateInvitation(inv.id, { status: newStatus });
    if (updated) {
      setInvitations(invitations.map((i) => (i.id === inv.id ? updated : i)));
    }
  };

  // Aggregated stats
  const totalInvitations = invitations.length;
  const totalRsvps = invitations.reduce((acc, i) => acc + (i.rsvps?.length || 0), 0);
  const totalWishes = invitations.reduce((acc, i) => acc + (i.wishes?.length || 0), 0);
  const totalViews = invitations.reduce((acc, i) => acc + (i.views_count || 0), 0);

  // Share link helpers
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://nikahku.id';
  const getShareUrl = () => {
    if (!shareInv) return '';
    const cleanGuest = guestName.trim();
    return cleanGuest
      ? `${baseUrl}/invitation/${shareInv.slug}?to=${encodeURIComponent(cleanGuest)}`
      : `${baseUrl}/invitation/${shareInv.slug}`;
  };

  const getWaText = () => {
    if (!shareInv) return '';
    const target = guestName.trim() || 'Bapak/Ibu/Saudara/i';
    const link = getShareUrl();
    const groom = shareInv.content?.groom_nickname || 'Mempelai Pria';
    const bride = shareInv.content?.bride_nickname || 'Mempelai Wanita';

    return `Kepada Yth. ${target},\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:\n\n*The Wedding of ${groom} & ${bride}*\n\nBerikut tautan undangan digital kami untuk informasi lengkap rangkaian acara & konfirmasi kehadiran:\n${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila berkenan hadir dan memberikan doa restu.\n\nTerima kasih,\nSalam hangat,\n${groom} & ${bride}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyWa = () => {
    navigator.clipboard.writeText(getWaText());
    setCopiedWa(true);
    setTimeout(() => setCopiedWa(false), 2000);
  };

  // Role protection: Guest warning
  if (role === 'guest') {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-[#FAF8F5] py-20 px-4">
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-stone-200 shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
              Akses Khusus Customer
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed mb-6">
              Anda saat ini berada dalam mode <strong>Guest (Pengunjung)</strong>. Silakan masuk atau ganti role ke Customer untuk mengelola undangan pernikahan Anda.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => (window.location.href = '/templates')}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition"
              >
                Lihat Katalog Template
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header & Quick Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dashboard Calon Pengantin</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Halo, {user?.full_name || 'Pengantin'}
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Kelola undangan, pantau daftar hadir tamu, dan atur tautan bagikan pernikahan Anda.
              </p>
            </div>

            <Link
              href="/dashboard/invitations/create"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition shadow-md shadow-amber-900/10 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Undangan Baru</span>
            </Link>
          </div>

          {/* Metric KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Total Undangan
              </span>
              <p className="text-3xl font-serif font-bold text-stone-900">{totalInvitations}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Total RSVP Masuk
              </span>
              <p className="text-3xl font-serif font-bold text-emerald-700">{totalRsvps}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Ucapan & Doa
              </span>
              <p className="text-3xl font-serif font-bold text-amber-700">{totalWishes}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Total Kunjungan
              </span>
              <p className="text-3xl font-serif font-bold text-stone-900">{totalViews}</p>
            </div>
          </div>

          {/* Invitations List */}
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-serif font-bold text-stone-900">
                Daftar Undangan Pernikahan Anda
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                {invitations.length} Terdaftar
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-stone-500">
                <div className="w-6 h-6 border-2 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Memuat undangan Anda...
              </div>
            ) : invitations.length === 0 ? (
              <div className="py-16 text-center max-w-sm mx-auto">
                <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-3">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="text-base font-serif font-bold text-stone-800 mb-1">
                  Belum Ada Undangan
                </h3>
                <p className="text-xs text-stone-500 mb-6">
                  Anda belum membuat undangan pernikahan. Pilih salah satu template elegan kami untuk memulai.
                </p>
                <Link
                  href="/dashboard/invitations/create"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  Mulai Buat Undangan
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {invitations.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-5 rounded-2xl border border-stone-200 hover:border-amber-700/40 bg-stone-50/50 hover:bg-white transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                  >
                    {/* Left: Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            inv.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {inv.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-xs text-stone-500">
                          Template:{' '}
                          <span className="font-semibold text-stone-800">
                            {inv.template?.name || 'Editorial'}
                          </span>
                        </span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-stone-900">{inv.title}</h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                        <span className="flex items-center gap-1 font-mono text-[11px] text-amber-900 bg-stone-200/60 px-2 py-0.5 rounded">
                          /invitation/{inv.slug}
                        </span>
                        {inv.event_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            {new Date(inv.event_date).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-stone-400" />
                          {inv.views_count || 0} Dilihat
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-emerald-600" />
                          {inv.rsvps?.length || 0} RSVP
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquareHeart className="w-3.5 h-3.5 text-amber-600" />
                          {inv.wishes?.length || 0} Ucapan
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-200">
                      {/* Toggle status */}
                      <button
                        onClick={() => toggleStatus(inv)}
                        title="Klik untuk ubah status Draf / Publikasi"
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                          inv.status === 'published'
                            ? 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
                        }`}
                      >
                        {inv.status === 'published' ? 'Tarik Jadi Draf' : 'Publikasikan'}
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={() => {
                          setShareInv(inv);
                          setGuestName('');
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold transition shadow-sm cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Bagikan</span>
                      </button>

                      {/* View Link */}
                      <Link
                        href={`/invitation/${inv.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-medium transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Pratinjau</span>
                      </Link>

                      {/* Edit Button */}
                      <Link
                        href={`/dashboard/invitations/${inv.id}/edit`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-medium transition"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                        <span>Edit</span>
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(inv.id, inv.title)}
                        className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Hapus Undangan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Share & Guest Name Link Generator Modal */}
      {shareInv && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-amber-800" />
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Bagikan Undangan Digital
                </h3>
              </div>
              <button
                onClick={() => setShareInv(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nama Tamu Khusus (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bpk. Bambang & Keluarga"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Nama ini akan otomatis tercetak di amplop pembuka undangan tamu.
                </p>
              </div>

              {/* URL Display */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tautan Undangan
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={getShareUrl()}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs font-mono text-stone-800 focus:outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="shrink-0 px-3 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Template */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Pesan Format WhatsApp
                </label>
                <textarea
                  readOnly
                  rows={4}
                  value={getWaText()}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] font-sans text-stone-700 focus:outline-none"
                />
                <button
                  onClick={handleCopyWa}
                  className="mt-2 w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {copiedWa ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  <span>{copiedWa ? 'Pesan WhatsApp Tersalin!' : 'Salin Teks WhatsApp Lengkap'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

