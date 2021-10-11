import React, { useContext, useState } from 'react'
const WebContext = React.createContext()
export const useWebContext = () => {
    return useContext(WebContext);
}

export const WebProvider = ({ children }) => {
    const time = parseInt(Date().substring(16, 18));
    const [theme, setTheme] = useState((time > 7 && time < 20) ? "light" : "dark");
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
