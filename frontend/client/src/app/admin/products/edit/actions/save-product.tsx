"use server"

import { Product } from "@/types/models-database";
import { ServerResponse } from "@/types/server-response";

export async function saveProduct(product: Product): Promise<ServerResponse<string>>{
    try{
        const dataSend = {
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image
        }

        const result = await fetch("http://backend:8000/api/products/"+product.id, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataSend)
        })

        const data = await result.json()

        if(data.product) {
            return {
                success: true,
                data: data.message
            }
        }

        throw new Error(data.message)
    }catch(err){
        return {
            success: false,
            error: err instanceof Error ? err.message : "Hubo un problma desconocido"
        }
    }
}