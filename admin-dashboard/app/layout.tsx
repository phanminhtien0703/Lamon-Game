import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lamon Game | Orbital Analytics HUD',
  description: 'Bảng điều khiển lưu lượng truy cập và thống kê tải game Lamon Game',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo.png', type: 'image/png' },
      { url: '/images/logo.webp', type: 'image/webp' },
    ],
    shortcut: '/favicon.ico',
    apple: '/images/logo.png',
  },
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
    <html lang="vi" className="dark">
      <body className="min-h-screen bg-[#030814] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950 font-sans">
        {children}
      </body>
    </html>
  );
}
