import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import Heading4 from "../../../components/texts/Heading4";
import ButtonError from "../../../components/buttons/ButtonError";
import type { Product } from "../schemas/Product";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getProduct } from "../services/productService";
import { toast } from "react-toastify";
import Loader from "../../../components/ui/Loader";
import SmallText from "../../../components/texts/SmallText";
import Card from "../../../components/ui/Card";
import Heading2 from "../../../components/texts/Heading2";
import Heading1 from "../../../components/texts/Heading1";
import Paragraph from "../../../components/texts/Paragraph";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

const DeleteProductPage = () => {
    const {id} = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const {handleDeleteProduct, loadingDelete} = useDeleteProduct()
    const hasRun = useRef(false)
    const navigate = useNavigate()

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

    if(product) return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <Heading1>Delete Product</Heading1>
                <div className="flex items-center gap-4">
                    <ButtonSecondary onClick={()=>navigate("/products")} className="flex items-center gap-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Cancel</Heading4>
                    </ButtonSecondary>
                    <ButtonError onClick={()=>handleDeleteProduct(product.id)} className="flex items-center gap-1">
                        {loadingDelete ? <Loader/> : <Heading4 className="text-white">Delete</Heading4>}
                    </ButtonError>
                </div>
            </div>
            <div className="w-full inline-flex justify-center items-center">
                <Card className="grid grid-cols-2 w-1/2 max-w-[600px] gap-4">
                    <div>
                        <img src={product.images[0].fileUrl} alt="" />
                    </div>
                    <div className="">
                        <Heading2>{product.name}</Heading2>
                        <Paragraph>{product.shortDescription}</Paragraph>
                    </div>
                </Card>
            </div>
        </div>
    )

    return ( 
        <div className="w-full h-full flex justify-center items-center flex-col">
            <Loader/>
            <SmallText>Cargando...</SmallText>
        </div>
     );
}
 
export default DeleteProductPage;