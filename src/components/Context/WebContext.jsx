import React, { useContext, useState } from 'react'
const WebContext = React.createContext()
export const useWebContext = () => {
    return useContext(WebContext);
}

export const WebProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const value = {
        theme, setTheme
    }
    return (
        <WebContext.Provider value={value}>
            {children}
        </WebContext.Provider>
    )
}
export default WebContext
