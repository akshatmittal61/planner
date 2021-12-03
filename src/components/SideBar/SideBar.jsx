import React from 'react';
import { Link } from 'react-router-dom';
import AppLinks from '../AppLinks.js';
import SideLink from './SideLink';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactImage from '../../images/contact.svg'
import Button from '../Button';
import { useWebContext } from '../Context/WebContext'
const SideBar = ({ aside, GoTo }) => {
    AOS.init();
    const { theme } = useWebContext();
    return (
        <aside className={`aside aside-${aside ? "expand" : "hide"}`}>
            <div className="side-bar" data-aos="fade-right">
                <nav className="side-bar-nav">
                    <ul className="side-bar-nav-list">
                        {
                            AppLinks.map(((AppLink, index) => (
                                <SideLink
                                    key={index}
                                    icon={AppLink.icon}
                                    label={AppLink.label}
                                    link={AppLink.link}
                                    close={() => { GoTo(index) }}
                                />
                            )))
                        }
                    </ul>
                </nav>
                <div className="side-bar-social">
                    <Button
                        text="Contact Us"
                        variant={theme === "light" ? "outline" : "fill"}
                        className="side-bar-social-row-button"
                        imgSrc={ContactImage}
                        imgAlt="Contact Us"
                        color="blue"
                        containsLink={true}
                        link='/contact'
                    />
                </div>
            </div>
        </aside>
    )
}

export default SideBar;
