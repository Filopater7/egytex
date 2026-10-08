import type { Metadata } from "next";
import CartClient from "./_components/CartClient";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the items in your shopping cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <CartClient />
    </div>
  );
}
