import React from 'react'
import { useWebContext } from '../../components/Context/WebContext'
import { Tooltip } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TasksImage from '../../images/favicon.svg'

const Note = ({ title, description, linkURL, linkText, color, Pop, onColor, onLink, onCopy, onEdit, onDelete }) => {
    const { theme } = useWebContext();
    const weight = theme === "light" ? "100" : "700";
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
    AOS.init();
    return (
        <div className="note" style={{ "backgroundColor": "var(--" + color + "-" + weight + ")" }}>
            <div className="note-head" onClick={Pop}>
                <div className="note-head__title">{title}</div>
                <div className="note-head__image">
                    <Tooltip title={(linkURL === "" || linkURL === "#") ? "No external link" : linkURL}>
                        <a href={linkURL} target={(linkURL === "" || linkURL === "#") ? "_self" : "_blank"} rel="noreferrer">
                            <img src={(linkURL !== "" && linkURL !== "#") ? "https://s2.googleusercontent.com/s2/favicons?domain_url=" + linkURL : TasksImage} className="note-head__img" alt="note link favicon" />
                        </a>
                    </Tooltip>
                </div>
            </div>
            <div className="note-body">
                <div className="note-description" onClick={Pop}>
                    <div className="note-description__content">
                        {
                            description.map((line, index) => {
                                return (
                                    <span key={index}> {line} <br /> </span>
                                )
                            })
                        }
                    </div>
                    <div className="note-link">
                        <a href={linkURL} target={(linkURL === "" || linkURL === "#") ? "_self" : "_blank"} rel="noreferrer">{linkText}</a>
                    </div>
                </div>
                <div className="note-controls">
                    {
                        controls.map((control, index) => (
                            <div className="note-control" key={index}>
                                <Tooltip title={control.tip}>
                                    <button className="btn material-icons icon-btn icon-btn-sm" onClick={control.action}>{control.icon}</button>
                                </Tooltip>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
Note.defaultProps = {
    linkURL: "",
    linkText: "",
    color: "bgcolor"
}

export default Note