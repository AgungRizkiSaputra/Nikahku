-- ==============================================================================
-- DIGITAL WEDDING INVITATION PLATFORM - SEED DATA
-- ==============================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.template_categories (id, name, slug, description, icon, sort_order)
VALUES 
  ('11111111-1111-1111-1111-111111111101', 'Modern & Minimalist', 'modern-minimalist', 'Desain bersih, tipografi editorial elegan, dan whitespace harmonis.', 'Sparkles', 1),
  ('11111111-1111-1111-1111-111111111102', 'Floral & Botanical', 'floral-botanical', 'Sentuhan dedaunan asri, bunga cat air lembut, dan nuansa romantis.', 'Flower2', 2),
  ('11111111-1111-1111-1111-111111111103', 'Traditional & Heritage', 'traditional-heritage', 'Keagungan ornamen batik nusantara, sentuhan aksen emas kerajaan.', 'Crown', 3),
  ('11111111-1111-1111-1111-111111111104', 'Dark & Celestial', 'dark-celestial', 'Nuansa malam berbintang bertabur kilau emas, mewah dan dramatis.', 'Moon', 4)
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED TEMPLATES
INSERT INTO public.templates (id, category_id, name, slug, description, thumbnail_url, theme_config, is_active, is_featured)
VALUES
  (
    '22222222-2222-2222-2222-222222222201',
    '11111111-1111-1111-1111-111111111101',
    'Lumière Editorial',
    'lumiere-editorial',
    'Gaya editorial majalah high-fashion dengan garis tegas, warna warm sand, dan tipografi serif modern.',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    '{
      "layout": "editorial",
      "fontHeading": "Playfair Display",
      "fontBody": "Plus Jakarta Sans",
      "primaryColor": "#997A5B",
      "accentColor": "#F4EFEA",
      "cardBg": "#FFFFFF",
      "textColor": "#2B2625"
    }'::jsonb,
    true,
    true
  ),
  (
    '22222222-2222-2222-2222-222222222202',
    '11111111-1111-1111-1111-111111111102',
    'Botanica Garden Romance',
    'botanica-garden',
    'Suasana romantis taman musim semi dengan ornamen dedaunan sage lembut, mawar blush, dan lengkungan klasik.',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
    '{
      "layout": "botanical",
      "fontHeading": "Cormorant Garamond",
      "fontBody": "Plus Jakarta Sans",
      "primaryColor": "#5C715E",
      "accentColor": "#F0E9DF",
      "cardBg": "#FBF9F5",
      "textColor": "#2E3B30"
    }'::jsonb,
    true,
    true
  ),
  (
    '22222222-2222-2222-2222-222222222203',
    '11111111-1111-1111-1111-111111111103',
    'Keraton Royal Heritage',
    'keraton-royal',
    'Aura sakral dan kemewahan adat nusantara dengan motif batik prada emas, bingkai songket, dan palet cokelat sogan.',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80',
    '{
      "layout": "royal",
      "fontHeading": "Cinzel",
      "fontBody": "Plus Jakarta Sans",
      "primaryColor": "#B38B3F",
      "accentColor": "#241914",
      "cardBg": "#1C1410",
      "textColor": "#F3EAD7"
    }'::jsonb,
    true,
    true
  ),
  (
    '22222222-2222-2222-2222-222222222204',
    '11111111-1111-1111-1111-111111111104',
    'Midnight Starlight',
    'midnight-starlight',
    'Keindahan malam berbintang dengan efek glassmorphism, latar biru gelap kristal, dan aksen emas berkilauan.',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&auto=format&fit=crop&q=80',
    '{
      "layout": "celestial",
      "fontHeading": "Playfair Display",
      "fontBody": "Plus Jakarta Sans",
      "primaryColor": "#E2B86E",
      "accentColor": "#0F172A",
      "cardBg": "rgba(30, 41, 59, 0.7)",
      "textColor": "#F8FAFC"
    }'::jsonb,
    true,
    false
  )
ON CONFLICT (slug) DO NOTHING;

