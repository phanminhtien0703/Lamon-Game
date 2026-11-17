'use client';

import React from 'react';
import { Zap } from 'lucide-react';

interface DayOfWeekItem {
  name: string;
  totalClicks: number;
  dayCount: number;
  avgClicks: number;
}

interface DayOfWeekCardsProps {
  days: DayOfWeekItem[];
  bestDay: DayOfWeekItem | null;
}

export default function DayOfWeekCards({ days, bestDay }: DayOfWeekCardsProps) {
  const maxAvg = Math.max(...days.map((d) => d.avgClicks), 1);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">
              Phân Tích Hiệu Suất Theo Thứ Trong Tuần
            </h3>
            <p className="text-xs text-slate-400">
              Nhận diện ngày cao điểm để tối ưu hóa ngân sách tiếp thị
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full hidden sm:inline">
          Ngày tốt nhất: {bestDay?.name} (~{bestDay?.avgClicks} clicks/ngày)
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {days.map((item) => {
          const isBest = item.name === bestDay?.name;
          const pct = Math.round((item.avgClicks / maxAvg) * 100);

          return (
            <div
              key={item.name}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                isBest
                  ? 'bg-amber-50/50 border-amber-300 shadow-sm ring-1 ring-amber-300/60'
                  : 'bg-[#f8fafc] border-slate-200/80 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold ${
                    isBest ? 'text-amber-800' : 'text-slate-700'
                  }`}
                >
                  {item.name}
                </span>
                {isBest && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 font-extrabold uppercase">
                    HOT
                  </span>
                )}
              </div>

              <div className="my-2.5">
                <span className="text-xl font-extrabold text-slate-800">
                  ~{item.avgClicks}
                </span>
                <span className="text-[11px] text-slate-400 block font-medium">
                  clicks/ngày
                </span>
              </div>

              {/* Progress bar */}
              <div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isBest ? 'bg-amber-500' : 'bg-slate-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                  <span>Tổng {item.totalClicks}</span>
                  <span>{pct}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
