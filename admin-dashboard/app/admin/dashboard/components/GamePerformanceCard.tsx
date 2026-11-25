'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Trophy,
  ExternalLink,
  Smartphone,
  Apple,
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
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden" id="gamePerformanceSection">
      {/* Header Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
            <Trophy className="w-4 h-4 text-[#5969ff]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <span>Hiệu Quả 4 Game Lamon</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#5969ff] border border-blue-200">
                4 Game
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              So sánh lượng truy cập, số lượt tải game và tương tác nhận Giftcode
            </p>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200 self-stretch sm:self-auto text-xs overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-slate-400 font-semibold px-2 hidden md:inline">Xếp theo:</span>
          <button
            onClick={() => setSortMetric('downloads')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex-shrink-0 ${
              sortMetric === 'downloads'
                ? 'bg-[#5969ff] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lượt Tải
          </button>
          <button
            onClick={() => setSortMetric('traffic')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex-shrink-0 ${
              sortMetric === 'traffic'
                ? 'bg-[#5969ff] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Truy Cập
          </button>
          <button
            onClick={() => setSortMetric('cr')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex-shrink-0 ${
              sortMetric === 'cr'
                ? 'bg-[#5969ff] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tỷ Lệ Tải (%)
          </button>
          <button
            onClick={() => setSortMetric('messenger')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex-shrink-0 ${
              sortMetric === 'messenger'
                ? 'bg-[#5969ff] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Nhận Code
          </button>
        </div>
      </div>

      {/* Mobile Optimized View: Compact Cards (Zero horizontal scroll needed) */}
      <div className="block md:hidden divide-y divide-slate-100">
        {gamesData.map((game, idx) => {
          const rank = idx + 1;

          return (
            <div key={game.id} className="p-3 space-y-2">
              {/* Row 1: Rank, Logo, Name & Direct Download Links */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                      rank === 1
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : rank === 2
                        ? 'bg-slate-200 text-slate-700'
                        : rank === 3
                        ? 'bg-amber-700/80 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    #{rank}
                  </span>
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 shadow-2xs flex-shrink-0 bg-slate-100">
                    <img
                      src={game.logo}
                      alt={game.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = game.fallbackLogo;
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 text-xs tracking-tight truncate">
                      {game.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {game.genre}
                    </div>
                  </div>
                </div>

                {/* Direct Action Links (Pill Buttons) */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <a
                    href={game.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700 bg-white border border-slate-200"
                    title="Mở web"
                  >
                    Web
                  </a>
                  <a
                    href={game.apkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-1.5 py-0.5 rounded text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center gap-0.5"
                    title="Tải APK"
                  >
                    <Smartphone className="w-2.5 h-2.5" />
                    <span>APK</span>
                  </a>
                  <a
                    href={game.iosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-1.5 py-0.5 rounded text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 flex items-center gap-0.5"
                    title="Tải iOS"
                  >
                    <Apple className="w-2.5 h-2.5" />
                    <span>iOS</span>
                  </a>
                </div>
              </div>

              {/* Row 2: Compact Metrics Grid (3 cols) */}
              <div className="grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-slate-50 text-center">
                <div>
                  <div className="text-[10px] text-slate-400">Truy cập</div>
                  <div className="text-xs font-bold text-slate-800">
                    {game.traffic.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {Math.round(game.trafficShare * 100)}% traffic
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Lượt tải</div>
                  <div className="text-xs font-black text-emerald-600">
                    {game.downloads.toLocaleString()}
                  </div>
                  <div className="text-[9px] font-semibold text-emerald-700">
                    {game.cr}% CR
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Nhận Code</div>
                  <div className="text-xs font-black text-[#0284c7]">
                    {game.messengerClicks.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-400">qua Msg</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Tabular Table for Perfect Alignment (Desktop / Tablet) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-slate-200/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-5 w-[300px]">Thứ Hạng & Game</th>
              <th className="py-3 px-4 w-[200px]">Lưu Lượng (Traffic)</th>
              <th className="py-3 px-4 w-[140px]">Lượt Tải (CR%)</th>
              <th className="py-3 px-4 w-[160px]">Thiết Bị (APK / iOS)</th>
              <th className="py-3 px-4 w-[140px]">Nhận Code</th>
              <th className="py-3 px-4 sm:px-5 w-[160px] text-right">Liên Kết Trực Tiếp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {gamesData.map((game, idx) => {
              const rank = idx + 1;
              const trafficPct = Math.round((game.traffic / maxTraffic) * 100);

              return (
                <tr
                  key={game.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  {/* Column 1: Rank & Game Identity */}
                  <td className="py-3.5 px-4 sm:px-5">
                    <div className="flex items-center gap-3">
                      {/* Rank Number */}
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-black flex-shrink-0 ${
                          rank === 1
                            ? 'bg-amber-400 text-slate-950 font-black shadow-2xs'
                            : rank === 2
                            ? 'bg-slate-200 text-slate-700'
                            : rank === 3
                            ? 'bg-amber-700/80 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        #{rank}
                      </span>

                      {/* Game Real Logo */}
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shadow-2xs flex-shrink-0 bg-slate-100">
                        <img
                          src={game.logo}
                          alt={game.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = game.fallbackLogo;
                          }}
                        />
                      </div>

                      {/* Name & Genre (Clean without clutter badges) */}
                      <div className="truncate">
                        <div className="font-bold text-slate-900 text-sm tracking-tight truncate">
                          {game.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 font-normal">
                          {game.genre}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Traffic with Progress Bar */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <strong className="text-slate-800 font-bold text-sm">
                          {game.traffic.toLocaleString()}
                        </strong>
                        <span className="text-slate-400 text-[11px]">
                          ({Math.round(game.trafficShare * 100)}%)
                        </span>
                      </div>
                      <div className="w-28 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: `${trafficPct}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Column 3: Downloads & CR */}
                  <td className="py-3.5 px-4">
                    <div>
                      <div className="text-sm font-black text-emerald-600">
                        {game.downloads.toLocaleString()}
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block mt-0.5">
                        {game.cr}% CR
                      </span>
                    </div>
                  </td>

                  {/* Column 4: Platform Split */}
                  <td className="py-3.5 px-4 text-xs font-semibold text-slate-600">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-[11px]">
                        <span className="text-slate-400 w-8">APK:</span>
                        <strong className="text-emerald-700 font-bold">{game.androidDl.toLocaleString()}</strong>
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        <span className="text-slate-400 w-8">iOS:</span>
                        <strong className="text-indigo-700 font-bold">{game.iosDl.toLocaleString()}</strong>
                      </div>
                    </div>
                  </td>

                  {/* Column 5: Messenger Code Claims */}
                  <td className="py-3.5 px-4">
                    <div>
                      <div className="text-sm font-black text-[#0284c7]">
                        {game.messengerClicks.toLocaleString()}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        qua Messenger
                      </span>
                    </div>
                  </td>

                  {/* Column 6: Direct Action Links (Clean Pill Buttons) */}
                  <td className="py-3.5 px-4 sm:px-5 text-right">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      {/* Web Link */}
                      <a
                        href={game.webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 rounded-md text-[11px] font-bold text-slate-700 hover:text-sky-700 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                        title="Mở Landing Page game trực tiếp trên web"
                      >
                        <span>Web</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>

                      {/* APK Link */}
                      <a
                        href={game.apkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 rounded-md text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200 transition shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                        title="Tải trực tiếp file APK cho Android"
                      >
                        <Smartphone className="w-2.5 h-2.5" />
                        <span>APK</span>
                      </a>

                      {/* iOS Link */}
                      <a
                        href={game.iosUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 rounded-md text-[11px] font-bold text-indigo-700 hover:text-indigo-800 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200 transition shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                        title="Tải trực tiếp bản iOS"
                      >
                        <Apple className="w-2.5 h-2.5" />
                        <span>iOS</span>
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="px-4 sm:px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 bg-[#f8fafc]/50">
        <div className="flex items-center gap-1.5">
          <Gamepad2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Số liệu phân bổ tự động theo khoảng ngày được lọc. Bấm các nút Web, APK hoặc iOS để tải hoặc mở trang game trực tiếp.</span>
        </div>
        <div className="text-slate-500 font-medium text-[11px]">
          Game dẫn đầu: <strong className="text-slate-800 font-bold">{gamesData[0]?.name}</strong>
        </div>
      </div>
    </div>
  );
}
