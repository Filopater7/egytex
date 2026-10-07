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

export type Category =
  | "desserts"
  | "cakes"
  | "pastries"
  | "savory-food"
  | "sandwiches"
  | "meals"
  | "other";

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
    slug: "desserts",
    label: "Desserts",
    description: "Sweet desserts & treats",
    icon: "🍮",
  },
  {
    slug: "cakes",
    label: "Cakes",
    description: "Fresh baked cakes for every occasion",
    icon: "🎂",
  },
  {
    slug: "pastries",
    label: "Pastries",
    description: "Flaky pastries & baked goods",
    icon: "🥐",
  },
  {
    slug: "savory-food",
    label: "Savory Food",
    description: "Delicious savory dishes & snacks",
    icon: "🍽️",
  },
  {
    slug: "sandwiches",
    label: "Sandwiches",
    description: "Fresh made-to-order sandwiches",
    icon: "🥪",
  },
  {
    slug: "meals",
    label: "Meals",
    description: "Full meals & hearty plates",
    icon: "🍛",
  },
  {
    slug: "other",
    label: "Other Products",
    description: "More delicious items",
    icon: "✨",
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
