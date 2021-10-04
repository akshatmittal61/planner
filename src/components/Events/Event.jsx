import React from 'react'

const Event = ({ Title, Type, Date, Pop}) => {
    const showIcon = (e) => {
        switch (e) {
            case "birthday":
                return "cake";
            case "anniversary":
                return "cake";
            case "meeting":
                return "group";
            case "festival":
                return "festival";
            case "ceremony":
                return "celebration";
            default:
                return "event";
        }
    }
    return (
        <div className="col-lg-33 col-md-50 col-sm-50">
            <div className="events-body-event event" onClick={Pop}>
                <div className="event__icon">
                    <span className="material-icons">{showIcon(Type)}</span>
                </div>
                <div className="event-details">
                    <div className="event-details__title">{Title}</div>
                    <div className="event-details__date">{Date}</div>
                </div>
            </div>
        </div>
    )
}

export default Event
