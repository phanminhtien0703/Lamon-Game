'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  BarChart3,
  Share2,
  Calendar,
  FileSpreadsheet,
  LogOut,
  X,
  ChevronRight,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Download,
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

  const isSubTabActive = ['charts', 'conversion', 'table', 'dow'].includes(activeTab);

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
                {/* 1. Parent Tab: Dashboard */}
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
                        ? 'bg-[#5969ff] text-white shadow-md shadow-[#5969ff]/30 font-bold'
                        : isSubTabActive
                        ? 'bg-white/10 text-white font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="w-4 h-4 flex-shrink-0 text-[#38bdf8]" />
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

                  {/* Sub-tabs under Dashboard (Expanded state) */}
                  {!isCollapsed && isDashboardOpen && (
                    <ul className="mt-1 ml-3.5 pl-3 border-l border-[#222144] space-y-1">
                      {/* Sub-tab 1: Biểu Đồ Lưu Lượng */}
                      <li>
                        <button
                          onClick={() => scrollToId('analyticsCharts', 'charts')}
                          title="Biểu Đồ Lưu Lượng"
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            activeTab === 'charts'
                              ? 'bg-[#5969ff] text-white shadow-sm shadow-[#5969ff]/30 font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <BarChart3 className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">Biểu Đồ Lưu Lượng</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                        </button>
                      </li>

                      {/* Sub-tab: Tỷ Lệ Tải & Thiết Bị */}
                      <li>
                        <button
                          onClick={() => scrollToId('conversionSection', 'conversion')}
                          title="Tỷ Lệ Tải & Thiết Bị"
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            activeTab === 'conversion'
                              ? 'bg-[#5969ff] text-white shadow-sm shadow-[#5969ff]/30 font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Download className="w-4 h-4 flex-shrink-0 text-sky-400" />
                            <span className="truncate">Tỷ Lệ Tải & Thiết Bị</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold flex-shrink-0">
                            CR%
                          </span>
                        </button>
                      </li>

                      {/* Sub-tab 2: Bảng Dữ Liệu Chi Tiết */}
                      <li>
                        <button
                          onClick={() => scrollToId('dataTableSection', 'table')}
                          title="Bảng Dữ Liệu Chi Tiết"
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            activeTab === 'table'
                              ? 'bg-[#5969ff] text-white shadow-sm shadow-[#5969ff]/30 font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Share2 className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">Bảng Dữ Liệu Chi Tiết</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                        </button>
                      </li>

                      {/* Sub-tab 3: Ngày Vàng Trong Tuần */}
                      <li>
                        <button
                          onClick={() => scrollToId('dayOfWeekSection', 'dow')}
                          title="Ngày Vàng Trong Tuần"
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            activeTab === 'dow'
                              ? 'bg-[#5969ff] text-white shadow-sm shadow-[#5969ff]/30 font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">Ngày Vàng Trong Tuần</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                        </button>
                      </li>

                      {/* Sub-tab 4: Xuất Báo Cáo Excel */}
                      <li>
                        <button
                          onClick={() => {
                            onExportCSV();
                            onClose();
                          }}
                          title="Xuất Báo Cáo Excel (CSV)"
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <FileSpreadsheet className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                            <span className="truncate">Xuất Báo Cáo Excel</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold flex-shrink-0">
                            CSV
                          </span>
                        </button>
                      </li>
                    </ul>
                  )}

                  {/* Sub-tabs in Collapsed Icon Mode */}
                  {isCollapsed && (
                    <ul className="mt-1 space-y-1">
                      <li>
                        <button
                          onClick={() => scrollToId('analyticsCharts', 'charts')}
                          title="Biểu Đồ Lưu Lượng"
                          className={`w-full flex items-center justify-center p-2 rounded-lg text-xs transition cursor-pointer ${
                            activeTab === 'charts'
                              ? 'bg-[#5969ff] text-white shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <BarChart3 className="w-4 h-4" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => scrollToId('conversionSection', 'conversion')}
                          title="Tỷ Lệ Tải & Thiết Bị"
                          className={`w-full flex items-center justify-center p-2 rounded-lg text-xs transition cursor-pointer ${
                            activeTab === 'conversion'
                              ? 'bg-[#5969ff] text-white shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Download className="w-4 h-4 text-sky-400" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => scrollToId('dataTableSection', 'table')}
                          title="Bảng Dữ Liệu Chi Tiết"
                          className={`w-full flex items-center justify-center p-2 rounded-lg text-xs transition cursor-pointer ${
                            activeTab === 'table'
                              ? 'bg-[#5969ff] text-white shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => scrollToId('dayOfWeekSection', 'dow')}
                          title="Ngày Vàng Trong Tuần"
                          className={`w-full flex items-center justify-center p-2 rounded-lg text-xs transition cursor-pointer ${
                            activeTab === 'dow'
                              ? 'bg-[#5969ff] text-white shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            onExportCSV();
                            onClose();
                          }}
                          title="Xuất Báo Cáo Excel (CSV)"
                          className="w-full flex items-center justify-center p-2 rounded-lg text-xs text-emerald-400 hover:text-emerald-300 hover:bg-white/5 transition cursor-pointer"
                        >
                          <FileSpreadsheet className="w-4 h-4" />
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>

            {/* Section 2: TRẠNG THÁI HỆ THỐNG */}
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
