import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/dbConnect';
import { Nepse } from '@/app/lib/models';
import { scrapeNepse } from '@/app/lib/scrapers/nepse';

export const revalidate = 3600;

export async function GET() {
  try {
    await dbConnect();
    let record = await Nepse.findOne().sort({ updatedAt: -1 });

    const stale = !record || Date.now() - record.updatedAt.getTime() > 24 * 60 * 60 * 1000;
    if (stale) {
      const fresh = await scrapeNepse();
      record = await Nepse.findOneAndUpdate(
        {},
        { ...fresh, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ data: record, ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e), ok: false }, { status: 500 });
  }
}
