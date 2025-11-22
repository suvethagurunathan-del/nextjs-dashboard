'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';

export default function Pagination({ totalPages }: { totalPages: number }) {
  // Pagination feature will be implemented later
  if (!totalPages || totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-6">
      <p className="text-sm text-gray-500">
        Pagination coming soon...
      </p>
    </nav>
  );
}
