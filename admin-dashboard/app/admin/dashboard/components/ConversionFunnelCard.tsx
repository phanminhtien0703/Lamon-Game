'use client';

import React, { useMemo } from 'react';
import {
  Download,
  Smartphone,
  Apple,
  Monitor,
  MessageCircle,
} from 'lucide-react';
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
  // Calculate stats based on current items & total traffic
  const analysis = useMemo(() => {
    return calculateConversionAnalysis(items, grandTotal);
  }, [items, grandTotal]);

  const androidPlat = analysis.platforms.find((p) => p.key === 'android');
  const iosPlat = analysis.platforms.find((p) => p.key === 'ios');
  const pcPlat = analysis.platforms.find((p) => p.key === 'pc');

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-5 shadow-xs" id="conversionSection">
      {/* 1. Header gọn gàng */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center font-bold flex-shrink-0">
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span>Thống Kê Tải Game & Nhận Code</span>
              <span className="text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Tỷ lệ tải: {analysis.overallCR}%
              </span>
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
              Phân loại lượt tải theo thiết bị (Android, iOS, PC) và lượt bấm nhận Giftcode
            </p>
          </div>
        </div>

        <div className="text-[11px] sm:text-xs text-slate-500 font-medium self-start sm:self-auto bg-slate-50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-200/70">
          Tổng tải: <strong className="text-slate-800 font-black">{analysis.totalDownloads.toLocaleString()}</strong> lượt
          <span className="text-slate-400 mx-1.5">/</span>
          <strong className="text-slate-700">{analysis.totalTraffic.toLocaleString()}</strong> lượt vào web
        </div>
      </div>

      {/* 2. 4 Thẻ Thiết Bị Rõ Ràng (Android, iOS, PC, Messenger) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 my-3 sm:my-4">
        {/* Android */}
        <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 hover:border-emerald-300 transition">
          <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
            <span className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center gap-1 sm:gap-1.5 truncate">
              <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Android (APK)</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
              {androidPlat?.percent || 57}%
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            {androidPlat?.downloads.toLocaleString() || 0}
            <span className="text-[11px] sm:text-xs font-normal text-slate-400 ml-1">lượt</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1 truncate sm:whitespace-normal">Tải file APK cho máy Android</p>
        </div>

        {/* iOS */}
        <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 hover:border-indigo-300 transition">
          <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
            <span className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center gap-1 sm:gap-1.5 truncate">
              <Apple className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-800 flex-shrink-0" />
              <span>iOS (iPhone/iPad)</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 flex-shrink-0">
              {iosPlat?.percent || 27}%
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            {iosPlat?.downloads.toLocaleString() || 0}
            <span className="text-[11px] sm:text-xs font-normal text-slate-400 ml-1">lượt</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1 truncate sm:whitespace-normal">Tải qua link iOS / App Store</p>
        </div>

        {/* PC Windows */}
        <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 hover:border-amber-300 transition">
          <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
            <span className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center gap-1 sm:gap-1.5 truncate">
              <Monitor className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 flex-shrink-0" />
              <span>Máy tính (PC)</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 flex-shrink-0">
              {pcPlat?.percent || 16}%
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            {pcPlat?.downloads.toLocaleString() || 0}
            <span className="text-[11px] sm:text-xs font-normal text-slate-400 ml-1">lượt</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1 truncate sm:whitespace-normal">Bản cài Windows máy tính</p>
        </div>

        {/* Messenger Nhận Code */}
        <div className="p-2.5 sm:p-3.5 rounded-xl bg-gradient-to-br from-sky-50/60 to-blue-50/40 border border-sky-200 hover:border-sky-300 transition">
          <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
            <span className="text-[11px] sm:text-xs font-bold text-[#0284c7] flex items-center gap-1 sm:gap-1.5 truncate">
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0284c7] flex-shrink-0" />
              <span>Nhận Code Messenger</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-sky-100 text-[#0284c7] border border-sky-200 flex-shrink-0">
              {analysis.messengerCR}%
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            {analysis.totalMessenger.toLocaleString()}
            <span className="text-[11px] sm:text-xs font-normal text-slate-400 ml-1">lượt</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1 truncate sm:whitespace-normal">Bấm nút nhận code từ popup tải</p>
        </div>
      </div>

      {/* 3. Thanh tỷ lệ phân bổ thiết bị trực quan */}
      <div className="pt-1.5 sm:pt-2">
        <div className="w-full h-2 sm:h-2.5 rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${androidPlat?.percent || 57}%` }}
            title={`Android: ${androidPlat?.percent}%`}
          />
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${iosPlat?.percent || 27}%` }}
            title={`iOS: ${iosPlat?.percent}%`}
          />
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${pcPlat?.percent || 16}%` }}
            title={`PC: ${pcPlat?.percent}%`}
          />
        </div>

        {/* Chú thích màu sắc */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mt-2 sm:mt-2.5 text-[11px] sm:text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-5">
            <span className="flex items-center gap-1 sm:gap-1.5">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <span>Android: <strong className="text-slate-700">{androidPlat?.percent}%</strong></span>
            </span>
            <span className="flex items-center gap-1 sm:gap-1.5">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-indigo-500 flex-shrink-0" />
              <span>iOS: <strong className="text-slate-700">{iosPlat?.percent}%</strong></span>
            </span>
            <span className="flex items-center gap-1 sm:gap-1.5">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
              <span>PC: <strong className="text-slate-700">{pcPlat?.percent}%</strong></span>
            </span>
          </div>

          <div className="text-slate-500 text-[10px] sm:text-[11px]">
            💡 Cứ 100 người vào web thì có <strong>~{Math.round(analysis.overallCR)} người bấm tải game</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
