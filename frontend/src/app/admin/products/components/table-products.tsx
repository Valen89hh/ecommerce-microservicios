"use client"

import { logoutUser } from "@/app/login/actions/logout-user";
import { useUser } from "@/hooks/useUser";
import { useDeleteProductModal } from "@/store/useDeleteProductModal";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/models-database";
import Link from "next/link";
import { useEffect } from "react";

const TableProducts = ({
    products
}: {
    products: Product[]
}) => {
    const { openModal } = useDeleteProductModal()
    const { products: currentProducts, setProducts } = useProductStore();
    const user = useUser()

    useEffect(() => {
        setProducts(products);
        console.log(user)
    }, [products, setProducts]);

    return ( 
        <div className="min-h-screen container mx-auto px-6">
            <div className="mt-8 flex gap-1 justify-start items-center">
                <h2 className=" text-xl">Hola {(user && user.name) && (user.name)} --{'>'}</h2>
                <button onClick={logoutUser}>Logout</button>
            </div>
            <div className="w-full flex justify-between items-center ">
                <h1 className="text-gray-600 text-2xl font-semibold">Productos de la Tienda</h1>
                <Link
                    href="/admin/products/create"
                    className="p-2 rounded-md bg-sky-700 text-white hover:bg-sky-800 transition-colors"
                    >
                    Crear Producto
                </Link>
            </div>

            <div className="overflow-x-auto mt-6">
                <table className="w-full table-auto border-collapse shadow-lg rounded-lg bg-white">
                    <thead>
                        <tr className="bg-sky-700 text-white">
                            <th className="px-6 py-3 text-left">Id</th>
                            <th className="px-6 py-3 text-left">Nombre</th>
                            <th className="px-6 py-3 text-left">Descripción</th>
                            <th className="px-6 py-3 text-left">Precio</th>
                            <th className="px-6 py-3 text-left">Editar</th>
                            <th className="px-6 py-3 text-left">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                        <tr
                            key={product.id}
                            className="border-t hover:bg-gray-100 transition-colors"
                        >
                            <td className="px-6 py-4">{product.id}</td>
                            <td className="px-6 py-4">{product.name}</td>
                            <td className="px-6 py-4">{product.description}</td>
                            <td className="px-6 py-4">{product.price}</td>
                            <td className="px-6 py-4">
                                <Link
                                    href={`/admin/products/edit/${product.id}`}
                                    className="text-sky-700 hover:text-sky-900 transition-colors"
                                >
                                    Editar
                                </Link>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={()=> openModal(product)}
                                    className="cursor-pointer text-red-700 hover:text-red-900 transition-colors"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default TableProducts;