import React, { useState } from 'react'
import Header from './Header/Header'
import SideBar from './SideBar/SideBar'
import Calendar from './Calendar/Calendar'
import Events from './Events/Events'
import Notes from './Notes/Notes'
import Tasks from './Tasks/Tasks'
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
  return (
    <>
      <Header sideBar={() => { setsideBarExpand(!sideBarExpand) }} GoTo={handleRender} onHelp={() => { setRender(5) }} />
      <SideBar aside={sideBarExpand} GoTo={handleRender} />
      <main className={`main main-aside-${sideBarExpand ? "expand" : "hide"}`}>
        {
          render === 1 && <Calendar />
        }
        {
          render === 2 && <Events />
        }
        {
          render === 3 && <Notes />
        }
        {
          render === 4 && <Tasks />
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
