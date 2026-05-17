import './ui/global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'sangatho — आजको नेपाल, एकै ठाउँमा',
  description: "Nepal's daily information dashboard: NEPSE, forex, fuel prices, load shedding, air quality, and rashifal — all in one place.",
  metadataBase: new URL('https://sangatho.com.np'),
  openGraph: {
    title: 'sangatho',
    description: 'आजको नेपाल, एकै ठाउँमा।',
    siteName: 'Sangatho',
    locale: 'ne_NP',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ne">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
