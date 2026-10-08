/**
 * Shared product types, category definitions, and helper utilities.
 *
 * The storefront pages (Server Components) should import helpers from
 * src/lib/db.ts (which reads the live JSON store).
 *
 * This file still exports the types and CATEGORIES so that client-side
 * components (ProductCard, filters, etc.) can import them without pulling
 * in fs/path (which are server-only).
 */

export type Category = "sweet-food" | "savory-food";

export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  /**
   * Image URL or public path.
   * Use a full https:// URL for external images, or a /public path like
   * "/images/products/my-product.jpg" for locally hosted images.
   *
   * During development, placeholder images are generated automatically via
   * placehold.co. Replace these values in src/data/products.json (or via the
   * Admin panel) with real image URLs when you have actual photos.
   */
  image: string;
  category: Category;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  createdAt: string; // ISO date string
}

export const CATEGORIES: {
  slug: Category;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    slug: "sweet-food",
    label: "Sweet Food",
    description: "Desserts, cakes, pastries & sweets",
    icon: "🍮",
  },
  {
    slug: "savory-food",
    label: "Savory Food",
    description: "Meals, sandwiches & savory dishes",
    icon: "🍽️",
  },
];

// ─── Formatting helpers (safe for client use) ─────────────────────────────

export function getCategoryLabel(slug: Category): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
