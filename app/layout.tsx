// app/layout.tsx
import type { Metadata } from 'next';
import { Cinzel, DM_Sans } from 'next/font/google';
import '../styles/globals.css';
import AudioPlayer from '@/components/AudioPlayer';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

// Se elimina themeColor de la exportación de metadata
export const metadata: Metadata = {
  title: 'Eternidad Púrpura',
  description: 'Nuestra historia en tonos de amor eterno',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Se añade el meta tag de theme-color manualmente */}
        <meta name="theme-color" content="#2e1065" />
        {/* Opcional: se elimina el preload manual si Next.js ya lo gestiona */}
        {/*
        <link
          rel="preload"
          href="/_next/static/media/c9a5bc6a7fe9487c-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        */}
      </head>
      <body className={`${cinzel.variable} ${dmSans.variable} font-sans bg-purple-950`}>
        {children}
        <AudioPlayer />

        {/* Efecto de brillo global */}
        <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_100px_20px_rgba(112,26,117,0.3)] mix-blend-screen" />
      </body>
    </html>
  );
}
