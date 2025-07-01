import { Eye, Pencil, Trash } from "lucide-react";
import SmallText from "../../../components/texts/SmallText";
import Card from "../../../components/ui/Card"
import Pagination from "../../pagination/components/Pagination";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTableCategories } from "../hooks/useTableCategories";

const TableCategories = () => {
    const {categories, totalCategories, loading, setPage, page} = useTableCategories()
    const navigate = useNavigate();

    return ( 
        <Card>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-start pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Category</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Description</SmallText>
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
                        categories.map(cr => (
                            <tr key={cr.id} className="border-t border-border dark:border-dark-border">
                                <td className="text-start py-4">
                                    <SmallText>{cr.name}</SmallText>
                                </td>
                                <td className="text-end py-4">
                                    <SmallText>{cr.description}</SmallText>
                                </td>
                                <td className="flex py-4 items-center gap-1 justify-end">
                                    <button><Eye size={20} className="text-tag-blue-accent cursor-pointer" /></button>
                                    <button onClick={()=>navigate("/categories/edit/"+cr.id)}><Pencil size={20} className="text-tag-yellow-accent cursor-pointer" /></button>
                                    <button onClick={()=>navigate("/categories/delete/"+cr.id)}><Trash size={20} className="text-tag-red-accent cursor-pointer" /></button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <Pagination 
                totalItems={totalCategories} 
                pageSize={2} 
                page={page}
                onChangePage={setPage}
            />
        </Card>
     );
}
 
export default TableCategories;