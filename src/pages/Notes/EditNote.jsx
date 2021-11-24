import React, { useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FormGroup, TextField, Button } from '@mui/material';
import { useWebContext } from '../../components/Context/WebContext';

const EditNote = ({ noteToEdit, close, submit }) => {
    AOS.init();
    const { theme } = useWebContext();
    const inputStyle = { color: "var(--tcolor)" };
    const titleStyle = { ...inputStyle, fontSize: "1.25rem" }
    const [note, setNote] = useState({
        title: noteToEdit.title,
        description: noteToEdit.description,
        linkURL: noteToEdit.linkURL,
        linkText: noteToEdit.linkText,
        color: noteToEdit.color
    });
    const weight = theme === "light" ? "100" : "700";
    const col = (note.color !== "" && note.color !== "bgcolor") ? "dark" : (theme === "light" ? "light" : "dark");
    const cancelColor = theme === "light" ? "" : "var(--tcolor)";
    const popupStyle = { "backgroundColor": "var(--" + note.color + "-" + weight + ")" };
    const popupStyleDefault = { "backgroundColor": "var(--bgcolor-" + weight + ")" };
    const popupStyle400 = { "backgroundColor": "var(--" + note.color + "-400)", "color": "#f0f0f0" };
    const popupStyleDefault400 = { "backgroundColor": "var(--bgcolor-400)", "color": "var(--tcolor)" };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote(prev => {
            if (name !== "description")
                return {
                    ...prev,
                    [name]: value
                }
            else {
                return {
                    ...prev,
                    [name]: [value]
                }
            }
        })
    }
    const submitNote = (e) => {
        e.preventDefault();
        submit(note);
        setNote(() => {
            return {
                title: note.title,
                description: note.description,
                linkURL: note.linkURL,
                linkText: note.linkText,
                color: note.color
            }
        })
    }
    return (
        <div className="note-edit">
            <div className="note-edit-box" style={note.color !== "" ? popupStyle : popupStyleDefault} data-aos="zoom-in">
                <div className="note-edit-box-topbar" style={note.color !== "" ? popupStyle400 : popupStyleDefault400}>
                    <button className={`btn btn-sm icon-btn icon-btn-sm note-edit-box-topbar__close btn-${col}`} onClick={close}>
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <form className="note-edit-box-form" onSubmit={submitNote}>
                    <div className="note-edit-box-form__content">
                        <FormGroup className="note-edit-box-form__group">
                            <TextField
                                id="standard-basic title"
                                label="Title"
                                variant="standard"
                                name="title"
                                className="note-edit-box-form__input"
                                value={note.title}
                                onChange={handleChange}
                                InputLabelProps={{ style: titleStyle }}
                                inputProps={{ style: titleStyle }}
                                fullWidth
                            />
                        </FormGroup>
                        <FormGroup className="note-edit-box-form__group">
                            <TextField
                                id="filled-textarea"
                                name="description"
                                label=""
                                placeholder="Take A Note"
                                multiline
                                variant="filled"
                                minRows={6}
                                maxRows={6}
                                value={note.description}
                                onChange={handleChange}
                                InputLabelProps={{ style: inputStyle }}
                                inputProps={{ style: inputStyle }}
                                fullWidth
                            />
                        </FormGroup>
                    </div>
                    <div className="note-edit-box__buttons">
                        <div className="note-edit-box__button">
                            <Button variant="text" className="note-edit-box__button-cancel" onClick={close} style={{ color: cancelColor }}>Cancel</Button>
                        </div>
                        <div className="note-edit-box__button">
                            <Button variant="contained" className="note-edit-box__button-save" type="submit">Save</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditNote
