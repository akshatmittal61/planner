import React from "react";
const AppBoxLink = ({ icon, label, link }) => {
    return (
        <a href={link} className="header-appbox-link">
            <span className="header-appbox-link__icon material-icons">{icon}</span>
            <span className="header-appbox-link__label">{label}</span>
        </a>
    )
}
export default AppBoxLink;