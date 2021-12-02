import React from 'react';
import { Link } from 'react-router-dom';

const SideLink = ({ icon, label, link, close }) => {
    return (
        <li className="side-bar-nav-links">
            <Link to={link} className="side-bar-nav-link" onClick={close}>
                <span className="side-bar-nav-link__icon material-icons">{icon}</span>
                <span className="side-bar-nav-link__label">{label}</span>
            </Link>
        </li>
    )
}
export default SideLink;