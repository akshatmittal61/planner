import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AppsIcon from '@material-ui/icons/Apps';
import Theme from '../theme';
import AppBox from './AppBox';

const Header = ({ sideBar }) => {
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
            {appBoxExpand && <AppBox />}
        </header>
    )
}

export default Header
