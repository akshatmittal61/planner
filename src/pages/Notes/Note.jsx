import React from 'react'
import { useWebContext } from '../../components/Context/WebContext'
import { Tooltip } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TasksImage from '../../images/favicon.svg'

const Note = ({ title, description, linkURL, linkText, color, Pop, onColor, onLink, onCopy, onEdit, onDelete }) => {
    const { theme } = useWebContext();
    const weight = theme === "light" ? "100" : "700";
    AOS.init();
    return (
        <div className="note" style={{ "backgroundColor": "var(--" + color + "-" + weight + ")" }} data-aos="fade-up">
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
                            description.map(line => {
                                return (
                                    <>
                                        {line}
                                        <br />
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="note-link">
                        <a href={linkURL} target={(linkURL === "" || linkURL === "#") ? "_self" : "_blank"} rel="noreferrer">{linkText}</a>
                    </div>
                </div>
                <div className="note-controls">
                    <div className="note-control color">
                        <Tooltip title="Change Color">
                            <button className="btn material-icons" onClick={onColor}>palette</button>
                        </Tooltip>
                    </div>
                    <div className="note-control link">
                        <Tooltip title="Edit Link">
                            <button className="btn material-icons" onClick={onLink}>link</button>
                        </Tooltip>
                    </div>
                    <div className="note-control copy">
                        <Tooltip title="Copy Note">
                            <button className="btn material-icons" onClick={onCopy}>content_copy</button>
                        </Tooltip>
                    </div>
                    <div className="note-control edit">
                        <Tooltip title="Edit Note">
                            <button className="btn material-icons" onClick={onEdit}>edit</button>
                        </Tooltip>
                    </div>
                    <div className="note-control delete">
                        <Tooltip title="Delete Note">
                            <button className="btn material-icons" onClick={onDelete}>delete</button>
                        </Tooltip>
                    </div>
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