import { useEffect, useRef, useState } from "react"
import { getRecentOrders } from "../services/dashboardServices";
import { toast } from "react-toastify";
import type { Order } from "../../orders/schemas/OderSchema";

export const useRecentOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false)
    const hasRun = useRef(false);

    useEffect(()=>{
        if (hasRun.current) return
        hasRun.current = true
        async function init() {
            setLoading(true)
            const res = await getRecentOrders();
            if(res.success) setOrders(res.data)
            else toast.error(res.error.message)
            setLoading(false)
        }
        init()
    }, [])

    return {
        orders,
        loading
    }
}