import {
  DailyTrackingItem,
  Granularity,
  DatePreset,
  ComparisonMode,
  GroupedTrackingItem,
  AggregatedTotals,
  DiffMetric,
  ChannelKey,
  CHANNELS,
} from '../types';

/**
 * Parse dd/mm/yyyy to Date
 */
export function parseDate(dStr: string): Date | null {
  if (!dStr) return null;
  const parts = dStr.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day, 0, 0, 0, 0);
    }
  }
  return null;
}

/**
 * Format Date to dd/mm/yyyy
 */
export function formatDateVi(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format Date to yyyy-mm-dd for input[type="date"]
 */
export function toInputDateFormat(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Day of week name in Vietnamese
 */
export function getDayOfWeekName(d: Date): string {
  const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  return days[d.getDay()];
}

/**
 * ISO Week number and boundaries (Monday to Sunday)
 */
export function getISOWeekDetails(date: Date) {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7; // Monday = 0, Sunday = 6
  target.setDate(target.getDate() - dayNr); // Monday of this week
  target.setHours(0, 0, 0, 0);

  const monday = new Date(target);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  // ISO 8601 week number
  const jan4 = new Date(monday.getFullYear(), 0, 4);
  const jan4DayNr = (jan4.getDay() + 6) % 7;
  const firstMonday = new Date(jan4);
  firstMonday.setDate(jan4.getDate() - jan4DayNr);

  const diffMs = monday.getTime() - firstMonday.getTime();
  const weekNumber = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1;

  return {
    year: monday.getFullYear(),
    weekNumber,
    monday,
    sunday,
  };
}

/**
 * Calculate difference and percentage change
 */
export function calculateDiff(current: number, previous: number): DiffMetric {
  const diff = current - previous;
  let percent = 0;
  if (previous > 0) {
    percent = Math.round((diff / previous) * 1000) / 10; // 1 decimal place
  } else if (current > 0) {
    percent = 100;
  } else {
    percent = 0;
  }
  return {
    current,
    previous,
    diff,
    percent,
    isPositive: diff >= 0,
    hasPrevious: typeof previous === 'number' && !isNaN(previous),
  };
}

/**
 * Determine anchor date for presets: use current system date,
 * but if all data items are prior to today (e.g. archived test data), use the latest date in data.
 */
export function getEffectiveAnchorDate(items: DailyTrackingItem[]): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!items.length) return today;

  const dates = items.map((i) => parseDate(i.date)?.getTime() || 0).filter((t) => t > 0);
  if (!dates.length) return today;

  const maxDataTime = Math.max(...dates);
  // If today is within or before dataset latest date, use max(today, maxDataTime)
  if (today.getTime() < maxDataTime) {
    return new Date(maxDataTime);
  }
  return today;
}

/**
 * Resolve start and end date for a preset
 */
export function resolvePresetDateRange(
  preset: DatePreset,
  items: DailyTrackingItem[],
  customStart?: string,
  customEnd?: string
): { startDate: Date | null; endDate: Date | null } {
  if (preset === 'ALL') {
    return { startDate: null, endDate: null };
  }

  const anchor = getEffectiveAnchorDate(items);

  if (preset === 'TODAY') {
    const s = new Date(anchor);
    s.setHours(0, 0, 0, 0);
    const e = new Date(anchor);
    e.setHours(23, 59, 59, 999);
    return { startDate: s, endDate: e };
  }

  if (preset === 'YESTERDAY') {
    const s = new Date(anchor);
    s.setDate(s.getDate() - 1);
    s.setHours(0, 0, 0, 0);
    const e = new Date(s);
    e.setHours(23, 59, 59, 999);
    return { startDate: s, endDate: e };
  }

  if (preset === '7D') {
    const e = new Date(anchor);
    e.setHours(23, 59, 59, 999);
    const s = new Date(anchor);
    s.setDate(s.getDate() - 6);
    s.setHours(0, 0, 0, 0);
    return { startDate: s, endDate: e };
  }

  if (preset === '30D') {
    const e = new Date(anchor);
    e.setHours(23, 59, 59, 999);
    const s = new Date(anchor);
    s.setDate(s.getDate() - 29);
    s.setHours(0, 0, 0, 0);
    return { startDate: s, endDate: e };
  }

  if (preset === 'THIS_MONTH') {
    const s = new Date(anchor.getFullYear(), anchor.getMonth(), 1, 0, 0, 0, 0);
    const e = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0, 23, 59, 59, 999);
    return { startDate: s, endDate: e };
  }

  if (preset === 'LAST_MONTH') {
    const s = new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1, 0, 0, 0, 0);
    const e = new Date(anchor.getFullYear(), anchor.getMonth(), 0, 23, 59, 59, 999);
    return { startDate: s, endDate: e };
  }

  if (preset === 'CUSTOM') {
    const s = customStart ? new Date(customStart + 'T00:00:00') : null;
    const e = customEnd ? new Date(customEnd + 'T23:59:59.999') : null;
    return { startDate: s, endDate: e };
  }

  return { startDate: null, endDate: null };
}

/**
 * Filter items by date range
 */
export function filterItemsByDateRange(
  items: DailyTrackingItem[],
  startDate: Date | null,
  endDate: Date | null
): DailyTrackingItem[] {
  if (!startDate && !endDate) return items;

  const startMs = startDate ? startDate.getTime() : 0;
  const endMs = endDate ? endDate.getTime() : Infinity;

  return items.filter((item) => {
    const d = parseDate(item.date);
    if (!d) return false;
    const t = d.getTime();
    return t >= startMs && t <= endMs;
  });
}

/**
 * Compute previous comparison date range
 */
export function resolveComparisonRange(
  mode: ComparisonMode,
  currentStart: Date | null,
  currentEnd: Date | null,
  items: DailyTrackingItem[],
  customCompStart?: string,
  customCompEnd?: string
): { compareStart: Date | null; compareEnd: Date | null } {
  if (mode === 'NONE') {
    return { compareStart: null, compareEnd: null };
  }

  if (mode === 'CUSTOM') {
    const s = customCompStart ? new Date(customCompStart + 'T00:00:00') : null;
    const e = customCompEnd ? new Date(customCompEnd + 'T23:59:59.999') : null;
    return { compareStart: s, compareEnd: e };
  }

  // If no date range specified, take whole chronological range
  let sTime = currentStart ? currentStart.getTime() : 0;
  let eTime = currentEnd ? currentEnd.getTime() : 0;

  if (!currentStart || !currentEnd) {
    const sorted = [...items].sort((a, b) => (parseDate(a.date)?.getTime() || 0) - (parseDate(b.date)?.getTime() || 0));
    if (!sorted.length) return { compareStart: null, compareEnd: null };
    sTime = parseDate(sorted[0].date)?.getTime() || 0;
    eTime = parseDate(sorted[sorted.length - 1].date)?.getTime() || 0;
  }

  const durationMs = eTime - sTime + 1; // milliseconds

  if (mode === 'PREVIOUS_PERIOD') {
    const prevEnd = new Date(sTime - 1);
    const prevStart = new Date(prevEnd.getTime() - durationMs + 1);
    return { compareStart: prevStart, compareEnd: prevEnd };
  }

  if (mode === 'YOY') {
    const prevStart = new Date(sTime);
    prevStart.setFullYear(prevStart.getFullYear() - 1);
    const prevEnd = new Date(eTime);
    prevEnd.setFullYear(prevEnd.getFullYear() - 1);
    return { compareStart: prevStart, compareEnd: prevEnd };
  }

  return { compareStart: null, compareEnd: null };
}

/**
 * Group raw items by Granularity (Daily, Weekly, Monthly)
 */
export function groupItemsByGranularity(
  items: DailyTrackingItem[],
  granularity: Granularity
): GroupedTrackingItem[] {
  if (granularity === 'DAILY') {
    return items.map((item) => {
      const d = parseDate(item.date) || new Date();
      return {
        key: item.date,
        label: item.date,
        subLabel: getDayOfWeekName(d),
        startDate: d,
        endDate: d,
        direct: item.direct,
        facebook: item.facebook,
        google: item.google,
        kenhGameZ: item.kenhGameZ,
        other: item.other,
        webGameLau: item.webGameLau,
        zalo: item.zalo,
        total: item.total,
      };
    });
  }

  if (granularity === 'WEEKLY') {
    const weekMap = new Map<
      string,
      {
        weekNumber: number;
        year: number;
        monday: Date;
        sunday: Date;
        direct: number;
        facebook: number;
        google: number;
        kenhGameZ: number;
        other: number;
        webGameLau: number;
        zalo: number;
        total: number;
        count: number;
      }
    >();

    items.forEach((item) => {
      const d = parseDate(item.date);
      if (!d) return;
      const details = getISOWeekDetails(d);
      const key = `${details.year}-W${String(details.weekNumber).padStart(2, '0')}`;

      if (!weekMap.has(key)) {
        weekMap.set(key, {
          weekNumber: details.weekNumber,
          year: details.year,
          monday: details.monday,
          sunday: details.sunday,
          direct: 0,
          facebook: 0,
          google: 0,
          kenhGameZ: 0,
          other: 0,
          webGameLau: 0,
          zalo: 0,
          total: 0,
          count: 0,
        });
      }

      const w = weekMap.get(key)!;
      w.direct += item.direct;
      w.facebook += item.facebook;
      w.google += item.google;
      w.kenhGameZ += item.kenhGameZ;
      w.other += item.other;
      w.webGameLau += item.webGameLau;
      w.zalo += item.zalo;
      w.total += item.total;
      w.count += 1;
    });

    const result: GroupedTrackingItem[] = [];
    weekMap.forEach((w, key) => {
      const mStr = `${String(w.monday.getDate()).padStart(2, '0')}/${String(w.monday.getMonth() + 1).padStart(2, '0')}`;
      const sStr = `${String(w.sunday.getDate()).padStart(2, '0')}/${String(w.sunday.getMonth() + 1).padStart(2, '0')}`;
      result.push({
        key,
        label: `Tuần ${w.weekNumber} (${mStr} - ${sStr}/${w.year})`,
        subLabel: `${w.count} ngày có dữ liệu`,
        startDate: w.monday,
        endDate: w.sunday,
        direct: w.direct,
        facebook: w.facebook,
        google: w.google,
        kenhGameZ: w.kenhGameZ,
        other: w.other,
        webGameLau: w.webGameLau,
        zalo: w.zalo,
        total: w.total,
      });
    });

    return result;
  }

  if (granularity === 'MONTHLY') {
    const monthMap = new Map<
      string,
      {
        month: number;
        year: number;
        direct: number;
        facebook: number;
        google: number;
        kenhGameZ: number;
        other: number;
        webGameLau: number;
        zalo: number;
        total: number;
        count: number;
      }
    >();

    items.forEach((item) => {
      const d = parseDate(item.date);
      if (!d) return;
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      const key = `${year}-${String(month).padStart(2, '0')}`;

      if (!monthMap.has(key)) {
        monthMap.set(key, {
          month,
          year,
          direct: 0,
          facebook: 0,
          google: 0,
          kenhGameZ: 0,
          other: 0,
          webGameLau: 0,
          zalo: 0,
          total: 0,
          count: 0,
        });
      }

      const m = monthMap.get(key)!;
      m.direct += item.direct;
      m.facebook += item.facebook;
      m.google += item.google;
      m.kenhGameZ += item.kenhGameZ;
      m.other += item.other;
      m.webGameLau += item.webGameLau;
      m.zalo += item.zalo;
      m.total += item.total;
      m.count += 1;
    });

    const result: GroupedTrackingItem[] = [];
    monthMap.forEach((m, key) => {
      const startDate = new Date(m.year, m.month - 1, 1);
      const endDate = new Date(m.year, m.month, 0, 23, 59, 59, 999);
      result.push({
        key,
        label: `Tháng ${String(m.month).padStart(2, '0')}/${m.year}`,
        subLabel: `${m.count} ngày có dữ liệu`,
        startDate,
        endDate,
        direct: m.direct,
        facebook: m.facebook,
        google: m.google,
        kenhGameZ: m.kenhGameZ,
        other: m.other,
        webGameLau: m.webGameLau,
        zalo: m.zalo,
        total: m.total,
      });
    });

    return result;
  }

  return [];
}

/**
 * Match current grouped items with comparison grouped items
 */
export function attachComparisons(
  currentItems: GroupedTrackingItem[],
  comparisonItems: GroupedTrackingItem[],
  granularity: Granularity
): GroupedTrackingItem[] {
  // Map comparison items by index or offset
  return currentItems.map((curr, idx) => {
    let compItem: GroupedTrackingItem | undefined;

    if (granularity === 'DAILY') {
      // Find item with same day-offset or index
      compItem = comparisonItems[idx];
    } else if (granularity === 'WEEKLY') {
      compItem = comparisonItems[idx];
    } else if (granularity === 'MONTHLY') {
      compItem = comparisonItems[idx];
    }

    if (!compItem) {
      return curr;
    }

    return {
      ...curr,
      comparison: {
        direct: calculateDiff(curr.direct, compItem.direct),
        facebook: calculateDiff(curr.facebook, compItem.facebook),
        google: calculateDiff(curr.google, compItem.google),
        kenhGameZ: calculateDiff(curr.kenhGameZ, compItem.kenhGameZ),
        other: calculateDiff(curr.other, compItem.other),
        webGameLau: calculateDiff(curr.webGameLau, compItem.webGameLau),
        zalo: calculateDiff(curr.zalo, compItem.zalo),
        total: calculateDiff(curr.total, compItem.total),
      },
    };
  });
}

/**
 * Calculate totals and comparison for a list of grouped items
 */
export function calculateTotals(
  items: GroupedTrackingItem[],
  compareTotals?: {
    direct: number;
    facebook: number;
    google: number;
    kenhGameZ: number;
    other: number;
    webGameLau: number;
    zalo: number;
    grandTotal: number;
  }
): AggregatedTotals {
  const current = items.reduce(
    (acc, curr) => {
      acc.direct += curr.direct;
      acc.facebook += curr.facebook;
      acc.google += curr.google;
      acc.kenhGameZ += curr.kenhGameZ;
      acc.other += curr.other;
      acc.webGameLau += curr.webGameLau;
      acc.zalo += curr.zalo;
      acc.grandTotal += curr.total;
      return acc;
    },
    { direct: 0, facebook: 0, google: 0, kenhGameZ: 0, other: 0, webGameLau: 0, zalo: 0, grandTotal: 0 }
  );

  if (!compareTotals) {
    return current;
  }

  return {
    ...current,
    comparison: {
      direct: calculateDiff(current.direct, compareTotals.direct),
      facebook: calculateDiff(current.facebook, compareTotals.facebook),
      google: calculateDiff(current.google, compareTotals.google),
      kenhGameZ: calculateDiff(current.kenhGameZ, compareTotals.kenhGameZ),
      other: calculateDiff(current.other, compareTotals.other),
      webGameLau: calculateDiff(current.webGameLau, compareTotals.webGameLau),
      zalo: calculateDiff(current.zalo, compareTotals.zalo),
      grandTotal: calculateDiff(current.grandTotal, compareTotals.grandTotal),
    },
  };
}

/**
 * Export table data to CSV with UTF-8 BOM so Excel opens Vietnamese characters cleanly
 */
export function exportToCSV(
  items: GroupedTrackingItem[],
  totals: AggregatedTotals,
  granularity: Granularity,
  showComparison: boolean,
  filename = 'bao-cao-traffic.csv'
) {
  const channelHeaders = CHANNELS.map((c) => c.label);
  
  // Headers
  let headerRow = ['Thời gian / Chu kỳ', ...channelHeaders, 'Tổng cộng'];
  if (showComparison) {
    CHANNELS.forEach((c) => {
      headerRow.push(`${c.label} (Kỳ trước)`);
      headerRow.push(`${c.label} (Chênh lệch)`);
      headerRow.push(`${c.label} (% Tăng/Giảm)`);
    });
    headerRow.push('Tổng cộng (Kỳ trước)');
    headerRow.push('Tổng cộng (Chênh lệch)');
    headerRow.push('Tổng cộng (% Tăng/Giảm)');
  }

  const csvRows: string[][] = [headerRow];

  // Data rows
  items.forEach((item) => {
    const row = [
      `"${item.label}"`,
      String(item.direct),
      String(item.facebook),
      String(item.google),
      String(item.kenhGameZ),
      String(item.other),
      String(item.webGameLau),
      String(item.zalo),
      String(item.total),
    ];

    if (showComparison && item.comparison) {
      CHANNELS.forEach((c) => {
        const metric = item.comparison?.[c.key as ChannelKey];
        row.push(String(metric?.previous ?? '-'));
        row.push(metric ? `${metric.diff >= 0 ? '+' : ''}${metric.diff}` : '-');
        row.push(metric ? `${metric.percent >= 0 ? '+' : ''}${metric.percent}%` : '-');
      });
      const tMetric = item.comparison.total;
      row.push(String(tMetric?.previous ?? '-'));
      row.push(tMetric ? `${tMetric.diff >= 0 ? '+' : ''}${tMetric.diff}` : '-');
      row.push(tMetric ? `${tMetric.percent >= 0 ? '+' : ''}${tMetric.percent}%` : '-');
    }

    csvRows.push(row);
  });

  // Footer Total row
  const totalRow = [
    `"TỔNG CỘNG (${items.length} chu kỳ)"`,
    String(totals.direct),
    String(totals.facebook),
    String(totals.google),
    String(totals.kenhGameZ),
    String(totals.other),
    String(totals.webGameLau),
    String(totals.zalo),
    String(totals.grandTotal),
  ];

  if (showComparison && totals.comparison) {
    CHANNELS.forEach((c) => {
      const metric = totals.comparison?.[c.key as ChannelKey];
      totalRow.push(String(metric?.previous ?? '-'));
      totalRow.push(metric ? `${metric.diff >= 0 ? '+' : ''}${metric.diff}` : '-');
      totalRow.push(metric ? `${metric.percent >= 0 ? '+' : ''}${metric.percent}%` : '-');
    });
    const gtMetric = totals.comparison.grandTotal;
    totalRow.push(String(gtMetric?.previous ?? '-'));
    totalRow.push(gtMetric ? `${gtMetric.diff >= 0 ? '+' : ''}${gtMetric.diff}` : '-');
    totalRow.push(gtMetric ? `${gtMetric.percent >= 0 ? '+' : ''}${gtMetric.percent}%` : '-');
  }

  csvRows.push(totalRow);

  // Percentage row
  const grandTotal = totals.grandTotal || 1;
  const percentRow = [
    `"TỶ TRỌNG (% SHARE)"`,
    `${Math.round((totals.direct / grandTotal) * 1000) / 10}%`,
    `${Math.round((totals.facebook / grandTotal) * 1000) / 10}%`,
    `${Math.round((totals.google / grandTotal) * 1000) / 10}%`,
    `${Math.round((totals.kenhGameZ / grandTotal) * 1000) / 10}%`,
    `${Math.round((totals.other / grandTotal) * 1000) / 10}%`,
    `${Math.round((totals.webGameLau / grandTotal) * 1000) / 10}%`,
    `${Math.round((totals.zalo / grandTotal) * 1000) / 10}%`,
    '100%',
  ];
  csvRows.push(percentRow);

  // Combine with UTF-8 BOM
  const csvContent = '\uFEFF' + csvRows.map((e) => e.join(',')).join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
