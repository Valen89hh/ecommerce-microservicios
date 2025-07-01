/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";
import { updateOrder } from "../services/ordersServices";
import type { Order, OrderForm } from "../schemas/OderSchema";


export const useDetailOrder = (order: Order) => {
  const [formData, setFormData] = useState<OrderForm>({
    ...order
  });
  const [loading, setLoading] = useState(false)

  const updateField = <K extends keyof OrderForm>(field: K, value: OrderForm[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateCategory = async()=>{
    try{
        setLoading(true)
        if(!formData.status){
            toast.error("El status es requerido")
        }else{
            const res = await updateOrder(order.id, formData)
            if(res.success){
                toast.success(res.message)
            }
            else{
                toast.error(res.error.message)
            }
        }
    } catch (error) {
        toast.error("Hubo un error al actualizar la orden.");
    }
    finally{
        setLoading(false)
    }
  }

  return {
    formData,
    updateField,
    loading,
    handleUpdateCategory
  };
};
