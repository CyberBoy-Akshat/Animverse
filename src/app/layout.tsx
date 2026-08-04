import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AnimeWorld — Stream Anime Free',
  description: 'Watch anime series and movies online. Live data, embedded players, zero ads.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-dark-900">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
