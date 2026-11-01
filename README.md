# Digital Wedding Invitation Platform

## ✨ Overview
A premium‑grade web platform that lets couples create, customise and share beautiful digital wedding invitations.  The system provides three user roles (Guest, Customer, Admin) with strict server‑side permission checks, a gallery of distinct invitation templates, a live editor, and a public invitation page that can be shared via a unique URL.

---

## 🛠️ Tech Stack
| Layer | Technology |
|-------|------------|
| **Framework** | **Next.js 14** (React 18, App Router) – TypeScript powered, server‑components for SEO‑friendly rendering |
| **Styling** | **Tailwind CSS** – utility‑first, fully customisable design system |
| **Auth & DB** | **Supabase** – Authentication, PostgreSQL, Storage, Row‑Level Security (RLS) |
| **State Management** | React Context + SWR (data fetching) |
| **Build / Deploy** | `npm run build`, `npm run start` (or Vercel / Netlify) |
| **Testing** | Jest + React Testing Library (optional) |
| **Linting / Formatting** | ESLint, Prettier, Design‑Taste Frontend lint (enforces premium UI rules) |

---

## 📂 Project Structure (key folders)
```
src/
 ├─ app/                # Next.js App Router pages
 │   ├─ layout.tsx      # Global layout (auth provider, header)
 │   ├─ page.tsx        # Landing page – template gallery
 │   └─ templates/
 │        └─ page.tsx    # Template showcase & demo modal
 ├─ components/         # Re‑usable UI components
 │   ├─ common/          # Navbar, Footer, AuthModal …
 │   └─ templates/layouts/  # Four invitation template layouts
 ├─ lib/                # Helpers, Supabase client, storage adapter
 └─ styles/             # Tailwind config & global CSS
```

---

## 🚀 Getting Started
1. **Install dependencies** (already run in the workspace):
   ```bash
   npm install
   ```
2. **Configure Supabase**
   - Create a project at https://app.supabase.com.
   - Copy the `SUPABASE_URL` and `SUPABASE_ANON_KEY` into a `.env.local` file:
     ```dotenv
     NEXT_PUBLIC_SUPABASE_URL=your‑supabase‑url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your‑anon‑key
     ```
   - Run the SQL schema located at `supabase/schema.sql` (contains tables: `profiles`, `templates`, `template_categories`, `invitations`, `invitation_content`, `invitation_gallery`, `guests`, `rsvps`, `wishes`, `invitation_visits`).
3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open <http://localhost:3000>.
4. **Build for production**
   ```bash
   npm run build && npm start
   ```

---

## 📦 Available Scripts
| Script | Description |
|--------|-------------|
| `dev` | Runs Next.js in development mode with hot‑reloading |
| `build` | Generates an optimized production build |
| `start` | Starts the production server |
| `lint` | Runs ESLint & Design‑Taste lint (zero failures) |
| `test` | Runs Jest test suite (if added) |

---

## 🎨 Design System (Design‑Taste Frontend)
- **No thin hair‑line borders** – use `border` utilities with at least `2px` or spacing (`pt-3`, `pb-3`).
- **Balanced whitespace** – generous `p-6`, `gap-4` for sections.
- **Elegant typography** – custom fonts (e.g., `Playfair Display`, `Lora`) loaded via Google Fonts in `app/layout.tsx`.
- **Consistent colour palette** – each template (Editorial, Botanical, Royal, Celestial) defines its own primary/secondary colours in `components/templates/layouts/*Layout.tsx`.
- **Smooth animations** – Tailwind `transition`, `duration-300` for hover/focus effects.

---

## 🔐 Security & Permissions
- **Row‑Level Security (RLS)** policies enforce that customers can only read/write their own invitations and guests can only view public URLs.
- **Admin role** is granted via a Supabase `is_admin` boolean column on `profiles`.
- **Server‑side checks** in API routes (`/api/*`) verify the session token before proceeding.

---

## 📚 How to Add a New Template
1. Duplicate one of the existing layout files in `src/components/templates/layouts/` and give it a unique name.
2. Define its colour scheme, fonts, and any custom ornaments.
3. Add a new row to the `templates` table (via Supabase UI or the provided seed script) with `slug`, `name`, and `layout_component` matching the filename.
4. The template automatically appears in the gallery and can be selected by customers.

---

## 🐞 Known Issues / Next Steps
- Demo links now open the public invitation in a new tab – verify they work for all slugs (`editorial-grace`, `botanica-garden`, `keraton-royal`, `midnight-celestial`).
- Role‑switcher UI removed; only the login modal provides role entry.
- Responsive testing on tablet/mobile screens should be performed before release.

---

## 📄 License
MIT – feel free to fork, customise and deploy.
```
