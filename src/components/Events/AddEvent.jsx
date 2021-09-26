import React, { useState } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotesIcon from '@mui/icons-material/Notes';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from '@mui/material';

const AddEvent = ({ close, submit }) => {
    const inputStyle = { color: "var(--tcolor)" };
    const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() < 9 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1}-${new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()}`;
    const [event, setEvent] = useState({
        title: "",
        date: currentDate,
        type: "",
        description: ""
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
                title: "",
                date: currentDate,
                type: "",
                description: ""
            }
        })
    }
    return (
        <div className="event-add">
            <div className="event-add-box">
                <div className="event-add-box-topbar">
                    <div className="event-add-box-topbar__close" onClick={close}>
                        <CloseIcon />
                    </div>
                </div>
                <form className="event-add-box-form" onSubmit={submitEvent}>
                    <div className="event-add-box-form__content">
                        <div className="event-add-box-form__group">
                            <label className="event-add-box-form__label" htmlFor="title" />
                            <Input type="text" className="event-add-box-form__input" id="title" name="title" placeholder="Enter title" style={{ ...inputStyle, fontSize: "1.25rem" }} value={event.title} onChange={handleChange} />
                        </div>
                        <div className="event-add-box-form__group">
                            <label className="event-add-box-form__label" htmlFor="date">
                                <AccessTimeIcon />
                            </label>
                            <Input type="date" className="event-add-box-form__input" id="date" name="date" placeholder={currentDate} style={inputStyle} value={event.date} onChange={handleChange} />
                        </div>
                        <div className="event-add-box-form__group">
                            <label className="event-add-box-form__label" htmlFor="type">
                                <EventNoteIcon />
                            </label>
                            <Input type="text" className="event-add-box-form__input" id="type" name="type" placeholder="Enter type" style={inputStyle} inputProps={{ list: "typeSuggestions" }} value={event.type} onChange={handleChange} />
                            <datalist id="typeSuggestions">
                                <option value="birthday" />
                                <option value="anniversary" />
                                <option value="meeting" />
                                <option value="festival" />
                                <option value="ceremony" />
                            </datalist>
                        </div>
                        <div className="event-add-box-form__group">
                            <label className="event-add-box-form__label" htmlFor="description">
                                <NotesIcon />
                            </label>
                            <Input type="text" className="event-add-box-form__input" id="description" name="description" placeholder="Enter description" style={inputStyle} value={event.description} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="event-add-box__buttons">
                        <div className="event-add-box__button">
                            <Button variant="text" className="event-add-box__button-cancel" onClick={close}>Cancel</Button>
                        </div>
                        <div className="event-add-box__button">
                            <Button variant="contained" className="event-add-box__button-save" type="submit">Save</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEvent
