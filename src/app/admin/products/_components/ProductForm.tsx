"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/products";
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
  category: "sweet-food",
  stock: 0,
  isNew: false,
  isFeatured: false,
};

function formatEGP(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

export default function ProductForm({ mode, initialData }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
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

  // ─── Image upload via secure API route ───────────────────────────────────
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      setError("Only JPEG, PNG, WebP, or GIF images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }

    setUploading(true);
    setUploadProgress("Uploading…");
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed.");

      setForm((prev) => ({ ...prev, image: data.url }));
      setUploadProgress("✓ Uploaded successfully");
      setTimeout(() => setUploadProgress(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
      setUploadProgress("");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // ─── Form submit ──────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) { setError("Product name is required."); return; }
    if (!form.description.trim()) { setError("Short description is required."); return; }
    if (!form.fullDescription.trim()) { setError("Full description is required."); return; }
    if (form.price <= 0) { setError("Price must be greater than 0."); return; }
    if (!form.image.trim()) { setError("Product image is required."); return; }
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
  const pricePreview = form.price > 0 ? formatEGP(form.price) : null;

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
          placeholder="e.g. Kunafa bil Qeshta"
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
          placeholder="Detailed product description with ingredients, serving size, preparation…"
          className={INPUT + " resize-none"}
          required
        />
      </Field>

      {/* Image upload */}
      <Field label="Product Image" required>
        {/* Upload button */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-2 w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            uploading
              ? "border-amber-300 bg-amber-50"
              : "border-amber-200 hover:border-amber-400 hover:bg-amber-50 bg-white"
          }`}
        >
          {uploading ? (
            <>
              <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-amber-600 font-medium">Uploading…</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-amber-600">Click to upload</span> a photo
              </span>
              <span className="text-xs text-gray-400">JPEG, PNG, WebP or GIF — max 5 MB</span>
            </>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageUpload}
          className="hidden"
          disabled={uploading}
        />

        {/* Upload success message */}
        {uploadProgress && (
          <p className="text-xs text-green-600 mt-1">{uploadProgress}</p>
        )}

        {/* OR divider + manual URL fallback */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">or paste a URL</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
        <input
          name="image"
          type="text"
          value={form.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className={INPUT + " mt-2"}
        />

        {/* Image preview */}
        {form.image && (
          <div className="mt-3 w-40 h-28 rounded-xl overflow-hidden border border-amber-100 bg-amber-50">
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
            className="w-4 h-4 accent-amber-600"
          />
          <span className="text-sm font-medium text-gray-700">
            Mark as <span className="text-amber-600">New</span>
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
          disabled={saving || uploading}
          className="bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
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
            className="ml-auto text-xs text-amber-600 hover:underline"
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
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white";
