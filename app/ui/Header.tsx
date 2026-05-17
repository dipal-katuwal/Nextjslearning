'use client';
import { useEffect, useState } from 'react';

function getNepaliDay(day: number) {
  const days = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'];
  return days[day];
}

function toBS(adDate: Date): string {
  // Simplified BS conversion — replace with a proper library in production
  const nepaliMonths = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पुस', 'माघ', 'फाल्गुन', 'चैत'];
  const bsYear = adDate.getFullYear() + 57 - (adDate.getMonth() < 3 ? 1 : 0);
  const bsMonth = nepaliMonths[(adDate.getMonth() + 9) % 12];
  const bsDay = adDate.getDate();
  return `${bsYear} ${bsMonth} ${bsDay}`;
}

export default function Header() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const bsDate = toBS(now);
  const nepaliDay = getNepaliDay(now.getDay());
  const adStr = now.toLocaleDateString('en-NP', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header style={{ background: '#1E3A5F' }} className="text-white px-4 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight devanagari">sangatho</h1>
          <p className="text-xs text-blue-200">आजको नेपाल, एकै ठाउँमा।</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold devanagari">{nepaliDay}, {bsDate}</p>
          <p className="text-xs text-blue-200">{adStr}</p>
        </div>
      </div>
    </header>
  );
}
