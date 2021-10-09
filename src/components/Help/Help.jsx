import React from 'react'
import Button from '../Button'
import favicon from '../../images/favicon.svg';
import ContactImage from '../../images/contact.svg'
import FeedbackImage from '../../images/feedback.svg'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomAccordian from './CustomAccordian';

const Help = ({ GoTo }) => {
    const noOfAccordians = Array(5).fill(null);
    const AccordionStyle = { backgroundColor: 'var(--bgcolor-100)', color: 'inherit', width: "85%" };
    const titles = ["Calendar", "Events", "Notes", "Tasks", "Themes"];
    const paragraphs = [
        ["Getting started with Calendar", "Switch between months", "Jump to any date"],
        ["Getting started with Events", "Events navigation", "Add a new event", "Edit an event", "Event types", "Delete an event"],
        ["Getting started with Notes", "Note colors", "Note links", "Copy a note", "Add a new note", "Edit a note", "Delete a note"],
        ["Getting started with Tasks", "Tasks navigation", "Task date and time", "Add a new task", "Edit a task", "Delete a task"],
        ["Planner's themes", "Color pallete"]
    ]
    return (
        <div className="help">
            <div className="help-head">
                <div className="help-head-image">
                    <img className="help-head-image__img" src={favicon} alt="Planner" />
                </div>
                <div className="help-head-heading">
                    <div className="help-head-heading__title">Planner</div>
                    <div className="help-head-heading__subtitle">
                        Get more done with Planner. Manage, capture and edit your daily events, notes and tasks.
                    </div>
                </div>
            </div>
            <div className="help-body">
                <Accordion defaultExpanded={true} sx={AccordionStyle}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div className="help-body-accordian-title">
                            Getting started
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="help-body-accordian-p">
                            Organize your Calendar, events, notes and tasks with Planner.
                            <br />
                            Planner is a webapp developed using React.js and material-ui.
                            <br />
                            Add an event to remind you on a birthday, anniversary or your traditional festival etc.
                            <br />
                            Quickly capture what's on your mind and write it down in Notes for seeing it anytime.
                            <br />
                            Share your thoughts easily with your family, friends and colleagues.
                            <br />
                            Capture and write in tasks to remind you later on.
                        </div>
                        <div className="help-body-accordian-paragraph">
                            Planner navigation
                        </div>
                        <div className="help-body-accordian-paragraph" onClick={() => GoTo(6)}>
                            Contact Us
                        </div>
                    </AccordionDetails>
                </Accordion>
                {
                    noOfAccordians.map((acc, index) => (
                        <CustomAccordian
                            style={AccordionStyle}
                            title={titles[index]}
                            paras={paragraphs[index]}
                        />
                    ))
                }
            </div>
            <footer className="help-footer">
                <div className="help-footer-left">
                    <div className="help-footer-left-image">
                        <img className="help-footer-left-image__img" src={favicon} alt="planner" />
                    </div>
                </div>
                <div className="help-footer-center">
                    <p className="help-footer-center__p">&copy; 2021 Planner</p>
                    <p className="help-footer-center__p">Made by: Akshat Mittal and Sneha Sharma</p>
                </div>
                <div className="help-footer-right">
                    <Button
                        text="Contact Us"
                        className="side-bar-social-row-button"
                        imgSrc={ContactImage}
                        alt="Contact Us"
                        onClick={() => GoTo(6)}
                        color="blue"
                    />
                    <Button
                        text="Send feedback"
                        className="side-bar-social-row-button"
                        imgSrc={FeedbackImage}
                        alt="Feedback"
                        onClick={() => GoTo(7)}
                        color="green"
                    />
                </div>
            </footer>
        </div>
    )
}

export default Help
