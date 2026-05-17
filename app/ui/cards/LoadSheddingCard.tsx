'use client';
import { useState } from 'react';
import type { LoadSheddingData } from '@/app/lib/types';

export default function LoadSheddingCard({ data }: { data: LoadSheddingData | null }) {
  const [expanded, setExpanded] = useState(false);
  if (!data) return <div className="bg-white rounded-2xl p-5 shadow-sm text-gray-400">Load shedding data unavailable</div>;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = data.schedule.find((s) => s.day === today);
  const hasCut = todaySchedule && todaySchedule.times.length > 0;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Load Shedding · Group {data.group}</span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-blue-500 underline"
        >
          {expanded ? 'Hide week' : 'See week'}
        </button>
      </div>

      {!hasCut ? (
        <div className="flex items-center gap-2 py-2">
          <span className="text-2xl">✅</span>
          <span className="font-semibold text-green-600">No load shedding today</span>
        </div>
      ) : (
        <div>
          <p className="text-xs text-gray-400 mb-2">Today's cut times</p>
          <div className="flex flex-wrap gap-2">
            {todaySchedule!.times.map((t) => (
              <span key={t} className="bg-red-50 text-red-700 font-semibold text-sm px-3 py-1 rounded-full tabular-nums">
                ⚡ {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {expanded && (
        <div className="mt-4 border-t border-gray-50 pt-4 space-y-2">
          {data.schedule.map((s) => (
            <div key={s.day} className="flex items-center justify-between text-sm">
              <span className="w-24 text-gray-500">{s.day}</span>
              <span className="text-gray-700 tabular-nums">
                {s.times.length ? s.times.join(', ') : <span className="text-green-500">No cut</span>}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
