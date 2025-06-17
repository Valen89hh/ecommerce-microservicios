import { DollarSign, HandCoins, ShoppingBag, Users } from "lucide-react";
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
                        Revenue
                    </SmallText>
                    <Heading1>
                        $24,122
                    </Heading1>
                    <Caption className="text-terciario dark:text-dark-terciario">
                        Net income generated
                    </Caption>
                </div>
                <div className="bg-tag-green rounded-full w-8 h-8 inline-flex justify-center items-center">
                    <DollarSign className="text-tag-green-accent" size={20}/>
                </div>
            </Card>
            <Card className="flex justify-between">
                <div>
                    <SmallText className="text-muted dark:text-dark-muted">
                        Orders
                    </SmallText>
                    <Heading1>
                        42
                    </Heading1>
                    <Caption className="text-terciario dark:text-dark-terciario">
                        Total orders processed
                    </Caption>
                </div>
                <div className="bg-tag-blue rounded-full w-8 h-8 inline-flex justify-center items-center">
                    <ShoppingBag className="text-tag-blue-accent" size={20}/>
                </div>
            </Card>
            <Card className="flex justify-between">
                <div>
                    <SmallText className="text-muted dark:text-dark-muted">
                        Clients
                    </SmallText>
                    <Heading1>
                        1,285
                    </Heading1>
                    <Caption className="text-terciario dark:text-dark-terciario">
                        Unique registered customers
                    </Caption>
                </div>
                <div className="bg-tag-purple rounded-full w-8 h-8 inline-flex justify-center items-center">
                    <Users className="text-tag-purple-accent" size={20}/>
                </div>
            </Card>
            <Card className="flex justify-between">
                <div>
                    <SmallText className="text-muted dark:text-dark-muted">
                        Total Sales
                    </SmallText>
                    <Heading1>
                        $50,000
                    </Heading1>
                    <Caption className="text-terciario dark:text-dark-terciario">
                        Total amount of sales made
                    </Caption>
                </div>
                <div className="bg-tag-yellow rounded-full w-8 h-8 inline-flex justify-center items-center">
                    <HandCoins className="text-tag-yellow-accent" size={20}/>
                </div>
            </Card>
        </section>
     );
}
 
export default CardsInformation;