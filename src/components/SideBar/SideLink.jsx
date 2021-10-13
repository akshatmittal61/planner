import React from 'react';
const SideLink = ({ icon, label, GoToLink }) => {
    return (
        <li className="side-bar-nav-links">
            <span className="side-bar-nav-link" onClick={GoToLink}>
                <span className="side-bar-nav-link__icon material-icons">{icon}</span>
                <span className="side-bar-nav-link__label">{label}</span>
            </span>
        </li>
    )
}
export default SideLink;