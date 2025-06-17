import { useCheckoutStore } from "@/store/useCheckoutStore";
import { UserInfo } from "@/types/checkout-types";
import { useState } from "react";


type UserInfoErrors = Partial<Record<keyof UserInfo, string>>;

export function useUserInfo() {
  const {customer} = useCheckoutStore()
  const [userInfoForm, setUserInfoForm] = useState<UserInfo>({
    name: customer ? customer.name : "",
    email: customer ? customer.email : "",
    address: customer ? customer.address : ""
  });
  const [errors, setErrors] = useState<UserInfoErrors>({});

  const updateField = <K extends keyof UserInfo>(field: K, value: UserInfo[K]) => {
    setUserInfoForm(prev => ({ ...prev, [field]: value }));
    // También puedes limpiar el error del campo al editarlo
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: UserInfoErrors = {};

    // Validación del email
    if (!userInfoForm.name.trim()) {
        newErrors.name = "El nombre es obligatorio";
    }

    // Validación del email
    if (!userInfoForm.email.trim()) {
        newErrors.email = "El correo electrónico es obligatorio";
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userInfoForm.email)) {
            newErrors.email = "Ingresa un correo electrónico válido";
        }
    }

    // Validación de la contraseña
    if (!userInfoForm.address.trim()) {
        newErrors.address = "La direccion es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (callback: (data: UserInfo) => void) => {
    if (validate()) {
        callback(userInfoForm);
    }
  };

  return {
    userInfoForm,
    updateField,
    errors,
    handleSubmit,
  };
}
