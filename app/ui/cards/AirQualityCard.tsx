import type { AirQualityData } from '@/app/lib/types';

export default function AirQualityCard({ data }: { data: AirQualityData | null }) {
  if (!data) return <div className="bg-white rounded-2xl p-5 shadow-sm text-gray-400">AQI data unavailable</div>;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Air Quality · {data.city}</span>
        <span className="text-xs text-gray-300">OpenAQ</span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl tabular-nums flex-shrink-0"
          style={{ backgroundColor: data.color }}
        >
          {data.aqi}
        </div>
        <div>
          <p className="font-bold text-lg" style={{ color: data.color }}>{data.status}</p>
          <p className="text-sm text-gray-500">{data.advice}</p>
          <p className="text-xs text-gray-400 mt-1">PM2.5: {data.pm25} µg/m³</p>
        </div>
      </div>

      <div className="w-full h-2 rounded-full overflow-hidden bg-gray-100">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min((data.aqi / 300) * 100, 100)}%`, backgroundColor: data.color }}
        />
      </div>
    </div>
  );
}
