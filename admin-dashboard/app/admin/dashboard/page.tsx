'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Calendar, 
  MousePointerClick, 
  Flame, 
  RefreshCw, 
  LogOut, 
  Search, 
  ArrowUpDown, 
  ArrowUp,
  ArrowDown,
  Clock, 
  Radio, 
  AlertCircle,
  Sparkles,
  Layers,
  Filter,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  Zap,
  Award,
  Download,
  Copy,
  Check,
  GitCompare,
  Percent,
  SlidersHorizontal,
  ChevronDown,
  FileSpreadsheet
} from 'lucide-react';

import {
  DailyTrackingItem,
  GroupedTrackingItem,
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

import AnalyticsCharts from './components/AnalyticsCharts';

interface DailyDashboardData {
  items: DailyTrackingItem[];
  totals: {
    direct: number;
    facebook: number;
    google: number;
    kenhGameZ: number;
    other: number;
    webGameLau: number;
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

  // 1. GRANULARITY (Chu kỳ xem)
  const [granularity, setGranularity] = useState<Granularity>('DAILY');

  // 2. DATE RANGE PRESETS & PICKER
  const [datePreset, setDatePreset] = useState<DatePreset>('ALL');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // 3. COMPARISON CONTROLS
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('PREVIOUS_PERIOD');
  const [customCompStartDate, setCustomCompStartDate] = useState('');
  const [customCompEndDate, setCustomCompEndDate] = useState('');

  // 4. DISPLAY OPTIONS: % SHARE & SEARCH
  const [showPercentShare, setShowPercentShare] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 5. SORTING
  const [sortField, setSortField] = useState<SortField>('period');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Fetch API
  const fetchData = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch('/api/admin/stats');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) throw new Error('Không thể đồng bộ số liệu');
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
  }, [router]);

  // Polling every 8 seconds
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

  // Chronologically sorted raw data
  const rawChronologicalItems = useMemo(() => {
    if (!data?.items) return [];
    return [...data.items].sort((a, b) => {
      const timeA = parseDate(a.date)?.getTime() || 0;
      const timeB = parseDate(b.date)?.getTime() || 0;
      return timeA - timeB;
    });
  }, [data?.items]);

  // Resolve current date range
  const { currentStartDate, currentEndDate } = useMemo(() => {
    const { startDate, endDate } = resolvePresetDateRange(
      datePreset,
      rawChronologicalItems,
      customStartDate,
      customEndDate
    );
    return { currentStartDate: startDate, currentEndDate: endDate };
  }, [datePreset, rawChronologicalItems, customStartDate, customEndDate]);

  // Filter items in current date range
  const filteredRawItems = useMemo(() => {
    return filterItemsByDateRange(rawChronologicalItems, currentStartDate, currentEndDate);
  }, [rawChronologicalItems, currentStartDate, currentEndDate]);

  // Resolve comparison date range
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

  // Filter raw items in comparison date range
  const filteredCompareRawItems = useMemo(() => {
    if (!compareEnabled || !compareStartDate || !compareEndDate) return [];
    return filterItemsByDateRange(rawChronologicalItems, compareStartDate, compareEndDate);
  }, [compareEnabled, compareStartDate, compareEndDate, rawChronologicalItems]);

  // Group items by Granularity
  const currentGroupedItems = useMemo(() => {
    return groupItemsByGranularity(filteredRawItems, granularity);
  }, [filteredRawItems, granularity]);

  const compareGroupedItems = useMemo(() => {
    if (!compareEnabled || filteredCompareRawItems.length === 0) return [];
    return groupItemsByGranularity(filteredCompareRawItems, granularity);
  }, [compareEnabled, filteredCompareRawItems, granularity]);

  // Attach comparisons to items
  const itemsWithComparison = useMemo(() => {
    if (!compareEnabled || compareGroupedItems.length === 0) {
      return currentGroupedItems;
    }
    return attachComparisons(currentGroupedItems, compareGroupedItems, granularity);
  }, [currentGroupedItems, compareGroupedItems, compareEnabled, granularity]);

  // Compare totals
  const compareTotalsRaw = useMemo(() => {
    if (!compareEnabled || filteredCompareRawItems.length === 0) return undefined;
    return filteredCompareRawItems.reduce(
      (acc, curr) => {
        acc.direct += curr.direct;
        acc.facebook += curr.facebook;
        acc.google += curr.google;
        acc.kenhGameZ += curr.kenhGameZ;
        acc.other += curr.other;
        acc.webGameLau += curr.webGameLau;
        acc.zalo += curr.zalo;
        acc.grandTotal += curr.total;
        return acc;
      },
      { direct: 0, facebook: 0, google: 0, kenhGameZ: 0, other: 0, webGameLau: 0, zalo: 0, grandTotal: 0 }
    );
  }, [compareEnabled, filteredCompareRawItems]);

  // Aggregated totals
  const aggregatedTotals: AggregatedTotals = useMemo(() => {
    return calculateTotals(currentGroupedItems, compareTotalsRaw);
  }, [currentGroupedItems, compareTotalsRaw]);

  // Filter by search query & sort
  const finalDisplayItems = useMemo(() => {
    let list = itemsWithComparison;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((i) => i.label.toLowerCase().includes(q) || (i.subLabel && i.subLabel.toLowerCase().includes(q)));
    }

    return [...list].sort((a, b) => {
      let valA: number = 0;
      let valB: number = 0;

      if (sortField === 'period') {
        valA = a.startDate.getTime();
        valB = b.startDate.getTime();
      } else if (sortField === 'total') {
        valA = a.total;
        valB = b.total;
      } else {
        valA = a[sortField as ChannelKey];
        valB = b[sortField as ChannelKey];
      }

      if (sortDirection === 'asc') return valA - valB;
      return valB - valA;
    });
  }, [itemsWithComparison, searchQuery, sortField, sortDirection]);

  // Toggle Column Sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const granularityName = granularity === 'DAILY' ? 'ngay' : granularity === 'WEEKLY' ? 'tuan' : 'thang';
    const filename = `traffic-${granularityName}-${new Date().toISOString().slice(0, 10)}.csv`;
    exportToCSV(finalDisplayItems, aggregatedTotals, granularity, compareEnabled, filename);
  };

  // Copy TSV to Clipboard for Excel pasting
  const handleCopyClipboard = () => {
    const headers = ['Thời gian', ...CHANNELS.map((c) => c.label), 'Tổng cộng'];
    const rows = finalDisplayItems.map((item) => [
      item.label,
      item.direct,
      item.facebook,
      item.google,
      item.kenhGameZ,
      item.other,
      item.webGameLau,
      item.zalo,
      item.total,
    ]);
    const totalsRow = [
      'TỔNG CỘNG',
      aggregatedTotals.direct,
      aggregatedTotals.facebook,
      aggregatedTotals.google,
      aggregatedTotals.kenhGameZ,
      aggregatedTotals.other,
      aggregatedTotals.webGameLau,
      aggregatedTotals.zalo,
      aggregatedTotals.grandTotal,
    ];

    const tsvContent = [headers.join('\t'), ...rows.map((r) => r.join('\t')), totalsRow.join('\t')].join('\n');
    navigator.clipboard.writeText(tsvContent);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  // Day-of-week analysis
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

  // Peak period in current selection
  const peakItem = useMemo(() => {
    if (!finalDisplayItems.length) return null;
    return [...finalDisplayItems].sort((a, b) => b.total - a.total)[0];
  }, [finalDisplayItems]);

  // Top source in current selection
  const topCurrentSource = useMemo(() => {
    let topName = 'Direct';
    let topClicks = 0;
    CHANNELS.forEach((c) => {
      const clicks = aggregatedTotals[c.key as ChannelKey];
      if (clicks > topClicks) {
        topClicks = clicks;
        topName = c.label;
      }
    });
    const share = aggregatedTotals.grandTotal > 0 ? Math.round((topClicks / aggregatedTotals.grandTotal) * 1000) / 10 : 0;
    return { name: topName, clicks: topClicks, share };
  }, [aggregatedTotals]);

  const granularityLabel = granularity === 'DAILY' ? 'Theo Ngày' : granularity === 'WEEKLY' ? 'Theo Tuần' : 'Theo Tháng';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 selection:bg-cyan-500 selection:text-white">
      {/* ============================================================== */}
      {/* 1. HEADER */}
      {/* ============================================================== */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 rounded-xl border border-cyan-500/30 text-cyan-400 shadow-sm">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">Admin Tracking Portal</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold uppercase tracking-wider">
                  Traffic Analytics 2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Phân tích đa chiều lượt click, so sánh chu kỳ & cơ cấu nguồn truy cập</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span className="hidden sm:inline">Tự cập nhật (8s)</span>
              <span className="sm:hidden">Live</span>
            </div>

            {/* Manual Refresh */}
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              title="Làm mới số liệu ngay"
              className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition disabled:opacity-50 cursor-pointer active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 text-xs font-semibold transition cursor-pointer active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. MAIN CONTENT AREA */}
      {/* ============================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* CONTROL PANEL: GRANULARITY, DATE RANGE & TIME COMPARISON */}
        {/* ------------------------------------------------------------ */}
        <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl space-y-4">
          {/* Top Row: Granularity View Switcher & Date Presets */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/70">
            {/* 1. GRANULARITY TABS */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Xem theo:</span>
              </span>
              <div className="flex items-center p-1 bg-slate-950/80 rounded-xl border border-slate-800">
                <button
                  onClick={() => setGranularity('DAILY')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    granularity === 'DAILY'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Theo Ngày
                </button>
                <button
                  onClick={() => setGranularity('WEEKLY')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    granularity === 'WEEKLY'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Theo Tuần
                </button>
                <button
                  onClick={() => setGranularity('MONTHLY')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    granularity === 'MONTHLY'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Theo Tháng
                </button>
              </div>
            </div>

            {/* 2. DATE RANGE PRESETS */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5 text-cyan-400" />
                <span>Khoảng ngày:</span>
              </span>

              {[
                { key: 'ALL', label: `Tất cả (${data?.totalDays || 0}d)` },
                { key: 'TODAY', label: 'Hôm nay' },
                { key: 'YESTERDAY', label: 'Hôm qua' },
                { key: '7D', label: '7 ngày qua' },
                { key: '30D', label: '30 ngày qua' },
                { key: 'THIS_MONTH', label: 'Tháng này' },
                { key: 'LAST_MONTH', label: 'Tháng trước' },
                { key: 'CUSTOM', label: 'Tùy chỉnh' },
              ].map((p) => {
                const isActive = datePreset === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => setDatePreset(p.key as DatePreset)}
                    className={`px-2.5 py-1.2 rounded-xl text-xs font-medium transition cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30 font-semibold ring-1 ring-cyan-400'
                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Custom Date Pickers & Comparison Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Custom Date Inputs if CUSTOM is active */}
            {datePreset === 'CUSTOM' ? (
              <div className="flex items-center gap-2 bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400">Từ:</span>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="bg-slate-900 border border-slate-700/60 rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-cyan-500"
                />
                <span className="text-slate-400">đến:</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="bg-slate-900 border border-slate-700/60 rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            ) : (
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>
                  Đang lọc:{' '}
                  <strong className="text-white">
                    {currentStartDate ? formatDateVi(currentStartDate) : 'Bắt đầu'}
                  </strong>{' '}
                  —{' '}
                  <strong className="text-white">
                    {currentEndDate ? formatDateVi(currentEndDate) : 'Hiện tại'}
                  </strong>
                </span>
              </div>
            )}

            {/* TIME COMPARISON TOGGLE & SELECTOR */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Toggle Compare */}
              <button
                onClick={() => setCompareEnabled(!compareEnabled)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer active:scale-95 ${
                  compareEnabled
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-md shadow-emerald-500/25'
                    : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>{compareEnabled ? 'Đang So Sánh (BẬT)' : 'So sánh với kỳ khác'}</span>
              </button>

              {/* Compare Mode Selector (visible when compareEnabled) */}
              {compareEnabled && (
                <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-emerald-500/40 text-xs">
                  <select
                    value={comparisonMode}
                    onChange={(e) => setComparisonMode(e.target.value as ComparisonMode)}
                    className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="PREVIOUS_PERIOD" className="bg-slate-900 text-white">
                      Kỳ liền trước (Tuần/Tháng trước)
                    </option>
                    <option value="YOY" className="bg-slate-900 text-white">
                      Cùng kỳ năm trước (YoY)
                    </option>
                    <option value="CUSTOM" className="bg-slate-900 text-white">
                      Tùy chọn kỳ so sánh...
                    </option>
                  </select>

                  {comparisonMode === 'CUSTOM' && (
                    <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2">
                      <input
                        type="date"
                        value={customCompStartDate}
                        onChange={(e) => setCustomCompStartDate(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-white"
                      />
                      <span className="text-slate-500">-</span>
                      <input
                        type="date"
                        value={customCompEndDate}
                        onChange={(e) => setCustomCompEndDate(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-white"
                      />
                    </div>
                  )}

                  {compareStartDate && compareEndDate && comparisonMode !== 'CUSTOM' && (
                    <span className="text-[11px] text-slate-400 border-l border-slate-800 pl-2 hidden sm:inline">
                      ({formatDateVi(compareStartDate)} - {formatDateVi(compareEndDate)})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* KPI OVERVIEW CARDS WITH DELTA COMPARISON */}
        {/* ------------------------------------------------------------ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Tổng Lượt Click */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl hover:border-cyan-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Tổng Lượt Click
              </span>
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <MousePointerClick className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                  {loading ? '...' : aggregatedTotals.grandTotal.toLocaleString()}
                </span>
                {compareEnabled && aggregatedTotals.comparison && (
                  <div className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                    aggregatedTotals.comparison.grandTotal.isPositive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  }`}>
                    {aggregatedTotals.comparison.grandTotal.isPositive ? '+' : ''}
                    {aggregatedTotals.comparison.grandTotal.percent}%
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {compareEnabled && aggregatedTotals.comparison ? (
                  <span>
                    Chênh lệch: <strong className={aggregatedTotals.comparison.grandTotal.isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                      {aggregatedTotals.comparison.grandTotal.diff >= 0 ? '+' : ''}
                      {aggregatedTotals.comparison.grandTotal.diff.toLocaleString()}
                    </strong> vs kỳ trước ({aggregatedTotals.comparison.grandTotal.previous.toLocaleString()})
                  </span>
                ) : (
                  <span>Trong {finalDisplayItems.length} chu kỳ (Toàn bộ: {data?.totals.grandTotal.toLocaleString()})</span>
                )}
              </p>
            </div>
          </div>

          {/* Card 2: Kênh Dẫn Đầu & % Đóng Góp */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl hover:border-blue-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Kênh Hút Traffic Nhất
              </span>
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-400">
                  {topCurrentSource.name}
                </span>
                <span className="text-xs font-bold text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  {topCurrentSource.share}% thị phần
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Đạt <strong>{topCurrentSource.clicks.toLocaleString()} clicks</strong> trong kỳ này
              </p>
            </div>
          </div>

          {/* Card 3: Chu Kỳ Đỉnh Cao (Peak Period) */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl hover:border-amber-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Thời Điểm Cao Điểm Nhất
              </span>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-amber-400 truncate max-w-[170px]" title={peakItem?.label}>
                  {peakItem ? peakItem.label : 'N/A'}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  ({(peakItem?.total || 0).toLocaleString()} clicks)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Kỷ lục toàn thời gian: {data?.peakDay.date} ({data?.peakDay.clicks} clicks)
              </p>
            </div>
          </div>

          {/* Card 4: Ngày Vàng Trong Tuần (Day of week) */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl hover:border-purple-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Ngày Vàng Trong Tuần
              </span>
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-purple-400">
                  {bestDayOfWeek ? bestDayOfWeek.name : 'Đang tính'}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  (~{bestDayOfWeek?.avgClicks || 0} clicks/ngày)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Thời điểm vàng để kéo traffic & lên chiến dịch
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* INTERACTIVE ANALYTICS CHARTS (LINE, DONUT, STACKED BAR) */}
        {/* ------------------------------------------------------------ */}
        <AnalyticsCharts
          items={currentGroupedItems}
          grandTotal={aggregatedTotals.grandTotal}
          granularityLabel={granularityLabel}
        />

        {/* ------------------------------------------------------------ */}
        {/* DETAILED DATA TABLE WITH COMPARISONS & % SHARE */}
        {/* ------------------------------------------------------------ */}
        <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl backdrop-blur-md overflow-hidden shadow-2xl">
          {/* Table Toolbar */}
          <div className="p-5 border-b border-slate-800/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Tìm ${granularityLabel.toLowerCase()} (ví dụ: 19/09, Tuần 37, 2026)...`}
                className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 transition"
              />
            </div>

            {/* Actions: % Share Toggle, Copy, Export CSV */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5">
              {/* Toggle % Share */}
              <button
                onClick={() => setShowPercentShare(!showPercentShare)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  showPercentShare
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Percent className="w-3.5 h-3.5" />
                <span>{showPercentShare ? '% Tỷ Trọng: BẬT' : 'Hiện % Tỷ Trọng'}</span>
              </button>

              {/* Copy TSV */}
              <button
                onClick={handleCopyClipboard}
                title="Sao chép bảng để dán vào Excel / Google Sheets"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
              >
                {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSuccess ? 'Đã sao chép!' : 'Sao chép bảng'}</span>
              </button>

              {/* Export CSV / Excel */}
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition cursor-pointer active:scale-95"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Xuất Excel / CSV</span>
              </button>

              {/* Timestamp */}
              {data?.lastUpdated && (
                <div className="text-xs text-slate-400 items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/50 border border-slate-800/60 hidden xl:flex">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Cập nhật: {data.lastUpdated}</span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Sortable Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/90 bg-slate-950/70 text-xs font-semibold text-slate-400 uppercase tracking-wider select-none">
                  {/* Cột Thời gian / Chu kỳ */}
                  <th
                    onClick={() => handleSort('period')}
                    className="py-3.5 px-5 cursor-pointer hover:text-white transition group"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{granularity === 'DAILY' ? 'Ngày (Date)' : granularity === 'WEEKLY' ? 'Tuần (Week)' : 'Tháng (Month)'}</span>
                      {sortField === 'period' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                      ) : (
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />
                      )}
                    </div>
                  </th>

                  {/* 7 Kênh Traffic Channels */}
                  {CHANNELS.map((ch) => {
                    const isSorted = sortField === ch.key;
                    return (
                      <th
                        key={ch.key}
                        onClick={() => handleSort(ch.key as SortField)}
                        className="py-3.5 px-4 text-center cursor-pointer hover:text-white transition group"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span style={{ color: isSorted ? ch.color : undefined }}>{ch.label}</span>
                          {isSorted ? (
                            sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-600 group-hover:text-slate-400" />
                          )}
                        </div>
                      </th>
                    );
                  })}

                  {/* Cột Tổng cộng */}
                  <th
                    onClick={() => handleSort('total')}
                    className="py-3.5 px-5 text-right font-bold text-cyan-400 bg-cyan-950/30 cursor-pointer hover:brightness-125 transition group"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Tổng cộng</span>
                      {sortField === 'total' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                      ) : (
                        <ArrowUpDown className="w-3.5 h-3.5 text-cyan-600 group-hover:text-cyan-400" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/50 text-sm font-sans">
                {loading && (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
                        <span>Đang tải và tính toán số liệu phân tích...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {!loading && finalDisplayItems.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-slate-500">
                      Không tìm thấy dữ liệu nào khớp với bộ lọc đang chọn.
                    </td>
                  </tr>
                )}

                {!loading &&
                  finalDisplayItems.map((row) => {
                    const rowTotal = row.total || 1;

                    return (
                      <tr
                        key={row.key}
                        className="hover:bg-slate-800/40 transition duration-150 group"
                      >
                        {/* Thời gian chu kỳ */}
                        <td className="py-3.5 px-5 font-medium text-white">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400 opacity-60 group-hover:opacity-100 transition flex-shrink-0" />
                            <div>
                              <span className="font-semibold block">{row.label}</span>
                              {row.subLabel && (
                                <span className="text-[11px] text-slate-400 font-normal block">
                                  {row.subLabel}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* 7 Cột Kênh */}
                        {CHANNELS.map((ch) => {
                          const val = row[ch.key as ChannelKey];
                          const sharePct = Math.round((val / rowTotal) * 100);
                          const comp = row.comparison?.[ch.key as ChannelKey];

                          return (
                            <td key={ch.key} className="py-3 px-3 text-center font-mono">
                              <div className="flex flex-col items-center justify-center">
                                {/* Số lượng hiện tại */}
                                {val > 0 ? (
                                  <span className="text-slate-100 font-bold">{val}</span>
                                ) : (
                                  <span className="text-slate-600">-</span>
                                )}

                                {/* % Tỷ trọng đóng góp (khi bật toggle) */}
                                {showPercentShare && val > 0 && (
                                  <span className="text-[10px] text-slate-400">
                                    {sharePct}%
                                  </span>
                                )}

                                {/* So sánh chênh lệch +/- & % (khi bật so sánh) */}
                                {compareEnabled && comp && comp.hasPrevious && (
                                  <div
                                    title={`Kỳ trước: ${comp.previous}`}
                                    className={`text-[10px] font-semibold px-1 py-0.2 rounded mt-0.5 inline-flex items-center gap-0.5 ${
                                      comp.diff > 0
                                        ? 'text-emerald-400 bg-emerald-500/10'
                                        : comp.diff < 0
                                        ? 'text-rose-400 bg-rose-500/10'
                                        : 'text-slate-500'
                                    }`}
                                  >
                                    <span>{comp.diff > 0 ? `+${comp.diff}` : comp.diff}</span>
                                    <span>({comp.percent > 0 ? `+${comp.percent}%` : `${comp.percent}%`})</span>
                                  </div>
                                )}
                              </div>
                            </td>
                          );
                        })}

                        {/* Cột Tổng cộng chu kỳ */}
                        <td className="py-3.5 px-5 text-right font-mono font-bold text-white bg-cyan-950/20 group-hover:bg-cyan-900/30 group-hover:text-cyan-300 transition">
                          <div className="flex flex-col items-end">
                            <span className="text-base font-extrabold text-white">
                              {row.total.toLocaleString()}
                            </span>

                            {/* So sánh tổng cộng */}
                            {compareEnabled && row.comparison?.total && (
                              <div
                                title={`Kỳ trước: ${row.comparison.total.previous}`}
                                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 inline-flex items-center gap-0.5 ${
                                  row.comparison.total.isPositive
                                    ? 'text-emerald-400 bg-emerald-500/15'
                                    : 'text-rose-400 bg-rose-500/15'
                                }`}
                              >
                                <span>
                                  {row.comparison.total.diff >= 0 ? '+' : ''}
                                  {row.comparison.total.diff.toLocaleString()}
                                </span>
                                <span>
                                  ({row.comparison.total.percent >= 0 ? '+' : ''}
                                  {row.comparison.total.percent}%)
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>

              {/* FOOTER: TỔNG CỘNG VÀ % TỶ TRỌNG ĐÓNG GÓP */}
              <tfoot>
                {/* Hàng 1: Tổng Cột */}
                <tr className="border-t-2 border-cyan-500/40 bg-slate-950 font-bold text-xs uppercase text-slate-200">
                  <td className="py-4 px-5 text-cyan-400 font-black tracking-wider">
                    Tổng ({finalDisplayItems.length} chu kỳ)
                  </td>

                  {CHANNELS.map((ch) => {
                    const totalClicks = aggregatedTotals[ch.key as ChannelKey];
                    const comp = aggregatedTotals.comparison?.[ch.key as ChannelKey];

                    return (
                      <td key={ch.key} className="py-4 px-3 text-center font-mono">
                        <div className="flex flex-col items-center">
                          <span className={`text-sm font-extrabold ${ch.textColor}`}>
                            {totalClicks.toLocaleString()}
                          </span>

                          {/* So sánh tổng kênh */}
                          {compareEnabled && comp && (
                            <div
                              title={`Kỳ trước: ${comp.previous.toLocaleString()}`}
                              className={`text-[10px] font-semibold px-1 rounded mt-0.5 ${
                                comp.isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                              }`}
                            >
                              {comp.diff >= 0 ? `+${comp.diff.toLocaleString()}` : comp.diff.toLocaleString()} (
                              {comp.percent >= 0 ? `+${comp.percent}%` : `${comp.percent}%`})
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}

                  <td className="py-4 px-5 text-right font-mono font-black text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 bg-cyan-950/40">
                    <div className="flex flex-col items-end">
                      <span>{aggregatedTotals.grandTotal.toLocaleString()}</span>
                      {compareEnabled && aggregatedTotals.comparison && (
                        <div className={`text-[11px] font-semibold mt-0.5 ${
                          aggregatedTotals.comparison.grandTotal.isPositive ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {aggregatedTotals.comparison.grandTotal.diff >= 0 ? '+' : ''}
                          {aggregatedTotals.comparison.grandTotal.diff.toLocaleString()} (
                          {aggregatedTotals.comparison.grandTotal.percent >= 0 ? '+' : ''}
                          {aggregatedTotals.comparison.grandTotal.percent}%)
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Hàng 2: Tỷ Trọng Đóng Góp (% Share) so với Tổng Cộng */}
                <tr className="border-t border-slate-800 bg-slate-950/90 text-[11px] font-semibold text-slate-400">
                  <td className="py-3 px-5 text-slate-300 font-bold uppercase tracking-wider">
                    % Tỷ Trọng Đóng Góp
                  </td>

                  {CHANNELS.map((ch) => {
                    const totalClicks = aggregatedTotals[ch.key as ChannelKey];
                    const grand = aggregatedTotals.grandTotal || 1;
                    const pct = Math.round((totalClicks / grand) * 1000) / 10;

                    return (
                      <td key={ch.key} className="py-3 px-3 text-center font-mono">
                        <span className="font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/20">
                          {pct}%
                        </span>
                      </td>
                    );
                  })}

                  <td className="py-3 px-5 text-right font-mono font-bold text-white bg-cyan-950/30">
                    100.0%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* DAY OF WEEK ANALYSIS MINI CARDS */}
        {/* ------------------------------------------------------------ */}
        <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                Phân Tích Hiệu Suất Theo Thứ Trong Tuần
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Mẹo: Lên chiến dịch vào ngày có traffic trung bình cao
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {dayOfWeekAnalysis.map((item) => {
              const isBest = item.name === bestDayOfWeek?.name;
              return (
                <div
                  key={item.name}
                  className={`p-3 rounded-xl border transition flex flex-col justify-between ${
                    isBest
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isBest ? 'text-amber-400' : 'text-slate-300'}`}>
                      {item.name}
                    </span>
                    {isBest && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                        HOT
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-extrabold text-white">
                      ~{item.avgClicks}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      clicks/ngày ({item.totalClicks} tổng)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
