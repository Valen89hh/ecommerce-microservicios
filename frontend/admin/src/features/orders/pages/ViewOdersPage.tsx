import { Filter, Plus } from "lucide-react";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import Heading1 from "../../../components/texts/Heading1";
import Heading4 from "../../../components/texts/Heading4";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import { useState } from "react";
import TableOrders from "../components/TableOrders";
import ModalFilterOrders from "../components/ModalFilterOrders";

const ViewOrdersPage = () => {
    const [isFilterModalOpen, setFilterModalOpen] = useState(false)
    const navigate = useNavigate()

    return ( 
        <div className="space-y-4">
            <div className="flex justify-between">
                <Heading1>Orders</Heading1>
                <div className="flex items-center gap-4">
                    <ButtonSecondary onClick={()=>setFilterModalOpen(true)}  className="flex items-center gap-1">
                        <Filter className="text-muted dark:text-dark-muted" size={20}/>
                        <Heading4 className="text-muted dark:text-dark-muted">Filter</Heading4>
                    </ButtonSecondary>
                    <ButtonPrimary onClick={()=>navigate("/categories/create")} className="flex items-center gap-1">
                        <Plus className="text-white" size={20}/>
                        <Heading4 className="text-white">Add Oder</Heading4>
                    </ButtonPrimary>
                </div>
            </div>
            <TableOrders/>
            <ModalFilterOrders
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
 
export default ViewOrdersPage;