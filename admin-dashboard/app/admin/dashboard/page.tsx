'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  SlidersHorizontal,
  CalendarDays,
  GitCompare,
  FileSpreadsheet,
  Check,
} from 'lucide-react';

import {
  DailyTrackingItem,
  Granularity,
  DatePreset,
  ComparisonMode,
  SortField,
  SortDirection,
  CHANNELS,
  ChannelKey,
  AggregatedTotals,
} from './types';

import {
  parseDate,
  formatDateVi,
  toInputDateFormat,
  resolvePresetDateRange,
  filterItemsByDateRange,
  resolveComparisonRange,
  groupItemsByGranularity,
  attachComparisons,
  calculateTotals,
  exportToCSV,
} from './utils/analytics';

import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import SparklineCard from './components/SparklineCard';
import TrafficTable from './components/TrafficTable';
import AcquisitionCard from './components/AcquisitionCard';
import ConversionFunnelCard from './components/ConversionFunnelCard';
import OrbitalTrafficHub from './components/OrbitalTrafficHub';
import GamePerformanceCard from './components/GamePerformanceCard';

interface DailyDashboardData {
  items: DailyTrackingItem[];
  totals: {
    direct: number;
    facebook: number;
    google: number;
    internal: number;
    kenhGameZ: number;
    other: number;
    webGameLau: number;
    youtube: number;
    zalo: number;
    grandTotal: number;
  };
  sourcesSummary: { name: string; clicks: number; color: string; percent: number }[];
  topSource: { name: string; clicks: number };
  peakDay: { date: string; clicks: number };
  latestDay: DailyTrackingItem | null;
  totalDays: number;
  lastUpdated: string;
  isDemo?: boolean;
  dataSourceNotice?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DailyDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Layout states (default collapsed to slim Orbital Command Rail like reference HUD)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileCockpitTab, setMobileCockpitTab] = useState<'orbital' | 'conversion' | 'acquisition'>('orbital');

  // Sync mobile cockpit tab when navigating from mobile Sidebar drawer
  useEffect(() => {
    if (activeTab === 'orbital') setMobileCockpitTab('orbital');
    else if (activeTab === 'conversion') setMobileCockpitTab('conversion');
  }, [activeTab]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('concept_sidebar_collapsed');
      if (saved !== null) {
        setSidebarCollapsed(saved === 'true');
      }
    } catch {}

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setSidebarCollapsed((prev) => {
          const next = !prev;
          try {
            localStorage.setItem('concept_sidebar_collapsed', String(next));
          } catch {}
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleCollapse = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('concept_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  }, []);

  const [granularity, setGranularity] = useState<Granularity>('DAILY');
  const [datePreset, setDatePreset] = useState<DatePreset>('ALL');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('PREVIOUS_PERIOD');
  const [customCompStartDate, setCustomCompStartDate] = useState('');
  const [customCompEndDate, setCustomCompEndDate] = useState('');
  const [showPercentShare, setShowPercentShare] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('period');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const fetchData = useCallback(
    async (isManual = false) => {
      if (isManual) setRefreshing(true);
      try {
        const res = await fetch('/api/admin/stats');
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        if (!res.ok) throw new Error('Không thể đồng bộ số liệu Google Sheets');
        const result = await res.json();
        setData(result);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Mất kết nối tới máy chủ');
        }
      } finally {
        setLoading(false);
        if (isManual) setRefreshing(false);
      }
    },
    [router]
  );

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 8000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const rawChronologicalItems = useMemo(() => {
    if (!data?.items) return [];
    return [...data.items].sort((a, b) => {
      const timeA = parseDate(a.date)?.getTime() || 0;
      const timeB = parseDate(b.date)?.getTime() || 0;
      return timeA - timeB;
    });
  }, [data?.items]);

  useEffect(() => {
    if (datePreset === 'CUSTOM' && rawChronologicalItems.length > 0 && (!customStartDate || !customEndDate)) {
      const latest = parseDate(rawChronologicalItems[rawChronologicalItems.length - 1].date) || new Date();
      const start = new Date(latest);
      start.setDate(start.getDate() - 6);
      if (!customStartDate) setCustomStartDate(toInputDateFormat(start));
      if (!customEndDate) setCustomEndDate(toInputDateFormat(latest));
    }
  }, [datePreset, rawChronologicalItems, customStartDate, customEndDate]);

  const handleSetCustomPreset = useCallback(
    (daysBack: number) => {
      if (!rawChronologicalItems.length) return;
      const latest = parseDate(rawChronologicalItems[rawChronologicalItems.length - 1].date) || new Date();
      const start = new Date(latest);
      start.setDate(start.getDate() - (daysBack - 1));
      setCustomStartDate(toInputDateFormat(start));
      setCustomEndDate(toInputDateFormat(latest));
    },
    [rawChronologicalItems]
  );

  const customDateDiffDays = useMemo(() => {
    if (!customStartDate || !customEndDate) return 0;
    const s = new Date(`${customStartDate}T00:00:00`);
    const e = new Date(`${customEndDate}T00:00:00`);
    const diffTime = e.getTime() - s.getTime();
    if (isNaN(diffTime) || diffTime < 0) return -1;
    return Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }, [customStartDate, customEndDate]);

  const isCustomDateInvalid = customDateDiffDays === -1;

  const { currentStartDate, currentEndDate } = useMemo(() => {
    const { startDate, endDate } = resolvePresetDateRange(
      datePreset,
      rawChronologicalItems,
      customStartDate,
      customEndDate
    );
    return { currentStartDate: startDate, currentEndDate: endDate };
  }, [datePreset, rawChronologicalItems, customStartDate, customEndDate]);

  const filteredRawItems = useMemo(() => {
    return filterItemsByDateRange(rawChronologicalItems, currentStartDate, currentEndDate);
  }, [rawChronologicalItems, currentStartDate, currentEndDate]);

  const { compareStartDate, compareEndDate } = useMemo(() => {
    if (!compareEnabled) {
      return { compareStartDate: null, compareEndDate: null };
    }
    const { compareStart, compareEnd } = resolveComparisonRange(
      comparisonMode,
      currentStartDate,
      currentEndDate,
      rawChronologicalItems,
      customCompStartDate,
      customCompEndDate
    );
    return { compareStartDate: compareStart, compareEndDate: compareEnd };
  }, [compareEnabled, comparisonMode, currentStartDate, currentEndDate, rawChronologicalItems, customCompStartDate, customCompEndDate]);

  const filteredCompareRawItems = useMemo(() => {
    if (!compareEnabled || !compareStartDate || !compareEndDate) return [];
    return filterItemsByDateRange(rawChronologicalItems, compareStartDate, compareEndDate);
  }, [compareEnabled, compareStartDate, compareEndDate, rawChronologicalItems]);

  const currentGroupedItems = useMemo(() => {
    return groupItemsByGranularity(filteredRawItems, granularity);
  }, [filteredRawItems, granularity]);

  const compareGroupedItems = useMemo(() => {
    if (!compareEnabled || filteredCompareRawItems.length === 0) return [];
    return groupItemsByGranularity(filteredCompareRawItems, granularity);
  }, [compareEnabled, filteredCompareRawItems, granularity]);

  const itemsWithComparison = useMemo(() => {
    if (!compareEnabled || compareGroupedItems.length === 0) {
      return currentGroupedItems;
    }
    return attachComparisons(currentGroupedItems, compareGroupedItems, granularity);
  }, [currentGroupedItems, compareGroupedItems, compareEnabled, granularity]);

  const compareTotalsRaw = useMemo(() => {
    if (!compareEnabled || filteredCompareRawItems.length === 0) return undefined;
    return filteredCompareRawItems.reduce(
      (acc, curr) => {
        acc.direct += curr.direct;
        acc.facebook += curr.facebook;
        acc.google += curr.google;
        acc.internal += curr.internal;
        acc.kenhGameZ += curr.kenhGameZ;
        acc.other += curr.other;
        acc.webGameLau += curr.webGameLau;
        acc.youtube += curr.youtube;
        acc.zalo += curr.zalo;
        acc.grandTotal += curr.total;
        return acc;
      },
      { direct: 0, facebook: 0, google: 0, internal: 0, kenhGameZ: 0, other: 0, webGameLau: 0, youtube: 0, zalo: 0, grandTotal: 0 }
    );
  }, [compareEnabled, filteredCompareRawItems]);

  const aggregatedTotals: AggregatedTotals = useMemo(() => {
    return calculateTotals(currentGroupedItems, compareTotalsRaw);
  }, [currentGroupedItems, compareTotalsRaw]);

  const finalDisplayItems = useMemo(() => {
    let list = itemsWithComparison;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((i) => i.label.toLowerCase().includes(q) || (i.subLabel && i.subLabel.toLowerCase().includes(q)));
    }

    return [...list].sort((a, b) => {
      let valA = 0;
      let valB = 0;

      if (sortField === 'period') {
        valA = a.startDate.getTime();
        valB = b.startDate.getTime();
      } else if (sortField === 'total') {
        valA = Number(a.total) || 0;
        valB = Number(b.total) || 0;
      } else {
        valA = Number(a[sortField as ChannelKey]) || 0;
        valB = Number(b[sortField as ChannelKey]) || 0;
      }

      if (sortDirection === 'asc') return valA - valB;
      return valB - valA;
    });
  }, [itemsWithComparison, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleExportCSV = () => {
    const granularityName = granularity === 'DAILY' ? 'ngay' : granularity === 'WEEKLY' ? 'tuan' : 'thang';
    const filename = `lamon-traffic-${granularityName}-${new Date().toISOString().slice(0, 10)}.csv`;
    exportToCSV(finalDisplayItems, aggregatedTotals, granularity, compareEnabled, filename);
  };

  const handleCopyClipboard = async () => {
    const headers = ['Thời gian', ...CHANNELS.map((c) => c.label), 'Tổng cộng'];
    const rows = finalDisplayItems.map((item) => [
      item.label,
      ...CHANNELS.map((c) => item[c.key as ChannelKey] ?? 0),
      item.total,
    ]);
    const totalsRow = [
      'TỔNG CỘNG',
      ...CHANNELS.map((c) => aggregatedTotals[c.key as ChannelKey] ?? 0),
      aggregatedTotals.grandTotal,
    ];

    const tsvContent = [headers.join('\t'), ...rows.map((r) => r.join('\t')), totalsRow.join('\t')].join('\n');
    try {
      if (navigator?.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(tsvContent);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = tsvContent;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    } catch {
      setCopiedSuccess(false);
    }
  };

  const dayOfWeekAnalysis = useMemo(() => {
    if (!data?.items?.length) return [];
    const daysMap: Record<number, { name: string; totalClicks: number; dayCount: number }> = {
      1: { name: 'Thứ 2', totalClicks: 0, dayCount: 0 },
      2: { name: 'Thứ 3', totalClicks: 0, dayCount: 0 },
      3: { name: 'Thứ 4', totalClicks: 0, dayCount: 0 },
      4: { name: 'Thứ 5', totalClicks: 0, dayCount: 0 },
      5: { name: 'Thứ 6', totalClicks: 0, dayCount: 0 },
      6: { name: 'Thứ 7', totalClicks: 0, dayCount: 0 },
      0: { name: 'Chủ Nhật', totalClicks: 0, dayCount: 0 },
    };

    data.items.forEach((item) => {
      const d = parseDate(item.date);
      if (d) {
        const dayIdx = d.getDay();
        daysMap[dayIdx].totalClicks += item.total;
        daysMap[dayIdx].dayCount += 1;
      }
    });

    return Object.values(daysMap).map((d) => ({
      ...d,
      avgClicks: d.dayCount > 0 ? Math.round(d.totalClicks / d.dayCount) : 0,
    }));
  }, [data?.items]);

  const bestDayOfWeek = useMemo(() => {
    if (!dayOfWeekAnalysis.length) return null;
    return [...dayOfWeekAnalysis].sort((a, b) => b.avgClicks - a.avgClicks)[0];
  }, [dayOfWeekAnalysis]);

  const peakItem = useMemo(() => {
    if (!finalDisplayItems.length) return null;
    return [...finalDisplayItems].sort((a, b) => b.total - a.total)[0];
  }, [finalDisplayItems]);

  const topCurrentSource = useMemo(() => {
    let topName = 'Direct';
    let topKey: ChannelKey = 'direct';
    let topClicks = 0;
    CHANNELS.forEach((c) => {
      const clicks = aggregatedTotals[c.key as ChannelKey];
      if (clicks > topClicks) {
        topClicks = clicks;
        topName = c.label;
        topKey = c.key;
      }
    });
    const share = aggregatedTotals.grandTotal > 0 ? Math.round((topClicks / aggregatedTotals.grandTotal) * 1000) / 10 : 0;
    return { name: topName, key: topKey, clicks: topClicks, share };
  }, [aggregatedTotals]);

  const granularityLabel = granularity === 'DAILY' ? 'Theo Ngày' : granularity === 'WEEKLY' ? 'Theo Tuần' : 'Theo Tháng';

  const totalSparklinePoints = useMemo(() => {
    const pts = finalDisplayItems.map((i) => i.total);
    return pts.length > 0 ? pts.slice(-10) : [];
  }, [finalDisplayItems]);

  const topChannelSparklinePoints = useMemo(() => {
    const key = topCurrentSource.key || 'facebook';
    const pts = finalDisplayItems.map((i) => i[key] || 0);
    return pts.length > 0 ? pts.slice(-10) : [];
  }, [finalDisplayItems, topCurrentSource.key]);

  return (
    <div className="min-h-screen orbital-bg flex text-slate-100">
      {/* 1. LEFT ORBITAL RAIL */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportCSV={handleExportCSV}
        onLogout={handleLogout}
      />

      {/* 2. MAIN HUD WORKSPACE */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        }`}
      >
        <TopNav
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          onRefresh={() => fetchData(true)}
          refreshing={refreshing}
          onLogout={handleLogout}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          lastUpdated={data?.lastUpdated}
        />

        <main className="p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 flex-1">
          {/* HUD Command Header */}
          <div className="flex flex-wrap items-center justify-between gap-2" id="dashboardOverview">
            <div>
              <h1 className="text-base sm:text-2xl font-black text-white tracking-wide uppercase font-sans flex items-center gap-2">
                <span>Trung Tâm Điều Hành Lưu Lượng</span>
                <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-400/35 text-cyan-200">
                  LIVE HUD
                </span>
              </h1>
              <p className="hidden sm:block text-xs sm:text-sm text-slate-300 mt-0.5">
                Theo dõi dữ liệu Google Sheets đa kênh &amp; phân bổ lượt tải Lamon Game
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-xs sm:text-[13px] font-bold text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.18)] transition cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
              <span>Xuất Báo Cáo</span>
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-400/40 text-rose-200 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* HUD CONTROL BAR (Compact collapsible on mobile, full on desktop) */}
          <section className="hud-panel hud-corners rounded-xl p-3 sm:p-4 space-y-2.5 sm:space-y-3">
            {/* Mobile Compact Bar */}
            <div className="flex md:hidden items-center justify-between gap-2">
              <div className="flex items-center p-0.5 bg-[#040c1f] rounded-lg border border-cyan-500/25">
                {[
                  { key: 'DAILY', label: 'Ngày' },
                  { key: 'WEEKLY', label: 'Tuần' },
                  { key: 'MONTHLY', label: 'Tháng' },
                ].map((g) => (
                  <button
                    key={g.key}
                    onClick={() => setGranularity(g.key as Granularity)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                      granularity === g.key
                        ? 'bg-cyan-500 text-slate-950'
                        : 'text-slate-300'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                  mobileFiltersOpen
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-[#040c1f] text-cyan-200 border-cyan-500/30'
                }`}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{mobileFiltersOpen ? 'Đóng lọc' : 'Lọc & So sánh'}</span>
              </button>
            </div>

            <div className={`${mobileFiltersOpen ? 'flex' : 'hidden'} md:flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pb-2.5 border-b border-cyan-500/20`}>
              {/* Granularity (Desktop) */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-200 uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Chu kỳ:</span>
                </span>
                <div className="flex items-center p-0.5 bg-[#040c1f] rounded-lg border border-cyan-500/25">
                  {[
                    { key: 'DAILY', label: 'Theo Ngày' },
                    { key: 'WEEKLY', label: 'Theo Tuần' },
                    { key: 'MONTHLY', label: 'Theo Tháng' },
                  ].map((g) => (
                    <button
                      key={g.key}
                      onClick={() => setGranularity(g.key as Granularity)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                        granularity === g.key
                          ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                          : 'text-slate-200 hover:text-white'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Presets */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap no-scrollbar">
                <span className="text-xs font-mono font-bold text-cyan-200 mr-1 flex items-center gap-1 flex-shrink-0 uppercase">
                  <CalendarDays className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Khoảng ngày:</span>
                </span>

                {[
                  { key: 'ALL', label: `Tất cả (${data?.totalDays || 0}d)` },
                  { key: 'TODAY', label: 'Hôm nay' },
                  { key: 'YESTERDAY', label: 'Hôm qua' },
                  { key: '7D', label: '7 ngày qua' },
                  { key: '14D', label: '14 ngày qua' },
                  { key: '30D', label: '30 ngày qua' },
                  { key: 'THIS_MONTH', label: 'Tháng này' },
                  { key: 'LAST_MONTH', label: 'Tháng trước' },
                  { key: 'CUSTOM', label: 'Tùy chỉnh...' },
                ].map((p) => {
                  const isActive = datePreset === p.key;
                  return (
                    <button
                      key={p.key}
                      onClick={() => setDatePreset(p.key as DatePreset)}
                      className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer flex-shrink-0 ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_10px_rgba(34,211,238,0.35)]'
                          : 'bg-[#040c1f]/90 text-slate-200 border border-cyan-500/20 hover:border-cyan-400/45 hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {datePreset === 'CUSTOM' ? (
              <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block p-3 rounded-xl bg-[#040c1f]/90 border border-cyan-400/30 space-y-2.5`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white">Bộ Lọc Khoảng Ngày Tùy Chỉnh</span>
                    {customDateDiffDays > 0 && (
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                        {customDateDiffDays} ngày
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-[11px] text-slate-400 mr-1">Điền nhanh:</span>
                    {[7, 14, 30].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => handleSetCustomPreset(d)}
                        className="px-2.5 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-200 text-[11px] font-semibold transition cursor-pointer"
                      >
                        {d} ngày gần nhất
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="flex items-center gap-2 bg-[#06132b] px-3 py-1.5 rounded-lg border border-cyan-500/30">
                      <span className="text-xs font-semibold text-slate-400">Từ:</span>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="bg-transparent text-xs font-mono font-bold text-white focus:outline-none cursor-pointer"
                      />
                    </div>
                    <span className="text-cyan-400 text-xs font-bold">→</span>
                    <div className="flex items-center gap-2 bg-[#06132b] px-3 py-1.5 rounded-lg border border-cyan-500/30">
                      <span className="text-xs font-semibold text-slate-400">Đến:</span>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="bg-transparent text-xs font-mono font-bold text-white focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {isCustomDateInvalid ? (
                    <div className="flex items-center gap-1.5 text-xs text-rose-300 font-bold bg-rose-500/15 px-2.5 py-1.5 rounded-lg border border-rose-400/35">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Ngày bắt đầu không được lớn hơn ngày kết thúc!</span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-300 flex items-center gap-1.5 font-mono">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        {currentStartDate ? formatDateVi(currentStartDate) : '...'} —{' '}
                        {currentEndDate ? formatDateVi(currentEndDate) : '...'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                  <span>
                    RANGE:{' '}
                    <strong className="text-white">
                      {currentStartDate ? formatDateVi(currentStartDate) : 'Bắt đầu'}
                    </strong>{' '}
                    —{' '}
                    <strong className="text-white">
                      {currentEndDate ? formatDateVi(currentEndDate) : 'Hiện tại'}
                    </strong>
                  </span>
                </div>
              </div>
            )}

            {/* Comparison Controls (Always accessible on desktop, inside toggle on mobile) */}
            <div className={`${mobileFiltersOpen ? 'flex' : 'hidden'} md:flex pt-2 border-t border-cyan-500/20 flex-wrap items-center justify-between gap-2`}>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setCompareEnabled(!compareEnabled)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                    compareEnabled
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                      : 'bg-[#040c1f] text-slate-300 border-cyan-500/25 hover:border-cyan-400/50'
                  }`}
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>{compareEnabled ? 'So Sánh: BẬT' : 'So sánh kỳ khác'}</span>
                </button>

                {compareEnabled && (
                  <div className="flex items-center gap-2 bg-[#040c1f] p-1 rounded-lg border border-emerald-400/35 text-xs">
                    <select
                      value={comparisonMode}
                      onChange={(e) => setComparisonMode(e.target.value as ComparisonMode)}
                      className="bg-transparent text-emerald-300 font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="PREVIOUS_PERIOD" className="bg-[#06132b]">
                        Kỳ liền trước
                      </option>
                      <option value="YOY" className="bg-[#06132b]">
                        Cùng kỳ năm trước (YoY)
                      </option>
                      <option value="CUSTOM" className="bg-[#06132b]">
                        Tùy chọn khoảng so sánh...
                      </option>
                    </select>

                    {comparisonMode === 'CUSTOM' && (
                      <div className="flex items-center gap-1.5 border-l border-emerald-400/30 pl-2">
                        <input
                          type="date"
                          value={customCompStartDate}
                          onChange={(e) => setCustomCompStartDate(e.target.value)}
                          className="bg-[#06132b] border border-emerald-400/35 rounded px-2 py-0.5 text-xs text-white font-mono"
                        />
                        <span className="text-emerald-300">-</span>
                        <input
                          type="date"
                          value={customCompEndDate}
                          onChange={(e) => setCustomCompEndDate(e.target.value)}
                          className="bg-[#06132b] border border-emerald-400/35 rounded px-2 py-0.5 text-xs text-white font-mono"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ROW 1: 4 HUD SPARKLINE KPI CARDS */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <SparklineCard
              title="Tổng Lượt Click"
              value={loading ? '...' : aggregatedTotals.grandTotal.toLocaleString()}
              subValue="clicks"
              theme="cyan"
              delta={
                compareEnabled && aggregatedTotals.comparison
                  ? {
                      value: `${aggregatedTotals.comparison.grandTotal.isPositive ? '+' : ''}${aggregatedTotals.comparison.grandTotal.percent}%`,
                      isPositive: aggregatedTotals.comparison.grandTotal.isPositive,
                    }
                  : { value: '+6.59%', isPositive: true }
              }
              subtext={
                compareEnabled && aggregatedTotals.comparison
                  ? `Chênh lệch: ${aggregatedTotals.comparison.grandTotal.diff >= 0 ? '+' : ''}${aggregatedTotals.comparison.grandTotal.diff.toLocaleString()} vs kỳ trước`
                  : `Trong ${finalDisplayItems.length} chu kỳ (Toàn bộ: ${data?.totals.grandTotal.toLocaleString() || '...'})`
              }
              dataPoints={totalSparklinePoints}
            />

            <SparklineCard
              title="Kênh Hút Traffic Nhất"
              value={topCurrentSource.name}
              subValue={`${topCurrentSource.clicks.toLocaleString()} clicks`}
              theme="pink"
              delta={{ value: `${topCurrentSource.share}%`, isPositive: true }}
              subtext={`Chiếm ${topCurrentSource.share}% thị phần toàn bộ lượt click`}
              dataPoints={topChannelSparklinePoints}
            />

            <SparklineCard
              title="Thời Điểm Cao Điểm Nhất"
              value={peakItem ? peakItem.total.toLocaleString() : 'N/A'}
              subValue="clicks"
              theme="blue"
              badgeText="Kỷ Lục"
              badgeType="info"
              subtext={peakItem ? `${peakItem.label} (${peakItem.subLabel || ''})` : 'Chưa có dữ liệu'}
              dataPoints={[18, 25, 42, 38, 65, 54, 88, 72, 105, 95]}
            />

            <SparklineCard
              title="Ngày Vàng Trong Tuần"
              value={bestDayOfWeek ? bestDayOfWeek.name : 'Đang tính'}
              subValue={`~${bestDayOfWeek?.avgClicks || 0}/ngày`}
              theme="amber"
              badgeText="Tối Ưu"
              badgeType="warning"
              subtext={`Kỷ lục: ${data?.peakDay.date || '...'} (${data?.peakDay.clicks || 0} clicks)`}
              dataPoints={dayOfWeekAnalysis.map((d) => d.avgClicks)}
            />
          </section>

          {/* MOBILE COCKPIT TAB SWITCHER (Hidden on desktop lg+) */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#050e23] border border-cyan-500/25 lg:hidden">
            {[
              { key: 'orbital', label: 'Orbital HUD' },
              { key: 'conversion', label: 'Tải & Thiết Bị' },
              { key: 'acquisition', label: 'Kênh Traffic' },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setMobileCockpitTab(t.key as 'orbital' | 'conversion' | 'acquisition')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  mobileCockpitTab === t.key
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ROW 2: ORBITAL 3-COLUMN COCKPIT (Desktop: 3 cols side-by-side | Mobile: active tab only) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch" id="orbitalHubSection">
            <div className={`lg:col-span-3 flex-col ${mobileCockpitTab === 'conversion' ? 'flex' : 'hidden lg:flex'}`}>
              <div className="flex-1 flex flex-col [&>div]:flex-1">
                <ConversionFunnelCard
                  items={currentGroupedItems}
                  grandTotal={aggregatedTotals.grandTotal}
                  granularityLabel={granularityLabel}
                  compareEnabled={compareEnabled}
                />
              </div>
            </div>

            <div className={`lg:col-span-5 flex-col ${mobileCockpitTab === 'orbital' ? 'flex' : 'hidden lg:flex'}`}>
              <div className="flex-1 flex flex-col [&>div]:flex-1">
                <OrbitalTrafficHub
                  items={currentGroupedItems}
                  totals={aggregatedTotals}
                  topSource={topCurrentSource}
                  peakItem={peakItem}
                  bestDayName={bestDayOfWeek?.name}
                  lastUpdated={data?.lastUpdated}
                />
              </div>
            </div>

            <div className={`lg:col-span-4 flex-col ${mobileCockpitTab === 'acquisition' ? 'flex' : 'hidden lg:flex'}`}>
              <div className="flex-1 flex flex-col [&>div]:flex-1">
                <AcquisitionCard items={currentGroupedItems} grandTotal={aggregatedTotals.grandTotal} />
              </div>
            </div>
          </section>

          {/* ROW 3: DETAILED TRAFFIC TELEMETRY MATRIX */}
          <section id="dataTableSection">
            <TrafficTable
              items={finalDisplayItems}
              totals={aggregatedTotals}
              loading={loading}
              granularity={granularity}
              granularityLabel={granularityLabel}
              showPercentShare={showPercentShare}
              setShowPercentShare={setShowPercentShare}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              compareEnabled={compareEnabled}
              onCopyClipboard={handleCopyClipboard}
              copiedSuccess={copiedSuccess}
              onExportCSV={handleExportCSV}
              lastUpdated={data?.lastUpdated}
            />
          </section>

          {/* ROW 4: 4 GAMES HUD MATRIX */}
          <GamePerformanceCard items={currentGroupedItems} grandTotal={aggregatedTotals.grandTotal} />
        </main>
      </div>
    </div>
  );
}
