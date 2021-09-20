import React from 'react';
import AppLinks from '../AppLinks.js';
import SideLink from './SideLink';
import SocialObject from './SocialObject';
const SideBar = ({ aside, GoTo }) => {
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
                    <div className="side-bar-social-row row">
                        <SocialObject link="https://twitter.com/akshatmittal61" name="Twitter" />
                        <SocialObject link="https://www.linkedin.com/in/akshat-mittal-851073202/" name="LinkedIn" />
                        <SocialObject link="https://github.com/akshatmittal61" name="GitHub" />
                        <SocialObject link="mailto:akshatmittal2506@gmail.com" name="Mail" />
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default SideBar;