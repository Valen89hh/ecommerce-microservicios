"use server"

const createProduct = async (product: { name: string, description: string, price: number, imagen: string }) => {
    try {
        const response = await fetch('http://backend:8000/api/products/create', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });
        const data = await response.json()
        
        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }

        return {
            message: "Producto creado correctamente",
            success: true
        }
    } catch (err) {
        return {
            message: err instanceof Error ? err.message : 'Hubo un error',
            success: false
        }
    }
}
 
export { createProduct } ;