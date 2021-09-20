import React, { useState } from 'react'
import Header from './Header/Header'
import SideBar from './SideBar/SideBar'
import Calendar from './Calendar/Calendar'
import Events from './Events/Events'

const App = () => {
  const [sideBarExpand, setsideBarExpand] = useState((window.innerWidth>992?true:false));
  console.log(window.innerWidth);
  const [render, setRender] = useState(0);
  const handleRender=(link)=>{
    setRender(link);
  }
  return (
    <>
      <Header sideBar={() => { setsideBarExpand(!sideBarExpand) }} GoTo={handleRender} />
      <SideBar aside={sideBarExpand} GoTo={handleRender} />
      <main className={`main main-aside-${sideBarExpand ? "expand" : "hide"}`}>
        {
          render===0?<Calendar />:(render===1?<Events />:null)
        }
      </main>
    </>
  )
}

export default App
