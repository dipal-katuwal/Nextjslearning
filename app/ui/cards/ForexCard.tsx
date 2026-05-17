import type { ForexData } from '@/app/lib/types';

const FLAG: Record<string, string> = {
  USD: '🇺🇸', INR: '🇮🇳', AED: '🇦🇪', QAR: '🇶🇦', GBP: '🇬🇧', EUR: '🇪🇺', SAR: '🇸🇦',
};

export default function ForexCard({ data }: { data: ForexData | null }) {
  if (!data) return <div className="bg-white rounded-2xl p-5 shadow-sm text-gray-400">Forex data unavailable</div>;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Forex Rates · NRB</span>
        <span className="text-xs text-gray-300">{data.publishedDate}</span>
      </div>

      <div className="space-y-2">
        {data.rates.map((r) => {
          const diff = r.buy - r.prevBuy;
          const up = diff >= 0;
          return (
            <div key={r.currency} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">{FLAG[r.currency] || '🌐'}</span>
                <span className="font-semibold text-sm">{r.currency}</span>
              </div>
              <div className="text-right">
                <span className="font-bold tabular-nums">Rs {r.buy.toFixed(2)}</span>
                {diff !== 0 && (
                  <span className={`ml-2 text-xs tabular-nums ${up ? 'text-green-600' : 'text-red-500'}`}>
                    {up ? '+' : ''}{diff.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
