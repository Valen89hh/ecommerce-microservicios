import { useState } from "react";
import type { ProductBasicInfo } from "../schemas/Product";

export interface HookBasicInformation{
    formData: ProductBasicInfo;
    updateField: <K extends keyof ProductBasicInfo>(field: K, value: ProductBasicInfo[K]) => void
}

export const useBasicInformation = (): HookBasicInformation => {
  const [formData, setFormData] = useState<ProductBasicInfo>({
    name: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
  });

  const updateField = <K extends keyof ProductBasicInfo>(field: K, value: ProductBasicInfo[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    formData,
    updateField,
  };
};
