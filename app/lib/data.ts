import { dbConnect } from './dbConnect';
import { Revenue, Invoice, Customer } from './models';
import { formatCurrency } from './utils';

const ITEMS_PER_PAGE = 6;

// 1. Fetch Revenue Data (for the RevenueChart component)
export async function fetchRevenue() {
  await dbConnect();
  try {
    const data = await Revenue.find({}).lean();
 
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

// 2. Fetch Latest Invoices (for the LatestInvoices component)
export async function fetchLatestInvoices() {
  await dbConnect();
  try {
    const data = await Invoice.find({})
      .sort({ date: -1 })
      .limit(5)
      .populate('customer_id')
      .lean();

    return data.map((invoice: any) => ({
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

// 3. Fetch Card Totals (for the CardWrapper component)
export async function fetchCardData() {
  await dbConnect();
  try {
    const invoiceCountPromise = Invoice.countDocuments();
    const customerCountPromise = Customer.countDocuments();
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

// 4. Fetch Filtered Invoices (for the Invoices Table with Search)
export async function fetchFilteredInvoices(query: string, currentPage: number) {
  await dbConnect();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await Invoice.aggregate([
      {
        $lookup: {
          from: 'customers', // Must match your MongoDB collection name
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer',
        },
      },
      { $unwind: '$customer' },
      {
        $match: {
          $or: [
            { 'customer.name': { $regex: query, $options: 'i' } },
            { 'customer.email': { $regex: query, $options: 'i' } },
            { status: { $regex: query, $options: 'i' } },
          ],
        },
      },
      { $sort: { date: -1 } },
      { $skip: offset },
      { $limit: ITEMS_PER_PAGE },
    ]);

    return invoices.map((invoice) => ({
      id: invoice._id.toString(),
      customer_id: invoice.customer_id.toString(),
      name: invoice.customer.name,
      email: invoice.customer.email,
      image_url: invoice.customer.image_url,
      amount: invoice.amount,
      date: invoice.date,
      status: invoice.status,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

// 5. Fetch Total Pages (for Pagination logic)
export async function fetchInvoicesPages(query: string) {
  await dbConnect();
  try {
    const count = await Invoice.aggregate([
      {
        $lookup: {
          from: 'customers',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer',
        },
      },
      { $unwind: '$customer' },
      {
        $match: {
          $or: [
            { 'customer.name': { $regex: query, $options: 'i' } },
            { 'customer.email': { $regex: query, $options: 'i' } },
            { status: { $regex: query, $options: 'i' } },
          ],
        },
      },
      { $count: 'total' },
    ]);

    const totalPages = Math.ceil((count[0]?.total || 0) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

// 6. Fetch all customers (for the dropdown in Create/Edit Invoice)
export async function fetchCustomers() {
  await dbConnect();
  try {
    const customers = await Customer.find({})
      .sort({ name: 1 })
      .lean();

    const formattedCustomers = customers.map((customer: any) => ({
      id: customer._id.toString(),
      name: customer.name,
    }));

    return formattedCustomers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

// 7. Fetch a single invoice by ID (for the Edit Invoice page)
import mongoose from 'mongoose';

export async function fetchInvoiceById(id: string) {
  await dbConnect();
  
  // 1. Validation Guard
  // If the ID isn't a valid hex string, findById will crash. 
  // We return null early to trigger the notFound() in your page.tsx.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  try {
    // 2. Fetch with .lean() for performance
    const invoice: any = await Invoice.findById(id).lean();

    // 3. Handle "Not Found" case
    if (!invoice) return null;

    // 4. Return a Plain Old JavaScript Object (POJO)
    return {
      id: invoice._id.toString(),
      customer_id: invoice.customer_id.toString(),
      amount: invoice.amount, 
      status: invoice.status,
    };
  } catch (error) {
    // Only log actual database/connection errors here
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

// 8. Fetch filtered customers (if you plan to use the Customers page)
export async function fetchFilteredCustomers(query: string) {
  await dbConnect();
  try {
    const data = await Customer.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
          ],
        },
      },
      {
        $lookup: {
          from: 'invoices',
          localField: '_id',
          foreignField: 'customer_id',
          as: 'invoices',
        },
      },
      {
        $project: {
          id: '$_id',
          name: 1,
          email: 1,
          image_url: 1,
          total_invoices: { $size: '$invoices' },
          total_pending: {
            $sum: {
              $map: {
                input: '$invoices',
                as: 'inv',
                in: { $cond: [{ $eq: ['$$inv.status', 'pending'] }, '$$inv.amount', 0] },
              },
            },
          },
          total_paid: {
            $sum: {
              $map: {
                input: '$invoices',
                as: 'inv',
                in: { $cond: [{ $eq: ['$$inv.status', 'paid'] }, '$$inv.amount', 0] },
              },
            },
          },
        },
      },
      { $sort: { name: 1 } },
    ]);

    return data.map((customer) => ({
      ...customer,
      id: customer._id.toString(),
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}