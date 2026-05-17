import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/dbConnect';
import { Forex } from '@/app/lib/models';
import { fetchForex } from '@/app/lib/scrapers/forex';

export const revalidate = 3600;

export async function GET() {
  try {
    await dbConnect();
    let record = await Forex.findOne().sort({ updatedAt: -1 });
    const stale = !record || Date.now() - record.updatedAt.getTime() > 24 * 60 * 60 * 1000;
    if (stale) {
      const fresh = await fetchForex();
      record = await Forex.findOneAndUpdate({}, { ...fresh, updatedAt: new Date() }, { upsert: true, new: true });
    }
    return NextResponse.json({ data: record, ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e), ok: false }, { status: 500 });
  }
}
