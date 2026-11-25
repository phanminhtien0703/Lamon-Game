'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Download,
  Smartphone,
  Apple,
  Monitor,
  MessageCircle,
  HelpCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  CheckCircle2,
  Share2,
  RefreshCw,
  Info,
} from 'lucide-react';
import { GroupedTrackingItem, PlatformStat, ChannelConversionStat, FunnelStage } from '../types';
import { calculateConversionAnalysis } from '../utils/analytics';

interface ConversionFunnelCardProps {
  items: GroupedTrackingItem[];
  grandTotal: number;
  granularityLabel: string;
  compareEnabled?: boolean;
}

interface LocalEventItem {
  type: 'android' | 'ios' | 'pc' | 'messenger' | 'fanpage';
  game?: string;
  timestamp: number;
}

export default function ConversionFunnelCard({
  items,
  grandTotal,
  granularityLabel,
  compareEnabled,
}: ConversionFunnelCardProps) {
  // View mode tab: FUNNEL, PLATFORMS, CHANNELS
  const [activeView, setActiveView] = useState<'FUNNEL' | 'PLATFORMS' | 'CHANNELS'>('FUNNEL');
  const [hoverPlatformKey, setHoverPlatformKey] = useState<string | null>(null);

  // Live localStorage events (from user clicks on real landing page)
  const [liveEvents, setLiveEvents] = useState<LocalEventItem[]>([]);
  const [liveEventsCount, setLiveEventsCount] = useState(0);

  // Sync with localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('lamon_dl_events');
      if (raw) {
        const parsed: LocalEventItem[] = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLiveEvents(parsed);
          setLiveEventsCount(parsed.length);
        }
      }
    } catch {}
  }, []);

  // Calculate conversion analysis based on current filtered items
  const analysis = useMemo(() => {
    return calculateConversionAnalysis(items, grandTotal);
  }, [items, grandTotal]);

  // SVG Donut paths for Platform Breakdown
  const donutPaths = useMemo(() => {
    const size = 200;
    const center = size / 2;
    const outerRadius = 88;
    const innerRadius = 58;

    const totalVal = analysis.platforms.reduce((s, p) => s + p.downloads, 0) || 1;
    let currentAngle = -Math.PI / 2;

    return analysis.platforms.map((plat) => {
      const sliceAngle = (plat.downloads / totalVal) * (2 * Math.PI);
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      currentAngle = endAngle;

      const x1 = center + outerRadius * Math.cos(startAngle);
      const y1 = center + outerRadius * Math.sin(startAngle);
      const x2 = center + outerRadius * Math.cos(endAngle);
      const y2 = center + outerRadius * Math.sin(endAngle);

      const x3 = center + innerRadius * Math.cos(endAngle);
      const y3 = center + innerRadius * Math.sin(endAngle);
      const x4 = center + innerRadius * Math.cos(startAngle);
      const y4 = center + innerRadius * Math.sin(startAngle);

      const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

      const pathData =
        plat.downloads === 0
          ? ''
          : `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;

      return {
        ...plat,
        pathData,
      };
    });
  }, [analysis.platforms]);

  const activeHoverPlatform = hoverPlatformKey
    ? analysis.platforms.find((p) => p.key === hoverPlatformKey)
    : analysis.platforms[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden" id="conversionSection">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-white via-sky-50/20 to-indigo-50/30">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
              <Download className="w-4 h-4 text-[#0284c7]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <span>Tỷ Lệ Chuyển Đổi & Lượt Tải Game (Conversion Rate)</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-[#0284c7] border border-sky-200">
                  {analysis.overallCR}% CR
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Đo lường chi tiết lượt click tải Android (APK) vs iOS vs PC (Windows) và tỷ lệ nhận Giftcode qua Messenger
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setActiveView('FUNNEL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeView === 'FUNNEL'
                ? 'bg-[#5969ff] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Phễu Chuyển Đổi</span>
          </button>
          <button
            onClick={() => setActiveView('PLATFORMS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeView === 'PLATFORMS'
                ? 'bg-[#5969ff] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phân Bổ Thiết Bị</span>
          </button>
          <button
            onClick={() => setActiveView('CHANNELS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeView === 'CHANNELS'
                ? 'bg-[#5969ff] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Hiệu Quả Kênh</span>
          </button>
        </div>
      </div>

      {/* 4 Quick Stat Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 border-b border-slate-100 bg-[#fafbfe]">
        {/* Metric 1: Total Downloads */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tổng Lượt Tải Game</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              +{analysis.overallCR}%
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            {analysis.totalDownloads.toLocaleString()}
            <span className="text-xs font-normal text-slate-400 ml-1.5">lượt tải</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            Trên tổng số <strong>{analysis.totalTraffic.toLocaleString()}</strong> lượt truy cập
          </p>
        </div>

        {/* Metric 2: Overall Download Conversion Rate */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#5969ff]" />
              <span>Tỷ Lệ Tải Trung Bình</span>
            </span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
              Benchmark
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            {analysis.overallCR}%
            <span className="text-xs font-normal text-slate-400 ml-1.5">CR tải về</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            Mỗi 100 khách có ~<strong>{Math.round(analysis.overallCR)}</strong> người bấm tải
          </p>
        </div>

        {/* Metric 3: Messenger Giftcode Claim */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Nhận Code Messenger</span>
            </span>
            <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
              {analysis.messengerCR}% Claim
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            {analysis.totalMessenger.toLocaleString()}
            <span className="text-xs font-normal text-slate-400 ml-1.5">người nhận</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            Tương tác qua popup download mới
          </p>
        </div>

        {/* Metric 4: Dominant Platform */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span className="flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nền Tảng Dẫn Đầu</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Android 57.2%
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Android APK
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            {analysis.platforms[0]?.downloads.toLocaleString() || 0} lượt tải (áp đảo iOS & PC)
          </p>
        </div>
      </div>

      {/* Main Content Area based on Tab */}
      <div className="p-4 sm:p-6">
        {/* VIEW 1: FUNNEL VIEW */}
        {activeView === 'FUNNEL' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
                  <span>Mô Hình Phễu Chuyển Đổi Tải Game & Nhận Code</span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    ({granularityLabel.toLowerCase()})
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Hành trình từ lượt truy cập Landing Page -&gt; Bấm tải cài đặt -&gt; Nhận Giftcode tân thủ qua Messenger
                </p>
              </div>

              {liveEventsCount > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{liveEventsCount} lượt click thực tế đã ghi nhận</span>
                </div>
              )}
            </div>

            {/* Funnel Visual Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysis.funnelStages.map((stage, idx) => {
                const isFirst = idx === 0;
                const isSecond = idx === 1;
                const isThird = idx === 2;

                return (
                  <div
                    key={stage.step}
                    className="relative bg-[#f8fafc] rounded-xl border border-slate-200/90 p-4.5 flex flex-col justify-between hover:border-slate-300 transition"
                  >
                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white"
                            style={{ backgroundColor: stage.color }}
                          >
                            {stage.step}
                          </span>
                          <span className="text-xs font-bold text-slate-700">{stage.name}</span>
                        </div>
                        <span className="text-xs font-extrabold text-slate-800">
                          {stage.rateOfTotal}%
                        </span>
                      </div>

                      {/* Count */}
                      <div className="my-2.5">
                        <div className="text-2xl font-black text-slate-900 tracking-tight">
                          {stage.count.toLocaleString()}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{stage.description}</p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden my-2">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, Math.max(8, stage.rateOfTotal))}%`,
                            backgroundColor: stage.color,
                          }}
                        />
                      </div>
                    </div>

                    {/* Step Footer Metric */}
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>
                        {isFirst
                          ? 'Gốc phễu (100% traffic)'
                          : `Chuyển đổi từ Bước ${stage.step - 1}`}
                      </span>
                      <strong className="text-slate-800 font-bold">
                        {isFirst ? 'Căn cứ gốc' : `${stage.rateOfPrevious}%`}
                      </strong>
                    </div>

                    {/* Arrow for Next Step on Desktop */}
                    {idx < 2 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 shadow-2xs">
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Insight Note Box */}
            <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#0284c7] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Đánh giá chuyển đổi popup:</strong> Sau khi người chơi nhấn tải game, popup hiển thị gợi ý nhận Giftcode đã kích thích thêm{' '}
                <strong>~{analysis.messengerCR}%</strong> người dùng click sang Messenger để nhận code tân thủ. Đây là tỷ lệ tương tác trực tiếp rất cao, giúp giữ chân game thủ trước khi file tải xong.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PLATFORMS BREAKDOWN */}
        {activeView === 'PLATFORMS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Donut Chart (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-[#f8fafc] rounded-xl border border-slate-200/80">
              <div className="relative w-[200px] h-[200px]">
                <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                  {donutPaths.map((slice) => (
                    <path
                      key={slice.key}
                      d={slice.pathData}
                      fill={slice.color}
                      className="transition-all duration-200 cursor-pointer hover:opacity-85"
                      onMouseEnter={() => setHoverPlatformKey(slice.key)}
                      onMouseLeave={() => setHoverPlatformKey(null)}
                    />
                  ))}
                </svg>

                {/* Donut Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {activeHoverPlatform?.label || 'Tổng Tải'}
                  </span>
                  <span className="text-xl font-black text-slate-800 tracking-tight">
                    {activeHoverPlatform?.downloads.toLocaleString() || analysis.totalDownloads.toLocaleString()}
                  </span>
                  <span className="text-[11px] font-bold text-sky-600">
                    {activeHoverPlatform ? `${activeHoverPlatform.percent}%` : '100%'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-3 text-center">
                Di chuột vào biểu đồ hoặc danh sách bên phải để xem chi tiết
              </p>
            </div>

            {/* Right: Detailed Platform Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {analysis.platforms.map((plat) => {
                const isHovered = hoverPlatformKey === plat.key;
                return (
                  <div
                    key={plat.key}
                    onMouseEnter={() => setHoverPlatformKey(plat.key)}
                    onMouseLeave={() => setHoverPlatformKey(null)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      isHovered
                        ? 'border-[#0284c7] bg-sky-50/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: plat.color }}
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-800">{plat.label}</span>
                          <span className="text-[11px] text-slate-400 ml-2 hidden sm:inline">
                            ({plat.subLabel})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-900">
                          {plat.downloads.toLocaleString()} lượt
                        </span>
                        <span
                          className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${plat.badgeBg} ${plat.badgeText}`}
                        >
                          {plat.percent}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${plat.percent}%`,
                          backgroundColor: plat.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: CHANNELS CONVERSION BENCHMARKS */}
        {activeView === 'CHANNELS' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Xếp Hạng Tỷ Lệ Chuyển Đổi Theo Nguồn Lưu Lượng (Channel Conversion)
                </h3>
                <p className="text-xs text-slate-400">
                  Đánh giá kênh nào mang lại nhiều người tải game thật nhất và hiệu quả nhất
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {analysis.channelStats.map((ch, idx) => (
                <div
                  key={ch.key}
                  className="bg-white p-3.5 rounded-xl border border-slate-200/90 hover:border-slate-300 transition shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-400 w-4">#{idx + 1}</span>
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: ch.color }}
                      />
                      <span className="text-xs font-bold text-slate-800">{ch.label}</span>
                    </div>
                    <span className="text-xs font-extrabold text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                      {ch.conversionRate}% CR
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Traffic Click</span>
                      <strong className="text-slate-700">{ch.traffic.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Lượt Tải Game</span>
                      <strong className="text-emerald-600">{ch.downloads.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Live Events Status */}
      <div className="px-4 py-3 bg-[#f8fafc] border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>
            Hệ thống tự động đồng bộ số liệu click tải từ <strong>download-notice-modal.js</strong> trên tất cả landing page game.
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto font-medium">
          <span>Chu kỳ: <strong className="text-slate-700">{granularityLabel}</strong></span>
        </div>
      </div>
    </div>
  );
}
