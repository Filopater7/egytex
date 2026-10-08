import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <span className="text-7xl mb-6">🔍</span>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors">
          Go Home
        </Link>
        <Link href="/products" className="border border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold px-6 py-2.5 rounded-full transition-colors">
          Shop Products
        </Link>
      </div>
    </div>
  );
}
