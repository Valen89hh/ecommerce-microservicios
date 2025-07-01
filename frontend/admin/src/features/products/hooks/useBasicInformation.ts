import { useEffect, useState } from "react";
import type { ProductBasicInfo } from "../schemas/Product";
import type { Category } from "../../categories/schemas/CategorySchema";
import { getCategoriesFull } from "../../categories/services/categoryService";

export interface HookBasicInformation{
    formData: ProductBasicInfo;
    updateField: <K extends keyof ProductBasicInfo>(field: K, value: ProductBasicInfo[K]) => void,
    categories: Category[]
}


export const useBasicInformation = (initData: ProductBasicInfo = {
    name: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
  
}): HookBasicInformation => {
  const [formData, setFormData] = useState<ProductBasicInfo>(initData);
  const [categories, setCategories] = useState<Category[]>([])

  const updateField = <K extends keyof ProductBasicInfo>(field: K, value: ProductBasicInfo[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(()=>{
    async function initCategories() {
      const res = await getCategoriesFull();
      if(res.success){
        setCategories(res.data)
      }
    }

    initCategories()
  }, [])

  return {
    formData,
    updateField,
    categories,
  };
};
