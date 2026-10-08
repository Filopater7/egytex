import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, dbGetProductsByCategory } from "@/lib/db";

export const metadata: Metadata = {
  title: "Our Menu — EgyTex",
  description:
    "Browse our Egyptian food menu by category — sweet food and savory food, made fresh daily.",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1C1400]">Our Menu</h1>
        <p className="mt-2 text-gray-500">Browse our menu by category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const count = dbGetProductsByCategory(cat.slug).length;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex items-center gap-5 p-6 bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-md hover:border-amber-300 transition-all"
            >
              <span className="text-5xl shrink-0">{cat.icon}</span>
              <div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {cat.label}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">{cat.description}</p>
                <p className="text-xs text-amber-600 font-medium mt-2">
                  {count} product{count !== 1 ? "s" : ""} →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
