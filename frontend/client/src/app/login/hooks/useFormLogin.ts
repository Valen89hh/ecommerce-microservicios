import { useState } from "react";

export type LoginForm = {
    email: string,
    password: string
}

type LoginErrors = Partial<Record<keyof LoginForm, string>>;

export function useFormLogin() {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<LoginErrors>({});

  const updateField = <K extends keyof LoginForm>(field: K, value: LoginForm[K]) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
    // También puedes limpiar el error del campo al editarlo
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: LoginErrors = {};

    // Validación del email
    if (!loginForm.email.trim()) {
        newErrors.email = "El correo electrónico es obligatorio";
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(loginForm.email)) {
            newErrors.email = "Ingresa un correo electrónico válido";
        }
    }

    // Validación de la contraseña
    if (!loginForm.password.trim()) {
        newErrors.password = "La contraseña es obligatoria";
    } else if (loginForm.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (!/[A-Za-z]/.test(loginForm.password) || !/[0-9]/.test(loginForm.password)) {
        newErrors.password = "La contraseña debe incluir letras y números";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (callback: (data: LoginForm) => void) => {
    if (validate()) {
        callback(loginForm);
    }
  };

  return {
    loginForm,
    updateField,
    errors,
    handleSubmit,
  };
}
