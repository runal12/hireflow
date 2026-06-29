import { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const isAuthenticated = !!user;

    useEffect(() => {

        async function loadUser() {

            const token = localStorage.getItem("access");

            if (!token) return;

            try {

                const res = await client.get("auth/users/me/");

                setUser(res.data);

            } catch {

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
            }

        }

        loadUser();

    }, []);

    async function login(username, password) {

        const tokenRes = await client.post("auth/login/", {
            username,
            password,
        });

        localStorage.setItem("access", tokenRes.data.access);
        localStorage.setItem("refresh", tokenRes.data.refresh);

        const userRes = await client.get("auth/users/me/");

        setUser(userRes.data);

    }

    function logout() {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUser(null);

    }

    return (
        <AuthContext.Provider
            value={{
                user,
                role: user?.role,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}