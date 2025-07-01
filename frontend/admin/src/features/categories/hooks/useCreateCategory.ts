/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import type { CategoryForm } from "../../categories/schemas/CategorySchema";
import { toast } from "react-toastify";
import { createCategory } from "../services/categoryService";


export const useCreateCategory = (initData: CategoryForm = {
    name: "",
    description: "",
}) => {
  const [formData, setFormData] = useState<CategoryForm>(initData);
  const [loading, setLoading] = useState(false)

  const updateField = <K extends keyof CategoryForm>(field: K, value: CategoryForm[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateCategory = async()=>{
    try{
        setLoading(true)
        if(!formData.description && !formData.name){
            toast.error("El nombre y la descripcion son requeridos")
        }else{
            const res = await createCategory(formData)
            if(res.success){
                toast.success(res.message)
            }
            else{
                toast.error(res.error.message)
            }
        }
    } catch (error) {
        toast.error("Hubo un error al crear la categoria.");
    }
    finally{
        setLoading(false)
    }
  }

  return {
    formData,
    updateField,
    loading,
    handleCreateCategory
  };
};
