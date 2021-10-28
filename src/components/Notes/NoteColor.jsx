import React, { useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CloseIcon from '@mui/icons-material/Close'
import { Button, Tooltip } from '@mui/material'
import { useWebContext } from '../Context/WebContext'

const NoteColor = ({ noteToEdit, close, submit }) => {
    AOS.init();
    const { theme } = useWebContext();
    const colors = ["bgcolor", "red", "pink", "purple", "dark-purple", "indigo", "blue", "light-blue", "cyan", "green", "light-green", "orange", "brown", "grey", "blue-grey"];
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
        setNote(prev => {
            return {
                ...prev,
                "color": colors[e]
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
        <div className="note-edit-color">
            <div className="note-edit-color-box" style={note.color !== "" ? popupStyle : popupStyleDefault} data-aos="zoom-in">
                <div className="note-edit-color-box-topbar" style={note.color !== "" ? popupStyle400 : popupStyleDefault400}>
                    <button className="btn note-edit-color-box-topbar__close" onClick={close}>
                        <CloseIcon />
                    </button>
                </div>
                <form className="note-edit-color-box-form" onSubmit={submitNote}>
                    <div className="note-edit-color-box-form__content">
                        <div className="note-edit-color-box-form-row row">
                            {
                                colors.map((color, index) =>
                                    <div key={index} className="note-edit-color-box-form-color col-lg-20 col-md-33 col-sm-33">
                                        <Tooltip title={color}>
                                            <button className="btn note-edit-color-box-form-color__content" onClick={() => { handleChange(index) }}>
                                                <span className="note-edit-color-box-form-color__circle material-icons" style={{ backgroundColor: "var(--" + color + ")" }}>{color === note.color ? "done" : null}</span>
                                            </button>
                                        </Tooltip>
                                    </div>)
                            }
                        </div>
                    </div>
                    <div className="note-edit-color-box__buttons">
                        <div className="note-edit-color-box__button">
                            <Button variant="text" className="note-edit-color-box__button-cancel" onClick={close} style={{ color: cancelColor }}>Cancel</Button>
                        </div>
                        <div className="note-edit-color-box__button">
                            <Button variant="contained" className="note-edit-color-box__button-save" type="submit">Save</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NoteColor
