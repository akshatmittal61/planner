import React, { useState } from 'react'
import Note from './Note'
import notes from './notes.json'
import NotePopup from './NotePopup';
import AddNote from './AddNote';
import EditNote from './EditNote';
import NoteLink from './NoteLink';
import { useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import CreateIcon from '@mui/icons-material/Create';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import NoteColor from './NoteColor';

const Notes = () => {
    const [allNotes, setAllNotes] = useState([...notes]);
    allNotes.map((note) => {
        if (note.color === "") note.color = "bgcolor";
        if (note.linkURL === "" && note.linkText !== "") note.linkURL = "#";
    })
    const [popupNoteBox, setPopupNoteBox] = useState(-1);
    const [addNoteBox, setAddNoteBox] = useState(-1);
    const [editNoteBox, setEditNoteBox] = useState(-1);
    const [editNoteLinkBox, setEditNoteLinkBox] = useState(-1);
    const [editNoteColorBox, setEditNoteColorBox] = useState(-1);
    const popupNote = (a) => {
        setPopupNoteBox(a);
    }
    const deleteNote = (id) => {
        setAllNotes(prev => {
            return prev.filter((note, index) => {
                return index !== id;
            })
        })
        setPopupNoteBox(-1);
    }
    const addNote = (newNote) => {
        setAllNotes(prev => {
            return [...prev, newNote];
        })
        setAddNoteBox(-1);
    }
    const editNote = (newNote) => {
        setAllNotes(() => {
            return allNotes.map((note, index) => {
                if (index === editNoteBox || index === editNoteLinkBox || index === editNoteColorBox) {
                    return newNote;
                }
                else return note;
            })
        })
        setEditNoteBox(-1);
        setEditNoteLinkBox(-1);
        setEditNoteColorBox(-1);
        setPopupNoteBox(-1);
    }
    const copyNote = (e) => {
        if (allNotes[e].linkText === "" || allNotes[e].linkURL === "") navigator.clipboard.writeText(allNotes[e].title + '\n\n' + allNotes[e].description + '\n' + allNotes[e].linkURL + allNotes[e].linkText)
        else navigator.clipboard.writeText(allNotes[e].title + '\n\n' + allNotes[e].description + '\n' + allNotes[e].linkURL + " : " + allNotes[e].linkText)
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
    return (
        <section className="notes">
            <div className="notes-container">
                <ResponsiveMasonry columnsCount={3}>
                    <Masonry>
                        {
                            allNotes.map((note, index) => <Note
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
            {
                popupNoteBox >= 0 && <NotePopup
                    allNotes={allNotes}
                    show={popupNoteBox}
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
                    <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={() => { setAddNoteBox(1) }} style={{ "position": "fixed" }}>
                        <CreateIcon />
                    </Fab>
                </Zoom>
            </div>
        </section>
    )
}

export default Notes
