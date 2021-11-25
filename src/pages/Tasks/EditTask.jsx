import React, { useState } from 'react';
import Button from '../../components/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotesIcon from '@mui/icons-material/Notes';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from '@mui/material';

const EditTask = ({ taskToEdit, close, submit }) => {
    AOS.init();
    const inputStyle = { color: "var(--tcolor)" };
    const [task, setTask] = useState({
        title: taskToEdit.title,
        description: taskToEdit.description,
        date: taskToEdit.date,
        time: taskToEdit.time,
        done: taskToEdit.done
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const submitTask = (e) => {
        e.preventDefault();
        submit(task);
        setTask(() => {
            return {
                title: taskToEdit.title,
                description: taskToEdit.description,
                date: taskToEdit.date,
                time: taskToEdit.time,
                done: taskToEdit.done
            }
        })
    }
    return (
        <div className="task-edit">
            <div className="task-edit-box" data-aos="zoom-in">
                <div className="task-edit-box-topbar">
                    <button className="btn btn-sm icon-btn icon-btn-sm task-edit-box-topbar__close" onClick={close}>
                        <CloseIcon />
                    </button>
                </div>
                <form className="task-edit-box-form" onSubmit={submitTask}>
                    <div className="task-edit-box-form__content">
                        <div className="task-edit-box-form__group">
                            <label className="task-edit-box-form__label" htmlFor="title" />
                            <Input type="text" className="task-edit-box-form__input" id="title" name="title" placeholder="Enter title" style={{ ...inputStyle, fontSize: "1.25rem" }} value={task.title} onChange={handleChange} />
                        </div>
                        <div className="task-edit-box-form__group">
                            <label className="task-edit-box-form__label" htmlFor="description">
                                <NotesIcon />
                            </label>
                            <Input type="text" className="task-edit-box-form__input" id="description" name="description" placeholder="Enter description" style={inputStyle} value={task.description} onChange={handleChange} />
                        </div>
                        <div className="task-edit-box-form__group">
                            <label className="task-edit-box-form__label" htmlFor="date">
                                <EventNoteIcon />
                            </label>
                            <Input type="date" className="task-edit-box-form__input" id="date" name="date" placeholder={task.date} style={inputStyle} value={task.date} onChange={handleChange} />
                        </div>
                        <div className="task-edit-box-form__group">
                            <label className="task-edit-box-form__label" htmlFor="type">
                                <AccessTimeIcon />
                            </label>
                            <Input type="time" className="task-edit-box-form__input" id="time" name="time" placeholder={task.time} style={inputStyle} value={task.time} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="task-edit-box__buttons">
                        <div className="task-edit-box__button">
                            <Button
                                text="Cancel"
                                variant="outline"
                                color="blue"
                                size="small"
                                className="task-edit-box__button-cancel"
                                onClick={close}
                            />
                        </div>
                        <div className="task-edit-box__button">
                            <Button
                                text="Save"
                                variant="fill"
                                color="blue"
                                size="small"
                                type="submit"
                                className="task-edit-box__button-save"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTask
