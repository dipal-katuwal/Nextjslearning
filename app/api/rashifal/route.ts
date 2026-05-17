import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/dbConnect';
import { Rashifal } from '@/app/lib/models';
import { fetchRashifal } from '@/app/lib/scrapers/rashifal';

export const revalidate = 3600;

export async function GET() {
  try {
    await dbConnect();
    const today = new Date().toISOString().split('T')[0];
    let records = await Rashifal.find({ date: today });
    if (!records.length) {
      const fresh = await fetchRashifal();
      records = await Rashifal.insertMany(fresh);
    }
    return NextResponse.json({ data: records, ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e), ok: false }, { status: 500 });
  }
}
