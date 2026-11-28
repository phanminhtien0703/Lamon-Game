'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, AlertCircle, Loader2, ShieldCheck, Orbit, Radio } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Đăng nhập thất bại');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Có lỗi bất ngờ xảy ra');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen orbital-bg flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
      {/* Orbital Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md hud-panel hud-corners rounded-2xl p-6 sm:p-8 relative z-10 space-y-6">
        {/* Top Telemetry Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] pb-3 border-b border-cyan-500/20">
          <span className="text-cyan-300 font-bold flex items-center gap-1.5">
            <Orbit className="w-3.5 h-3.5 text-cyan-400" />
            <span>LAMON ORBITAL HUD</span>
          </span>
          <span className="text-emerald-300 flex items-center gap-1 font-bold">
            <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
            <span>AUTH GATEWAY</span>
          </span>
        </div>

        {/* Orbital Emblem & Title */}
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
            <svg viewBox="0 0 80 80" className="absolute inset-0 w-full h-full animate-hud-spin">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="rgba(56,189,248,0.45)"
                strokeWidth="1.5"
                strokeDasharray="10 6"
              />
            </svg>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center">
              <Lock className="w-5 h-5 text-cyan-300" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-wide uppercase text-white">
            Quản Trị Hệ Thống
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            TRUNG TÂM ĐIỀU HÀNH LƯU LƯỢNG LAMON GAME
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-400/40 flex items-center gap-2.5 text-rose-300 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-cyan-300/85 uppercase tracking-wider mb-1.5">
              Tài khoản
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-cyan-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tài khoản admin"
                className="w-full pl-10 pr-4 py-2.5 bg-[#040c1f]/90 border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white placeholder-slate-500 text-sm transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-cyan-300/85 uppercase tracking-wider mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyan-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#040c1f]/90 border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white placeholder-slate-500 text-sm transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-black uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.35)] transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang xác thực...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Đăng Nhập Hệ Thống</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-cyan-500/15 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>ENCRYPTION: JWT HS256</span>
          <span className="text-cyan-400/80">STATUS: READY</span>
        </div>
      </div>
    </div>
  );
}
