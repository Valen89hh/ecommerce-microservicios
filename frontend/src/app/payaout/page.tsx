const PayautPage = () => {
    return ( 
        <div className="flex flex-col justify-center items-center min-h-screen container mx-auto px-6">
            <h1 className="text-2xl mb-6 text-gray-800 font-bold text-center">Pasarela de Pago cripto</h1>
            <form action="" className="space-y-4 max-w-2xl w-full md:w-3/4 lg:w-1/2">
                <div className="w-full flex justify-between gap-4">
                    <label htmlFor="nombre" className="text-gray-800 font-semibold">Nombre: </label>
                    <input type="text" id="nombre" className="w-[80%] outline-none border-b-2 border-gray-700" placeholder="Ingresa tu Nombre" />
                </div>
                <div className="w-full flex justify-between">
                    <label htmlFor="email" className="text-gray-800 font-semibold">Email: </label>
                    <input type="text" id="email" className="w-[80%]  outline-none border-b-2 border-gray-700" placeholder="Ingresa tu Email" />
                </div>
                <div className="w-full flex justify-between">
                    <label htmlFor="direccion" className="text-gray-800 font-semibold">Dirección: </label>
                    <input type="text" id="direccion" className="w-[80%]  outline-none border-b-2 border-gray-700" placeholder="Ingresa tu Dirección" />
                </div>
                <div className="flex justify-end items-center">
                    <button className="bg-sky-600 text-white rounded-md p-2 cursor-pointer">Continuar</button>
                </div>
            </form>
        </div>
     );
}
 
export default PayautPage;