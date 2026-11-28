'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Percent,
  Copy,
  Check,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import {
  CHANNELS,
  ChannelKey,
  GroupedTrackingItem,
  AggregatedTotals,
  SortField,
  SortDirection,
  Granularity,
} from '../types';

interface TrafficTableProps {
  items: GroupedTrackingItem[];
  totals: AggregatedTotals;
  loading: boolean;
  granularity: Granularity;
  granularityLabel: string;
  showPercentShare: boolean;
  setShowPercentShare: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  compareEnabled: boolean;
  onCopyClipboard: () => void;
  copiedSuccess: boolean;
  onExportCSV: () => void;
  lastUpdated?: string;
}

export default function TrafficTable({
  items,
  totals,
  loading,
  granularity,
  showPercentShare,
  setShowPercentShare,
  searchQuery,
  sortField,
  sortDirection,
  onSort,
  compareEnabled,
  onCopyClipboard,
  copiedSuccess,
  onExportCSV,
}: TrafficTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileShowAll, setMobileShowAll] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    setCurrentPage(1);
    setMobileShowAll(false);
  }, [items.length, searchQuery, granularity]);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, items.length);

  const currentDisplayRows = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  const paginationRange = useMemo(() => {
    const delta = 1;
    const range: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift('...');
    if (currentPage + delta < totalPages - 1) range.push('...');

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  }, [currentPage, totalPages]);

  return (
    <div className="hud-panel hud-corners rounded-xl overflow-hidden flex flex-col justify-between">
      {/* Header Toolbar */}
      <div className="p-3.5 sm:p-5 border-b border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm sm:text-[15px] font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
            <span>Ma Trận Dữ Liệu Chi Tiết</span>
            <span className="text-[11px] sm:text-xs font-mono font-bold text-cyan-200 bg-cyan-500/15 px-2 py-0.5 rounded-full border border-cyan-400/35">
              {items.length} chu kỳ
            </span>
          </h3>
          <p className="text-xs text-slate-300 mt-0.5 line-clamp-1 sm:line-clamp-none">
            Phân bổ lượt click theo từng chu kỳ và kênh tiếp thị (10 dòng/trang)
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => setShowPercentShare(!showPercentShare)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
              showPercentShare
                ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.2)] font-bold'
                : 'bg-[#040c1f]/90 text-slate-200 border-cyan-500/25 hover:border-cyan-400/50 hover:text-white'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>{showPercentShare ? '% Tỷ Trọng: BẬT' : 'Hiện % Tỷ Trọng'}</span>
          </button>

          <button
            onClick={onCopyClipboard}
            title="Sao chép bảng để dán vào Excel / Google Sheets"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#040c1f]/90 hover:bg-cyan-500/10 border border-cyan-500/25 hover:border-cyan-400/50 text-xs font-semibold text-slate-200 hover:text-white transition cursor-pointer"
          >
            {copiedSuccess ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedSuccess ? 'Đã chép' : 'Sao chép'}</span>
          </button>

          <button
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black shadow-[0_0_16px_rgba(34,211,238,0.35)] transition cursor-pointer active:scale-95"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* Mobile Compact Card List (md:hidden — short, scannable, zero horizontal scroll) */}
      <div className="block md:hidden divide-y divide-cyan-500/15">
        {loading && (
          <div className="py-8 text-center text-slate-300 text-xs font-mono">
            Đang đồng bộ số liệu Google Sheets...
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="py-8 text-center text-slate-300 text-xs">
            Không tìm thấy dữ liệu nào khớp với bộ lọc hiện tại.
          </div>
        )}

        {!loading &&
          (mobileShowAll ? currentDisplayRows : currentDisplayRows.slice(0, 5)).map((row) => {
            const rowTotal = row.total || 1;
            const activeChannels = CHANNELS.map((ch) => ({
              ...ch,
              val: row[ch.key as ChannelKey] || 0,
            }))
              .filter((c) => c.val > 0)
              .sort((a, b) => b.val - a.val);

            return (
              <div key={`m-${row.key}`} className="p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="font-bold text-white text-xs block truncate">{row.label}</span>
                      {row.subLabel && (
                        <span className="text-[10px] text-slate-400 block">{row.subLabel}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 font-mono">
                    <span className="text-sm font-black text-cyan-300">
                      {row.total.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-300 ml-1">clicks</span>
                  </div>
                </div>

                {activeChannels.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {activeChannels.map((ch) => (
                      <span
                        key={ch.key}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#040c1f]/90 border border-cyan-500/20 text-[11px] font-mono"
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: ch.color }}
                        />
                        <span className="text-slate-300 font-sans">{ch.label}:</span>
                        <strong className="text-white">{ch.val}</strong>
                        {showPercentShare && (
                          <span className="text-cyan-300 text-[10px]">
                            ({Math.round((ch.val / rowTotal) * 100)}%)
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

        {!loading && currentDisplayRows.length > 5 && (
          <div className="p-2.5 text-center bg-[#040c1f]/60">
            <button
              type="button"
              onClick={() => setMobileShowAll((prev) => !prev)}
              className="w-full py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-bold cursor-pointer"
            >
              {mobileShowAll
                ? 'Thu gọn bớt (5 dòng)'
                : `Xem thêm ${currentDisplayRows.length - 5} dòng trong trang này`}
            </button>
          </div>
        )}
      </div>

      {/* Desktop Table Container (hidden on mobile, 100% preserved on md+) */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="border-b border-cyan-500/25 bg-[#040c1f]/90 text-[11px] sm:text-xs font-mono font-bold text-cyan-200 uppercase tracking-tight select-none">
              <th
                onClick={() => onSort('period')}
                className="py-3 pl-3.5 pr-2 text-left whitespace-nowrap cursor-pointer hover:text-white transition group select-none"
              >
                <div className="flex items-center gap-1">
                  <span>
                    {granularity === 'DAILY'
                      ? 'NGÀY'
                      : granularity === 'WEEKLY'
                      ? 'TUẦN'
                      : 'THÁNG'}
                  </span>
                  {sortField === 'period' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp className="w-3 h-3 text-cyan-400" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-cyan-400" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400 group-hover:text-cyan-300" />
                  )}
                </div>
              </th>

              {CHANNELS.map((ch) => {
                const isSorted = sortField === ch.key;
                return (
                  <th
                    key={ch.key}
                    onClick={() => onSort(ch.key as SortField)}
                    className="py-3 px-2 text-center whitespace-nowrap cursor-pointer hover:text-white transition group select-none"
                  >
                    <div className="flex items-center justify-center gap-0.5">
                      <span style={{ color: isSorted ? ch.color : undefined }}>{ch.label}</span>
                      {isSorted ? (
                        sortDirection === 'asc' ? (
                          <ArrowUp className="w-2.5 h-2.5 text-cyan-400" />
                        ) : (
                          <ArrowDown className="w-2.5 h-2.5 text-cyan-400" />
                        )
                      ) : (
                        <ArrowUpDown className="w-2.5 h-2.5 text-slate-500 group-hover:text-cyan-300" />
                      )}
                    </div>
                  </th>
                );
              })}

              <th
                onClick={() => onSort('total')}
                className="py-3 pr-3.5 pl-2 text-right whitespace-nowrap font-bold text-cyan-200 bg-cyan-500/10 cursor-pointer hover:text-white transition group select-none"
              >
                <div className="flex items-center justify-end gap-0.5">
                  <span>Tổng cộng</span>
                  {sortField === 'total' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp className="w-3 h-3 text-cyan-300" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-cyan-300" />
                    )
                  ) : (
                    <ArrowUpDown className="w-2.5 h-2.5 text-cyan-300/70 group-hover:text-cyan-200" />
                  )}
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-cyan-500/10 text-xs sm:text-[13px] font-sans">
            {loading && (
              <tr>
                <td colSpan={11} className="py-12 text-center text-slate-300">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-mono">Đang đồng bộ số liệu Google Sheets...</span>
                  </div>
                </td>
              </tr>
            )}

            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={11} className="py-12 text-center text-slate-300 text-xs sm:text-sm">
                  Không tìm thấy dữ liệu nào khớp với bộ lọc hiện tại.
                </td>
              </tr>
            )}

            {!loading &&
              currentDisplayRows.map((row) => {
                const rowTotal = row.total || 1;

                return (
                  <tr key={row.key} className="hover:bg-cyan-500/10 transition duration-100 group">
                    <td className="py-2.5 pl-3.5 pr-2 font-medium text-slate-100 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400 opacity-80 group-hover:opacity-100 flex-shrink-0" />
                        <div className="leading-tight">
                          <span className="font-bold block text-white text-xs sm:text-[13px] leading-tight">
                            {row.label}
                          </span>
                          {row.subLabel && (
                            <span className="text-[10.5px] text-slate-300 block font-normal leading-none mt-1">
                              {row.subLabel}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {CHANNELS.map((ch) => {
                      const val = row[ch.key as ChannelKey];
                      const sharePct = Math.round((val / rowTotal) * 100);
                      const comp = row.comparison?.[ch.key as ChannelKey];

                      return (
                        <td
                          key={ch.key}
                          className="py-2.5 px-2 text-center font-mono whitespace-nowrap text-xs sm:text-[13px]"
                        >
                          <div className="flex flex-col items-center justify-center">
                            {val > 0 ? (
                              <span className="text-white font-bold">{val}</span>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}

                            {showPercentShare && val > 0 && (
                              <span className="text-[10px] text-cyan-300 font-sans leading-none mt-1">
                                {sharePct}%
                              </span>
                            )}

                            {compareEnabled && comp && comp.hasPrevious && (
                              <div
                                title={`Kỳ trước: ${comp.previous}`}
                                className={`text-[10px] font-semibold px-1 rounded font-sans leading-none mt-1 ${
                                  comp.diff > 0
                                    ? 'text-emerald-300 bg-emerald-500/15'
                                    : comp.diff < 0
                                    ? 'text-rose-300 bg-rose-500/15'
                                    : 'text-slate-300'
                                }`}
                              >
                                <span>{comp.diff > 0 ? `+${comp.diff}` : comp.diff}</span>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}

                    <td className="py-2.5 pr-3.5 pl-2 text-right font-mono font-bold text-cyan-200 bg-cyan-500/5 group-hover:bg-cyan-500/15 whitespace-nowrap transition">
                      <div className="flex flex-col items-end">
                        <span className="text-xs sm:text-[13px] font-black text-white">
                          {row.total.toLocaleString()}
                        </span>

                        {compareEnabled && row.comparison?.total && (
                          <div
                            title={`Kỳ trước: ${row.comparison.total.previous}`}
                            className={`text-[10px] font-semibold px-1 rounded font-sans leading-none mt-1 ${
                              row.comparison.total.isPositive
                                ? 'text-emerald-300 bg-emerald-500/15'
                                : 'text-rose-300 bg-rose-500/15'
                            }`}
                          >
                            <span>
                              {row.comparison.total.diff > 0 ? '+' : ''}
                              {row.comparison.total.diff}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>

          <tfoot>
            <tr className="border-t border-cyan-500/30 bg-[#040c1f]/95 font-bold text-xs uppercase text-slate-100">
              <td className="py-3 pl-3.5 pr-2 text-cyan-300 font-mono font-extrabold tracking-tight whitespace-nowrap text-xs">
                Tổng ({items.length})
              </td>

              {CHANNELS.map((ch) => {
                const totalClicks = totals[ch.key as ChannelKey];
                const comp = totals.comparison?.[ch.key as ChannelKey];

                return (
                  <td key={ch.key} className="py-3 px-2 text-center font-mono whitespace-nowrap text-xs sm:text-[13px]">
                    <div className="flex flex-col items-center">
                      <span className="font-extrabold text-white">{totalClicks.toLocaleString()}</span>

                      {compareEnabled && comp && (
                        <div
                          title={`Kỳ trước: ${comp.previous.toLocaleString()}`}
                          className={`text-[10px] font-semibold px-1 rounded font-sans leading-none mt-1 ${
                            comp.isPositive
                              ? 'text-emerald-300 bg-emerald-500/15'
                              : 'text-rose-300 bg-rose-500/15'
                          }`}
                        >
                          {comp.diff >= 0 ? `+${comp.diff.toLocaleString()}` : comp.diff.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}

              <td className="py-3 pr-3.5 pl-2 text-right font-mono font-black text-sm text-cyan-300 bg-cyan-500/15 whitespace-nowrap">
                <div className="flex flex-col items-end">
                  <span>{totals.grandTotal.toLocaleString()}</span>
                  {compareEnabled && totals.comparison && (
                    <div
                      className={`text-[10px] font-semibold font-sans leading-none mt-1 ${
                        totals.comparison.grandTotal.isPositive ? 'text-emerald-300' : 'text-rose-300'
                      }`}
                    >
                      {totals.comparison.grandTotal.diff >= 0 ? '+' : ''}
                      {totals.comparison.grandTotal.percent}%
                    </div>
                  )}
                </div>
              </td>
            </tr>

            <tr className="border-t border-cyan-500/15 bg-[#030816] text-[11px] font-semibold text-slate-300">
              <td className="py-2.5 pl-3.5 pr-2 font-mono font-bold uppercase tracking-tight text-cyan-200 whitespace-nowrap">
                % Tỷ Trọng
              </td>

              {CHANNELS.map((ch) => {
                const totalClicks = totals[ch.key as ChannelKey];
                const grand = totals.grandTotal || 1;
                const pct = Math.round((totalClicks / grand) * 1000) / 10;

                return (
                  <td key={ch.key} className="py-2.5 px-2 text-center font-mono whitespace-nowrap">
                    <span className="font-bold text-cyan-200 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/25 text-[10.5px]">
                      {pct}%
                    </span>
                  </td>
                );
              })}

              <td className="py-2.5 pr-3.5 pl-2 text-right font-mono font-bold text-white bg-cyan-500/10 whitespace-nowrap text-xs">
                100%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination Bar */}
      {!loading && items.length > 0 && (
        <div className="px-4 py-3.5 border-t border-cyan-500/20 bg-[#040c1f]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs select-none">
          <div className="text-slate-300 font-mono text-xs">
            Hiển thị <strong className="text-white">{startIndex + 1}</strong> –{' '}
            <strong className="text-white">{endIndex}</strong> /{' '}
            <strong className="text-cyan-300">{items.length}</strong> chu kỳ
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              title="Về trang đầu"
              className="p-1.5 rounded-lg border border-cyan-500/25 text-slate-400 hover:text-white hover:bg-cyan-500/10 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              title="Trang trước"
              className="p-1.5 rounded-lg border border-cyan-500/25 text-slate-400 hover:text-white hover:bg-cyan-500/10 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1 mx-1">
              {paginationRange.map((page, idx) => {
                if (page === '...') {
                  return (
                    <span key={`dots-${idx}`} className="px-2 py-1 text-slate-500 font-semibold">
                      ...
                    </span>
                  );
                }

                const pageNum = Number(page);
                const isActive = pageNum === currentPage;

                return (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`min-w-[28px] h-7 px-2 rounded-lg font-mono font-bold text-xs transition cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.45)] font-black'
                        : 'bg-[#06132b] hover:bg-cyan-500/15 text-slate-300 border border-cyan-500/25'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              title="Trang sau"
              className="p-1.5 rounded-lg border border-cyan-500/25 text-slate-400 hover:text-white hover:bg-cyan-500/10 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              title="Đến trang cuối"
              className="p-1.5 rounded-lg border border-cyan-500/25 text-slate-400 hover:text-white hover:bg-cyan-500/10 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
