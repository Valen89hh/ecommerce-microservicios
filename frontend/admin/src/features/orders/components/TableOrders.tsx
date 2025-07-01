import { Eye, Pencil, Trash } from "lucide-react";
import Caption from "../../../components/texts/Caption";
import SmallText from "../../../components/texts/SmallText";
import Card from "../../../components/ui/Card"
import Pagination from "../../pagination/components/Pagination";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTableOrders } from "../hooks/useTableOrders";
import { formatStatus } from "../../../utils/utils";

const TableOrders = () => {
    const {orders, totalOrders, loading, setPage, page} = useTableOrders()
    const navigate = useNavigate();

    return ( 
        <Card>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-start pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Order</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Name</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Email</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Total</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Status</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Payment Method</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Actions</SmallText>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        // Mostrar 5 filas falsas como skeleton
                        Array.from({ length: 10 }).map((_, i) => (
                            <tr key={i} className="border-t border-border dark:border-dark-border">
                                <td colSpan={7}>
                                    <motion.div
                                        className="h-10 my-2 w-full bg-muted/20 dark:bg-dark-muted/20 rounded animate-pulse"
                                        initial={{ opacity: 0.3 }}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        orders.map(order => (
                            <tr key={order.id} className="border-t border-border dark:border-dark-border">
                                <td className="flex py-4 items-center justify-start gap-2">
                                    <SmallText>#Order-{order.id}</SmallText>
                                </td>
                                <td className="text-end py-4">
                                    <SmallText>{order.recipient_name}</SmallText>
                                </td>
                                <td className="text-end py-4">
                                    <SmallText>{order.recipient_email}</SmallText>
                                </td>
                                <td className="text-end py-4">
                                    <SmallText>S/ {order.total_amount}</SmallText>
                                </td>
                                <td className="text-end py-4">
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
                                </td>
                                <td className="text-end py-4">
                                    <Caption
                                        className={`
                                            h-fit w-fit
                                            leading-4
                                        rounded-full px-2 py-[2px]
                                        ${order.payment_method == "oxa_pay" && "bg-tag-yellow text-tag-yellow-accent dark:text-tag-yellow-accent"}
                                        ${order.payment_method == "mercado_pago" && "bg-tag-blue text-tag-blue-accent dark:text-tag-blue-accent"}
                                            `}
                                    >
                                        {formatStatus(order.payment_method)}
                                    </Caption>
                                </td>
                                <td className="flex py-4 items-center gap-1 justify-end">
                                    <button><Eye size={20} className="text-tag-blue-accent cursor-pointer" /></button>
                                    <button onClick={()=>navigate("/orders/edit/"+order.id)}><Pencil size={20} className="text-tag-yellow-accent cursor-pointer" /></button>
                                    <button onClick={()=>navigate("/orders/delete/"+order.id)}><Trash size={20} className="text-tag-red-accent cursor-pointer" /></button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <Pagination 
                totalItems={totalOrders} 
                pageSize={2} 
                page={page}
                onChangePage={setPage}
            />
        </Card>
     );
}
 
export default TableOrders;