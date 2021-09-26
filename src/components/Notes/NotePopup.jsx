import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useWebContext } from '../Context/WebContext';

const NotePopup = ({ allNotes, show, close, onColor, onLink, onCopy, onEdit, onDelete }) => {
    const note = allNotes[show];
    const { theme } = useWebContext();
    const weight = theme === "light" ? "100" : "700";
    const popupStyle = { "backgroundColor": "var(--" + note.color + "-" + weight + ")" };
    const popupStyleDefault = { "backgroundColor": "var(--bgcolor-" + weight + ")" };
    const popupStyle400 = { "backgroundColor": "var(--" + note.color + "-400)" };
    const popupStyleDefault400 = { "backgroundColor": "var(--bgcolor-400)", "color": "var(--tcolor)" };
    return (
        <div className="note-popup">
            <div className="note-popup-box" style={note.color !== "" ? popupStyle : popupStyleDefault}>
                <div className="note-popup-box-topbar" style={note.color !== "" ? popupStyle400 : popupStyleDefault400}>
                    <div className="note-popup-box-topbar__title" style={(note.color !== "" && note.color !== "bgcolor") ? popupStyle400 : popupStyleDefault400}>
                        {note.title}
                    </div>
                    <div className="note-popup-box-topbar__close" onClick={close}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="note-popup-box-body">
                    <div className="note-popup-box-description">
                        {note.description.map(line => { return <>{line} <br /> </> })}
                    </div>
                    <div className="note-popup-box-link">
                        <a href={note.linkURL} className="note-popup-box-link__text">{note.linkText}</a>
                    </div>
                </div>
                <div className="note-popup-box-bottombar">
                    <div className="note-popup-box-controls">
                        <div className="note-popup-box-control color">
                            <span className="material-icons" onClick={onColor}>palette</span>
                        </div>
                        <div className="note-popup-box-control link">
                            <span className="material-icons" onClick={onLink}>link</span>
                        </div>
                        <div className="note-popup-box-control copy">
                            <span className="material-icons" onClick={onCopy}>content_copy</span>
                        </div>
                        <div className="note-popup-box-control edit">
                            <span className="material-icons" onClick={onEdit}>edit</span>
                        </div>
                        <div className="note-popup-box-control delete">
                            <span className="material-icons" onClick={onDelete}>delete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotePopup
