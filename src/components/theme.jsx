import React from "react";
import { Tooltip } from "@mui/material";
import { useWebContext } from "./Context/WebContext";
function Theme() {
    const { theme, setTheme } = useWebContext();
    const body = document.querySelector("body");
    function changeTheme() {
        setTheme((theme === "light") ? "dark" : "light");
    }
    body.setAttribute("class", theme);
    return (
        <Tooltip title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            <button className="btn icon-btn icon-btn-sm" onClick={changeTheme}>
                <span className="material-icons" id={theme}>
                    {`${theme}_mode`}
                </span>
            </button>
        </Tooltip>
    )
}
export default Theme;