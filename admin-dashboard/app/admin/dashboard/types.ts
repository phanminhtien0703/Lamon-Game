export interface DailyTrackingItem {
  date: string;
  direct: number;
  facebook: number;
  google: number;
  kenhGameZ: number;
  other: number;
  webGameLau: number;
  zalo: number;
  total: number;
}

export type ChannelKey = 'direct' | 'facebook' | 'google' | 'kenhGameZ' | 'other' | 'webGameLau' | 'zalo';

export interface ChannelConfig {
  key: ChannelKey;
  label: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
}

export const CHANNELS: ChannelConfig[] = [
  { key: 'direct', label: 'Direct', color: '#38bdf8', textColor: 'text-sky-400', bgColor: 'bg-sky-500/10', borderColor: 'border-sky-500/30' },
  { key: 'facebook', label: 'Facebook', color: '#3b82f6', textColor: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
  { key: 'google', label: 'Google', color: '#ef4444', textColor: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' },
  { key: 'kenhGameZ', label: 'KenhGameZ', color: '#f59e0b', textColor: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30' },
  { key: 'other', label: 'Other', color: '#a855f7', textColor: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/30' },
  { key: 'webGameLau', label: 'WebGameLau', color: '#10b981', textColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30' },
  { key: 'zalo', label: 'Zalo', color: '#06b6d4', textColor: 'text-cyan-400', bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/30' },
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
  kenhGameZ: number;
  other: number;
  webGameLau: number;
  zalo: number;
  total: number;
  comparison?: {
    direct: DiffMetric;
    facebook: DiffMetric;
    google: DiffMetric;
    kenhGameZ: DiffMetric;
    other: DiffMetric;
    webGameLau: DiffMetric;
    zalo: DiffMetric;
    total: DiffMetric;
  };
}

export interface AggregatedTotals {
  direct: number;
  facebook: number;
  google: number;
  kenhGameZ: number;
  other: number;
  webGameLau: number;
  zalo: number;
  grandTotal: number;
  comparison?: {
    direct: DiffMetric;
    facebook: DiffMetric;
    google: DiffMetric;
    kenhGameZ: DiffMetric;
    other: DiffMetric;
    webGameLau: DiffMetric;
    zalo: DiffMetric;
    grandTotal: DiffMetric;
  };
}

export type SortField = 'period' | 'direct' | 'facebook' | 'google' | 'kenhGameZ' | 'other' | 'webGameLau' | 'zalo' | 'total';
export type SortDirection = 'asc' | 'desc';
