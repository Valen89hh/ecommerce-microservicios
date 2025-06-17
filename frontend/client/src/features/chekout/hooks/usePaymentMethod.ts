import { useCheckoutStore } from "@/store/useCheckoutStore";
import { PaymentMethod } from "@/types/checkout-types";
import { useState } from "react";

export function usePaymentMethod(){
    const {setPaymentMethod: setPaymentMethodStore, paymentMethod: pm} = useCheckoutStore()
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(pm)

    const onSelectPaymentMethod = (data: PaymentMethod | null, onNextStep: ()=> void) => {
        console.log(data)
        if(data){
            console.log("Entrando")
            setPaymentMethodStore(data)
            onNextStep()
        }
    }

    return {
        paymentMethod,
        setPaymentMethod,
        onSelectPaymentMethod
    }
     
}