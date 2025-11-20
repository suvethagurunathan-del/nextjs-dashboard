// app/lib/data.ts

import postgres from "postgres";
import { formatCurrency } from "app/lib/utils";

const sql = postgres(process.env.POSTGRES_URL!, { prepare: false });

/* ============================
   FETCH FILTERED CUSTOMERS
=============================== */
export async function fetchFilteredCustomers(query: string) {
  try {
    const rawData = await sql`
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
        customers.name ILIKE ${'%' + query + '%'} OR
        customers.email ILIKE ${'%' + query + '%'}
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC
    `;

    return rawData.map((c) => {
      const pending = Number(c.total_pending);
      const paid = Number(c.total_paid);

      return {
        ...c,
        total_pending: formatCurrency(pending),
        total_paid: formatCurrency(paid),
        total_revenue: formatCurrency(pending + paid), // final field
      };
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered customers.");
  }
}

/* ============================
   FETCH FILTERED INVOICES
=============================== */
export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const ITEMS_PER_PAGE = 6;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      LEFT JOIN customers ON invoices.customer_id = customers.id
      WHERE 
        customers.name ILIKE ${'%' + query + '%'} OR
        customers.email ILIKE ${'%' + query + '%'}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered invoices.");
  }
}
