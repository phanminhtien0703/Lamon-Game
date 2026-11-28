'use client';

import React, { useMemo, useState } from 'react';
import { Radio, Activity, ShieldCheck, Zap, ExternalLink } from 'lucide-react';
import { AggregatedTotals, CHANNELS, ChannelKey, GroupedTrackingItem } from '../types';
import { calculateConversionAnalysis } from '../utils/analytics';

interface OrbitalTrafficHubProps {
  items: GroupedTrackingItem[];
  totals: AggregatedTotals;
  topSource: { name: string; key: ChannelKey; clicks: number; share: number };
  peakItem: GroupedTrackingItem | null;
  bestDayName?: string;
  lastUpdated?: string;
}

export default function OrbitalTrafficHub({
  items,
  totals,
  topSource,
  peakItem,
  bestDayName,
  lastUpdated,
}: OrbitalTrafficHubProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const analysis = useMemo(
    () => calculateConversionAnalysis(items, totals.grandTotal),
    [items, totals.grandTotal]
  );

  // Recent chronological bars for the "LIVE TRAFFIC" equalizer bar chart
  const recentBars = useMemo(() => {
    const sorted = [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    return sorted.slice(-24);
  }, [items]);

  const maxBarVal = useMemo(() => {
    return Math.max(...recentBars.map((b) => b.total), 1);
  }, [recentBars]);

  // Top 4 channels for orbital node callouts
  const topChannels = useMemo(() => {
    const grand = totals.grandTotal || 1;
    return CHANNELS.map((ch) => ({
      ...ch,
      clicks: totals[ch.key] || 0,
      share: Math.round(((totals[ch.key] || 0) / grand) * 1000) / 10,
    }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 4);
  }, [totals]);

  const activeBar = hoverIdx !== null ? recentBars[hoverIdx] : recentBars[recentBars.length - 1];

  return (
    <div className="hud-panel hud-corners rounded-xl p-3.5 sm:p-5 flex flex-col justify-between gap-4 overflow-hidden">
      {/* Top Telemetry Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cyan-200">
            ORBITAL TRAFFIC COMMAND
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-cyan-200">
          <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-400/35 text-cyan-200 font-bold">
            CR: {analysis.overallCR}%
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            SYNC {lastUpdated || 'LIVE'}
          </span>
        </div>
      </div>

      {/* Central Orbital Radar & Telemetry Callouts */}
      <div className="relative flex flex-col items-center justify-center py-2 sm:py-4">
        {/* Background radial glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(circle at 50% 48%, rgba(56,189,248,0.18) 0%, rgba(99,102,241,0.06) 45%, transparent 72%)',
          }}
        />

        {/* Floating Callouts (Top Left & Top Right on sm+) */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 items-center gap-2 sm:gap-4 relative z-10">
          {/* Left Callout Stack */}
          <div className="space-y-2 order-2 sm:order-1">
            {topChannels.slice(0, 2).map((ch) => (
              <div
                key={ch.key}
                className="p-2.5 rounded-lg bg-[#051025]/90 border border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.08)]"
              >
                <div className="flex items-center justify-between gap-1 text-[11px] text-slate-200 uppercase font-bold">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ch.color }} />
                    <span className="truncate">{ch.label}</span>
                  </span>
                  <span className="text-cyan-300 font-mono">{ch.share}%</span>
                </div>
                <div className="text-base sm:text-lg font-black font-mono text-white mt-0.5">
                  {ch.clicks.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Center Orbital Ring */}
          <div className="col-span-2 sm:col-span-1 order-1 sm:order-2 flex items-center justify-center my-1">
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
              {/* Outer dashed orbital ring */}
              <svg viewBox="0 0 180 180" className="absolute inset-0 w-full h-full animate-hud-spin">
                <circle
                  cx="90"
                  cy="90"
                  r="84"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.35)"
                  strokeWidth="1.2"
                  strokeDasharray="6 6"
                />
                <circle cx="90" cy="6" r="3" fill="#38bdf8" />
                <circle cx="90" cy="174" r="2.5" fill="#818cf8" />
              </svg>

              {/* Middle counter-rotating arc ring */}
              <svg viewBox="0 0 180 180" className="absolute inset-0 w-full h-full animate-hud-spin-reverse">
                <circle
                  cx="90"
                  cy="90"
                  r="68"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.55)"
                  strokeWidth="2"
                  strokeDasharray="65 30 25 35"
                />
              </svg>

              {/* Inner glowing core */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#040d21]/95 border border-cyan-400/55 shadow-[0_0_28px_rgba(34,211,238,0.28)] flex flex-col items-center justify-center text-center px-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-200">
                  TOTAL CLICKS
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight mt-0.5">
                  {totals.grandTotal.toLocaleString()}
                </span>
                <span className="text-[11px] font-mono font-semibold text-emerald-300 mt-0.5">
                  ~{analysis.totalDownloads.toLocaleString()} tải
                </span>
              </div>
            </div>
          </div>

          {/* Right Callout Stack */}
          <div className="space-y-2 order-3">
            {topChannels.slice(2, 4).map((ch) => (
              <div
                key={ch.key}
                className="p-2.5 rounded-lg bg-[#051025]/90 border border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.08)]"
              >
                <div className="flex items-center justify-between gap-1 text-[11px] text-slate-200 uppercase font-bold">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ch.color }} />
                    <span className="truncate">{ch.label}</span>
                  </span>
                  <span className="text-cyan-300 font-mono">{ch.share}%</span>
                </div>
                <div className="text-base sm:text-lg font-black font-mono text-white mt-0.5">
                  {ch.clicks.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Traffic Equalizer Strip (Mirrors "LIVE TRAFFIC Flow: 87%" in reference) */}
      <div className="p-3 rounded-xl bg-[#040c1e]/90 border border-cyan-500/25 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-100">
              LIVE TRAFFIC WAVE
            </span>
          </div>
          <div className="text-xs font-mono text-cyan-200">
            {activeBar ? (
              <span>
                {activeBar.label}: <strong className="text-white">{activeBar.total.toLocaleString()}</strong> clicks
              </span>
            ) : (
              <span>Chưa có dữ liệu</span>
            )}
          </div>
        </div>

        {/* Equalizer Spectrum Bars with always-visible click count & short label */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex items-end gap-1.5 pt-2 px-0.5 min-w-full">
            {recentBars.map((bar, idx) => {
              const barPx = Math.max(12, Math.round((bar.total / maxBarVal) * 76));
              const ratio = bar.total / maxBarVal;
              const barColor =
                ratio > 0.78
                  ? 'from-amber-400 to-rose-500 shadow-[0_0_8px_rgba(251,191,36,0.45)]'
                  : ratio > 0.45
                  ? 'from-emerald-400 to-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.35)]'
                  : 'from-cyan-500/70 to-indigo-500/80';
              const shortLabel = bar.label
                .replace(/\/\d{4}$/, '')
                .replace(/^Tuần\s*/i, 'W')
                .slice(0, 6);

              return (
                <div
                  key={bar.key}
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(null)}
                  title={`${bar.label}: ${bar.total.toLocaleString()} clicks`}
                  className="flex-1 min-w-[34px] flex flex-col items-center justify-end cursor-pointer group"
                >
                  <span
                    className={`text-[11px] font-mono font-extrabold mb-1 tabular-nums transition ${
                      hoverIdx === idx ? 'text-cyan-200 scale-105' : 'text-white'
                    }`}
                  >
                    {bar.total.toLocaleString()}
                  </span>
                  <div className="w-full h-[80px] flex items-end border-b border-cyan-500/25 pb-[1px]">
                    <div
                      style={{ height: `${barPx}px` }}
                      className={`w-full rounded-t-sm bg-gradient-to-t ${barColor} transition-all duration-150 ${
                        hoverIdx === idx ? 'brightness-125' : 'opacity-90 group-hover:opacity-100'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 mt-1 truncate max-w-full">
                    {shortLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Mini Telemetry Footer */}
        <div className="grid grid-cols-3 gap-2 text-[11px] sm:text-xs font-mono">
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-md px-2.5 py-1.5 truncate">
            <span className="text-slate-300 block text-[10px] uppercase">TOP SOURCE</span>
            <strong className="text-cyan-200">
              {topSource.name} ({topSource.share}%)
            </strong>
          </div>
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-md px-2.5 py-1.5 truncate">
            <span className="text-slate-300 block text-[10px] uppercase">PEAK RECORD</span>
            <strong className="text-amber-300">
              {peakItem ? `${peakItem.total.toLocaleString()} (${peakItem.label})` : 'N/A'}
            </strong>
          </div>
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-md px-2.5 py-1.5 truncate">
            <span className="text-slate-300 block text-[10px] uppercase">PRIME DAY</span>
            <strong className="text-emerald-300 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{bestDayName || 'Đang tính'}</span>
            </strong>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
        <span className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>Phổ lưu lượng {recentBars.length} chu kỳ gần nhất</span>
        </span>
        <a
          href="#dataTableSection"
          className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-bold transition"
        >
          <span>Xem bảng chi tiết</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
