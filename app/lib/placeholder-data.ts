// app/lib/placeholder-data.ts

import { Customer, Invoice, Revenue } from './definitions';

export const customers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    image_url: '/customers/john.png',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    image_url: '/customers/jane.png',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    image_url: '/customers/michael.png',
  },
];

export const invoices: Invoice[] = [
  {
    id: 'inv-1',
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    id: 'inv-2',
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    id: 'inv-3',
    customer_id: customers[2].id,
    amount: 9850,
    status: 'paid',
    date: '2023-01-04',
  },
];

// ✅ ADD THIS — FIXES YOUR ERROR
export const users = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  },
  {
    id: 'u2',
    name: 'Staff User',
    email: 'staff@example.com',
    password: 'password123',
    role: 'staff',
  },
  {
    id: 'u3',
    name: 'Customer User',
    email: 'customer@example.com',
    password: 'password123',
    role: 'customer',
  },
];

export const revenue: Revenue[] = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
];
