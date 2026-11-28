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
  { stroke: string; stopColor: string; glow: string }
> = {
  blue: {
    stroke: '#38bdf8',
    stopColor: '#38bdf8',
    glow: 'drop-shadow(0 0 6px rgba(56,189,248,0.65))',
  },
  pink: {
    stroke: '#f472b6',
    stopColor: '#f472b6',
    glow: 'drop-shadow(0 0 6px rgba(244,114,182,0.65))',
  },
  cyan: {
    stroke: '#22d3ee',
    stopColor: '#22d3ee',
    glow: 'drop-shadow(0 0 6px rgba(34,211,238,0.65))',
  },
  amber: {
    stroke: '#fbbf24',
    stopColor: '#fbbf24',
    glow: 'drop-shadow(0 0 6px rgba(251,191,36,0.65))',
  },
  emerald: {
    stroke: '#34d399',
    stopColor: '#34d399',
    glow: 'drop-shadow(0 0 6px rgba(52,211,153,0.65))',
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
  const rawId = useId();
  const gradientId = useMemo(() => 'spark_' + rawId.replace(/[^a-zA-Z0-9_-]/g, '_'), [rawId]);
  const config = THEME_CONFIG[theme] || THEME_CONFIG.blue;

  const { linePath, areaPath } = useMemo(() => {
    const width = 320;
    const height = 75;
    const padTop = 10;
    const padBottom = 2;
    const effHeight = height - padTop - padBottom;

    const pts =
      dataPoints && dataPoints.length >= 3
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
    <div className="hud-panel hud-corners rounded-xl transition-all duration-200 overflow-hidden flex flex-col justify-between relative group">
      <div className="p-2.5 sm:p-4 pb-1 sm:pb-2">
        <div className="flex items-center justify-between gap-1 mb-1 sm:mb-2">
          <span className="text-[11px] sm:text-[13px] font-mono font-bold text-cyan-200 uppercase tracking-wider truncate">
            {title}
          </span>

          {delta && (
            <div
              className={`inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0 ${
                delta.isPositive
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/35'
                  : 'bg-rose-500/15 text-rose-300 border border-rose-400/35'
              }`}
            >
              {delta.isPositive ? (
                <ArrowUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
              ) : (
                <ArrowDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
              )}
              <span>{delta.value}</span>
            </div>
          )}

          {badgeText && !delta && (
            <span
              className={`text-[10px] sm:text-xs font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0 ${
                badgeType === 'warning'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-400/35'
                  : badgeType === 'info'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/35'
                  : badgeType === 'danger'
                  ? 'bg-rose-500/15 text-rose-300 border border-rose-400/35'
                  : 'bg-slate-500/20 text-slate-200 border border-slate-400/30'
              }`}
            >
              {badgeText}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1 sm:gap-2 mt-0.5 sm:mt-1">
          <span className="text-xl sm:text-3xl font-black font-mono text-white tracking-tight tabular-nums">
            {value}
          </span>
          {subValue && (
            <span className="text-[11px] sm:text-sm font-mono font-semibold text-cyan-200 truncate">
              {subValue}
            </span>
          )}
        </div>

        {subtext && (
          <div className="text-[10.5px] sm:text-xs text-slate-300 mt-1 sm:mt-1.5 truncate">{subtext}</div>
        )}
      </div>

      <div className="w-full h-7 sm:h-14 relative mt-0.5 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 320 75" preserveAspectRatio="none" className="w-full h-full block">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={config.stopColor} stopOpacity="0.36" />
              <stop offset="85%" stopColor={config.stopColor} stopOpacity="0.06" />
              <stop offset="100%" stopColor={config.stopColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill={`url(#${gradientId})`} />

          <path
            d={linePath}
            fill="none"
            stroke={config.stroke}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: config.glow }}
          />
        </svg>
      </div>
    </div>
  );
}
