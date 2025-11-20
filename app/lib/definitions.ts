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
  amount: number; // stored as cents (or smallest currency unit) in DB
  date: string; // ISO date string
  status: 'pending' | 'paid';
};

export type InvoicesTable = Invoice; // alias for clarity

export type InvoiceForm = {
  id?: string;
  customer_id: string;
  amount: number; // amount in dollars (or converted) depending on your usage
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

/**
 * Types used to model results returned from SQL queries that join tables
 * (raw values from DB, before formatting for display)
 */
export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  total_invoices?: number;
  total_pending?: number; // numeric value from DB
  total_paid?: number; // numeric value from DB
};

export type LatestInvoiceRaw = {
  id: string;
  name: string; // customer name
  email: string;
  image_url: string | null;
  amount: number; // numeric value from DB
  date: string; // ISO date string
};

/**
 * Formatted/UI-friendly types (strings for formatted currencies, etc.)
 * Components that render data will typically expect these.
 */

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  total_invoices: number;
  total_pending: string; // formatted currency string, e.g. "$12.34"
  total_paid: string; // formatted currency string
};

export type LatestInvoice = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  amount: string; // formatted currency string (e.g. "$123.45")
  date: string; // formatted date string for display (or keep ISO if you format in component)
};

/**
 * Utility / mapping notes:
 * - Use LatestInvoiceRaw when you fetch from DB (numeric amount).
 * - Convert amount to formatted string (e.g. formatCurrency) and map to LatestInvoice
 *   before passing to UI components that expect LatestInvoice.
 * - Similarly, map CustomersTableType -> FormattedCustomersTable by converting numeric
 *   totals to formatted currency strings.
 */
