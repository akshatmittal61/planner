import React from 'react';
import Button from '../../components/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useWebContext } from '../../components/Context/WebContext';
import { Tooltip } from '@mui/material';
import useDocumentTitle from '../../components/Title';

const NotePopup = ({ note, close, onColor, onLink, onCopy, onEdit, onDelete }) => {
    AOS.init();
    useDocumentTitle(note.title);
    const { theme } = useWebContext();
    const weight = theme === "light" ? "100" : "700";
    const popupStyle = { "backgroundColor": "var(--" + note.color + "-" + weight + ")" };
    const popupStyleDefault = { "backgroundColor": "var(--bgcolor-" + weight + ")" };
    const popupStyle400 = { "backgroundColor": "var(--" + note.color + "-400)", "color": "#f0f0f0" };
    const popupStyleDefault400 = { "backgroundColor": "var(--bgcolor-400)", "color": "var(--tcolor)" };
    const controls = [
        {
            tip: "Change color",
            action: onColor,
            icon: "palette"
        },
        {
            tip: "Edit Link",
            action: onLink,
            icon: "link"
        },
        {
            tip: "Copy Note",
            action: onCopy,
            icon: "content_copy"
        },
        {
            tip: "Edit Note",
            action: onEdit,
            icon: "edit"
        },
        {
            tip: "Delete Note",
            action: onDelete,
            icon: "delete"
        },
    ];
    return (
        <div className="note-popup">
            <div className="note-popup-box" style={note.color !== "" ? popupStyle : popupStyleDefault} data-aos="zoom-in">
                <div className="note-popup-box-topbar" style={note.color !== "" ? popupStyle400 : popupStyleDefault400}>
                    <div className="note-popup-box-topbar__title" style={(note.color !== "" && note.color !== "bgcolor") ? popupStyle400 : popupStyleDefault400}>
                        {note.title}
                    </div>
                    <Button
                        size="small"
                        className="icon-btn icon-btn-sm note-popup-box-topbar__close"
                        onClick={close}
                        color={(note.color !== "" && note.color !== "bgcolor") ? "dark" : (theme === "light" ? "light" : "dark")}
                        text={(
                            <span className="material-icons">close</span>
                        )}
                    />
                </div>
                <div className="note-popup-box-body">
                    <div className="note-popup-box-description">
                        {
                            note.description.map((line, index) => (
                                <span key={index}>{line} <br /> </span>
                            ))
                        }
                    </div>
                    <div className="note-popup-box-link">
                        <a href={note.linkURL} className="note-popup-box-link__text">{note.linkText}</a>
                    </div>
                </div>
                <div className="note-popup-box-bottombar">
                    <div className="note-popup-box-controls">
                        {
                            controls.map((control, index) => (
                                <div className="note-popup-box-control" key={index}>
                                    <Tooltip title={control.tip}>
                                        <button className="btn material-icons icon-btn icon-btn-sm" onClick={control.action}>{control.icon}</button>
                                    </Tooltip>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotePopup
