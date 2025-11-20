// app/lib/data.ts
import postgres from "postgres";
import { 
  InvoicesTable, 
  CustomersTableType,
  InvoiceForm,
  Customer,
  Revenue 
} from "./definitions";
import { formatCurrency } from "./utils";

const sql = postgres(process.env.POSTGRES_URL!, { prepare: false });

/* -------------------------------
   FETCH FILTERED INVOICES
-------------------------------- */
export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const ITEMS_PER_PAGE = 6;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

/* -------------------------------
   FETCH FILTERED CUSTOMERS 
   (Now includes total_revenue)
-------------------------------- */
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

    const customers = rawData.map((c) => {
      const pending = Number(c.total_pending) || 0;
      const paid = Number(c.total_paid) || 0;

      return {
        ...c,
        total_pending: formatCurrency(pending),
        total_paid: formatCurrency(paid),
        total_revenue: formatCurrency(paid + pending), // <- FIXED!
      };
    });

    return customers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customers.");
  }
}

/* -------------------------------
   FETCH SINGLE INVOICE BY ID
-------------------------------- */
export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT * FROM invoices
      WHERE id = ${id}
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

/* -------------------------------
   FETCH ALL CUSTOMERS
-------------------------------- */
export async function fetchCustomers() {
  try {
    const customers = await sql<Customer[]>`
      SELECT id, name FROM customers ORDER BY name ASC
    `;

    return customers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customers.");
  }
}

/* -------------------------------
   FETCH REVENUE (CHART DATA)
-------------------------------- */
export async function fetchRevenue() {
  try {
    const data = await sql<Revenue[]>`
      SELECT * FROM revenue ORDER BY month
    `;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

/* -------------------------------
   FETCH INVOICES COUNT
-------------------------------- */
export async function fetchInvoicesCount() {
  try {
    const data = await sql`
      SELECT COUNT(*) FROM invoices
    `;

    return Number(data[0].count);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices count.");
  }
}

/* -------------------------------
   FETCH CUSTOMERS COUNT
-------------------------------- */
export async function fetchCustomersCount() {
  try {
    const data = await sql`
      SELECT COUNT(*) FROM customers
    `;
    return Number(data[0].count);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customer count.");
  }
}
