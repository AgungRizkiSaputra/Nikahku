import {
  TemplateCategory,
  Template,
  UserProfile,
  Invitation,
  RSVP,
  Wish,
  Guest,
  PlatformStats,
  UserRole,
} from '@/types';
import {
  INITIAL_CATEGORIES,
  INITIAL_TEMPLATES,
  DEMO_USERS,
  INITIAL_INVITATIONS,
} from './mock-data';
import { supabase, isSupabaseConfigured } from '../supabase/client';

const STORAGE_KEYS = {
  CATEGORIES: 'pwi_categories',
  TEMPLATES: 'pwi_templates',
  USERS: 'pwi_users',
  INVITATIONS: 'pwi_invitations',
};

// Safe local storage helpers
function getLocal<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocal<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to set localStorage', err);
  }
}

// In-memory fallback if server-side or localStorage disabled
let memoryCategories = [...INITIAL_CATEGORIES];
let memoryTemplates = [...INITIAL_TEMPLATES];
let memoryUsers = [...DEMO_USERS];
let memoryInvitations = [...INITIAL_INVITATIONS];

export const storageAdapter = {
  // ================= CATEGORIES =================
  async getCategories(): Promise<TemplateCategory[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('template_categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
    const local = getLocal<TemplateCategory[]>(STORAGE_KEYS.CATEGORIES, memoryCategories);
    if (!local.length) {
      setLocal(STORAGE_KEYS.CATEGORIES, memoryCategories);
      return memoryCategories;
    }
    return local;
  },

  async createCategory(cat: Omit<TemplateCategory, 'id' | 'created_at'>): Promise<TemplateCategory> {
    const newCat: TemplateCategory = {
      ...cat,
      id: 'cat-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    if (isSupabaseConfigured && supabase) {
      await supabase.from('template_categories').insert(newCat);
    }
    const current = await this.getCategories();
    const updated = [...current, newCat];
    memoryCategories = updated;
    setLocal(STORAGE_KEYS.CATEGORIES, updated);
    return newCat;
  },

  // ================= TEMPLATES =================
  async getTemplates(onlyActive = true): Promise<Template[]> {
    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('templates').select('*');
      if (onlyActive) query = query.eq('is_active', true);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    }
    const local = getLocal<Template[]>(STORAGE_KEYS.TEMPLATES, memoryTemplates);
    if (!local.length) {
      setLocal(STORAGE_KEYS.TEMPLATES, memoryTemplates);
      return onlyActive ? memoryTemplates.filter((t) => t.is_active) : memoryTemplates;
    }
    return onlyActive ? local.filter((t) => t.is_active) : local;
  },

  async getTemplateBySlug(slug: string): Promise<Template | null> {
    const templates = await this.getTemplates(false);
    return templates.find((t) => t.slug === slug) || null;
  },

  async getTemplateById(id: string): Promise<Template | null> {
    const templates = await this.getTemplates(false);
    return templates.find((t) => t.id === id) || null;
  },

  async createTemplate(templateData: Omit<Template, 'id' | 'created_at' | 'updated_at'>): Promise<Template> {
    const newTemplate: Template = {
      ...templateData,
      id: 'tpl-' + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    if (isSupabaseConfigured && supabase) {
      await supabase.from('templates').insert(newTemplate);
    }
    const current = await this.getTemplates(false);
    const updated = [newTemplate, ...current];
    memoryTemplates = updated;
    setLocal(STORAGE_KEYS.TEMPLATES, updated);
    return newTemplate;
  },

  async updateTemplate(id: string, updates: Partial<Template>): Promise<Template | null> {
    const current = await this.getTemplates(false);
    const index = current.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const updated = {
      ...current[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    current[index] = updated;

    if (isSupabaseConfigured && supabase) {
      await supabase.from('templates').update(updates).eq('id', id);
    }
    memoryTemplates = current;
    setLocal(STORAGE_KEYS.TEMPLATES, current);
    return updated;
  },

  async deleteTemplate(id: string): Promise<boolean> {
    const current = await this.getTemplates(false);
    const filtered = current.filter((t) => t.id !== id);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('templates').delete().eq('id', id);
    }
    memoryTemplates = filtered;
    setLocal(STORAGE_KEYS.TEMPLATES, filtered);
    return true;
  },

  // ================= INVITATIONS =================
  async getInvitations(userId?: string, role: UserRole = 'customer'): Promise<Invitation[]> {
    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('invitations').select('*, content:invitation_content(*)');
      if (role !== 'admin' && userId) {
        query = query.eq('user_id', userId);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data;
    }

    const local = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, memoryInvitations);

    // Auto-sync missing demo invitations from INITIAL_INVITATIONS into local storage
    const localSlugs = new Set(local.map((i) => i.slug.toLowerCase()));
    let hasMerged = false;
    const merged = [...local];
    for (const initInv of INITIAL_INVITATIONS) {
      if (!localSlugs.has(initInv.slug.toLowerCase())) {
        merged.push(initInv);
        hasMerged = true;
      }
    }
    if (hasMerged) {
      memoryInvitations = merged;
      setLocal(STORAGE_KEYS.INVITATIONS, merged);
    }

    if (role === 'admin') {
      return merged;
    }
    if (userId) {
      return merged.filter((inv) => inv.user_id === userId);
    }
    return merged;
  },

  async getInvitationBySlug(slug: string): Promise<Invitation | null> {
    const cleanSlug = slug.toLowerCase().trim();
    const all = await this.getInvitations(undefined, 'admin');
    
    // 1. Direct slug match in saved invitations
    let invitation = all.find((inv) => inv.slug.toLowerCase() === cleanSlug);

    // 2. Direct slug match in INITIAL_INVITATIONS fallback
    if (!invitation) {
      invitation = INITIAL_INVITATIONS.find((inv) => inv.slug.toLowerCase() === cleanSlug) || undefined;
    }

    // 3. Fallback match by template ID or template slug (e.g. tpl-2 or botanica-garden)
    if (!invitation) {
      invitation = all.find(
        (inv) =>
          inv.template_id === cleanSlug ||
          inv.template?.slug.toLowerCase() === cleanSlug
      );
    }
    if (!invitation) {
      invitation = INITIAL_INVITATIONS.find(
        (inv) =>
          inv.template_id === cleanSlug ||
          inv.slug.toLowerCase().includes(cleanSlug) ||
          cleanSlug.includes(inv.slug.toLowerCase())
      );
    }

    if (!invitation) return null;

    // Attach template if not present
    if (!invitation.template) {
      invitation.template = (await this.getTemplateById(invitation.template_id)) || undefined;
    }
    return invitation;
  },

  async getInvitationById(id: string): Promise<Invitation | null> {
    const all = await this.getInvitations(undefined, 'admin');
    const invitation = all.find((inv) => inv.id === id);
    if (!invitation) return null;
    if (!invitation.template) {
      invitation.template = (await this.getTemplateById(invitation.template_id)) || undefined;
    }
    return invitation;
  },

  async createInvitation(payload: {
    userId: string;
    templateId: string;
    title: string;
    slug: string;
    eventDate: string;
    content: Invitation['content'];
  }): Promise<Invitation> {
    const template = await this.getTemplateById(payload.templateId);
    const newInvitation: Invitation = {
      id: 'inv-' + Date.now(),
      user_id: payload.userId,
      template_id: payload.templateId,
      template: template || undefined,
      title: payload.title,
      slug: payload.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      status: 'draft',
      event_date: payload.eventDate,
      views_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      content: payload.content,
      gallery: [],
      rsvps: [],
      wishes: [],
      guests: [],
    };

    if (isSupabaseConfigured && supabase) {
      await supabase.from('invitations').insert(newInvitation);
    }

    const all = await this.getInvitations(undefined, 'admin');
    const updated = [newInvitation, ...all];
    memoryInvitations = updated;
    setLocal(STORAGE_KEYS.INVITATIONS, updated);
    return newInvitation;
  },

  async updateInvitation(id: string, updates: Partial<Invitation>): Promise<Invitation | null> {
    const all = await this.getInvitations(undefined, 'admin');
    const index = all.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const updated: Invitation = {
      ...all[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    if (updates.template_id && updates.template_id !== all[index].template_id) {
      updated.template = (await this.getTemplateById(updates.template_id)) || undefined;
    }

    all[index] = updated;

    if (isSupabaseConfigured && supabase) {
      await supabase.from('invitations').update(updates).eq('id', id);
    }

    memoryInvitations = all;
    setLocal(STORAGE_KEYS.INVITATIONS, all);
    return updated;
  },

  async deleteInvitation(id: string): Promise<boolean> {
    const all = await this.getInvitations(undefined, 'admin');
    const filtered = all.filter((i) => i.id !== id);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('invitations').delete().eq('id', id);
    }
    memoryInvitations = filtered;
    setLocal(STORAGE_KEYS.INVITATIONS, filtered);
    return true;
  },

  async incrementViews(slug: string): Promise<void> {
    const inv = await this.getInvitationBySlug(slug);
    if (!inv) return;
    await this.updateInvitation(inv.id, {
      views_count: (inv.views_count || 0) + 1,
    });
  },

  // ================= RSVPS =================
  async submitRSVP(payload: Omit<RSVP, 'id' | 'created_at'>): Promise<RSVP> {
    const newRsvp: RSVP = {
      ...payload,
      id: 'rsvp-' + Date.now(),
      created_at: new Date().toISOString(),
    };

    const inv = await this.getInvitationById(payload.invitation_id);
    if (inv) {
      const currentRsvps = inv.rsvps || [];
      await this.updateInvitation(inv.id, {
        rsvps: [newRsvp, ...currentRsvps],
      });
    }

    if (isSupabaseConfigured && supabase) {
      await supabase.from('rsvps').insert(newRsvp);
    }

    return newRsvp;
  },

  // ================= WISHES =================
  async submitWish(payload: Omit<Wish, 'id' | 'created_at'>): Promise<Wish> {
    const newWish: Wish = {
      ...payload,
      id: 'wsh-' + Date.now(),
      created_at: new Date().toISOString(),
    };

    const inv = await this.getInvitationById(payload.invitation_id);
    if (inv) {
      const currentWishes = inv.wishes || [];
      await this.updateInvitation(inv.id, {
        wishes: [newWish, ...currentWishes],
      });
    }

    if (isSupabaseConfigured && supabase) {
      await supabase.from('wishes').insert(newWish);
    }

    return newWish;
  },

  // ================= GUESTS =================
  async addGuest(payload: Omit<Guest, 'id' | 'created_at'>): Promise<Guest> {
    const newGuest: Guest = {
      ...payload,
      id: 'gst-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const inv = await this.getInvitationById(payload.invitation_id);
    if (inv) {
      const currentGuests = inv.guests || [];
      await this.updateInvitation(inv.id, {
        guests: [newGuest, ...currentGuests],
      });
    }
    return newGuest;
  },

  async deleteGuest(invitationId: string, guestId: string): Promise<boolean> {
    const inv = await this.getInvitationById(invitationId);
    if (!inv) return false;
    const filtered = (inv.guests || []).filter((g) => g.id !== guestId);
    await this.updateInvitation(invitationId, { guests: filtered });
    return true;
  },

  // ================= USERS =================
  async getUsers(): Promise<UserProfile[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('profiles').select('*');
      if (!error && data) return data;
    }
    const local = getLocal<UserProfile[]>(STORAGE_KEYS.USERS, memoryUsers);
    if (!local.length) {
      setLocal(STORAGE_KEYS.USERS, memoryUsers);
      return memoryUsers;
    }
    return local;
  },

  async updateUserRole(userId: string, role: UserRole): Promise<UserProfile | null> {
    const users = await this.getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) return null;
    users[index].role = role;
    users[index].updated_at = new Date().toISOString();

    if (isSupabaseConfigured && supabase) {
      await supabase.from('profiles').update({ role }).eq('id', userId);
    }

    memoryUsers = users;
    setLocal(STORAGE_KEYS.USERS, users);
    return users[index];
  },

  // ================= PLATFORM STATS =================
  async getPlatformStats(): Promise<PlatformStats> {
    const users = await this.getUsers();
    const invitations = await this.getInvitations(undefined, 'admin');

    const totalPublished = invitations.filter((i) => i.status === 'published').length;
    const totalViews = invitations.reduce((acc, curr) => acc + (curr.views_count || 0), 0);
    const totalRsvps = invitations.reduce((acc, curr) => acc + (curr.rsvps?.length || 0), 0);
    const totalWishes = invitations.reduce((acc, curr) => acc + (curr.wishes?.length || 0), 0);

    return {
      totalUsers: users.length,
      totalInvitations: invitations.length,
      totalPublished,
      totalRsvps,
      totalWishes,
      totalViews,
    };
  },
};

