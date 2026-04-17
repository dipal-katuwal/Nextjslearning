'use server';
import { dbConnect } from './dbConnect';
import { Invoice } from './models';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createInvoice(formData: FormData) {
  await dbConnect();
  const { customerId, amount, status } = Object.fromEntries(formData);

  await Invoice.create({
    customer_id: customerId,
    amount: Number(amount) * 100, // Storing in cents
    status: status,
    date: new Date(),
  });

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}