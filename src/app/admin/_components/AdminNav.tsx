"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "📦" },
  { href: "/admin/products/new", label: "Add Product", icon: "➕" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-52 shrink-0 bg-gray-800 text-gray-300 flex flex-col hidden sm:flex">
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
  );
}
