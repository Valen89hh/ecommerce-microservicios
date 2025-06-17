"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutUser() {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (token) {
        console.log(token)
        const result = await fetch("http://backend:8000/api/logout", {
            method: "POST",
            headers: { 
                "Accept": "application/json",
                "Authorization": "bearer " + token 
            },
        });
        console.log(result)
        const data = await result.json()

        if(data.satus){
            cookieStore.delete("token");
            cookieStore.delete("user");
        
            redirect("/login");
        }
        redirect("/error?type=logout&message="+data.message);
    }

    redirect("/error?type=logout&message=No existe token");
    
}
