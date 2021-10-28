import React from 'react'
import { Tooltip } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import favicon from '../../images/favicon.svg';
import i1 from '../../images/birthday.jpg';
import i2 from '../../images/marriage.jpg';
import i3 from '../../images/meeting.webp';
import i4 from '../../images/festival.jpg';
import i5 from '../../images/ceremony.jpg';
import useDocumentTitle from '../Title';

const EventPopup = ({ event, close, onDelete, onEdit }) => {
    AOS.init();
    useDocumentTitle(event.title);
    const showImage = (e) => {
        switch (e) {
            case "birthday":
                return i1;
            case "anniversary":
                return i2;
            case "meeting":
                return i3;
            case "festival":
                return i4;
            case "ceremony":
                return i5;
            default:
                return favicon;
        }
    }
    return (
        <div className="event-popup">
            <div className="event-popup-box" data-aos="zoom-in">
                <div className="event-popup-box__image" style={{ backgroundImage: `url(${showImage(event.type)})` }} />
                <div className="event-popup-box-content">
                    <div className="event-popup-box-buttons">
                        <Tooltip title="Edit event">
                            <button className="btn event-popup-box-edit" onClick={onEdit}>
                                <span className="material-icons event-popup-box-edit__icon">edit</span>
                            </button>
                        </Tooltip>
                        <Tooltip title="Delete event">
                            <button className="btn event-popup-box-delete" onClick={onDelete}>
                                <span className="material-icons event-popup-box-delete__icon">delete</span>
                            </button>
                        </Tooltip>
                        <button className="btn event-popup-box-close" onClick={close}>
                            <span className="material-icons event-popup-box-close__icon">close</span>
                        </button>
                    </div>
                    <div className="event-popup-box-details">
                        <div className="event-popup-box-details__title">{event.title}</div>
                        <div className="event-popup-box-details__description">{event.description}</div>
                        <div className="event-popup-box-details__date">{event.date}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventPopup
