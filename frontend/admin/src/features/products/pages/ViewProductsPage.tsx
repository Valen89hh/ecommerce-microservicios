import { Filter, Plus } from "lucide-react";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import Heading1 from "../../../components/texts/Heading1";
import Heading4 from "../../../components/texts/Heading4";
import CardsInformation from "../components/CardsInformation";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import TableProducts from "../components/TableProducts";
import ModalFilterProducts from "../components/ModalFilterProducts";
import { useState } from "react";

const ViewProductsPage = () => {
    const [isFilterModalOpen, setFilterModalOpen] = useState(false)

    return ( 
        <div className="space-y-4">
            <div className="flex justify-between">
                <Heading1>Products</Heading1>
                <div className="flex items-center gap-4">
                    <ButtonSecondary onClick={()=>setFilterModalOpen(true)} className="flex items-center gap-1">
                        <Filter className="text-muted dark:text-dark-muted" size={20}/>
                        <Heading4 className="text-muted dark:text-dark-muted">Filter</Heading4>
                    </ButtonSecondary>
                    <ButtonPrimary className="flex items-center gap-1">
                        <Plus className="text-white" size={20}/>
                        <Heading4 className="text-white">Add Product</Heading4>
                    </ButtonPrimary>
                </div>
            </div>
            <CardsInformation/>
            <TableProducts/>
            <ModalFilterProducts
                visibility={isFilterModalOpen}
                onClose={()=>{
                    setFilterModalOpen(false)
                }}
                onApply={(filter)=>{
                    console.log(filter)
                }}
            />
        </div>
     );
}
 
export default ViewProductsPage;