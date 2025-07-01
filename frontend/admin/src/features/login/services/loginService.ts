import { api } from "../../../lib/axios"

interface LoginParams {
    email: string,
    password: string
}
export async function login(data: LoginParams){
    const response = await api.post("/employee/login", data);
    console.log("Desde login: ", response)
    return response.data;
}