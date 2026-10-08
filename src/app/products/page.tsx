import type { Metadata } from "next";
import { dbGetAllProductsAsync } from "@/lib/db";
import ProductsClient from "./_components/ProductsClient";

export const metadata: Metadata = {
  title: "Our Menu — EgyTex",
  description:
    "Browse our full menu of fresh Egyptian food and desserts. Filter by category, sort by price, and order today.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const products = await dbGetAllProductsAsync();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1C1400]">Our Menu</h1>
        <p className="mt-2 text-gray-500">
          Fresh Egyptian food and desserts, made daily.
        </p>
      </div>

      <ProductsClient products={products} initialFilter={filter} />
    </div>
  );
}
