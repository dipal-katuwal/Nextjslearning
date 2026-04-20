import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';



export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  // Fetching the formatted customer data for the table
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      
      <CustomersTable customers={customers} />
    </div>
  );
}