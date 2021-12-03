import React from 'react'
import favicon from '../images/favicon.svg'
import Button from '../components/Button'
import nullImg from '../images/null.png'
import ContactImage from '../images/contact.svg'
import FeedbackImage from '../images/feedback.svg'
import blob3 from '../images/blob3.svg'
import blob4 from '../images/blob4.svg'
import { useWebContext } from '../components/Context/WebContext'

const NotFound = () => {
    const { theme } = useWebContext();
    return (
        <section className="notfound">
            <div className="notfound-box" style={
                {
                    backgroundImage: `url(${blob3}), url(${blob4})`
                }
            }>
                <div className="notfound-image">
                    <img className="notfound-image__img" src={nullImg} alt="Not Found" />
                </div>
                <div className="notfound-content">
                    <div className="notfound-text">
                        <span style={
                            {
                                fontFamily: "Google Sans",
                                fontWeight: 700,
                                fontSize: "3rem",
                                lineHeight: "3rem"
                            }
                        }>
                            Oops ! Error 404
                        </span>
                        <span style={
                            {
                                fontSize: "1.25rem"
                            }
                        }>
                            Lost in Cyberspace ??<br />
                            It looks like that page didn't exist.<br />
                            Check the URL and try again.
                        </span>
                        <span>
                            <Button
                                text="Back to Home"
                                variant={theme === "light" ? "outline" : "fill"}
                                containsLink={true}
                                link="/"
                                color="blue"
                                imgSrc={favicon}
                                imgAlt="Planner"
                            />
                            <Button
                                text="Help"
                                variant={theme === "light" ? "outline" : "fill"}
                                containsLink={true}
                                link="/help"
                                color="green"
                                imgSrc={favicon}
                                imgAlt="Planner"
                            />
                        </span>
                    </div>
                    <div className="notfound-text">
                        <span style={
                            {
                                fontSize: "1.5rem"
                            }
                        }>
                            Can't find what you were looking for..
                        </span>
                        <span>
                            <Button
                                text="Contact Us"
                                variant={theme === "light" ? "outline" : "fill"}
                                className="footer-button"
                                imgSrc={ContactImage}
                                imgAlt="Contact Us"
                                color="blue"
                                containsLink={true}
                                link='/contact'
                            />
                            <Button
                                text="Send Us a Feedback"
                                variant={theme === "light" ? "outline" : "fill"}
                                className="footer-button"
                                imgSrc={FeedbackImage}
                                imgAlt="Feedback"
                                color="green"
                                containsLink={true}
                                link='/feedback'
                            />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound
