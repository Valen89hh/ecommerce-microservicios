// store/useProductStore.ts
import { create } from "zustand";
import { Product } from "@/types/models-database";

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  removeProduct: (productId: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),
}));
