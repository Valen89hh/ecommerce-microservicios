import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductCart } from "@/types/product-types";

interface CartStore {
  products: ProductCart[];
  addToCart: (product: ProductCart) => void;
  updateAmount: (productId: number, newAmount: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      products: [],

      addToCart: (newProduct) => {
        const { products } = get();
        const existing = products.find(p => p.product.id === newProduct.product.id);

        if (existing) {
          const updatedProducts = products.map(p =>
            p.product.id === newProduct.product.id
              ? { ...p, amount: p.amount + newProduct.amount }
              : p
          );
          set({ products: updatedProducts });
        } else {
          set({ products: [...products, newProduct] });
        }
      },

      updateAmount: (productId, newAmount) => {
        const { products } = get();
        const updated = products.map(p =>
          p.product.id === productId ? { ...p, amount: newAmount } : p
        );
        set({ products: updated });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          products: state.products.filter(p => p.product.id !== productId),
        }));
      },

      clearCart: () => {
        set({ products: [] });
      },

      totalItems: () => {
        return get().products.reduce((acc, item) => acc + item.amount, 0);
      },
    }),
    {
      name: "cart-storage", // clave de localStorage
    }
  )
);
