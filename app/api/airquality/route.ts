import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { dbConnect } from '@/app/lib/dbConnect';
import { AirQuality } from '@/app/lib/models';
import { fetchAirQuality } from '@/app/lib/scrapers/airquality';

export const revalidate = 1800; // 30 min

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city') || 'Kathmandu';
  try {
    await dbConnect();
    let record = await AirQuality.findOne({ city }).sort({ updatedAt: -1 });
    const stale = !record || Date.now() - record.updatedAt.getTime() > 30 * 60 * 1000;
    if (stale) {
      const fresh = await fetchAirQuality(city);
      record = await AirQuality.findOneAndUpdate(
        { city },
        { ...fresh, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }
    return NextResponse.json({ data: record, ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e), ok: false }, { status: 500 });
  }
}
