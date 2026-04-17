import mongoose from 'mongoose';

// 1. User Schema (New)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password will be stored here
});

// 2. Existing Schemas
const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image_url: { type: String, required: true },
});

const InvoiceSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid'], required: true, index: true },
  date: { type: Date, default: Date.now },
});

const RevenueSchema = new mongoose.Schema({
  month: { type: String, required: true },
  revenue: { type: Number, required: true },
});

// Export all models
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
export const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
export const Revenue = mongoose.models.Revenue || mongoose.model('Revenue', RevenueSchema);