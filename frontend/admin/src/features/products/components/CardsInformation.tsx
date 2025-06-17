import { Ban, Package, Star, TriangleAlert,} from "lucide-react";
import Caption from "../../../components/texts/Caption";
import Heading1 from "../../../components/texts/Heading1";
import SmallText from "../../../components/texts/SmallText";
import Card from "../../../components/ui/Card";

const CardsInformation = () => {
    return ( 
        <section className="grid grid-cols-4 gap-4">
            <Card className="flex justify-between">
                <div>
                    <SmallText className="text-muted dark:text-dark-muted">
                        Total Products
                    </SmallText>
                    <Heading1>
                        5000
                    </Heading1>
                    <Caption className="text-terciario dark:text-dark-terciario">
                        Total registered in the system
                    </Caption>
                </div>
                <div className="bg-tag-green rounded-full w-8 h-8 inline-flex justify-center items-center">
                    <Package className="text-tag-green-accent" size={20}/>
                </div>
            </Card>
            <Card className="flex justify-between">
                <div>
                    <SmallText className="text-muted dark:text-dark-muted">
                        Out of Stock
                    </SmallText>
                    <Heading1>
                        42
                    </Heading1>
                    <Caption className="text-terciario dark:text-dark-terciario">
                        Currently unavailable
                    </Caption>
                </div>
                <div className="bg-tag-blue rounded-full w-8 h-8 inline-flex justify-center items-center">
                    <Ban className="text-tag-blue-accent" size={20}/>
                </div>
            </Card>
            <Card className="flex justify-between">
                <div>
                    <SmallText className="text-muted dark:text-dark-muted">
                        Low Stock
                    </SmallText>
                    <Heading1>
                        67
                    </Heading1>
                    <Caption className="text-terciario dark:text-dark-terciario">
                        Products below minimum stock level
                    </Caption>
                </div>
                <div className="bg-tag-purple rounded-full w-8 h-8 inline-flex justify-center items-center">
                    <TriangleAlert className="text-tag-purple-accent" size={20}/>
                </div>
            </Card>
            <Card className="flex justify-between">
                <div>
                    <SmallText className="text-muted dark:text-dark-muted">
                        Featured Products
                    </SmallText>
                    <Heading1>
                        25
                    </Heading1>
                    <Caption className="text-terciario dark:text-dark-terciario">
                        Marked as featured in the store
                    </Caption>
                </div>
                <div className="bg-tag-yellow rounded-full w-8 h-8 inline-flex justify-center items-center">
                    <Star className="text-tag-yellow-accent" size={20}/>
                </div>
            </Card>
        </section>
     );
}
 
export default CardsInformation;