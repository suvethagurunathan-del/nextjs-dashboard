import { CalendarIcon } from '@heroicons/react/24/outline';
import { Lusitana } from 'next/font/google';
import { Revenue } from '@/app/lib/definitions';

// Load Lusitana font
export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default async function RevenueChart({
  revenue,
}: {
  revenue: Revenue[];
}) {
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      {/* 🚧 Chart code not yet implemented — safe placeholder for now */}
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex items-center pb-2 pt-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>

        <p className="text-gray-500 text-sm mt-2">
          Chart coming soon...
        </p>
      </div>
    </div>
  );
}
