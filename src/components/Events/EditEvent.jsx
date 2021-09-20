import React,{useState} from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotesIcon from '@mui/icons-material/Notes';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from '@mui/material';

const EditEvent = ({eventToEdit,close,submit}) => {
    const inputStyle = { color: "var(--tcolor)" };
    const [event, setEvent] = useState({
        title: eventToEdit.title,
        date: eventToEdit.date,
        type: eventToEdit.type,
        description: eventToEdit.description
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const submitEvent = (e) => {
        e.preventDefault();
        submit(event);
        setEvent(() => {
            return {
                title: event.title,
                date: event.date,
                type: event.type,
                description: event.description
            }
        })
    }
    return (
        <div className="event-edit">
            <div className="event-edit-box">
                <div className="event-edit-box-topbar">
                    <div className="event-edit-box-topbar__close" onClick={close}>
                        <CloseIcon />
                    </div>
                </div>
                <form className="event-edit-box-form" onSubmit={submitEvent}>
                    <div className="event-edit-box-form__content">
                        <div className="event-edit-box-form__group">
                            <label className="event-edit-box-form__label" htmlFor="title" />
                            <Input type="text" className="event-edit-box-form__input" id="title" name="title" placeholder="Enter title" style={{ ...inputStyle, fontSize: "1.25rem" }} value={event.title} onChange={handleChange} />
                        </div>
                        <div className="event-edit-box-form__group">
                            <label className="event-edit-box-form__label" htmlFor="date">
                                <AccessTimeIcon />
                            </label>
                            <Input type="date" className="event-edit-box-form__input" id="date" name="date" placeholder={event.date} style={inputStyle} value={event.date} onChange={handleChange} />
                        </div>
                        <div className="event-edit-box-form__group">
                            <label className="event-edit-box-form__label" htmlFor="type">
                                <EventNoteIcon />
                            </label>
                            <Input type="text" className="event-edit-box-form__input" id="type" name="type" placeholder="Enter type" style={inputStyle} inputProps={{ list: "typeSuggestions" }} value={event.type} onChange={handleChange} />
                            <datalist id="typeSuggestions">
                                <option value="birthday" />
                                <option value="anniversary" />
                                <option value="meeting" />
                                <option value="festival" />
                                <option value="ceremony" />
                            </datalist>
                        </div>
                        <div className="event-edit-box-form__group">
                            <label className="event-edit-box-form__label" htmlFor="description">
                                <NotesIcon />
                            </label>
                            <Input type="text" className="event-edit-box-form__input" id="description" name="description" placeholder="Enter description" style={inputStyle} value={event.description} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="event-edit-box__buttons">
                        <div className="event-edit-box__button">
                            <Button variant="text" className="event-edit-box__button-cancel" onClick={close}>Cancel</Button>
                        </div>
                        <div className="event-edit-box__button">
                            <Button variant="contained" className="event-edit-box__button-cancel" type="submit">Save</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEvent