import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const revalidate = 3600;

export async function GET(req: NextRequest) {
  const group = parseInt(req.nextUrl.searchParams.get('group') || '1');
  // In production: call Sparrow SMS RapidAPI
  // GET https://nepal-loadshedding-schedule.p.rapidapi.com/loadshedding/getScheduleForGroup/?group={group}
  const mock = {
    group,
    schedule: [
      { day: 'Sunday',    times: ['06:00-09:00', '19:00-22:00'] },
      { day: 'Monday',    times: ['07:00-10:00'] },
      { day: 'Tuesday',   times: ['08:00-11:00', '18:00-21:00'] },
      { day: 'Wednesday', times: ['06:00-09:00'] },
      { day: 'Thursday',  times: ['07:00-10:00', '20:00-23:00'] },
      { day: 'Friday',    times: ['08:00-11:00'] },
      { day: 'Saturday',  times: [] },
    ],
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json({ data: mock, ok: true });
}
