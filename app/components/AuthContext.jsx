import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(sessionStorage.getItem('token') || null);
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        console.log("Retrieved token from sessionStorage:", token);
        if (token) {
            setAuthToken(token); 
        }
    }, []); 

    const login = (token) => {
        sessionStorage.setItem('token', token);
        setAuthToken(token); 
    };

     const logout = () => {
        toast("Signing Out....", {
            duration: 2000,
        });

        setTimeout(() => {
            sessionStorage.removeItem('token');
            setAuthToken(null); 
        }, 2000); 
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
