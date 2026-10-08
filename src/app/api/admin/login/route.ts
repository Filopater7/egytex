import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || password !== process.env.ADMIN_SECRET) {
      // Delay response to slow down brute-force attempts
      await new Promise((r) => setTimeout(r, 1000));
      return Response.json({ error: "Invalid password." }, { status: 401 });
    }

    // Set a secure HTTP-only cookie valid for 8 hours
    const cookieStore = await cookies();
    cookieStore.set("admin_session", process.env.ADMIN_SECRET!, {
      httpOnly: true,       // not accessible via JS
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
}
