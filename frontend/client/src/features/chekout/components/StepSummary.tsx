import Image from "next/image";
import Link from "next/link";
import { useSummary } from "../hooks/useSummary";

const StepSummary = ({
    onPreviewStep
}: {
    onPreviewStep: ()=>void
}) => {
    const {customer, paymentMethod, totalPay, products} = useSummary()
    return ( 
        <div className="space-y-4 max-w-2xl w-full md:w-3/4 lg:w-1/2">
            {customer && (
                <div>
                    <div>
                        <span>Nombre:</span>
                        <p>{customer.name}</p>
                    </div>
                    <div>
                        <span>Email:</span>
                        <p>{customer.email}</p>
                    </div>
                    <div>
                        <span>Direccion:</span>
                        <p>{customer.address}</p>
                    </div>
                </div>
            )}
            <div  className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
                {products.map((pr) => (

                    <div key={pr.product.id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
                        <Image
                            alt=""
                            src={pr.product.image}
                            width={600}
                            height={300}
                        />
                        <h3 className="text-xl font-semibold text-gray-800">{pr.product.name}</h3>
                        <p className="text-gray-600 my-2">{pr.product.description}</p>
                        <p className="text-gray-600 my-2">${pr.product.price}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2>Total Pay</h2>
                <h3>{totalPay}</h3>
            </div>
            <div className="flex justify-end items-center">
                <button onClick={onPreviewStep} type="submit" className="bg-sky-600 text-white rounded-md p-2 cursor-pointer">Anterior</button>
                <button type="submit" className="bg-sky-600 text-white rounded-md p-2 cursor-pointer">Pagar con {paymentMethod}</button>
            </div>
        </div>
    );
}
 
export default StepSummary;