import type { Metadata } from "next";
import Link from "next/link";
import { dbGetAllProducts } from "@/lib/db";
import { CATEGORIES, formatPrice } from "@/lib/products";

export const metadata: Metadata = { title: "Dashboard — EgyTex Admin" };

export default function AdminDashboard() {
  const products = dbGetAllProducts();

  const totalProducts = products.length;
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const newCount = products.filter((p) => p.isNew).length;
  const featuredCount = products.filter((p) => p.isFeatured).length;

  // Products per category
  const byCat = CATEGORIES.map((cat) => ({
    ...cat,
    count: products.filter((p) => p.category === cat.slug).length,
  }));

  // 5 most recently added
  const recent = products.slice(0, 5);

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/admin/products/new"
          className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Products", value: totalProducts, color: "bg-amber-50 text-amber-700" },
          { label: "Inventory Value", value: formatPrice(totalValue), color: "bg-blue-50 text-blue-700" },
          { label: "New Arrivals", value: newCount, color: "bg-green-50 text-green-700" },
          { label: "Featured", value: featuredCount, color: "bg-yellow-50 text-yellow-700" },
          { label: "Low Stock", value: lowStock, color: "bg-orange-50 text-orange-700" },
          { label: "Out of Stock", value: outOfStock, color: "bg-red-50 text-red-700" },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-xl p-4 ${color}`}>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs font-medium mt-0.5 opacity-80">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products by category */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">By Category</h2>
          <ul className="space-y-2">
            {byCat.map((cat) => (
              <li key={cat.slug} className="flex items-center gap-3">
                <span className="text-xl w-6 text-center">{cat.icon}</span>
                <span className="flex-1 text-sm text-gray-700">{cat.label}</span>
                <span className="text-sm font-semibold text-gray-900 w-6 text-right">{cat.count}</span>
                <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${totalProducts ? (cat.count / totalProducts) * 100 : 0}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent products */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Recent Products</h2>
            <Link href="/admin/products" className="text-xs text-amber-600 hover:underline">
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {recent.map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.category} · {p.stock} in stock</p>
                </div>
                <span className="text-sm font-semibold text-gray-900 shrink-0">{formatPrice(p.price)}</span>
                <Link
                  href={`/admin/products/${p.id}/edit`}
                  className="text-xs text-amber-600 hover:underline shrink-0"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
