"use server";

import { cookies } from "next/headers";
import { ServerResponse } from "@/types/server-response";
import { LoginForm } from "../hooks/useFormLogin";

export async function loginUser(data: LoginForm): Promise<ServerResponse<string>> {
  try {
    const result = await fetch("http://backend:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const res = await result.json();

    if (res.authorisation?.token && res.user) {
      const cookieStore = cookies();

      // Token (solo servidor)
      (await
            // Token (solo servidor)
            cookieStore).set("token", res.authorisation.token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: "/",
      });

      // User (cliente + servidor)
      (await
            // User (cliente + servidor)
            cookieStore).set("user", encodeURIComponent(JSON.stringify(res.user)), {
        httpOnly: false,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return {
        success: true,
        data: "Usuario logueado correctamente"
      }
    }

    throw new Error(res.message)
  } catch (err) {
    return {
        success: false,
        error: err instanceof Error ? err.message : "Hubo un problema al registrar la cuenta"
    }
  }
}
