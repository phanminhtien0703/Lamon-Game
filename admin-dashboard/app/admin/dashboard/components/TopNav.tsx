'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  Search,
  RefreshCw,
  Radio,
  Bell,
  Grid,
  LogOut,
  ExternalLink,
  ChevronDown,
  User,
  PanelLeftClose,
  PanelLeftOpen,
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
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-slate-200/90 px-3 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-all duration-300">
      {/* Left: Sidebar Toggles & Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Mở menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Collapse/Expand Sidebar Button */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            title={isCollapsed ? 'Mở rộng menu bên trái (Ctrl+B)' : 'Thu gọn menu bên trái (Ctrl+B)'}
            aria-label={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-5 h-5 text-[#5969ff]" />
            ) : (
              <PanelLeftClose className="w-5 h-5 text-slate-600" />
            )}
          </button>
        )}

        {/* Mobile Brand Title */}
        <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
          <img
            src="/images/logo.png"
            alt="Lamon Game"
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-md object-contain"
          />
          <span className="text-sm sm:text-base font-black text-[#38bdf8] uppercase tracking-wider font-sans">
            LAMON GAME
          </span>
        </div>

        {/* Desktop Breadcrumbs */}
        <div className="hidden lg:flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-400 hover:text-slate-600 transition">
            Dashboard
          </span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
            Lamon Game Analytics
          </span>
        </div>
      </div>

      {/* Right: Search, Live Status, Refresh, Notifications, Profile */}
      <div className="flex items-center gap-1.5 sm:gap-4">
        {/* Search Bar (Concept Template Style) */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#f1f3f7] border border-transparent hover:border-slate-300 focus:border-[#5969ff] focus:bg-white rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5969ff]/20 transition"
          />
        </div>

        {/* Live Indicator Pill */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-600 text-[11px] sm:text-xs font-semibold">
          <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse text-emerald-500" />
          <span className="hidden sm:inline">Live Sync (8s)</span>
        </div>

        {/* Manual Refresh */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          title="Đồng bộ số liệu mới nhất"
          className="p-1.5 sm:p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition disabled:opacity-50 cursor-pointer active:scale-95"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${refreshing ? 'animate-spin text-[#5969ff]' : ''}`}
          />
        </button>

        {/* Notifications Icon (Concept Style) */}
        <button
          title="Thông báo hệ thống"
          className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* Apps Grid Icon */}
        <div className="relative">
          <button
            title="Liên kết nhanh game"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-slate-200" />

        {/* Profile Avatar Dropdown (Concept Header Right) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5969ff] to-cyan-400 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-white">
              A
            </div>
            <span className="hidden sm:inline text-xs font-bold text-slate-700">
              Admin
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3.5 py-2.5 border-b border-slate-100">
                <p className="font-bold text-slate-800">Admin Manager</p>
                <p className="text-[11px] text-slate-400 truncate">
                  admin@lamongame.com
                </p>
              </div>

              <div className="py-1">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-slate-600 hover:bg-slate-50 hover:text-[#5969ff] transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Trang chủ Cổng Game</span>
                </a>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 transition font-semibold cursor-pointer"
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
