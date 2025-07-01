import { useParams } from "react-router-dom";
import Loader from "../../../components/ui/Loader";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import SmallText from "../../../components/texts/SmallText";
import type { Order } from "../schemas/OderSchema";
import { getOrder } from "../services/ordersServices";
import OrderDetails from "../components/OrderDetails";

const EditOrderPage = () => {
    const {id} = useParams()
    const hasRun = useRef(false)
    const [order, setOrder] = useState<Order | null>(null)

    useEffect(()=>{
        if (hasRun.current) return
        hasRun.current = true

        async function initCateogory(id: string) {
            const res = await getOrder(id)
            if(res.success){
                setOrder(res.data)
            }else{
                toast.error(res.error.message)
            }
        }

        if(id){
            initCateogory(id)
        }
    }, [id])

    if(order) return <OrderDetails order={order}/>

    return ( 
        <div className="w-full h-full flex justify-center items-center flex-col">
            <Loader/>
            <SmallText>Cargando...</SmallText>
        </div>
    );
}
 
export default EditOrderPage;