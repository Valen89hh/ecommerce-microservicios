import { create } from "zustand";
import type { FilterProductSchema } from "../schemas/FilterProductSchema";

interface FilterProductStore{
    filter: FilterProductSchema;
    setFilter: (filter: FilterProductSchema)=>void
}

export const useModalFilterProductStore = create<FilterProductStore>((set)=>({
    filter: {
        searchName: null,
        minPrice: null,
        maxPrice: null,
        minStock: null,
        maxStock: null,
        category: null,
        status:[],
        startDate: null,
        endDate: null,
    },
    setFilter: (filter)=>set({filter: filter})
}))