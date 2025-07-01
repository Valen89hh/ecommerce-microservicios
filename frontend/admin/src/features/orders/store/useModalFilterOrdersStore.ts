import { create } from "zustand";
import type { FilterOrderSchema } from "../schemas/OderSchema";

interface FilterProductStore{
    filter: FilterOrderSchema;
    setFilter: (filter: FilterOrderSchema)=>void
}

export const useModalFilterOrderStore = create<FilterProductStore>((set)=>({
    filter: {
        name: null,
        email: null,
        amountFrom: null,
        amountTo: null,
        status:[],
        paymentMethod:[],
        startDate: null,
        endDate: null,
    },
    setFilter: (filter)=>set({filter: filter})
}))