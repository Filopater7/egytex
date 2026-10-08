import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dbGetProductByIdAsync } from "@/lib/db";
import { formatPrice } from "@/lib/products";
import ProductForm from "../../_components/ProductForm";
import DeleteButton from "../../_components/DeleteButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await dbGetProductByIdAsync(id);
  return { title: product ? `Edit: ${product.name}` : "Product Not Found" };
}

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const { id } = await params;
  const { created } = await searchParams;
  const product = await dbGetProductByIdAsync(id);
  if (!product) notFound();

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/admin/products" className="hover:text-amber-600 transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      {created && (
        <div className="mb-5 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <span>✅</span>
          <span>
            <strong>{product.name}</strong> was created successfully!{" "}
            <Link href={`/products/${product.id}`} target="_blank" className="underline">
              View on store ↗
            </Link>
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-amber-700">{formatPrice(product.price)}</p>
          <p className="text-xs text-gray-400">{product.stock} in stock</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <ProductForm mode="edit" initialData={product} />
      </div>

      {/* Danger zone */}
      <div className="mt-8 bg-red-50 border border-red-100 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-red-700 mb-1">Danger Zone</h2>
        <p className="text-xs text-red-500 mb-3">
          Deleting a product is permanent and cannot be undone.
        </p>
        <DeleteButton id={product.id} name={product.name} />
      </div>
    </div>
  );
}
