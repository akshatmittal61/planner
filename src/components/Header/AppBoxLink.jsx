import React from "react";
const AppBoxLink = ({ icon, label, GoToLink }) => {
    return (
        <span className="header-appbox-link" onClick={GoToLink}>
            <span className="header-appbox-link__icon material-icons">{icon}</span>
            <span className="header-appbox-link__label">{label}</span>
        </span>
    )
}
export default AppBoxLink;