import { NextResponse } from 'next/server';
import { fetchTrackingData } from '@/lib/googleSheets';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await fetchTrackingData();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Fetch tracking stats error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Không thể truy xuất dữ liệu Google Sheets', details: message },
      { status: 500 }
    );
  }
}
