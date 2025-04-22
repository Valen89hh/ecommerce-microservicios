"use client"

import StepPayment from "@/features/chekout/components/StepPayment";
import StepSummary from "@/features/chekout/components/StepSummary";
import StepUserInfo from "@/features/chekout/components/StepUserInfo";
import { useCheckoutSteps } from "@/features/chekout/hooks/useCheckoutSteps";

const CheckoutPage = () => {
    const {next, back, step} = useCheckoutSteps()
    return ( 
        <div className="flex flex-col justify-center items-center min-h-screen container mx-auto px-6">
            <h1 className="text-2xl mb-6 text-gray-800 font-bold text-center">Pasarela de Pago</h1>
            {(step == 1) && <StepUserInfo onNextStep={next}/>}
            {(step == 2) && <StepPayment onPreviewStep={back} onNextStep={next}/>}
            {(step == 3) && <StepSummary onPreviewStep={back}/>}

        </div>
     );
}
 
export default CheckoutPage;