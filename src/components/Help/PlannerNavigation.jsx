import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Divider } from '@mui/material';
import i0 from '../../images/PlannerNav/0.png'
import i1 from '../../images/PlannerNav/1.png'
import i2a from '../../images/PlannerNav/2a.png'
import i2b from '../../images/PlannerNav/2b.png'
import i3 from '../../images/PlannerNav/3.png'
import i4 from '../../images/PlannerNav/4.png'
import i5a from '../../images/PlannerNav/5a.png'
import i5b from '../../images/PlannerNav/5b.png'
import i6a from '../../images/PlannerNav/6a.png'
import i6b from '../../images/PlannerNav/6b.png'

const PlannerNavigation = ({ closeNav, GoToLink, submit }) => {
    const submitHelp = (x, y) => {
        submit(x, y);
    }
    const apps = ["Calendar", "Events", "Notes", "Tasks"];
    return (
        <div className="help-guide">
            <div className="help-guide-box">
                <div className="help-guide-topbar">
                    <div className="help-guide-topbar-back" onClick={closeNav}>
                        <span className="help-guide-topbar-back__button">
                            <ArrowBackIcon />
                        </span>
                    </div>
                    <div className="help-guide-topbar-open" onClick={GoToLink}>
                        <div className="help-guide-topbar-open__button">
                            <OpenInNewIcon />
                        </div>
                    </div>
                </div>
                <div className="help-guide-content">
                    <div className="help-guide-content-header">
                        <div className="help-guide-content-header__title">
                            Planner
                        </div>
                        <div className="help-guide-content-header__subtitle">
                            Get more done with Planner. Manage, capture and edit your daily events, notes and tasks.
                        </div>
                    </div>
                    <Divider sx={{ borderColor: "var(--back-shadow)" }} />
                    <div className="help-guide-content-footer">
                        <div className="help-guide-content-footer__title">
                            Get started with Planner Apps
                        </div>
                        <div className="help-guide-content-footer__points">
                            <ul className="help-guide-content-footer__list">
                                {
                                    apps.map((app, index) => (
                                        <li key={index} className="help-guide-content-footer__point" onClick={() => submitHelp(index, 0)}>
                                            {app}
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>
                    </div>
                    <Divider sx={{ borderColor: "var(--back-shadow)" }} />
                    <div className="help-guide-content-body">
                        <div className="help-guide-content-body__title">
                            Home Page
                        </div>
                        <div className="help-guide-content-body__points">
                            <div className="help-guide-content-body__point">
                                THe Home page of the Planner webapp contains the details of the app and its components.
                            </div>
                        </div>
                        <div className="help-guide-content-body__image">
                            <img className="help-guide-content-body__image__img" src={i0} alt="Home Page" />
                        </div>

                        <div className="help-guide-content-body__title">
                            Side Bar
                        </div>
                        <div className="help-guide-content-body__points">
                            <div className="help-guide-content-body__point">
                                The Side bar of the Planner app contains the links to the respective components.
                            </div>
                            <div className="help-guide-content-body__point">
                                It also contains a Contact Us button to contact the developers.
                            </div>
                        </div>
                        <div className="help-guide-content-body__image">
                            <img className="help-guide-content-body__image__img" src={i1} alt="Side Bar" />
                        </div>

                        <div className="help-guide-content-body__title">
                            Header Controls
                        </div>
                        <div className="help-guide-content-body__points">
                            <div className="help-guide-content-body__point">
                                The right corner of the header contains controls for the Planner App
                            </div>
                            <div className="help-guide-content-body__point">
                                Click on the Sun/Moon button to switch between light and dark themes.
                            </div>
                        </div>
                        <div className="help-guide-content-body__image">
                            <img className="help-guide-content-body__image__img" src={i2a} alt="Light Theme" />
                            <img className="help-guide-content-body__image__img" src={i2b} alt="Dark Theme" />
                        </div>

                        <div className="help-guide-content-body__points">
                            <div className="help-guide-content-body__point">
                                To visit Help & Feedback page, click on the respective button.
                            </div>
                            <div className="help-guide-content-body__point">
                                To expand any help section, click on the arrow in the right corner of the respective Help section.
                            </div>
                        </div>
                        <div className="help-guide-content-body__image">
                            <img className="help-guide-content-body__image__img" src={i3} alt="Help and Feedback" />
                        </div>

                        <div className="help-guide-content-body__points">
                            <div className="help-guide-content-body__point">
                                You can also access the Planner Apps from the App Box in right corner of the header.
                            </div>
                            <div className="help-guide-content-body__point">
                                Click on the App icon to open the navigation box.
                            </div>
                        </div>
                        <div className="help-guide-content-body__image">
                            <img className="help-guide-content-body__image__img" src={i4} alt="App Box" />
                        </div>

                        <div className="help-guide-content-body__title">
                            Contact the Developers
                        </div>
                        <div className="help-guide-content-body__points">
                            <div className="help-guide-content-body__point">
                                To contact the developer, visit the Contact Us section by pressing the 'Contact Us' button either in the side bar or the Help & Feedback section.
                            </div>
                            <div className="help-guide-content-body__image">
                                <img className="help-guide-content-body__image__img" src={i5a} alt="Contact Us button" />
                            </div>
                            <div className="help-guide-content-body__point">
                                You can see other projects on GitHub, contact the developer at Twitter, LinkedIn or direct E-Mail them.
                            </div>
                            <div className="help-guide-content-body__image">
                                <img className="help-guide-content-body__image__img" src={i5b} alt="Contact Us" />
                            </div>
                        </div>

                        <div className="help-guide-content-body__title">
                            Send us a Feedback
                        </div>
                        <div className="help-guide-content-body__points">
                            <div className="help-guide-content-body__point">
                                To send us a feedback, jump over to the Feedback section by clicking on the Feedback button in the Help & Feedback section.
                            </div>
                            <div className="help-guide-content-body__image">
                                <img className="help-guide-content-body__image__img" src={i6a} alt="Feedback button" />
                            </div>
                            <div className="help-guide-content-body__point">
                                Enter your name, your e-mail and your feedback and leave your feedback in message box.
                            </div>
                            <div className="help-guide-content-body__image">
                                <img className="help-guide-content-body__image__img" src={i6b} alt="Feedback" />
                            </div>
                        </div>
                    </div>
                    <Divider sx={{ borderColor: "var(--back-shadow)" }} />
                    <div className="help-guide-content-footer">
                        <div className="help-guide-content-footer__title">
                            Get started with Planner Apps
                        </div>
                        <div className="help-guide-content-footer__points">
                            <ul className="help-guide-content-footer__list">
                                {
                                    apps.map((app, index) => (
                                        <li key={index} className="help-guide-content-footer__point" onClick={() => submitHelp(index, 0)}>
                                            {app}
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlannerNavigation
