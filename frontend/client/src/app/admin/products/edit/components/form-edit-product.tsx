"use client"

import { Product } from "@/types/models-database";
import { useState } from "react";
import { useEditProduct } from "../hooks/useEditProduct";
import { useSaveProduct } from "../hooks/useSaveProduct";
import Link from "next/link";

const FormEditProduct = ({
    product
}: { product: Product}) => {
    const { productForm, updateField, errors, handleSubmit  } = useEditProduct(product)
    const {loadingSaveProduct, resultSaveProduct, onSaveProduct} = useSaveProduct()

    const onSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        handleSubmit((data)=>{
            console.log("Producto valido: ", data)
            onSaveProduct(data)
        })
    }
    return ( 
        <div className="min-h-screen container mx-auto px-6 py-8">
            <Link href={"/admin/products"}>Volver</Link>
            <h1 className="text-3xl font-semibold text-gray-700 mb-6">Editar Producto</h1>
            
            <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
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
                            value={productForm.name}
                            onChange={(e)=> updateField("name", e.target.value)}
                            required
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}

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
                            value={productForm.price}
                            onChange={(e)=> updateField("price", e.target.value)}
                            required
                        />
                        {errors.price && <p className="text-red-500">{errors.price}</p>}
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
                        value={productForm.description}
                        onChange={(e)=> updateField("description", e.target.value)}
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
                        value={productForm.image}
                        onChange={(e)=> updateField("image", e.target.value)}
                        required
                    />
                </div>

                {/* Botón de Enviar */}
                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        disabled={loadingSaveProduct}
                        className={`px-6 py-3 ${loadingSaveProduct ? 'bg-gray-400' : 'bg-red-700'} text-white font-semibold rounded-md hover:bg-red-800 transition-colors`}
                    >
                        {loadingSaveProduct ? 'Eliminado...' : 'Eliminar Producto'}
                    </button>
                    <button
                        type="submit"
                        disabled={loadingSaveProduct}
                        className={`px-6 py-3 ${loadingSaveProduct ? 'bg-gray-400' : 'bg-sky-700'} text-white font-semibold rounded-md hover:bg-sky-800 transition-colors`}
                    >
                        {loadingSaveProduct ? 'Cargando...' : 'Guardar Producto'}
                    </button>
                </div>

                {(resultSaveProduct && !resultSaveProduct.success) && <p className="text-red-600 mt-4">{resultSaveProduct.error}</p>}
                {(resultSaveProduct && resultSaveProduct.success) && <p className="text-green-600 mt-4">{resultSaveProduct.data}</p>}
                
            </form>
        </div>
     );
}
 
export default FormEditProduct;