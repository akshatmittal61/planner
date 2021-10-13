import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { FormGroup, TextField, Button } from '@mui/material'
import { useWebContext } from '../Context/WebContext'

const NoteLink = ({ noteToEdit, close, submit }) => {
    const { theme } = useWebContext();
    const inputStyle = { color: "var(--tcolor)" };
    const [note, setNote] = useState({
        title: noteToEdit.title,
        description: noteToEdit.description,
        linkURL: noteToEdit.linkURL,
        linkText: noteToEdit.linkText,
        color: noteToEdit.color
    });
    const weight = theme === "light" ? "100" : "700";
    const cancelColor = theme === "light" ? "" : "var(--tcolor)";
    const popupStyle = { "backgroundColor": "var(--" + note.color + "-" + weight + ")" };
    const popupStyleDefault = { "backgroundColor": "var(--bgcolor-" + weight + ")" };
    const popupStyle400 = { "backgroundColor": "var(--" + note.color + "-400)" };
    const popupStyleDefault400 = { "backgroundColor": "var(--bgcolor-400)", "color": "var(--tcolor)" };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote(prev => {
            return {
                ...prev,
                [name]: value
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
        <div className="note-edit-link">
            <div className="note-edit-link-box" style={note.color !== "" ? popupStyle : popupStyleDefault}>
                <div className="note-edit-link-box-topbar" style={note.color !== "" ? popupStyle400 : popupStyleDefault400}>
                    <div className="note-edit-link-box-topbar__close" onClick={close}>
                        <CloseIcon />
                    </div>
                </div>
                <form className="note-edit-link-box-form" onSubmit={submitNote}>
                    <div className="note-edit-link-box-form__content">
                        <FormGroup className="note-edit-link-box-form__group">
                            <TextField
                                id="standard-basic linkURL"
                                label="Link URL"
                                variant="standard"
                                name="linkURL"
                                className="note-edit-link-box-form__input"
                                value={note.linkURL}
                                onChange={handleChange}
                                InputLabelProps={{ style: inputStyle }}
                                inputProps={{ style: inputStyle }}
                                fullWidth
                            />
                        </FormGroup>
                        <FormGroup className="note-edit-link-box-form__group">
                            <TextField
                                id="standard-basic linkText"
                                label="Link Text"
                                variant="standard"
                                name="linkText"
                                className="note-edit-link-box-form__input"
                                value={note.linkText}
                                onChange={handleChange}
                                InputLabelProps={{ style: inputStyle }}
                                inputProps={{ style: inputStyle }}
                                fullWidth
                            />
                        </FormGroup>
                    </div>
                    <div className="note-edit-link-box__buttons">
                        <div className="note-edit-link-box__button">
                            <Button variant="text" className="note-edit-link-box__button-cancel" onClick={close} style={{ color: cancelColor }}>Cancel</Button>
                        </div>
                        <div className="note-edit-link-box__button">
                            <Button variant="contained" className="note-edit-link-box__button-save" type="submit">Save</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NoteLink