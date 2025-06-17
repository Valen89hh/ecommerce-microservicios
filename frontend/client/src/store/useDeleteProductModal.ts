// store/useDeleteProductModal.ts
import { create } from "zustand";
import { Product } from "@/types/models-database";

interface DeleteProductModalState {
  isOpen: boolean;
  product: Product | null;
  openModal: (product: Product) => void;
  closeModal: () => void;
}

export const useDeleteProductModal = create<DeleteProductModalState>((set) => ({
  isOpen: false,
  product: null,
  openModal: (product) => set({ isOpen: true, product }),
  closeModal: () => set({ isOpen: false, product: null }),
}));
