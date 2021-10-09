import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip, Checkbox, IconButton } from '@mui/material';

const Task = ({ title, done, Pop, onEdit, onDelete, handleDone }) => {
    return (
        <div className="task col-lg-50 col-md-50 col-sm-100">
            <div className="task-content">
                <div className="task-main">
                    <div className="task-main__done">
                        <Tooltip title={done ? "Mark as not done" : "Mark as Done"}>
                            <Checkbox defaultChecked={done} onChange={handleDone} />
                        </Tooltip>
                    </div>
                    <div className="task-main__title" onClick={Pop}>
                        {title}
                    </div>
                </div>
                <div className="task-controls">
                    <Tooltip title="Edit Task">
                        <IconButton className="task-control" aria-label="edit" onClick={onEdit}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Task">
                        <IconButton className="task-control" aria-label="delete" onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Task
