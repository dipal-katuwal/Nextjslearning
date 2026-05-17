export function getAqiStatus(aqi: number): { status: string; advice: string; color: string; bg: string } {
  if (aqi <= 50)  return { status: 'Good',                       advice: 'Good day to go outside',   color: '#16A34A', bg: 'bg-green-100' };
  if (aqi <= 100) return { status: 'Moderate',                   advice: 'Sensitive people take care', color: '#CA8A04', bg: 'bg-yellow-100' };
  if (aqi <= 150) return { status: 'Unhealthy for sensitive',    advice: 'Wear a mask if sensitive',  color: '#EA580C', bg: 'bg-orange-100' };
  if (aqi <= 200) return { status: 'Unhealthy',                  advice: 'Wear a mask today',         color: '#DC2626', bg: 'bg-red-100' };
  if (aqi <= 300) return { status: 'Very Unhealthy',             advice: 'Avoid outdoor activity',    color: '#9333EA', bg: 'bg-purple-100' };
  return           { status: 'Hazardous',                        advice: 'Stay indoors',              color: '#7C2D12', bg: 'bg-red-200' };
}
