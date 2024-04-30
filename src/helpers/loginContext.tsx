'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import LoginPage from "@/app/login/page";
import { usePathname } from 'next/navigation'

export const Login = React.createContext<{ token: string, setToken: Function }>({
    token: "",
    setToken: () => { }
});

export function LoginWrapper({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState("");
    const userToken = localStorage.getItem("token") || "";
    const router = useRouter();
    const pathname = usePathname()
    if (!userToken) {
        router.replace("/login?" + new URLSearchParams({ caller: pathname }))
    }
    return (
        <Login.Provider value={{ token: userToken, setToken }}>
            {children}
        </Login.Provider>
    )
}

export default LoginWrapper;