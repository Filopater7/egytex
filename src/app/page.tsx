import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { dbGetNewProducts, dbGetFeaturedProducts, CATEGORIES } from "@/lib/db";

export const metadata: Metadata = {
  title: "EgyTex — Fresh Desserts & Delicious Food",
  description:
    "Shop authentic Egyptian desserts, fresh-baked cakes, pastries, savory meals, and more — crafted daily and delivered to your door.",
};

export default function HomePage() {
  const newProducts = dbGetNewProducts(6);
  const featuredProducts = dbGetFeaturedProducts(4);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
              Fresh items every day
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Fresh Desserts &<br />
              <span className="text-yellow-300">Delicious Food</span>,<br />
              Made Daily.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-teal-100 leading-relaxed max-w-xl">
              Authentic Egyptian desserts, fresh-baked cakes, pastries, savory meals and more — crafted daily and delivered to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 hover:text-teal-800 transition-colors shadow-md"
              >
                Shop Now
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </Link>
            </div>

            {/* trust badges */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-teal-100 text-sm">
              {["Fresh made daily", "Fast delivery", "Secure checkout"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="mt-2 text-gray-500">Find exactly what you need</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 hover:border-teal-300 hover:shadow-md transition-all text-center"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">
                  {cat.label}
                </span>
                <span className="text-xs text-gray-400 leading-tight line-clamp-2">
                  {cat.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Products ──────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">Fresh in</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">New Products</h2>
            </div>
            <Link href="/products?filter=new" className="text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Banner ────────────────────────────────────────────────────────── */}
      <section className="bg-teal-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Free Delivery on Orders Over 200 EGP</h2>
            <p className="mt-2 text-teal-200">Order your favourite food and we&apos;ll deliver it fresh to your door.</p>
          </div>
          <Link
            href="/products"
            className="shrink-0 bg-white text-teal-700 font-semibold px-7 py-3 rounded-full hover:bg-yellow-300 hover:text-teal-800 transition-colors shadow"
          >
            Start Shopping
          </Link>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">Hand-picked</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Featured Products</h2>
            </div>
            <Link href="/products?filter=featured" className="text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Shop With Us?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "👨‍🍳", title: "Made Fresh Daily", desc: "Every item is prepared fresh each morning using quality ingredients." },
              { icon: "🌿", title: "Natural Ingredients", desc: "No artificial preservatives. Real flavors, real food." },
              { icon: "🚚", title: "Fast Delivery", desc: "Orders dispatched within 2 hours. Free delivery over 200 EGP." },
              { icon: "⭐", title: "Trusted Quality", desc: "Hundreds of happy customers enjoy EgyTex food every day." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="text-4xl mb-3">{icon}</span>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
