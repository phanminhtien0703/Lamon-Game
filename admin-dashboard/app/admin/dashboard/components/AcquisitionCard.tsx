'use client';

import React, { useMemo, useState } from 'react';
import { PieChart as PieChartIcon, Flame, ExternalLink } from 'lucide-react';
import { CHANNELS, ChannelKey, GroupedTrackingItem } from '../types';

interface AcquisitionCardProps {
  items: GroupedTrackingItem[];
  grandTotal: number;
}

export default function AcquisitionCard({ items, grandTotal }: AcquisitionCardProps) {
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  // Calculate channel totals
  const channelData = useMemo(() => {
    const sums: Record<ChannelKey, number> = {
      direct: 0,
      facebook: 0,
      google: 0,
      kenhGameZ: 0,
      other: 0,
      webGameLau: 0,
      youtube: 0,
      zalo: 0,
    };

    items.forEach((item) => {
      sums.direct += item.direct;
      sums.facebook += item.facebook;
      sums.google += item.google;
      sums.kenhGameZ += item.kenhGameZ;
      sums.other += item.other;
      sums.webGameLau += item.webGameLau;
      sums.youtube += item.youtube;
      sums.zalo += item.zalo;
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

  // Donut chart path generation
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
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">
              Customer Acquisition
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cơ cấu đóng góp giữa các nguồn traffic
            </p>
          </div>
          <div className="p-2 rounded-lg bg-blue-50 text-[#5969ff]">
            <PieChartIcon className="w-4 h-4" />
          </div>
        </div>

        {/* Donut Chart Visual & Active Highlight */}
        <div className="flex items-center justify-center my-4 relative">
          <svg width={180} height={180} className="overflow-visible">
            {donutPaths.map((slice) => {
              if (!slice.pathData) return null;
              const isHovered = hoverKey === slice.key;

              return (
                <path
                  key={slice.key}
                  d={slice.pathData}
                  fill={slice.color}
                  opacity={hoverKey ? (isHovered ? 1 : 0.4) : 0.9}
                  stroke="#ffffff"
                  strokeWidth={2}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoverKey(slice.key)}
                  onMouseLeave={() => setHoverKey(null)}
                />
              );
            })}
          </svg>

          {/* Center Text in Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {activeChannel?.label || 'Tổng Clicks'}
            </span>
            <span className="text-lg font-extrabold text-slate-800">
              {activeChannel?.clicks.toLocaleString() || grandTotal.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-[#5969ff] bg-blue-50 px-1.5 py-0.2 rounded-full">
              {activeChannel ? `${activeChannel.percent}%` : '100%'}
            </span>
          </div>
        </div>

        {/* Channel Breakdown List with Progress Bars */}
        <div className="space-y-2.5 mt-2">
          {channelData.map((ch) => {
            const isHovered = hoverKey === ch.key;

            return (
              <div
                key={ch.key}
                onMouseEnter={() => setHoverKey(ch.key)}
                onMouseLeave={() => setHoverKey(null)}
                className={`p-2 rounded-lg transition cursor-pointer ${
                  isHovered ? 'bg-slate-50 ring-1 ring-slate-200' : 'hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ch.color }}
                    />
                    <span className="font-semibold text-slate-700">{ch.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      {ch.clicks.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 w-11 text-right">
                      {ch.percent}%
                    </span>
                  </div>
                </div>

                {/* Mini Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
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

      {/* Footer Meta */}
      <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-400 mt-3">
        Tổng cộng <strong className="text-slate-700">{grandTotal.toLocaleString()} clicks</strong> trong chu kỳ được chọn
      </div>
    </div>
  );
}
