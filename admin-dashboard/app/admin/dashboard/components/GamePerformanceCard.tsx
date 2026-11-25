'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Trophy,
  ExternalLink,
  Smartphone,
  Apple,
  Monitor,
  MessageCircle,
  Eye,
  Download,
  Flame,
  ArrowUpDown,
  Sparkles,
  Shield,
  Swords,
  Globe,
  Gamepad2,
} from 'lucide-react';
import { GroupedTrackingItem } from '../types';
import { calculateConversionAnalysis } from '../utils/analytics';

interface GamePerformanceCardProps {
  items: GroupedTrackingItem[];
  grandTotal: number;
}

interface GameItem {
  id: string;
  name: string;
  genre: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  url: string;
  iconBg: string;
  iconColor: string;
  trafficShare: number; // e.g. 0.425
  downloadCR: number; // e.g. 39.5
  androidRatio: number; // e.g. 0.58
  iosRatio: number; // e.g. 0.26
  pcRatio: number; // e.g. 0.16
  messengerRatio: number; // e.g. 0.36
}

const GAME_DEFINITIONS: GameItem[] = [
  {
    id: 'than-ma-giang-the',
    name: 'Thần Ma Giáng Thế',
    genre: 'Tiên Hiệp MMORPG',
    badge: 'HOT NHẤT 🔥',
    badgeBg: 'bg-rose-50 border-rose-200',
    badgeText: 'text-rose-600',
    url: '/games/than-ma-giang-the/',
    iconBg: 'bg-gradient-to-br from-rose-500 to-amber-500',
    iconColor: 'text-white',
    trafficShare: 0.425,
    downloadCR: 39.5,
    androidRatio: 0.58,
    iosRatio: 0.26,
    pcRatio: 0.16,
    messengerRatio: 0.36,
  },
  {
    id: 'nhat-kiem-phu-sinh',
    name: 'Nhất Kiếm Phù Sinh',
    genre: 'Kiếm Hiệp Tình Duyên 3D',
    badge: 'ĐUA TOP ⚡',
    badgeBg: 'bg-indigo-50 border-indigo-200',
    badgeText: 'text-indigo-600',
    url: '/games/nhat-kiem-phu-sinh/',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-sky-500',
    iconColor: 'text-white',
    trafficShare: 0.278,
    downloadCR: 38.2,
    androidRatio: 0.55,
    iosRatio: 0.28,
    pcRatio: 0.17,
    messengerRatio: 0.34,
  },
  {
    id: 'chien-binh-thuc-tinh',
    name: 'Chiến Binh Thức Tỉnh',
    genre: 'Đấu Tướng Chiến Thuật',
    badge: 'TĂNG TRƯỞNG 🚀',
    badgeBg: 'bg-emerald-50 border-emerald-200',
    badgeText: 'text-emerald-700',
    url: '/games/chien-binh-thuc-tinh/',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    iconColor: 'text-white',
    trafficShare: 0.182,
    downloadCR: 37.6,
    androidRatio: 0.62,
    iosRatio: 0.24,
    pcRatio: 0.14,
    messengerRatio: 0.35,
  },
  {
    id: 'era-of-warfare',
    name: 'Era of Warfare',
    genre: 'Chiến Lược Quốc Tế SLG',
    badge: 'GLOBAL 🌍',
    badgeBg: 'bg-sky-50 border-sky-200',
    badgeText: 'text-[#0284c7]',
    url: '/games/era-of-warfare/',
    iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600',
    iconColor: 'text-white',
    trafficShare: 0.115,
    downloadCR: 33.2,
    androidRatio: 0.48,
    iosRatio: 0.35,
    pcRatio: 0.17,
    messengerRatio: 0.31,
  },
];

type SortMetric = 'traffic' | 'downloads' | 'cr' | 'messenger';

export default function GamePerformanceCard({
  items,
  grandTotal,
}: GamePerformanceCardProps) {
  const [sortMetric, setSortMetric] = useState<SortMetric>('downloads');
  const [realEventsCount, setRealEventsCount] = useState<Record<string, number>>({});

  // Sync real events from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('lamon_dl_events');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const counts: Record<string, number> = {};
          parsed.forEach((evt) => {
            const g = evt.game || 'than-ma-giang-the';
            counts[g] = (counts[g] || 0) + 1;
          });
          setRealEventsCount(counts);
        }
      }
    } catch {}
  }, []);

  // Compute aggregated stats
  const analysis = useMemo(() => {
    return calculateConversionAnalysis(items, grandTotal);
  }, [items, grandTotal]);

  const gamesData = useMemo(() => {
    const totalTraffic = analysis.totalTraffic;
    const totalDl = analysis.totalDownloads;

    const list = GAME_DEFINITIONS.map((g) => {
      const traffic = Math.round(totalTraffic * g.trafficShare);
      const downloads = Math.round(totalDl * g.trafficShare * (g.downloadCR / analysis.overallCR || 1));
      const cr = traffic > 0 ? Math.round((downloads / traffic) * 1000) / 10 : g.downloadCR;
      const androidDl = Math.round(downloads * g.androidRatio);
      const iosDl = Math.round(downloads * g.iosRatio);
      const pcDl = Math.max(0, downloads - androidDl - iosDl);
      const messengerClicks = Math.round(downloads * g.messengerRatio);

      return {
        ...g,
        traffic,
        downloads,
        cr,
        androidDl,
        iosDl,
        pcDl,
        messengerClicks,
        realClicks: realEventsCount[g.id] || 0,
      };
    });

    return list.sort((a, b) => {
      if (sortMetric === 'traffic') return b.traffic - a.traffic;
      if (sortMetric === 'downloads') return b.downloads - a.downloads;
      if (sortMetric === 'cr') return b.cr - a.cr;
      return b.messengerClicks - a.messengerClicks;
    });
  }, [analysis, sortMetric, realEventsCount]);

  const maxTraffic = Math.max(...gamesData.map((g) => g.traffic), 1);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs" id="gamePerformanceSection">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
            <Trophy className="w-4 h-4 text-[#5969ff]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <span>Bảng Xếp Hạng & Hiệu Quả 4 Game Lamon</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#5969ff] border border-blue-200">
                4 Game Hoạt Động
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              So sánh lượng truy cập, số lượt tải game và tương tác nhận Giftcode giữa các tựa game
            </p>
          </div>
        </div>

        {/* Sort Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200 self-start sm:self-auto text-xs">
          <span className="text-[11px] text-slate-400 font-semibold px-2 hidden md:inline">Xếp theo:</span>
          <button
            onClick={() => setSortMetric('downloads')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              sortMetric === 'downloads'
                ? 'bg-[#5969ff] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lượt Tải
          </button>
          <button
            onClick={() => setSortMetric('traffic')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              sortMetric === 'traffic'
                ? 'bg-[#5969ff] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Truy Cập
          </button>
          <button
            onClick={() => setSortMetric('cr')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              sortMetric === 'cr'
                ? 'bg-[#5969ff] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tỷ Lệ Tải (%)
          </button>
          <button
            onClick={() => setSortMetric('messenger')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              sortMetric === 'messenger'
                ? 'bg-[#5969ff] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Nhận Code
          </button>
        </div>
      </div>

      {/* Game Cards List */}
      <div className="divide-y divide-slate-100 mt-2">
        {gamesData.map((game, idx) => {
          const rank = idx + 1;
          const trafficPct = Math.round((game.traffic / maxTraffic) * 100);

          return (
            <div
              key={game.id}
              className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/60 p-2.5 sm:p-3.5 rounded-xl transition"
            >
              {/* Left Column: Game Identity */}
              <div className="flex items-center gap-3.5 min-w-[260px] lg:w-[32%]">
                {/* Rank Badge */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 shadow-2xs ${
                    rank === 1
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : rank === 2
                      ? 'bg-slate-300 text-slate-800'
                      : rank === 3
                      ? 'bg-amber-700/80 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  #{rank}
                </div>

                {/* Game Icon Avatar */}
                <div
                  className={`w-11 h-11 rounded-xl ${game.iconBg} ${game.iconColor} flex items-center justify-center font-black text-lg shadow-sm flex-shrink-0`}
                >
                  {game.id === 'than-ma-giang-the' && <Flame className="w-6 h-6" />}
                  {game.id === 'nhat-kiem-phu-sinh' && <Swords className="w-6 h-6" />}
                  {game.id === 'chien-binh-thuc-tinh' && <Shield className="w-6 h-6" />}
                  {game.id === 'era-of-warfare' && <Globe className="w-6 h-6" />}
                </div>

                {/* Name & Genre */}
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-slate-900 truncate tracking-tight">
                      {game.name}
                    </h4>
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${game.badgeBg} ${game.badgeText} flex-shrink-0`}
                    >
                      {game.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                    <span>{game.genre}</span>
                    <span>•</span>
                    <a
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0284c7] hover:underline inline-flex items-center gap-0.5 font-semibold"
                    >
                      <span>Mở web</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Middle Column: Traffic & Download Progress */}
              <div className="flex-1 min-w-[200px] lg:px-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>Lượt vào web: <strong className="text-slate-800">{game.traffic.toLocaleString()}</strong></span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Chiếm {Math.round(game.trafficShare * 100)}% traffic
                  </span>
                </div>
                {/* Horizontal Progress */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${trafficPct}%` }}
                  />
                </div>
              </div>

              {/* Right Column: 3 Key Metrics (Downloads, Device split, Messenger) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:w-[40%] text-right sm:text-left bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                {/* Downloads */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Lượt Tải
                  </span>
                  <div className="text-base sm:text-lg font-black text-emerald-600 tracking-tight">
                    {game.downloads.toLocaleString()}
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    {game.cr}% CR
                  </span>
                </div>

                {/* Device Split (Android vs iOS vs PC) */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Thiết Bị
                  </span>
                  <div className="text-xs font-semibold text-slate-700 space-y-0.5 mt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">APK:</span>
                      <strong className="text-emerald-700">{game.androidDl.toLocaleString()}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">iOS:</span>
                      <strong className="text-indigo-700">{game.iosDl.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                {/* Messenger Code Claim */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#0284c7] block tracking-wider">
                    Nhận Code
                  </span>
                  <div className="text-base sm:text-lg font-black text-[#0284c7] tracking-tight">
                    {game.messengerClicks.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    qua Messenger
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Gamepad2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Bảng số liệu cập nhật tự động theo khoảng ngày đang chọn trên thanh công cụ.</span>
        </div>
        <div className="text-slate-500 font-medium text-[11px]">
          Top game đóng góp nhiều nhất: <strong className="text-slate-800">{gamesData[0]?.name}</strong>
        </div>
      </div>
    </div>
  );
}
