import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AdminNav from "./_components/AdminNav";
import AdminLogout from "./_components/AdminLogout";

export const metadata: Metadata = {
  title: {
    default: "Admin — EgyTex",
    template: "%s | Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Admin top bar */}
      <header className="bg-[#1C1400] text-white px-4 sm:px-6 h-14 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 rounded-full overflow-hidden border border-amber-700/40">
            <Image
              src="/egytex-logo.png"
              alt="EgyTex"
              fill
              className="object-cover object-top scale-110"
            />
          </div>
          <span className="text-sm font-bold">
            <span className="text-amber-400">EGY</span>
            <span className="text-white">TEX</span>
          </span>
          <span className="text-sm text-amber-200 hidden sm:inline">Admin Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-amber-400 hover:text-white transition-colors flex items-center gap-1"
          >
            View Store ↗
          </Link>
          <AdminLogout />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AdminNav />

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 sm:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
