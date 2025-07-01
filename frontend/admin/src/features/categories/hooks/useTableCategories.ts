import { useEffect, useRef, useState } from "react"
import { Bounce, toast } from "react-toastify"
import type { Category, FilterCategorySchema } from "../schemas/CategorySchema"
import { getCategories } from "../services/categoryService"
import { useModalFilterCategoryStore } from "../store/useModalFilterCategoryStore"


export const useTableCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [totalCategories, setTotalCategories] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const {filter} = useModalFilterCategoryStore()
    const hasRun = useRef(false)

  

    const getCategoriesForTable = async (page: number, filter: FilterCategorySchema)=>{
        if (hasRun.current) return
        hasRun.current = true
        setLoading(true)
        console.log("PAGINA ->>> ", page)
        const res = await getCategories(2, page, filter)
        if(res.success){
            setCategories(res.data.categories)
            setTotalCategories(res.data.total)
        }else{
            toast.error(res.error.message, {
                theme: "colored",
                transition: Bounce,
            });
        }
        setLoading(false)
        hasRun.current = false
    }

    useEffect(()=>{
        getCategoriesForTable(page, filter)
    }, [page])

    useEffect(()=>{
        console.log("FILTER >>> ", page)
        if(page == 1){
            getCategoriesForTable(1, filter)
        }else{
            setPage(1)
        }
        
    }, [filter])


    return {
        categories,
        totalCategories,
        loading,
        setPage,
        page
    }
}