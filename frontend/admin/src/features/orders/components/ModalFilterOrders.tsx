// src/app/dashboard/products/components/ModalFilterProducts.tsx
import { Search, X } from "lucide-react";
import Card from "../../../components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import type React from "react";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import Heading4 from "../../../components/texts/Heading4";
import Field from "../../../components/inputs/Field";
import FieldNumber from "../../../components/inputs/FieldNumber";
import Checkbox from "../../../components/inputs/Checkbox";
import FieldDate from "../../../components/inputs/FieldDate";
import type { FilterOrderSchema } from "../schemas/OderSchema";
import { useFilterOrdersForm } from "../hooks/useFilterOrdersForm";
import Select from "../../../components/inputs/Select";

interface Props{
    visibility: boolean
    onClose: ()=>void,
    onApply: (data: FilterOrderSchema)=>void
}

const ModalFilterOrders: React.FC<Props> = ({
    visibility,
    onClose,
    onApply
}) => {
    const {
        filters,
        setField,
        toggleStatus,
        reset,
        apply
    } = useFilterOrdersForm();



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
                                <Heading4>Filter Products</Heading4>
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
                            <Field
                                placeholder="email@example.com"
                                value={filters.email}
                                onChange={e=> setField("email", e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-4 ">
                                <Heading4 className="">Total:</Heading4>
                                <div className="grid grid-cols-2 gap-4">
                                    <FieldNumber
                                        value={filters.amountFrom}
                                        onChange={e=>setField("amountFrom", e.target.value)}
                                        step={1}
                                        min={0.0}
                                        max={1000}
                                        placeholder="Min Price"
                                    />
                                    <FieldNumber
                                        value={filters.amountTo}
                                        onChange={e=>setField("amountTo", e.target.value)}
                                        step={1}
                                        min={0.0}
                                        max={1000}
                                        placeholder="Max Price"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 ">
                                <Heading4 className="">Payment Method:</Heading4>
                                <Select
                                    options={[{label: "Mercado Pago", value: "mercado_pago"}, {label: "Oxa Pay", value: "oxa_pay"}]}
                                    selectedValue={filters.paymentMethod[0]}
                                    placeholder="Selecciona un país"
                                    onChange={(val) =>setField("paymentMethod", [val])}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 ">
                                <Heading4 className="">Status:</Heading4>
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <Checkbox
                                        label="Pending"
                                        checked={filters.status.includes("pending")}
                                        onChange={() => toggleStatus("pending")}
                                        bgCheckedColor="bg-tag-yellow-accent"
                                        borderCheckedColor="border-tag-yellow-accent"
                                        borderColor="border-tag-yellow-accent"
                                        iconColor="text-white"
                                    />
                                    <Checkbox
                                        label="Paid"
                                        checked={filters.status.includes("paid")}
                                        onChange={() => toggleStatus("paid")}
                                        bgCheckedColor="bg-tag-blue-accent"
                                        borderCheckedColor="border-tag-blue-accent"
                                        borderColor="border-tag-blue-accent"
                                        iconColor="text-white"
                                    />
                                    <Checkbox
                                        label="Processing"
                                        checked={filters.status.includes("processing")}
                                        onChange={() => toggleStatus("processing")}
                                        bgCheckedColor="bg-tag-purple-accent"
                                        borderCheckedColor="border-tag-purple-accent"
                                        borderColor="border-tag-purple-accent"
                                        iconColor="text-white"
                                    />
                                    <Checkbox
                                        label="Shipped"
                                        checked={filters.status.includes("shipped")}
                                        onChange={() => toggleStatus("shipped")}
                                        bgCheckedColor="bg-primary"
                                        borderCheckedColor="border-primary"
                                        borderColor="border-primary"
                                        iconColor="text-white"
                                    />
                                    <Checkbox
                                        label="Delivered"
                                        checked={filters.status.includes("delivered")}
                                        onChange={() => toggleStatus("delivered ")}
                                        bgCheckedColor="bg-gray"
                                        borderCheckedColor="border-gray"
                                        borderColor="border-gray"
                                        iconColor="text-white"
                                    />
                                    <Checkbox
                                        label="Cancelled"
                                        checked={filters.status.includes("cancelled")}
                                        onChange={() => toggleStatus("cancelled")}
                                        bgCheckedColor="bg-tag-red-accent"
                                        borderCheckedColor="border-tag-red-accent"
                                        borderColor="border-tag-red-accent"
                                        iconColor="text-white"
                                    />
                                </div>
                            </div>

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

export default ModalFilterOrders;
