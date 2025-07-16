'use client';

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
    id: number;
    email: string;
};

type UserContextType = {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);

    const setUser = (userData: User) => {
        setUserState(userData);
    };

    const logout = () => {
        setUserState(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
        {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser deve ser usado dentro de UserProvider");
    return context;
};
