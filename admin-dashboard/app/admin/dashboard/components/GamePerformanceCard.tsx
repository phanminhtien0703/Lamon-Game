'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Trophy, ExternalLink, Smartphone, Apple, Gamepad2 } from 'lucide-react';
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

export default function GamePerformanceCard({ items, grandTotal }: GamePerformanceCardProps) {
  const [sortMetric, setSortMetric] = useState<SortMetric>('downloads');
  const [realEventsCount, setRealEventsCount] = useState<Record<string, number>>({});

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
    <div className="hud-panel hud-corners rounded-xl overflow-hidden" id="gamePerformanceSection">
      {/* Header Toolbar */}
      <div className="p-3.5 sm:p-5 border-b border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/35 text-amber-300 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-[15px] font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
              <span>Hiệu Quả 4 Game Lamon</span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-200 border border-cyan-400/35">
                4 ACTIVE
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              So sánh lượng truy cập, số lượt tải game và tương tác nhận Giftcode
            </p>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-1 p-1 bg-[#040c1f]/90 rounded-xl border border-cyan-500/25 self-stretch sm:self-auto text-xs overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono text-slate-300 font-semibold px-2 hidden md:inline uppercase">
            Xếp theo:
          </span>
          {[
            { key: 'downloads', label: 'Lượt Tải' },
            { key: 'traffic', label: 'Truy Cập' },
            { key: 'cr', label: 'Tỷ Lệ Tải (%)' },
            { key: 'messenger', label: 'Nhận Code' },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setSortMetric(btn.key as SortMetric)}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex-shrink-0 text-xs ${
                sortMetric === btn.key
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                  : 'text-slate-200 hover:text-white hover:bg-cyan-500/10'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden divide-y divide-cyan-500/15">
        {gamesData.map((game, idx) => {
          const rank = idx + 1;

          return (
            <div key={game.id} className="p-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-mono font-black flex-shrink-0 ${
                      rank === 1
                        ? 'bg-amber-400 text-slate-950'
                        : rank === 2
                        ? 'bg-cyan-300 text-slate-950'
                        : rank === 3
                        ? 'bg-indigo-400 text-slate-950'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    #{rank}
                  </span>
                  <div className="w-9 h-9 rounded-lg overflow-hidden border border-cyan-500/30 flex-shrink-0 bg-slate-900">
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
                    <div className="font-bold text-white text-sm truncate">{game.name}</div>
                    <div className="text-[11px] text-slate-300 truncate">{game.genre}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <a
                    href={game.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded text-[11px] font-bold text-cyan-200 bg-cyan-500/10 border border-cyan-400/30"
                  >
                    Web
                  </a>
                  <a
                    href={game.apkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded text-[11px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 flex items-center gap-0.5"
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>APK</span>
                  </a>
                  <a
                    href={game.iosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded text-[11px] font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-400/30 flex items-center gap-0.5"
                  >
                    <Apple className="w-3 h-3" />
                    <span>iOS</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-[#040c1f]/90 border border-cyan-500/15 text-center font-mono">
                <div>
                  <div className="text-[10px] text-slate-300 uppercase">Truy cập</div>
                  <div className="text-sm font-bold text-white">{game.traffic.toLocaleString()}</div>
                  <div className="text-[10px] text-cyan-300">{Math.round(game.trafficShare * 100)}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-300 uppercase">Lượt tải</div>
                  <div className="text-sm font-black text-emerald-300">{game.downloads.toLocaleString()}</div>
                  <div className="text-[10px] text-emerald-300">{game.cr}% CR</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-300 uppercase">Nhận Code</div>
                  <div className="text-sm font-black text-cyan-300">{game.messengerClicks.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-300">Messenger</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-[#040c1f]/90 border-b border-cyan-500/20 text-[11px] sm:text-xs font-mono font-bold text-cyan-200 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-5 w-[300px]">Thứ Hạng &amp; Game</th>
              <th className="py-3 px-4 w-[200px]">Lưu Lượng (Traffic)</th>
              <th className="py-3 px-4 w-[140px]">Lượt Tải (CR%)</th>
              <th className="py-3 px-4 w-[160px]">Thiết Bị (APK / iOS)</th>
              <th className="py-3 px-4 w-[140px]">Nhận Code</th>
              <th className="py-3 px-4 sm:px-5 w-[160px] text-right">Liên Kết Trực Tiếp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/10 text-sm">
            {gamesData.map((game, idx) => {
              const rank = idx + 1;
              const trafficPct = Math.round((game.traffic / maxTraffic) * 100);

              return (
                <tr key={game.id} className="hover:bg-cyan-500/10 transition-colors">
                  <td className="py-3.5 px-4 sm:px-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-black flex-shrink-0 ${
                          rank === 1
                            ? 'bg-amber-400 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.45)]'
                            : rank === 2
                            ? 'bg-cyan-300 text-slate-950'
                            : rank === 3
                            ? 'bg-indigo-400 text-slate-950'
                            : 'bg-slate-800 text-slate-200'
                        }`}
                      >
                        #{rank}
                      </span>

                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-cyan-500/30 flex-shrink-0 bg-slate-900">
                        <img
                          src={game.logo}
                          alt={game.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = game.fallbackLogo;
                          }}
                        />
                      </div>

                      <div className="truncate">
                        <div className="font-bold text-white text-sm tracking-tight truncate">{game.name}</div>
                        <div className="text-xs text-slate-300 mt-0.5">{game.genre}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-mono">
                        <strong className="text-white font-bold text-sm">
                          {game.traffic.toLocaleString()}
                        </strong>
                        <span className="text-cyan-200 text-xs">
                          ({Math.round(game.trafficShare * 100)}%)
                        </span>
                      </div>
                      <div className="w-28 bg-[#030816] rounded-full h-1.5 overflow-hidden border border-cyan-500/20">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full"
                          style={{ width: `${trafficPct}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <div>
                      <div className="text-sm font-black text-emerald-300">
                        {game.downloads.toLocaleString()}
                      </div>
                      <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 inline-block mt-0.5">
                        {game.cr}% CR
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-xs font-mono">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-slate-300 w-9">APK:</span>
                        <strong className="text-emerald-300 font-bold">{game.androidDl.toLocaleString()}</strong>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-slate-300 w-9">iOS:</span>
                        <strong className="text-indigo-300 font-bold">{game.iosDl.toLocaleString()}</strong>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <div>
                      <div className="text-sm font-black text-cyan-300">
                        {game.messengerClicks.toLocaleString()}
                      </div>
                      <span className="text-[11px] text-slate-300 block mt-0.5 font-sans">qua Messenger</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 sm:px-5 text-right">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      <a
                        href={game.webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-md text-xs font-bold text-cyan-200 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-400/30 transition inline-flex items-center gap-1"
                        title="Mở Landing Page game trực tiếp trên web"
                      >
                        <span>Web</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <a
                        href={game.apkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-md text-xs font-bold text-emerald-300 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-400/30 transition inline-flex items-center gap-1"
                        title="Tải trực tiếp file APK cho Android"
                      >
                        <Smartphone className="w-3 h-3" />
                        <span>APK</span>
                      </a>

                      <a
                        href={game.iosUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-md text-xs font-bold text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-400/30 transition inline-flex items-center gap-1"
                        title="Tải trực tiếp bản iOS"
                      >
                        <Apple className="w-3 h-3" />
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
      <div className="px-4 sm:px-5 py-3 border-t border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300 bg-[#040c1f]/75">
        <div className="flex items-center gap-1.5">
          <Gamepad2 className="w-4 h-4 text-cyan-400" />
          <span>Số liệu phân bổ theo khoảng ngày được lọc. Bấm Web, APK hoặc iOS để mở trực tiếp.</span>
        </div>
        <div className="text-slate-200 font-mono text-xs">
          TOP GAME: <strong className="text-cyan-300 font-bold">{gamesData[0]?.name}</strong>
        </div>
      </div>
    </div>
  );
}
