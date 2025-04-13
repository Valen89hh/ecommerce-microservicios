import { useState } from "react";
import { ServerResponse } from "@/types/server-response";
import { LoginForm } from "./useFormLogin";

export function useLoginUser(){
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [result, setResult] = useState<ServerResponse<string> | null>(null)
    const onLoginUser = async(data: LoginForm) => {
        setLoadingLogin(true)
        console.log("Data del login: ", data)
        setLoadingLogin(false)
    }

    return {
        loadingLogin,
        result,
        onLoginUser
    }
     
}