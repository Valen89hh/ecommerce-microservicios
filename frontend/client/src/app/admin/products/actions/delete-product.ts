"use server"

import { ServerResponse } from "@/types/server-response";

export async function deleteProduct(productId: number): Promise<ServerResponse<string>>{
    try{
        const response = await fetch('http://backend:8000/api/products/'+productId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json()

        if(data.status == 200){
            return {
                success: true,
                data: data.message
            }
        }

        throw new Error(data.message)
    }catch(err){
        return {
            success: false,
            error: err instanceof Error ? err.message : "Hubo un problema desconocido"
        }
    }
}