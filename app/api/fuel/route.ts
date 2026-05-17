import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/dbConnect';
import { Fuel } from '@/app/lib/models';
import { scrapeFuel } from '@/app/lib/scrapers/fuel';

export const revalidate = 21600; // 6 hours

export async function GET() {
  try {
    await dbConnect();
    let record = await Fuel.findOne().sort({ updatedAt: -1 });
    const stale = !record || Date.now() - record.updatedAt.getTime() > 6 * 60 * 60 * 1000;
    if (stale) {
      const fresh = await scrapeFuel();
      const priceChanged = record && record.petrol !== fresh.petrol;
      record = await Fuel.findOneAndUpdate(
        {},
        { ...fresh, prevPetrol: record?.petrol || fresh.petrol, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }
    return NextResponse.json({ data: record, ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e), ok: false }, { status: 500 });
  }
}
