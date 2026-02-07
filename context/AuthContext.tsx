import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Check for existing session
        const auth = localStorage.getItem('majestic_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        // Mock authentication
        // In a real app, this would hit an API endpoint
        return new Promise((resolve) => {
            setTimeout(() => {
                if (username === 'admin' && password === 'password123') {
                    setIsAuthenticated(true);
                    localStorage.setItem('majestic_auth', 'true');
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 800); // Simulate network delay
        });
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('majestic_auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
