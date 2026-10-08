import type { Metadata } from "next";
import { dbGetAllProductsAsync } from "@/lib/db";
import AdminProductsClient from "./_components/AdminProductsClient";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const products = await dbGetAllProductsAsync();

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Products</h1>
      <AdminProductsClient products={products} />
    </div>
  );
}
