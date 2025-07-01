import { useNavigate } from "react-router-dom";
import Heading1 from "../../../components/texts/Heading1";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import Heading4 from "../../../components/texts/Heading4";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import Loader from "../../../components/ui/Loader";
import BasicInformation from "../components/BasicInformation";
import ProductImages from "../components/ProductImages";
import PriceAndStock from "../components/PriceAndStock";
import LogisticsInformation from "../components/LogisticsInformation";
import Certificates from "../components/Certificates";
import type { Product } from "../schemas/Product";
import type React from "react";
import { useEditProduct } from "../hooks/useEditProduct";

interface Props {
    product: Product
}

const ProductEditForm: React.FC<Props> = ({
    product
}) => {
    const {
        basicInfo,
        images,
        priceStock,
        logistics,
        certificates,
        loading,
        handleSubmit,
    } = useEditProduct(product);
    const navigate = useNavigate();

    return ( 
        <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
            <div className="flex justify-between">
                <Heading1>Edit Product </Heading1>
                <div className="flex items-center gap-4">
                    <ButtonSecondary disabled={loading} onClick={()=>navigate("/products")} type="button" className="flex items-center gap-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Cancel</Heading4>
                    </ButtonSecondary>
                    <ButtonPrimary disabled={loading} type="submit" className="flex items-center gap-1">
                        {loading ? <Loader /> : <Heading4 className="text-white">Update</Heading4>}
                    </ButtonPrimary>
                </div>
            </div>
            <BasicInformation hook={basicInfo}/>
            <ProductImages hook={images}/>
            <PriceAndStock hook={priceStock}/>
            <LogisticsInformation hook={logistics}/>
            <Certificates hook={certificates}/>
        </form>
    );
}
 
export default ProductEditForm;