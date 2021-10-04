import React, { useState } from 'react';
import Task from './Task';
import TaskPopup from './TaskPopup';
import AddTask from './AddTask';
import tasks from './tasks.json'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Snackbar } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditTask from './EditTask';

const Tasks = () => {
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
        setAllTasks(prev => {
            return prev.filter((task, index) => {
                return index !== id;
            })
        })
        setSnackMessage("Task deleted successfully");
        setOpen(true);
        setPopupTaskBox(-1);
    }
    const addNewTask = () => {
        setAddTaskBox(1);
    }
    const addTask = (newTask) => {
        const condition = newTask.title === "" && newTask.description === "";
        setAllTasks((prev) => {
            return (!condition ? [...prev, newTask] : [...prev]);
        })
        setSnackMessage(condition ? "Can't add an empty task" : "Task added successfully");
        setOpen(true);
        setAddTaskBox(condition ? 1 : -1);
    }
    const editTask = (newTask) => {
        setAllTasks(() => {
            return allTasks.map((task, index) => {
                if (index === editTaskBox) {
                    return newTask;
                }
                else return task;
            })
        })
        setSnackMessage("Changes saved");
        setOpen(true);
        setEditTaskBox(-1);
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
                    <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={addNewTask} style={{ "position": "fixed" }}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </div>
        </section>
    )
}

export default Tasks
