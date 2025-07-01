import { Link, useNavigate } from "react-router-dom";
import Heading3 from "../../../components/texts/Heading3";
import Card from "../../../components/ui/Card";
import Caption from "../../../components/texts/Caption";
import SmallText from "../../../components/texts/SmallText";
import { useRecentOrders } from "../hooks/useRecentOrders";
import { motion } from "framer-motion";
import { formatDateddMMyyy, formatStatus } from "../../../utils/utils";

const data = [
    {
        id: 11,
        username: "Maria Garcia",
        valor: 89.99,
        date: "22 Apr 2025",
        status: "Pendiente"
    },
    {
        id: 12,
        username: "Roberto Vasquez",
        valor: 29.99,
        date: "22 Apr 2025",
        status: "Enviado"
    },
    {
        id: 13,
        username: "Mauricio Sedano",
        valor: 45.99,
        date: "22 Apr 2025",
        status: "Procesando"
    },
    {
        id: 14,
        username: "Erika Flores",
        valor: 33.99,
        date: "22 Apr 2025",
        status: "Entregado"
    },
    {
        id: 15,
        username: "Erika Flores",
        valor: 33.99,
        date: "22 Apr 2025",
        status: "Entregado"
    },

]

const RecentOrders = () => {
    const {loading, orders} = useRecentOrders();
    const navigate = useNavigate();

    if(loading) return (
      <motion.div
            className="bg-muted/20 flex-1 dark:bg-dark-muted/20 rounded animate-pulse"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
        >
          <div className="opacity-0 space-y-2">
            <div className="flex justify-between">
                <Heading3>Recent Orders</Heading3>
                <Link to={"/orders"}>
                    <Caption className="text-primary dark:text-dark-primary">View All</Caption>
                </Link>
            </div>
            <ul className="space-y-2">
                {data.map(order=>(
                    <li 
                        className="grid grid-cols-3 transition-all hover:bg-background dark:hover:bg-dark-background cursor-pointer border rounded-lg px-4 py-2 border-border dark:border-dark-border"
                        key={"order-"+order.id}
                    >
                        <div className="flex flex-col">
                            <SmallText>#Order-{order.id}</SmallText>
                            <Caption className="text-muted dark:text-dark-muted">{order.username}</Caption>
                        </div>
                        <div className="flex flex-col items-end">
                            <SmallText>${order.valor}</SmallText>
                            <Caption className="text-muted dark:text-dark-muted">{order.date}</Caption>
                        </div>
                        <div className="inline-flex items-center justify-end">
                            <Caption
                                className={`
                                    h-fit w-fit
                                    leading-4
                                rounded-full px-2 py-[2px]
                                ${order.status == "Pendiente" && "bg-tag-yellow text-tag-yellow-accent dark:text-tag-yellow-accent"}
                                ${order.status == "Enviado" && "bg-tag-purple text-tag-purple-accent dark:text-tag-purple-accent"}
                                ${order.status == "Procesando" && "bg-tag-blue text-tag-blue-accent dark:text-tag-blue-accent"}
                                ${order.status == "Entregado" && "bg-tag-green text-tag-green-accent dark:text-tag-green-accent"}
                                    `}
                            >
                                {order.status}
                            </Caption>
                        </div>
                    </li>
                ))}
            </ul>
          </div>
        </motion.div>
    )

    return ( 
        <Card className="flex-1 space-y-2">
            <div className="flex justify-between">
                <Heading3>Recent Orders</Heading3>
                <Link to={"/orders"}>
                    <Caption className="text-primary dark:text-dark-primary">View All</Caption>
                </Link>
            </div>
            <ul className="space-y-2">
                {orders.map(order=>(
                    <li 
                        className="grid grid-cols-3 transition-all hover:bg-background dark:hover:bg-dark-background cursor-pointer border rounded-lg px-4 py-2 border-border dark:border-dark-border"
                        key={"order-"+order.id}
                        onClick={()=>navigate("/orders/edit/"+order.id)}
                    >
                        <div className="flex flex-col">
                            <SmallText>#Order-{order.id}</SmallText>
                            <Caption className="text-muted dark:text-dark-muted">{order.recipient_name}</Caption>
                        </div>
                        <div className="flex flex-col items-end">
                            <SmallText>${order.total_amount}</SmallText>
                            <Caption className="text-muted dark:text-dark-muted">{formatDateddMMyyy(order.created_at)}</Caption>
                        </div>
                        <div className="inline-flex items-center justify-end">
                            <Caption
                                className={`
                                    h-fit w-fit
                                    leading-4
                                rounded-full px-2 py-[2px]
                                ${order.status == "pending" && "bg-tag-yellow text-tag-yellow-accent dark:text-tag-yellow-accent"}
                                ${order.status == "paid" && "bg-tag-blue text-tag-blue-accent dark:text-tag-blue-accent"}
                                ${order.status == "processing" && "bg-tag-purple text-tag-purple-accent dark:text-tag-purple-accent"}
                                ${order.status == "shipped" && "bg-tag-green text-tag-green-accent dark:text-tag-green-accent"}
                                ${order.status == "delivered" && "bg-tag-gray text-tag-gray-accent dark:text-tag-gray-accent"}
                                ${order.status == "cancelled" && "bg-tag-red text-tag-red-accent dark:text-tag-red-accent"}
                                    `}
                            >
                                {formatStatus(order.status)}
                            </Caption>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
     );
}
 
export default RecentOrders;