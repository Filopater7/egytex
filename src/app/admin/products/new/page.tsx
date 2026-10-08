import type { Metadata } from "next";
import Link from "next/link";
import ProductForm from "../_components/ProductForm";

export const metadata: Metadata = { title: "Add Product" };

export default function NewProductPage() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/admin/products" className="hover:text-amber-600 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Add New Product</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <ProductForm mode="new" />
      </div>
    </div>
  );
}
