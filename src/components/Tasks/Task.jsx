import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Task = ({ title, description, date, time, done, Pop, onEdit, onDelete, handleDone }) => {
    return (
        <div className="task col-lg-50 col-md-50 col-sm-100">
            <div className="task-content">
                <div className="task-main">
                    <div className="task-main__done">
                        <Checkbox defaultChecked={done} onChange={handleDone} />
                    </div>
                    <div className="task-main__title" onClick={Pop}>
                        {title}
                    </div>
                </div>
                <div className="task-controls">
                    <IconButton className="task-control" aria-label="edit" onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton className="task-control" aria-label="delete" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Task
