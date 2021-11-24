import React from 'react';
import AppLinks from '../AppLinks.js';
import SideLink from './SideLink';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactImage from '../../images/contact.svg'
import Button from '../Button';
const SideBar = ({ aside, GoTo }) => {
    AOS.init();
    return (
        <aside className={`aside aside-${aside ? "expand" : "hide"}`}>
            <div className="side-bar" data-aos="fade-right">
                <nav className="side-bar-nav">
                    <ul className="side-bar-nav-list">
                        {
                            AppLinks.map(((AppLink, index) => (
                                <SideLink key={index} icon={AppLink.icon} label={AppLink.label} GoToLink={() => { GoTo(index) }} />
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
                            imgAlt="Contact Us"
                            onClick={() => GoTo(6)}
                            color="blue"
                        />
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default SideBar;
