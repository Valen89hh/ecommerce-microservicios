import type { ChangeEventHandler } from "react";
import FieldNumber from "../../../components/inputs/FieldNumber";
import Select from "../../../components/inputs/Select";
import Heading3 from "../../../components/texts/Heading3";
import Heading4 from "../../../components/texts/Heading4";
import Card from "../../../components/ui/Card";
import type { HookPriceAndStock } from "../hooks/usePriceAndStock";
import type React from "react";

const FieldNumberBlock = ({
    label,
    value,
    onChange,
    readOnly = false
}: {
    label: string;
    value: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    readOnly?: boolean;
}) => (
    <div className="space-y-1">
        <Heading4 className="text-muted dark:text-dark-muted">{label}</Heading4>
        <FieldNumber
            placeholder="0.0"
            value={value}
            onChange={onChange}
            readOnly={readOnly}
        />
    </div>
);

interface Props{
    hook: HookPriceAndStock
}

const PriceAndStock: React.FC<Props> = ({
    hook
}) => {
    const {formData, updateField} = hook
    return ( 
        <Card className="space-y-2">
            <Heading3>Price and Stock</Heading3>
            <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                    <FieldNumberBlock label="Cost Price *" value={formData.costPrice} onChange={(v) => updateField("costPrice", v.target.value)} />
                    <FieldNumberBlock label="Sale Price *" value={formData.salePrice} onChange={(v) => updateField("salePrice", v.target.value)} />
                    <FieldNumberBlock label="Promotional Price" value={formData.promotionalPrice} onChange={(v) => updateField("promotionalPrice", v.target.value)} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <FieldNumberBlock label="Stock *" value={formData.stock} onChange={(v) => updateField("stock", v.target.value)} />
                    <FieldNumberBlock label="Minimun Stock *" value={formData.minStock} onChange={(v) => updateField("minStock", v.target.value)} />
                    <FieldNumberBlock label="Maximun Stock *" value={formData.maxStock} onChange={(v) => updateField("maxStock", v.target.value)} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Unit *</Heading4>
                        <Select
                            placeholder="Select Unit"
                            selectedValue={formData.unit}
                            onChange={(v) => updateField("unit", v)}
                            options={[
                                { label: "Units (u)", value: "u" },
                                { label: "Grams (g)", value: "g" },
                                { label: "Kilograms (kg)", value: "kg" },
                                { label: "Milliliters (ml)", value: "ml" },
                                { label: "Liters (l)", value: "l" }
                            ]}
                        />
                    </div>
                    <FieldNumberBlock label="Unit Amount *" value={formData.unitAmount} onChange={(v) => updateField("unitAmount", v.target.value)} />
                    <FieldNumberBlock label="Units Available (readonly)" value={formData.unitsAvailable} readOnly />
                </div>
            </div>
        </Card>
     );
};


 
export default PriceAndStock;