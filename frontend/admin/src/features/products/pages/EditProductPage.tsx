import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService";
import type { Product } from "../schemas/Product";
import { toast } from "react-toastify";
import ProductEditForm from "../components/ProductEditForm";
import Loader from "../../../components/ui/Loader";
import SmallText from "../../../components/texts/SmallText";

const EdirProductPage = () => {
    const {id} = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const hasRun = useRef(false)

    useEffect(()=>{
        if (hasRun.current) return
        hasRun.current = true
        async function initProduct(id: string) {
            const res = await getProduct(id)
            if(res.success) setProduct(res.data)
            else toast.error(res.error.message)
        }
        if(id){
            initProduct(id)
        }
    }, [id])

    if(product) return <ProductEditForm product={product}/>
    return ( 
        <div className="w-full h-full flex justify-center items-center flex-col">
            <Loader/>
            <SmallText>Cargando...</SmallText>
        </div>
    );
}
 
export default EdirProductPage;