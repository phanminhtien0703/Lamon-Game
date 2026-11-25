'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Trophy,
  ExternalLink,
  Smartphone,
  Apple,
  Eye,
  Gamepad2,
  Download,
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
  logo: string;
  fallbackLogo: string;
  webUrl: string;
  apkUrl: string;
  iosUrl: string;
  trafficShare: number;
  downloadCR: number;
  androidRatio: number;
  iosRatio: number;
  pcRatio: number;
  messengerRatio: number;
}

const GAME_DEFINITIONS: GameItem[] = [
  {
    id: 'than-ma-giang-the',
    name: 'Thần Ma Giáng Thế',
    genre: 'Tiên Hiệp MMORPG',
    badge: 'HOT NHẤT 🔥',
    badgeBg: 'bg-rose-50 border-rose-200',
    badgeText: 'text-rose-600',
    logo: '/images/games/tmgt-logo.jpg',
    fallbackLogo: 'https://lamongame.com/images/tmgt/tmgt-logo.jpg',
    webUrl: 'https://lamongame.com/games/than-ma-giang-the/',
    apkUrl: 'https://cos.lejunwl.com/youlong/lejunwl/784yx/THANMAGIANGTHEYL784Z4/THANMAGIANGTHEYL784Z4_EdIf1XkalZCqknYO0sCRwA.apk',
    iosUrl: 'https://new.yxtgym.com/y92.0l110/EdIf1XkalZCqknYO0sCRwA/C0mv.html',
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
    logo: '/images/games/psm-logo.jpg',
    fallbackLogo: 'https://lamongame.com/images/psm/psm-logo.jpg',
    webUrl: 'https://lamongame.com/games/nhat-kiem-phu-sinh/',
    apkUrl: 'https://down.skeideng.com/apk/mnghoalc/93e8aaac362ce4345501c09f8ecd5853.apk',
    iosUrl: 'https://apps.apple.com/vn/app/lăng-tiêu-chí/id6752824409',
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
    logo: '/images/games/tbtt-logo.jpg',
    fallbackLogo: 'https://lamongame.com/images/tbtt/tbtt-logo.jpg',
    webUrl: 'https://lamongame.com/games/chien-binh-thuc-tinh/',
    apkUrl: 'https://down.skeideng.com/apk/huynolca/97c84d9070b5f295866f7221600800f4.apk',
    iosUrl: 'https://apps.apple.com/vn/app/chiến-địa-hư-vô/id6805303103',
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
    logo: '/images/games/era-logo.jpg',
    fallbackLogo: 'https://lamongame.com/images/upcoming/upcoming-logo.jpg',
    webUrl: 'https://lamongame.com/games/era-of-warfare/',
    apkUrl: 'https://cos.lejunwl.com/youlong/lejunwl/784yx/THANMAGIANGTHEYL784Z4/THANMAGIANGTHEYL784Z4_EdIf1XkalZCqknYO0sCRwA.apk',
    iosUrl: 'https://new.yxtgym.com/y92.0l110/EdIf1XkalZCqknYO0sCRwA/C0mv.html',
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
              {/* Left Column: Game Identity & Real Logo */}
              <div className="flex items-center gap-3 min-w-[280px] lg:w-[35%]">
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

                {/* Game Real Logo Image */}
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs flex-shrink-0 bg-slate-100">
                  <img
                    src={game.logo}
                    alt={game.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = game.fallbackLogo;
                    }}
                  />
                </div>

                {/* Name & Genre & Direct Action Buttons */}
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

                  {/* Direct Action Links (Web, APK, iOS) */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs">
                    <span className="text-slate-400 font-medium hidden sm:inline mr-1">{game.genre}</span>

                    {/* Direct Web link */}
                    <a
                      href={game.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0284c7] hover:text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200/70 hover:bg-sky-100 transition cursor-pointer"
                      title="Mở Landing Page game trực tiếp trên web"
                    >
                      <span>Web</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>

                    {/* Direct APK Download link */}
                    <a
                      href={game.apkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70 hover:bg-emerald-100 transition cursor-pointer"
                      title="Tải trực tiếp file APK cho Android"
                    >
                      <Smartphone className="w-2.5 h-2.5" />
                      <span>Tải APK</span>
                    </a>

                    {/* Direct iOS Download link */}
                    <a
                      href={game.iosUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/70 hover:bg-indigo-100 transition cursor-pointer"
                      title="Tải trực tiếp bản iOS"
                    >
                      <Apple className="w-2.5 h-2.5" />
                      <span>iOS</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Middle Column: Traffic & Download Progress */}
              <div className="flex-1 min-w-[180px] lg:px-4">
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
              <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:w-[38%] text-right sm:text-left bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
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

                {/* Device Split (Android vs iOS) */}
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
          <span>Bấm các nút Web, Tải APK hoặc iOS để mở hoặc tải trực tiếp game tương ứng.</span>
        </div>
        <div className="text-slate-500 font-medium text-[11px]">
          Top game đóng góp nhiều nhất: <strong className="text-slate-800">{gamesData[0]?.name}</strong>
        </div>
      </div>
    </div>
  );
}
