const ProductsAdminPage = () => {
    const products = [
        { 
          id: 1,
          imagen: "https://picsum.photos/600/300",
          name: "Producto 1",
          description: "Este es el proucto numero 1 de todo el pais",
          price: 34.99
        },
        { 
          id: 2,
          imagen: "https://picsum.photos/600/300",
          name: "Producto 2",
          description: "Este es el proucto numero 1 de todo el pais",
          price: 55.99
        },
        { 
          id: 3,
          imagen: "https://picsum.photos/600/300",
          name: "Producto 3",
          description: "Este es el proucto numero 1 de todo el pais",
          price: 14.99
        },
      ]
    
    return ( 
        <div className="min-h-screen container mx-auto px-6">
            <div className="w-full flex justify-between items-center mt-8">
                <h1 className="text-gray-600 text-2xl font-semibold">Productos de la Tienda</h1>
                <a
                href="/admin/products/create"
                className="p-2 rounded-md bg-sky-700 text-white hover:bg-sky-800 transition-colors"
                >
                Crear Producto
                </a>
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
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                        <tr
                            key={product.id}
                            className="border-t hover:bg-gray-100 transition-colors"
                        >
                            <td className="px-6 py-4">{product.id}</td>
                            <td className="px-6 py-4">{product.name}</td>
                            <td className="px-6 py-4">{product.description}</td>
                            <td className="px-6 py-4">{product.price}</td>
                            <td className="px-6 py-4">
                                <a
                                    href={`/admin/products/edit/${product.id}`}
                                    className="text-sky-700 hover:text-sky-900 transition-colors"
                                >
                                    Editar
                                </a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default ProductsAdminPage;