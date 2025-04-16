import { useState } from "react";
import { RegisterForm } from "./useFormRegister";
import { ServerResponse } from "@/types/server-response";
import { registerUser } from "../actions/register-user";
import { useRouter } from "next/navigation";

export function useRegisterUser(){
    const [loadingRegister, setLoadingRegister] = useState(false)
    const [result, setResult] = useState<ServerResponse<string> | null>(null)
    const router = useRouter()
    const onRegisterUser = async(data: RegisterForm) => {
        setLoadingRegister(true)
        console.log("Data del registro: ", data)
        const res = await registerUser(data)
        if(res.success){
            router.push("/admin/products")
        }
        setResult(res)
        setLoadingRegister(false)
    }

    return {
        loadingRegister,
        result,
        onRegisterUser
    }
     
}