'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Share2,
  FileSpreadsheet,
  LogOut,
  X,
  ChevronRight,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Trophy,
  Orbit,
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
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);

  const scrollToId = (id: string, tabName: string) => {
    setActiveTab(tabName);
    onClose();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isSubTabActive = ['orbital', 'conversion', 'games', 'table'].includes(activeTab);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Orbital HUD Sidebar Rail */}
      <aside
        className={`fixed top-0 bottom-0 left-0 bg-[#040a18]/95 backdrop-blur-xl text-slate-300 z-50 flex flex-col justify-between border-r border-cyan-500/20 shadow-[4px_0_24px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-[72px] w-64' : 'w-64'}`}
      >
        {/* Top: Brand Header */}
        <div>
          <div
            className={`h-16 flex items-center border-b border-cyan-500/20 bg-[#050d1f] transition-all duration-300 ${
              isCollapsed
                ? 'lg:px-3 px-5 justify-between lg:justify-center'
                : 'px-5 justify-between'
            }`}
          >
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2.5 group"
              title="Lamon Game Orbital HUD"
            >
              <img
                src="/images/logo.png"
                alt="Lamon Game"
                className="w-8 h-8 rounded-lg object-contain bg-cyan-500/10 border border-cyan-400/30 p-0.5 shadow-[0_0_12px_rgba(34,211,238,0.25)] flex-shrink-0"
              />
              <div className={isCollapsed ? 'lg:hidden' : 'block'}>
                <span className="text-base font-black text-cyan-300 tracking-wider uppercase font-sans">
                  LAMON GAME
                </span>
                <span className="text-[9px] text-cyan-400/70 font-mono font-bold block -mt-0.5 tracking-[0.2em] uppercase">
                  ORBITAL HUD
                </span>
              </div>
            </Link>

            {/* Collapse toggle button on Desktop */}
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
              className="hidden lg:flex items-center justify-center p-1.5 rounded-lg text-cyan-300/70 hover:text-cyan-200 hover:bg-cyan-500/10 transition cursor-pointer"
            >
              {isCollapsed ? (
                <ChevronsRight className="w-4 h-4 text-cyan-400" />
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

          {/* Navigation Items */}
          <nav
            className={`py-3.5 space-y-5 overflow-y-auto max-h-[calc(100vh-140px)] text-sm transition-all duration-300 ${
              isCollapsed ? 'lg:px-2 px-3.5' : 'px-3.5'
            }`}
          >
            <div>
              {isCollapsed ? (
                <div className="hidden lg:block w-8 h-[1px] bg-cyan-500/20 mx-auto my-2" />
              ) : (
                <div className="px-3 pb-2 text-[10px] font-mono font-bold text-cyan-400/70 uppercase tracking-[0.2em]">
                  Command Rail
                </div>
              )}
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => {
                      if (isCollapsed) {
                        onToggleCollapse();
                      } else {
                        setIsDashboardOpen((prev) => !prev);
                      }
                      scrollToId('dashboardOverview', 'dashboard');
                    }}
                    title="Dashboard"
                    className={`w-full flex items-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isCollapsed
                        ? 'lg:justify-center lg:p-2.5 px-3.5 py-2.5 justify-between'
                        : 'justify-between px-3.5 py-2.5'
                    } ${
                      activeTab === 'dashboard'
                        ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 shadow-[0_0_16px_rgba(34,211,238,0.22)] font-bold'
                        : isSubTabActive
                        ? 'bg-cyan-500/10 text-cyan-200 border border-cyan-500/25 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                      <span className={isCollapsed ? 'lg:hidden' : 'inline'}>Dashboard</span>
                    </div>
                    {!isCollapsed && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 opacity-80 transition-transform duration-200 ${
                          isDashboardOpen ? 'rotate-0' : '-rotate-90'
                        }`}
                      />
                    )}
                  </button>

                  {/* Sub-tabs (Expanded state) */}
                  {!isCollapsed && isDashboardOpen && (
                    <ul className="mt-1.5 ml-3.5 pl-3 border-l border-cyan-500/25 space-y-1">
                      <li>
                        <button
                          onClick={() => scrollToId('orbitalHubSection', 'orbital')}
                          title="Orbital Traffic Hub"
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            activeTab === 'orbital'
                              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Orbit className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                            <span className="truncate">Orbital Traffic</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono font-bold flex-shrink-0">
                            HUD
                          </span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => scrollToId('conversionSection', 'conversion')}
                          title="Tỷ Lệ Tải & Thiết Bị"
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            activeTab === 'conversion'
                              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Download className="w-4 h-4 flex-shrink-0 text-sky-400" />
                            <span className="truncate">Tỷ Lệ Tải &amp; Thiết Bị</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-300 font-mono font-bold flex-shrink-0">
                            CR%
                          </span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => scrollToId('gamePerformanceSection', 'games')}
                          title="Hiệu Quả 4 Game"
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            activeTab === 'games'
                              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Trophy className="w-4 h-4 flex-shrink-0 text-amber-400" />
                            <span className="truncate">Hiệu Quả 4 Game</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 font-mono font-bold flex-shrink-0">
                            TOP
                          </span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => scrollToId('dataTableSection', 'table')}
                          title="Bảng Dữ Liệu Chi Tiết"
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            activeTab === 'table'
                              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Share2 className="w-4 h-4 flex-shrink-0 text-indigo-400" />
                            <span className="truncate">Bảng Dữ Liệu Chi Tiết</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => {
                            onExportCSV();
                            onClose();
                          }}
                          title="Xuất Báo Cáo Excel (CSV)"
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-500/10 transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <FileSpreadsheet className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                            <span className="truncate">Xuất Báo Cáo Excel</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono font-bold flex-shrink-0">
                            CSV
                          </span>
                        </button>
                      </li>
                    </ul>
                  )}

                  {/* Sub-tabs in Collapsed Icon Mode */}
                  {isCollapsed && (
                    <ul className="mt-1.5 space-y-1">
                      <li>
                        <button
                          onClick={() => scrollToId('orbitalHubSection', 'orbital')}
                          title="Orbital Traffic"
                          className={`w-full flex items-center justify-center p-2 rounded-lg text-xs transition cursor-pointer ${
                            activeTab === 'orbital'
                              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40'
                              : 'text-slate-400 hover:text-cyan-200 hover:bg-cyan-500/10'
                          }`}
                        >
                          <Orbit className="w-4 h-4 text-cyan-400" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => scrollToId('conversionSection', 'conversion')}
                          title="Tỷ Lệ Tải & Thiết Bị"
                          className={`w-full flex items-center justify-center p-2 rounded-lg text-xs transition cursor-pointer ${
                            activeTab === 'conversion'
                              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40'
                              : 'text-slate-400 hover:text-cyan-200 hover:bg-cyan-500/10'
                          }`}
                        >
                          <Download className="w-4 h-4 text-sky-400" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => scrollToId('gamePerformanceSection', 'games')}
                          title="Hiệu Quả 4 Game"
                          className={`w-full flex items-center justify-center p-2 rounded-lg text-xs transition cursor-pointer ${
                            activeTab === 'games'
                              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40'
                              : 'text-slate-400 hover:text-cyan-200 hover:bg-cyan-500/10'
                          }`}
                        >
                          <Trophy className="w-4 h-4 text-amber-400" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => scrollToId('dataTableSection', 'table')}
                          title="Bảng Dữ Liệu Chi Tiết"
                          className={`w-full flex items-center justify-center p-2 rounded-lg text-xs transition cursor-pointer ${
                            activeTab === 'table'
                              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40'
                              : 'text-slate-400 hover:text-cyan-200 hover:bg-cyan-500/10'
                          }`}
                        >
                          <Share2 className="w-4 h-4 text-indigo-400" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            onExportCSV();
                            onClose();
                          }}
                          title="Xuất Báo Cáo Excel (CSV)"
                          className="w-full flex items-center justify-center p-2 rounded-lg text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition cursor-pointer"
                        >
                          <FileSpreadsheet className="w-4 h-4" />
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>

            {/* Section 2: SYSTEM STATUS */}
            <div>
              {isCollapsed ? (
                <div
                  title="Google Sheets: Live Sync 8s"
                  className="hidden lg:flex items-center justify-center p-2 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-emerald-400"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                </div>
              ) : (
                <>
                  <div className="px-3 pb-2 text-[10px] font-mono font-bold text-cyan-400/70 uppercase tracking-[0.2em]">
                    System Status
                  </div>
                  <div className="p-3 rounded-xl bg-[#07152e]/80 border border-cyan-500/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Sheets Link:</span>
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                        <span>ONLINE 8s</span>
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
        <div className="p-3.5 border-t border-cyan-500/20 bg-[#030816]">
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-[0_0_12px_rgba(34,211,238,0.35)] flex-shrink-0">
                A
              </div>
              <div className={isCollapsed ? 'lg:hidden' : 'block min-w-0'}>
                <div className="text-xs font-bold text-white truncate">Admin Manager</div>
                <div className="text-[10px] text-cyan-300/70 truncate">admin@lamongame.com</div>
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
