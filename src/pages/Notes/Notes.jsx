import React, { useState, useEffect } from 'react'
import Note from './Note'
import NotePopup from './NotePopup';
import AddNote from './AddNote';
import EditNote from './EditNote';
import NoteLink from './NoteLink';
import NoteColor from './NoteColor';
import { useTheme } from '@mui/material/styles';
import { Tooltip, Zoom, Fab, Snackbar, IconButton } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CreateIcon from '@mui/icons-material/Create';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../components/Button'
import nullNotes from '../../images/nullNotes.svg'
import useDocumentTitle from '../../components/Title';
import { useWebContext } from '../../components/Context/WebContext';

const Notes = ({ axiosInstance }) => {
    AOS.init();
    useDocumentTitle('Notes');
    useEffect(() => {
        window.scrollTo(0, 0);
        getNotes();
    }, []);
    const { theme } = useWebContext();
    const [allNotes, setAllNotes] = useState([]);
    allNotes.map((note) => {
        if (note.color === "") note.color = "bgcolor";
        if (note.linkURL === "" || note.linkURL === "#") {
            note.linkURL = "#";
        }
        else {
            if (note.linkText === "") note.linkText = "Click Here";
            if (note.linkURL.slice(0, 4) !== "http") {
                note.linkURL = "https://" + note.linkURL;
            }
        }
        return note;
    })
    const max = (a, b) => {
        return (a > b) ? a : b;
    }
    const [popupNoteBox, setPopupNoteBox] = useState(-1);
    const [addNoteBox, setAddNoteBox] = useState(-1);
    const [editNoteBox, setEditNoteBox] = useState(-1);
    const [editNoteLinkBox, setEditNoteLinkBox] = useState(-1);
    const [editNoteColorBox, setEditNoteColorBox] = useState(-1);
    const [snackMessage, setSnackMessage] = useState("Action successful");
    async function getNotes() {
        await axiosInstance.get('/notes')
            .then((res) => {
                setAllNotes([...res.data]);
            })
            .catch(err => console.log(err))
    }
    const popupNote = (a) => {
        setPopupNoteBox(a);
    }
    const deleteNote = (id) => {
        axiosInstance.delete(`/notes/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        getNotes();
        setSnackMessage("Note deleted successfully");
        setOpen(true);
        setPopupNoteBox(-1);
    }
    const addNote = (a) => {
        let newNote = {
            id: allNotes.length,
            ...a
        }
        const condition = newNote.title === "" && newNote.description[0] === "" && newNote.linkURL === "" && newNote.linkText === "";
        if (!condition) {
            axiosInstance.post('/notes', newNote)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
            setSnackMessage("Note added successfully");
            getNotes();
        }
        else setSnackMessage("Can't add empty note");
        setOpen(true);
        setAddNoteBox(!condition ? -1 : 1);
    }
    const editNote = (a) => {
        let newNote = { ...a };
        if (editNoteBox > -1 || editNoteLinkBox > -1 || editNoteColorBox > -1) {
            let index = max(editNoteBox, max(editNoteColorBox, editNoteLinkBox));
            axiosInstance.patch(`/notes/${index}`, {
                title: newNote.title,
                description: newNote.description,
                linkURL: newNote.linkURL,
                linkText: newNote.linkText,
                color: newNote.color
            })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }
        getNotes();
        setSnackMessage("Changes saved");
        setOpen(true);
        setEditNoteBox(-1);
        setEditNoteLinkBox(-1);
        setEditNoteColorBox(-1);
        setPopupNoteBox(-1);
    }
    const copyNote = (e) => {
        if (allNotes[e].linkText === "" || allNotes[e].linkURL === "") navigator.clipboard.writeText(allNotes[e].title + '\n\n' + allNotes[e].description + '\n' + allNotes[e].linkURL + allNotes[e].linkText)
        else navigator.clipboard.writeText(allNotes[e].title + '\n\n' + allNotes[e].description + '\n' + allNotes[e].linkURL + " : " + allNotes[e].linkText)
        setSnackMessage("Note copied successfully");
        setOpen(true);
    }
    const Theme = useTheme();
    const transitionDuration = {
        enter: Theme.transitions.duration.enteringScreen,
        exit: Theme.transitions.duration.leavingScreen,
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
        <section className="notes" data-aos="fade-up">
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
                                    id={note.id}
                                    axiosInstance={axiosInstance}
                                />)
                            }
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            ) : (
                <div className="notes-null">
                    <div className="notes-null-image" data-aos="zoom-in">
                        <img className="notes-null-image__img" src={nullNotes} alt="No notes" />
                    </div>
                    <div className="notes-null-content">
                        <div className="notes-null-content__text">No notes yet</div>
                        <div className="notes-null-content__button">
                            <Button
                                variant={theme === "light" ? "outline" : "fill"}
                                imgSrc={nullNotes}
                                text="Add a note"
                                onClick={() => { setAddNoteBox(1) }}
                                color="green"
                            />
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
