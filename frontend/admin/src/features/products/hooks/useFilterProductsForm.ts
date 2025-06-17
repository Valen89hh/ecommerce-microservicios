// src/app/dashboard/products/hooks/useFilterProductsForm.ts
import { useState } from "react";
import type { FilterProductForm, FilterProductSchema } from "../schemas/FilterProductSchema";

const defaultValues: FilterProductForm = {
  searchName: "",
  minPrice: "",
  maxPrice: "",
  minStock: "",
  maxStock: "",
  category: "",
  status: [],
  startDate: "",
  endDate: "",
};

export const useFilterProductsForm = () => {
  const [filters, setFilters] = useState<FilterProductForm>(defaultValues);

  const setField = <K extends keyof FilterProductForm>(
    field: K,
    value: FilterProductForm[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleStatus = (statusValue: string) => {
    setFilters((prev) => {
      const current = prev.status;
      return {
        ...prev,
        status: current.includes(statusValue)
          ? current.filter((s) => s !== statusValue)
          : [...current, statusValue],
      };
    });
  };

  const reset = () => {
    setFilters(defaultValues);
  };

  const apply = (onApply: (data: FilterProductSchema)=>void)=>{
    const dV: FilterProductSchema = {
        searchName: filters.searchName || null,
        minPrice: filters.minPrice ? Number(filters.minPrice) : null,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : null,
        minStock: filters.minStock ? Number(filters.minStock) : null,
        maxStock: filters.maxStock ? Number(filters.maxStock) : null,
        category: filters.category || null,
        status: filters.status,
        startDate: filters.startDate || null,
        endDate: filters.endDate || null,
    }

    onApply(dV)
  }

  return {
    filters,
    setField,
    toggleStatus,
    reset,
    apply
  };
};
