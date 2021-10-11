import React, { useState } from 'react'
import Header from './Header/Header'
import SideBar from './SideBar/SideBar'
import Calendar from './Calendar/Calendar'
import Events from './Events/Events'
import events from "./Events/events.json";
import Notes from './Notes/Notes'
import notes from './Notes/notes.json'
import Tasks from './Tasks/Tasks'
import tasks from './Tasks/tasks.json'
import Help from './Help/Help'
import ContactUs from './ContactUs/ContactUs'
import FeedBack from './FeedBack';

const App = () => {
  const [sideBarExpand, setsideBarExpand] = useState((window.innerWidth > 880 ? true : false));
  const [render, setRender] = useState(1);
  const handleRender = (link) => {
    setsideBarExpand((window.innerWidth > 880 ? true : false));
    console.log(link);
    setRender(link + 1);
  }
  const [allEvents, setAllEvents] = useState([...events]);
  const [allNotes, setAllNotes] = useState([...notes]);
  const [allTasks, setAllTasks] = useState([...tasks]);
  const handleEvents = (a) => {
    setAllEvents(a);
  }
  const handleNotes = (a) => {
    setAllNotes(a);
  }
  const handleTasks = (a) => {
    setAllTasks(a);
  }
  return (
    <>
      <Header sideBar={() => { setsideBarExpand(!sideBarExpand) }} GoTo={handleRender} onHelp={() => { setRender(5) }} />
      <SideBar aside={sideBarExpand} GoTo={handleRender} />
      <main className={`main main-aside-${sideBarExpand ? "expand" : "hide"}`}>
        {
          render === 0 && (<div> I will be first page</div>)
        }
        {
          render === 1 && <Calendar />
        }
        {
          render === 2 && <Events events={allEvents} submit={handleEvents} />
        }
        {
          render === 3 && <Notes notes={allNotes} submit={handleNotes} />
        }
        {
          render === 4 && <Tasks tasks={allTasks} submit={handleTasks} />
        }
        {
          render === 5 && <Help GoTo={handleRender} />
        }
        {
          render === 7 && <ContactUs />
        }
        {
          render === 8 && <FeedBack close={() => setRender(1)} />
        }
      </main>
    </>
  )
}

export default App
