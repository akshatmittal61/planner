import React, { useState } from 'react'
import JumpToMonth from './JumpToMonth';
import EventPopup from '../Events/EventPopup';
import EditEvent from '../Events/EditEvent';
import { useTheme } from '@mui/material/styles';
import { Tooltip, Zoom, Fab, Snackbar, IconButton } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import useDocumentTitle from '../../components/Title';
const Calendar = ({ events, submit }) => {
    AOS.init();
    useDocumentTitle('Calendar');
    const colors = ["bgcolor", "red", "pink", "purple", "dark-purple", "indigo", "blue", "light-blue", "cyan", "green", "light-green", "orange", "brown", "grey", "blue-grey"];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const calDate = [0, 1, 2, 3, 4, 5, 6];
    const calRow = [0, 1, 2, 3, 4];
    const mcode = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
    const ycode = [5, 6, 0, 1, 3, 4, 5, 6, 1, 2, 3, 4, 6, 0, 1, 2, 4, 5, 6, 0, 2, 3, 4, 5, 0, 1, 2, 3];
    const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const Month_short3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let mon = 31;
    const null34 = Array(35).fill(null);
    let Day = null34;
    let leap = false;
    let currentDate = parseInt(Date().substring(8, 10));
    let currentMonth_short3 = Date().substring(4, 7);
    let currentMonth, cuurentMonthNumber;
    for (let i = 0; i < 12; ++i) {
        if (currentMonth_short3 === Month_short3[i]) {
            currentMonth = Month[i];
            cuurentMonthNumber = i + 1;
        }
    }
    let currentYear = parseInt(Date().substring(11, 15));
    let [monthDisplayIndex, setMonthDisplayIndex] = useState(cuurentMonthNumber);
    let [monthToDisplay, setMonthToDisplay] = useState(currentMonth);
    let [yearToDisplay, setYearToDisplay] = useState(currentYear);
    let Mon = monthToDisplay;
    function cd(d, m, y) {
        return `${y}-${m < 9 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
    }
    function check(d, m, y) {
        for (let i = 0; i < events.length; ++i) {
            if (events[i].date === cd(d, m, y)) return i;
        }
        return -1;
    }
    function chdate(m, y) {
        mon = 31;
        Day = null34;
        if (y % 4 === 0) {
            if (y % 100 === 0) {
                leap = (y % 400 === 0) ? true : false;
            }
            else leap = true;
        }
        else leap = false;
        if (((m === 4 || m === 6 || m === 9 || m === 11))) { --mon; }
        else if (m === 2 && leap === true) {
            mon -= 2;
        }
        else if (m === 2 && leap === false) {
            mon -= 3;
        }
        let i = 0, k = 0;
        let render1 = (1 + mcode[m - 1] + ycode[y % 28]) % 7;
        render1 = (render1 >= 2) ? render1 - 2 : render1 + 5;
        for (i = 0; i < 35; ++i)
            Day[i] = (i >= render1 && i < mon + render1) ? ++k : null;
        if (k < mon && i === 35) {
            i = 0;
            while (k < mon)
                Day[i++] = ++k;
        }
        return Day;
    }
    const [datesToDisplay, setDatesToDisplay] = useState(chdate(monthDisplayIndex, yearToDisplay));
    const [jumpToMonth, setJumpToMonth] = useState(-1);
    const editMonth = (newMonth) => {
        const [monthToSet, yearToSet] = [parseInt(newMonth.substring(5, 7)), parseInt(newMonth.substring(0, 4))];
        setYearToDisplay(yearToSet);
        setMonthDisplayIndex(monthToSet);
        Mon = Month[monthToSet - 1];
        setMonthToDisplay(Mon);
        setDatesToDisplay(chdate(monthToSet, yearToSet));
        setJumpToMonth(-1);
    }
    const backMonth = () => {
        if (monthDisplayIndex > 1) {
            setMonthDisplayIndex(--monthDisplayIndex);
            Mon = Month[monthDisplayIndex - 1];
            setMonthToDisplay(Mon);
            setDatesToDisplay(chdate(monthDisplayIndex, yearToDisplay));
        }
        else {
            setMonthDisplayIndex(12);
            Mon = Month[11];
            setMonthToDisplay(Mon);
            setYearToDisplay(--yearToDisplay);
            setDatesToDisplay(chdate(12, yearToDisplay));
        }
    }
    const forwardMonth = () => {
        if (monthDisplayIndex < 12) {
            setMonthDisplayIndex(++monthDisplayIndex);
            Mon = Month[monthDisplayIndex - 1];
            setMonthToDisplay(Mon);
            setDatesToDisplay(chdate(monthDisplayIndex, yearToDisplay));
        }
        else {
            setMonthDisplayIndex(1);
            Mon = Month[0];
            setMonthToDisplay(Mon);
            setYearToDisplay(++yearToDisplay);
            setDatesToDisplay(chdate(1, yearToDisplay));
        }
    }
    const [allEvents, setAllEvents] = useState([...events]);
    const [popupEventBox, setPopupEventBox] = useState(-1);
    const [editEventBox, setEditEventBox] = useState(-1);
    const [snackMessage, setSnackMessage] = useState("Action successful");
    const popupEvent = (a) => {
        setPopupEventBox(a);
    }
    const deleteEvent = (id) => {
        let newEvents = [...allEvents];
        newEvents = newEvents.filter((event, index) => {
            return index !== id;
        })
        setAllEvents(newEvents);
        setSnackMessage("Event deleted successfully");
        setOpen(true);
        setPopupEventBox(-1);
        submit(newEvents);
    }
    const editEvent = (newEvent) => {
        let newEvents = [...allEvents];
        newEvents = newEvents.map((event, index) => {
            if (index === popupEventBox)
                return newEvent;
            else return event;
        })
        setAllEvents(newEvents);
        setSnackMessage("Changes saved");
        setOpen(true);
        setEditEventBox(-1);
        setPopupEventBox(-1);
        submit(newEvents);
    }
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
    const [open, setOpen] = useState(false);
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
        <section className="calendar">
            <div className="calendar-head" style={{ "backgroundColor": "var(--" + colors[monthDisplayIndex] + "-400)" }}>
                <div className="calendar-head-detail">
                    <h1 className="year">
                        <span className="month">{monthToDisplay}</span>
                        <span id="year">{yearToDisplay}</span>
                    </h1>
                </div>
                <div className="calendar-head-arrows">
                    <button className="btn material-icons back calendar-head-arrow back" onClick={backMonth}>
                        <ArrowBackIosNewIcon />
                    </button>
                    <button className="btn material-icons forward calendar-head-arrow forward" onClick={forwardMonth}>
                        <ArrowForwardIosIcon />
                    </button>
                </div>
            </div>
            <div className="calendar-body" style={{ "backgroundColor": "var(--" + colors[monthDisplayIndex] + "-100)" }}>
                <div className="day-row">
                    {
                        days.map((day, index) => (
                            <span key={index} className="day">{day}</span>
                        ))
                    }
                </div>
                {
                    calRow.map((row, index) => (
                        <div key={index} className="cal-row">
                            {
                                calDate.map((date, index) => (
                                    <span key={index} className={`cal-date _${(row * 7) + date}`}>
                                        {
                                            check(datesToDisplay[(row * 7) + date], monthDisplayIndex, yearToDisplay) > -1 ? (
                                                <Tooltip title={events[check(datesToDisplay[(row * 7) + date], monthDisplayIndex, yearToDisplay)].title}>
                                                    <span
                                                        onClick={() => { popupEvent(check(datesToDisplay[(row * 7) + date], monthDisplayIndex, yearToDisplay)) }}
                                                        style={{ "backgroundColor": "var(--grey-700)", color: "#f0f0f0" }}
                                                    >
                                                        {datesToDisplay[(row * 7) + date]}
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <span style={
                                                    { "backgroundColor": datesToDisplay[(row * 7) + date] === currentDate ? `var(--${colors[monthDisplayIndex]}-400)` : `transparent` }
                                                }>
                                                    {datesToDisplay[(row * 7) + date]}
                                                </span>
                                            )
                                        }
                                    </span>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            {
                jumpToMonth > 0 && <JumpToMonth
                    submit={editMonth}
                    currentMonth={`${yearToDisplay}-${monthDisplayIndex < 10 ? "0" + (monthDisplayIndex) : monthDisplayIndex}`}
                    close={() => { setJumpToMonth(-1) }}
                />
            }
            <div className="calendar-jump-icon">
                <Zoom
                    key="primary"
                    in={2 > 1}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${2 > 1 ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Tooltip title="Jump to Date">
                        <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={() => { setJumpToMonth(2) }}>
                            <EventNoteIcon />
                        </Fab>
                    </Tooltip>
                </Zoom>
            </div>
            {
                popupEventBox >= 0 && <EventPopup
                    event={allEvents[popupEventBox]}
                    close={() => { setPopupEventBox(-1) }}
                    onDelete={() => { deleteEvent(popupEventBox) }}
                    onEdit={() => { setEditEventBox(popupEventBox) }}
                />
            }
            {
                editEventBox >= 0 && <EditEvent
                    eventToEdit={allEvents[popupEventBox]}
                    close={() => { setEditEventBox(-1) }}
                    submit={editEvent}
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
        </section>
    )
}

export default Calendar
