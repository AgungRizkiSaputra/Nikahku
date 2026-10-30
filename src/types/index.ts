export type UserRole = 'guest' | 'customer' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sort_order: number;
  created_at: string;
}

export interface ThemeConfig {
  layout: 'editorial' | 'botanical' | 'royal' | 'celestial';
  fontHeading: string;
  fontBody: string;
  primaryColor: string;
  accentColor: string;
  cardBg: string;
  textColor: string;
}

export interface Template {
  id: string;
  category_id?: string;
  category?: TemplateCategory;
  name: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  preview_url?: string;
  theme_config: ThemeConfig;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export type InvitationStatus = 'draft' | 'published' | 'archived';

export interface EventDetail {
  id: string;
  title: string; // e.g. "Akad Nikah", "Pemberkatan", "Resepsi Malam"
  date: string; // YYYY-MM-DD
  startTime: string; // "09:00"
  endTime: string; // "11:00" or "Selesai"
  timezone: string; // "WIB", "WITA", "WIT"
  venueName: string;
  address: string;
  mapsUrl: string;
  notes?: string;
}

export interface LoveStory {
  id: string;
  year: string;
  title: string;
  story: string;
  image?: string;
}

export interface BankAccount {
  id: string;
  bankName: string; // "BCA", "Mandiri", "BRI", "BSI", etc.
  accountNumber: string;
  accountHolder: string;
  qrisUrl?: string;
}

export interface InvitationContent {
  id?: string;
  invitation_id?: string;
  
  // Groom
  groom_name: string;
  groom_nickname: string;
  groom_father: string;
  groom_mother: string;
  groom_photo: string;
  groom_instagram?: string;
  
  // Bride
  bride_name: string;
  bride_nickname: string;
  bride_father: string;
  bride_mother: string;
  bride_photo: string;
  bride_instagram?: string;
  
  // Quote
  quote: string;
  quote_source: string;
  
  // Customization
  primary_color: string;
  font_family: string;
  music_url: string;
  custom_css?: string;
  theme_override?: Partial<ThemeConfig>;
  
  // Lists
  events: EventDetail[];
  love_stories: LoveStory[];
  bank_accounts: BankAccount[];
}

export interface InvitationGalleryItem {
  id: string;
  invitation_id: string;
  image_url: string;
  caption?: string;
  sort_order: number;
}

export type RsvpAttendance = 'attending' | 'not_attending' | 'uncertain';

export interface Guest {
  id: string;
  invitation_id: string;
  name: string;
  phone?: string;
  email?: string;
  category: string;
  slug?: string;
  attendance_status: RsvpAttendance;
  created_at: string;
}

export interface RSVP {
  id: string;
  invitation_id: string;
  guest_name: string;
  attendance: RsvpAttendance;
  guest_count: number;
  notes?: string;
  created_at: string;
}

export interface Wish {
  id: string;
  invitation_id: string;
  sender_name: string;
  relationship: string;
  message: string;
  is_approved: boolean;
  created_at: string;
}

export interface InvitationVisit {
  id: string;
  invitation_id: string;
  ip_hash?: string;
  user_agent?: string;
  referer?: string;
  created_at: string;
}

export interface Invitation {
  id: string;
  user_id: string;
  template_id: string;
  template?: Template;
  title: string;
  slug: string;
  status: InvitationStatus;
  event_date: string;
  views_count: number;
  created_at: string;
  updated_at: string;
  
  // Joined relations
  content?: InvitationContent;
  gallery?: InvitationGalleryItem[];
  rsvps?: RSVP[];
  wishes?: Wish[];
  guests?: Guest[];
  user_profile?: UserProfile;
}

export interface PlatformStats {
  totalUsers: number;
  totalInvitations: number;
  totalPublished: number;
  totalRsvps: number;
  totalWishes: number;
  totalViews: number;
}

