import { useState } from "react"
import { toast } from "react-toastify"
import { deleteCategory } from "../services/categoryService"

export const useDeleteCategory = () => {
    const [loadingDelete, setLoadingDelete] = useState(false)

    const handleDeleteProduct = async(categoryId: number)=>{
        setLoadingDelete(true)
        const res = await deleteCategory(categoryId)
        if(res.success) toast.success(res.message)
        else toast.error(res.error.message)
        setLoadingDelete(false)
    }

    return {
        loadingDelete,
        handleDeleteProduct
    }

}