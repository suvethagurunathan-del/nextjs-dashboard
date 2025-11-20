import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">

      {/* Blue header bar */}
      <div className="rounded-lg bg-blue-500 p-4 mb-8">
        <p className={`${lusitana.className} text-white text-2xl`}>
          Acme
        </p>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-xl shadow">

        {/* Left Text Block */}
        <div className="max-w-md">
          <h1 className={`${lusitana.className} text-3xl mb-4`}>
            Welcome to Acme.
          </h1>

          <p className="text-gray-600 mb-4">
            This is the example for the{' '}
            <a href="#" className="text-blue-600 underline">
              Next.js Learn Course
            </a>, brought to you by Vercel.
          </p>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            Log in
          </button>
        </div>

        {/* Right Hero Image */}
        <Image
          src="/hero-desktop.png"
          width={1000}
          height={760}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />

        {/* Mobile Hero Image */}
        <Image
          src="/hero-mobile.png"
          width={560}
          height={620}
          className="block md:hidden mt-8"
          alt="Screenshot of the dashboard project showing mobile version"
        />
      </div>
    </main>
  );
}
