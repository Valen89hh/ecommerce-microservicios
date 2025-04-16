import { useState } from "react";
import { ServerResponse } from "@/types/server-response";
import { LoginForm } from "./useFormLogin";
import { loginUser } from "../actions/login-user";
import { useRouter } from "next/navigation";

export function useLoginUser(){
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [result, setResult] = useState<ServerResponse<string> | null>(null)
    const router = useRouter()
    
    const onLoginUser = async(data: LoginForm) => {
        setLoadingLogin(true)
        console.log("Data del login: ", data)
        const res = await loginUser(data)
        if(res.success){
            router.push("/admin/products")
        }
        setResult(res)
        setLoadingLogin(false)
    }

    return {
        loadingLogin,
        result,
        onLoginUser
    }
     
}