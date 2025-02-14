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

export const metadata: Metadata = {
  title: 'J&M',
  description: 'Nuestra historia de amor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#2e1065" />
      </head>
      <body className={`${cinzel.variable} ${dmSans.variable} font-sans bg-purple-950`}>
        {children}

        <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_100px_20px_rgba(112,26,117,0.3)] mix-blend-screen" />
      </body>
    </html>
  );
}
