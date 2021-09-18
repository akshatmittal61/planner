import React, { useState } from 'react'
import Header from './Header/Header'
import SideBar from './SideBar/SideBar'
//import Calendar from './Calendar'
import Events from './Events/Events'

const App = () => {
  const [sideBarExpand, setsideBarExpand] = useState((window.innerWidth>992?true:false));
  console.log(window.innerWidth);
  return (
    <>
      <Header sideBar={() => { setsideBarExpand(!sideBarExpand) }} />
      <SideBar aside={sideBarExpand} />
      <main className={`main main-aside-${sideBarExpand ? "expand" : "hide"}`}>
        {/* <Calendar /> */}
        <Events />
      </main>
    </>
  )
}

export default App
