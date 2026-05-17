import Header from '@/app/ui/Header';
import NepseCard from '@/app/ui/cards/NepseCard';
import ForexCard from '@/app/ui/cards/ForexCard';
import FuelCard from '@/app/ui/cards/FuelCard';
import AirQualityCard from '@/app/ui/cards/AirQualityCard';
import LoadSheddingCard from '@/app/ui/cards/LoadSheddingCard';
import RashifalCard from '@/app/ui/cards/RashifalCard';
import { getMockDashboard } from '@/app/lib/data';
import { getAqiStatus } from '@/app/lib/aqi';

export const revalidate = 1800;

async function getDashboardData() {
  // In production: call /api/* routes or fetch from DB directly via server components
  // For now, return mock data — swap each with a real fetch once DB is connected
  return getMockDashboard();
}

export default async function HomePage() {
  const data = await getDashboardData();

  const fuelData = data.fuel
    ? { ...data.fuel, priceChanged: data.fuel.petrol !== data.fuel.prevPetrol }
    : null;

  const aqiData = data.airQuality
    ? { ...data.airQuality, ...getAqiStatus(data.airQuality.aqi) }
    : null;

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {fuelData?.priceChanged && (
          <div className="bg-red-500 text-white font-bold text-center py-3 rounded-2xl shadow animate-bounce">
            ⚠ Fuel Price Changed! Check the card below.
          </div>
        )}

        {/* Last updated */}
        <p className="text-xs text-gray-400 text-right">
          Last updated: {new Date().toLocaleTimeString('en-NP', { hour: '2-digit', minute: '2-digit' })}
        </p>

        {/* Card 1: NEPSE */}
        <section aria-label="NEPSE">
          <NepseCard data={data.nepse} />
        </section>

        {/* Card 2: Load Shedding */}
        <section aria-label="Load Shedding">
          <LoadSheddingCard data={data.loadShedding} />
        </section>

        {/* Card 3: Forex */}
        <section aria-label="Forex">
          <ForexCard data={data.forex} />
        </section>

        {/* Card 4: Fuel */}
        <section aria-label="Fuel Prices">
          <FuelCard data={fuelData} />
        </section>

        {/* Card 5: Air Quality */}
        <section aria-label="Air Quality">
          <AirQualityCard data={aqiData} />
        </section>

        {/* Card 6: Rashifal */}
        <section aria-label="Rashifal">
          <RashifalCard data={data.rashifal} />
        </section>

      </main>

      <footer className="max-w-2xl mx-auto px-4 py-8 text-center text-xs text-gray-300">
        <p className="devanagari font-semibold text-gray-400">sangatho · sangatho.com.np</p>
        <p className="mt-1">Data: NRB · NOC · OpenAQ · Merolagani · Sparrow SMS</p>
      </footer>
    </>
  );
}
