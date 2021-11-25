import React from 'react'
import Button from './Button'
import { useWebContext } from './Context/WebContext'
import favicon from '../images/favicon.svg';
import ContactImage from '../images/contact.svg'
import FeedbackImage from '../images/feedback.svg'

const Footer = ({ GoToLink }) => {
    const { theme } = useWebContext();
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className="footer-left-image" onClick={() => { GoToLink(-1) }}>
                    <img className="footer-left-image__img" src={favicon} alt="planner" />
                </div>
            </div>
            <div className="footer-center">
                <p className="footer-center__p">&copy; 2021 Planner</p>
                <p className="footer-center__p">Made by: Akshat Mittal</p>
            </div>
            <div className="footer-right">
                <Button
                    text="Contact Us"
                    variant={theme === "light" ? "outline" : "fill"}
                    className="footer-button"
                    imgSrc={ContactImage}
                    imgAlt="Contact Us"
                    onClick={() => GoToLink(6)}
                    color="blue"
                />
                <Button
                    text="Send Us a Feedback"
                    variant={theme === "light" ? "outline" : "fill"}
                    className="footer-button"
                    imgSrc={FeedbackImage}
                    imgAlt="Feedback"
                    onClick={() => GoToLink(7)}
                    color="green"
                />
            </div>
        </footer>
    )
}

export default Footer
