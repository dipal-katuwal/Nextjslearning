import { dbConnect } from '@/app/lib/dbConnect';
import { Invoice, Customer, Revenue, User } from '@/app/lib/models';
import { invoices, customers, revenue, users } from '@/app/lib/placeholder-data';
import bcrypt from 'bcrypt';

export async function GET() {
  await dbConnect();

  try {
    // 1. Seed Users (Hashing passwords first)
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      }),
    );
    await User.deleteMany({}); // Optional: clear existing
    await User.insertMany(hashedUsers);

    // 2. Seed Customers
    await Customer.deleteMany({});
    const createdCustomers = await Customer.insertMany(customers);

    // 3. Seed Invoices 
    // Important: Link invoices to the new MongoDB ObjectIDs of customers
    const updatedInvoices = invoices.map((invoice) => {
      const customer = createdCustomers.find((c) => c.email === customers.find(pc => pc.id === invoice.customer_id)?.email);
      return { ...invoice, customer_id: customer?._id };
    });
    
    await Invoice.deleteMany({});
    await Invoice.insertMany(updatedInvoices);

    // 4. Seed Revenue
    await Revenue.deleteMany({});
    await Revenue.insertMany(revenue);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}