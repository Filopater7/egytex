/**
 * Server-only data access layer.
 * Reads and writes from Supabase PostgreSQL database.
 *
 * All functions in this file run exclusively on the server (Route Handlers,
 * Server Components). Never import this file in a 'use client' module.
 */

import { createClient } from "@supabase/supabase-js";
import type { Product, Category } from "./products";
import { CATEGORIES } from "./products";

// Re-export shared types so callers only need one import
export type { Product, Category };
export { CATEGORIES };

// ─── Supabase client (server-side) ────────────────────────────────────────

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

// ─── Row mapper: Supabase snake_case → Product camelCase ──────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    fullDescription: row.full_description,
    price: Number(row.price),
    image: row.image,
    category: row.category as Category,
    stock: row.stock,
    isNew: row.is_new,
    isFeatured: row.is_featured,
    createdAt: row.created_at,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────

export function dbGetAllProducts(): Product[] {
  return [];
}

export function dbGetProductById(id: string): Product | undefined {
  void id;
  return undefined;
}

export function dbGetNewProducts(limit = 6): Product[] {
  void limit;
  return [];
}

export function dbGetFeaturedProducts(limit = 4): Product[] {
  void limit;
  return [];
}

export function dbGetProductsByCategory(category: Category): Product[] {
  void category;
  return [];
}

export function dbGetRelatedProducts(product: Product, limit = 4): Product[] {
  void product; void limit;
  return [];
}

export function dbCreateProduct(
  data: Omit<Product, "id" | "createdAt">
): Product {
  void data;
  throw new Error("Use dbCreateProductAsync instead");
}

export function dbUpdateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt">>
): Product | null {
  void id; void data;
  return null;
}

export function dbDeleteProduct(id: string): boolean {
  void id;
  return false;
}

// ─── Async API (used by Server Components and Route Handlers) ─────────────

export async function dbGetAllProductsAsync(): Promise<Product[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toProduct);
}

export async function dbGetProductByIdAsync(id: string): Promise<Product | undefined> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return undefined;
  return toProduct(data);
}

export async function dbGetNewProductsAsync(limit = 6): Promise<Product[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_new", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(toProduct);
}

export async function dbGetFeaturedProductsAsync(limit = 4): Promise<Product[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(toProduct);
}

export async function dbGetProductsByCategoryAsync(category: Category): Promise<Product[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toProduct);
}

export async function dbGetRelatedProductsAsync(product: Product, limit = 4): Promise<Product[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(toProduct);
}

export async function dbCreateProductAsync(
  data: Omit<Product, "id" | "createdAt">
): Promise<Product> {
  const supabase = getClient();

  // Generate URL-safe id from name
  const base = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Ensure uniqueness
  let id = base;
  let suffix = 0;
  while (true) {
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("id", id)
      .single();
    if (!existing) break;
    suffix++;
    id = `${base}-${suffix}`;
  }

  const row = {
    id,
    name: data.name,
    description: data.description,
    full_description: data.fullDescription,
    price: data.price,
    image: data.image,
    category: data.category,
    stock: data.stock,
    is_new: data.isNew,
    is_featured: data.isFeatured,
    created_at: new Date().toISOString(),
  };

  const { data: inserted, error } = await supabase
    .from("products")
    .insert(row)
    .select()
    .single();
  if (error) throw error;
  return toProduct(inserted);
}

export async function dbUpdateProductAsync(
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt">>
): Promise<Product | null> {
  const supabase = getClient();

  const updates: Record<string, unknown> = {};
  if (data.name !== undefined) updates.name = data.name;
  if (data.description !== undefined) updates.description = data.description;
  if (data.fullDescription !== undefined) updates.full_description = data.fullDescription;
  if (data.price !== undefined) updates.price = data.price;
  if (data.image !== undefined) updates.image = data.image;
  if (data.category !== undefined) updates.category = data.category;
  if (data.stock !== undefined) updates.stock = data.stock;
  if (data.isNew !== undefined) updates.is_new = data.isNew;
  if (data.isFeatured !== undefined) updates.is_featured = data.isFeatured;

  const { data: updated, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) return null;
  return toProduct(updated);
}

export async function dbDeleteProductAsync(id: string): Promise<boolean> {
  const supabase = getClient();
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  return !error;
}
