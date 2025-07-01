import { useState } from "react"
import { deleteProduct } from "../services/productService"
import { toast } from "react-toastify"

export const useDeleteProduct = () => {
    const [loadingDelete, setLoadingDelete] = useState(false)

    const handleDeleteProduct = async(productId: number)=>{
        setLoadingDelete(true)
        const res = await deleteProduct(productId)
        if(res.success) toast.success(res.message)
        else toast.error(res.error.message)
        setLoadingDelete(false)
    }

    return {
        loadingDelete,
        handleDeleteProduct
    }

}