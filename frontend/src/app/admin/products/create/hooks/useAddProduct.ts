import { useState, useTransition } from "react";
import { createProduct } from "../actions/create-product";

export function useAddProduct(){
    const [loading, setLoading] = useState(false); // Usamos useState para controlar el estado de carga
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    const addProduct = async (product: { name: string, description: string, price: number, imagen: string }) => {
        setLoading(true);  // Comienza la carga
        setError(null);
        setSuccess(null);

        try {
            const result = await createProduct(product)
            if(result.success){
                setSuccess(true);  // El producto se creó exitosamente
            }else{
                throw new Error(result.message)
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Hubo un error');
        } finally {
            setLoading(false);  // Finaliza la carga independientemente de si es exitoso o hay un error
        }
    };

    return {
        loading,
        error,
        success,
        addProduct
    };
}