// app/api/session/route.js
import { cookies } from "next/headers";
import { authAdmin } from "@/app/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return new Response(JSON.stringify({ error: "Missing ID token" }), {
        status: 400,
      });
    }

    // Session expiry: 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    // Create session cookie from Firebase ID token
    const sessionCookie = await authAdmin.createSessionCookie(idToken, {
      expiresIn,
    });

    // Store session as HTTP-only cookie
    cookies().set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only secure in production
      path: "/",
      maxAge: expiresIn / 1000,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error creating session cookie:", err);
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
}
