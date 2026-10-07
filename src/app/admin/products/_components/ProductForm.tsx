"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, formatPrice } from "@/lib/products";
import type { Product, Category } from "@/lib/products";

type FormMode = "new" | "edit";

interface Props {
  mode: FormMode;
  initialData?: Product;
}

const EMPTY: Omit<Product, "id" | "createdAt"> = {
  name: "",
  description: "",
  fullDescription: "",
  price: 0,
  image: "",
  category: "desserts",
  stock: 0,
  isNew: false,
  isFeatured: false,
};

export default function ProductForm({ mode, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Omit<Product, "id" | "createdAt">>(
    initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          fullDescription: initialData.fullDescription,
          price: initialData.price,
          image: initialData.image,
          category: initialData.category,
          stock: initialData.stock,
          isNew: initialData.isNew,
          isFeatured: initialData.isFeatured,
        }
      : EMPTY
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "price" || name === "stock"
          ? value === "" ? 0 : Number(value)
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!form.name.trim()) { setError("Product name is required."); return; }
    if (!form.description.trim()) { setError("Short description is required."); return; }
    if (!form.fullDescription.trim()) { setError("Full description is required."); return; }
    if (form.price <= 0) { setError("Price must be greater than 0."); return; }
    if (!form.image.trim()) { setError("Image URL is required."); return; }
    if (form.stock < 0) { setError("Stock cannot be negative."); return; }

    setSaving(true);
    try {
      const url = mode === "new" ? "/api/products" : `/api/products/${initialData!.id}`;
      const method = mode === "new" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong.");
      }

      const saved: Product = await res.json();

      if (mode === "new") {
        router.push(`/admin/products/${saved.id}/edit?created=1`);
      } else {
        setSuccess("Product updated successfully.");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  }

  // Live price preview
  const pricePreview = form.price > 0 ? formatPrice(form.price) : null;

  // Generate placeholder image helper
  function usePlaceholder() {
    const label = form.name || "Product";
    setForm((prev) => ({
      ...prev,
      image: `https://placehold.co/600x450/0d9488/ffffff/png?text=${encodeURIComponent(label)}`,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
          {success}
        </div>
      )}

      {/* Name */}
      <Field label="Product Name" required>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Premium White Bath Towel"
          className={INPUT}
          required
        />
      </Field>

      {/* Category + Price + Stock row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Category" required>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={INPUT}
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={`Price (USD)${pricePreview ? ` — ${pricePreview}` : ""}`} required>
          <input
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={form.price || ""}
            onChange={handleChange}
            placeholder="0.00"
            className={INPUT}
            required
          />
        </Field>

        <Field label="Stock" required>
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock || ""}
            onChange={handleChange}
            placeholder="0"
            className={INPUT}
            required
          />
        </Field>
      </div>

      {/* Short description */}
      <Field label="Short Description" hint="Shown on product cards (1–2 sentences)" required>
        <input
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="Brief summary shown on product cards"
          maxLength={150}
          className={INPUT}
          required
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {form.description.length}/150
        </p>
      </Field>

      {/* Full description */}
      <Field label="Full Description" hint="Shown on the product detail page" required>
        <textarea
          name="fullDescription"
          value={form.fullDescription}
          onChange={handleChange}
          rows={5}
          placeholder="Detailed product description with features, dimensions, materials…"
          className={INPUT + " resize-none"}
          required
        />
      </Field>

      {/* Image */}
      <Field
        label="Image URL"
        hint="Paste a full https:// URL, or a /public path like /images/products/my-photo.jpg"
        required
      >
        <div className="flex gap-2">
          <input
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={INPUT + " flex-1"}
          />
          <button
            type="button"
            onClick={usePlaceholder}
            className="shrink-0 text-xs px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
            title="Generate a placeholder image from the product name"
          >
            Use placeholder
          </button>
        </div>
        {form.image && (
          <div className="mt-3 w-32 h-24 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
            {/* Plain <img> — avoids next/image hostname restrictions in the admin preview */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.image}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </Field>

      {/* Flags */}
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            name="isNew"
            type="checkbox"
            checked={form.isNew}
            onChange={handleChange}
            className="w-4 h-4 accent-teal-600"
          />
          <span className="text-sm font-medium text-gray-700">
            Mark as <span className="text-teal-600">New</span>
          </span>
          <span className="text-xs text-gray-400">(appears in New Products section)</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            name="isFeatured"
            type="checkbox"
            checked={form.isFeatured}
            onChange={handleChange}
            className="w-4 h-4 accent-amber-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Mark as <span className="text-amber-600">Featured</span>
          </span>
          <span className="text-xs text-gray-400">(appears in Featured section)</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button
          type="submit"
          disabled={saving}
          className="bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
        >
          {saving
            ? mode === "new" ? "Creating…" : "Saving…"
            : mode === "new" ? "Create Product" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Cancel
        </button>
        {mode === "edit" && initialData && (
          <a
            href={`/products/${initialData.id}`}
            target="_blank"
            className="ml-auto text-xs text-teal-600 hover:underline"
          >
            View on store ↗
          </a>
        )}
      </div>
    </form>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────
function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
        {hint && <span className="ml-1.5 text-xs font-normal text-gray-400">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

const INPUT =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white";
