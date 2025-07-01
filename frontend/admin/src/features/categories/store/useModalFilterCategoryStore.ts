import { create } from "zustand";
import type { FilterCategorySchema } from "../schemas/CategorySchema";

interface FilterCategoryStore{
    filter: FilterCategorySchema;
    setFilter: (filter: FilterCategorySchema)=>void
}

export const useModalFilterCategoryStore = create<FilterCategoryStore>((set)=>({
    filter: {
        name: null,
        startDate: null,
        endDate: null,
    },
    setFilter: (filter)=>set({filter: filter})
}))