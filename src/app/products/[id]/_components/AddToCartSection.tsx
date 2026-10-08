"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/products";

export default function AddToCartSection({ product }: { product: Product }) {
  const { addItem, updateQuantity, items } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const cartItem = items.find((i) => i.id === product.id);

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-4">
      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        {product.stock > 0 && product.stock <= 5 && (
          <span className="text-sm font-medium text-orange-500">
            Only {product.stock} left in stock!
          </span>
        )}
      </div>

      {product.stock === 0 ? (
        <p className="text-red-500 font-medium">Out of stock</p>
      ) : (
        <>
          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">Qty:</span>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-xs text-gray-400">{product.stock} available</span>
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-colors ${
              added
                ? "bg-green-500 text-white"
                : "bg-amber-600 hover:bg-amber-700 text-white"
            }`}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>

          {cartItem && (
            <p className="text-xs text-amber-700 text-center">
              {cartItem.quantity} already in your cart
            </p>
          )}
        </>
      )}
    </div>
  );
}
