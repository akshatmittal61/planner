import React, { useState } from "react";
import events from "./events.json";
import EventPopup from "./EventPopup";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import Event from "./Event";
import { useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
const Events = () => {
    const [allEvents, setAllEvents] = useState([...events]);
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
    const popupEvent = (a) => {
        setPopupEventBox(a);
    }
    const deleteEvent = (id) => {
        setAllEvents(prev => {
            return prev.filter((event, index) => {
                return index !== id;
            })
        })
        setPopupEventBox(-1);
    }
    const addNewEvent = () => {
        setAddEventBox(1);
    }
    const addEvent = (newEvent) => {
        setAllEvents(prev => {
            return [...prev, newEvent];
        })
        setAddEventBox(-1);
    }
    const editEvent = (newEvent) => {
        setAllEvents(()=>{
            return allEvents.map((event,index)=>{
                if(index===popupEventBox){
                    return newEvent;
                }
                else return event;
            })
        })
        setEditEventBox(-1);
        setPopupEventBox(-1);
    }
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
    };
    return (
        <section className="events">
            <div className="events-head">
                <div className="events-head-title">Events</div>
                <div className="events-head-arrows">
                    <span className="material-icons events-head-arrow up" onClick={() => {
                        if (start <= 0) return;
                        setStart(start - l);
                    }}>
                        keyboard_arrow_up
                    </span>
                    <span className="material-icons events-head-arrow down" onClick={() => {
                        if (start + l >= allEvents.length) return;
                        setStart(start + l);
                    }}>
                        keyboard_arrow_down
                    </span>
                </div>
            </div>
            <div className="events-body">
                <div className="row events-body-row">
                    {
                        allEvents.map((event, index) => {
                            if (index >= start && index < start + k)
                                return (
                                    <Event
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
            {
                popupEventBox >= 0 && <EventPopup
                    allEvents={allEvents}
                    show={popupEventBox}
                    close={() => { setPopupEventBox(-1) }}
                    onDelete={() => { deleteEvent(popupEventBox) }}
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
                    <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={addNewEvent}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </div>
        </section>
    )
}
export default Events;