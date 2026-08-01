import React, { createContext, useContext, ReactNode } from 'react';

const AdminContext = createContext<boolean>(false);

interface AdminProviderProps {
    children: ReactNode;
    is_admin: boolean;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children, is_admin }) => {
    return (
        <AdminContext.Provider value={is_admin}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = (): boolean => useContext(AdminContext);
