import React from "react";
import { Link } from 'react-router-dom';

const AppBoxLink = ({ icon, label, link, close }) => {
    return (
        <Link to={link} className="header-appbox-link" onClick={close}>
            <span className="header-appbox-link__icon material-icons">{icon}</span>
            <span className="header-appbox-link__label">{label}</span>
        </Link>
    )
}

export default AppBoxLink
