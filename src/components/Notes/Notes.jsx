import React, { useState } from 'react'
import Note from './Note'
import NotePopup from './NotePopup';
import AddNote from './AddNote';
import EditNote from './EditNote';
import NoteLink from './NoteLink';
import NoteColor from './NoteColor';
import { useTheme } from '@mui/material/styles';
import { Tooltip, Zoom, Fab, Snackbar, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CloseIcon from '@mui/icons-material/Close';
import Button from '../Button'
import nullNotes from '../../images/nullNotes.svg'
import useDocumentTitle from '../Title';

const Notes = ({ notes, submit }) => {
    useDocumentTitle('Notes');
    const [allNotes, setAllNotes] = useState([...notes]);
    allNotes.map((note) => {
        if (note.color === "") note.color = "bgcolor";
        if (note.linkURL === "" && note.linkText !== "") note.linkURL = "#";
        else if (note.linkURL !== "" && note.linkText === "") note.linkText = "Click Here";
        return note;
    })
    const [popupNoteBox, setPopupNoteBox] = useState(-1);
    const [addNoteBox, setAddNoteBox] = useState(-1);
    const [editNoteBox, setEditNoteBox] = useState(-1);
    const [editNoteLinkBox, setEditNoteLinkBox] = useState(-1);
    const [editNoteColorBox, setEditNoteColorBox] = useState(-1);
    const [snackMessage, setSnackMessage] = useState("Action successful");
    const popupNote = (a) => {
        setPopupNoteBox(a);
    }
    const deleteNote = (id) => {
        let newNotes = [...allNotes];
        newNotes = newNotes.filter((note, index) => {
            return index !== id;
        })
        setAllNotes(newNotes);
        setSnackMessage("Note deleted successfully");
        setOpen(true);
        setPopupNoteBox(-1);
        submit(newNotes);
    }
    const addNote = (newNote) => {
        let newNotes = [...allNotes];
        const condition = newNote.title === "" && newNote.description[0] === "" && newNote.linkURL === "" && newNote.linkText === "";
        newNotes = !condition ? [...newNotes, newNote] : [...newNotes]
        setAllNotes(newNotes);
        !condition ? setSnackMessage("Note added successfully") : setSnackMessage("Can't add empty note");
        setOpen(true);
        setAddNoteBox(!condition ? -1 : 1);
        submit(newNotes);
    }
    const editNote = (newNote) => {
        let newNotes = [...allNotes];
        newNotes = newNotes.map((note, index) => {
            if (index === editNoteBox || index === editNoteLinkBox || index === editNoteColorBox) {
                return newNote;
            }
            else return note;
        })
        setAllNotes(newNotes);
        setSnackMessage("Changes saved");
        setOpen(true);
        setEditNoteBox(-1);
        setEditNoteLinkBox(-1);
        setEditNoteColorBox(-1);
        setPopupNoteBox(-1);
        submit(newNotes);
    }
    const copyNote = (e) => {
        if (allNotes[e].linkText === "" || allNotes[e].linkURL === "") navigator.clipboard.writeText(allNotes[e].title + '\n\n' + allNotes[e].description + '\n' + allNotes[e].linkURL + allNotes[e].linkText)
        else navigator.clipboard.writeText(allNotes[e].title + '\n\n' + allNotes[e].description + '\n' + allNotes[e].linkURL + " : " + allNotes[e].linkText)
        setSnackMessage("Note copied successfully");
        setOpen(true);
    }
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
    };
    const [open, setOpen] = useState(false);
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
        <section className="notes">
            {allNotes.length !== 0 ? (
                <div className="notes-container">
                    <ResponsiveMasonry columnsCount={3}>
                        <Masonry>
                            {
                                allNotes.map((note, index) => <Note
                                    key={index}
                                    title={note.title}
                                    description={note.description}
                                    linkURL={note.linkURL}
                                    linkText={note.linkText}
                                    color={note.color}
                                    Pop={() => { popupNote(index) }}
                                    onColor={() => { setEditNoteColorBox(index) }}
                                    onLink={() => { setEditNoteLinkBox(index) }}
                                    onCopy={() => { copyNote(index) }}
                                    onEdit={() => { setEditNoteBox(index) }}
                                    onDelete={() => { deleteNote(index) }}
                                />)
                            }
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            ) : (
                <div className="notes-null">
                    <div className="notes-null-image">
                        <img className="notes-null-image__img" src={nullNotes} alt="No notes" />
                    </div>
                    <div className="notes-null-content">
                        <div className="notes-null-content__text">No notes yet</div>
                        <div className="notes-null-content__button">
                            <Button imgSrc={nullNotes} text="Add a note" onClick={() => { setAddNoteBox(1) }} color="blue" />
                        </div>
                    </div>
                </div>
            )}
            {
                popupNoteBox >= 0 && <NotePopup
                    note={allNotes[popupNoteBox]}
                    close={() => { setPopupNoteBox(-1) }}
                    onColor={() => { setEditNoteColorBox(popupNoteBox) }}
                    onLink={() => { setEditNoteLinkBox(popupNoteBox) }}
                    onCopy={() => { copyNote(popupNoteBox) }}
                    onEdit={() => { setEditNoteBox(popupNoteBox) }}
                    onDelete={() => { deleteNote(popupNoteBox) }}
                />
            }
            {
                addNoteBox >= 0 && <AddNote
                    close={() => { setAddNoteBox(-1) }}
                    submit={addNote}
                />
            }
            {
                editNoteBox >= 0 && <EditNote
                    noteToEdit={allNotes[editNoteBox]}
                    close={() => { setEditNoteBox(-1) }}
                    submit={editNote}
                />
            }
            {
                editNoteLinkBox >= 0 && <NoteLink
                    noteToEdit={allNotes[editNoteLinkBox]}
                    close={() => { setEditNoteLinkBox(-1) }}
                    submit={editNote}
                />
            }
            {
                editNoteColorBox >= 0 && <NoteColor
                    noteToEdit={allNotes[editNoteColorBox]}
                    close={() => { setEditNoteColorBox(-1) }}
                    submit={editNote}
                />
            }
            {
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={snackMessage}
                    action={action}
                />
            }
            <div className="note-add-icon">
                <Zoom
                    key="primary"
                    in={2 > 1}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${2 > 1 ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Tooltip title="Add a note">
                        <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={() => { setAddNoteBox(1) }} style={{ "position": "fixed" }}>
                            <CreateIcon />
                        </Fab>
                    </Tooltip>
                </Zoom>
            </div>
        </section>
    )
}

export default Notes
