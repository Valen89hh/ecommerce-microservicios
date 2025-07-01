import { useEffect, useRef, useState } from "react"
import type { SaleStatistic } from "../schemas/DashboardSchema"
import { getSaleStatistic } from "../services/dashboardServices";
import { toast } from "react-toastify";

export const useSaleStatistic = () => {
    const [sales, setSales] = useState<SaleStatistic[]>([]);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("daily")
    const hasRun = useRef(false);

    useEffect(()=>{
        if (hasRun.current) return
        hasRun.current = true
        async function init(type: string) {
            setLoading(true)
            const res = await getSaleStatistic(type);
            if(res.success) setSales(res.data)
            else toast.error(res.error.message)
            setLoading(false)
            hasRun.current = false;
        }
        init(type)
    }, [type])

    return {
        sales,
        loading,
        type,
        setType
    }
}