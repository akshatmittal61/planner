import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';

const Card = ({ name, image, about, socials }) => {
    AOS.init();
    const icons = [<TwitterIcon />, <LinkedInIcon />, <GitHubIcon />, <CallIcon />, <MailIcon />];
    return (
        <div className="card-frame">
            <div className="card-box">
                <div className="card">
                    <div className="card-image">
                        <img alt={name} src={image} className="card-image__img" />
                    </div>
                    <div className="card-content">
                        <div className="card-side card-side-front">
                            <div className="card-user">
                                <span className="card-name">
                                    {name}
                                </span>
                                <span className="card-about">
                                    {about}
                                </span>
                            </div>
                        </div>
                        <div className="card-side card-side-back">
                            <div className="card-social">
                                {
                                    socials.map((social, index) => (
                                        <div className="card-social-row" key={index}>
                                            <a href={social.link} className="card-social-link">
                                                <div className="card-social-link-icon">
                                                    {icons[index]}
                                                </div>
                                                <div className="card-social-link-username">
                                                    {social.username}
                                                </div>
                                            </a>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
