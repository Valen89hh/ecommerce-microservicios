// app/api/auth/google/route.ts (App Router)
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(process.env.GOOGLE_AUTH_REDIRECT!);
}
