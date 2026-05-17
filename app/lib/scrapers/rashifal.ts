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

// Placeholder texts — replace with Onlinekhabar scraper in production
const PLACEHOLDER_TEXTS: Record<string, string> = {
  Aries:       'आज तपाईंको दिन सकारात्मक छ। नयाँ काम सुरु गर्न उपयुक्त समय हो।',
  Taurus:      'आर्थिक मामिलामा सतर्क रहनुहोस्। परिवारसँग समय बिताउनुहोस्।',
  Gemini:      'सञ्चार कुशलता काममा आउँछ। साथीहरूसँग भेटघाट राम्रो हुन्छ।',
  Cancer:      'घरपरिवारमा खुशी छ। स्वास्थ्यमा ध्यान दिनुहोस्।',
  Leo:         'नेतृत्वको अवसर आउँछ। आत्मविश्वास राख्नुहोस्।',
  Virgo:       'कामको बोझ बढी हुन सक्छ। व्यवस्थित रहनुहोस्।',
  Libra:       'सम्बन्धमा सन्तुलन राख्नुहोस्। कलासँग सम्बन्धित काम फल्छ।',
  Scorpio:     'अनुसन्धानमा सफलता मिल्छ। गोप्य कुरा नबाँड्नुहोस्।',
  Sagittarius: 'यात्रा र ज्ञानमा रुचि बढ्छ। उच्च शिक्षामा अवसर छ।',
  Capricorn:   'मेहनतको फल मिल्छ। करियरमा प्रगति हुन्छ।',
  Aquarius:    'सामाजिक कार्यमा संलग्नता बढ्छ। नवाचारमा सफलता छ।',
  Pisces:      'आध्यात्मिकतामा झुकाव बढ्छ। सपनाहरू पूरा हुने संकेत छ।',
};

export async function fetchRashifal() {
  const today = new Date().toISOString().split('T')[0];
  // In production: scrape onlinekhabar.com/rashifal for the day
  return SIGNS.map((s) => ({
    ...s,
    text: PLACEHOLDER_TEXTS[s.sign] || 'आज राम्रो दिन हो।',
    luckyNumber: String(Math.floor(Math.random() * 9) + 1),
    luckyColor: ['रातो', 'हरियो', 'नीलो', 'पहेंलो', 'सेतो'][Math.floor(Math.random() * 5)],
    date: today,
  }));
}
