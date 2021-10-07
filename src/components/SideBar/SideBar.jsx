import React from 'react';
import AppLinks from '../AppLinks.js';
import SideLink from './SideLink';
import ContactImage from '../../images/contact.svg'
import { useWebContext } from '../Context/WebContext'
import Button from '../Button';
const SideBar = ({ aside, GoTo }) => {
    const { theme } = useWebContext();
    return (
        <aside className={`aside aside-${aside ? "expand" : "hide"}`}>
            <div className="side-bar">
                <nav className="side-bar-nav">
                    <ul className="side-bar-nav-list">
                        {
                            AppLinks.map(((AppLink, index) => (
                                <SideLink icon={AppLink.icon} label={AppLink.label} GoToLink={() => { GoTo(index) }} />
                            )))
                        }
                    </ul>
                </nav>
                <div className="side-bar-social">
                    <div className="side-bar-social-row">
                        <Button
                            text="Contact Us"
                            className="side-bar-social-row-button"
                            imgSrc={ContactImage}
                            alt="Contact Us"
                            onClick={() => GoTo(6)}
                            color="blue"
                            style={theme === "light" ? "outline" : "fill"}
                        />
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default SideBar;