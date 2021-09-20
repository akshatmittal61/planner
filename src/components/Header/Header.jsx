import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppsIcon from '@mui/icons-material/Apps';
import Theme from '../theme';
import AppBoxLink from './AppBoxLink';
import AppLinks from '../AppLinks.js';

const Header = ({ sideBar, GoTo }) => {
    const [appBoxExpand, setAppBoxExpand] = useState(false);
    return (
        <header className="header">
            <div className="header-left">
                <div className="header-left__burger" onClick={sideBar}>
                    <MenuIcon className="header-left__burger-icon" />
                </div>
                <div className="header-left__title">
                    <span className="header-left__title__text">Planner</span>
                </div>
            </div>
            <div className="header-right">
                <div className="header-right-links">
                    <div className="header-right-link theme">
                        <Theme />
                    </div>
                    <div className="header-right-link help">
                        <div className="header-right-link__icon" title="Help & Feedback">
                            <HelpOutlineIcon />
                        </div>
                        <div className="header-right-link__text">
                            <span>Help</span>
                        </div>
                    </div>
                    <div className="header-right-link apps" onClick={() => { setAppBoxExpand(!appBoxExpand) }}>
                        <div className="header-right-link__icon">
                            <AppsIcon />
                        </div>
                    </div>
                </div>
            </div>
            {
                appBoxExpand && <div className="header-appbox">
                    {
                        AppLinks.map(((AppLink, index) => (
                            <AppBoxLink icon={AppLink.icon} label={AppLink.label} GoToLink={() => { GoTo(index) }} />
                        )))
                    }
                </div>
            }
        </header>
    )
}

export default Header
