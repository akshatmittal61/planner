import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppsIcon from '@mui/icons-material/Apps';
import Theme from '../theme';
import AppBoxLink from './AppBoxLink';
import AppLinks from '../AppLinks.js';
import { Tooltip } from '@mui/material';

const Header = ({ sideBar, GoTo, onHelp }) => {
    const [appBoxExpand, setAppBoxExpand] = useState(false);
    return (
        <header className="header">
            <div className="header-left">
                <Tooltip title="Toggle Side Bar">
                    <div className="header-left__burger" onClick={sideBar}>
                        <MenuIcon className="header-left__burger-icon" />
                    </div>
                </Tooltip>
                <div className="header-left__title" onClick={() => { GoTo(-1) }}>
                    <span className="header-left__title__text">Planner</span>
                </div>
            </div>
            <div className="header-right">
                <div className="header-right-links">
                    <div className="header-right-link theme">
                        <Theme />
                    </div>
                    <Tooltip title="Help & Feedback">
                        <div className="header-right-link header-right-link-help" onClick={onHelp}>
                            <div className="header-right-link__icon" title="Help & Feedback">
                                <HelpOutlineIcon />
                            </div>
                            <div className="header-right-link__text">
                                <span>Help</span>
                            </div>
                        </div>
                    </Tooltip>
                    <Tooltip title="Apps">
                        <div className="header-right-link apps" onClick={() => { setAppBoxExpand(!appBoxExpand) }}>
                            <div className="header-right-link__icon">
                                <AppsIcon />
                            </div>
                        </div>
                    </Tooltip>
                </div>
            </div>
            {
                appBoxExpand && <div className="header-appbox">
                    {
                        AppLinks.map(((AppLink, index) => (
                            <AppBoxLink
                                key={index}
                                icon={AppLink.icon}
                                label={AppLink.label}
                                GoToLink={() => {
                                    setAppBoxExpand(false);
                                    GoTo(index);
                                }}
                            />
                        )))
                    }
                </div>
            }
        </header>
    )
}

export default Header
