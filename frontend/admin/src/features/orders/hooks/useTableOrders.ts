import { useEffect, useRef, useState } from "react"
import { Bounce, toast } from "react-toastify"
import type { FilterOrderSchema, Order } from "../schemas/OderSchema"
import { useModalFilterOrderStore } from "../store/useModalFilterOrdersStore"
import { getOrders } from "../services/ordersServices"


export const useTableOrders = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [totalOrders, setTotalOrders] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const {filter} = useModalFilterOrderStore()
    const hasRun = useRef(false)

  

    const getOrdersForTable = async (page: number, filter: FilterOrderSchema)=>{
        if (hasRun.current) return
        hasRun.current = true
        setLoading(true)
        console.log("PAGINA ->>> ", page)
        const res = await getOrders(2, page, filter)
        if(res.success){
            setOrders(res.data.orders)
            setTotalOrders(res.data.total)
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
        getOrdersForTable(page, filter)
    }, [page])

    useEffect(()=>{
        console.log("FILTER >>> ", page)
        if(page == 1){
            getOrdersForTable(1, filter)
        }else{
            setPage(1)
        }
        
    }, [filter])


    return {
        orders,
        totalOrders,
        loading,
        setPage,
        page
    }
}