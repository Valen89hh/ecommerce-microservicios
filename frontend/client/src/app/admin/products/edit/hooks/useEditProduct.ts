import { useState } from "react";
import { Product } from "@/types/models-database";

type ProductForm = {
    name: string,
    description: string,
    price: string,
    image: string
}

type ProductErrors = Partial<Record<keyof ProductForm, string>>;

export function useEditProduct(initialData: Product) {
  const [productForm, setProductForm] = useState<ProductForm>({
    name: initialData.name,
    description: initialData.description,
    price: initialData.price.toString(),
    image: initialData.image
  });
  const [errors, setErrors] = useState<ProductErrors>({});

  const updateField = <K extends keyof ProductForm>(field: K, value: ProductForm[K]) => {
    setProductForm(prev => ({ ...prev, [field]: value }));
    // También puedes limpiar el error del campo al editarlo
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: ProductErrors = {};

    if (!productForm.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!productForm.price.trim()) {
      newErrors.price = "El precio es obligatorio";
    }else {
        const priceFormat = parseFloat(productForm.price)
        if(isNaN(priceFormat)){
            newErrors.price = "El precio debe ser un numero valido"
        }else if (priceFormat < 0){
            newErrors.price = "El precio no debe ser negativo"
        }

    }

    if (!productForm.description.trim()){
        newErrors.description = "La descripcion es obligatorio"
    }

    if (!productForm.image.trim()){
        newErrors.image = "La imagen es requerida"
    }

    // Agrega más validaciones según el modelo

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (callback: (data: Product) => void) => {
    if (validate()) {
        const product: Product = {
            id: initialData.id,
            name: productForm.name.trim(),
            description: productForm.description.trim(),
            price: parseFloat(productForm.price),
            image: productForm.image.trim()
        }
        callback(product);
    }
  };

  return {
    productForm,
    updateField,
    errors,
    handleSubmit,
  };
}
