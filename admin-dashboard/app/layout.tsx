import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Concept Admin Dashboard - Lamon Game',
  description: 'Internal Real-time Link Click Tracking System',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-[#f4f5f9] text-slate-800 antialiased selection:bg-[#5969ff] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
