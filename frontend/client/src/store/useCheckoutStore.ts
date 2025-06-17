import { create } from "zustand";
import { PaymentMethod, UserInfo } from "@/types/checkout-types";

interface CheckoutStore {
  customer: UserInfo | null;
  paymentMethod: PaymentMethod | null;
  setCustomer: (customer: UserInfo | null) => void;
  setPaymentMethod: (paymentMethod: PaymentMethod | null) => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  customer: null,
  paymentMethod: null,
  setCustomer: (customer) => set({ customer }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
}));
