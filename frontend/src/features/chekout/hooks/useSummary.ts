import { useCartStore } from "@/store/useCartStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { UserInfo } from "@/types/checkout-types";
import { useEffect, useState } from "react";

export function useSummary(){
    const {customer, paymentMethod} = useCheckoutStore()
    const {products} = useCartStore()
    const [totalPay, setTotalPay] = useState(0)

    useEffect(()=>{
        let tp = 0
        products.forEach(pr=>{
            tp += pr.amount * pr.product.price
        })
        setTotalPay(tp)
    }, [])

    return {
        customer,
        paymentMethod,
        totalPay,
        products
    }
}