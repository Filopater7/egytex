import { dbGetAllProducts, dbCreateProduct } from "@/lib/db";
import type { Category } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = dbGetAllProducts();
  return Response.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    const required = ["name", "description", "fullDescription", "price", "image", "category", "stock"];
    for (const field of required) {
      if (body[field] === undefined || body[field] === "") {
        return Response.json({ error: `Field "${field}" is required.` }, { status: 400 });
      }
    }

    const validCategories: Category[] = ["sweet-food", "savory-food"];
    if (!validCategories.includes(body.category)) {
      return Response.json({ error: "Invalid category." }, { status: 400 });
    }

    const product = dbCreateProduct({
      name: String(body.name).trim(),
      description: String(body.description).trim(),
      fullDescription: String(body.fullDescription).trim(),
      price: Number(body.price),
      image: String(body.image).trim(),
      category: body.category as Category,
      stock: Number(body.stock),
      isNew: Boolean(body.isNew),
      isFeatured: Boolean(body.isFeatured),
    });

    return Response.json(product, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
}
