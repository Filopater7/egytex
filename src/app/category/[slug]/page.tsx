import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  dbGetProductsByCategoryAsync,
  CATEGORIES,
} from "@/lib/db";
import { getCategoryLabel } from "@/lib/products";
import type { Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };

  return {
    title: `${cat.label} — EgyTex`,
    description: `Browse our ${cat.label.toLowerCase()} range — ${cat.description}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const products = await dbGetProductsByCategoryAsync(slug as Category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-amber-700 transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{cat.label}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{cat.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-[#1C1400]">{cat.label}</h1>
          <p className="text-gray-500 mt-1">{cat.description}</p>
        </div>
      </div>

      {/* Other categories */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="text-sm px-3 py-1.5 rounded-full border border-amber-200 text-gray-600 hover:border-amber-300 hover:text-amber-700 transition-colors"
          >
            {c.icon} {c.label}
          </Link>
        ))}
      </div>

      {/* Product count */}
      <p className="text-sm text-gray-500 mb-6">
        {products.length} product{products.length !== 1 ? "s" : ""} in {getCategoryLabel(slug as Category)}
      </p>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">📦</span>
          <h2 className="text-lg font-semibold text-gray-800">No products yet</h2>
          <p className="text-gray-500 mt-2 mb-6">Check back soon — we&apos;re adding new items regularly.</p>
          <Link href="/products" className="text-amber-600 hover:underline font-medium">
            Browse all products →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} showCategory={false} />
          ))}
        </div>
      )}
    </div>
  );
}
