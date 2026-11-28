'use client';

import React, { useMemo, useState } from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { CHANNELS, ChannelKey, GroupedTrackingItem } from '../types';

interface AcquisitionCardProps {
  items: GroupedTrackingItem[];
  grandTotal: number;
}

export default function AcquisitionCard({ items, grandTotal }: AcquisitionCardProps) {
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  const channelData = useMemo(() => {
    const sums = {} as Record<ChannelKey, number>;
    CHANNELS.forEach((ch) => {
      sums[ch.key] = 0;
    });

    items.forEach((item) => {
      CHANNELS.forEach((ch) => {
        sums[ch.key] += item[ch.key] ?? 0;
      });
    });

    const effTotal = grandTotal || 1;

    return CHANNELS.map((ch) => {
      const clicks = sums[ch.key];
      const percent = Math.round((clicks / effTotal) * 1000) / 10;
      return {
        ...ch,
        clicks,
        percent,
      };
    }).sort((a, b) => b.clicks - a.clicks);
  }, [items, grandTotal]);

  const donutPaths = useMemo(() => {
    const size = 180;
    const center = size / 2;
    const outerRadius = 80;
    const innerRadius = 52;
    const effectiveTotal = channelData.reduce((s, c) => s + c.clicks, 0) || 1;

    let currentAngle = -Math.PI / 2;

    return channelData.map((ch) => {
      const sliceAngle = (ch.clicks / effectiveTotal) * (2 * Math.PI);
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
        ch.clicks === 0
          ? ''
          : `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;

      return {
        ...ch,
        pathData,
      };
    });
  }, [channelData]);

  const activeChannel = hoverKey
    ? channelData.find((c) => c.key === hoverKey)
    : channelData[0];

  return (
    <div className="hud-panel hud-corners rounded-xl p-3.5 sm:p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-cyan-500/20">
          <div>
            <h3 className="text-sm sm:text-[15px] font-extrabold uppercase tracking-wider text-white">
              Channel Radar
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
              Cơ cấu đóng góp các nguồn traffic
            </p>
          </div>
          <div className="p-2 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
            <PieChartIcon className="w-4 h-4" />
          </div>
        </div>

        {/* Glowing HUD Donut */}
        <div className="flex items-center justify-center my-2.5 sm:my-4 relative">
          <svg viewBox="0 0 180 180" className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] overflow-visible">
            {donutPaths.map((slice) => {
              if (!slice.pathData) return null;
              const isHovered = hoverKey === slice.key;

              return (
                <path
                  key={slice.key}
                  d={slice.pathData}
                  fill={slice.color}
                  opacity={hoverKey ? (isHovered ? 1 : 0.35) : 0.92}
                  stroke="#050e23"
                  strokeWidth={2}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoverKey(slice.key)}
                  onMouseLeave={() => setHoverKey(null)}
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-cyan-200 uppercase tracking-wider">
              {activeChannel?.label || 'Tổng Clicks'}
            </span>
            <span className="text-base sm:text-xl font-black font-mono text-white">
              {activeChannel?.clicks.toLocaleString() || grandTotal.toLocaleString()}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-cyan-200 bg-cyan-500/15 border border-cyan-400/35 px-2 py-0.5 rounded-full mt-0.5">
              {activeChannel ? `${activeChannel.percent}%` : '100%'}
            </span>
          </div>
        </div>

        {/* Channel Breakdown List (2-col grid on mobile to stay compact, 1-col on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 mt-1">
          {channelData.map((ch) => {
            const isHovered = hoverKey === ch.key;

            return (
              <div
                key={ch.key}
                onMouseEnter={() => setHoverKey(ch.key)}
                onMouseLeave={() => setHoverKey(null)}
                className={`p-2 rounded-lg transition cursor-pointer ${
                  isHovered
                    ? 'bg-cyan-500/15 border border-cyan-400/40'
                    : 'bg-[#040c1f]/60 border border-transparent hover:border-cyan-500/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs sm:text-[13px] mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ch.color, boxShadow: `0 0 8px ${ch.color}` }}
                    />
                    <span className="font-semibold text-slate-100">{ch.label}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-white">{ch.clicks.toLocaleString()}</span>
                    <span className="text-[11px] font-semibold text-cyan-200 w-11 text-right">
                      {ch.percent}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-[#030816] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: ch.clicks > 0 ? `${Math.max(ch.percent, 1)}%` : '0%',
                      backgroundColor: ch.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-2.5 border-t border-cyan-500/20 text-center text-xs font-mono text-slate-300 mt-3">
        Tổng: <strong className="text-cyan-300">{grandTotal.toLocaleString()} clicks</strong> trong chu kỳ
      </div>
    </div>
  );
}
