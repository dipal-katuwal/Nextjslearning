import mongoose, { Schema, Document, Model } from 'mongoose';

// ─── NEPSE ─────────────────────────────────────────────────────────────────
export interface INepse extends Document {
  index: number;
  change: number;
  changePercent: number;
  turnover: number;
  sensitiveIndex: number;
  gainers: { symbol: string; change: number }[];
  losers: { symbol: string; change: number }[];
  updatedAt: Date;
}

const NepseSchema = new Schema<INepse>({
  index: Number,
  change: Number,
  changePercent: Number,
  turnover: Number,
  sensitiveIndex: Number,
  gainers: [{ symbol: String, change: Number }],
  losers: [{ symbol: String, change: Number }],
  updatedAt: { type: Date, default: Date.now },
});

export const Nepse: Model<INepse> =
  mongoose.models.Nepse || mongoose.model<INepse>('Nepse', NepseSchema);

// ─── FOREX ─────────────────────────────────────────────────────────────────
export interface IForex extends Document {
  rates: { currency: string; buy: number; sell: number; prevBuy: number }[];
  publishedDate: string;
  updatedAt: Date;
}

const ForexSchema = new Schema<IForex>({
  rates: [{ currency: String, buy: Number, sell: Number, prevBuy: Number }],
  publishedDate: String,
  updatedAt: { type: Date, default: Date.now },
});

export const Forex: Model<IForex> =
  mongoose.models.Forex || mongoose.model<IForex>('Forex', ForexSchema);

// ─── FUEL ──────────────────────────────────────────────────────────────────
export interface IFuel extends Document {
  petrol: number;
  diesel: number;
  lpg: number;
  lastRevision: string;
  prevPetrol: number;
  updatedAt: Date;
}

const FuelSchema = new Schema<IFuel>({
  petrol: Number,
  diesel: Number,
  lpg: Number,
  lastRevision: String,
  prevPetrol: Number,
  updatedAt: { type: Date, default: Date.now },
});

export const Fuel: Model<IFuel> =
  mongoose.models.Fuel || mongoose.model<IFuel>('Fuel', FuelSchema);

// ─── AIR QUALITY ───────────────────────────────────────────────────────────
export interface IAirQuality extends Document {
  city: string;
  aqi: number;
  pm25: number;
  updatedAt: Date;
}

const AirQualitySchema = new Schema<IAirQuality>({
  city: String,
  aqi: Number,
  pm25: Number,
  updatedAt: { type: Date, default: Date.now },
});

export const AirQuality: Model<IAirQuality> =
  mongoose.models.AirQuality || mongoose.model<IAirQuality>('AirQuality', AirQualitySchema);

// ─── LOAD SHEDDING ─────────────────────────────────────────────────────────
export interface ILoadShedding extends Document {
  group: number;
  schedule: { day: string; times: string[] }[];
  updatedAt: Date;
}

const LoadSheddingSchema = new Schema<ILoadShedding>({
  group: Number,
  schedule: [{ day: String, times: [String] }],
  updatedAt: { type: Date, default: Date.now },
});

export const LoadShedding: Model<ILoadShedding> =
  mongoose.models.LoadShedding || mongoose.model<ILoadShedding>('LoadShedding', LoadSheddingSchema);

// ─── RASHIFAL ──────────────────────────────────────────────────────────────
export interface IRashifal extends Document {
  sign: string;
  signNepali: string;
  text: string;
  luckyNumber: string;
  luckyColor: string;
  date: string;
  updatedAt: Date;
}

const RashifalSchema = new Schema<IRashifal>({
  sign: String,
  signNepali: String,
  text: String,
  luckyNumber: String,
  luckyColor: String,
  date: String,
  updatedAt: { type: Date, default: Date.now },
});

export const Rashifal: Model<IRashifal> =
  mongoose.models.Rashifal || mongoose.model<IRashifal>('Rashifal', RashifalSchema);
