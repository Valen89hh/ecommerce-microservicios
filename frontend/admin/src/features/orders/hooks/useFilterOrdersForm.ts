// src/app/dashboard/products/hooks/useFilterProductsForm.ts
import { useState } from "react";
import { useModalFilterOrderStore } from "../store/useModalFilterOrdersStore";
import type { FilterOrderForm, FilterOrderSchema } from "../schemas/OderSchema";

const defaultValues: FilterOrderForm = {
  name: "",
  email: "",
  amountFrom: "",
  amountTo: "",
  status: [],
  paymentMethod: [],
  startDate: "",
  endDate: "",
};

export const useFilterOrdersForm = () => {
  const [filters, setFilters] = useState<FilterOrderForm>(defaultValues);
  const {setFilter} = useModalFilterOrderStore()



  const setField = <K extends keyof FilterOrderForm>(
    field: K,
    value: FilterOrderForm[K]
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

  const apply = (onApply: (data: FilterOrderSchema)=>void)=>{
    const dV: FilterOrderSchema = {
        name: filters.name || null,
        email: filters.email || null,
        amountFrom: filters.amountFrom ? Number(filters.amountFrom) : null,
        amountTo: filters.amountTo ? Number(filters.amountTo) : null,
        status: filters.status,
        paymentMethod: filters.paymentMethod,
        startDate: filters.startDate || null,
        endDate: filters.endDate || null,
    }

    onApply(dV)
    setFilter(dV)
  }

  return {
    filters,
    setField,
    toggleStatus,
    reset,
    apply
  };
};
