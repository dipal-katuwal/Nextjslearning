'use client';
import { useState } from 'react';
import type { RashifalData } from '@/app/lib/types';

const ZODIAC_EMOJI: Record<string, string> = {
  Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
  Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
  Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
};

export default function RashifalCard({ data }: { data: RashifalData[] | null }) {
  const signs = data || [];
  const [selected, setSelected] = useState(signs[0]?.sign || 'Aries');
  const current = signs.find((s) => s.sign === selected) || signs[0];

  if (!current) return <div className="bg-white rounded-2xl p-5 shadow-sm text-gray-400">Rashifal unavailable</div>;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">राशिफल · Daily Horoscope</span>
      </div>

      {/* Sign scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {signs.map((s) => (
          <button
            key={s.sign}
            onClick={() => setSelected(s.sign)}
            className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl text-xs transition-all ${
              selected === s.sign
                ? 'text-white font-bold'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
            style={selected === s.sign ? { background: '#1E3A5F' } : {}}
          >
            <span className="text-base">{ZODIAC_EMOJI[s.sign]}</span>
            <span className="devanagari text-xs mt-0.5">{s.signNepali}</span>
          </button>
        ))}
      </div>

      {/* Selected sign */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-5xl">{ZODIAC_EMOJI[current.sign]}</span>
        <div>
          <p className="font-bold text-lg devanagari">{current.signNepali}</p>
          <p className="text-xs text-gray-400">{current.sign}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed devanagari text-gray-700 mb-4">{current.text}</p>

      <div className="flex gap-3">
        <div className="bg-gray-50 rounded-xl px-3 py-2 text-sm">
          <span className="text-gray-400 text-xs">Lucky #</span>
          <p className="font-bold">{current.luckyNumber}</p>
        </div>
        <div className="bg-gray-50 rounded-xl px-3 py-2 text-sm">
          <span className="text-gray-400 text-xs devanagari">शुभ रंग</span>
          <p className="font-bold devanagari">{current.luckyColor}</p>
        </div>
      </div>
    </div>
  );
}
