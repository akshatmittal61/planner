import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TaskPopup = ({ task, close }) => {
    return (
        <div className="task-popup">
            <div className="task-popup-box">
                <div className="task-popup-box-topbar">
                    <div className="task-popup-box-topbar__close" onClick={close}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="task-popup-box-body">
                    <div className="task-popup-box-body__content">
                        <div className="task-popup-box-title">
                            <div className="task-popup-box-title__text">
                                {task.title}
                            </div>
                        </div>
                        <div className="task-popup-box-description">
                            <div className="task-popup-box-description__text">
                                {task.description}
                            </div>
                        </div>
                        <div className="task-popup-box-schedule">
                            <div className="task-popup-box-schedule__date">
                                <div className="task-popup-box-schedule__date-icon">
                                    <EventNoteIcon />
                                </div>
                                <div className="task-popup-box-schedule__date-content">
                                    {task.date}
                                </div>
                            </div>
                            <div className="task-popup-box-schedule__time">
                                <div className="task-popup-box-schedule__time-icon">
                                    <AccessTimeIcon />
                                </div>
                                <div className="task-popup-box-schedule__time-content">
                                    {task.time}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskPopup
