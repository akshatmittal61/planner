import React, { useState, useEffect } from "react";
import EventPopup from "./EventPopup";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import Event from "./Event";
import { useTheme } from '@mui/material/styles';
import { Tooltip, Zoom, Fab, Snackbar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from '../../components/Button'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CloseIcon from '@mui/icons-material/Close';
import nullEvents from '../../images/nullEvents.svg'
import useDocumentTitle from "../../components/Title";
import { useWebContext } from '../../components/Context/WebContext';

const Events = ({ axiosInstance }) => {
    AOS.init();
    useDocumentTitle('Events');
    useEffect(() => {
        window.scrollTo(0, 0);
        getEvents();
    }, []);
    const { theme } = useWebContext();
    const [allEvents, setAllEvents] = useState([]);
    allEvents.sort((a, b) => {
        let _a = new Date(a.date);
        let _b = new Date(b.date);
        if (_a < _b) return -1;
        else if (_a === _b) return 0;
        else return 1;
    })
    const [start, setStart] = useState(0);
    let k = 12, l = 6;
    const [popupEventBox, setPopupEventBox] = useState(-1);
    const [addEventBox, setAddEventBox] = useState(-1);
    const [editEventBox, setEditEventBox] = useState(-1);
    const [snackMessage, setSnackMessage] = useState("Action successful");
    const getEvents = () => {
        axiosInstance.get('/events')
            .then((res) => {
                setAllEvents([...res.data]);
            })
            .catch(err => console.log(err))
    }
    const popupEvent = (a) => {
        setPopupEventBox(a);
    }
    const deleteEvent = (id) => {
        axiosInstance.delete(`/events/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        getEvents();
        setSnackMessage("Event deleted successfully");
        setOpen(true);
        setPopupEventBox(-1);
    }
    const addNewEvent = () => {
        setAddEventBox(1);
    }
    const addEvent = (a) => {
        let newEvent = {
            id: allEvents.length,
            ...a
        }
        const condition = newEvent.title === "" && newEvent.type === "";
        if (!condition) {
            axiosInstance.post('/events', newEvent)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
            setSnackMessage("Event added successfully");
            getEvents();
        }
        else setSnackMessage("Can't add an empty event");
        setOpen(true);
        setAddEventBox(!condition ? -1 : 1);
    }
    const editEvent = (a) => {
        let newEvent = { ...a };
        axiosInstance.patch(`/events/${newEvent.id}`, { ...newEvent })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        getEvents();
        setSnackMessage("Changes saved");
        setOpen(true);
        setEditEventBox(-1);
        setPopupEventBox(-1);
    }
    const Theme = useTheme();
    const transitionDuration = {
        enter: Theme.transitions.duration.enteringScreen,
        exit: Theme.transitions.duration.leavingScreen,
    };
    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
    };
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <section className="events">
            {
                allEvents.length !== 0 ? (<>
                    <div className="events-head" data-aos="fade-up">
                        <div className="events-head-title">Events</div>
                        <div className="events-head-arrows">
                            <button className="btn btn-lg icon-btn icon-btn-lg material-icons events-head-arrow up" onClick={() => {
                                if (start <= 0) return;
                                setStart(start - l);
                            }}>
                                keyboard_arrow_up
                            </button>
                            <button className="btn btn-lg icon-btn icon-btn-lg material-icons events-head-arrow down" onClick={() => {
                                if (start + l >= allEvents.length) return;
                                setStart(start + l);
                            }}>
                                keyboard_arrow_down
                            </button>
                        </div>
                    </div>
                    <div className="events-body" data-aos="fade-up">
                        <div className="row events-body-row">
                            {
                                allEvents.map((event, index) => {
                                    if (index >= start && index < start + k)
                                        return (
                                            <Event
                                                key={index}
                                                Title={event.title}
                                                Date={event.date}
                                                Type={event.type}
                                                Pop={() => { popupEvent(index) }}
                                            />
                                        )
                                    else return null;
                                })
                            }
                        </div>
                    </div>
                </>) : (
                    <div className="events-null">
                        <div className="events-null-image" data-aos="zoom-in">
                            <img className="events-null-image__img" src={nullEvents} alt="No events" />
                        </div>
                        <div className="events-null-content">
                            <div className="events-null-content__text">No events yet</div>
                            <div className="events-null-content__button">
                                <Button
                                    variant={theme === "light" ? "outline" : "fill"}
                                    imgSrc={nullEvents}
                                    text="Add an event"
                                    onClick={() => { setAddEventBox(1) }}
                                    color="green"
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                popupEventBox >= 0 && <EventPopup
                    event={allEvents[popupEventBox]}
                    close={() => { setPopupEventBox(-1) }}
                    onDelete={() => { deleteEvent(allEvents[popupEventBox].id) }}
                    onEdit={() => { setEditEventBox(popupEventBox) }}
                />
            }
            {
                addEventBox >= 0 && <AddEvent
                    close={() => { setAddEventBox(-1) }}
                    submit={addEvent}
                />
            }
            {
                editEventBox >= 0 && <EditEvent
                    eventToEdit={allEvents[popupEventBox]}
                    close={() => { setEditEventBox(-1) }}
                    submit={editEvent}
                />
            }
            {
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={snackMessage}
                    action={action}
                />
            }
            <div className="event-add-icon">
                <Zoom
                    key="primary"
                    in={2 > 1}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${2 > 1 ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Tooltip title="Add an event">
                        <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={addNewEvent}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Zoom>
            </div>
        </section>
    )
}
export default Events;