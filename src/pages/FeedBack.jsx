import React, { useState } from 'react';
import Button from '../components/Button';
import CloseIcon from '@mui/icons-material/Close';
import { FormGroup, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import useDocumentTitle from '../components/Title';

const FeedBack = () => {
    useDocumentTitle('Feedback');
    const [snackMessage, setSnackMessage] = useState("Your feedback has been submitted");
    const inputStyle = { color: "var(--tcolor)" };
    const titleStyle = { ...inputStyle, fontSize: "1.25rem" };
    const [feedback, setFeedback] = useState({
        name: "",
        email: "",
        content: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const submitFeedback = (e) => {
        e.preventDefault();
        const condition = feedback.name === "" || feedback.email === "" || feedback.content === "";
        !condition ? setSnackMessage("Your feedback has been submitted") : setSnackMessage("Please fill in the fields correctly");
        setOpen(true);
        setFeedback(() => {
            return {
                name: "",
                email: "",
                content: ""
            }
        })
    }
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <div className="feedback">
            <div className="feedback-box">
                <div className="feedback-box-content">
                    <form className="feedback-form" onSubmit={submitFeedback}>
                        <div className="feedback-form__content">
                            <FormGroup className="feedback-form__group">
                                <TextField
                                    id="standard-basic title"
                                    label="Name"
                                    variant="standard"
                                    name="name"
                                    className="feedback-form__input"
                                    value={feedback.name}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: titleStyle }}
                                    inputProps={{ style: titleStyle }}
                                    fullWidth
                                    required={true}
                                />
                            </FormGroup>
                            <FormGroup className="feedback-form__group">
                                <TextField
                                    id="standard-basic E-Mail"
                                    label="E-Mail"
                                    variant="standard"
                                    name="email"
                                    className="feedback-form__input"
                                    value={feedback.email}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: titleStyle }}
                                    inputProps={{ style: titleStyle }}
                                    fullWidth
                                    required={true}
                                />
                            </FormGroup>
                            <FormGroup className="feedback-form__group">
                                <TextField
                                    id="filled-textarea"
                                    name="content"
                                    label=""
                                    placeholder="Your Message Here"
                                    multiline
                                    variant="standard"
                                    minRows={6}
                                    maxRows={6}
                                    value={feedback.content}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: inputStyle }}
                                    inputProps={{ style: inputStyle }}
                                    fullWidth
                                    required={true}
                                />
                            </FormGroup>
                        </div>
                        <div className="feedback-form__buttons">
                            <div className="feedback-form__button">
                                <Button
                                    text="Submit"
                                    variant="fill"
                                    color="blue"
                                    size="small"
                                    type="submit"
                                    className="feedback-form-button-submit"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={snackMessage}
                    action={action}
                />
            }
        </div>
    )
}

export default FeedBack
