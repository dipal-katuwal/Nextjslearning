export type NepseData = {
  index: number;
  change: number;
  changePercent: number;
  turnover: number;
  sensitiveIndex: number;
  gainers: { symbol: string; change: number }[];
  losers: { symbol: string; change: number }[];
  updatedAt: string;
};

export type ForexRate = {
  currency: string;
  buy: number;
  sell: number;
  prevBuy: number;
};

export type ForexData = {
  rates: ForexRate[];
  publishedDate: string;
  updatedAt: string;
};

export type FuelData = {
  petrol: number;
  diesel: number;
  lpg: number;
  lastRevision: string;
  prevPetrol: number;
  priceChanged: boolean;
  updatedAt: string;
};

export type AirQualityData = {
  city: string;
  aqi: number;
  pm25: number;
  status: string;
  advice: string;
  color: string;
  updatedAt: string;
};

export type LoadSheddingData = {
  group: number;
  todayTimes: string[];
  schedule: { day: string; times: string[] }[];
  updatedAt: string;
};

export type RashifalData = {
  sign: string;
  signNepali: string;
  text: string;
  luckyNumber: string;
  luckyColor: string;
  date: string;
  updatedAt: string;
};

export type DashboardData = {
  nepse: NepseData | null;
  forex: ForexData | null;
  fuel: FuelData | null;
  airQuality: AirQualityData | null;
  loadShedding: LoadSheddingData | null;
  rashifal: RashifalData[] | null;
};
