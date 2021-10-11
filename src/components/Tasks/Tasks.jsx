import React, { useState } from 'react';
import Task from './Task';
import TaskPopup from './TaskPopup';
import AddTask from './AddTask';
import { Tooltip, IconButton, Snackbar, Zoom, Fab, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditTask from './EditTask';
import Button from '../Button'
import nullTasks from '../../images/nullTasks.svg'

const Tasks = ({ tasks, submit }) => {
    const [allTasks, setAllTasks] = useState([...tasks])
    allTasks.sort((a, b) => {
        let _a = new Date(a.date);
        let _b = new Date(b.date);
        if (_a < _b) return -1;
        else if (_a === _b) return 0;
        else return 1;
    })
    const [popupTaskBox, setPopupTaskBox] = useState(-1);
    const [addTaskBox, setAddTaskBox] = useState(-1);
    const [editTaskBox, setEditTaskBox] = useState(-1);
    const [snackMessage, setSnackMessage] = useState("Action successful");
    const popupTask = (a) => {
        setPopupTaskBox(a);
    }
    const deleteTask = (id) => {
        let newTasks = [...allTasks];
        newTasks = newTasks.filter((task, index) => {
            return index !== id;
        })
        setAllTasks(newTasks);
        setSnackMessage("Task deleted successfully");
        setOpen(true);
        setPopupTaskBox(-1);
        submit(newTasks);
    }
    const addNewTask = () => {
        setAddTaskBox(1);
    }
    const addTask = (newTask) => {
        let newTasks = [...allTasks];
        const condition = newTask.title === "" && newTask.description === "";
        newTasks = !condition ? [...newTasks, newTask] : [...newTasks]
        setAllTasks(newTasks);
        setSnackMessage(condition ? "Can't add an empty task" : "Task added successfully");
        setOpen(true);
        setAddTaskBox(condition ? 1 : -1);
        submit(newTasks);
    }
    const editTask = (newTask) => {
        let newTasks = [...allTasks];
        newTasks = newTasks.map((task, index) => {
            if (index === editTaskBox) {
                return newTask;
            }
            else return task;
        })
        setAllTasks(newTasks);
        setSnackMessage("Changes saved");
        setOpen(true);
        setEditTaskBox(-1);
        submit(newTasks);
    }
    const handleDoneChange = (id) => {
        setAllTasks((prev) => {
            setSnackMessage(prev[id].done ? "Marked as Not Done" : "Marked as Done");
            prev[id].done = !prev[id].done;
            return [...prev];
        })
        setOpen(true);
    }
    const AccordionStyle = { backgroundColor: 'transparent', color: 'inherit' };
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
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <section className="tasks">
            {allTasks.length !== 0 ? (
                <>
                    <Accordion defaultExpanded={true} sx={AccordionStyle}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className="tasks-head">
                                Your Tasks
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="row tasks-row">
                                {
                                    allTasks.map((task, index) =>
                                        !task.done && <Task
                                            key={index}
                                            title={task.title}
                                            description={task.description}
                                            date={task.date}
                                            time={task.time}
                                            done={task.done}
                                            Pop={() => { popupTask(index) }}
                                            onEdit={() => { setEditTaskBox(index) }}
                                            onDelete={() => { deleteTask(index) }}
                                            handleDone={() => { handleDoneChange(index) }}
                                        />
                                    )
                                }
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded={false} sx={AccordionStyle}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className="tasks-head">
                                Completed Tasks
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="row tasks-row">
                                {
                                    allTasks.map((task, index) =>
                                        task.done && <Task
                                            key={index}
                                            title={task.title}
                                            description={task.description}
                                            date={task.date}
                                            time={task.time}
                                            done={task.done}
                                            Pop={() => { popupTask(index) }}
                                            onDelete={() => { deleteTask(index) }}
                                            handleDone={() => { handleDoneChange(index) }}
                                        />
                                    )
                                }
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </>
            ) : (
                <div className="tasks-null">
                    <div className="tasks-null-image">
                        <img className="tasks-null-image__img" src={nullTasks} alt="No events" />
                    </div>
                    <div className="tasks-null-content">
                        <div className="tasks-null-content__text">No tasks yet</div>
                        <div className="tasks-null-content__button">
                            <Button imgSrc={nullTasks} text="Add a task" onClick={() => { setAddTaskBox(1) }} color="blue" />
                        </div>
                    </div>
                </div>
            )}
            {
                popupTaskBox >= 0 && <TaskPopup
                    task={allTasks[popupTaskBox]}
                    close={() => { setPopupTaskBox(-1) }}
                />
            }
            {
                addTaskBox >= 0 && <AddTask
                    close={() => { setAddTaskBox(-1) }}
                    submit={addTask}
                />
            }
            {
                editTaskBox >= 0 && <EditTask
                    taskToEdit={allTasks[editTaskBox]}
                    close={() => { setEditTaskBox(-1) }}
                    submit={editTask}
                />
            }
            {
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={snackMessage}
                    action={action}
                />
            }
            <div className="task-add-icon">
                <Zoom
                    key="primary"
                    in={2 > 1}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${2 > 1 ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Tooltip title="Add a task">
                        <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={addNewTask} style={{ "position": "fixed" }}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Zoom>
            </div>
        </section>
    )
}

export default Tasks
