// app/lib/definitions.ts

/**
 * Core entity shapes (raw / DB shapes)
 */

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
};

export type CustomerField = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type InvoicesTable = Invoice;

export type InvoiceForm = {
  id?: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

/**
 * Raw DB join results
 */

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  total_invoices?: number;
  total_pending?: number;
  total_paid?: number;
};

/**
 * Latest invoice from DB
 */
export type LatestInvoiceRaw = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  amount: number;
  date: string;
};

/**
 * UI-friendly types (formatted)
 */

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  total_invoices: number;
  total_pending: string;
  total_paid: string;

  /** REQUIRED FOR YOUR TABLE — ADD THIS FIELD **/
  total_revenue: string;
};

export type LatestInvoice = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  amount: string;
  date: string;
};
