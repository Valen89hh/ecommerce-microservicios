// app/admin/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import type { ReactNode } from "react";

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    jwt.verify(token, SECRET_KEY); // Verifica firma y expiración
  } catch (err) {
    console.error("Token inválido o expirado:", err);
    redirect("/login");
  }

  return <>{children}</>;
}
