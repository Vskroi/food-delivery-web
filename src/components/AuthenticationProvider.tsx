import { useRouter } from "next/navigation";
import { useEffect } from "react";
import jwt from "jsonwebtoken";

export const AuthenticationProvider = ({
    children, 
} : Readonly<{ children : React.ReactNode;}>) => {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token){
            router.push("login")
        }
        const tokenData = jwt.verify(token!, "123")
        console.log(tokenData)
    },[]);
    return children
}