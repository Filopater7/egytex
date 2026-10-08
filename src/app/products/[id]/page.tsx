import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  dbGetProductById,
  dbGetRelatedProducts,
  CATEGORIES,
} from "@/lib/db";
import { getCategoryLabel } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import AddToCartSection from "./_components/AddToCartSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = dbGetProductById(id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = dbGetProductById(id);
  if (!product) notFound();

  const related = dbGetRelatedProducts(product, 4);
  const categoryMeta = CATEGORIES.find((c) => c.slug === product.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-400 mb-8 flex-wrap">
        <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-amber-700 transition-colors">Shop</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-amber-700 transition-colors capitalize">
          {getCategoryLabel(product.category)}
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-amber-50 border border-amber-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-amber-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                New
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-yellow-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          {/* Category badge */}
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-1.5 w-fit text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full hover:bg-amber-100 transition-colors"
          >
            {categoryMeta?.icon} {getCategoryLabel(product.category)}
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1400] leading-tight">
            {product.name}
          </h1>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Add to cart — Client Component */}
          <AddToCartSection product={product} />

          {/* Divider */}
          <hr className="border-amber-100" />

          {/* Full description */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Product Details
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{product.fullDescription}</p>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-amber-50 rounded-xl p-3">
              <p className="text-gray-400 text-xs mb-0.5">Category</p>
              <p className="font-medium text-gray-800">{getCategoryLabel(product.category)}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3">
              <p className="text-gray-400 text-xs mb-0.5">Availability</p>
              <p className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#1C1400] mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
