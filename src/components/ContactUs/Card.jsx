import React from 'react'
import Button from '../Button'
import favicon from '../../images/favicon.svg'
import { Divider, Tooltip } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';

const Card = ({ name, image, skills, summary, about, socialLinks }) => {
    const icons = [<TwitterIcon />, <LinkedInIcon />, <GitHubIcon />, <MailIcon />];
    const socials = ['Twitter', 'LinkedIn', 'GitHub', 'E-Mail'];
    return (
        <div className="card">
            <div className="card-box">
                <div className="card-head">
                    <div className="card-head-image">
                        <img className="card-head-image__img" src={image} alt={name} onError={`this.onerror=null;this.src="${favicon}";`} />
                    </div>
                    <div className="card-head-content">
                        <div className="card-head-content__name">{name}</div>
                        <div className="card-head-content__subtitle">
                            <div className="card-head-content__summary">{summary}</div>
                            <div className="card-head-content__about">{about}</div>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="card-skills">
                    {
                        skills.map((skill, index) => (
                            <Button key={index} className="card-skills__skill" text={skill} color="blue" variant="small" />
                        ))
                    }
                </div>
                <Divider />
                <div className="card-social">
                    <div className="card-social-row">
                        {
                            socialLinks.map((link, index) => (
                                <div key={index} className="card-social-links">
                                    <a href={index === 3 ? "mailto:" + link : link} className="card-social-link">
                                        <Tooltip title={socials[index]}>
                                            {
                                                icons[index]
                                            }
                                        </Tooltip>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
