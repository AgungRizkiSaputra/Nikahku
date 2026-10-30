'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { useAuth } from '@/lib/auth-context';
import { storageAdapter } from '@/lib/storage/storage-adapter';
import {
  Template,
  TemplateCategory,
  UserProfile,
  Invitation,
  PlatformStats,
  UserRole,
} from '@/types';
import {
  Shield,
  LayoutGrid,
  Users,
  FileText,
  Settings,
  Sparkles,
  Plus,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  Lock,
  ArrowRight,
  TrendingUp,
  MessageSquareHeart,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user, role, switchRole } = useAuth();

  const [activeTab, setActiveTab] = useState<'stats' | 'templates' | 'categories' | 'users' | 'invitations' | 'settings'>('stats');
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [invitationsList, setInvitationsList] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  // New Template Modal state
  const [newTemplateModal, setNewTemplateModal] = useState(false);
  const [tplName, setTplName] = useState('');
  const [tplSlug, setTplSlug] = useState('');
  const [tplDesc, setTplDesc] = useState('');
  const [tplThumb, setTplThumb] = useState('https://images.unsplash.com/photo-1519741497674-611481863552?w=800');
  const [tplLayout, setTplLayout] = useState<'editorial' | 'botanical' | 'royal' | 'celestial'>('editorial');
  const [tplCategory, setTplCategory] = useState('');

  // Platform settings state
  const [siteName, setSiteName] = useState('NikahKu Digital Platform');
  const [supportEmail, setSupportEmail] = useState('support@nikahku.id');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [statsData, tpls, cats, users, invs] = await Promise.all([
          storageAdapter.getPlatformStats(),
          storageAdapter.getTemplates(false), // get all including inactive
          storageAdapter.getCategories(),
          storageAdapter.getUsers(),
          storageAdapter.getInvitations(undefined, 'admin'),
        ]);
        setStats(statsData);
        setTemplates(tpls);
        setCategories(cats);
        setUsersList(users);
        setInvitationsList(invs);
        if (cats.length > 0) setTplCategory(cats[0].id);
      } catch (err) {
        console.error('Error loading admin data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  const handleToggleTemplateActive = async (tpl: Template) => {
    const updated = await storageAdapter.updateTemplate(tpl.id, {
      is_active: !tpl.is_active,
    });
    if (updated) {
      setTemplates(templates.map((t) => (t.id === tpl.id ? updated : t)));
    }
  };

  const handleToggleTemplateFeatured = async (tpl: Template) => {
    const updated = await storageAdapter.updateTemplate(tpl.id, {
      is_featured: !tpl.is_featured,
    });
    if (updated) {
      setTemplates(templates.map((t) => (t.id === tpl.id ? updated : t)));
    }
  };

  const handleDeleteTemplate = async (id: string, name: string) => {
    if (confirm(`Hapus template "${name}"?`)) {
      await storageAdapter.deleteTemplate(id);
      setTemplates(templates.filter((t) => t.id !== id));
    }
  };

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tplName || !tplSlug) return;

    const newTpl = await storageAdapter.createTemplate({
      name: tplName,
      slug: tplSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      category_id: tplCategory || undefined,
      description: tplDesc,
      thumbnail_url: tplThumb,
      theme_config: {
        layout: tplLayout,
        fontHeading: tplLayout === 'royal' ? 'Cinzel' : tplLayout === 'botanical' ? 'Cormorant Garamond' : 'Playfair Display',
        fontBody: 'Plus Jakarta Sans',
        primaryColor: tplLayout === 'royal' ? '#C49746' : tplLayout === 'botanical' ? '#4A6B53' : '#8B5E3C',
        accentColor: '#F7F4EF',
        cardBg: '#FFFFFF',
        textColor: '#1C1917',
      },
      is_active: true,
      is_featured: false,
    });

    setTemplates([newTpl, ...templates]);
    setNewTemplateModal(false);
    setTplName('');
    setTplSlug('');
    setTplDesc('');
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    const updated = await storageAdapter.updateUserRole(userId, newRole);
    if (updated) {
      setUsersList(usersList.map((u) => (u.id === userId ? updated : u)));
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Role Gate: if not admin
  if (role !== 'admin') {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-[#FAF8F5] py-20 px-4">
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-stone-200 shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
              Akses Ditolak
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed mb-6">
              Halaman ini hanya dapat diakses oleh akun dengan hak akses <strong>Admin</strong>. Anda dapat menguji akses Admin melalui tombol switcher di bagian paling atas layar.
            </p>
            <button
              onClick={() => switchRole('admin')}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-700 text-white text-xs font-semibold hover:bg-purple-800 transition"
            >
              Beralih ke Role Admin Sekarang
            </button>
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
          {/* Header */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-purple-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2 border border-purple-500/30">
                <Shield className="w-3.5 h-3.5" />
                <span>Super Admin Panel</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold">
                Platform Control & Monitoring
              </h1>
              <p className="text-xs text-stone-300 mt-1">
                Kelola katalog template, moderasi undangan pengguna, kelola hak akses role, dan pantau metrik platform.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setNewTemplateModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Template Baru</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'stats' as const, label: 'Statistik & Ringkasan', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'templates' as const, label: 'Katalog Template', icon: <LayoutGrid className="w-4 h-4" /> },
              { id: 'invitations' as const, label: 'Seluruh Undangan', icon: <FileText className="w-4 h-4" /> },
              { id: 'users' as const, label: 'Pengguna & Role', icon: <Users className="w-4 h-4" /> },
              { id: 'settings' as const, label: 'Pengaturan Sistem', icon: <Settings className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-purple-700 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: STATS & OVERVIEW */}
          {activeTab === 'stats' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Total Pengguna
                  </span>
                  <p className="text-4xl font-serif font-bold text-stone-900">{stats?.totalUsers || 0}</p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Total Undangan Dibuat
                  </span>
                  <p className="text-4xl font-serif font-bold text-purple-700">
                    {stats?.totalInvitations || 0}
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Undangan Published
                  </span>
                  <p className="text-4xl font-serif font-bold text-emerald-700">
                    {stats?.totalPublished || 0}
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Total Respon RSVP
                  </span>
                  <p className="text-4xl font-serif font-bold text-amber-700">
                    {stats?.totalRsvps || 0}
                  </p>
                </div>
              </div>

              {/* Quick Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
                  <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Template Terpopuler
                  </h3>
                  <div className="space-y-2">
                    {templates.slice(0, 3).map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-stone-50 text-xs"
                      >
                        <span className="font-semibold text-stone-800">{t.name}</span>
                        <span className="text-stone-500 uppercase font-mono text-[10px]">
                          {t.theme_config.layout}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
                  <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                    <MessageSquareHeart className="w-4 h-4 text-emerald-600" />
                    Aktivitas Ucapan & Doa
                  </h3>
                  <p className="text-xs text-stone-600">
                    Terdapat total <strong>{stats?.totalWishes || 0}</strong> ucapan pernikahan yang telah dikirimkan oleh para tamu undangan di seluruh platform.
                  </p>
                  <p className="text-xs text-stone-600">
                    Total kunjungan publik undangan mencapai <strong>{stats?.totalViews || 0}</strong> kali penayangan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEMPLATES MANAGEMENT */}
          {activeTab === 'templates' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-serif font-bold text-stone-900">
                    Manajemen Katalog Template
                  </h2>
                  <p className="text-xs text-stone-500">
                    Aktifkan, nonaktifkan, jadikan unggulan, atau tambah template baru.
                  </p>
                </div>
                <button
                  onClick={() => setNewTemplateModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Template</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Template</th>
                      <th className="py-3 px-4">Layout</th>
                      <th className="py-3 px-4">Status Aktif</th>
                      <th className="py-3 px-4">Unggulan</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {templates.map((tpl) => (
                      <tr key={tpl.id} className="hover:bg-stone-50/50">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={tpl.thumbnail_url}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100"
                          />
                          <div>
                            <span className="font-bold text-stone-900 block">{tpl.name}</span>
                            <span className="text-[11px] text-stone-400 font-mono">
                              slug: {tpl.slug}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 uppercase text-[11px] font-mono text-stone-600">
                          {tpl.theme_config.layout}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleTemplateActive(tpl)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition cursor-pointer ${
                              tpl.is_active
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                            }`}
                          >
                            {tpl.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            <span>{tpl.is_active ? 'Aktif' : 'Nonaktif'}</span>
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleTemplateFeatured(tpl)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition cursor-pointer ${
                              tpl.is_featured
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                            }`}
                          >
                            <Star className={`w-3 h-3 ${tpl.is_featured ? 'fill-current' : ''}`} />
                            <span>{tpl.is_featured ? 'Unggulan' : 'Standar'}</span>
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <Link
                            href="/invitation/arya-dinda"
                            target="_blank"
                            className="text-stone-600 hover:text-stone-900 p-1"
                            title="Preview Template"
                          >
                            <Eye className="w-4 h-4 inline" />
                          </Link>
                          <button
                            onClick={() => handleDeleteTemplate(tpl.id, tpl.name)}
                            className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ALL INVITATIONS */}
          {activeTab === 'invitations' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900">
                  Seluruh Undangan Pengguna Platform
                </h2>
                <p className="text-xs text-stone-500">
                  Monitoring konten, status publikasi, dan traffic undangan pernikahan.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Undangan</th>
                      <th className="py-3 px-4">Pemilik (User ID)</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Views</th>
                      <th className="py-3 px-4">RSVP</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {invitationsList.map((inv) => (
                      <tr key={inv.id} className="hover:bg-stone-50/50">
                        <td className="py-3 px-4">
                          <span className="font-bold text-stone-900 block">{inv.title}</span>
                          <span className="text-[11px] text-stone-400 font-mono">
                            /invitation/{inv.slug}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-600 font-mono text-[11px]">
                          {inv.user_id}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              inv.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-700 font-medium">{inv.views_count || 0}</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">{inv.rsvps?.length || 0}</td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <Link
                            href={`/invitation/${inv.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-purple-700 hover:underline font-semibold"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Buka</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900">
                  Daftar Pengguna & Manajemen Role
                </h2>
                <p className="text-xs text-stone-500">
                  Kelola hak akses pengguna: Guest, Customer, atau Admin.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Pengguna</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role Saat Ini</th>
                      <th className="py-3 px-4 text-right">Ubah Hak Akses</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {usersList.map((usr) => (
                      <tr key={usr.id} className="hover:bg-stone-50/50">
                        <td className="py-3 px-4 font-bold text-stone-900">{usr.full_name}</td>
                        <td className="py-3 px-4 text-stone-600 font-mono text-[11px]">{usr.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              usr.role === 'admin'
                                ? 'bg-purple-100 text-purple-800'
                                : usr.role === 'customer'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {usr.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <select
                            value={usr.role}
                            onChange={(e) => handleRoleChange(usr.id, e.target.value as UserRole)}
                            className="px-2.5 py-1 rounded-lg border border-stone-300 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-purple-600"
                          >
                            <option value="guest">Guest</option>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm max-w-2xl space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900">
                  Pengaturan Platform Digital
                </h2>
                <p className="text-xs text-stone-500">
                  Konfigurasi nama layanan dan operasional aplikasi.
                </p>
              </div>

              {settingsSaved && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Pengaturan platform berhasil diperbarui!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nama Platform
                  </label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email Kontak & Support
                  </label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="font-semibold">Aktifkan Mode Pemeliharaan (Maintenance Mode)</span>
                  </label>
                  <p className="text-[11px] text-stone-500 mt-1 pl-6">
                    Bila aktif, pengunjung umum akan melihat pemberitahuan pemeliharaan sistem.
                  </p>
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
                >
                  Simpan Pengaturan
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Modal: Tambah Template Baru */}
      {newTemplateModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">
              Tambah Template Baru
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Daftarkan desain template baru ke katalog publik.
            </p>

            <form onSubmit={handleCreateTemplate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nama Template
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ivory Elegance"
                  value={tplName}
                  onChange={(e) => {
                    setTplName(e.target.value);
                    if (!tplSlug) {
                      setTplSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Slug Template
                </label>
                <input
                  type="text"
                  required
                  placeholder="ivory-elegance"
                  value={tplSlug}
                  onChange={(e) => setTplSlug(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Gaya Layout Renderer
                </label>
                <select
                  value={tplLayout}
                  onChange={(e) => setTplLayout(e.target.value as 'editorial' | 'botanical' | 'royal' | 'celestial')}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                >
                  <option value="editorial">Editorial (Modern Minimalist)</option>
                  <option value="botanical">Botanical (Sage Romance)</option>
                  <option value="royal">Royal (Keraton Heritage Gold)</option>
                  <option value="celestial">Celestial (Dark Starlight Glamour)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Thumbnail Image URL
                </label>
                <input
                  type="text"
                  required
                  value={tplThumb}
                  onChange={(e) => setTplThumb(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Deskripsi Template
                </label>
                <textarea
                  rows={2}
                  value={tplDesc}
                  onChange={(e) => setTplDesc(e.target.value)}
                  placeholder="Deskripsi singkat keunikan template..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewTemplateModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold"
                >
                  Simpan Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

