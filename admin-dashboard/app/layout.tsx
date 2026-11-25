import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lamon Game | Admin Dashboard',
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
    <html lang="vi">
      <body className="min-h-screen bg-[#f4f5f9] text-slate-800 antialiased selection:bg-[#5969ff] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
