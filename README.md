# NikahKu — Platform Undangan Pernikahan Digital Premium & Modern 💍✨

Platform **Digital Wedding Invitation** berbasis web modern yang memungkinkan pengguna membuat, mengelola, membagikan, dan memantau undangan pernikahan digital berstandar visual editorial premium dengan template reusable, musik romantis, amplop pembuka dengan nama tamu personal, integrasi Google Maps, buku tamu ucapan, dan sistem konfirmasi kehadiran (RSVP) real-time.

---

## 🌟 Fitur Utama & Pembagian Hak Akses (3 Roles)

### 1. Guest (Pengunjung Umum)
- **Landing Page Profesional**: Menampilkan showcase layanan, keunggulan, cara kerja, FAQ, dan CTA.
- **Katalog Template Interaktif**: Filter kategori (*Modern Minimalist*, *Floral Botanical*, *Traditional Heritage*, *Dark Celestial*), pencarian, dan pratinjau live demo (*Mobile / Desktop simulation*).
- **Akses Terproteksi**: Tidak dapat membuat atau mengelola undangan sebelum melakukan registrasi / login.

### 2. Customer (Calon Pengantin)
- **Dashboard Pengantin**: Ringkasan total undangan, kunjungan pembaca, jumlah RSVP masuk, dan total ucapan tamu.
- **Wedding Invitation Builder / Editor**:
  - Formulir pengisian terstruktur (Mempelai Pria & Wanita, Nama Orang Tua, Foto, Instagram).
  - Agenda Acara (Akad Nikah, Pemberkatan, Resepsi) lengkap dengan jam, zona waktu, dan tautan Google Maps.
  - Timeline Kisah Cinta (*Love Story*) & Galeri Foto (*Lightbox Modal*).
  - Rekening Amplop Digital & Hadiah Pernikahan (BCA, Mandiri, QRIS) dengan tombol salin instan.
  - Pengaturan Musik Latar Romantis (.mp3 / .m4a) dengan audio controller mengambang.
  - Simulator ponsel *real-time* yang langsung berubah sesuai input yang diketik.
- **Pengaturan Status**: Simpan sebagai *Draft* (terproteksi dari publik) atau *Publish* ke URL publik unik (`/invitation/[slug]`).
- **Generator Tautan Tamu & WhatsApp**:
  - Masukkan nama tamu khusus (misal: `Bpk. Hendrawan & Keluarga`) untuk menghasilkan tautan berparameter `?to=...`.
  - Tombol 1-klik untuk menyalin pesan WhatsApp resmi yang sopan dan siap sebar.

### 3. Admin (Pengelola Platform)
- **Platform Analytics & KPIs**: Monitoring total pengguna, total undangan aktif, undangan published, total respon RSVP, dan total views.
- **Manajemen Katalog Template**: Tambah template baru, ubah template, aktifkan/nonaktifkan (*toggle active*), dan jadikan unggulan (*toggle featured*).
- **Manajemen Kategori Template**: Atur kategori gaya visual template.
- **Pengawasan Undangan Seluruh Pengguna**: Inspeksi seluruh undangan pengguna di platform dan moderasi status publikasi.
- **Manajemen Pengguna & Role**: Lihat daftar pengguna dan ubah peran hak akses (*Guest*, *Customer*, *Admin*).
- **Pengaturan Sistem**: Konfigurasi nama platform, email support, dan mode pemeliharaan (*maintenance mode*).

---

## 🛠️ Teknologi & Tools yang Digunakan

| Kategori | Teknologi / Tools | Keterangan |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Fullstack React framework dengan performa tinggi, Server Components, dan routing modular. |
| **Bahasa** | **TypeScript 5** | Static typing ketat untuk keandalan kode, antarmuka entitas database, dan keamanan data. |
| **Styling** | **Tailwind CSS v4** | Utility-first CSS dengan desain responsif, glassmorphism, dan custom keyframe animations. |
| **Tipografi** | **Google Fonts** | *Playfair Display* (Editorial), *Cormorant Garamond* (Botanical), *Cinzel* (Heritage Gold), *Plus Jakarta Sans*, & *Alex Brush*. |
| **Database & Auth** | **Supabase (PostgreSQL)** | Layanan database PostgreSQL terkelola dengan Row Level Security (RLS) dan Autentikasi Pengguna. |
| **Dual Engine Storage** | **Adapter Pattern** | Otomatis sinkronisasi dengan Supabase Cloud jika kredensial diatur, atau menggunakan Reactive State & Local Storage jika dalam mode review lokal tanpa config. |
| **Icons** | **Lucide React** | Ikon modern, ringan, dan elegan (Heart, Calendar, Clock, MapPin, Music, Gift, Share2, dll). |
| **Animasi & Efek** | **Canvas Confetti** | Efek letupan konfeti perayaan saat tamu menekan "Buka Undangan" atau mengirim konfirmasi RSVP. |
| **Testing Bar** | **RoleSwitcherBar** | Bilah navigasi atas khusus untuk menguji simulasi persona *Guest*, *Customer*, dan *Admin* secara instan. |

---

## 🗄️ Arsitektur Database & Row Level Security (RLS)

File skema lengkap tersedia di `supabase/schema.sql` dan data awal di `supabase/seed.sql`:

1. `profiles`: Data akun pengguna (`id`, `email`, `full_name`, `avatar_url`, `role` enum: `guest` | `customer` | `admin`).
2. `template_categories`: Kategori template (`id`, `name`, `slug`, `icon`, `sort_order`).
3. `templates`: Katalog template undangan (`id`, `name`, `slug`, `thumbnail_url`, `theme_config` JSONB, `is_active`, `is_featured`).
4. `invitations`: Entitas undangan pernikahan (`id`, `user_id`, `template_id`, `title`, `slug` UNIQUE, `status`: `draft` | `published`, `event_date`, `views_count`).
5. `invitation_content`: Konten detail undangan (data mempelai pria/wanita, kutipan, array agenda acara, timeline cerita, rekening bank).
6. `invitation_gallery`: Galeri foto prewedding dan momen bahagia.
7. `guests`: Buku tamu khusus yang dibuat oleh pemilik undangan.
8. `rsvps`: Konfirmasi kehadiran tamu pengunjung (`guest_name`, `attendance`: `attending` | `not_attending` | `uncertain`, `guest_count`, `notes`).
9. `wishes`: Papan ucapan dan doa restu dari para kerabat.
10. `invitation_visits`: Log pencatatan statistik kunjungan pembaca.

### Kebijakan Keamanan (Row Level Security):
- Pengunjung publik hanya dapat membaca undangan yang berstatus `published`.
- Undangan berstatus `draft` hanya dapat diakses oleh pemiliknya (*author*) atau akun dengan peran `admin`.
- Pengunjung publik dapat melakukan `INSERT` ke tabel `rsvps` dan `wishes` pada undangan yang berstatus `published`.
- Modifikasi katalog template dan pengelolaan peran pengguna dibatasi khusus untuk peran `admin` via fungsi `is_admin()`.

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

### 1. Kloning Repositori
```bash
git clone https://github.com/username/platform-wedding-invitation.git
cd platform-wedding-invitation
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan (Opsional - Supabase Cloud)
Platform ini memiliki fitur **Dual-Engine Architecture**: Anda dapat langsung menjalankan dan menguji seluruh fitur secara offline/lokal tanpa setup Supabase.

Jika ingin menghubungkan ke Supabase Cloud sungguhan:
1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka menu **SQL Editor** pada dashboard Supabase, lalu jalankan isi file `supabase/schema.sql` kemudian `supabase/seed.sql`.
3. Buat file `.env.local` di root proyek:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser Anda dan akses: `http://localhost:3000`

### 5. Membangun Versi Produksi (Production Build)
```bash
npm run build
npm run start
```

---

## 🎨 4 Desain Template yang Disediakan

Setiap template dibuat dengan struktur layout dan estetika yang benar-benar berbeda:
1. **Lumière Editorial (`editorial`)**: Gaya editorial majalah *high-fashion* dengan garis tegas minimalis, tipografi serif modern, palet *warm sand*, dan foto bernuansa hangat.
2. **Botanica Garden Romance (`botanical`)**: Suasana romantis taman musim semi dengan bingkai foto lengkungan (*arch frame*), ornamen dedaunan sage hijau lembut, dan tipografi *Cormorant Garamond*.
3. **Keraton Royal Heritage (`royal`)**: Keagungan adat nusantara dengan motif prada emas klasik, latar cokelat sogan ningrat & beludru malam, ornamen songket, dan tipografi *Cinzel*.
4. **Midnight Celestial Glamour (`celestial`)**: Keindahan malam berbintang dengan efek *glassmorphism*, latar biru gelap kristal safir, dan aksen emas bercahaya.

---

## 🧪 Panduan Menguji 3 Role & Fitur

Di bagian atas layar aplikasi terdapat **Role Simulation Bar**:
1. Klik **Guest**: Coba buka landing page, katalog template, dan klik "Gunakan Template" (akan muncul modal login/registrasi).
2. Klik **Customer**: Buka **Dashboard Saya**, coba buat undangan baru melalui form wizard, atur URL slug (contoh: `my-wedding`), lalu buka tautan `/invitation/my-wedding`.
3. Klik **Admin**: Buka **Admin Dashboard** di `/admin` untuk melihat statistik platform, menambah/mengedit template katalog, serta memoderasi seluruh undangan pengguna.
4. Coba bagikan link dengan parameter tamu: `/invitation/arya-dinda?to=Bapak+Hendra+dan+Keluarga` dan amati nama tamu yang otomatis tampil di amplop pembuka dan formulir RSVP.

---

## 📄 Lisensi
Hak Cipta © 2026 NikahKu Digital Platform. Dilindungi Undang-Undang.
