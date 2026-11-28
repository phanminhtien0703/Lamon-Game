'use client';

import React, { useMemo } from 'react';
import { Download, Smartphone, Apple, Monitor, MessageCircle } from 'lucide-react';
import { GroupedTrackingItem } from '../types';
import { calculateConversionAnalysis } from '../utils/analytics';

interface ConversionFunnelCardProps {
  items: GroupedTrackingItem[];
  grandTotal: number;
  granularityLabel: string;
  compareEnabled?: boolean;
}

export default function ConversionFunnelCard({
  items,
  grandTotal,
}: ConversionFunnelCardProps) {
  const analysis = useMemo(() => {
    return calculateConversionAnalysis(items, grandTotal);
  }, [items, grandTotal]);

  const androidPlat = analysis.platforms.find((p) => p.key === 'android');
  const iosPlat = analysis.platforms.find((p) => p.key === 'ios');
  const pcPlat = analysis.platforms.find((p) => p.key === 'pc');

  return (
    <div className="hud-panel hud-corners rounded-xl p-3.5 sm:p-5 flex flex-col justify-between gap-3" id="conversionSection">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/35 text-cyan-300 flex items-center justify-center flex-shrink-0">
            <Download className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-[15px] font-extrabold uppercase tracking-wider text-white flex flex-wrap items-center gap-1.5">
              <span>Thống Kê Tải &amp; Thiết Bị</span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/35">
                CR {analysis.overallCR}%
              </span>
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
              Android APK • iOS App Store • PC • Giftcode
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-200 bg-[#040c1f]/90 px-2.5 py-1 rounded-lg border border-cyan-500/25 self-start sm:self-auto">
          <strong className="text-cyan-300">{analysis.totalDownloads.toLocaleString()}</strong>
          <span className="text-slate-400 mx-1">/</span>
          <span>{analysis.totalTraffic.toLocaleString()}</span>
        </div>
      </div>

      {/* 4 Telemetry Modules */}
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
        {/* Android */}
        <div className="p-2.5 sm:p-3 rounded-lg bg-[#040c1f]/80 border border-emerald-500/25 hover:border-emerald-400/50 transition">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs sm:text-[13px] font-bold text-slate-100 flex items-center gap-1.5 truncate">
              <Smartphone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Android (APK)</span>
            </span>
            <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
              {androidPlat?.percent || 57}%
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-1.5">
            <span className="text-lg sm:text-xl font-black font-mono text-white">
              {androidPlat?.downloads.toLocaleString() || 0}
            </span>
            <span className="text-[11px] text-slate-300">lượt APK</span>
          </div>
        </div>

        {/* iOS */}
        <div className="p-2.5 sm:p-3 rounded-lg bg-[#040c1f]/80 border border-indigo-500/25 hover:border-indigo-400/50 transition">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs sm:text-[13px] font-bold text-slate-100 flex items-center gap-1.5 truncate">
              <Apple className="w-4 h-4 text-indigo-300 flex-shrink-0" />
              <span>iOS (App Store)</span>
            </span>
            <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-400/30">
              {iosPlat?.percent || 27}%
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-1.5">
            <span className="text-lg sm:text-xl font-black font-mono text-white">
              {iosPlat?.downloads.toLocaleString() || 0}
            </span>
            <span className="text-[11px] text-slate-300">lượt iOS</span>
          </div>
        </div>

        {/* PC */}
        <div className="p-2.5 sm:p-3 rounded-lg bg-[#040c1f]/80 border border-amber-500/25 hover:border-amber-400/50 transition">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs sm:text-[13px] font-bold text-slate-100 flex items-center gap-1.5 truncate">
              <Monitor className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Máy tính (PC)</span>
            </span>
            <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-400/30">
              {pcPlat?.percent || 16}%
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-1.5">
            <span className="text-lg sm:text-xl font-black font-mono text-white">
              {pcPlat?.downloads.toLocaleString() || 0}
            </span>
            <span className="text-[11px] text-slate-300">lượt PC</span>
          </div>
        </div>

        {/* Messenger Code */}
        <div className="p-2.5 sm:p-3 rounded-lg bg-cyan-500/10 border border-cyan-400/35 hover:border-cyan-300/60 transition">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs sm:text-[13px] font-bold text-cyan-200 flex items-center gap-1.5 truncate">
              <MessageCircle className="w-4 h-4 text-cyan-300 flex-shrink-0" />
              <span>Nhận Code Msg</span>
            </span>
            <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-400/35">
              {analysis.messengerCR}%
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-1.5">
            <span className="text-lg sm:text-xl font-black font-mono text-cyan-200">
              {analysis.totalMessenger.toLocaleString()}
            </span>
            <span className="text-[11px] text-cyan-200/80">lượt nhận code</span>
          </div>
        </div>
      </div>

      {/* Stacked Ratio Bar */}
      <div className="pt-1 space-y-2">
        <div className="w-full h-2.5 rounded-full bg-[#040c1f] border border-cyan-500/20 overflow-hidden flex">
          <div
            className="h-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
            style={{ width: `${androidPlat?.percent || 57}%` }}
            title={`Android: ${androidPlat?.percent}%`}
          />
          <div
            className="h-full bg-indigo-400 shadow-[0_0_8px_#818cf8]"
            style={{ width: `${iosPlat?.percent || 27}%` }}
            title={`iOS: ${iosPlat?.percent}%`}
          />
          <div
            className="h-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"
            style={{ width: `${pcPlat?.percent || 16}%` }}
            title={`PC: ${pcPlat?.percent}%`}
          />
        </div>
        <div className="text-[11px] sm:text-xs font-mono text-slate-300 text-center">
          ~<strong className="text-cyan-300">{Math.round(analysis.overallCR)}</strong> / 100 lượt vào web bấm tải game
        </div>
      </div>
    </div>
  );
}
