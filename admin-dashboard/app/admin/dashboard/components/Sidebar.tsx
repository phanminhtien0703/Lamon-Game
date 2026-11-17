'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  BarChart3,
  Share2,
  Calendar,
  FileSpreadsheet,
  Gamepad2,
  Swords,
  Flame,
  Zap,
  Globe,
  Radio,
  LogOut,
  X,
  ChevronRight,
  ExternalLink,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExportCSV: () => void;
  onLogout: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
  activeTab,
  setActiveTab,
  onExportCSV,
  onLogout,
}: SidebarProps) {
  const scrollToId = (id: string, tabName: string) => {
    setActiveTab(tabName);
    onClose();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 bg-[#0e0c28] text-slate-300 z-50 flex flex-col justify-between border-r border-[#222144]/70 transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-[72px] w-64' : 'w-64'}`}
      >
        {/* Top: Brand Header */}
        <div>
          <div
            className={`h-16 flex items-center border-b border-[#222144]/60 bg-[#0e0c28] transition-all duration-300 ${
              isCollapsed
                ? 'lg:px-3 px-5 justify-between lg:justify-center'
                : 'px-5 justify-between'
            }`}
          >
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2.5 group"
              title="Concept Admin Dashboard"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-base shadow-md shadow-blue-500/30 flex-shrink-0">
                L
              </div>
              <div className={isCollapsed ? 'lg:hidden' : 'block'}>
                <span className="text-xl font-black text-[#38bdf8] tracking-wider uppercase font-sans">
                  CONCEPT
                </span>
                <span className="text-[10px] text-slate-400 font-semibold block -mt-1 tracking-widest uppercase">
                  Lamon Analytics
                </span>
              </div>
            </Link>

            {/* Collapse toggle button on Desktop */}
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
              className={`hidden lg:flex items-center justify-center p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer ${
                isCollapsed ? 'mt-0' : ''
              }`}
            >
              {isCollapsed ? (
                <ChevronsRight className="w-4 h-4 text-[#38bdf8]" />
              ) : (
                <ChevronsLeft className="w-4 h-4" />
              )}
            </button>

            {/* Close Button on Mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Đóng menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items (Scrollable) */}
          <nav
            className={`py-3.5 space-y-5 overflow-y-auto max-h-[calc(100vh-140px)] text-sm transition-all duration-300 ${
              isCollapsed ? 'lg:px-2 px-3.5' : 'px-3.5'
            }`}
          >
            {/* Section 1: MENU */}
            <div>
              {isCollapsed ? (
                <div className="hidden lg:block w-8 h-[1px] bg-white/10 mx-auto my-2" />
              ) : (
                <div className="px-3 pb-2 text-[11px] font-bold text-slate-400/80 uppercase tracking-wider">
                  Menu
                </div>
              )}
              <ul className="space-y-1">
                {/* 1. Dashboard */}
                <li>
                  <button
                    onClick={() => scrollToId('dashboardOverview', 'dashboard')}
                    title="Dashboard"
                    className={`w-full flex items-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isCollapsed
                        ? 'lg:justify-center lg:p-2.5 px-3.5 py-2.5 justify-between'
                        : 'justify-between px-3.5 py-2.5'
                    } ${
                      activeTab === 'dashboard'
                        ? 'bg-[#5969ff] text-white shadow-md shadow-[#5969ff]/30 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                      <span className={isCollapsed ? 'lg:hidden' : 'inline'}>Dashboard</span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 opacity-70 ${isCollapsed ? 'lg:hidden' : 'inline'}`}
                    />
                  </button>
                </li>

                {/* 2. Biểu Đồ Lưu Lượng */}
                <li>
                  <button
                    onClick={() => scrollToId('analyticsCharts', 'charts')}
                    title="Biểu Đồ Lưu Lượng"
                    className={`w-full flex items-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isCollapsed
                        ? 'lg:justify-center lg:p-2.5 px-3.5 py-2.5 justify-between'
                        : 'justify-between px-3.5 py-2.5'
                    } ${
                      activeTab === 'charts'
                        ? 'bg-[#5969ff] text-white shadow-md shadow-[#5969ff]/30 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <BarChart3 className="w-4 h-4 flex-shrink-0" />
                      <span className={isCollapsed ? 'lg:hidden' : 'inline'}>
                        Biểu Đồ Lưu Lượng
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 opacity-70 ${isCollapsed ? 'lg:hidden' : 'inline'}`}
                    />
                  </button>
                </li>

                {/* 3. Bảng Dữ Liệu Chi Tiết */}
                <li>
                  <button
                    onClick={() => scrollToId('dataTableSection', 'table')}
                    title="Bảng Dữ Liệu Chi Tiết"
                    className={`w-full flex items-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isCollapsed
                        ? 'lg:justify-center lg:p-2.5 px-3.5 py-2.5 justify-between'
                        : 'justify-between px-3.5 py-2.5'
                    } ${
                      activeTab === 'table'
                        ? 'bg-[#5969ff] text-white shadow-md shadow-[#5969ff]/30 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Share2 className="w-4 h-4 flex-shrink-0" />
                      <span className={isCollapsed ? 'lg:hidden' : 'inline'}>
                        Bảng Dữ Liệu Chi Tiết
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 opacity-70 ${isCollapsed ? 'lg:hidden' : 'inline'}`}
                    />
                  </button>
                </li>

                {/* 4. Ngày Vàng Trong Tuần */}
                <li>
                  <button
                    onClick={() => scrollToId('dayOfWeekSection', 'dow')}
                    title="Ngày Vàng Trong Tuần"
                    className={`w-full flex items-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isCollapsed
                        ? 'lg:justify-center lg:p-2.5 px-3.5 py-2.5 justify-between'
                        : 'justify-between px-3.5 py-2.5'
                    } ${
                      activeTab === 'dow'
                        ? 'bg-[#5969ff] text-white shadow-md shadow-[#5969ff]/30 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span className={isCollapsed ? 'lg:hidden' : 'inline'}>
                        Ngày Vàng Trong Tuần
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 opacity-70 ${isCollapsed ? 'lg:hidden' : 'inline'}`}
                    />
                  </button>
                </li>

                {/* 5. Xuất Excel */}
                <li>
                  <button
                    onClick={() => {
                      onExportCSV();
                      onClose();
                    }}
                    title="Xuất Báo Cáo Excel (CSV)"
                    className={`w-full flex items-center rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer ${
                      isCollapsed
                        ? 'lg:justify-center lg:p-2.5 px-3.5 py-2.5 justify-between'
                        : 'justify-between px-3.5 py-2.5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileSpreadsheet className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                      <span className={isCollapsed ? 'lg:hidden' : 'inline'}>
                        Xuất Báo Cáo Excel
                      </span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold ${
                        isCollapsed ? 'lg:hidden' : 'inline'
                      }`}
                    >
                      CSV
                    </span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Section 2: DANH MỤC GAME (Landing Pages) */}
            <div>
              {isCollapsed ? (
                <div className="hidden lg:block w-8 h-[1px] bg-white/10 mx-auto my-2" />
              ) : (
                <div className="px-3 pb-2 text-[11px] font-bold text-slate-400/80 uppercase tracking-wider">
                  Landing Pages
                </div>
              )}
              <ul className="space-y-1">
                <li>
                  <a
                    href="/games/than-ma-giang-the/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Game: Thần Ma Giáng Thế"
                    className={`flex items-center rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition group ${
                      isCollapsed
                        ? 'lg:justify-center lg:p-2.5 px-3.5 py-2 justify-between'
                        : 'justify-between px-3.5 py-2'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Gamepad2 className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                      <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'inline'}`}>
                        Thần Ma Giáng Thế
                      </span>
                    </div>
                    <ExternalLink
                      className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition ${
                        isCollapsed ? 'lg:hidden' : 'inline'
                      }`}
                    />
                  </a>
                </li>

                <li>
                  <a
                    href="/games/era-of-warfare/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Game: Era of Warfare (EN)"
                    className={`flex items-center rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition group ${
                      isCollapsed
                        ? 'lg:justify-center lg:p-2.5 px-3.5 py-2 justify-between'
                        : 'justify-between px-3.5 py-2'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Swords className="w-4 h-4 flex-shrink-0 text-amber-400" />
                      <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'inline'}`}>
                        Era of Warfare (EN)
                      </span>
                    </div>
                    <ExternalLink
                      className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition ${
                        isCollapsed ? 'lg:hidden' : 'inline'
                      }`}
                    />
                  </a>
                </li>

                <li>
                  <a
                    href="/games/nhat-kiem-phu-sinh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Game: Nhất Kiếm Phù Sinh"
                    className={`flex items-center rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition group ${
                      isCollapsed
                        ? 'lg:justify-center lg:p-2.5 px-3.5 py-2 justify-between'
                        : 'justify-between px-3.5 py-2'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Flame className="w-4 h-4 flex-shrink-0 text-rose-400" />
                      <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'inline'}`}>
                        Nhất Kiếm Phù Sinh
                      </span>
                    </div>
                    <ExternalLink
                      className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition ${
                        isCollapsed ? 'lg:hidden' : 'inline'
                      }`}
                    />
                  </a>
                </li>

                <li>
                  <a
                    href="/games/tan-binh-thuc-tinh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Game: Tân Binh Thức Tỉnh"
                    className={`flex items-center rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition group ${
                      isCollapsed
                        ? 'lg:justify-center lg:p-2.5 px-3.5 py-2 justify-between'
                        : 'justify-between px-3.5 py-2'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Zap className="w-4 h-4 flex-shrink-0 text-purple-400" />
                      <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'inline'}`}>
                        Tân Binh Thức Tỉnh
                      </span>
                    </div>
                    <ExternalLink
                      className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition ${
                        isCollapsed ? 'lg:hidden' : 'inline'
                      }`}
                    />
                  </a>
                </li>

                <li>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Cổng Game Lamon (Trang chủ)"
                    className={`flex items-center rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition group ${
                      isCollapsed
                        ? 'lg:justify-center lg:p-2.5 px-3.5 py-2 justify-between'
                        : 'justify-between px-3.5 py-2'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Globe className="w-4 h-4 flex-shrink-0 text-blue-400" />
                      <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'inline'}`}>
                        Cổng Game Lamon
                      </span>
                    </div>
                    <ExternalLink
                      className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition ${
                        isCollapsed ? 'lg:hidden' : 'inline'
                      }`}
                    />
                  </a>
                </li>
              </ul>
            </div>

            {/* Section 3: TRẠNG THÁI HỆ THỐNG */}
            <div>
              {isCollapsed ? (
                <div
                  title="Google Sheets: Live Sync 8s"
                  className="hidden lg:flex items-center justify-center p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-emerald-400"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              ) : (
                <>
                  <div className="px-3 pb-2 text-[11px] font-bold text-slate-400/80 uppercase tracking-wider">
                    Hệ Thống
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Google Sheets:</span>
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live 8s</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      Đồng bộ tự động số lượt click theo thời gian thực
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>

        {/* Bottom: User Profile & Logout */}
        <div className="p-3.5 border-t border-[#222144]/60 bg-[#0c0a24]">
          <div
            className={`flex items-center ${
              isCollapsed
                ? 'lg:flex-col lg:gap-2 justify-between lg:justify-center'
                : 'justify-between'
            }`}
          >
            <div
              className={`flex items-center gap-2.5 min-w-0 ${
                isCollapsed ? 'lg:justify-center' : ''
              }`}
              title="Admin Manager (admin@lamongame.com)"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5969ff] to-cyan-400 flex items-center justify-center text-white font-bold text-xs shadow-md flex-shrink-0">
                A
              </div>
              <div className={isCollapsed ? 'lg:hidden' : 'block min-w-0'}>
                <div className="text-xs font-bold text-white truncate">
                  Admin Manager
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  admin@lamongame.com
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Đăng xuất khỏi hệ thống"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
