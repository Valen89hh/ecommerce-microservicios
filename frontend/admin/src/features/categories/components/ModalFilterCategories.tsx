// src/app/dashboard/products/components/ModalFilterProducts.tsx
import { Search, X } from "lucide-react";
import Card from "../../../components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import type React from "react";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import Heading4 from "../../../components/texts/Heading4";
import Field from "../../../components/inputs/Field";
import FieldDate from "../../../components/inputs/FieldDate";
import type { FilterCategorySchema } from "../schemas/CategorySchema";
import { useFilterCategoriesForm } from "../hooks/useFilterCategoriesForm";

interface Props{
    visibility: boolean
    onClose: ()=>void,
    onApply: (data: FilterCategorySchema)=>void
}

const ModalFilterCategories: React.FC<Props> = ({
    visibility,
    onClose,
    onApply
}) => {
    const {
        filters,
        setField,
        reset,
        apply,
    } = useFilterCategoriesForm();



    return (
        <AnimatePresence>
            {visibility && (
                <motion.div
                    className="absolute inset-0 bg-modal dark:bg-dark-modal flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-1/2 max-w-150"
                    >
                        <Card className="space-y-4">
                            <div className="flex w-full justify-between items-center">
                                <Heading4>Filter Categories</Heading4>
                                <button onClick={onClose}>
                                    <X size={24} className="text-muted dark:text-dark-muted" />
                                </button>
                            </div>
                            <Field
                                placeholder="Search Name"
                                iconStart={<Search className="text-muted dark:text-dark-muted" size={18}/>}
                                value={filters.name}
                                onChange={e=> setField("name", e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-4 ">
                                <Heading4 className="">Date:</Heading4>
                                <div className="grid grid-cols-2 gap-4">
                                   <FieldDate 
                                        value={filters.startDate}
                                        onChange={e=>setField("startDate", e.target.value)}
                                    />
                                   <FieldDate
                                        value={filters.endDate}
                                        onChange={e=>setField("endDate", e.target.value)}
                                   />
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <ButtonSecondary onClick={reset} className="px-4">
                                    <Heading4 className="text-muted dark:text-dark-muted">Clean</Heading4>
                                </ButtonSecondary>
                                <ButtonPrimary onClick={()=>{
                                    apply(onApply)
                                    onClose()
                                }} className="px-6">
                                    <Heading4 className="text-white dark:text-white">Apply</Heading4>
                                </ButtonPrimary>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalFilterCategories;
