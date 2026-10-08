import { dbGetProductById, dbUpdateProduct, dbDeleteProduct } from "@/lib/db";
import type { Category } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/products/[id]">
) {
  const { id } = await ctx.params;
  const product = dbGetProductById(id);
  if (!product) return Response.json({ error: "Not found." }, { status: 404 });
  return Response.json(product);
}

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/products/[id]">
) {
  const { id } = await ctx.params;
  const existing = dbGetProductById(id);
  if (!existing) return Response.json({ error: "Not found." }, { status: 404 });

  try {
    const body = await request.json();

    const validCategories: Category[] = ["sweet-food", "savory-food"];
    if (body.category && !validCategories.includes(body.category)) {
      return Response.json({ error: "Invalid category." }, { status: 400 });
    }

    const updated = dbUpdateProduct(id, {
      ...(body.name !== undefined && { name: String(body.name).trim() }),
      ...(body.description !== undefined && { description: String(body.description).trim() }),
      ...(body.fullDescription !== undefined && { fullDescription: String(body.fullDescription).trim() }),
      ...(body.price !== undefined && { price: Number(body.price) }),
      ...(body.image !== undefined && { image: String(body.image).trim() }),
      ...(body.category !== undefined && { category: body.category as Category }),
      ...(body.stock !== undefined && { stock: Number(body.stock) }),
      ...(body.isNew !== undefined && { isNew: Boolean(body.isNew) }),
      ...(body.isFeatured !== undefined && { isFeatured: Boolean(body.isFeatured) }),
    });

    return Response.json(updated);
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  ctx: RouteContext<"/api/products/[id]">
) {
  const { id } = await ctx.params;
  const ok = dbDeleteProduct(id);
  if (!ok) return Response.json({ error: "Not found." }, { status: 404 });
  return Response.json({ success: true });
}
