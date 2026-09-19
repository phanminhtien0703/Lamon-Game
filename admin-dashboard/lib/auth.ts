import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-fallback-secret-at-least-32-characters-long-2026'
);

export interface AdminPayload {
  username: string;
  role: 'ADMIN';
}

/**
 * Tạo JWT token và set cookie HttpOnly an toàn
 */
export async function createSession(username: string): Promise<string> {
  const token = await new SignJWT({ username, role: 'ADMIN' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 8 * 60 * 60, // 8 giờ
  });

  return token;
}

/**
 * Kiểm tra tính hợp lệ của token
 */
export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

/**
 * Xóa session cookie khi Logout
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
