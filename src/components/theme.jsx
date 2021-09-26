import React from "react";
import { useWebContext } from "./Context/WebContext";
function Theme() {
    //const [theme, setTheme] = useState("light");
    const { theme, setTheme } =useWebContext();
    const body = document.querySelector("body");
    function changeTheme() {
        setTheme((theme === "light") ? "dark" : "light");
    }
    body.setAttribute("class", theme);
    return (
        <div className="theme" onClick={changeTheme}>
            <span className="theme-icon material-icons" id={theme}>
                {`${theme}_mode`}
            </span>
        </div>
    )
}
export default Theme;