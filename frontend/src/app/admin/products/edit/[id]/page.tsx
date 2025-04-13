import FormEditProduct from "../components/form-edit-product";
import { loadProduct } from "../actions/load-product";

const ProductEditPage = async({
    params,
}: {
    params: Promise<{id: number}>
}) => {
    const {id} = await params
    
    const result = await loadProduct(id)

    if(!result.success) return <p>{result.error}</p>


    return <FormEditProduct product={result.data}/>
}
 
export default ProductEditPage;