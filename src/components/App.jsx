import React, { useState } from 'react'
import Header from './Header/Header'
import SideBar from './SideBar/SideBar'
import Home from './Home/Home'
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
  const [render, setRender] = useState(0);
  const handleRender = (link) => {
    setsideBarExpand((window.innerWidth > 880 ? true : false));
    setRender(link + 1);
  }
  const [allEvents, setAllEvents] = useState([...events]);
  const [allNotes, setAllNotes] = useState([...notes]);
  const [allTasks, setAllTasks] = useState([...tasks]);
  const handleChange = (a) => {
    switch (render) {
      case 2:
        setAllEvents(a);;
        break;
      case 3:
        setAllNotes(a);
        break;
      case 4:
        setAllTasks(a);
        break;
      default:
        console.log(a);
        break;
    }
  }
  return (
    <>
      <Header sideBar={() => { setsideBarExpand(!sideBarExpand) }} GoTo={handleRender} onHelp={() => { setRender(5) }} />
      <SideBar aside={sideBarExpand} GoTo={handleRender} />
      <main className={`main main-aside-${sideBarExpand ? "expand" : "hide"}`}>
        {
          render === 0 && <Home GoTo={handleRender} />
        }
        {
          render === 1 && <Calendar />
        }
        {
          render === 2 && <Events events={allEvents} submit={handleChange} />
        }
        {
          render === 3 && <Notes notes={allNotes} submit={handleChange} />
        }
        {
          render === 4 && <Tasks tasks={allTasks} submit={handleChange} />
        }
        {
          render === 5 && <Help GoTo={handleRender} />
        }
        {
          render === 7 && <ContactUs />
        }
        {
          render === 8 && <FeedBack close={() => setRender(0)} />
        }
      </main>
    </>
  )
}

export default App
