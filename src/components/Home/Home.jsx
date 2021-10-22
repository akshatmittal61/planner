import React from 'react';
import Button from '../Button';
import favicon from '../../images/favicon.svg';
import CalendarImg from '../../images/calendar.svg';
import EventsImg from '../../images/events.svg';
import NotesImg from '../../images/notes.svg';
import TasksImg from '../../images/tasks.svg';
import People from '../../images/people.svg';
import Footer from '../Footer';
import useDocumentTitle from '../Title';

const Home = ({ GoTo }) => {
    useDocumentTitle('Planner');
    const items = [
        {
            title: "Calendar",
            description: "A calendar to show any day, any month, any year.",
            img: CalendarImg
        },
        {
            title: "Events",
            description: "Manage all your events, birthdays, meetings, festivals with Planner Events.",
            img: EventsImg
        },
        {
            title: "Notes",
            description: "Create, Edit, and Share notes with Planner Notes..",
            img: NotesImg
        },
        {
            title: "Tasks",
            description: "Manage all your taska with Planner Tasks.",
            img: TasksImg
        }
    ]
    return (
        <div className="home">
            <div className="home-frame">
                <div className="home-box">
                    <div className="home-box-head">
                        <div className="home-box-image" style={{ backgroundImage: `url(${People})` }}>
                            <img className="home-box-image__img" src={favicon} alt="favicon" />
                        </div>
                        <div className="home-box-title">
                            <span className="home-box-title__text">
                                Planner
                            </span>
                        </div>
                    </div>
                    <div className="home-body">
                        {
                            items.map((item, index) => (
                                <div className="home-item" key={index}>
                                    <div className="home-item-image">
                                        <img className="home-item-image__img" src={item.img} alt="item" />
                                    </div>
                                    <div className="home-item-content">
                                        <div className="home-item-content-title">{item.title}</div>
                                        <div className="home-item-content-description">{item.description}</div>
                                        <div className="home-item-content-button">
                                            <Button text={item.title} imgSrc={item.img} imgAlt={item.title} color="green" onClick={() => { GoTo(index) }} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer GoToLink={GoTo} />
        </div>
    )
}

export default Home
