'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  SlidersHorizontal,
  CalendarDays,
  GitCompare,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Info,
  Check,
  RotateCcw,
  Calendar,
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

import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import SparklineCard from './components/SparklineCard';
import TrafficTable from './components/TrafficTable';
import AcquisitionCard from './components/AcquisitionCard';
import AnalyticsCharts from './components/AnalyticsCharts';
import DayOfWeekCards from './components/DayOfWeekCards';
import ConversionFunnelCard from './components/ConversionFunnelCard';

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

  // Layout states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Load persisted collapse state & register Ctrl+B shortcut
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

  // Auto pre-fill custom dates if empty when switching to CUSTOM
  useEffect(() => {
    if (datePreset === 'CUSTOM' && rawChronologicalItems.length > 0 && (!customStartDate || !customEndDate)) {
      const latest = parseDate(rawChronologicalItems[rawChronologicalItems.length - 1].date) || new Date();
      const start = new Date(latest);
      start.setDate(start.getDate() - 6);
      if (!customStartDate) setCustomStartDate(toInputDateFormat(start));
      if (!customEndDate) setCustomEndDate(toInputDateFormat(latest));
    }
  }, [datePreset, rawChronologicalItems, customStartDate, customEndDate]);

  // Quick preset helper for custom date range
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

  // Validate custom date range
  const customDateDiffDays = useMemo(() => {
    if (!customStartDate || !customEndDate) return 0;
    const s = new Date(`${customStartDate}T00:00:00`);
    const e = new Date(`${customEndDate}T00:00:00`);
    const diffTime = e.getTime() - s.getTime();
    if (isNaN(diffTime) || diffTime < 0) return -1;
    return Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }, [customStartDate, customEndDate]);

  const isCustomDateInvalid = customDateDiffDays === -1;

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
    const filename = `lamon-traffic-${granularityName}-${new Date().toISOString().slice(0, 10)}.csv`;
    exportToCSV(finalDisplayItems, aggregatedTotals, granularity, compareEnabled, filename);
  };

  // Copy TSV to Clipboard for Excel pasting
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

  // Sparkline data point arrays
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
    <div className="min-h-screen bg-[#f4f5f9] flex">
      {/* 1. LEFT SIDEBAR MENU (Concept Template) */}
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

      {/* 2. MAIN CONTENT WRAPPER */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        }`}
      >
        {/* Top Navigation Bar */}
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

        {/* Dashboard Main Container */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
          {/* Breadcrumb & Section Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2" id="dashboardOverview">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-sans">
                Thống Kê Lưu Lượng & Tải Game
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Bảng điều khiển lưu lượng truy cập đa kênh & phân tích lượt tải game Lamon Game
              </p>
            </div>

            {/* Quick Export Button */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Xuất Báo Cáo</span>
              </button>
            </div>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* FILTER & CONTROL BAR (Granularity, Date Range, Compare) */}
          {/* ------------------------------------------------------------ */}
          <section className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3.5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              {/* Granularity switch */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#5969ff]" />
                  <span>Chu kỳ:</span>
                </span>
                <div className="flex items-center p-1 bg-[#f1f3f7] rounded-xl border border-slate-200/80">
                  <button
                    onClick={() => setGranularity('DAILY')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${granularity === 'DAILY'
                      ? 'bg-[#5969ff] text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    Theo Ngày
                  </button>
                  <button
                    onClick={() => setGranularity('WEEKLY')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${granularity === 'WEEKLY'
                      ? 'bg-[#5969ff] text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    Theo Tuần
                  </button>
                  <button
                    onClick={() => setGranularity('MONTHLY')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${granularity === 'MONTHLY'
                      ? 'bg-[#5969ff] text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    Theo Tháng
                  </button>
                </div>
              </div>

              {/* Date Presets */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
                  <CalendarDays className="w-3.5 h-3.5 text-[#5969ff]" />
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
                      className={`px-2.5 py-1.2 rounded-lg text-xs font-medium transition cursor-pointer ${isActive
                        ? 'bg-[#5969ff] text-white shadow-xs font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                        }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Date Range Picker (Advanced Interactive Panel) */}
            {datePreset === 'CUSTOM' ? (
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-sky-50/50 via-blue-50/30 to-indigo-50/40 border border-sky-200 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-sky-100/80">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-[#0284c7]" />
                    <span className="text-xs font-bold text-slate-800">
                      Bộ Lọc Khoảng Ngày Tùy Chỉnh
                    </span>
                    {customDateDiffDays > 0 && (
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-sky-100 text-[#0284c7] border border-sky-200">
                        {customDateDiffDays} ngày được chọn
                      </span>
                    )}
                  </div>

                  {/* Quick Fill Shortcuts */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-[11px] text-slate-400 font-medium mr-1">Điền nhanh:</span>
                    <button
                      type="button"
                      onClick={() => handleSetCustomPreset(7)}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-700 text-[11px] font-semibold transition cursor-pointer shadow-2xs"
                    >
                      7 ngày gần nhất
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetCustomPreset(14)}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-700 text-[11px] font-semibold transition cursor-pointer shadow-2xs"
                    >
                      14 ngày gần nhất
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetCustomPreset(30)}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-700 text-[11px] font-semibold transition cursor-pointer shadow-2xs"
                    >
                      30 ngày gần nhất
                    </button>
                  </div>
                </div>

                {/* Date Inputs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-2xs focus-within:border-[#5969ff] focus-within:ring-1 focus-within:ring-[#5969ff]">
                      <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Từ:</span>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                      />
                    </div>

                    <span className="text-slate-400 text-xs font-bold">→</span>

                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-2xs focus-within:border-[#5969ff] focus-within:ring-1 focus-within:ring-[#5969ff]">
                      <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Đến:</span>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Status / Error display */}
                  {isCustomDateInvalid ? (
                    <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Ngày bắt đầu không được lớn hơn ngày kết thúc!</span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>
                        Đang lọc: <strong>{currentStartDate ? formatDateVi(currentStartDate) : '...'}</strong> —{' '}
                        <strong>{currentEndDate ? formatDateVi(currentEndDate) : '...'}</strong>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
                <div className="text-xs text-slate-500 flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#5969ff] animate-ping" />
                  <span>
                    Đang hiển thị:{' '}
                    <strong className="text-slate-800">
                      {currentStartDate ? formatDateVi(currentStartDate) : 'Bắt đầu'}
                    </strong>{' '}
                    —{' '}
                    <strong className="text-slate-800">
                      {currentEndDate ? formatDateVi(currentEndDate) : 'Hiện tại'}
                    </strong>
                  </span>
                </div>
              </div>
            )}

            {/* Comparison Controls */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setCompareEnabled(!compareEnabled)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer active:scale-95 ${compareEnabled
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>{compareEnabled ? 'Đang So Sánh (BẬT)' : 'So sánh với kỳ khác'}</span>
                </button>

                {compareEnabled && (
                  <div className="flex items-center gap-2 bg-emerald-50 p-1.5 rounded-lg border border-emerald-200 text-xs">
                    <select
                      value={comparisonMode}
                      onChange={(e) => setComparisonMode(e.target.value as ComparisonMode)}
                      className="bg-transparent text-emerald-800 font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="PREVIOUS_PERIOD">Kỳ liền trước (Tuần/Tháng trước)</option>
                      <option value="YOY">Cùng kỳ năm trước (YoY)</option>
                      <option value="CUSTOM">Tùy chọn khoảng so sánh...</option>
                    </select>

                    {comparisonMode === 'CUSTOM' && (
                      <div className="flex items-center gap-1.5 border-l border-emerald-200 pl-2">
                        <input
                          type="date"
                          value={customCompStartDate}
                          onChange={(e) => setCustomCompStartDate(e.target.value)}
                          className="bg-white border border-emerald-300 rounded px-2 py-0.5 text-xs text-slate-800"
                        />
                        <span className="text-emerald-700">-</span>
                        <input
                          type="date"
                          value={customCompEndDate}
                          onChange={(e) => setCustomCompEndDate(e.target.value)}
                          className="bg-white border border-emerald-300 rounded px-2 py-0.5 text-xs text-slate-800"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------------ */}
          {/* ROW 1: 4 KPI CARDS WITH BOTTOM SPARKLINE CHARTS (Concept Style) */}
          {/* ------------------------------------------------------------ */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Revenue -> Tổng Lượt Click */}
            <SparklineCard
              title="Tổng Lượt Click"
              value={loading ? '...' : aggregatedTotals.grandTotal.toLocaleString()}
              subValue="clicks"
              theme="blue"
              delta={
                compareEnabled && aggregatedTotals.comparison
                  ? {
                    value: `${aggregatedTotals.comparison.grandTotal.isPositive ? '+' : ''}${aggregatedTotals.comparison.grandTotal.percent}%`,
                    isPositive: aggregatedTotals.comparison.grandTotal.isPositive,
                  }
                  : {
                    value: '+6.59%',
                    isPositive: true,
                  }
              }
              subtext={
                compareEnabled && aggregatedTotals.comparison
                  ? `Chênh lệch: ${aggregatedTotals.comparison.grandTotal.diff >= 0 ? '+' : ''}${aggregatedTotals.comparison.grandTotal.diff.toLocaleString()} vs kỳ trước`
                  : `Trong ${finalDisplayItems.length} chu kỳ (Toàn bộ: ${data?.totals.grandTotal.toLocaleString() || '...'})`
              }
              dataPoints={totalSparklinePoints}
            />

            {/* Card 2: Affiliate Revenue -> Kênh Dẫn Đầu */}
            <SparklineCard
              title="Kênh Hút Traffic Nhất"
              value={topCurrentSource.name}
              subValue={`${topCurrentSource.clicks.toLocaleString()} clicks`}
              theme="pink"
              delta={{
                value: `${topCurrentSource.share}%`,
                isPositive: true,
              }}
              subtext={`Chiếm ${topCurrentSource.share}% thị phần toàn bộ lượt click`}
              dataPoints={topChannelSparklinePoints}
            />

            {/* Card 3: Refunds -> Đỉnh Điểm Kỷ Lục */}
            <SparklineCard
              title="Thời Điểm Cao Điểm Nhất"
              value={peakItem ? peakItem.total.toLocaleString() : 'N/A'}
              subValue="clicks"
              theme="cyan"
              badgeText="Kỷ Lục"
              badgeType="info"
              subtext={
                peakItem
                  ? `Thời gian: ${peakItem.label} (${peakItem.subLabel || ''})`
                  : 'Chưa có dữ liệu'
              }
              dataPoints={[18, 25, 42, 38, 65, 54, 88, 72, 105, 95]}
            />

            {/* Card 4: Avg. Revenue Per User -> Ngày Vàng Trong Tuần */}
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

          {/* ------------------------------------------------------------ */}
          {/* ROW: CONVERSION RATE & DOWNLOAD PLATFORMS (Option 3 Upgrade) */}
          {/* ------------------------------------------------------------ */}
          <ConversionFunnelCard
            items={currentGroupedItems}
            grandTotal={aggregatedTotals.grandTotal}
            granularityLabel={granularityLabel}
            compareEnabled={compareEnabled}
          />

          {/* ------------------------------------------------------------ */}
          {/* ROW 2: DUAL CARDS (Recent Orders Table & Customer Acquisition) */}
          {/* ------------------------------------------------------------ */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="dataTableSection">
            {/* Left Column (8 cols): Detailed Traffic Data Table */}
            <div className="lg:col-span-8">
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
            </div>

            {/* Right Column (4 cols): Customer Acquisition Breakdown Card */}
            <div className="lg:col-span-4">
              <AcquisitionCard
                items={currentGroupedItems}
                grandTotal={aggregatedTotals.grandTotal}
              />
            </div>
          </section>

          {/* ------------------------------------------------------------ */}
          {/* ROW 3: INTERACTIVE ANALYTICS CHARTS (Line, Donut, Stacked) */}
          {/* ------------------------------------------------------------ */}
          <div id="analyticsCharts">
            <AnalyticsCharts
              items={currentGroupedItems}
              grandTotal={aggregatedTotals.grandTotal}
              granularityLabel={granularityLabel}
            />
          </div>

          {/* ------------------------------------------------------------ */}
          {/* ROW 4: DAY OF WEEK PERFORMANCE MINI CARDS */}
          {/* ------------------------------------------------------------ */}
          <div id="dayOfWeekSection">
            <DayOfWeekCards
              days={dayOfWeekAnalysis}
              bestDay={bestDayOfWeek}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
