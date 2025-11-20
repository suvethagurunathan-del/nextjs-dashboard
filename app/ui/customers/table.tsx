// app/ui/customers/table.tsx

import Image from "next/image";
import {
  CustomersTableType,
  FormattedCustomersTable,
} from "@/app/lib/definitions";

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className="w-full">
      <div className="mt-4 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300 text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Total Invoices</th>
                    <th className="px-4 py-3 text-left font-semibold">Total Revenue</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url ?? "/default-avatar.png"}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{customer.name}</p>
                        </div>
                      </td>

                      <td className="px-4 py-4">{customer.email}</td>
                      <td className="px-4 py-4">{customer.total_invoices}</td>
                      <td className="px-4 py-4">${customer.total_revenue}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
