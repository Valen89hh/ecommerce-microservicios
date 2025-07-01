/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { login } from "../services/loginService";
import { useAuth } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

interface LoginFormState {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {login: setLogin} = useAuth()
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulación de login (reemplaza con tu lógica real)
      if (!form.email || !form.password) {
        throw new Error("Por favor completa todos los campos.");
      }

      console.log("🔐 Enviando login:", form);
      const res = await login({email: form.email, password: form.password})
      console.log(res)
      setLogin(res.data.employee, res.data.authorisation.token)
      navigate('/dashboard');
    } catch (err: any) {
        console.log(err)
        setError(err.response.data.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
