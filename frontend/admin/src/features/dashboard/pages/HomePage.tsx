import { Download } from "lucide-react";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import Heading1 from "../../../components/texts/Heading1";
import CardsInformation from "../components/CardsInformation";
import Heading4 from "../../../components/texts/Heading4";
import SaleStatistic from "../components/SaleStatistic";
import BestSellingProducts from "../components/BestSellingProducts";
import RecentOrders from "../components/RecentOrders";

const HomePage = () => {
    return ( 
        <div className="space-y-4">
            <div className="flex justify-between">
                <Heading1>Dashboard</Heading1>
                <ButtonPrimary className="flex items-center gap-1">
                    <Download className="text-white" size={20}/>
                    <Heading4 className="text-white">Export</Heading4>
                </ButtonPrimary>
            </div>
            <CardsInformation/>
            <SaleStatistic/>
            <div className="flex gap-4">
                <BestSellingProducts/>
                <RecentOrders/>
            </div>
        </div>
     );
}
 
export default HomePage;