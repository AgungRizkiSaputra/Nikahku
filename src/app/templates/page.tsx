'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Template, TemplateCategory } from '@/types';
import { storageAdapter } from '@/lib/storage/storage-adapter';
import { useAuth } from '@/lib/auth-context';
import {
  Sparkles,
  Search,
  Eye,
  ArrowRight,
  ExternalLink,
  X,
  Smartphone,
  Monitor,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/auth/AuthModal';

export default function TemplatesPage() {
  const router = useRouter();
  const { role } = useAuth();

  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Preview modal state
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [previewViewport, setPreviewViewport] = useState<'mobile' | 'desktop'>('mobile');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, tpls] = await Promise.all([
          storageAdapter.getCategories(),
          storageAdapter.getTemplates(true),
        ]);
        setCategories(cats);
        setTemplates(tpls);
      } catch (err) {
        console.error('Error loading templates:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredTemplates = templates.filter((tpl) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      tpl.category_id === selectedCategory ||
      tpl.slug.includes(selectedCategory);
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (template: Template) => {
    if (role === 'guest') {
      setAuthModalOpen(true);
      return;
    }
    router.push(`/dashboard/invitations/create?templateId=${template.id}`);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#FAF7F2] pb-24 text-[#181B19]">
        {/* Header Section: Flat Rich Ground */}
        <div className="bg-[#181B19] text-[#FAF7F2] py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">
              Katalog Desain Undangan
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Empat karakter desain berstandar seni grafis untuk mengabadikan hari sakral pernikahan Anda.
            </p>

            {/* Search Bar */}
            <div className="pt-4 max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari tema (misal: Editorial, Botanical, Heritage)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded bg-stone-850 text-white placeholder-stone-400 text-xs sm:text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Filter Categories: Flat Tone Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-[#F2EEE7] p-2 rounded flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#181B19] text-white'
                  : 'text-stone-700 hover:bg-[#E8E2D7]'
              }`}
            >
              Semua Koleksi ({templates.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#181B19] text-white'
                    : 'text-stone-700 hover:bg-[#E8E2D7]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          {loading ? (
            <div className="py-20 text-center text-stone-500 text-sm">
              Memuat koleksi template...
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="py-20 text-center bg-[#F2EEE7] rounded p-8 max-w-md mx-auto">
              <p className="text-base font-serif font-bold text-stone-800 mb-1">
                Tidak ada template ditemukan
              </p>
              <p className="text-xs text-stone-500 mb-4">
                Coba sesuaikan kata kunci pencarian atau pilih kategori lain.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs font-semibold text-[#947141] underline cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-[#F2EEE7] rounded-2xl overflow-hidden flex flex-col justify-between border border-[#E2DDD3] transition-colors hover:border-[#947141]/50"
                >
                  {/* Thumbnail Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                    <img
                      src={template.thumbnail_url}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-3 left-3 bg-[#181B19] text-white text-[10px] tracking-wide px-2.5 py-1 rounded">
                      {template.theme_config.layout.toUpperCase()} STYLE
                    </div>

                    {template.is_featured && (
                      <div className="absolute top-3 right-3 bg-[#947141] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        UNGGULAN
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] text-[#947141] font-semibold">
                          Karakter Tipografi: {template.theme_config.fontHeading}
                        </span>
                        <div className="flex items-center gap-1 ml-auto">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: template.theme_config.primaryColor }}
                            title="Primary Color"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: template.theme_config.accentColor }}
                            title="Accent Color"
                          />
                        </div>
                      </div>

                      <h2 className="text-xl font-serif font-bold text-[#181B19] mb-1">
                        {template.name}
                      </h2>

                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                        {template.description}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPreviewTemplate(template)}
                          className="text-xs font-semibold text-stone-800 hover:text-[#947141] flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Pratinjau</span>
                        </button>
                        <span className="text-stone-300">|</span>
                        <Link
                          href={`/invitation/${template.slug}`}
                          target="_blank"
                          className="text-xs font-medium text-stone-600 hover:text-[#947141] flex items-center gap-1"
                          title="Buka demo langsung di tab baru"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Tab Baru</span>
                        </Link>
                      </div>

                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded bg-[#947141] hover:bg-[#7D5E34] text-white text-xs font-semibold cursor-pointer transition-colors"
                      >
                        <span>Pilih Template</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Interactive Live Demo Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 flex flex-col">
          {/* Modal Header */}
          <div className="bg-[#181B19] text-white px-6 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-serif font-bold text-base text-[#D4AF37]">
                {previewTemplate.name}
              </span>
              <span className="text-xs text-stone-400 hidden sm:inline">
                ({previewTemplate.theme_config.layout} layout)
              </span>
            </div>

            {/* Device Viewport Toggle */}
            <div className="hidden sm:flex items-center bg-stone-800 rounded p-1">
              <button
                onClick={() => setPreviewViewport('mobile')}
                className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                  previewViewport === 'mobile'
                    ? 'bg-[#947141] text-white font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
              <button
                onClick={() => setPreviewViewport('desktop')}
                className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                  previewViewport === 'desktop'
                    ? 'bg-[#947141] text-white font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href={`/invitation/${previewTemplate.slug}`}
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
                title="Buka tampilan penuh di jendela baru"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka Tab Baru</span>
              </Link>

              <button
                onClick={() => {
                  const tpl = previewTemplate;
                  setPreviewTemplate(null);
                  handleUseTemplate(tpl);
                }}
                className="py-1.5 px-4 rounded bg-[#947141] hover:bg-[#7D5E34] text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Pilih Template Ini
              </button>

              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1 rounded text-stone-400 hover:text-white cursor-pointer"
                aria-label="Tutup pratinjau"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Preview Body */}
          <div className="flex-1 overflow-hidden flex items-center justify-center p-2 sm:p-6 bg-stone-950">
            <div
              className={`h-full rounded-2xl overflow-hidden bg-white ${
                previewViewport === 'mobile'
                  ? 'w-[390px] max-h-[844px] ring-4 ring-stone-800'
                  : 'w-full max-w-5xl'
              }`}
            >
              <iframe
                src={`/invitation/${previewTemplate.slug}`}
                title="Preview"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode="register"
      />

      <Footer />
    </>
  );
}
