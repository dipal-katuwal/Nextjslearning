import type { NepseData } from '@/app/lib/types';

export default function NepseCard({ data }: { data: NepseData | null }) {
  if (!data) return <div className="bg-white rounded-2xl p-5 shadow-sm text-gray-400">NEPSE data unavailable</div>;
  const up = data.change >= 0;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">NEPSE Index</span>
        <span className="text-xs text-gray-300">After market close</span>
      </div>

      <div className="flex items-end gap-3 mb-4">
        <span className="text-4xl font-bold tabular-nums text-gray-900">{data.index.toLocaleString()}</span>
        <span className={`text-lg font-semibold tabular-nums ${up ? 'text-green-600' : 'text-red-600'}`}>
          {up ? '▲' : '▼'} {Math.abs(data.change).toFixed(1)} ({Math.abs(data.changePercent).toFixed(2)}%)
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div className="bg-gray-50 rounded-xl px-3 py-2">
          <p className="text-gray-400 text-xs">Turnover</p>
          <p className="font-semibold">Rs {data.turnover.toFixed(2)} Cr</p>
        </div>
        <div className="bg-gray-50 rounded-xl px-3 py-2">
          <p className="text-gray-400 text-xs">Sensitive</p>
          <p className="font-semibold">{data.sensitiveIndex.toFixed(1)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-semibold text-green-600 mb-1">Top Gainers</p>
          {data.gainers.map((g) => (
            <div key={g.symbol} className="flex justify-between text-sm">
              <span className="font-medium">{g.symbol}</span>
              <span className="text-green-600">+{g.change}%</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs font-semibold text-red-500 mb-1">Top Losers</p>
          {data.losers.map((l) => (
            <div key={l.symbol} className="flex justify-between text-sm">
              <span className="font-medium">{l.symbol}</span>
              <span className="text-red-500">{l.change}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
