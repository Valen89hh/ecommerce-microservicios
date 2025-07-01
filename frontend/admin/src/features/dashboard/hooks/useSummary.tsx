import { useEffect, useRef, useState } from "react"
import type { Summary } from "../schemas/DashboardSchema"
import { getSummary } from "../services/dashboardServices";
import { toast } from "react-toastify";

export const useSummary = () => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const hasRun = useRef(false);

    useEffect(()=>{
        if (hasRun.current) return
        hasRun.current = true
        async function init() {
            const res = await getSummary();
            if(res.success) setSummary(res.data)
            else toast.error(res.error.message)
        }
        init()
    }, [])

    return {
        summary
    }
}