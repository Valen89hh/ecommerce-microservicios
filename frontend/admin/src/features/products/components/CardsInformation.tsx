import { Ban, Package, Star, TriangleAlert,} from "lucide-react";
import Caption from "../../../components/texts/Caption";
import Heading1 from "../../../components/texts/Heading1";
import SmallText from "../../../components/texts/SmallText";
import Card from "../../../components/ui/Card";
import { useEffect, useRef, useState } from "react";
import { getTotalLowStock, getTotalOutOfStock, getTotalProducts } from "../services/productService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const CardsInformation = () => {
    const [laodingTotal, setLoadingTotal] = useState(false)
    const [total, setTotal] = useState(0)
    const [laodingOutOfStock, setLoadingOutOfStock] = useState(false)
    const [outOfStock, setOutOfStock] = useState(0)
    const [laodingLowStock, setLoadingLowStock] = useState(false)
    const [lowStock, setLowStock] = useState(0)

    const hasRun = useRef(false)
    useEffect(()=>{

        if (hasRun.current) return
        hasRun.current = true
        console.log("Ejecucion del Fetch")
        async function fetchAll() {
        setLoadingTotal(true)
        setLoadingOutOfStock(true)
        setLoadingLowStock(true)

        try {
            const [totalRes, outRes, lowRes] = await Promise.all([
                getTotalProducts(),
                getTotalOutOfStock(),
                getTotalLowStock()
            ])

            if (totalRes.success) setTotal(totalRes.data)
            else toast.error(totalRes.error.message)

            if (outRes.success) setOutOfStock(outRes.data)
            else toast.error(outRes.error.message)

            if (lowRes.success) setLowStock(lowRes.data)
            else toast.error(lowRes.error.message)
        } catch (error) {
            toast.error("Error fetching data")
            console.error(error)
        } finally {
            setLoadingTotal(false)
            setLoadingOutOfStock(false)
            setLoadingLowStock(false)
        }
    }

    fetchAll()
}, [])

    return ( 
        <section className="grid grid-cols-4 gap-4">
            {!laodingTotal ? (
                <Card className="flex justify-between">
                    <div>
                        <SmallText className="text-muted dark:text-dark-muted">
                            Total Products
                        </SmallText>
                        <Heading1>
                            {total}
                        </Heading1>
                        <Caption className="text-terciario dark:text-dark-terciario">
                            Total registered in the system
                        </Caption>
                    </div>
                    <div className="bg-tag-green rounded-full w-8 h-8 inline-flex justify-center items-center">
                        <Package className="text-tag-green-accent" size={20}/>
                    </div>
                </Card>
            ): (
                <motion.div
                    className="bg-muted/20 dark:bg-dark-muted/20 rounded animate-pulse"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                />
            )}
            {!laodingOutOfStock ? (
                <Card className="flex justify-between">
                    <div>
                        <SmallText className="text-muted dark:text-dark-muted">
                            Out of Stock
                        </SmallText>
                        <Heading1>
                            {outOfStock}
                        </Heading1>
                        <Caption className="text-terciario dark:text-dark-terciario">
                            Currently unavailable
                        </Caption>
                    </div>
                    <div className="bg-tag-blue rounded-full w-8 h-8 inline-flex justify-center items-center">
                        <Ban className="text-tag-blue-accent" size={20}/>
                    </div>
                </Card>
            ): (
                <motion.div
                    className="bg-muted/20 dark:bg-dark-muted/20 rounded animate-pulse"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                />
            )}
            {!laodingLowStock ? (
                <Card className="flex justify-between">
                    <div>
                        <SmallText className="text-muted dark:text-dark-muted">
                            Low Stock
                        </SmallText>
                        <Heading1>
                            {lowStock}
                        </Heading1>
                        <Caption className="text-terciario dark:text-dark-terciario">
                            Products below minimum stock level
                        </Caption>
                    </div>
                    <div className="bg-tag-purple rounded-full w-8 h-8 inline-flex justify-center items-center">
                        <TriangleAlert className="text-tag-purple-accent" size={20}/>
                    </div>
                </Card>
            ): (
                <motion.div
                    className="bg-muted/20 dark:bg-dark-muted/20 rounded animate-pulse"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                />
            )}
            
            <Card className="flex justify-between">
                    <div>
                        <SmallText className="text-muted dark:text-dark-muted">
                            Featured Products
                        </SmallText>
                        <Heading1>
                            3
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