'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Search,
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
  granularityLabel,
  showPercentShare,
  setShowPercentShare,
  searchQuery,
  setSearchQuery,
  sortField,
  sortDirection,
  onSort,
  compareEnabled,
  onCopyClipboard,
  copiedSuccess,
  onExportCSV,
  lastUpdated,
}: TrafficTableProps) {
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Reset to page 1 whenever items length, query or granularity changes
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length, searchQuery, granularity]);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, items.length);

  // 10 items for current page
  const currentDisplayRows = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  // Page numbers helper (e.g. 1 ... 4 5 6 ... 13)
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

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  }, [currentPage, totalPages]);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
      {/* Header Toolbar (Recent Orders style) */}
      <div className="p-4 sm:p-5 border-b border-slate-200/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 bg-white">
        <div>
          <h3 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span>Dữ Liệu Thống Kê Chi Tiết</span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              {items.length} chu kỳ
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Phân bổ lượt click theo từng chu kỳ và kênh tiếp thị (10 dòng/trang)
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle % Share */}
          <button
            onClick={() => setShowPercentShare(!showPercentShare)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
              showPercentShare
                ? 'bg-blue-50 text-[#5969ff] border-[#5969ff]/40 shadow-xs font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>{showPercentShare ? '% Tỷ Trọng: BẬT' : 'Hiện % Tỷ Trọng'}</span>
          </button>

          {/* Copy TSV */}
          <button
            onClick={onCopyClipboard}
            title="Sao chép bảng để dán vào Excel / Google Sheets"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            {copiedSuccess ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedSuccess ? 'Đã sao chép!' : 'Sao chép'}</span>
          </button>

          {/* Export CSV / Excel */}
          <button
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#5969ff] hover:bg-blue-600 text-white text-xs font-bold shadow-sm shadow-[#5969ff]/25 transition cursor-pointer active:scale-95"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* Table Container - Auto-fit without scrollbar */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-[#f8fafc] text-[10px] font-bold text-slate-500 uppercase tracking-tight select-none">
              {/* Period Column */}
              <th
                onClick={() => onSort('period')}
                className="py-2.5 pl-3 pr-1 text-left whitespace-nowrap cursor-pointer hover:text-slate-800 transition group select-none"
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
                      <ArrowUp className="w-2.5 h-2.5 text-[#5969ff]" />
                    ) : (
                      <ArrowDown className="w-2.5 h-2.5 text-[#5969ff]" />
                    )
                  ) : (
                    <ArrowUpDown className="w-2.5 h-2.5 text-slate-400 group-hover:text-slate-600" />
                  )}
                </div>
              </th>

              {/* Channels Columns */}
              {CHANNELS.map((ch) => {
                const isSorted = sortField === ch.key;
                return (
                  <th
                    key={ch.key}
                    onClick={() => onSort(ch.key as SortField)}
                    className="py-2.5 px-0.5 text-center whitespace-nowrap cursor-pointer hover:text-slate-800 transition group select-none text-[9.5px]"
                  >
                    <div className="flex items-center justify-center gap-0.5">
                      <span style={{ color: isSorted ? ch.color : undefined }}>
                        {ch.label}
                      </span>
                      {isSorted ? (
                        sortDirection === 'asc' ? (
                          <ArrowUp className="w-2 h-2 text-[#5969ff]" />
                        ) : (
                          <ArrowDown className="w-2 h-2 text-[#5969ff]" />
                        )
                      ) : (
                        <ArrowUpDown className="w-2 h-2 text-slate-300 group-hover:text-slate-500" />
                      )}
                    </div>
                  </th>
                );
              })}

              {/* Total Column */}
              <th
                onClick={() => onSort('total')}
                className="py-2.5 pr-3 pl-1 text-right whitespace-nowrap font-bold text-[#5969ff] bg-blue-50/50 cursor-pointer hover:brightness-95 transition group select-none text-[10px]"
              >
                <div className="flex items-center justify-end gap-0.5">
                  <span>Tổng cộng</span>
                  {sortField === 'total' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp className="w-2.5 h-2.5 text-[#5969ff]" />
                    ) : (
                      <ArrowDown className="w-2.5 h-2.5 text-[#5969ff]" />
                    )
                  ) : (
                    <ArrowUpDown className="w-2 h-2 text-[#5969ff] opacity-60 group-hover:opacity-100" />
                  )}
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-[11px] font-sans">
            {loading && (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#5969ff] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs">Đang đồng bộ số liệu Google Sheets...</span>
                  </div>
                </td>
              </tr>
            )}

            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-400 text-xs">
                  Không tìm thấy dữ liệu nào khớp với bộ lọc hiện tại.
                </td>
              </tr>
            )}

            {!loading &&
              currentDisplayRows.map((row) => {
                const rowTotal = row.total || 1;

                return (
                  <tr
                    key={row.key}
                    className="hover:bg-blue-50/30 transition duration-100 group"
                  >
                    {/* Period Label */}
                    <td className="py-2 pl-3 pr-1 font-medium text-slate-800 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#5969ff] opacity-75 group-hover:opacity-100 flex-shrink-0" />
                        <div className="leading-tight">
                          <span className="font-semibold block text-slate-800 text-[11px] leading-tight">{row.label}</span>
                          {row.subLabel && (
                            <span className="text-[9px] text-slate-400 block font-normal leading-none mt-0.5">
                              {row.subLabel}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Channels Columns */}
                    {CHANNELS.map((ch) => {
                      const val = row[ch.key as ChannelKey];
                      const sharePct = Math.round((val / rowTotal) * 100);
                      const comp = row.comparison?.[ch.key as ChannelKey];

                      return (
                        <td
                          key={ch.key}
                          className="py-2 px-0.5 text-center font-mono whitespace-nowrap text-[11px]"
                        >
                          <div className="flex flex-col items-center justify-center">
                            {val > 0 ? (
                              <span className="text-slate-800 font-bold">
                                {val}
                              </span>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}

                            {showPercentShare && val > 0 && (
                              <span className="text-[9px] text-slate-400 font-sans leading-none mt-0.5">
                                {sharePct}%
                              </span>
                            )}

                            {compareEnabled && comp && comp.hasPrevious && (
                              <div
                                title={`Kỳ trước: ${comp.previous}`}
                                className={`text-[8.5px] font-semibold px-0.5 rounded font-sans leading-none mt-0.5 ${
                                  comp.diff > 0
                                    ? 'text-emerald-600 bg-emerald-50'
                                    : comp.diff < 0
                                    ? 'text-rose-600 bg-rose-50'
                                    : 'text-slate-400'
                                }`}
                              >
                                <span>{comp.diff > 0 ? `+${comp.diff}` : comp.diff}</span>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}

                    {/* Total Column */}
                    <td className="py-2 pr-3 pl-1 text-right font-mono font-bold text-slate-900 bg-blue-50/20 group-hover:bg-blue-50/50 group-hover:text-[#5969ff] whitespace-nowrap transition">
                      <div className="flex flex-col items-end">
                        <span className="text-[11px] font-extrabold text-slate-900">
                          {row.total.toLocaleString()}
                        </span>

                        {compareEnabled && row.comparison?.total && (
                          <div
                            title={`Kỳ trước: ${row.comparison.total.previous}`}
                            className={`text-[8.5px] font-semibold px-0.5 rounded font-sans leading-none mt-0.5 ${
                              row.comparison.total.isPositive
                                ? 'text-emerald-600 bg-emerald-50'
                                : 'text-rose-600 bg-rose-50'
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

          {/* Table Footer */}
          <tfoot>
            {/* Totals Row */}
            <tr className="border-t-2 border-slate-200 bg-[#f8fafc] font-bold text-[10px] uppercase text-slate-700">
              <td className="py-2.5 pl-3 pr-1 text-[#5969ff] font-extrabold tracking-tight whitespace-nowrap text-[10px]">
                Tổng ({items.length})
              </td>

              {CHANNELS.map((ch) => {
                const totalClicks = totals[ch.key as ChannelKey];
                const comp = totals.comparison?.[ch.key as ChannelKey];

                return (
                  <td key={ch.key} className="py-2.5 px-0.5 text-center font-mono whitespace-nowrap text-[11px]">
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-extrabold text-slate-800">
                        {totalClicks.toLocaleString()}
                      </span>

                      {compareEnabled && comp && (
                        <div
                          title={`Kỳ trước: ${comp.previous.toLocaleString()}`}
                          className={`text-[8.5px] font-semibold px-0.5 rounded font-sans leading-none mt-0.5 ${
                            comp.isPositive
                              ? 'text-emerald-600 bg-emerald-50'
                              : 'text-rose-600 bg-rose-50'
                          }`}
                        >
                          {comp.diff >= 0 ? `+${comp.diff.toLocaleString()}` : comp.diff.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}

              <td className="py-2.5 pr-3 pl-1 text-right font-mono font-black text-xs text-[#5969ff] bg-blue-50/60 whitespace-nowrap">
                <div className="flex flex-col items-end">
                  <span>{totals.grandTotal.toLocaleString()}</span>
                  {compareEnabled && totals.comparison && (
                    <div
                      className={`text-[8.5px] font-semibold font-sans leading-none mt-0.5 ${
                        totals.comparison.grandTotal.isPositive
                          ? 'text-emerald-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {totals.comparison.grandTotal.diff >= 0 ? '+' : ''}
                      {totals.comparison.grandTotal.percent}%
                    </div>
                  )}
                </div>
              </td>
            </tr>

            {/* % Share Row */}
            <tr className="border-t border-slate-200 bg-slate-50 text-[9.5px] font-semibold text-slate-500">
              <td className="py-2 pl-3 pr-1 font-bold uppercase tracking-tight text-slate-600 whitespace-nowrap text-[9.5px]">
                % Tỷ Trọng
              </td>

              {CHANNELS.map((ch) => {
                const totalClicks = totals[ch.key as ChannelKey];
                const grand = totals.grandTotal || 1;
                const pct = Math.round((totalClicks / grand) * 1000) / 10;

                return (
                  <td key={ch.key} className="py-2 px-0.5 text-center font-mono whitespace-nowrap">
                    <span className="font-bold text-[#5969ff] bg-blue-50 px-1 py-0.5 rounded border border-blue-100 text-[9px]">
                      {pct}%
                    </span>
                  </td>
                );
              })}

              <td className="py-2 pr-3 pl-1 text-right font-mono font-bold text-slate-800 bg-blue-50/40 whitespace-nowrap text-[10px]">
                100%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination Bar (Max 10 rows per page) */}
      {!loading && items.length > 0 && (
        <div className="px-4 py-3.5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs select-none">
          {/* Items Counter */}
          <div className="text-slate-500 font-medium">
            Hiển thị dòng <strong className="text-slate-800">{startIndex + 1}</strong> đến{' '}
            <strong className="text-slate-800">{endIndex}</strong> trong tổng số{' '}
            <strong className="text-[#5969ff]">{items.length}</strong> chu kỳ
          </div>

          {/* Page Buttons Controls */}
          <div className="flex items-center gap-1">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              title="Về trang đầu"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>

            {/* Previous Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              title="Trang trước"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Page Number Buttons */}
            <div className="flex items-center gap-1 mx-1">
              {paginationRange.map((page, idx) => {
                if (page === '...') {
                  return (
                    <span
                      key={`dots-${idx}`}
                      className="px-2 py-1 text-slate-400 font-semibold"
                    >
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
                    className={`min-w-[28px] h-7 px-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                      isActive
                        ? 'bg-[#5969ff] text-white shadow-xs font-black'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              title="Trang sau"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              title="Đến trang cuối"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
