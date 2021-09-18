import React from 'react'

const EventPopup = ({ allEvents, show, close, onDelete }) => {
    return (
        <div className="event-popup">
            <div className="event-popup-box">
                <div className={`event-popup-box__image event-popup-box__image__${allEvents[show].type}`} />
                <div className="event-popup-box-content">
                    <div className="event-popup-box-buttons">
                        <div className="event-popup-box-edit">
                            <span className="material-icons event-popup-box-edit__icon">edit</span>
                        </div>
                        <div className="event-popup-box-delete" onClick={onDelete}>
                            <span className="material-icons event-popup-box-delete__icon">delete</span>
                        </div>
                        <div className="event-popup-box-close" onClick={close}>
                            <span className="material-icons event-popup-box-close__icon">close</span>
                        </div>
                    </div>
                    <div className="event-popup-box-details">
                        <div className="event-popup-box-details__title">{allEvents[show].title}</div>
                        <div className="event-popup-box-details__description">{allEvents[show].description}</div>
                        <div className="event-popup-box-details__date">{allEvents[show].date}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventPopup
