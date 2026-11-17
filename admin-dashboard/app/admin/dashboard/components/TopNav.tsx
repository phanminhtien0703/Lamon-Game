'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

interface TopNavProps {
  onToggleSidebar: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  lastUpdated?: string;
}

export default function TopNav({
  onToggleSidebar,
  onRefresh,
  refreshing,
  onLogout,
  searchQuery,
  setSearchQuery,
  lastUpdated,
}: TopNavProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left: Mobile Sidebar Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Mở menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Brand Title */}
        <div className="lg:hidden flex items-center gap-1.5">
          <span className="text-base font-black text-[#38bdf8] uppercase tracking-wider font-sans">
            CONCEPT
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase">
            Admin
          </span>
        </div>

        {/* Desktop Breadcrumbs */}
        <div className="hidden lg:flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-400 hover:text-slate-600 transition">
            Dashboard
          </span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
            E-Commerce & Traffic Analytics
          </span>
        </div>
      </div>

      {/* Right: Search, Live Status, Refresh, Notifications, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
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
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-600 text-xs font-semibold">
          <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
          <span className="hidden sm:inline">Live Sync (8s)</span>
        </div>

        {/* Manual Refresh */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          title="Đồng bộ số liệu mới nhất"
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition disabled:opacity-50 cursor-pointer active:scale-95"
        >
          <RefreshCw
            className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#5969ff]' : ''}`}
          />
        </button>

        {/* Notifications Icon (Concept Style) */}
        <div className="relative hidden sm:block">
          <button
            title="Thông báo hệ thống"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
          </button>
        </div>

        {/* Apps Grid Icon */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="Mở cổng game portal"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer hidden sm:block"
        >
          <Grid className="w-4 h-4" />
        </a>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-slate-100 transition cursor-pointer border border-slate-200/80"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#5969ff] to-cyan-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              A
            </div>
            <span className="text-xs font-bold text-slate-700 hidden sm:inline">
              Admin
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {profileDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setProfileDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200/90 p-2 z-40 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="font-bold text-slate-800">Admin Manager</div>
                  <div className="text-[11px] text-slate-400 truncate">
                    admin@lamongame.com
                  </div>
                </div>

                <div className="py-1">
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Xem Website Lamon</span>
                  </a>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
