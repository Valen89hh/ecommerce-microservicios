import { useState } from "react";
import { RegisterForm } from "./useFormRegister";
import { ServerResponse } from "@/types/server-response";

export function useRegisterUser(){
    const [loadingRegister, setLoadingRegister] = useState(false)
    const [result, setResult] = useState<ServerResponse<string> | null>(null)
    const onRegisterUser = async(data: RegisterForm) => {
        setLoadingRegister(true)
        console.log("Data del registro: ", data)
        setLoadingRegister(false)
    }

    return {
        loadingRegister,
        result,
        onRegisterUser
    }
     
}