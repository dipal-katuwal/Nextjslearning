'use server';

import { z } from 'zod';
import { dbConnect } from '@/app/lib/dbConnect';
import { Invoice } from '@/app/lib/models';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { User } from '@/app/lib/models';

export async function registerUser(
  prevState: string | undefined, 
  formData: FormData
) {
  let isSuccess = false;

  try {
    await dbConnect();
    
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password') as string;

    const userExists = await User.findOne({ email });
    if (userExists) return 'User already exists.';

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    isSuccess = true;
  } catch (error) {
    console.error(error);
    return 'Something went wrong during registration.';
  }

  // Next.js redirect must be called outside of try/catch
  if (isSuccess) {
    redirect('/login'); 
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
     invalid_type_error: 'Please select a customer.',

  }),
    

  amount: z.coerce.number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),

  
  status: z.enum(['pending', 'paid'],{
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // 1. Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

    if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  // 2. Prepare data for insertion
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString(); // Better to keep full ISO for MongoDB

  try {
    // 3. Connect to DB and Insert
    await dbConnect();
    await Invoice.create({
      customer_id: customerId, // Mapping Zod customerId to Mongoose customer_id
      amount: amountInCents,
      status: status,
      date: date,
    });
  } catch (error) {
    // We'll handle errors properly in the next chapter
     return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // 4. Revalidate the cache for the invoices page and redirect the user
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, prevState: State,formData: FormData) {
  // Validate the form data
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await dbConnect();
    await Invoice.findByIdAndUpdate(id, {
      customer_id: customerId, // Ensure this matches your model key
      amount: amountInCents,
      status: status,
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    

  
  try {
    await dbConnect();
    
    // In MongoDB/Mongoose, findByIdAndDelete is the standard way to remove a doc
    await Invoice.findByIdAndDelete(id);
    
    // This clears the client-side cache so the invoice disappears from the table immediately
    revalidatePath('/dashboard/invoices');
    
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }
}