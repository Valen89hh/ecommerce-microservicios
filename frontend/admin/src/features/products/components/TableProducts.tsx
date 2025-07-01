import { Eye, Pencil, Trash } from "lucide-react";
import Caption from "../../../components/texts/Caption";
import SmallText from "../../../components/texts/SmallText";
import Card from "../../../components/ui/Card"
import Pagination from "../../pagination/components/Pagination";
import { useTableProducts } from "../hooks/useTablaProducts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TableProducts = () => {
    const {products, totalProducts, loading, setPage, page} = useTableProducts()
    const navigate = useNavigate();

    return ( 
        <Card>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-start pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Product</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Category</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Stock</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Price</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Status</SmallText>
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
                                <td colSpan={6}>
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
                        products.map(product => (
                            <tr key={product.id} className="border-t border-border dark:border-dark-border">
                                <td className="flex py-4 items-center justify-start gap-2">
                                    <img 
                                        src={product.image} 
                                        alt="" 
                                        width={40}
                                        height={40}
                                        className="object-cover rounded-xs overflow-hidden"
                                    />
                                    <SmallText>{product.name}</SmallText>
                                </td>
                                <td className="text-end py-4">
                                    <SmallText>{product.categoryName}</SmallText>
                                </td>
                                <td className="text-end py-4">
                                    <SmallText>{product.stock}</SmallText>
                                </td>
                                <td className="text-end py-4">
                                    <SmallText>S/ {product.price}</SmallText>
                                </td>
                                <td className="text-end py-4">
                                    <Caption
                                        className={`
                                            h-fit w-fit
                                            leading-4
                                        rounded-full px-2 py-[2px]
                                        ${product.status == "Out of Stock" && "bg-tag-yellow text-tag-yellow-accent dark:text-tag-yellow-accent"}
                                        ${product.status == "Low Stock" && "bg-tag-purple text-tag-purple-accent dark:text-tag-purple-accent"}
                                        ${product.status == "Not Available" && "bg-tag-red text-tag-red-accent dark:text-tag-red-accent"}
                                        ${product.status == "Available" && "bg-tag-green text-tag-green-accent dark:text-tag-green-accent"}
                                            `}
                                    >
                                        {product.status}
                                    </Caption>
                                </td>
                                <td className="flex py-4 items-center gap-1 justify-end">
                                    <button><Eye size={20} className="text-tag-blue-accent cursor-pointer" /></button>
                                    <button onClick={()=>navigate("/products/edit/"+product.id)}><Pencil size={20} className="text-tag-yellow-accent cursor-pointer" /></button>
                                    <button onClick={()=>navigate("/products/delete/"+product.id)}><Trash size={20} className="text-tag-red-accent cursor-pointer" /></button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <Pagination 
                totalItems={totalProducts} 
                pageSize={2} 
                page={page}
                onChangePage={setPage}
            />
        </Card>
     );
}
 
export default TableProducts;