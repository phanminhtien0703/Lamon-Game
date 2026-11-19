'use client';

import React, { useState, useMemo } from 'react';
import {
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  BarChart2,
  Layers,
} from 'lucide-react';
import { GroupedTrackingItem, ChannelKey, CHANNELS } from '../types';

interface AnalyticsChartsProps {
  items: GroupedTrackingItem[];
  grandTotal: number;
  granularityLabel: string;
}

export default function AnalyticsCharts({ items, grandTotal, granularityLabel }: AnalyticsChartsProps) {
  // Chart visual modes
  const [chartType, setChartType] = useState<'LINE' | 'DONUT' | 'STACKED_BAR'>('LINE');

  // Active channel toggles for Line Chart
  const [activeChannels, setActiveChannels] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = { total: true };
    CHANNELS.forEach((c) => {
      initial[c.key] = true;
    });
    return initial;
  });

  // Hover state for interactive tooltips
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverDonutKey, setHoverDonutKey] = useState<string | null>(null);

  // Toggle single channel
  const toggleChannel = (key: string) => {
    setActiveChannels((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Toggle all channels
  const toggleAll = (enable: boolean) => {
    const updated: Record<string, boolean> = { total: enable };
    CHANNELS.forEach((c) => {
      updated[c.key] = enable;
    });
    setActiveChannels(updated);
  };

  // Channel summary for Donut / Pie Chart
  const channelTotals = useMemo(() => {
    const sums = {} as Record<ChannelKey, number>;
    CHANNELS.forEach((ch) => {
      sums[ch.key] = 0;
    });

    items.forEach((item) => {
      CHANNELS.forEach((ch) => {
        sums[ch.key] += item[ch.key] ?? 0;
      });
    });

    const effectiveTotal = grandTotal || 1;

    return CHANNELS.map((ch) => {
      const clicks = sums[ch.key];
      const percent = Math.round((clicks / effectiveTotal) * 1000) / 10;
      return {
        ...ch,
        clicks,
        percent,
      };
    }).sort((a, b) => b.clicks - a.clicks);
  }, [items, grandTotal]);

  // Max value calculation for Line Chart scaling
  const { maxVal, chartDataPoints } = useMemo(() => {
    const pts = [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    let highest = 0;
    pts.forEach((p) => {
      if (activeChannels.total && p.total > highest) highest = p.total;
      CHANNELS.forEach((c) => {
        if (activeChannels[c.key]) {
          const val = p[c.key as ChannelKey];
          if (val > highest) highest = val;
        }
      });
    });

    return { maxVal: Math.max(highest, 10), chartDataPoints: pts };
  }, [items, activeChannels]);

  // Donut chart path generation
  const donutPaths = useMemo(() => {
    const size = 260;
    const center = size / 2;
    const outerRadius = 110;
    const innerRadius = 70;
    const effectiveTotal = channelTotals.reduce((s, c) => s + c.clicks, 0) || 1;

    let currentAngle = -Math.PI / 2;

    return channelTotals.map((ch) => {
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
        sliceAngle,
      };
    });
  }, [channelTotals]);

  // SVG dimensions for Line Chart
  const svgWidth = 840;
  const svgHeight = 280;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 40;
  const plotWidth = svgWidth - paddingLeft - paddingRight;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  // Calculate coordinates for points in Line Chart
  const pointCoordinates = useMemo(() => {
    const n = chartDataPoints.length;
    if (n === 0) return [];

    return chartDataPoints.map((item, idx) => {
      const x = n === 1 ? paddingLeft + plotWidth / 2 : paddingLeft + (idx / (n - 1)) * plotWidth;
      const yTotal = paddingTop + plotHeight - (item.total / maxVal) * plotHeight;

      const channelY: Record<string, number> = {};
      CHANNELS.forEach((c) => {
        const val = item[c.key as ChannelKey];
        channelY[c.key] = paddingTop + plotHeight - (val / maxVal) * plotHeight;
      });

      return {
        item,
        x,
        yTotal,
        channelY,
      };
    });
  }, [chartDataPoints, maxVal, plotWidth, plotHeight]);

  // Generate SVG path for a channel
  const generateLinePath = (getY: (p: (typeof pointCoordinates)[0]) => number) => {
    if (pointCoordinates.length === 0) return '';
    return pointCoordinates.reduce((path, pt, idx) => {
      const y = getY(pt);
      return idx === 0 ? `M ${pt.x} ${y}` : `${path} L ${pt.x} ${y}`;
    }, '');
  };

  // Generate Area path
  const generateAreaPath = (getY: (p: (typeof pointCoordinates)[0]) => number) => {
    if (pointCoordinates.length === 0) return '';
    const linePath = generateLinePath(getY);
    const bottomY = paddingTop + plotHeight;
    const firstX = pointCoordinates[0].x;
    const lastX = pointCoordinates[pointCoordinates.length - 1].x;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  if (items.length === 0) {
    return (
      <div className="bg-white border border-slate-200/90 rounded-xl p-8 text-center text-slate-400">
        Không có dữ liệu trong khoảng thời gian này để vẽ biểu đồ.
      </div>
    );
  }

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-sm relative overflow-hidden">
      {/* Header & Chart mode selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-[#5969ff] border border-blue-100 shadow-xs">
            {chartType === 'LINE' && <LineChartIcon className="w-5 h-5" />}
            {chartType === 'DONUT' && <PieChartIcon className="w-5 h-5" />}
            {chartType === 'STACKED_BAR' && <BarChart2 className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                Biểu Đồ Xu Hướng & Cơ Cấu Traffic
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-semibold">
                {granularityLabel} ({items.length} chu kỳ)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              So sánh đa chiều xu hướng thời gian & cơ cấu tỷ trọng giữa các kênh
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (Concept Style) */}
        <div className="flex items-center gap-1 p-1 bg-[#f1f3f7] rounded-xl border border-slate-200/80 self-start lg:self-auto">
          <button
            onClick={() => setChartType('LINE')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              chartType === 'LINE'
                ? 'bg-[#5969ff] text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LineChartIcon className="w-3.5 h-3.5" />
            <span>Đường Xu Hướng</span>
          </button>

          <button
            onClick={() => setChartType('DONUT')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              chartType === 'DONUT'
                ? 'bg-[#5969ff] text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieChartIcon className="w-3.5 h-3.5" />
            <span>Tỷ Trọng (Pie)</span>
          </button>

          <button
            onClick={() => setChartType('STACKED_BAR')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              chartType === 'STACKED_BAR'
                ? 'bg-[#5969ff] text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cột Chồng (Bar)</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. MULTI-LINE / AREA CHART WITH CHANNEL TOGGLES */}
      {/* ============================================================== */}
      {chartType === 'LINE' && (
        <div className="mt-4 space-y-3.5">
          {/* Interactive Channel Filters */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-1">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Total Toggle */}
              <button
                onClick={() => toggleChannel('total')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  activeChannels.total
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-100 text-slate-400 border-slate-200 line-through opacity-60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Tổng Cộng</span>
              </button>

              {/* Channels Toggles */}
              {CHANNELS.map((ch) => {
                const isActive = activeChannels[ch.key];
                return (
                  <button
                    key={ch.key}
                    onClick={() => toggleChannel(ch.key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                      isActive
                        ? 'bg-white text-slate-800 border-slate-200 shadow-xs'
                        : 'bg-slate-100 text-slate-400 border-slate-200 line-through opacity-60'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isActive ? ch.color : '#94a3b8' }}
                    />
                    <span>{ch.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAll(true)}
                className="text-[11px] text-[#5969ff] hover:underline font-semibold transition cursor-pointer"
              >
                Bật tất cả
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => toggleAll(false)}
                className="text-[11px] text-slate-400 hover:text-slate-600 font-medium transition cursor-pointer"
              >
                Tắt tất cả
              </button>
            </div>
          </div>

          {/* SVG Line Chart Canvas */}
          <div className="relative w-full overflow-hidden select-none bg-[#f8fafc] rounded-xl border border-slate-200/80 p-2 sm:p-4">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-64 sm:h-72 overflow-visible"
              onMouseLeave={() => setHoverIndex(null)}
            >
              <defs>
                {/* Gradient for Total */}
                <linearGradient id="grad-total" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e293b" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#1e293b" stopOpacity="0.0" />
                </linearGradient>

                {/* Gradients for each channel */}
                {CHANNELS.map((ch) => (
                  <linearGradient key={ch.key} id={`grad-${ch.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ch.color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={ch.color} stopOpacity="0.0" />
                  </linearGradient>
                ))}
              </defs>

              {/* Horizontal Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                const y = paddingTop + plotHeight * (1 - pct);
                const valueLabel = Math.round(maxVal * pct);
                return (
                  <g key={idx}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={svgWidth - paddingRight}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={paddingLeft - 8}
                      y={y + 4}
                      textAnchor="end"
                      fill="#64748b"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {valueLabel}
                    </text>
                  </g>
                );
              })}

              {/* Area & Line for Channels */}
              {CHANNELS.map((ch) => {
                if (!activeChannels[ch.key]) return null;
                const pathD = generateLinePath((pt) => pt.channelY[ch.key]);
                const areaD = generateAreaPath((pt) => pt.channelY[ch.key]);

                return (
                  <g key={ch.key}>
                    <path d={areaD} fill={`url(#grad-${ch.key})`} />
                    <path
                      d={pathD}
                      fill="none"
                      stroke={ch.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                );
              })}

              {/* Area & Line for Total (dark bold line) */}
              {activeChannels.total && (
                <g>
                  <path d={generateAreaPath((pt) => pt.yTotal)} fill="url(#grad-total)" />
                  <path
                    d={generateLinePath((pt) => pt.yTotal)}
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              )}

              {/* Bottom X-Axis Date Labels */}
              {pointCoordinates.map((pt, idx) => {
                const totalPoints = pointCoordinates.length;
                const step = totalPoints > 15 ? Math.ceil(totalPoints / 8) : 1;
                const showLabel = idx === 0 || idx === totalPoints - 1 || idx % step === 0;
                if (!showLabel) return null;

                const shortLabel = pt.item.label.includes('Tuần')
                  ? pt.item.label.split(' ')[1]
                  : pt.item.label.includes('Tháng')
                  ? pt.item.label.replace('Tháng ', 'T')
                  : pt.item.label.split('/')[0] + '/' + pt.item.label.split('/')[1];

                return (
                  <text
                    key={idx}
                    x={pt.x}
                    y={svgHeight - 12}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {shortLabel}
                  </text>
                );
              })}

              {/* Vertical Crosshair Line & Points on Hover */}
              {hoverIndex !== null && pointCoordinates[hoverIndex] && (
                <g>
                  <line
                    x1={pointCoordinates[hoverIndex].x}
                    y1={paddingTop}
                    x2={pointCoordinates[hoverIndex].x}
                    y2={paddingTop + plotHeight}
                    stroke="#5969ff"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />

                  {/* Circle on Total */}
                  {activeChannels.total && (
                    <circle
                      cx={pointCoordinates[hoverIndex].x}
                      cy={pointCoordinates[hoverIndex].yTotal}
                      r="4.5"
                      fill="#0f172a"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  )}

                  {/* Circles on Channels */}
                  {CHANNELS.map((ch) => {
                    if (!activeChannels[ch.key]) return null;
                    return (
                      <circle
                        key={ch.key}
                        cx={pointCoordinates[hoverIndex].x}
                        cy={pointCoordinates[hoverIndex].channelY[ch.key]}
                        r="3.5"
                        fill={ch.color}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    );
                  })}
                </g>
              )}

              {/* Transparent hit boxes for mouse movement */}
              {pointCoordinates.map((pt, idx) => {
                const width = plotWidth / pointCoordinates.length;
                const xStart = pt.x - width / 2;
                return (
                  <rect
                    key={idx}
                    x={Math.max(xStart, paddingLeft)}
                    y={paddingTop}
                    width={width}
                    height={plotHeight}
                    fill="transparent"
                    className="cursor-crosshair"
                    onMouseEnter={() => setHoverIndex(idx)}
                  />
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoverIndex !== null && pointCoordinates[hoverIndex] && (
              <div
                style={{
                  left: `${Math.min(
                    Math.max(
                      (pointCoordinates[hoverIndex].x / svgWidth) * 100,
                      15
                    ),
                    82
                  )}%`,
                  top: '12px',
                }}
                className="absolute pointer-events-none -translate-x-1/2 z-20 bg-slate-900 text-white rounded-xl p-3 shadow-2xl border border-slate-700/80 text-xs w-56"
              >
                <div className="border-b border-slate-700 pb-1.5 mb-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">
                      {pointCoordinates[hoverIndex].item.label}
                    </span>
                    {pointCoordinates[hoverIndex].item.subLabel && (
                      <span className="text-[10px] text-slate-400">
                        {pointCoordinates[hoverIndex].item.subLabel}
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-black text-cyan-400 text-sm">
                    {pointCoordinates[hoverIndex].item.total.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-1">
                  {CHANNELS.map((ch) => {
                    if (!activeChannels[ch.key]) return null;
                    const val = pointCoordinates[hoverIndex].item[ch.key as ChannelKey];
                    const pct = Math.round(
                      (val / (pointCoordinates[hoverIndex].item.total || 1)) * 100
                    );
                    return (
                      <div key={ch.key} className="flex items-center justify-between font-mono text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: ch.color }}
                          />
                          <span className="text-slate-300">{ch.label}:</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{val}</span>
                          <span className="text-slate-400 text-[10px]">({pct}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. PIE / DONUT CHART WITH CHANNEL CONTRIBUTION % */}
      {/* ============================================================== */}
      {chartType === 'DONUT' && (
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* SVG Donut */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <svg
              viewBox="0 0 260 260"
              className="w-56 h-56 sm:w-64 sm:h-64 overflow-visible filter drop-shadow-md"
            >
              {donutPaths.map((slice) => {
                const isHovered = hoverDonutKey === slice.key;
                return (
                  <path
                    key={slice.key}
                    d={slice.pathData}
                    fill={slice.color}
                    className="transition-all duration-300 cursor-pointer"
                    style={{
                      opacity: hoverDonutKey ? (isHovered ? 1 : 0.45) : 0.9,
                      transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                      transformOrigin: '130px 130px',
                    }}
                    onMouseEnter={() => setHoverDonutKey(slice.key)}
                    onMouseLeave={() => setHoverDonutKey(null)}
                  />
                );
              })}

              {/* Donut Center Display */}
              <circle cx="130" cy="130" r="66" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <text
                x="130"
                y="120"
                textAnchor="middle"
                fill="#64748b"
                fontSize="11"
                fontWeight="600"
              >
                {hoverDonutKey
                  ? CHANNELS.find((c) => c.key === hoverDonutKey)?.label
                  : 'Tổng Lượt Click'}
              </text>
              <text
                x="130"
                y="146"
                textAnchor="middle"
                fill="#0f172a"
                fontSize="20"
                fontWeight="800"
                fontFamily="monospace"
              >
                {hoverDonutKey
                  ? channelTotals.find((c) => c.key === hoverDonutKey)?.clicks.toLocaleString()
                  : grandTotal.toLocaleString()}
              </text>
              <text
                x="130"
                y="166"
                textAnchor="middle"
                fill="#5969ff"
                fontSize="10"
                fontWeight="700"
                fontFamily="monospace"
              >
                {hoverDonutKey
                  ? `${channelTotals.find((c) => c.key === hoverDonutKey)?.percent}% thị phần`
                  : '100% tỷ trọng'}
              </text>
            </svg>
          </div>

          {/* Channel Contribution Breakdown List */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-200">
              <span className="font-semibold uppercase tracking-wider">Cơ cấu đóng góp của từng kênh</span>
              <span className="font-mono">Chu kỳ hiện tại</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {channelTotals.map((ch) => {
                const isHovered = hoverDonutKey === ch.key;
                return (
                  <div
                    key={ch.key}
                    onMouseEnter={() => setHoverDonutKey(ch.key)}
                    onMouseLeave={() => setHoverDonutKey(null)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      isHovered
                        ? 'bg-blue-50/50 border-[#5969ff]/50 shadow-md scale-[1.02]'
                        : 'bg-[#f8fafc] border-slate-200/80 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-md flex-shrink-0"
                          style={{ backgroundColor: ch.color }}
                        />
                        <span className="text-xs font-bold text-slate-800">{ch.label}</span>
                      </div>
                      <span className="font-mono font-bold text-xs text-[#5969ff]">
                        {ch.percent}%
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {/* Mini progress bar */}
                      <div className="w-2/3 h-1.5 bg-slate-200 rounded-full overflow-hidden mr-3">
                        <div
                          style={{
                            width: `${Math.min(ch.percent, 100)}%`,
                            backgroundColor: ch.color,
                          }}
                          className="h-full rounded-full transition-all duration-300"
                        />
                      </div>
                      <span className="font-mono text-xs text-slate-700 font-bold">
                        {ch.clicks.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. STACKED BAR CHART OVER TIME PERIODS */}
      {/* ============================================================== */}
      {chartType === 'STACKED_BAR' && (
        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <span>Cơ cấu các nguồn traffic xếp chồng theo từng chu kỳ</span>
            <div className="flex items-center gap-2">
              {CHANNELS.map((ch) => (
                <div key={ch.key} className="hidden sm:flex items-center gap-1 text-[11px]">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.color }} />
                  <span>{ch.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="h-64 sm:h-72 flex items-end gap-1.5 sm:gap-2 pt-8 pb-3 px-2 border-b border-slate-200 overflow-x-auto bg-[#f8fafc] rounded-xl p-3">
            {chartDataPoints.map((item) => {
              const maxItemTotal = Math.max(...chartDataPoints.map((i) => i.total), 1);
              const barHeightPct = Math.max((item.total / maxItemTotal) * 100, 8);
              const itemTotal = item.total || 1;

              return (
                <div
                  key={item.key}
                  className="flex-1 min-w-[32px] max-w-[60px] h-full flex flex-col justify-end items-center group relative cursor-pointer"
                >
                  {/* Tooltip Hover */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none whitespace-nowrap">
                    <div className="bg-slate-900 text-white border border-slate-700 rounded-xl p-2.5 shadow-xl text-[11px]">
                      <span className="font-bold text-white block border-b border-slate-700 pb-1 mb-1">
                        {item.label}
                      </span>
                      <span className="text-cyan-400 font-extrabold text-xs block mb-1">
                        {item.total.toLocaleString()} Clicks
                      </span>
                      <div className="space-y-0.5 text-slate-300 font-mono text-[10px]">
                        {CHANNELS.map((ch) => {
                          const val = item[ch.key as ChannelKey];
                          const pct = Math.round((val / itemTotal) * 100);
                          return (
                            <div key={ch.key} className="flex justify-between gap-3">
                              <span style={{ color: ch.color }}>{ch.label}:</span>
                              <span className="text-white font-semibold">
                                {val} ({pct}%)
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 border-r border-b border-slate-700" />
                  </div>

                  {/* Value on Top */}
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-[#5969ff] group-hover:font-bold mb-1 transition">
                    {item.total}
                  </span>

                  {/* Stacked Segments Column */}
                  <div
                    style={{ height: `${barHeightPct}%` }}
                    className="w-full rounded-t-md overflow-hidden flex flex-col-reverse shadow-xs transition-all duration-300 group-hover:brightness-95"
                  >
                    {CHANNELS.map((ch) => {
                      const val = item[ch.key as ChannelKey];
                      const segmentPct = (val / itemTotal) * 100;
                      if (val === 0) return null;
                      return (
                        <div
                          key={ch.key}
                          style={{
                            height: `${segmentPct}%`,
                            backgroundColor: ch.color,
                          }}
                          className="w-full opacity-90 hover:opacity-100 transition"
                        />
                      );
                    })}
                  </div>

                  {/* Period label */}
                  <span className="text-[10px] text-slate-500 mt-2 rotate-[-45px] sm:rotate-0 font-mono group-hover:text-slate-900 transition truncate max-w-full">
                    {item.label.includes('Tuần')
                      ? 'W' + item.label.split(' ')[1]
                      : item.label.includes('Tháng')
                      ? item.label.replace('Tháng ', '')
                      : item.label.split('/')[0] + '/' + item.label.split('/')[1]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
