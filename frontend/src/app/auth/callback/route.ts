import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(new URL("/auth/error?reason=missing_token", process.env.NEXT_PUBLIC_FRONTEND_URL));
    }

    const result = await fetch("http://backend:8000/api/me", {
        method: "GET",
        headers: { 
            "Accept": "application/json",
            "Authorization": "bearer " + token 
        },
    });

    const data = await result.json()

    if(!data.user) return NextResponse.redirect(new URL("/error?type=auth&message=No se pudo obtener el usuario", process.env.NEXT_PUBLIC_FRONTEND_URL));

    // ✅ Guardar token en cookie httpOnly si quieres
    const cookieStore = cookies();

    // Token (solo servidor)
    (await
        // Token (solo servidor)
        cookieStore).set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: "/",
    });

    // User (cliente + servidor)
    (await
        // User (cliente + servidor)
        cookieStore).set("user", encodeURIComponent(JSON.stringify(data.user)), {
        httpOnly: false,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    return NextResponse.redirect(new URL("/admin/products", process.env.NEXT_PUBLIC_FRONTEND_URL));;
}
