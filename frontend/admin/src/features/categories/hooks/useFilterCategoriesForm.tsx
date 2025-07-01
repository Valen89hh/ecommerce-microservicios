// src/app/dashboard/products/hooks/useFilterProductsForm.ts
import { useState } from "react";
import type { FilterCategoryForm, FilterCategorySchema } from "../../categories/schemas/CategorySchema";
import { useModalFilterCategoryStore } from "../store/useModalFilterCategoryStore";

const defaultValues: FilterCategoryForm = {
  name: "",
  startDate: "",
  endDate: "",
};

export const useFilterCategoriesForm = () => {
  const [filters, setFilters] = useState<FilterCategoryForm>(defaultValues);
  const {setFilter} = useModalFilterCategoryStore()


  const setField = <K extends keyof FilterCategoryForm>(
    field: K,
    value: FilterCategoryForm[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const reset = () => {
    setFilters(defaultValues);
  };

  const apply = (onApply: (data: FilterCategorySchema)=>void)=>{
    const dV: FilterCategorySchema = {
        name: filters.name || null,
        startDate: filters.startDate || null,
        endDate: filters.endDate || null,
    }

    onApply(dV)
    setFilter(dV)
  }

  return {
    filters,
    setField,
    reset,
    apply
  };
};
