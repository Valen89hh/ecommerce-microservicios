"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useFormLogin } from "./hooks/useFormLogin";
import { useLoginUser } from "./hooks/useLoginUser";
import React from "react";
import { loginGoogle } from "./actions/login-google";

const LoginPage = () => {
    const {loginForm, errors, updateField, handleSubmit} = useFormLogin()
    const {loadingLogin, result, onLoginUser} = useLoginUser()
    
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSubmit(onLoginUser)
    }

    const handleLogin = () => {
        window.location.href = "/auth/google";
      };
     

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-sky-700 text-center">Iniciar sesión</h2>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Correo electrónico</label>
                        <input
                            type="email"
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700"
                            placeholder="ejemplo@correo.com"
                            required
                            value={loginForm.email}
                            onChange={e=> updateField("email", e.target.value)}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700"
                            placeholder="••••••••"
                            required
                            value={loginForm.password}
                            onChange={e=> updateField("password", e.target.value)}
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>

                    <button
                        disabled={loadingLogin}
                        type="submit"
                        className={`
                            w-full py-2 font-semibold rounded-md transition-colors
                            ${loadingLogin ? "bg-sky-400 cursor-not-allowed" : "bg-sky-700 hover:bg-sky-800"}
                            text-white
                        `}
                    >
                        {loadingLogin ? "Inciando sesión..." : "Iniciar sesión"}
                    </button>

                    <button
                        disabled={loadingLogin}
                        onClick={handleLogin}
                        type="button"
                        className="w-full py-2 border flex items-center justify-center gap-2 rounded-md hover:bg-gray-100 transition"
                    >
                        <FcGoogle className="text-xl" />
                        Iniciar con Google
                    </button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-600">
                    ¿No tienes una cuenta?{" "}
                    <Link href="/register" className="text-sky-700 font-semibold hover:underline">
                        Regístrate
                    </Link>
                </p>
                {(result && result.success) && <p className="text-green-500">{result.data}</p>}
                {(result && !result.success) && <p className="text-red-500">{result.error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
