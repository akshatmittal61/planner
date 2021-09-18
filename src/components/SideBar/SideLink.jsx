import React from 'react';
const SideLink = ({ icon, label, link }) => {
    return (
        <li className="side-bar-nav-links">
            <a href={link} className="side-bar-nav-link">
                <span className="side-bar-nav-link__icon material-icons">{icon}</span>
                <span className="side-bar-nav-link__label">{label}</span>
            </a>
        </li>
    )
}
export default SideLink;