import { useEffect, useRef, useState } from "react"
import type { BestSellingProduct } from "../schemas/DashboardSchema"
import { getBestSellingProducts } from "../services/dashboardServices";
import { toast } from "react-toastify";

export const useBestSellingProducts = () => {
    const [products, setProducts] = useState<BestSellingProduct[]>([]);
    const [loading, setLoading] = useState(false)
    const hasRun = useRef(false);

    useEffect(()=>{
        if (hasRun.current) return
        hasRun.current = true
        async function init() {
            setLoading(true)
            const res = await getBestSellingProducts();
            if(res.success) setProducts(res.data)
            else toast.error(res.error.message)
            setLoading(false)
        }
        init()
    }, [])

    return {
        products,
        loading
    }
}