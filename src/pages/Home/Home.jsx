import React, { useEffect } from 'react';
import Button from '../../components/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import favicon from '../../images/favicon.svg';
import CalendarImg from '../../images/calendar.svg';
import EventsImg from '../../images/events.svg';
import NotesImg from '../../images/notes.svg';
import TasksImg from '../../images/tasks.svg';
import People from '../../images/people.svg';
import Footer from '../../components/Footer';
import useDocumentTitle from '../../components/Title';
import ScrollToTop from '../../components/ScrollToTop';
import { useWebContext } from '../../components/Context/WebContext';

const Home = () => {
    useDocumentTitle('Planner');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    AOS.init();
    const { theme } = useWebContext();
    const items = [
        {
            title: "Calendar",
            description: "A calendar to show any day, any month, any year.",
            img: CalendarImg,
            link: '/calendar'
        },
        {
            title: "Events",
            description: "Manage all your events, birthdays, meetings, festivals with Planner Events.",
            img: EventsImg,
            link: '/events'
        },
        {
            title: "Notes",
            description: "Create, Edit, and Share notes with Planner Notes..",
            img: NotesImg,
            link: '/notes'
        },
        {
            title: "Tasks",
            description: "Manage all your taska with Planner Tasks.",
            img: TasksImg,
            link: '/tasks'
        }
    ]
    return (
        <div className="home">
            <div className="home-frame">
                <div className="home-box">
                    <div className="home-box-head" data-aos="zoom-out">
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
                                <div className="home-item" key={index} data-aos="fade-up">
                                    <div className="home-item-image">
                                        <img className="home-item-image__img" src={item.img} alt="item" />
                                    </div>
                                    <div className="home-item-content">
                                        <div className="home-item-content-title">{item.title}</div>
                                        <div className="home-item-content-description">{item.description}</div>
                                        <div className="home-item-content-button">
                                            <Button
                                                text={
                                                    <Link to={item.link}>
                                                        {item.title}
                                                    </Link>
                                                }
                                                variant={theme === "light" ? "outline" : "fill"}
                                                imgSrc={item.img}
                                                imgAlt={item.title}
                                                color="green"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTop />
        </div>
    )
}

export default Home
