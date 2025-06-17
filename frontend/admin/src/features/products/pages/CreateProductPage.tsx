import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import Heading1 from "../../../components/texts/Heading1";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import Heading4 from "../../../components/texts/Heading4";
import BasicInformation from "../components/BasicInformation";
import ProductImages from "../components/ProductImages";
import PriceAndStock from "../components/PriceAndStock";
import LogisticsInformation from "../components/LogisticsInformation";
import Certificates from "../components/Certificates";
import { useCreateProduct } from "../hooks/useCreateProduct";

const CreateProductPage = () => {
    const {
        basicInfo,
        images,
        priceStock,
        logistics,
        certificates,
        handleSubmit,
    } = useCreateProduct();

    return ( 
        <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
            <div className="flex justify-between">
                <Heading1>Add Product</Heading1>
                <div className="flex items-center gap-4">
                    <ButtonSecondary className="flex items-center gap-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Cancel</Heading4>
                    </ButtonSecondary>
                    <ButtonPrimary className="flex items-center gap-1">
                        <Heading4 className="text-white">Publish</Heading4>
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
 
export default CreateProductPage;