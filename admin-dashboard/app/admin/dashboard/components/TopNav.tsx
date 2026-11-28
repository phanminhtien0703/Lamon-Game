'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  RefreshCw,
  Radio,
  LogOut,
  ExternalLink,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Orbit,
} from 'lucide-react';

interface TopNavProps {
  onToggleSidebar: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  lastUpdated?: string;
}

export default function TopNav({
  onToggleSidebar,
  isCollapsed = false,
  onToggleCollapse,
  onRefresh,
  refreshing,
  onLogout,
  searchQuery,
  setSearchQuery,
  lastUpdated,
}: TopNavProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [now, setNow] = useState<{ time: string; date: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live HUD clock matching reference top-right telemetry
  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      setNow({
        time: d.toLocaleTimeString('en-GB', { hour12: false }),
        date: d.toLocaleDateString('vi-VN', {
          weekday: 'short',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      });
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="h-14 sm:h-16 bg-[#050e22]/90 backdrop-blur-md border-b border-cyan-500/25 px-3 sm:px-6 lg:px-7 flex items-center justify-between sticky top-0 z-30 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-300">
      {/* Left: Sidebar Toggles, Orbital Title & Top HUD Nav Tabs */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 sm:p-2 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/15 border border-cyan-500/20 transition cursor-pointer"
          aria-label="Mở menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Collapse/Expand Sidebar Button */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center p-2 rounded-lg text-cyan-300/80 hover:text-cyan-200 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition cursor-pointer"
            title={isCollapsed ? 'Mở rộng menu bên trái (Ctrl+B)' : 'Thu gọn menu bên trái (Ctrl+B)'}
            aria-label={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-5 h-5 text-cyan-400" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Orbital Brand Title */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.25)]">
            <Orbit className="w-4 h-4 text-cyan-300" />
          </div>
          <div className="leading-tight">
            <span className="text-sm sm:text-base font-black text-white tracking-wider uppercase block">
              LAMON ORBITAL
            </span>
            <span className="hidden sm:block text-[10px] text-cyan-200/85 font-mono tracking-[0.16em] uppercase">
              ANALYTICS HUD
            </span>
          </div>
        </div>

        {/* Desktop HUD Section Tabs */}
        <nav className="hidden xl:flex items-center gap-1 ml-3 pl-4 border-l border-cyan-500/20 text-xs font-bold tracking-wider uppercase">
          {[
            { label: 'Tổng Quan', id: 'dashboardOverview' },
            { label: 'Orbital Traffic', id: 'orbitalHubSection' },
            { label: 'Dữ Liệu', id: 'dataTableSection' },
            { label: 'Hiệu Quả Game', id: 'gamePerformanceSection' },
          ].map((nav, i) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => jumpTo(nav.id)}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                i === 0
                  ? 'text-cyan-200 bg-cyan-500/15 border-b-2 border-cyan-400 shadow-[0_2px_10px_rgba(34,211,238,0.2)]'
                  : 'text-slate-400 hover:text-cyan-200 hover:bg-cyan-500/10'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right: Search, Live Telemetry Clock, Sync Status, Refresh, Profile */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-44 lg:w-56">
          <Search className="w-3.5 h-3.5 text-cyan-400/70 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm ngày, tuần, tháng..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#040a18]/90 border border-cyan-500/25 hover:border-cyan-400/45 focus:border-cyan-400 rounded-lg text-xs font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 transition"
          />
        </div>

        {/* Live Telemetry Clock */}
        {now && (
          <div className="hidden lg:flex flex-col items-end pr-2.5 border-r border-cyan-500/20 font-mono leading-tight">
            <span className="text-sm sm:text-base font-black text-white tracking-wider tabular-nums">
              {now.time}
            </span>
            <span className="text-[11px] text-cyan-200/85 uppercase">{now.date}</span>
          </div>
        )}

        {/* Live Indicator Pill */}
        <div
          title={lastUpdated ? `Cập nhật lúc ${lastUpdated}` : 'Đang đồng bộ mỗi 8 giây'}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-[11px] sm:text-xs font-mono font-bold"
        >
          <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
          <span className="hidden sm:inline">SYNC 8S</span>
        </div>

        {/* Manual Refresh */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          title="Đồng bộ số liệu mới nhất"
          className="p-1.5 sm:p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/25 text-cyan-300 hover:text-white transition disabled:opacity-50 cursor-pointer active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${refreshing ? 'animate-spin text-cyan-200' : ''}`} />
        </button>

        {/* Profile Avatar Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-1.5 p-1 pl-1.5 rounded-full bg-[#061229] border border-cyan-500/25 hover:border-cyan-400/50 transition cursor-pointer"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-[0_0_12px_rgba(34,211,238,0.4)]">
              A
            </div>
            <span className="hidden sm:inline text-xs font-bold text-slate-200 pr-0.5">Admin</span>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-300/70" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#06132b] rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.65)] border border-cyan-500/35 py-1.5 z-50 text-xs">
              <div className="px-3.5 py-2.5 border-b border-cyan-500/20">
                <p className="font-bold text-white">Admin Manager</p>
                <p className="text-[11px] text-cyan-300/70 truncate">admin@lamongame.com</p>
              </div>

              <div className="py-1">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-200 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Trang chủ Cổng Game</span>
                </a>
              </div>

              <div className="border-t border-cyan-500/20 pt-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-400 hover:bg-rose-500/10 transition font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
