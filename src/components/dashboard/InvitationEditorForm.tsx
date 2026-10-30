'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Invitation, Template, EventDetail, LoveStory, BankAccount, InvitationStatus } from '@/types';
import { storageAdapter } from '@/lib/storage/storage-adapter';
import { useAuth } from '@/lib/auth-context';
import {
  Save,
  CheckCircle,
  Eye,
  Plus,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Music,
  CreditCard,
  Image as ImageIcon,
  Smartphone,
  Sparkles,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

interface EditorProps {
  initialInvitation?: Invitation;
  initialTemplateId?: string;
  isEdit?: boolean;
}

export default function InvitationEditorForm({
  initialInvitation,
  initialTemplateId,
  isEdit = false,
}: EditorProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [activeTab, setActiveTab] = useState<'info' | 'couple' | 'events' | 'story' | 'gift' | 'preview'>('info');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [title, setTitle] = useState(initialInvitation?.title || '');
  const [slug, setSlug] = useState(initialInvitation?.slug || '');
  const [templateId, setTemplateId] = useState(
    initialInvitation?.template_id || initialTemplateId || 'tpl-1'
  );
  const [status, setStatus] = useState<InvitationStatus>(
    initialInvitation?.status || 'draft'
  );
  const [eventDate, setEventDate] = useState(initialInvitation?.event_date || '2026-12-20');

  // Groom Info
  const [groomName, setGroomName] = useState(initialInvitation?.content?.groom_name || '');
  const [groomNickname, setGroomNickname] = useState(initialInvitation?.content?.groom_nickname || '');
  const [groomFather, setGroomFather] = useState(initialInvitation?.content?.groom_father || '');
  const [groomMother, setGroomMother] = useState(initialInvitation?.content?.groom_mother || '');
  const [groomPhoto, setGroomPhoto] = useState(
    initialInvitation?.content?.groom_photo ||
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80'
  );
  const [groomInstagram, setGroomInstagram] = useState(initialInvitation?.content?.groom_instagram || '');

  // Bride Info
  const [brideName, setBrideName] = useState(initialInvitation?.content?.bride_name || '');
  const [brideNickname, setBrideNickname] = useState(initialInvitation?.content?.bride_nickname || '');
  const [brideFather, setBrideFather] = useState(initialInvitation?.content?.bride_father || '');
  const [brideMother, setBrideMother] = useState(initialInvitation?.content?.bride_mother || '');
  const [bridePhoto, setBridePhoto] = useState(
    initialInvitation?.content?.bride_photo ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
  );
  const [brideInstagram, setBrideInstagram] = useState(initialInvitation?.content?.bride_instagram || '');

  // Quotes
  const [quote, setQuote] = useState(
    initialInvitation?.content?.quote ||
      'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri...'
  );
  const [quoteSource, setQuoteSource] = useState(initialInvitation?.content?.quote_source || 'QS. Ar-Rum: 21');
  const [musicUrl, setMusicUrl] = useState(
    initialInvitation?.content?.music_url ||
      'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c89b2db975.mp3'
  );

  // Events List
  const [events, setEvents] = useState<EventDetail[]>(
    initialInvitation?.content?.events || [
      {
        id: 'ev-akad',
        title: 'Akad Nikah',
        date: '2026-12-20',
        startTime: '08:00',
        endTime: '10:00',
        timezone: 'WIB',
        venueName: 'Masjid Agung',
        address: 'Jl. Pemuda No. 100, Kota Semarang',
        mapsUrl: 'https://maps.google.com',
      },
      {
        id: 'ev-resepsi',
        title: 'Resepsi Pernikahan',
        date: '2026-12-20',
        startTime: '11:00',
        endTime: '14:00',
        timezone: 'WIB',
        venueName: 'Grand Ballroom Hotel',
        address: 'Jl. Gajah Mada No. 88, Kota Semarang',
        mapsUrl: 'https://maps.google.com',
      },
    ]
  );

  // Love Story List
  const [loveStories, setLoveStories] = useState<LoveStory[]>(
    initialInvitation?.content?.love_stories || [
      {
        id: 'ls-1',
        year: '2020',
        title: 'Pertemuan Awal',
        story: 'Bertemu dalam sebuah acara reuni dan mulai menjalin komunikasi hangat.',
      },
      {
        id: 'ls-2',
        year: '2024',
        title: 'Lamaran',
        story: 'Mengikrarkan janji suci di depan kedua belah pihak keluarga tercinta.',
      },
    ]
  );

  // Bank Accounts
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(
    initialInvitation?.content?.bank_accounts || [
      {
        id: 'ba-1',
        bankName: 'BCA',
        accountNumber: '8220194829',
        accountHolder: 'Arya Pratama',
      },
    ]
  );

  useEffect(() => {
    async function fetchTemplates() {
      const tpls = await storageAdapter.getTemplates(true);
      setTemplates(tpls);
    }
    fetchTemplates();
  }, []);

  // Handle Event manipulation
  const addEvent = () => {
    setEvents([
      ...events,
      {
        id: 'ev-' + Date.now(),
        title: 'Acara Tambahan',
        date: eventDate,
        startTime: '18:00',
        endTime: '21:00',
        timezone: 'WIB',
        venueName: 'Nama Tempat',
        address: 'Alamat lengkap tempat acara',
        mapsUrl: '',
      },
    ]);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const updateEvent = (index: number, field: keyof EventDetail, value: string) => {
    const updated = [...events];
    updated[index] = { ...updated[index], [field]: value };
    setEvents(updated);
  };

  // Handle Love Story manipulation
  const addStory = () => {
    setLoveStories([
      ...loveStories,
      {
        id: 'ls-' + Date.now(),
        year: String(new Date().getFullYear()),
        title: 'Momen Indah',
        story: 'Ceritakan kisah berharga Anda di sini...',
      },
    ]);
  };

  const removeStory = (index: number) => {
    setLoveStories(loveStories.filter((_, i) => i !== index));
  };

  const updateStory = (index: number, field: keyof LoveStory, value: string) => {
    const updated = [...loveStories];
    updated[index] = { ...updated[index], [field]: value };
    setLoveStories(updated);
  };

  // Handle Bank Account manipulation
  const addBank = () => {
    setBankAccounts([
      ...bankAccounts,
      {
        id: 'ba-' + Date.now(),
        bankName: 'Bank Mandiri',
        accountNumber: '1234567890',
        accountHolder: 'Nama Pemilik',
      },
    ]);
  };

  const removeBank = (index: number) => {
    setBankAccounts(bankAccounts.filter((_, i) => i !== index));
  };

  const updateBank = (index: number, field: keyof BankAccount, value: string) => {
    const updated = [...bankAccounts];
    updated[index] = { ...updated[index], [field]: value };
    setBankAccounts(updated);
  };

  // Submit Handler
  const handleSave = async (publishImmediate = false) => {
    if (!title.trim() || !slug.trim()) {
      setErrorMsg('Judul undangan dan URL Slug wajib diisi!');
      setActiveTab('info');
      return;
    }

    setSaving(true);
    setErrorMsg('');

    const targetStatus = publishImmediate ? 'published' : status;

    const payloadContent = {
      groom_name: groomName || 'Mempelai Pria',
      groom_nickname: groomNickname || 'Pria',
      groom_father: groomFather,
      groom_mother: groomMother,
      groom_photo: groomPhoto,
      groom_instagram: groomInstagram,
      bride_name: brideName || 'Mempelai Wanita',
      bride_nickname: brideNickname || 'Wanita',
      bride_father: brideFather,
      bride_mother: brideMother,
      bride_photo: bridePhoto,
      bride_instagram: brideInstagram,
      quote,
      quote_source: quoteSource,
      primary_color: '#8B5E3C',
      font_family: 'Playfair Display',
      music_url: musicUrl,
      events,
      love_stories: loveStories,
      bank_accounts: bankAccounts,
    };

    try {
      if (isEdit && initialInvitation) {
        await storageAdapter.updateInvitation(initialInvitation.id, {
          title,
          slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          template_id: templateId,
          status: targetStatus,
          event_date: eventDate,
          content: payloadContent,
        });
      } else {
        await storageAdapter.createInvitation({
          userId: user?.id || 'usr-customer-1',
          templateId,
          title,
          slug,
          eventDate,
          content: payloadContent,
        });
      }

      setSaveSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan undangan';
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-stone-900">
              {isEdit ? 'Edit Undangan Pernikahan' : 'Buat Undangan Baru'}
            </h1>
            <p className="text-xs text-stone-500">
              {title || 'Isi formulir terstruktur di bawah ini'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(false)}
            className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Save className="w-4 h-4 text-stone-600" />
            <span>Simpan Draf</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(true)}
            className="px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan & Publikasikan'}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4" />
          <span>Undangan berhasil disimpan! Mengalihkan ke dashboard...</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Editor Layout with Tabs & Live Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Tabs & Inputs */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
          {/* Tabs Bar */}
          <div className="flex items-center border-b border-stone-200 overflow-x-auto bg-stone-50/70 p-1.5 gap-1">
            {[
              { id: 'info' as const, label: '1. Informasi Umum', icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: 'couple' as const, label: '2. Mempelai', icon: <Heart className="w-3.5 h-3.5" /> },
              { id: 'events' as const, label: '3. Acara & Peta', icon: <Calendar className="w-3.5 h-3.5" /> },
              { id: 'story' as const, label: '4. Cerita Kasih', icon: <ImageIcon className="w-3.5 h-3.5" /> },
              { id: 'gift' as const, label: '5. Hadiah & Musik', icon: <CreditCard className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="p-6 space-y-6">
            {/* TAB 1: INFO & TEMPLATE */}
            {activeTab === 'info' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Judul Undangan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: The Wedding of Arya & Dinda"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Kustomisasi Tautan (URL Slug)
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 rounded-l-xl bg-stone-100 border border-r-0 border-stone-300 text-stone-500 text-xs font-mono">
                      /invitation/
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="arya-dinda"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-r-xl border border-stone-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Hanya gunakan huruf kecil, angka, dan tanda hubung (-).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tanggal Utama Acara
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    Pilih Desain Template
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((tpl) => (
                      <div
                        key={tpl.id}
                        onClick={() => setTemplateId(tpl.id)}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition ${
                          templateId === tpl.id
                            ? 'border-amber-800 bg-amber-50/50 shadow-sm'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="aspect-video rounded-lg overflow-hidden bg-stone-100 mb-2">
                          <img
                            src={tpl.thumbnail_url}
                            alt={tpl.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs font-bold text-stone-900">{tpl.name}</p>
                        <p className="text-[10px] text-stone-500 uppercase">
                          {tpl.theme_config.layout} Layout
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Status Publikasi
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={status === 'draft'}
                        onChange={() => setStatus('draft')}
                      />
                      <span>Simpan sebagai Draft (Hanya Anda yang bisa melihat)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={status === 'published'}
                        onChange={() => setStatus('published')}
                      />
                      <span className="font-semibold text-emerald-700">Publikasikan (Bisa diakses tamu)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COUPLE */}
            {activeTab === 'couple' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Groom */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
                  <h3 className="text-sm font-serif font-bold text-stone-900">
                    Informasi Mempelai Pria
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Nama Lengkap & Gelar
                      </label>
                      <input
                        type="text"
                        placeholder="Arya Pratama, S.T."
                        value={groomName}
                        onChange={(e) => setGroomName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Nama Panggilan
                      </label>
                      <input
                        type="text"
                        placeholder="Arya"
                        value={groomNickname}
                        onChange={(e) => setGroomNickname(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Nama Ayah
                      </label>
                      <input
                        type="text"
                        placeholder="Bpk. Bambang Subagyo"
                        value={groomFather}
                        onChange={(e) => setGroomFather(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Nama Ibu
                      </label>
                      <input
                        type="text"
                        placeholder="Ibu Siti Nurhasanah"
                        value={groomMother}
                        onChange={(e) => setGroomMother(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        URL Foto Profil Pria
                      </label>
                      <input
                        type="text"
                        value={groomPhoto}
                        onChange={(e) => setGroomPhoto(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Username Instagram
                      </label>
                      <input
                        type="text"
                        placeholder="aryapratama"
                        value={groomInstagram}
                        onChange={(e) => setGroomInstagram(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Bride */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
                  <h3 className="text-sm font-serif font-bold text-stone-900">
                    Informasi Mempelai Wanita
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Nama Lengkap & Gelar
                      </label>
                      <input
                        type="text"
                        placeholder="Dinda Kirana Larasati, M.Sc."
                        value={brideName}
                        onChange={(e) => setBrideName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Nama Panggilan
                      </label>
                      <input
                        type="text"
                        placeholder="Dinda"
                        value={brideNickname}
                        onChange={(e) => setBrideNickname(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Nama Ayah
                      </label>
                      <input
                        type="text"
                        placeholder="Bpk. Hendra Kusuma"
                        value={brideFather}
                        onChange={(e) => setBrideFather(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Nama Ibu
                      </label>
                      <input
                        type="text"
                        placeholder="Ibu Ratna Dewi"
                        value={brideMother}
                        onChange={(e) => setBrideMother(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        URL Foto Profil Wanita
                      </label>
                      <input
                        type="text"
                        value={bridePhoto}
                        onChange={(e) => setBridePhoto(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Username Instagram
                      </label>
                      <input
                        type="text"
                        placeholder="dindakirana"
                        value={brideInstagram}
                        onChange={(e) => setBrideInstagram(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Kutipan Ayat / Doa Pembuka
                  </label>
                  <textarea
                    rows={3}
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Sumber (contoh: QS. Ar-Rum: 21)"
                    value={quoteSource}
                    onChange={(e) => setQuoteSource(e.target.value)}
                    className="w-full mt-2 px-3 py-2 rounded-xl border border-stone-300 text-xs"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: EVENTS */}
            {activeTab === 'events' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-serif font-bold text-stone-900">
                      Rangkaian Acara Sakral
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Tambahkan akad nikah, pemberkatan, atau resepsi Anda.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addEvent}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Acara</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {events.map((ev, index) => (
                    <div
                      key={ev.id}
                      className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3 relative group"
                    >
                      <button
                        type="button"
                        onClick={() => removeEvent(index)}
                        className="absolute top-4 right-4 text-stone-400 hover:text-rose-600 transition"
                        title="Hapus Acara"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Nama Acara
                          </label>
                          <input
                            type="text"
                            value={ev.title}
                            onChange={(e) => updateEvent(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Tanggal Acara
                          </label>
                          <input
                            type="date"
                            value={ev.date}
                            onChange={(e) => updateEvent(index, 'date', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Jam Mulai
                          </label>
                          <input
                            type="text"
                            placeholder="08:00"
                            value={ev.startTime}
                            onChange={(e) => updateEvent(index, 'startTime', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Jam Selesai
                          </label>
                          <input
                            type="text"
                            placeholder="11:00"
                            value={ev.endTime}
                            onChange={(e) => updateEvent(index, 'endTime', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Zona Waktu
                          </label>
                          <select
                            value={ev.timezone}
                            onChange={(e) => updateEvent(index, 'timezone', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                          >
                            <option value="WIB">WIB</option>
                            <option value="WITA">WITA</option>
                            <option value="WIT">WIT</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Nama Gedung / Tempat
                          </label>
                          <input
                            type="text"
                            value={ev.venueName}
                            onChange={(e) => updateEvent(index, 'venueName', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Link Google Maps
                          </label>
                          <input
                            type="text"
                            placeholder="https://maps.google.com/?q=..."
                            value={ev.mapsUrl}
                            onChange={(e) => updateEvent(index, 'mapsUrl', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Alamat Lengkap
                        </label>
                        <input
                          type="text"
                          value={ev.address}
                          onChange={(e) => updateEvent(index, 'address', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: LOVE STORY */}
            {activeTab === 'story' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-serif font-bold text-stone-900">
                      Timeline Kisah Cinta
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Bagikan momen berharga awal mula pertemuan hingga pelaminan.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addStory}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Kisah</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {loveStories.map((story, index) => (
                    <div
                      key={story.id}
                      className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3 relative group"
                    >
                      <button
                        type="button"
                        onClick={() => removeStory(index)}
                        className="absolute top-4 right-4 text-stone-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-8">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Tahun
                          </label>
                          <input
                            type="text"
                            value={story.year}
                            onChange={(e) => updateStory(index, 'year', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Judul Momen
                          </label>
                          <input
                            type="text"
                            value={story.title}
                            onChange={(e) => updateStory(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Cerita Singkat
                        </label>
                        <textarea
                          rows={2}
                          value={story.story}
                          onChange={(e) => updateStory(index, 'story', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: GIFT & AUDIO */}
            {activeTab === 'gift' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-sm font-serif font-bold text-stone-900 mb-1">
                    Musik Latar Romantis
                  </h3>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Audio MP3 Direct Link URL
                  </label>
                  <input
                    type="text"
                    value={musicUrl}
                    onChange={(e) => setMusicUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Format audio didukung: .mp3, .m4a.
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-serif font-bold text-stone-900">
                        Rekening Amplop Digital
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Tamu dapat menyalin nomor rekening Anda untuk transfer hadiah.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addBank}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Rekening</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {bankAccounts.map((acc, index) => (
                      <div
                        key={acc.id}
                        className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3 relative"
                      >
                        <button
                          type="button"
                          onClick={() => removeBank(index)}
                          className="absolute top-4 right-4 text-stone-400 hover:text-rose-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-8">
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                              Nama Bank / Dompet
                            </label>
                            <input
                              type="text"
                              placeholder="BCA / Mandiri / GoPay"
                              value={acc.bankName}
                              onChange={(e) => updateBank(index, 'bankName', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                              Nomor Rekening
                            </label>
                            <input
                              type="text"
                              value={acc.accountNumber}
                              onChange={(e) => updateBank(index, 'accountNumber', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                              Atas Nama
                            </label>
                            <input
                              type="text"
                              value={acc.accountHolder}
                              onChange={(e) => updateBank(index, 'accountHolder', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Simulator: Live Interactive Preview */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-amber-800" />
              Pratinjau Langsung Tamu
            </span>
            <span className="text-[11px] text-stone-400">Tampilan Mobile</span>
          </div>

          <div className="w-[340px] sm:w-[375px] h-[680px] bg-stone-900 rounded-[40px] p-3 shadow-2xl border-4 border-stone-800 relative overflow-hidden flex flex-col">
            {/* Speaker hole & camera notch */}
            <div className="w-32 h-4 bg-stone-800 rounded-full mx-auto mb-2 shrink-0 z-20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-stone-900 border border-stone-700" />
            </div>

            {/* Inner screen content adapting to chosen template */}
            <div
              className={`flex-1 rounded-[28px] overflow-y-auto relative p-4 space-y-6 text-center select-none transition-colors duration-500 ${
                templateId === 'tpl-3'
                  ? 'bg-[#140D07] text-[#F5EDE0]'
                  : templateId === 'tpl-2'
                  ? 'bg-[#F7F5F0] text-[#1B291E]'
                  : templateId === 'tpl-4'
                  ? 'bg-[#080C16] text-[#F8FAFC]'
                  : 'bg-[#FAF7F2] text-[#181B19]'
              }`}
            >
              <div className="pt-6 space-y-2">
                <span
                  className={`text-[10px] tracking-widest uppercase font-semibold block ${
                    templateId === 'tpl-3'
                      ? 'text-[#D4AF37] font-cinzel'
                      : templateId === 'tpl-2'
                      ? 'text-[#3E5C46]'
                      : templateId === 'tpl-4'
                      ? 'text-[#E6C687]'
                      : 'text-[#947141] font-mono'
                  }`}
                >
                  The Wedding of
                </span>
                <h3
                  className={`text-2xl font-bold leading-tight ${
                    templateId === 'tpl-3'
                      ? 'font-cinzel text-[#F5EDE0]'
                      : templateId === 'tpl-2'
                      ? 'font-cormorant text-[#1B291E]'
                      : templateId === 'tpl-4'
                      ? 'font-playfair text-white'
                      : 'font-bodoni text-[#181B19]'
                  }`}
                >
                  {groomNickname || 'Arya'} &amp; {brideNickname || 'Dinda'}
                </h3>
                <p
                  className={`text-[10px] ${
                    templateId === 'tpl-3'
                      ? 'text-[#D4AF37]/80'
                      : templateId === 'tpl-4'
                      ? 'text-slate-400'
                      : 'text-stone-500'
                  }`}
                >
                  {eventDate ? new Date(eventDate).toLocaleDateString('id-ID', { dateStyle: 'long' }) : 'Tanggal Acara'}
                </p>
              </div>

              {/* Photos */}
              <div className="grid grid-cols-2 gap-2 max-w-[240px] mx-auto">
                <div
                  className={`aspect-[3/4] rounded-xl overflow-hidden ${
                    templateId === 'tpl-3'
                      ? 'border border-[#D4AF37] bg-[#24170E]'
                      : templateId === 'tpl-2'
                      ? 'rounded-t-full border-2 border-[#CCDCD0]'
                      : templateId === 'tpl-4'
                      ? 'border border-sky-400/40'
                      : 'border border-[#E2DDD3]'
                  }`}
                >
                  <img
                    src={groomPhoto}
                    alt="Groom"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`aspect-[3/4] rounded-xl overflow-hidden ${
                    templateId === 'tpl-3'
                      ? 'border border-[#D4AF37] bg-[#24170E]'
                      : templateId === 'tpl-2'
                      ? 'rounded-t-full border-2 border-[#CCDCD0]'
                      : templateId === 'tpl-4'
                      ? 'border border-sky-400/40'
                      : 'border border-[#E2DDD3]'
                  }`}
                >
                  <img
                    src={bridePhoto}
                    alt="Bride"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Event preview snippet */}
              {events.length > 0 && (
                <div
                  className={`p-3 rounded-xl text-left text-xs space-y-1 ${
                    templateId === 'tpl-3'
                      ? 'bg-[#1C120A] border border-[#D4AF37]/50 text-[#F5EDE0]'
                      : templateId === 'tpl-2'
                      ? 'bg-white border border-[#D5E1D8] text-[#1B291E]'
                      : templateId === 'tpl-4'
                      ? 'bg-white/[0.04] border border-sky-400/30 text-white'
                      : 'bg-white border border-[#E2DDD3] text-stone-900'
                  }`}
                >
                  <p className="font-bold">{events[0].title}</p>
                  <p className="text-[11px] opacity-80">{events[0].venueName}</p>
                  <p className="text-[10px] opacity-60">
                    Pukul {events[0].startTime} {events[0].timezone}
                  </p>
                </div>
              )}

              {/* Bank snippet */}
              {bankAccounts.length > 0 && (
                <div
                  className={`p-3 rounded-xl text-left text-xs ${
                    templateId === 'tpl-3'
                      ? 'bg-[#24170E] border border-[#D4AF37]/40 text-[#D4AF37]'
                      : templateId === 'tpl-2'
                      ? 'bg-[#E8EFE9] border border-[#CCDCD0] text-[#2C4233]'
                      : templateId === 'tpl-4'
                      ? 'bg-slate-900 border border-sky-400/30 text-[#E6C687]'
                      : 'bg-[#F2EEE7] border border-[#E2DDD3] text-stone-900'
                  }`}
                >
                  <p className="text-[10px] uppercase font-bold">
                    {bankAccounts[0].bankName}: {bankAccounts[0].accountNumber}
                  </p>
                  <p className="text-[10px] opacity-80">a.n. {bankAccounts[0].accountHolder}</p>
                </div>
              )}

              <p className="text-[10px] opacity-60 italic pt-2">
                *Simulasi real-time sesuai template ({templateId})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

