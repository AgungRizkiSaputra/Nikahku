import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: 'NikahKu - Platform Undangan Pernikahan Digital Premium & Modern',
  description:
    'Rancang dan bagikan undangan pernikahan digital eksklusif dengan estetika abadi, tipografi adiluhung, amplop personal, musik romantis, dan sistem RSVP instan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Cinzel+Decorative:wght@700&family=Cinzel:wght@400..800&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Outfit:wght@300..700&family=Playfair+Display:ital,wght@0,400..800;1,400..800&family=Plus+Jakarta+Sans:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-stone-900 antialiased selection:bg-amber-200 selection:text-amber-950">
        <AuthProvider>
          <div className="flex-1 flex flex-col">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
