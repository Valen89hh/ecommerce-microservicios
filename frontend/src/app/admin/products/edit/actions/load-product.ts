"use server"

import { Product } from "@/types/models-database"
import { ServerResponse } from "@/types/server-response"

const loadProduct = async(
    id: number
): Promise<ServerResponse<Product>> => {
    try{
        const result = await fetch("http://backend:8000/api/products/"+id)
        const data = await result.json()

        if(data.product){
            const pr = data.product
            return {
                data: {
                    id: pr.id,
                    name: pr.name,
                    description: pr.description,
                    price: pr.price,
                    image: pr.imagen
                },
                success: true
            }
        }

        throw new Error(data.message || "Producto no encontrado")
    }catch(err){
        return {
            error: err instanceof Error ? err.message : 'Hubo un problema desconocido',
            success: false
        }
    }
}
 
export {loadProduct} ;