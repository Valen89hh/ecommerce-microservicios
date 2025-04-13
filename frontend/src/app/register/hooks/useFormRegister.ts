import { useState } from "react";

export type RegisterForm = {
    name: string,
    email: string,
    password: string
}

type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;

export function useFormRegister() {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<RegisterErrors>({});

  const updateField = <K extends keyof RegisterForm>(field: K, value: RegisterForm[K]) => {
    setRegisterForm(prev => ({ ...prev, [field]: value }));
    // También puedes limpiar el error del campo al editarlo
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: RegisterErrors = {};

    // Validación del nombre
    if (!registerForm.name.trim()) {
        newErrors.name = "El nombre es obligatorio";
    } else if (registerForm.name.trim().length < 2) {
        newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    // Validación del email
    if (!registerForm.email.trim()) {
        newErrors.email = "El correo electrónico es obligatorio";
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(registerForm.email)) {
            newErrors.email = "Ingresa un correo electrónico válido";
        }
    }

    // Validación de la contraseña
    if (!registerForm.password.trim()) {
        newErrors.password = "La contraseña es obligatoria";
    } else if (registerForm.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (!/[A-Za-z]/.test(registerForm.password) || !/[0-9]/.test(registerForm.password)) {
        newErrors.password = "La contraseña debe incluir letras y números";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (callback: (data: RegisterForm) => void) => {
    if (validate()) {
        callback(registerForm);
    }
  };

  return {
    registerForm,
    updateField,
    errors,
    handleSubmit,
  };
}
