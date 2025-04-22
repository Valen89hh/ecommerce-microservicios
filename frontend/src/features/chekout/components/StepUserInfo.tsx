import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useUserInfo } from "../hooks/useUserInfo";

const StepUserInfo = ({
    onNextStep
}: {
    onNextStep: ()=>void
}) => {
    const {userInfoForm, handleSubmit, errors, updateField} = useUserInfo()
    const {setCustomer} = useCheckoutStore()
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSubmit(data=>{
            setCustomer(data)
            onNextStep()
        })
    }

    return ( 
        <form onSubmit={onSubmit} className="space-y-4 max-w-2xl w-full md:w-3/4 lg:w-1/2">
            <div className="w-full flex justify-between gap-4">
                <label htmlFor="nombre" className="text-gray-800 font-semibold">Nombre: </label>
                <input value={userInfoForm.name} onChange={e=>updateField("name", e.target.value)} type="text" id="nombre" className="w-[80%] outline-none border-b-2 border-gray-700" placeholder="Ingresa tu Nombre"  required/>
            </div>
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <div className="w-full flex justify-between">
                <label htmlFor="email" className="text-gray-800 font-semibold">Email: </label>
                <input value={userInfoForm.email} onChange={e=>updateField("email", e.target.value)}  type="text" id="email" className="w-[80%]  outline-none border-b-2 border-gray-700" placeholder="Ingresa tu Email"  required/>
            </div>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <div className="w-full flex justify-between">
                <label htmlFor="direccion" className="text-gray-800 font-semibold">Dirección: </label>
                <input value={userInfoForm.address} onChange={e=>updateField("address", e.target.value)}  type="text" id="direccion" className="w-[80%]  outline-none border-b-2 border-gray-700" placeholder="Ingresa tu Dirección" required />
            </div>
            {errors.address && <p className="text-red-500">{errors.address}</p>}
            <div className="flex justify-end items-center">
                <button type="submit" className="bg-sky-600 text-white rounded-md p-2 cursor-pointer">Continuar</button>
            </div>
        </form>
     );
}
 
export default StepUserInfo;