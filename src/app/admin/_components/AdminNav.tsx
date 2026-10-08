"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "📦" },
  { href: "/admin/products/new", label: "Add", icon: "➕" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop sidebar ───────────────────────────────────────────── */}
      <aside className="w-52 shrink-0 bg-gray-800 text-gray-300 flex-col hidden sm:flex">
        <nav className="flex flex-col gap-1 p-3 pt-4">
          {LINKS.map(({ href, label, icon }) => {
            const active =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-amber-600 text-white"
                    : "hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ── Mobile bottom nav ─────────────────────────────────────────── */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 flex items-center justify-around px-2 py-2">
        {LINKS.map(({ href, label, icon }) => {
          const active =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-colors ${
                active
                  ? "text-amber-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
