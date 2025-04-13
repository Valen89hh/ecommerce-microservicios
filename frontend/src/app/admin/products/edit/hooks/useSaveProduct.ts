import { Product } from "@/types/models-database";
import { ServerResponse } from "@/types/server-response";
import { useState } from "react";
import { saveProduct } from "../actions/save-product";

export function useSaveProduct(){
    const [loadingSaveProduct, setloadingSaveProduct] = useState(false)
    const [resultSaveProduct, setResultSaveProduct] = useState<ServerResponse<string>|null>(null)

    const onSaveProduct = async(product: Product) => {
        setloadingSaveProduct(true)
        const result = await saveProduct(product)
        setResultSaveProduct(result)
        setloadingSaveProduct(false)
    }

    return {
        loadingSaveProduct,
        resultSaveProduct,
        onSaveProduct
    }
     
}