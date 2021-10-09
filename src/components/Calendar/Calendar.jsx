import React, { useState } from 'react'
import JumpToMonth from './JumpToMonth';
import { useTheme } from '@mui/material/styles';
import { Tooltip, Zoom, Fab } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Calendar = () => {
    const colors = ["bgcolor", "red", "pink", "purple", "dark-purple", "indigo", "blue", "light-blue", "cyan", "green", "light-green", "orange", "brown", "grey", "blue-grey"];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const calDate = [0, 1, 2, 3, 4, 5, 6];
    const calRow = [0, 1, 2, 3, 4];
    const mcode = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
    const ycode = [5, 6, 0, 1, 3, 4, 5, 6, 1, 2, 3, 4, 6, 0, 1, 2, 4, 5, 6, 0, 2, 3, 4, 5, 0, 1, 2, 3];
    const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const Month_short3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let mon = 31;
    const null34 = Array(34).fill(null);
    let Day = null34;
    let leap = false;
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
    let year = yearToDisplay;
    let month = monthDisplayIndex;
    let Mon = monthToDisplay;
    let i = 0, k = 0;
    let render1 = (1 + mcode[month - 1] + ycode[year % 28]) % 7;
    render1 = (render1 > 2) ? render1 - 2 : render1 + 5;
    for (i = 0; i < 35; ++i) {
        if (i >= render1 && i <= mon) Day[i] = ++k;
    }
    const [datesToDisplay, setDatesToDisplay] = useState(Day);
    function chdate() {
        mon = 31;
        if (yearToDisplay % 4 === 0) {
            if (yearToDisplay % 100 === 0) {
                leap = (yearToDisplay % 400 === 0) ? true : false;
            }
            else leap = true;
        }
        else leap = false;
        if (((monthDisplayIndex === 4 || monthDisplayIndex === 6 || monthDisplayIndex === 9 || monthDisplayIndex === 11))) { --mon; }
        else if (monthDisplayIndex === 2 && leap === true) {
            mon -= 2;
        }
        else if (monthDisplayIndex === 2 && leap === false) {
            mon -= 3;
        }
        let i = 0, k = 0;
        let render1 = (1 + mcode[monthDisplayIndex - 1] + ycode[yearToDisplay % 28]) % 7;
        render1 = (render1 >= 2) ? render1 - 2 : render1 + 5;
        for (i = 0; i < 35; ++i)
            Day[i] = (i >= render1 && i < mon + render1) ? ++k : null;
        if (k < mon && i === 35) {
            i = 0;
            while (k < mon)
                Day[i++] = ++k;
        }
        setDatesToDisplay(Day);
    }
    const [jumpToMonth, setJumpToMonth] = useState(-1);
    const editMonth = (newMonth) => {
        const [monthToSet, yearToSet] = [parseInt(newMonth.substring(5, 7)), parseInt(newMonth.substring(0, 4))]
        console.log(monthToSet + " " + yearToSet);
        setYearToDisplay(yearToSet);
        setMonthDisplayIndex(monthToSet);
        Mon = Month[monthDisplayIndex - 1];
        setMonthToDisplay(Mon);
        chdate();
        setJumpToMonth(-1);
    }
    const backMonth = () => {
        console.clear();
        if (monthDisplayIndex > 1) {
            setMonthDisplayIndex(--monthDisplayIndex);
            Mon = Month[monthDisplayIndex - 1];
            setMonthToDisplay(Mon);
            chdate();
        }
        else {
            setMonthDisplayIndex(12);
            Mon = Month[monthDisplayIndex - 1];
            setMonthToDisplay(Mon);
            setYearToDisplay(--yearToDisplay);
            chdate();
        }
    }
    const forwardMonth = () => {
        console.clear();
        if (monthDisplayIndex < 12) {
            setMonthDisplayIndex(++monthDisplayIndex);
            Mon = Month[monthDisplayIndex - 1];
            setMonthToDisplay(Mon);
            chdate();
        }
        else {
            setMonthDisplayIndex(1);
            Mon = Month[monthDisplayIndex - 1];
            setMonthToDisplay(Mon);
            setYearToDisplay(++yearToDisplay);
            chdate();
        }
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
    return (
        <section className="calendar">
            <div className="calendar-head" style={{ "backgroundColor": "var(--" + colors[monthDisplayIndex] + "-400)" }}>
                <div className="calendar-head-detail" onClick={() => { console.log(yearToDisplay + " " + monthDisplayIndex + " " + Mon + " " + monthToDisplay + " " + jumpToMonth); }}>
                    <h1 className="year">
                        <span className="month">{monthToDisplay}</span>
                        <span id="year">{yearToDisplay}</span>
                    </h1>
                </div>
                <div className="calendar-head-arrows">
                    <span className="material-icons back calendar-head-arrow back" onClick={backMonth}>
                        <ArrowBackIosNewIcon />
                    </span>
                    <span className="material-icons forward calendar-head-arrow forward" onClick={forwardMonth}>
                        <ArrowForwardIosIcon />
                    </span>
                </div>
            </div>
            <div className="calendar-body" style={{ "backgroundColor": "var(--" + colors[monthDisplayIndex] + "-100)" }}>
                <div className="day-row">
                    {days.map(day => (<span className="day">{day}</span>))}
                </div>
                {calRow.map(row => (<div className="cal-row">
                    {calDate.map(date => (<span className={`cal-date _${(row * 7) + date}`}>{datesToDisplay[(row * 7) + date]}</span>))}
                </div>))}
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
        </section>
    )
}

export default Calendar
