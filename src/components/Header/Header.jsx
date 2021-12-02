import React, { useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppsIcon from '@mui/icons-material/Apps';
import Theme from '../theme';
import AppBoxLink from './AppBoxLink';
import AppLinks from '../AppLinks.js';
import { Tooltip } from '@mui/material';

const Header = ({ sideBar }) => {
    AOS.init();
    const [appBoxExpand, setAppBoxExpand] = useState(false);
    return (
        <header className="header" data-aos="fade-down">
            <div className="header-left">
                <Tooltip title="Toggle Side Bar">
                    <button className="header-left__burger" onClick={sideBar}>
                        <MenuIcon className="header-left__burger-icon" />
                    </button>
                </Tooltip>
                <div className="header-left__title">
                    <Link to='/' className="header-left__title__text">Planner</Link>
                </div>
            </div>
            <div className="header-right">
                <div className="header-right-links">
                    <Theme />
                    <Tooltip title="Help & Feedback">
                        <Link to='/help'>
                            <button className="btn icon-btn header-right-link header-right-link-help">
                                <div className="header-right-link__icon" title="Help & Feedback">
                                    <HelpOutlineIcon />
                                </div>
                                <div className="header-right-link__text">
                                    <span>Help</span>
                                </div>
                            </button>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Apps">
                        <button className="btn icon-btn btn-small header-right-link apps" onClick={() => { setAppBoxExpand(!appBoxExpand) }}>
                            <div className="header-right-link__icon">
                                <AppsIcon />
                            </div>
                        </button>
                    </Tooltip>
                </div>
            </div>
            {
                appBoxExpand && <div className="header-appbox" data-aos="zoom-in-left">
                    {
                        AppLinks.map(((AppLink, index) => (
                            <AppBoxLink
                                key={index}
                                icon={AppLink.icon}
                                label={AppLink.label}
                                link={AppLink.link}
                                close={() => { setAppBoxExpand(false) }}
                            />
                        )))
                    }
                </div>
            }
        </header>
    )
}

export default Header
