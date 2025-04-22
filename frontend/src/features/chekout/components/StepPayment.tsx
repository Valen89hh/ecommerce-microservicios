import { PaymentMethod } from "@/types/checkout-types";
import { usePaymentMethod } from "../hooks/usePaymentMethod";

const StepPayment = ({
    onNextStep,
    onPreviewStep
}: {
    onNextStep: ()=>void,
    onPreviewStep: ()=>void
}) => {
    const {paymentMethod, setPaymentMethod, onSelectPaymentMethod} = usePaymentMethod()

    return ( 
        <div className="space-y-4 max-w-2xl w-full md:w-3/4 lg:w-1/2">
            <div>
                <input 
                    value={PaymentMethod.MercadoPago} 
                    onChange={()=>setPaymentMethod(PaymentMethod.MercadoPago)} 
                    checked={paymentMethod === PaymentMethod.MercadoPago}
                    type="radio" 
                    id="mercado_pago" 
                />
                <label htmlFor="mercado_pago">Mercado Pago: Puedes pagar con tarjeta de credito, debito o Yape</label>
            </div>
            <div>
                <input 
                    value={PaymentMethod.OxaPay} 
                    onChange={()=>setPaymentMethod(PaymentMethod.OxaPay)} 
                    checked={paymentMethod === PaymentMethod.OxaPay}
                    type="radio" 
                    id="oxa_pay" 
                />
                <label htmlFor="oxa_pay">Oxa Pay: Puedes pagar con criptomonedas BTC, USDT</label>
            </div>
            <div className="flex justify-end items-center">
                <button onClick={onPreviewStep} type="submit" className="bg-sky-600 text-white rounded-md p-2 cursor-pointer">Anterior</button>
                <button disabled={!paymentMethod} onClick={()=>onSelectPaymentMethod(paymentMethod, onNextStep)} type="submit" className="bg-sky-600 disabled:bg-amber-700 text-white rounded-md p-2 cursor-pointer">Continuar</button>
            </div>
        </div>
     );
}
 
export default StepPayment;