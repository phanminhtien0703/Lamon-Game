export interface DailyTrackingItem {
  date: string;
  direct: number;
  facebook: number;
  google: number;
  internal: number;
  kenhGameZ: number;
  other: number;
  webGameLau: number;
  youtube: number;
  zalo: number;
  total: number;
}

export type ChannelKey = 'direct' | 'facebook' | 'google' | 'internal' | 'kenhGameZ' | 'other' | 'webGameLau' | 'youtube' | 'zalo';

export interface ChannelConfig {
  key: ChannelKey;
  label: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
}

export const CHANNELS: ChannelConfig[] = [
  { key: 'direct', label: 'Direct', color: '#38bdf8', textColor: 'text-sky-500', bgColor: 'bg-sky-50', borderColor: 'border-sky-200' },
  { key: 'facebook', label: 'Facebook', color: '#3b82f6', textColor: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { key: 'google', label: 'Google', color: '#ea4335', textColor: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  { key: 'internal', label: 'Internal', color: '#6366f1', textColor: 'text-indigo-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
  { key: 'kenhGameZ', label: 'KenhGameZ', color: '#f59e0b', textColor: 'text-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  { key: 'other', label: 'Other', color: '#a855f7', textColor: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  { key: 'webGameLau', label: 'WebGameLau', color: '#10b981', textColor: 'text-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  { key: 'youtube', label: 'YouTube', color: '#e11d48', textColor: 'text-rose-600', bgColor: 'bg-rose-50', borderColor: 'border-rose-200' },
  { key: 'zalo', label: 'Zalo', color: '#06b6d4', textColor: 'text-cyan-500', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200' },
];

export type Granularity = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export type DatePreset = 'ALL' | 'TODAY' | 'YESTERDAY' | '7D' | '30D' | 'THIS_MONTH' | 'LAST_MONTH' | 'CUSTOM';

export type ComparisonMode = 'NONE' | 'PREVIOUS_PERIOD' | 'YOY' | 'CUSTOM';

export interface DiffMetric {
  current: number;
  previous: number;
  diff: number;
  percent: number;
  isPositive: boolean;
  hasPrevious: boolean;
}

export interface GroupedTrackingItem {
  key: string;
  label: string;
  subLabel?: string;
  startDate: Date;
  endDate: Date;
  direct: number;
  facebook: number;
  google: number;
  internal: number;
  kenhGameZ: number;
  other: number;
  webGameLau: number;
  youtube: number;
  zalo: number;
  total: number;
  comparison?: {
    direct: DiffMetric;
    facebook: DiffMetric;
    google: DiffMetric;
    internal: DiffMetric;
    kenhGameZ: DiffMetric;
    other: DiffMetric;
    webGameLau: DiffMetric;
    youtube: DiffMetric;
    zalo: DiffMetric;
    total: DiffMetric;
  };
}

export interface AggregatedTotals {
  direct: number;
  facebook: number;
  google: number;
  internal: number;
  kenhGameZ: number;
  other: number;
  webGameLau: number;
  youtube: number;
  zalo: number;
  grandTotal: number;
  comparison?: {
    direct: DiffMetric;
    facebook: DiffMetric;
    google: DiffMetric;
    internal: DiffMetric;
    kenhGameZ: DiffMetric;
    other: DiffMetric;
    webGameLau: DiffMetric;
    youtube: DiffMetric;
    zalo: DiffMetric;
    grandTotal: DiffMetric;
  };
}

export type SortField = 'period' | 'direct' | 'facebook' | 'google' | 'internal' | 'kenhGameZ' | 'other' | 'webGameLau' | 'youtube' | 'zalo' | 'total';
export type SortDirection = 'asc' | 'desc';
