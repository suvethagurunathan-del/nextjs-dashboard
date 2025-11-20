import postgres from 'postgres';
import { formatCurrency } from './utils';
import { CustomersTableType } from './definitions';   // <-- Make sure this exists

// Create SQL client
const sql = postgres(process.env.POSTGRES_URL!, { prepare: false });

export async function fetchFilteredCustomers(query: string) {
  try {
    const rawData = await sql<CustomersTableType[]>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
      GROUP BY 
        customers.id, 
        customers.name, 
        customers.email, 
        customers.image_url
      ORDER BY customers.name ASC
    `;

    // Convert database values → formatted UI values
    const customers = rawData.map((c) => ({
      ...c,
      total_pending: formatCurrency(Number(c.total_pending)),
      total_paid: formatCurrency(Number(c.total_paid)),
    }));

    return customers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered customers.");
  }
}
