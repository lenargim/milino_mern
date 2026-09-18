import React, { createContext, useContext, ReactNode } from 'react';
import {UserAllTypesType, UserBasicTypesType, UserTypesType} from "../api/apiTypes";

const EditorContext = createContext<UserAllTypesType>('designer');

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

export const useEditor = (): UserAllTypesType => useContext(EditorContext);
