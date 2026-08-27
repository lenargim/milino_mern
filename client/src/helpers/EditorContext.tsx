import React, { createContext, useContext, ReactNode } from 'react';
import {UserTypesType} from "../api/apiTypes";

const EditorContext = createContext<UserTypesType>('designer');

interface EditorProviderProps {
    children: ReactNode;
    user_type: UserTypesType;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children, user_type }) => {
    const editor = user_type ?? 'designer'
    return (
        <EditorContext.Provider value={editor}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = (): UserTypesType => useContext(EditorContext);
