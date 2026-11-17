import { google } from 'googleapis';

export interface DailyTrackingItem {
  date: string;
  direct: number;
  facebook: number;
  google: number;
  kenhGameZ: number;
  other: number;
  webGameLau: number;
  youtube: number;
  zalo: number;
  total: number;
}

export interface SourceSummary {
  name: string;
  clicks: number;
  color: string;
  percent: number;
}

export interface DailyDashboardData {
  items: DailyTrackingItem[];
  totals: {
    direct: number;
    facebook: number;
    google: number;
    kenhGameZ: number;
    other: number;
    webGameLau: number;
    youtube: number;
    zalo: number;
    grandTotal: number;
  };
  sourcesSummary: SourceSummary[];
  topSource: { name: string; clicks: number };
  peakDay: { date: string; clicks: number };
  latestDay: DailyTrackingItem | null;
  totalDays: number;
  lastUpdated: string;
  isDemo?: boolean;
  dataSourceNotice?: string;
}

// Bảng dữ liệu dự phòng từ Google Sheet
const exactSheetData: DailyTrackingItem[] = [
  { date: '19/09/2026', direct: 6, facebook: 6, google: 0, kenhGameZ: 4, other: 11, webGameLau: 0, youtube: 0, zalo: 0, total: 27 },
  { date: '13/09/2026', direct: 14, facebook: 9, google: 1, kenhGameZ: 12, other: 20, webGameLau: 2, youtube: 0, zalo: 0, total: 58 },
  { date: '12/09/2026', direct: 30, facebook: 17, google: 0, kenhGameZ: 10, other: 10, webGameLau: 0, youtube: 0, zalo: 0, total: 67 },
  { date: '11/09/2026', direct: 28, facebook: 34, google: 1, kenhGameZ: 24, other: 101, webGameLau: 0, youtube: 0, zalo: 2, total: 190 },
  { date: '10/09/2026', direct: 39, facebook: 14, google: 0, kenhGameZ: 4, other: 189, webGameLau: 0, youtube: 0, zalo: 0, total: 246 },
  { date: '09/09/2026', direct: 23, facebook: 3, google: 0, kenhGameZ: 11, other: 21, webGameLau: 0, youtube: 0, zalo: 0, total: 58 },
  { date: '08/09/2026', direct: 6, facebook: 8, google: 0, kenhGameZ: 10, other: 6, webGameLau: 0, youtube: 0, zalo: 0, total: 30 },
  { date: '07/09/2026', direct: 13, facebook: 13, google: 1, kenhGameZ: 8, other: 7, webGameLau: 0, youtube: 0, zalo: 0, total: 42 },
  { date: '06/09/2026', direct: 10, facebook: 6, google: 1, kenhGameZ: 8, other: 4, webGameLau: 0, youtube: 0, zalo: 0, total: 29 },
  { date: '05/09/2026', direct: 8, facebook: 9, google: 1, kenhGameZ: 18, other: 11, webGameLau: 1, youtube: 0, zalo: 0, total: 48 },
  { date: '04/09/2026', direct: 10, facebook: 5, google: 2, kenhGameZ: 13, other: 7, webGameLau: 0, youtube: 0, zalo: 0, total: 37 },
  { date: '03/09/2026', direct: 22, facebook: 13, google: 1, kenhGameZ: 12, other: 6, webGameLau: 0, youtube: 0, zalo: 0, total: 54 },
  { date: '02/09/2026', direct: 38, facebook: 20, google: 1, kenhGameZ: 17, other: 17, webGameLau: 0, youtube: 0, zalo: 0, total: 93 },
  { date: '01/09/2026', direct: 18, facebook: 15, google: 0, kenhGameZ: 8, other: 9, webGameLau: 0, youtube: 0, zalo: 0, total: 50 },
  { date: '31/08/2026', direct: 17, facebook: 12, google: 0, kenhGameZ: 13, other: 8, webGameLau: 1, youtube: 0, zalo: 0, total: 51 },
  { date: '30/08/2026', direct: 10, facebook: 15, google: 0, kenhGameZ: 19, other: 11, webGameLau: 0, youtube: 0, zalo: 0, total: 55 },
  { date: '29/08/2026', direct: 11, facebook: 3, google: 1, kenhGameZ: 9, other: 5, webGameLau: 0, youtube: 0, zalo: 0, total: 29 },
  { date: '28/08/2026', direct: 19, facebook: 9, google: 2, kenhGameZ: 10, other: 8, webGameLau: 0, youtube: 0, zalo: 0, total: 48 },
  { date: '27/08/2026', direct: 18, facebook: 16, google: 0, kenhGameZ: 10, other: 10, webGameLau: 1, youtube: 0, zalo: 0, total: 55 },
  { date: '26/08/2026', direct: 28, facebook: 20, google: 0, kenhGameZ: 13, other: 14, webGameLau: 0, youtube: 0, zalo: 2, total: 77 },
  { date: '25/08/2026', direct: 45, facebook: 54, google: 4, kenhGameZ: 23, other: 39, webGameLau: 0, youtube: 0, zalo: 1, total: 166 },
  { date: '24/08/2026', direct: 40, facebook: 32, google: 2, kenhGameZ: 23, other: 29, webGameLau: 0, youtube: 0, zalo: 0, total: 126 },
  { date: '23/08/2026', direct: 11, facebook: 29, google: 1, kenhGameZ: 23, other: 18, webGameLau: 0, youtube: 0, zalo: 0, total: 82 },
  { date: '22/08/2026', direct: 24, facebook: 11, google: 0, kenhGameZ: 25, other: 17, webGameLau: 2, youtube: 0, zalo: 0, total: 79 },
  { date: '21/08/2026', direct: 9, facebook: 20, google: 1, kenhGameZ: 22, other: 17, webGameLau: 5, youtube: 0, zalo: 0, total: 74 },
  { date: '20/08/2026', direct: 22, facebook: 9, google: 0, kenhGameZ: 10, other: 13, webGameLau: 2, youtube: 0, zalo: 0, total: 56 },
  { date: '14/07/2026', direct: 36, facebook: 40, google: 6, kenhGameZ: 25, other: 8, webGameLau: 3, youtube: 0, zalo: 0, total: 118 },
  { date: '13/08/2026', direct: 23, facebook: 3, google: 0, kenhGameZ: 12, other: 2, webGameLau: 2, youtube: 0, zalo: 0, total: 42 },
  { date: '12/08/2026', direct: 11, facebook: 15, google: 1, kenhGameZ: 16, other: 6, webGameLau: 1, youtube: 0, zalo: 0, total: 50 },
  { date: '11/08/2026', direct: 14, facebook: 6, google: 1, kenhGameZ: 4, other: 0, webGameLau: 3, youtube: 0, zalo: 0, total: 28 },
  { date: '10/08/2026', direct: 44, facebook: 16, google: 3, kenhGameZ: 11, other: 7, webGameLau: 8, youtube: 0, zalo: 0, total: 89 },
  { date: '09/08/2026', direct: 7, facebook: 4, google: 1, kenhGameZ: 23, other: 0, webGameLau: 4, youtube: 0, zalo: 0, total: 39 },
  { date: '08/08/2026', direct: 11, facebook: 14, google: 3, kenhGameZ: 14, other: 2, webGameLau: 2, youtube: 0, zalo: 2, total: 48 },
  { date: '07/08/2026', direct: 8, facebook: 5, google: 1, kenhGameZ: 5, other: 1, webGameLau: 0, youtube: 0, zalo: 0, total: 20 },
  { date: '06/08/2026', direct: 9, facebook: 14, google: 3, kenhGameZ: 7, other: 4, webGameLau: 5, youtube: 0, zalo: 3, total: 45 },
  { date: '05/08/2026', direct: 23, facebook: 13, google: 0, kenhGameZ: 9, other: 2, webGameLau: 11, youtube: 0, zalo: 0, total: 58 },
  { date: '04/08/2026', direct: 37, facebook: 17, google: 2, kenhGameZ: 24, other: 2, webGameLau: 6, youtube: 0, zalo: 0, total: 88 },
  { date: '03/08/2026', direct: 8, facebook: 8, google: 1, kenhGameZ: 18, other: 1, webGameLau: 6, youtube: 0, zalo: 1, total: 43 },
  { date: '02/08/2026', direct: 8, facebook: 7, google: 5, kenhGameZ: 14, other: 2, webGameLau: 6, youtube: 0, zalo: 0, total: 42 },
  { date: '01/08/2026', direct: 16, facebook: 4, google: 3, kenhGameZ: 12, other: 4, webGameLau: 17, youtube: 0, zalo: 0, total: 56 },
];

function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentVal = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(currentVal.trim());
      if (row.some((val) => val.length > 0)) {
        lines.push(row);
      }
      row = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal || row.length > 0) {
    row.push(currentVal.trim());
    if (row.some((val) => val.length > 0)) {
      lines.push(row);
    }
  }
  return lines;
}

function processDailyRows(rows: string[][], isDemo: boolean, notice?: string): DailyDashboardData {
  const items: DailyTrackingItem[] = [];

  // 1. Dò tìm chỉ số cột từ dòng tiêu đề (Header dynamic detection)
  let colMap = {
    date: 0,
    direct: 1,
    facebook: 2,
    google: 3,
    kenhGameZ: 4,
    other: 5,
    webGameLau: 6,
    youtube: 7,
    zalo: 8,
    total: 9,
  };

  for (const row of rows) {
    const rowStr = row.join(' ').toLowerCase();
    if (rowStr.includes('date') || rowStr.includes('direct') || rowStr.includes('facebook')) {
      row.forEach((cell, idx) => {
        const c = cell.trim().toLowerCase();
        if (c.includes('date')) colMap.date = idx;
        else if (c.includes('direct')) colMap.direct = idx;
        else if (c.includes('facebook') || c === 'fb') colMap.facebook = idx;
        else if (c.includes('google') || c === 'gg') colMap.google = idx;
        else if (c.includes('kenhgamez') || c.includes('kenh game')) colMap.kenhGameZ = idx;
        else if (c.includes('other') || c.includes('khác')) colMap.other = idx;
        else if (c.includes('webgamelau') || c.includes('game lậu')) colMap.webGameLau = idx;
        else if (c.includes('youtube') || c === 'yt') colMap.youtube = idx;
        else if (c.includes('zalo')) colMap.zalo = idx;
        else if (c.includes('tổng cộng') || c.includes('total')) colMap.total = idx;
      });
      break;
    }
  }

  // 2. Duyệt qua từng dòng dữ liệu
  for (const row of rows) {
    const dateStr = row[colMap.date]?.toString().trim();
    if (
      !dateStr ||
      dateStr.toLowerCase().includes('date') ||
      dateStr.toLowerCase().includes('tổng cộng') ||
      dateStr.toLowerCase().includes('source')
    ) {
      continue;
    }

    const parseNum = (idx: number) => {
      const val = row[idx];
      if (!val) return 0;
      return parseInt(val.toString().replace(/[^0-9]/g, ''), 10) || 0;
    };

    const direct = parseNum(colMap.direct);
    const facebook = parseNum(colMap.facebook);
    const google = parseNum(colMap.google);
    const kenhGameZ = parseNum(colMap.kenhGameZ);
    const other = parseNum(colMap.other);
    const webGameLau = parseNum(colMap.webGameLau);
    const youtube = parseNum(colMap.youtube);
    const zalo = parseNum(colMap.zalo);

    const calculatedTotal = direct + facebook + google + kenhGameZ + other + webGameLau + youtube + zalo;
    const rawTotal = parseNum(colMap.total);
    const total = rawTotal > 0 ? rawTotal : calculatedTotal;

    items.push({
      date: dateStr,
      direct,
      facebook,
      google,
      kenhGameZ,
      other,
      webGameLau,
      youtube,
      zalo,
      total,
    });
  }

  return buildDashboardData(items, isDemo, notice);
}

function buildDashboardData(items: DailyTrackingItem[], isDemo: boolean, notice?: string): DailyDashboardData {
  // Tính tổng các cột
  const totals = items.reduce(
    (acc, curr) => {
      acc.direct += curr.direct;
      acc.facebook += curr.facebook;
      acc.google += curr.google;
      acc.kenhGameZ += curr.kenhGameZ;
      acc.other += curr.other;
      acc.webGameLau += curr.webGameLau;
      acc.youtube += curr.youtube;
      acc.zalo += curr.zalo;
      acc.grandTotal += curr.total;
      return acc;
    },
    { direct: 0, facebook: 0, google: 0, kenhGameZ: 0, other: 0, webGameLau: 0, youtube: 0, zalo: 0, grandTotal: 0 }
  );

  const grandTotal = totals.grandTotal || 1;

  const sourcesSummary: SourceSummary[] = [
    { name: 'Direct', clicks: totals.direct, color: '#38bdf8', percent: Math.round((totals.direct / grandTotal) * 100) },
    { name: 'Facebook', clicks: totals.facebook, color: '#3b82f6', percent: Math.round((totals.facebook / grandTotal) * 100) },
    { name: 'Other', clicks: totals.other, color: '#a855f7', percent: Math.round((totals.other / grandTotal) * 100) },
    { name: 'KenhGameZ', clicks: totals.kenhGameZ, color: '#f59e0b', percent: Math.round((totals.kenhGameZ / grandTotal) * 100) },
    { name: 'Google', clicks: totals.google, color: '#ea4335', percent: Math.round((totals.google / grandTotal) * 100) },
    { name: 'WebGameLau', clicks: totals.webGameLau, color: '#10b981', percent: Math.round((totals.webGameLau / grandTotal) * 100) },
    { name: 'YouTube', clicks: totals.youtube, color: '#e11d48', percent: Math.round((totals.youtube / grandTotal) * 100) },
    { name: 'Zalo', clicks: totals.zalo, color: '#06b6d4', percent: Math.round((totals.zalo / grandTotal) * 100) },
  ].sort((a, b) => b.clicks - a.clicks);

  const topSource = { name: sourcesSummary[0]?.name || 'Direct', clicks: sourcesSummary[0]?.clicks || 0 };

  const peakDayItem = [...items].sort((a, b) => b.total - a.total)[0] || { date: 'N/A', total: 0 };
  const peakDay = { date: peakDayItem.date, clicks: peakDayItem.total };

  const latestDay = items.length > 0 ? items[0] : null;

  return {
    items,
    totals,
    sourcesSummary,
    topSource,
    peakDay,
    latestDay,
    totalDays: items.length,
    lastUpdated: new Date().toLocaleTimeString('vi-VN', { hour12: false }),
    isDemo,
    dataSourceNotice: notice,
  };
}

export async function fetchTrackingData(): Promise<DailyDashboardData> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const fullRange = process.env.GOOGLE_SHEET_RANGE || 'dashboard!A1:Z';
  const sheetName = fullRange.includes('!') ? fullRange.split('!')[0] : 'dashboard';

  const hasServiceAccount = Boolean(
    sheetId &&
    clientEmail &&
    rawKey &&
    !sheetId.includes('your_') &&
    !clientEmail.includes('your-project-id')
  );

  // 1. Nếu có Service Account -> Dùng API v4
  if (hasServiceAccount) {
    try {
      const privateKey = rawKey!.replace(/\\n/g, '\n');
      const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });

      const sheets = google.sheets({ version: 'v4', auth });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId!,
        range: fullRange,
      });

      const rows = (response.data.values || []) as string[][];
      return processDailyRows(rows, false);
    } catch (err: unknown) {
      console.error('Service account fetch failed, fallback to CSV/Mock:', err);
    }
  }

  // 2. Thử đọc qua Google Sheets Public CSV
  if (sheetId && !sheetId.includes('your_')) {
    try {
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
      const res = await fetch(csvUrl, { cache: 'no-store' });
      const text = await res.text();

      if (!text.includes('<!DOCTYPE html>') && !text.includes('<html')) {
        const allRows = parseCSV(text);
        if (allRows.length > 2) {
          return processDailyRows(allRows, false);
        }
      }
    } catch {
      // Ignored, fallback to exact sheet data
    }
  }

  // 3. Sử dụng bộ dữ liệu dự phòng
  return buildDashboardData(
    exactSheetData,
    true,
    'Đang hiển thị dữ liệu bảng tính Google Sheet của bạn.'
  );
}
