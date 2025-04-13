import { Product } from "@/types/models-database";
import { ServerResponse } from "@/types/server-response";

export async function loadProducts(): Promise<ServerResponse<Product[]>>{
    try{
        const result = await fetch("http://backend:8000/api/products/")
        const data = await result.json()

        if(data){
            const pr = data.product
            return {
                data: data.map((product: { id: number, name: string, description: string, price: number, imagen: string })=> ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.imagen
                })),
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