-- ==============================================================================
-- DIGITAL WEDDING INVITATION PLATFORM - DATABASE SCHEMA
-- ==============================================================================

-- 1. ENUMS & EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Role enum
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('guest', 'customer', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Invitation status enum
DO $$ BEGIN
  CREATE TYPE invitation_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Attendance status enum
DO $$ BEGIN
  CREATE TYPE rsvp_attendance AS ENUM ('attending', 'not_attending', 'uncertain');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  role user_role DEFAULT 'customer'::user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. TEMPLATE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.template_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES public.template_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  thumbnail_url TEXT NOT NULL,
  preview_url TEXT,
  theme_config JSONB DEFAULT '{}'::jsonb NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  is_featured BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. INVITATIONS TABLE
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES public.templates(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  status invitation_status DEFAULT 'draft'::invitation_status NOT NULL,
  event_date DATE,
  views_count INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. INVITATION CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.invitation_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID UNIQUE NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  
  -- Groom Info
  groom_name TEXT NOT NULL,
  groom_nickname TEXT NOT NULL,
  groom_father TEXT,
  groom_mother TEXT,
  groom_photo TEXT,
  groom_instagram TEXT,
  
  -- Bride Info
  bride_name TEXT NOT NULL,
  bride_nickname TEXT NOT NULL,
  bride_father TEXT,
  bride_mother TEXT,
  bride_photo TEXT,
  bride_instagram TEXT,
  
  -- Quote / Ayat
  quote TEXT,
  quote_source TEXT,
  
  -- Styling & Audio
  primary_color TEXT DEFAULT '#8B5E3C',
  font_family TEXT DEFAULT 'Playfair Display',
  music_url TEXT,
  custom_css TEXT,
  theme_override JSONB DEFAULT '{}'::jsonb,
  
  -- Events (Akad, Resepsi, etc. in structured JSON)
  events JSONB DEFAULT '[]'::jsonb NOT NULL,
  
  -- Love Stories (Timeline array: title, date, story, image)
  love_stories JSONB DEFAULT '[]'::jsonb NOT NULL,
  
  -- Bank Accounts & Gifts (array: bank_name, account_number, account_holder, qris_url)
  bank_accounts JSONB DEFAULT '[]'::jsonb NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. INVITATION GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.invitation_gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. GUESTS TABLE (Daftar Tamu Khusus Pemilik Undangan)
CREATE TABLE IF NOT EXISTS public.guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  category TEXT DEFAULT 'Umum',
  slug TEXT,
  attendance_status rsvp_attendance DEFAULT 'uncertain'::rsvp_attendance,
  qr_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. RSVPS TABLE (Konfirmasi Kehadiran Pengunjung)
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  attendance rsvp_attendance NOT NULL,
  guest_count INT DEFAULT 1 NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. WISHES TABLE (Ucapan & Doa)
CREATE TABLE IF NOT EXISTS public.wishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL,
  relationship TEXT DEFAULT 'Teman',
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 11. INVITATION VISITS TABLE (Statistik Kunjungan)
CREATE TABLE IF NOT EXISTS public.invitation_visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  ip_hash TEXT,
  user_agent TEXT,
  referer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON public.invitations(slug);
CREATE INDEX IF NOT EXISTS idx_invitations_user ON public.invitations(user_id);
CREATE INDEX IF NOT EXISTS idx_invitations_template ON public.invitations(template_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_invitation ON public.rsvps(invitation_id);
CREATE INDEX IF NOT EXISTS idx_wishes_invitation ON public.wishes(invitation_id);
CREATE INDEX IF NOT EXISTS idx_guests_invitation ON public.guests(invitation_id);
CREATE INDEX IF NOT EXISTS idx_visits_invitation ON public.invitation_visits(invitation_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_visits ENABLE ROW LEVEL SECURITY;

-- Helper to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles:
-- Users can view their own profile; admins can view all.
CREATE POLICY "Profiles view policy" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Profiles update policy" ON public.profiles
  FOR UPDATE USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Profiles insert policy" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id OR public.is_admin());

-- Template Categories:
-- Everyone can read categories; only admins can insert/update/delete.
CREATE POLICY "Template categories select policy" ON public.template_categories
  FOR SELECT USING (true);

CREATE POLICY "Template categories admin write" ON public.template_categories
  FOR ALL USING (public.is_admin());

-- Templates:
-- Everyone can read active templates (or admins can read all); only admins can mutate.
CREATE POLICY "Templates public select policy" ON public.templates
  FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Templates admin write policy" ON public.templates
  FOR ALL USING (public.is_admin());

-- Invitations:
-- Public can read 'published' invitations; owners and admins can read/write their invitations.
CREATE POLICY "Invitations select policy" ON public.invitations
  FOR SELECT USING (
    status = 'published'
    OR auth.uid() = user_id
    OR public.is_admin()
  );

CREATE POLICY "Invitations insert policy" ON public.invitations
  FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Invitations update policy" ON public.invitations
  FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Invitations delete policy" ON public.invitations
  FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

-- Invitation Content:
-- Selectable if invitation is published OR user is owner OR user is admin.
CREATE POLICY "Invitation content select policy" ON public.invitation_content
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.invitations i
      WHERE i.id = invitation_id
      AND (i.status = 'published' OR i.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Invitation content write policy" ON public.invitation_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.invitations i
      WHERE i.id = invitation_id
      AND (i.user_id = auth.uid() OR public.is_admin())
    )
  );

-- Gallery:
CREATE POLICY "Gallery select policy" ON public.invitation_gallery
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.invitations i
      WHERE i.id = invitation_id
      AND (i.status = 'published' OR i.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Gallery write policy" ON public.invitation_gallery
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.invitations i
      WHERE i.id = invitation_id
      AND (i.user_id = auth.uid() OR public.is_admin())
    )
  );

-- Guests (Private to owner & admin):
CREATE POLICY "Guests access policy" ON public.guests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.invitations i
      WHERE i.id = invitation_id
      AND (i.user_id = auth.uid() OR public.is_admin())
    )
  );

-- RSVPs:
-- Anyone can insert RSVP for a published invitation; owners and admins can view and delete.
CREATE POLICY "RSVPs select policy" ON public.rsvps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.invitations i
      WHERE i.id = invitation_id
      AND (i.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "RSVPs insert policy" ON public.rsvps
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.invitations i
      WHERE i.id = invitation_id AND i.status = 'published'
    )
  );

-- Wishes:
-- Anyone can read approved wishes on published invitations; anyone can insert wishes; owner/admin can moderate.
CREATE POLICY "Wishes select policy" ON public.wishes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.invitations i
      WHERE i.id = invitation_id
      AND (i.status = 'published' OR i.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Wishes insert policy" ON public.wishes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.invitations i
      WHERE i.id = invitation_id AND i.status = 'published'
    )
  );

CREATE POLICY "Wishes manage policy" ON public.wishes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.invitations i
      WHERE i.id = invitation_id
      AND (i.user_id = auth.uid() OR public.is_admin())
    )
  );

-- Visits:
CREATE POLICY "Visits insert policy" ON public.invitation_visits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Visits select policy" ON public.invitation_visits
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.invitations i
      WHERE i.id = invitation_id
      AND (i.user_id = auth.uid() OR public.is_admin())
    )
  );

-- ==============================================================================
-- TRIGGER FOR AUTOMATIC PROFILE CREATION ON USER SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer'::user_role)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

