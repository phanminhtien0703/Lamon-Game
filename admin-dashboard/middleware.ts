import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-fallback-secret-at-least-32-characters-long-2026'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Nếu vào root '/' -> Chuyển hướng vào dashboard (nếu đã đăng nhập) hoặc login
  if (pathname === '/') {
    const sessionToken = request.cookies.get('admin_session')?.value;
    if (sessionToken) {
      try {
        await jwtVerify(sessionToken, SECRET);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch {
        // Token không hợp lệ thì chuyển tới login
      }
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 2. Bỏ qua static assets, favicon, _next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 3. Xử lý Route Đăng Nhập
  if (pathname === '/admin/login') {
    const sessionToken = request.cookies.get('admin_session')?.value;
    if (sessionToken) {
      try {
        await jwtVerify(sessionToken, SECRET);
        // Đã đăng nhập rồi thì chuyển thẳng vào dashboard
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch {
        // Token không hợp lệ, cho phép ở lại trang login
      }
    }
    return NextResponse.next();
  }

  // 4. Bỏ qua API login
  if (pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  // 5. Bảo vệ tất cả các route /admin/* và /api/admin/*
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(sessionToken, SECRET);
      return NextResponse.next();
    } catch {
      // Token hết hạn hoặc không hợp lệ
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Token expired or invalid' }, { status: 401 });
      }
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*', '/api/admin/:path*'],
};
