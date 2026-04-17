import { dbConnect } from './dbConnect';
import { Revenue, Invoice, Customer } from './models';
import { formatCurrency } from './utils'; // Tutorial utility for formatting

export async function fetchRevenue() {
  await dbConnect();
  try {
    // Fetch all revenue documents from MongoDB
    const data = await Revenue.find({});
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  await dbConnect();
  try {
    // Populate replaces the SQL JOIN
    const data = await Invoice.find({})
      .sort({ date: -1 }) // Sort by newest first
      .limit(5)
      .populate('customer_id');

    // Format the data to match the UI expectations
    return data.map((invoice) => ({
      id: invoice._id.toString(),
      name: invoice.customer_id.name,
      image_url: invoice.customer_id.image_url,
      email: invoice.customer_id.email,
      amount: formatCurrency(invoice.amount),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  
  await dbConnect();
  try {
    // Running queries in parallel for efficiency
    const invoiceCountPromise = Invoice.countDocuments();
    const customerCountPromise = Customer.countDocuments();
    
    // Aggregation to sum amounts based on status
    const invoiceStatusPromise = Invoice.aggregate([
      {
        $group: {
          _id: null,
          paid: { $sum: { $cond: [{ $eq: ['$status', 'paid'] }, '$amount', 0] } },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, '$amount', 0] } },
        },
      },
    ]);

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0] ?? '0');
    const numberOfCustomers = Number(data[1] ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0]?.paid ?? 0);
    const totalPendingInvoices = formatCurrency(data[2][0]?.pending ?? 0);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}