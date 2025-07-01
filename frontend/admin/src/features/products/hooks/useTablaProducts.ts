import { useEffect, useRef, useState } from "react"
import type { ProductTable } from "../schemas/Product"
import { getProducts } from "../services/productService"
import { Bounce, toast } from "react-toastify"
import { useModalFilterProductStore } from "../store/useModalFilterProductStore"
import type { FilterProductSchema } from "../schemas/FilterProductSchema"


export const useTableProducts = () => {
    const [products, setProducts] = useState<ProductTable[]>([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const {filter} = useModalFilterProductStore()
    const hasRun = useRef(false)

  

    const getProductsForTable = async (page: number, filter: FilterProductSchema)=>{
        if (hasRun.current) return
        hasRun.current = true
        setLoading(true)
        console.log("PAGINA ->>> ", page)
        const res = await getProducts(2, page, filter)
        if(res.success){
            setProducts(res.data.products)
            setTotalProducts(res.data.total)
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
        getProductsForTable(page, filter)
    }, [page])

    useEffect(()=>{
        console.log("FILTER >>> ", page)
        if(page == 1){
            getProductsForTable(1, filter)
        }else{
            setPage(1)
        }
        
    }, [filter])


    return {
        products,
        totalProducts,
        loading,
        setPage,
        page
    }
}