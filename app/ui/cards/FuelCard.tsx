import type { FuelData } from '@/app/lib/types';

export default function FuelCard({ data }: { data: FuelData | null }) {
  if (!data) return <div className="bg-white rounded-2xl p-5 shadow-sm text-gray-400">Fuel data unavailable</div>;
  const changed = data.priceChanged;
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm ${changed ? 'ring-2 ring-red-500' : ''}`}>
      {changed && (
        <div className="bg-red-500 text-white text-xs font-bold text-center py-1 px-3 rounded-lg mb-3">
          ⚠ Price Changed!
        </div>
      )}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Fuel Price · NOC</span>
        <span className="text-xs text-gray-300">Revised {data.lastRevision}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Petrol', emoji: '⛽', value: data.petrol, unit: '/L' },
          { label: 'Diesel', emoji: '🛢', value: data.diesel, unit: '/L' },
          { label: 'LPG',    emoji: '🔥', value: data.lpg,    unit: '/cyl' },
        ].map((f) => (
          <div key={f.label} className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl mb-1">{f.emoji}</p>
            <p className="text-xs text-gray-400">{f.label}</p>
            <p className="font-bold text-sm tabular-nums">Rs {f.value}<span className="text-xs font-normal text-gray-400">{f.unit}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
