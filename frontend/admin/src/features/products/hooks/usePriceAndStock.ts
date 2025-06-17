import { useState, useEffect } from "react";
import type { PriceAndStockData } from "../schemas/Product";

export interface HookPriceAndStock {
    formData: PriceAndStockData;
    updateField: <K extends keyof PriceAndStockData>(field: K, value: PriceAndStockData[K]) => void;
}

export const usePriceAndStock = (): HookPriceAndStock => {
    const [formData, setFormData] = useState<PriceAndStockData>({
        costPrice: "",
        salePrice: "",
        promotionalPrice: "",
        stock: "",
        minStock: "",
        maxStock: "",
        unit: "",
        unitAmount: "",
        unitsAvailable: "", // este será calculado automáticamente
    });

    const updateField = <K extends keyof PriceAndStockData>(field: K, value: PriceAndStockData[K]) => {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
      };

    // Calculamos automáticamente las unidades disponibles
    useEffect(() => {
        const stock = parseFloat(formData.stock);
        const unitAmount = parseFloat(formData.unitAmount);

        if (!isNaN(stock) && !isNaN(unitAmount) && unitAmount > 0) {
            const result = stock / unitAmount;
            updateField("unitsAvailable", result.toFixed(2));
        } else {
            updateField("unitsAvailable", "0");
        }
    }, [formData.stock, formData.unitAmount]);

    return {
        formData,
        updateField,
    };
}
