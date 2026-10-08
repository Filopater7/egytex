"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Failed to delete. Please try again.");
      setDeleting(false);
    }
  }

  if (!confirm) {
    return (
      <button
        onClick={() => setConfirm(true)}
        className="text-sm font-medium text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 px-4 py-1.5 rounded-lg transition-colors"
      >
        Delete &ldquo;{name}&rdquo;
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-red-700 font-medium">
        Are you sure? This will permanently delete &ldquo;{name}&rdquo;.
      </p>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
        >
          {deleting ? "Deleting…" : "Yes, Delete"}
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="text-sm text-gray-600 hover:text-gray-800 border border-gray-200 px-4 py-1.5 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
