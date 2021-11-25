import React, { useState } from 'react';
import Button from '../../components/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotesIcon from '@mui/icons-material/Notes';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from '@mui/material';

const EditEvent = ({ eventToEdit, close, submit }) => {
    AOS.init();
    const inputStyle = { color: "var(--tcolor)" };
    const [event, setEvent] = useState({ ...eventToEdit });
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
            <div className="event-edit-box" data-aos="zoom-in">
                <div className="event-edit-box-topbar">
                    <button className="btn btn-sm icon-btn icon-btn-sm event-edit-box-topbar__close" onClick={close}>
                        <CloseIcon />
                    </button>
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
                            <Button
                                text="Cancel"
                                variant="outline"
                                color="blue"
                                size="small"
                                className="event-edit-box__button-cancel"
                                onClick={close}
                            />
                        </div>
                        <div className="event-edit-box__button">
                            <Button
                                text="Save"
                                variant="fill"
                                color="blue"
                                size="small"
                                type="submit"
                                className="event-edit-box__button-save"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEvent