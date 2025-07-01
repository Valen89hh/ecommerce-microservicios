import { loadProducts } from "./actions/load-products";
import DeleteProductModal from "./components/delete-product-modal";
import TableProducts from "./components/table-products";

const ProductsAdminPage = async() => {
    const result = await loadProducts()

    if(!result.success) return <p>{result.error}</p>
    
    return ( 
        <>
            <TableProducts products={result.data}/>
            <DeleteProductModal/>
        </>
     );
}
 
export default ProductsAdminPage;