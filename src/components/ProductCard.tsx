"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, getCategoryLabel } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export default function ProductCard({ product, showCategory = true }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-lg hover:border-amber-300 transition-all overflow-hidden">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-amber-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-amber-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              New
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-[#1C1400] text-white text-sm font-medium px-3 py-1 rounded-full">
              Out of stock
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {showCategory && (
          <span className="text-xs text-amber-700 font-medium uppercase tracking-wider">
            {getCategoryLabel(product.category)}
          </span>
        )}
        <Link href={`/products/${product.id}`} className="hover:text-amber-700 transition-colors">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-bold text-amber-800">
            {formatPrice(product.price)}
          </span>
          {product.stock > 0 && product.stock <= 5 && (
            <span className="text-xs text-orange-500 font-medium">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              added
                ? "bg-green-600 text-white"
                : product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700 text-white"
            }`}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
          <Link
            href={`/products/${product.id}`}
            className="px-3 py-2 rounded-lg border border-amber-200 text-sm font-medium text-amber-700 hover:border-amber-400 transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
