"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";

export default function CartClient() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-6xl mb-5">🛒</span>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/products"
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const shipping = 0;
  const orderTotal = totalPrice;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* ── Cart items ──────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </h2>
          <button
            onClick={clearCart}
            className="text-sm text-red-400 hover:text-red-600 transition-colors"
          >
            Clear cart
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white rounded-2xl border border-amber-100 shadow-sm p-4"
            >
              {/* Image */}
              <Link href={`/products/${item.id}`} className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-amber-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.id}`} className="hover:text-amber-700 transition-colors">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm font-bold text-gray-900 mt-1">{formatPrice(item.price)}</p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Line total */}
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-900 font-medium transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>

      {/* ── Order summary ───────────────────────────────────────────────── */}
      <div className="w-full lg:w-80 shrink-0">
        <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6 lg:sticky lg:top-24">
          <h2 className="text-base font-bold text-gray-900 mb-5">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
              <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <div className="border-t border-amber-100 mt-4 pt-4 flex justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-amber-700">{formatPrice(orderTotal)}</span>
          </div>

          <button
            className="w-full mt-5 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transition-colors"
            onClick={() => alert("Checkout coming soon! Thank you for shopping with EgyTex!")}
          >
            Proceed to Checkout
          </button>

          <div className="mt-4 flex flex-col gap-1.5 text-xs text-gray-400 text-center">
            <span>🔒 Secure checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
