import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CloseIcon from '@mui/icons-material/Close';
import { useWebContext } from '../Context/WebContext';
import { Tooltip } from '@mui/material';
import useDocumentTitle from '../Title';

const NotePopup = ({ note, close, onColor, onLink, onCopy, onEdit, onDelete }) => {
    AOS.init();
    useDocumentTitle(note.title);
    const { theme } = useWebContext();
    const weight = theme === "light" ? "100" : "700";
    const popupStyle = { "backgroundColor": "var(--" + note.color + "-" + weight + ")" };
    const popupStyleDefault = { "backgroundColor": "var(--bgcolor-" + weight + ")" };
    const popupStyle400 = { "backgroundColor": "var(--" + note.color + "-400)" };
    const popupStyleDefault400 = { "backgroundColor": "var(--bgcolor-400)", "color": "var(--tcolor)" };
    return (
        <div className="note-popup">
            <div className="note-popup-box" style={note.color !== "" ? popupStyle : popupStyleDefault} data-aos="zoom-in">
                <div className="note-popup-box-topbar" style={note.color !== "" ? popupStyle400 : popupStyleDefault400}>
                    <div className="note-popup-box-topbar__title" style={(note.color !== "" && note.color !== "bgcolor") ? popupStyle400 : popupStyleDefault400}>
                        {note.title}
                    </div>
                    <button className="btn note-popup-box-topbar__close" onClick={close}>
                        <CloseIcon />
                    </button>
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
                            <Tooltip title="Change Color">
                                <button className="btn material-icons" onClick={onColor}>palette</button>
                            </Tooltip>
                        </div>
                        <div className="note-popup-box-control link">
                            <Tooltip title="Edit Link">
                                <button className="btn material-icons" onClick={onLink}>link</button>
                            </Tooltip>
                        </div>
                        <div className="note-popup-box-control copy">
                            <Tooltip title="Copy Note">
                                <button className="btn material-icons" onClick={onCopy}>content_copy</button>
                            </Tooltip>
                        </div>
                        <div className="note-popup-box-control edit">
                            <Tooltip title="Edit Note">
                                <button className="btn material-icons" onClick={onEdit}>edit</button>
                            </Tooltip>
                        </div>
                        <div className="note-popup-box-control delete">
                            <Tooltip title="Delete Note">
                                <button className="btn material-icons" onClick={onDelete}>delete</button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotePopup
