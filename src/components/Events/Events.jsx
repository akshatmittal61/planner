import React, { useState } from "react";
import events from "./events.json";
import EventPopup from "./EventPopup";
import Event from "./Event";
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
    return (
        <section className="events">
            <div className="events-head">
                <div className="events-head-title">Events</div>
                <div className="events-head-add" onClick={() => { console.log(allEvents) }}>
                    <span className="material-icons back events-head-add__icon">
                        add_circle_outline
                    </span>
                </div>
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
                                return (<Event Title={event.title} Date={event.date} Type={event.type} Pop={() => { popupEvent(index) }} />)
                            else return null;
                        })
                    }
                </div>
            </div>
            {
                popupEventBox >= 0 && <EventPopup allEvents={allEvents} show={popupEventBox} close={() => { setPopupEventBox(-1) }} onDelete={() => { deleteEvent(popupEventBox) }} />
            }
        </section>
    )
}
export default Events;