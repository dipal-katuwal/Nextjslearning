import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeFuel() {
  try {
    const { data } = await axios.get('https://noc.org.np', {
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Sangatho/1.0)' },
    });
    const $ = cheerio.load(data);
    // NOC page structure may vary; this is a best-effort scraper
    const petrolText = $('[class*="petrol"], [class*="ms"]').first().text().match(/[\d.]+/)?.[0];
    const dieselText = $('[class*="diesel"], [class*="hsd"]').first().text().match(/[\d.]+/)?.[0];

    return {
      petrol: petrolText ? parseFloat(petrolText) : 217,
      diesel: dieselText ? parseFloat(dieselText) : 203,
      lpg: 1700,
      lastRevision: 'May 1, 2026',
    };
  } catch {
    return {
      petrol: 217,
      diesel: 203,
      lpg: 1700,
      lastRevision: 'May 1, 2026',
    };
  }
}
