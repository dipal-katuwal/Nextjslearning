import { getAqiStatus } from './aqi';
import type { DashboardData, AirQualityData, LoadSheddingData, RashifalData } from './types';

const PRIORITY_CURRENCIES = ['USD', 'INR', 'AED', 'QAR', 'GBP', 'EUR', 'SAR'];

// ─── Mock / fallback data (used when no DB / cold start) ──────────────────────
export function getMockDashboard(): DashboardData {
  const today = new Date().toISOString().split('T')[0];
  const aqiRaw = { aqi: 185, pm25: 142, city: 'Kathmandu' };
  const aqiInfo = getAqiStatus(aqiRaw.aqi);
  const airQuality: AirQualityData = { ...aqiRaw, ...aqiInfo, updatedAt: new Date().toISOString() };

  const loadShedding: LoadSheddingData = {
    group: 1,
    todayTimes: ['06:00-09:00', '19:00-22:00'],
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

  const SIGNS = [
    { sign: 'Aries',       signNepali: 'मेष'     },
    { sign: 'Taurus',      signNepali: 'वृष'     },
    { sign: 'Gemini',      signNepali: 'मिथुन'   },
    { sign: 'Cancer',      signNepali: 'कर्कट'   },
    { sign: 'Leo',         signNepali: 'सिंह'    },
    { sign: 'Virgo',       signNepali: 'कन्या'   },
    { sign: 'Libra',       signNepali: 'तुला'    },
    { sign: 'Scorpio',     signNepali: 'वृश्चिक' },
    { sign: 'Sagittarius', signNepali: 'धनु'     },
    { sign: 'Capricorn',   signNepali: 'मकर'    },
    { sign: 'Aquarius',    signNepali: 'कुम्भ'   },
    { sign: 'Pisces',      signNepali: 'मीन'     },
  ];
  const TEXTS: Record<string, string> = {
    Aries: 'आज तपाईंको दिन सकारात्मक छ। नयाँ काम सुरु गर्न उपयुक्त समय हो।',
    Taurus: 'आर्थिक मामिलामा सतर्क रहनुहोस्। परिवारसँग समय बिताउनुहोस्।',
    Gemini: 'सञ्चार कुशलता काममा आउँछ। साथीहरूसँग भेटघाट राम्रो हुन्छ।',
    Cancer: 'घरपरिवारमा खुशी छ। स्वास्थ्यमा ध्यान दिनुहोस्।',
    Leo: 'नेतृत्वको अवसर आउँछ। आत्मविश्वास राख्नुहोस्।',
    Virgo: 'कामको बोझ बढी हुन सक्छ। व्यवस्थित रहनुहोस्।',
    Libra: 'सम्बन्धमा सन्तुलन राख्नुहोस्। कलासँग सम्बन्धित काम फल्छ।',
    Scorpio: 'अनुसन्धानमा सफलता मिल्छ। गोप्य कुरा नबाँड्नुहोस्।',
    Sagittarius: 'यात्रा र ज्ञानमा रुचि बढ्छ। उच्च शिक्षामा अवसर छ।',
    Capricorn: 'मेहनतको फल मिल्छ। करियरमा प्रगति हुन्छ।',
    Aquarius: 'सामाजिक कार्यमा संलग्नता बढ्छ। नवाचारमा सफलता छ।',
    Pisces: 'आध्यात्मिकतामा झुकाव बढ्छ। सपनाहरू पूरा हुने संकेत छ।',
  };
  const rashifal: RashifalData[] = SIGNS.map((s, i) => ({
    ...s,
    text: TEXTS[s.sign] || 'आज राम्रो दिन हो।',
    luckyNumber: String((i % 9) + 1),
    luckyColor: ['रातो', 'हरियो', 'नीलो', 'पहेंलो', 'सेतो'][i % 5],
    date: today,
    updatedAt: new Date().toISOString(),
  }));

  return {
    nepse: {
      index: 2847.3,
      change: -12.5,
      changePercent: -0.44,
      turnover: 3.2,
      sensitiveIndex: 994.7,
      gainers: [{ symbol: 'NABIL', change: 5.2 }, { symbol: 'NICA', change: 4.1 }, { symbol: 'SCB', change: 3.8 }],
      losers: [{ symbol: 'API', change: -4.9 }, { symbol: 'SPDL', change: -3.7 }, { symbol: 'NTC', change: -2.1 }],
      updatedAt: new Date().toISOString(),
    },
    forex: {
      publishedDate: today,
      rates: [
        { currency: 'USD', buy: 136.40, sell: 137.00, prevBuy: 136.10 },
        { currency: 'INR', buy: 1.60,   sell: 1.62,   prevBuy: 1.60  },
        { currency: 'AED', buy: 37.14,  sell: 37.40,  prevBuy: 37.00 },
        { currency: 'QAR', buy: 37.45,  sell: 37.71,  prevBuy: 37.30 },
        { currency: 'GBP', buy: 171.20, sell: 172.40, prevBuy: 170.80},
        { currency: 'EUR', buy: 147.50, sell: 148.60, prevBuy: 146.90},
        { currency: 'SAR', buy: 36.37,  sell: 36.62,  prevBuy: 36.20 },
      ],
      updatedAt: new Date().toISOString(),
    },
    fuel: {
      petrol: 217,
      diesel: 203,
      lpg: 1700,
      lastRevision: 'May 1, 2026',
      prevPetrol: 217,
      priceChanged: false,
      updatedAt: new Date().toISOString(),
    },
    airQuality,
    loadShedding,
    rashifal,
  };
}
