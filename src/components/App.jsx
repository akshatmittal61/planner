import React, { useState } from 'react'
import Header from './Header/Header'
import SideBar from './SideBar/SideBar'
import Calendar from './Calendar/Calendar'
import Events from './Events/Events'
import Notes from './Notes/Notes'

const App = () => {
  const [sideBarExpand, setsideBarExpand] = useState((window.innerWidth > 992 ? true : false));
  console.log(window.innerWidth);
  const [render, setRender] = useState(2);
  const handleRender = (link) => {
    console.log(link);
    setRender(link);
  }
  return (
    <>
      <Header sideBar={() => { setsideBarExpand(!sideBarExpand) }} GoTo={handleRender} />
      <SideBar aside={sideBarExpand} GoTo={handleRender} />
      <main className={`main main-aside-${sideBarExpand ? "expand" : "hide"}`}>
        {
          render === 0 ? <Calendar /> : (render === 1 ? <Events /> : (render === 2 ? <Notes /> : null))
        }
      </main>
    </>
  )
}

export default App
