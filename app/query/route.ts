import { dbConnect } from '@/app/lib/dbConnect';
import { Invoice } from '@/app/lib/models';

export async function GET() {
  await dbConnect();

  try {
    // Equivalent to: SELECT invoices.amount, customers.name
    // FROM invoices JOIN customers ON invoices.customer_id = customers.id
    // WHERE invoices.amount = 666;
    
    const data = await Invoice.find({ amount: 666 })
      .populate('customer_id', 'name') // Only fetch the name from the Customer model
      .exec();

    // Map the data to clean up the MongoDB-specific fields if necessary
    const formattedData = data.map((invoice) => ({
      amount: invoice.amount,
      name: invoice.customer_id.name,
    }));

    return Response.json(formattedData);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}