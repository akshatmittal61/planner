import React from 'react'
import { useWebContext } from '../Context/WebContext'
import TasksImage from '../../images/tasks.svg'

const Note = ({ title, description, linkURL, linkText, color, Pop, onColor, onLink, onCopy, onEdit, onDelete }) => {
    const { theme } = useWebContext();
    const weight = theme === "light" ? "100" : "700";
    return (
        <div className="note" style={{ "backgroundColor": "var(--" + color + "-" + weight + ")" }}>
            <div className="note-head" onClick={Pop}>
                <div className="note-head__title">{title}</div>
                <div className="note-head__image">
                    <a href={linkURL} target={(linkURL === "" || linkURL === "#") ? "_self" : "_blank"} rel="noreferrer">
                        <img src={(linkURL !== "" && linkURL !== "#") ? "https://s2.googleusercontent.com/s2/favicons?domain_url=" + linkURL : TasksImage} className="note-head__img" alt="note link favicon" />
                    </a>
                </div>
            </div>
            <div className="note-body">
                <div className="note-description" onClick={Pop}>
                    <div className="note-description__content">
                        {description.map(line => { return <>{line} <br /> </> })}
                    </div>
                    <div className="note-link">
                        <a href={linkURL} target={(linkURL === "" || linkURL === "#") ? "_self" : "_blank"} rel="noreferrer">{linkText}</a>
                    </div>
                </div>
                <div className="note-controls">
                    <div className="note-control color">
                        <span className="material-icons" onClick={onColor}>palette</span>
                    </div>
                    <div className="note-control link">
                        <span className="material-icons" onClick={onLink}>link</span>
                    </div>
                    <div className="note-control copy">
                        <span className="material-icons" onClick={onCopy}>content_copy</span>
                    </div>
                    <div className="note-control edit">
                        <span className="material-icons" onClick={onEdit}>edit</span>
                    </div>
                    <div className="note-control delete">
                        <span className="material-icons" onClick={onDelete}>delete</span>
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