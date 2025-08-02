import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userPublicId, setUserPublicId] = useState(undefined);
    useEffect(() => {
        const publicId = JSON.parse(localStorage.getItem("publicId"));
        try {
            if(publicId) {
                setUserPublicId(publicId);
            }
        }
        catch(error) {
            console.error("Error occured while getting user from local storage.", error);
            localStorage.removeItem("publicId");
        }
    }, []);
    const login = (publicId) => {
        setUserPublicId(publicId);
        localStorage.setItem("publicId", JSON.stringify(publicId));
    }
    const logout = () => {
        localStorage.clear();
        setUserPublicId(undefined);
    }
  return (
    <AuthContext.Provider value={{login, logout, userPublicId}}>
        {children}
    </AuthContext.Provider>
  )
};

