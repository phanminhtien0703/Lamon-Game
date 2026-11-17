'use client';

import React, { useId, useMemo } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export type SparklineTheme = 'blue' | 'pink' | 'cyan' | 'amber' | 'emerald';

interface SparklineCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  delta?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  badgeText?: string;
  badgeType?: 'success' | 'danger' | 'info' | 'warning' | 'neutral';
  subtext?: React.ReactNode;
  theme?: SparklineTheme;
  dataPoints?: number[];
}

const THEME_CONFIG: Record<
  SparklineTheme,
  { stroke: string; stopColor: string; badgeBg: string; badgeText: string; lightBg: string }
> = {
  blue: {
    stroke: '#5969ff',
    stopColor: '#5969ff',
    badgeBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    badgeText: 'text-emerald-600',
    lightBg: 'bg-blue-50/50',
  },
  pink: {
    stroke: '#ff407b',
    stopColor: '#ff407b',
    badgeBg: 'bg-pink-50 text-pink-600 border border-pink-200',
    badgeText: 'text-pink-600',
    lightBg: 'bg-pink-50/50',
  },
  cyan: {
    stroke: '#25d5f2',
    stopColor: '#25d5f2',
    badgeBg: 'bg-cyan-50 text-cyan-600 border border-cyan-200',
    badgeText: 'text-cyan-600',
    lightBg: 'bg-cyan-50/50',
  },
  amber: {
    stroke: '#ffc107',
    stopColor: '#ffc107',
    badgeBg: 'bg-amber-50 text-amber-600 border border-amber-200',
    badgeText: 'text-amber-600',
    lightBg: 'bg-amber-50/50',
  },
  emerald: {
    stroke: '#2ec4b6',
    stopColor: '#2ec4b6',
    badgeBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    badgeText: 'text-emerald-600',
    lightBg: 'bg-emerald-50/50',
  },
};

export default function SparklineCard({
  title,
  value,
  subValue,
  delta,
  badgeText,
  badgeType = 'success',
  subtext,
  theme = 'blue',
  dataPoints = [],
}: SparklineCardProps) {
  const gradientId = useId();
  const config = THEME_CONFIG[theme] || THEME_CONFIG.blue;

  // Generate smooth SVG wave
  const { linePath, areaPath } = useMemo(() => {
    const width = 320;
    const height = 75;
    const padTop = 10;
    const padBottom = 2;
    const effHeight = height - padTop - padBottom;

    // Fallback wave if insufficient points
    let pts = dataPoints && dataPoints.length >= 3
      ? [...dataPoints]
      : theme === 'blue'
      ? [15, 28, 22, 35, 26, 45, 38, 55, 48, 65]
      : theme === 'pink'
      ? [45, 38, 52, 42, 60, 48, 65, 50, 72, 60]
      : theme === 'cyan'
      ? [20, 25, 38, 30, 48, 42, 60, 52, 68, 75]
      : [30, 45, 35, 55, 48, 62, 58, 70, 64, 80];

    const min = Math.min(...pts);
    const max = Math.max(...pts);
    const range = max === min ? 1 : max - min;

    const coords = pts.map((val, idx) => {
      const x = (idx / (pts.length - 1)) * width;
      const y = padTop + effHeight - ((val - min) / range) * effHeight;
      return { x, y };
    });

    if (coords.length === 0) return { linePath: '', areaPath: '' };

    // Cubic bezier smoothing
    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i];
      const p1 = coords[i + 1];
      const pPrev = coords[i - 1] || p0;
      const pNext = coords[i + 2] || p1;

      const cp1x = p0.x + (p1.x - pPrev.x) / 4;
      const cp1y = p0.y + (p1.y - pPrev.y) / 4;
      const cp2x = p1.x - (pNext.x - p0.x) / 4;
      const cp2y = p1.y - (pNext.y - p0.y) / 4;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }

    const area = `${d} L ${width} ${height} L 0 ${height} Z`;
    return { linePath: d, areaPath: area };
  }, [dataPoints, theme]);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between relative group">
      {/* Top Section: Title & Badge */}
      <div className="p-5 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </span>

          {delta && (
            <div
              className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                delta.isPositive
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/80'
                  : 'bg-rose-50 text-rose-600 border border-rose-200/80'
              }`}
            >
              {delta.isPositive ? (
                <ArrowUp className="w-3 h-3 stroke-[2.5]" />
              ) : (
                <ArrowDown className="w-3 h-3 stroke-[2.5]" />
              )}
              <span>{delta.value}</span>
            </div>
          )}

          {badgeText && !delta && (
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                badgeType === 'warning'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : badgeType === 'info'
                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                  : badgeType === 'danger'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {badgeText}
            </span>
          )}
        </div>

        {/* Big Metric Number */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-extrabold text-slate-800 tracking-tight font-sans">
            {value}
          </span>
          {subValue && (
            <span className="text-sm font-semibold text-slate-500">
              {subValue}
            </span>
          )}
        </div>

        {/* Subtext description */}
        {subtext && (
          <div className="text-xs text-slate-400 mt-1.5 truncate">
            {subtext}
          </div>
        )}
      </div>

      {/* Bottom Section: Sparkline Wave SVG (Concept Template Style) */}
      <div className="w-full h-16 relative mt-1 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 320 75"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={config.stopColor} stopOpacity="0.32" />
              <stop offset="85%" stopColor={config.stopColor} stopOpacity="0.04" />
              <stop offset="100%" stopColor={config.stopColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path d={areaPath} fill={`url(#${gradientId})`} />

          {/* Stroke Line */}
          <path
            d={linePath}
            fill="none"
            stroke={config.stroke}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
