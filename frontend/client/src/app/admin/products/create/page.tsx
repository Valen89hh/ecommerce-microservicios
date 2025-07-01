'use client'

import React, { useState } from "react";
import { useAddProduct } from "./hooks/useAddProduct";
import Link from "next/link";

const ProductCreatePage = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [precio, setPrecio] = useState('');

    const { addProduct, loading, error, success} = useAddProduct()

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        const proucto = {
            name: nombre,
            description: descripcion,
            price: precio == '' ? 0 : Number(precio),
            imagen: imagen
        }
        console.log(proucto)
        await addProduct(proucto)
    }


    return ( 
        <div className="min-h-screen container mx-auto px-6 py-8">
            <Link href={"/admin/products"}>Volver</Link>
            
            <h1 className="text-3xl font-semibold text-gray-700 mb-6">Añadir Nuevo Producto</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre del producto */}
                    <div>
                        <label htmlFor="name" className="block text-gray-600 font-medium mb-2">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Nombre del producto"
                            value={nombre}
                            onChange={(e)=> setNombre(e.target.value)}
                            required
                        />
                    </div>
                    
                    {/* Precio */}
                    <div>
                        <label htmlFor="price" className="block text-gray-600 font-medium mb-2">Precio</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Precio del producto"
                            value={precio}
                            onChange={(e)=> setPrecio(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Descripción */}
                <div>
                    <label htmlFor="description" className="block text-gray-600 font-medium mb-2">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Descripción detallada del producto"
                        value={descripcion}
                        onChange={(e)=> setDescripcion(e.target.value)}
                        required
                    />
                </div>

                {/* Imagen del producto */}
                <div>
                    <label htmlFor="image" className="block text-gray-600 font-medium mb-2">Imagen</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="https://image.example"
                        value={imagen}
                        onChange={(e)=> setImagen(e.target.value)}
                        required
                    />
                </div>

                {/* Botón de Enviar */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-3 ${loading ? 'bg-gray-400' : 'bg-sky-700'} text-white font-semibold rounded-md hover:bg-sky-800 transition-colors`}
                    >
                        {loading ? 'Cargando...' : 'Añadir Producto'}
                    </button>
                </div>

                {error && <p className="text-red-600 mt-4">{error}</p>}
                {success && <p className="text-green-600 mt-4">Producto añadido exitosamente</p>}
                
            </form>
        </div>

     );
}
 
export default ProductCreatePage;