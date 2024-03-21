import React, {createContext, useState} from "react";


export const AnbefalteDestContext = createContext();

export const AnbefalteDestProvider = ({ children }) => {
    const [visAnbefalinger, setVisAnbefalinger] = useState(false);
    
    return (
        <AnbefalteDestContext.Provider value={{ visAnbefalinger, setVisAnbefalinger }}>
        {children}
        </AnbefalteDestContext.Provider>
    );
    };

export default AnbefalteDestProvider;