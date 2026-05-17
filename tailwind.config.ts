import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sangatho: {
          navy: '#1E3A5F',
          green: '#16A34A',
          red: '#DC2626',
          gray: '#6B7280',
        },
        aqi: {
          good: '#16A34A',
          moderate: '#CA8A04',
          unhealthy: '#EA580C',
          hazardous: '#7C2D12',
        },
      },
      fontFamily: {
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
