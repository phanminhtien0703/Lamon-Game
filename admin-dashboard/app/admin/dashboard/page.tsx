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
  Award
} from 'lucide-react';

interface DailyTrackingItem {
  date: string;
  direct: number;
  facebook: number;
  google: number;
  kenhGameZ: number;
  other: number;
  webGameLau: number;
  zalo: number;
  total: number;
}

interface SourceSummary {
  name: string;
  clicks: number;
  color: string;
  percent: number;
}

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
  sourcesSummary: SourceSummary[];
  topSource: { name: string; clicks: number };
  peakDay: { date: string; clicks: number };
  latestDay: DailyTrackingItem | null;
  totalDays: number;
  lastUpdated: string;
  isDemo?: boolean;
  dataSourceNotice?: string;
}

// Helper chuyển chuỗi ngày dd/mm/yyyy thành Date object
const parseDate = (dStr: string): Date | null => {
  const parts = dStr.split('/');
  if (parts.length === 3) {
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  }
  return null;
};

// Helper chuyển Date object thành yyyy-mm-dd cho input date
const toInputDateFormat = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DailyDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tính năng 1: Bộ lọc khoảng ngày
  const [dateRangePreset, setDateRangePreset] = useState<'ALL' | '7D' | '30D' | 'THIS_MONTH' | 'CUSTOM'>('ALL');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Bộ lọc tìm kiếm & Sắp xếp
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [sortMode, setSortMode] = useState<'DATE_DESC' | 'DATE_ASC' | 'CLICKS_DESC' | 'CLICKS_ASC'>('DATE_DESC');
  const [chartMode, setChartMode] = useState<'TREND' | 'SOURCES'>('TREND');

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

  // Polling tự động mỗi 8 giây
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 8000);

    return () => clearInterval(interval);
  }, [fetchData]);

  // Đăng xuất
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  // Danh sách các tháng có trong dữ liệu
  const availableMonths = useMemo(() => {
    if (!data?.items) return [];
    const months = new Set<string>();
    data.items.forEach((item) => {
      const parts = item.date.split('/');
      if (parts.length === 3) {
        months.add(`${parts[1]}/${parts[2]}`);
      }
    });
    return Array.from(months).sort((a, b) => b.localeCompare(a));
  }, [data?.items]);

  // Danh sách ngày được sắp xếp theo trình tự thời gian tăng dần
  const sortedChronologicalItems = useMemo(() => {
    if (!data?.items) return [];
    return [...data.items].sort((a, b) => {
      const timeA = parseDate(a.date)?.getTime() || 0;
      const timeB = parseDate(b.date)?.getTime() || 0;
      return timeA - timeB;
    });
  }, [data?.items]);

  // TÍNH NĂNG 1: Lọc dữ liệu theo Khoảng Ngày (Date Range Filter)
  const dateRangedItems = useMemo(() => {
    if (!sortedChronologicalItems.length) return [];

    if (dateRangePreset === 'ALL') {
      return sortedChronologicalItems;
    }

    if (dateRangePreset === '7D') {
      return sortedChronologicalItems.slice(-7);
    }

    if (dateRangePreset === '30D') {
      return sortedChronologicalItems.slice(-30);
    }

    if (dateRangePreset === 'THIS_MONTH') {
      // Lấy tháng mới nhất xuất hiện trong dữ liệu (ví dụ 09/2026)
      const latestItem = sortedChronologicalItems[sortedChronologicalItems.length - 1];
      const latestMonth = latestItem.date.split('/')[1] + '/' + latestItem.date.split('/')[2];
      return sortedChronologicalItems.filter((i) => i.date.includes(`/${latestMonth}`));
    }

    if (dateRangePreset === 'CUSTOM') {
      if (!customStartDate && !customEndDate) return sortedChronologicalItems;
      const startTime = customStartDate ? new Date(customStartDate).getTime() : 0;
      const endTime = customEndDate ? new Date(customEndDate).setHours(23, 59, 59, 999) : Infinity;

      return sortedChronologicalItems.filter((i) => {
        const itemDate = parseDate(i.date);
        if (!itemDate) return true;
        const time = itemDate.getTime();
        return time >= startTime && time <= endTime;
      });
    }

    return sortedChronologicalItems;
  }, [sortedChronologicalItems, dateRangePreset, customStartDate, customEndDate]);

  // TÍNH NĂNG 2A: Tính toán So Sánh Tăng Trưởng (Growth Rate: 7 ngày qua vs 7 ngày trước đó)
  const growthInsight = useMemo(() => {
    if (!sortedChronologicalItems || sortedChronologicalItems.length < 14) {
      return { last7Total: 0, prev7Total: 0, growthPercent: 0, isPositive: true };
    }

    const last7 = sortedChronologicalItems.slice(-7);
    const prev7 = sortedChronologicalItems.slice(-14, -7);

    const last7Total = last7.reduce((sum, item) => sum + item.total, 0);
    const prev7Total = prev7.reduce((sum, item) => sum + item.total, 0);

    let growthPercent = 0;
    if (prev7Total > 0) {
      growthPercent = Math.round(((last7Total - prev7Total) / prev7Total) * 100);
    }

    return {
      last7Total,
      prev7Total,
      growthPercent,
      isPositive: growthPercent >= 0,
    };
  }, [sortedChronologicalItems]);

  // TÍNH NĂNG 2B: Phân tích "Ngày Vàng Trong Tuần" (Day-of-Week Analysis)
  const dayOfWeekAnalysis = useMemo(() => {
    if (!data?.items || !data.items.length) return [];

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

    const list = Object.values(daysMap).map((d) => ({
      ...d,
      avgClicks: d.dayCount > 0 ? Math.round(d.totalClicks / d.dayCount) : 0,
    }));

    return list;
  }, [data?.items]);

  // Ngày vàng tốt nhất trong tuần
  const bestDayOfWeek = useMemo(() => {
    if (!dayOfWeekAnalysis.length) return null;
    return [...dayOfWeekAnalysis].sort((a, b) => b.avgClicks - a.avgClicks)[0];
  }, [dayOfWeekAnalysis]);

  // Dữ liệu cho biểu đồ cột (theo khoảng ngày đang chọn)
  const dailyChartData = useMemo(() => {
    return dateRangedItems.slice(-30);
  }, [dateRangedItems]);

  // Dữ liệu lọc cho bảng chi tiết (kết hợp dateRangePreset + search + selectedMonth + sortMode)
  const finalFilteredItems = useMemo(() => {
    let list = dateRangedItems.filter((item) => {
      const matchesSearch = item.date.includes(searchQuery.trim());
      const matchesMonth = selectedMonth === 'ALL' || item.date.includes(`/${selectedMonth}`);
      return matchesSearch && matchesMonth;
    });

    list = [...list].sort((a, b) => {
      const timeA = parseDate(a.date)?.getTime() || 0;
      const timeB = parseDate(b.date)?.getTime() || 0;
      if (sortMode === 'DATE_DESC') return timeB - timeA;
      if (sortMode === 'DATE_ASC') return timeA - timeB;
      if (sortMode === 'CLICKS_DESC') return b.total - a.total;
      if (sortMode === 'CLICKS_ASC') return a.total - b.total;
      return 0;
    });

    return list;
  }, [dateRangedItems, searchQuery, selectedMonth, sortMode]);

  // Tính tổng cho khoảng thời gian đang lọc
  const rangeTotals = useMemo(() => {
    return finalFilteredItems.reduce(
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
  }, [finalFilteredItems]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 rounded-xl border border-cyan-500/30 text-cyan-400 shadow-sm">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">Admin Tracking Portal</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold uppercase">
                  Daily Traffic
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Theo dõi số lượt click người dùng theo từng ngày và nguồn truy cập</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span className="hidden sm:inline">Tự cập nhật (8s)</span>
              <span className="sm:hidden">Live</span>
            </div>

            {/* Refresh */}
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              title="Làm mới dữ liệu ngay"
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

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* TÍNH NĂNG 1: BỘ CHỌN KHOẢNG NGÀY LINH HOẠT (DATE RANGE PICKER) */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md shadow-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <CalendarDays className="w-4 h-4 text-cyan-400" />
              <span>Khoảng thời gian:</span>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setDateRangePreset('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  dateRangePreset === 'ALL'
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25 font-semibold'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Tất cả ({data?.totalDays || 0} ngày)
              </button>

              <button
                onClick={() => setDateRangePreset('7D')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  dateRangePreset === '7D'
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25 font-semibold'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                7 ngày gần nhất
              </button>

              <button
                onClick={() => setDateRangePreset('30D')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  dateRangePreset === '30D'
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25 font-semibold'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                30 ngày qua
              </button>

              <button
                onClick={() => setDateRangePreset('THIS_MONTH')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  dateRangePreset === 'THIS_MONTH'
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25 font-semibold'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Tháng 09/2026
              </button>

              <button
                onClick={() => setDateRangePreset('CUSTOM')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  dateRangePreset === 'CUSTOM'
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25 font-semibold'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Tùy chọn ngày...
              </button>
            </div>

            {/* Custom Date Inputs */}
            {dateRangePreset === 'CUSTOM' && (
              <div className="flex items-center gap-2 bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-xs">
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="bg-slate-900 border border-slate-700/60 rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-cyan-500"
                />
                <span className="text-slate-500">đến</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="bg-slate-900 border border-slate-700/60 rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}
          </div>
        </section>

        {/* 1. Các thẻ KPI Tổng Quan */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Tổng Lượt Click */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl hover:border-cyan-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tổng Click Đang Chọn</span>
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <MousePointerClick className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                {loading ? '...' : rangeTotals.grandTotal.toLocaleString()}
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Trong {finalFilteredItems.length} ngày hiển thị (Toàn bộ: {data?.totals.grandTotal.toLocaleString()})
              </p>
            </div>
          </div>

          {/* Card 2: So Sánh Tăng Trưởng (TÍNH NĂNG 2A) */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl hover:border-emerald-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tăng Trưởng 7 Ngày</span>
              <div className={`p-2 rounded-xl ${growthInsight.isPositive ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'}`}>
                {growthInsight.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-extrabold ${growthInsight.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {growthInsight.isPositive ? `+${growthInsight.growthPercent}%` : `${growthInsight.growthPercent}%`}
                </span>
                <span className="text-xs text-slate-400">
                  ({growthInsight.last7Total} clicks)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                So với 7 ngày trước đó ({growthInsight.prev7Total} clicks)
              </p>
            </div>
          </div>

          {/* Card 3: Ngày Vàng Hút Khách Nhất (TÍNH NĂNG 2B) */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl hover:border-amber-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ngày Vàng Trong Tuần</span>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-400">
                  {bestDayOfWeek ? bestDayOfWeek.name : 'Đang tính'}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  (~{bestDayOfWeek?.avgClicks || 0} clicks/ngày)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Thời điểm tốt nhất để đăng bài & chạy ads
              </p>
            </div>
          </div>

          {/* Card 4: Kênh Dẫn Đầu */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl hover:border-purple-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kênh Mạnh Nhất</span>
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-purple-400">
                  {loading ? '...' : data?.topSource.name || 'Direct'}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  ({(data?.topSource.clicks || 0).toLocaleString()} clicks)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Đỉnh kỷ lục: {data?.peakDay.date} ({data?.peakDay.clicks} clicks)
              </p>
            </div>
          </div>
        </section>

        {/* TÍNH NĂNG 2B: BẢNG PHÂN TÍCH HIỆU SUẤT THEO TỪNG THỨ TRONG TUẦN (DAY-OF-WEEK INSIGHTS) */}
        <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                Phân Tích Hiệu Suất Theo Thứ Trong Tuần
              </h2>
            </div>
            <span className="text-xs text-slate-400">
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

        {/* 2. Phần Biểu Đồ Cột Tổng Quan (Overview Bar Charts) */}
        <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">Biểu Đồ Thống Kê Tổng Quan</h2>
                <p className="text-xs text-slate-400">Trực quan hóa xu hướng click theo ngày và so sánh giữa các nguồn</p>
              </div>
            </div>

            {/* Chuyển đổi chế độ biểu đồ */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 self-start sm:self-auto">
              <button
                onClick={() => setChartMode('TREND')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  chartMode === 'TREND'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Xu hướng theo Ngày
              </button>
              <button
                onClick={() => setChartMode('SOURCES')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  chartMode === 'SOURCES'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                So sánh 7 Nguồn
              </button>
            </div>
          </div>

          {/* CHẾ ĐỘ 1: BIỂU ĐỒ CỘT XU HƯỚNG THEO NGÀY */}
          {chartMode === 'TREND' && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Số lượt click theo từng ngày (Hiển thị {dailyChartData.length} ngày trong khoảng chọn)</span>
                <span className="text-cyan-400 font-mono">Đỉnh cao nhất: {data?.peakDay.clicks} clicks</span>
              </div>

              {/* Chart Visual */}
              <div className="h-64 flex items-end gap-1.5 sm:gap-2.5 pt-6 pb-2 px-2 border-b border-slate-800/80 overflow-x-auto">
                {dailyChartData.map((d) => {
                  const maxTotal = Math.max(...dailyChartData.map((i) => i.total), 1);
                  const heightPercent = Math.max((d.total / maxTotal) * 100, 6);
                  const isPeak = d.total === data?.peakDay.clicks;

                  return (
                    <div
                      key={d.date}
                      className="flex-1 min-w-[28px] max-w-[48px] h-full flex flex-col justify-end items-center group relative cursor-pointer"
                    >
                      {/* Tooltip Hover */}
                      <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none whitespace-nowrap">
                        <div className="bg-slate-900/95 border border-cyan-500/40 rounded-xl p-2.5 shadow-2xl text-[11px] backdrop-blur-md">
                          <span className="font-bold text-white block border-b border-slate-800 pb-1 mb-1">
                            {d.date}
                          </span>
                          <span className="text-cyan-400 font-extrabold text-xs block mb-1">
                            {d.total} Clicks
                          </span>
                          <div className="space-y-0.5 text-slate-300 font-mono text-[10px]">
                            <div>Direct: {d.direct}</div>
                            <div>Facebook: {d.facebook}</div>
                            <div>KenhGameZ: {d.kenhGameZ}</div>
                            <div>Other: {d.other}</div>
                            <div>WebGameLau: {d.webGameLau}</div>
                            <div>Google: {d.google}</div>
                            <div>Zalo: {d.zalo}</div>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 border-r border-b border-cyan-500/40" />
                      </div>

                      {/* Giá trị trên đầu cột */}
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-300 group-hover:font-bold mb-1 transition">
                        {d.total}
                      </span>

                      {/* Cột Bar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-lg transition-all duration-300 group-hover:brightness-125 ${
                          isPeak
                            ? 'bg-gradient-to-t from-amber-500 to-yellow-300 shadow-lg shadow-amber-500/30 ring-1 ring-amber-300'
                            : 'bg-gradient-to-t from-cyan-600 via-teal-500 to-cyan-400 opacity-90 group-hover:opacity-100 shadow-md shadow-cyan-500/10'
                        }`}
                      />

                      {/* Nhãn Ngày bên dưới */}
                      <span className="text-[10px] text-slate-400 mt-2 rotate-[-45px] sm:rotate-0 font-mono group-hover:text-white transition">
                        {d.date.split('/')[0]}/{d.date.split('/')[1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CHẾ ĐỘ 2: BIỂU ĐỒ CỘT SO SÁNH 7 NGUỒN TRAFFIC */}
          {chartMode === 'SOURCES' && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>So sánh tổng số click theo từng nguồn (Toàn thời gian)</span>
                <span className="text-cyan-400 font-mono">Tổng: {data?.totals.grandTotal.toLocaleString()} clicks</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 pt-2">
                {data?.sourcesSummary.map((source) => {
                  const maxClicks = Math.max(...(data?.sourcesSummary.map((s) => s.clicks) || [1]), 1);
                  const barHeightPercent = Math.max((source.clicks / maxClicks) * 100, 8);

                  return (
                    <div
                      key={source.name}
                      className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between items-center group hover:border-slate-700 transition"
                    >
                      <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition">
                        {source.clicks.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono mb-3">
                        {source.percent}%
                      </span>

                      {/* Cột Chiều Cao */}
                      <div className="w-full h-32 flex items-end justify-center bg-slate-900/40 rounded-xl p-1 mb-3">
                        <div
                          style={{
                            height: `${barHeightPercent}%`,
                            backgroundColor: source.color,
                          }}
                          className="w-10 rounded-lg shadow-md transition-all duration-500 group-hover:brightness-125"
                        />
                      </div>

                      <span className="text-xs font-semibold text-slate-300 text-center truncate max-w-full">
                        {source.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* 3. Bảng Dữ Liệu Chi Tiết Theo Ngày */}
        <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl backdrop-blur-md overflow-hidden shadow-2xl">
          {/* Controls Bar */}
          <div className="p-5 border-b border-slate-800/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Date */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm ngày (ví dụ: 19/09, 01/08, 2026)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 transition"
              />
            </div>

            {/* Filter by Month & Sort */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3">
              {/* Chọn Tháng */}
              <div className="flex items-center gap-1.5 bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-xl">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs text-slate-400">Tháng:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none cursor-pointer pr-1"
                >
                  <option value="ALL" className="bg-slate-900">Tất cả ({data?.totalDays || 0} ngày)</option>
                  {availableMonths.map((m) => (
                    <option key={m} value={m} className="bg-slate-900">
                      Tháng {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sắp xếp */}
              <div className="flex items-center gap-1.5 bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-xl">
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as unknown as typeof sortMode)}
                  className="bg-transparent text-xs text-white focus:outline-none cursor-pointer pr-1"
                >
                  <option value="DATE_DESC" className="bg-slate-900">Mới nhất đến Cũ nhất</option>
                  <option value="DATE_ASC" className="bg-slate-900">Cũ nhất đến Mới nhất</option>
                  <option value="CLICKS_DESC" className="bg-slate-900">Nhiều Click nhất ↓</option>
                  <option value="CLICKS_ASC" className="bg-slate-900">Ít Click nhất ↑</option>
                </select>
              </div>

              {/* Last updated timestamp */}
              {data?.lastUpdated && (
                <div className="text-xs text-slate-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/50 border border-slate-800/60 hidden sm:flex">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Đồng bộ: <strong>{data.lastUpdated}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/90 bg-slate-950/70 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Ngày (Date)</th>
                  <th className="py-3.5 px-4 text-center">Direct</th>
                  <th className="py-3.5 px-4 text-center">Facebook</th>
                  <th className="py-3.5 px-4 text-center">Google</th>
                  <th className="py-3.5 px-4 text-center">KenhGameZ</th>
                  <th className="py-3.5 px-4 text-center">Other</th>
                  <th className="py-3.5 px-4 text-center">WebGameLau</th>
                  <th className="py-3.5 px-4 text-center">Zalo</th>
                  <th className="py-3.5 px-5 text-right font-bold text-cyan-400 bg-cyan-950/30">Tổng cộng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm font-sans">
                {loading && (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
                        <span>Đang đồng bộ số liệu từ Google Sheet...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {!loading && finalFilteredItems.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-slate-500">
                      Không tìm thấy ngày nào khớp với bộ lọc.
                    </td>
                  </tr>
                )}

                {!loading &&
                  finalFilteredItems.map((row) => (
                    <tr
                      key={row.date}
                      className="hover:bg-slate-800/40 transition duration-150 group"
                    >
                      {/* Ngày */}
                      <td className="py-3.5 px-5 font-medium text-white flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400 opacity-60 group-hover:opacity-100 transition" />
                        <span>{row.date}</span>
                      </td>

                      {/* Direct */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        {row.direct > 0 ? (
                          <span className="text-slate-200 font-semibold">{row.direct}</span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>

                      {/* Facebook */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        {row.facebook > 0 ? (
                          <span className="text-blue-300 font-semibold">{row.facebook}</span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>

                      {/* Google */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        {row.google > 0 ? (
                          <span className="text-red-300 font-semibold">{row.google}</span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>

                      {/* KenhGameZ */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        {row.kenhGameZ > 0 ? (
                          <span className="text-amber-300 font-semibold">{row.kenhGameZ}</span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>

                      {/* Other */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        {row.other > 0 ? (
                          <span className="text-purple-300 font-semibold">{row.other}</span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>

                      {/* WebGameLau */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        {row.webGameLau > 0 ? (
                          <span className="text-emerald-300 font-semibold">{row.webGameLau}</span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>

                      {/* Zalo */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        {row.zalo > 0 ? (
                          <span className="text-cyan-300 font-semibold">{row.zalo}</span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>

                      {/* Tổng cộng ngày */}
                      <td className="py-3.5 px-5 text-right font-mono font-bold text-white bg-cyan-950/20 group-hover:bg-cyan-900/30 group-hover:text-cyan-300 transition">
                        {row.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>

              {/* Hàng Tổng Cộng Khoảng Thời Gian */}
              <tfoot>
                <tr className="border-t-2 border-cyan-500/40 bg-slate-950 font-bold text-xs uppercase text-slate-200">
                  <td className="py-4 px-5 text-cyan-400 font-extrabold tracking-wider">
                    Tổng ({finalFilteredItems.length} ngày)
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-white text-sm">
                    {rangeTotals.direct.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-blue-400 text-sm">
                    {rangeTotals.facebook.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-red-400 text-sm">
                    {rangeTotals.google.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-amber-400 text-sm">
                    {rangeTotals.kenhGameZ.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-purple-400 text-sm">
                    {rangeTotals.other.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-emerald-400 text-sm">
                    {rangeTotals.webGameLau.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-cyan-400 text-sm">
                    {rangeTotals.zalo.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 text-right font-mono font-black text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 bg-cyan-950/40">
                    {rangeTotals.grandTotal.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
