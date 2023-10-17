/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { ReactNode, useContext, createContext, useEffect, useState } from "react";

type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;

    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Fixed variable name (IsLoggedIn -> isLoggedIn)

    useEffect(() => {
        // Fetch if user cookies are valid, then set isLoggedIn and user
    }, []);

    const login = async (email: string, password: string) => {
        // Implement the login logic here
    };

    const signup = async (name: string, email: string, password: string) => {
        // Implement the signup logic here
    };

    const logout = async () => {
        // Implement the logout logic here
    };

    const value: UserAuth = {
        user,
        isLoggedIn, // Fixed variable name (IsLoggedIn -> isLoggedIn)
        login,
        logout,
        signup,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; // Added {children} to ensure children components are rendered
};

export const useAuth = () => useContext(AuthContext);
