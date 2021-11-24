import React, { useState, useEffect } from 'react'
import favicon from '../../images/favicon.svg';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomAccordian from './CustomAccordian';
import HelpGuide from './HelpGuide';
import ColorPalette from './ColorPalette';
import PlannerNavigation from './PlannerNavigation';
import Footer from '../../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useDocumentTitle from '../../components/Title';

const Help = ({ GoTo }) => {
    AOS.init();
    useDocumentTitle('Help');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const noOfAccordians = Array(5).fill(null);
    const AccordionStyle = { backgroundColor: 'var(--bgcolor-100)', color: 'inherit', width: "85%" };
    const titles = ["Calendar", "Events", "Notes", "Tasks", "Themes"];
    const paragraphs = [
        ["Getting started with Calendar", "Switch between months", "Jump to any date"],
        ["Getting started with Events", "Events navigation", "Add a new event", "Edit an event", "Event types", "Delete an event"],
        ["Getting started with Notes", "Create a note", "Edit a note", "Delete a note", "Note links", "Copy a note", "Note colors"],
        ["Getting started with Tasks", "Tasks navigation", "Add a new task", "Edit a task", "Delete a task", "Task date and time"],
        ["Planner's themes", "Color palette"]
    ]
    const [helpGuide, setHelpGuide] = useState([-1, -1]);
    const [colorPalette, setColorPalette] = useState(false);
    const [plannerNav, setPlannerNav] = useState(false);
    const openHelpGuide = (x, y) => {
        if (x === 4 && y === 1) {
            setHelpGuide([500, 500]);
            setColorPalette(true);
        }
        else if (x === -2 && y === -2) {
            setHelpGuide([500, 500]);
            setPlannerNav(true);
        }
        else {
            setHelpGuide([x, y]);
            setPlannerNav(false);
            setColorPalette(false);
        }
    }
    const closePlannerNav = () => {
        setHelpGuide([-1, -1]);
        setPlannerNav(false);
    }
    return (
        <div className="help">
            <div className="help-head">
                <div className="help-head-image">
                    <img className="help-head-image__img" src={favicon} alt="Planner" onClick={() => { GoTo(-1) }} />
                </div>
                <div className="help-head-heading">
                    <div className="help-head-heading__title">Planner</div>
                    <div className="help-head-heading__subtitle">
                        Get more done with Planner. Manage, capture and edit your daily events, notes and tasks.
                    </div>
                </div>
            </div>
            {
                (helpGuide[0] === -1 && helpGuide[1] === -1) ? (
                    <div className="help-body" data-aos="fade-up">
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
                                <div className="help-body-accordian-paragraph" onClick={() => openHelpGuide(-2, -2)}>
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
                                    key={index}
                                    style={AccordionStyle}
                                    title={titles[index]}
                                    paras={paragraphs[index]}
                                    x={index}
                                    submit={openHelpGuide}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div className="help-body">
                        {
                            colorPalette ? (
                                <ColorPalette submit={openHelpGuide} />
                            ) : (
                                plannerNav ? (
                                    <PlannerNavigation
                                        closeNav={closePlannerNav}
                                        submit={openHelpGuide}
                                        GoToLink={() => { GoTo(-1) }}
                                    />
                                ) : (
                                    <HelpGuide
                                        X={helpGuide[0]}
                                        Y={helpGuide[1]}
                                        submit={openHelpGuide}
                                        GoToLink={() => { GoTo(helpGuide[0]) }}
                                    />
                                )
                            )
                        }
                    </div>
                )
            }
            <Footer GoToLink={GoTo} />
        </div>
    )
}

export default Help
