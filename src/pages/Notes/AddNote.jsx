import React, { useState } from 'react';
import Button from '../../components/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CloseIcon from '@mui/icons-material/Close';
import { FormGroup, TextField } from '@mui/material';

const AddNote = ({ close, submit }) => {
    AOS.init();
    const inputStyle = { color: "var(--tcolor)" };
    const titleStyle = { ...inputStyle, fontSize: "1.25rem" }
    const [note, setNote] = useState({
        title: "",
        description: [""],
        linkURL: "",
        linkText: "",
        color: "bgcolor"
    });
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
                title: "",
                description: [""],
                linkURL: "",
                linkText: "",
                color: "bgcolor"
            }
        })
    }
    return (
        <div className="note-add">
            <div className="note-add-box" data-aos="zoom-in">
                <div className="note-add-box-topbar">
                    <button className="btn note-add-box-topbar__close" onClick={close}>
                        <CloseIcon />
                    </button>
                </div>
                <form className="note-add-box-form" onSubmit={submitNote}>
                    <div className="note-add-box-form__content">
                        <FormGroup className="note-add-box-form__group">
                            <TextField
                                id="standard-basic title"
                                label="Title"
                                variant="standard"
                                name="title"
                                className="note-add-box-form__input"
                                value={note.title}
                                onChange={handleChange}
                                InputLabelProps={{ style: titleStyle }}
                                inputProps={{ style: titleStyle }}
                                fullWidth
                            />
                        </FormGroup>
                        <FormGroup className="note-add-box-form__group">
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
                        <FormGroup className="note-add-box-form__group">
                            <TextField
                                id="standard-basic linkURL"
                                label="Link URL"
                                variant="standard"
                                name="linkURL"
                                className="note-add-box-form__input"
                                value={note.linkURL}
                                onChange={handleChange}
                                InputLabelProps={{ style: inputStyle }}
                                inputProps={{ style: inputStyle }}
                                fullWidth
                            />
                        </FormGroup>
                        <FormGroup className="note-add-box-form__group">
                            <TextField
                                id="standard-basic linkText"
                                label="Link Text"
                                variant="standard"
                                name="linkText"
                                className="note-add-box-form__input"
                                value={note.linkText}
                                onChange={handleChange}
                                InputLabelProps={{ style: inputStyle }}
                                inputProps={{ style: inputStyle }}
                                fullWidth
                            />
                        </FormGroup>
                    </div>
                    <div className="note-add-box__buttons">
                        <div className="note-add-box__button">
                            <Button
                                text="Cancel"
                                variant="outline"
                                color="blue"
                                size="small"
                                className="note-add-box__button-cancel"
                                onClick={close}
                            />
                        </div>
                        <div className="note-add-box__button">
                            <Button
                                text="Save"
                                variant="fill"
                                color="blue"
                                size="small"
                                type="submit"
                                className="note-add-box__button-save"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote