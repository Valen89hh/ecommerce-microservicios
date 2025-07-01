import React from "react";
import FieldDate from "../../../components/inputs/FieldDate";
import FieldNumber from "../../../components/inputs/FieldNumber";
import Select from "../../../components/inputs/Select";
import Heading3 from "../../../components/texts/Heading3";
import Heading4 from "../../../components/texts/Heading4";
import Card from "../../../components/ui/Card";
import FieldArea from "../../../components/inputs/FieldArea";
import type { HookLogisticsInformation } from "../hooks/useLogisticsInformation";

interface Props{
    hook: HookLogisticsInformation
}

const LogisticsInformation: React.FC<Props> = ({
    hook
}) => {
    const { logistics, updateField } = hook;
    return ( 
        <Card className="space-y-2">
            <Heading3>Logistics Information</Heading3>
            <div className="space-y-3">
                <div className="space-y-1">
                    <Heading4 className="text-muted dark:text-dark-muted">Weight (kg) *</Heading4>
                    <FieldNumber
                        value={logistics.weightKg}
                        onChange={e => updateField("weightKg", e.target.value)}
                        placeholder="0.0"
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Length *</Heading4>
                        <FieldNumber
                            value={logistics.length}
                            onChange={e => updateField("length", e.target.value)}
                            placeholder="0.0"
                        />
                    </div>
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Width *</Heading4>
                        <FieldNumber
                            value={logistics.width}
                            onChange={e => updateField("width", e.target.value)}
                            placeholder="0.0"
                        />
                    </div>
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Height *</Heading4>
                        <FieldNumber
                            value={logistics.height}
                            onChange={e => updateField("height", e.target.value)}
                            placeholder="0.0"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Is it a perceptible product?</Heading4>
                        <div className="w-1/2 flex">
                            <button type="button" onClick={()=>updateField("isPerishable", true)} className={`w-full cursor-pointer border p-2 rounded-tl-sm rounded-bl-sm ${logistics.isPerishable ? "bg-primary  border-primary dark:border-dark-primary dark:bg-dark-primary" : "bg-card  border-border dark:border-dark-border dark:bg-dark-card"}`}>
                                <Heading4 className={logistics.isPerishable ? "text-white dark:text-white" : "text-muted dark:text-dark-muted"}>Yes</Heading4>
                            </button>
                            <button type="button" onClick={()=>updateField("isPerishable", false)} className={`w-full cursor-pointer border p-2 rounded-tr-sm rounded-br-sm ${!logistics.isPerishable ? "bg-primary  border-primary dark:border-dark-primary dark:bg-dark-primary" : "bg-card  border-border dark:border-dark-border dark:bg-dark-card"}`}>
                                <Heading4 className={!logistics.isPerishable ? "text-white dark:text-white" : "text-muted dark:text-dark-muted"}>No</Heading4>
                            </button>
                        </div>
                    </div>
                    <div className={`space-y-1 ${logistics.isPerishable ? "opacity-100" : "opacity-50"}`}>
                        <Heading4 className="text-muted dark:text-dark-muted">Expiration Date</Heading4>
                        <FieldDate
                            disabled={!logistics.isPerishable}
                            value={logistics.expirationDate}
                            onChange={e=>updateField("expirationDate", e.target.value)}
                            placeholder="yyyy-mm-dd"
                        />
                    </div>
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Storage Type</Heading4>
                        <Select
                            selectedValue={logistics.storageType}
                            onChange={value=>updateField("storageType", value)}
                            
                            options={[
                                {label: "Refrigerated", value: "refrigerated"},
                                {label: "Frozen", value: "frozen"},
                                {label: "Ambient", value: "ambient"},
                                {label: "Dry", value: "dry"},
                                {label: "Supplement", value: "supplement"},
                                {label: "Light Protected", value: "light_protected"},
                            ]}
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <Heading4 className="text-muted dark:text-dark-muted">Shipping Unit *</Heading4>
                    <FieldArea
                        value={logistics.shippingUnit}
                        onChange={e => updateField("shippingUnit", e.target.value)}
                        placeholder="Describes how the product is physically packaged for shipping"
                        
                    />
                </div>
            </div>
        </Card>
     );
}
 
export default LogisticsInformation;