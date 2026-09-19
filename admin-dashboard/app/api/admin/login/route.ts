import { NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'Admin@2026!';

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json(
        { error: 'Tài khoản hoặc mật khẩu không chính xác.' },
        { status: 401 }
      );
    }

    // Cấp session cookie
    await createSession(username);

    return NextResponse.json({ success: true, message: 'Đăng nhập thành công' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Lỗi xử lý yêu cầu đăng nhập' }, { status: 500 });
  }
}
