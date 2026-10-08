"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, formatPrice } from "@/lib/products";
import type { Product, Category } from "@/lib/products";

type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc";
type FilterOption = "all" | "new" | "featured";

interface Props {
  products: Product[];
  initialFilter?: string;
}

export default function ProductsClient({ products, initialFilter }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [filter, setFilter] = useState<FilterOption>(
    initialFilter === "new"
      ? "new"
      : initialFilter === "featured"
      ? "featured"
      : "all"
  );

  const filtered = useMemo(() => {
    let result = [...products];

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // filter badge
    if (filter === "new") result = result.filter((p) => p.isNew);
    if (filter === "featured") result = result.filter((p) => p.isFeatured);

    // sort
    result.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      // newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [products, search, category, sort, filter]);

  const priceRange = useMemo(() => {
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* ── Sidebar filters ─────────────────────────────────────────────── */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5 space-y-6 lg:sticky lg:top-24">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Search
            </label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input
                id="search"
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Category</p>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setCategory("all")}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    category === "all" ? "bg-amber-50 text-amber-700 font-semibold" : "text-gray-600 hover:bg-amber-50"
                  }`}
                >
                  All Categories
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => setCategory(cat.slug)}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
                      category === cat.slug ? "bg-amber-50 text-amber-700 font-semibold" : "text-gray-600 hover:bg-amber-50"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Filter */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Filter</p>
            <ul className="space-y-1">
              {(["all", "new", "featured"] as FilterOption[]).map((f) => (
                <li key={f}>
                  <button
                    onClick={() => setFilter(f)}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors capitalize ${
                      filter === f ? "bg-amber-50 text-amber-700 font-semibold" : "text-gray-600 hover:bg-amber-50"
                    }`}
                  >
                    {f === "all" ? "All Products" : f === "new" ? "New Arrivals" : "Featured"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price range info */}
          <div className="text-xs text-gray-400 pt-1 border-t border-gray-100">
            Price range: {formatPrice(priceRange.min)} – {formatPrice(priceRange.max)}
          </div>

          {/* Reset */}
          <button
            onClick={() => { setSearch(""); setCategory("all"); setSort("newest"); setFilter("all"); }}
            className="w-full text-sm text-amber-600 hover:text-amber-800 font-medium transition-colors"
          >
            Reset all filters
          </button>
        </div>
      </aside>

      {/* ── Product grid ────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-800">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-500 shrink-0">Sort by:</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearch(""); setCategory("all"); setFilter("all"); }}
              className="mt-4 text-sm text-amber-700 hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
