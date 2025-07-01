/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import type { Category, CategoryForm } from "../../categories/schemas/CategorySchema";
import { toast } from "react-toastify";
import { updateCategory } from "../services/categoryService";


export const useEditCategory = (category: Category) => {
  const [formData, setFormData] = useState<CategoryForm>({
    name: category.name,
    description: category.description
  });
  const [loading, setLoading] = useState(false)

  const updateField = <K extends keyof CategoryForm>(field: K, value: CategoryForm[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateCategory = async()=>{
    try{
        setLoading(true)
        if(!formData.description && !formData.name){
            toast.error("El nombre y la descripcion son requeridos")
        }else{
            const res = await updateCategory(category.id, formData)
            if(res.success){
                toast.success(res.message)
            }
            else{
                toast.error(res.error.message)
            }
        }
    } catch (error) {
        toast.error("Hubo un error al actualizar la categoria.");
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
