import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'
import Home from './pages/Home/Home'
import Calendar from './pages/Calendar/Calendar'
import Events from './pages/Events/Events.jsx'
import Notes from './pages/Notes/Notes.jsx'
import Tasks from './pages/Tasks/Tasks.jsx'
import Help from './pages/Help/Help'
import ContactUs from './pages/ContactUs/ContactUs'
import FeedBack from './pages/FeedBack';
import useDocumentTitle from './components/Title'

const App = () => {
	useDocumentTitle('Planner');
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const [sideBarExpand, setsideBarExpand] = useState((window.innerWidth > 880 ? true : false));
	const [render, setRender] = useState(0);
	const handleRender = (link) => {
		setsideBarExpand((window.innerWidth > 880 ? true : false));
		setRender(link + 1);
	}
	const axiosInstance = axios.create({
		baseURL: 'http://localhost:5000'
	})
	return (
		<>
			<Header sideBar={() => { setsideBarExpand(!sideBarExpand) }} GoTo={handleRender} onHelp={() => { setRender(5) }} />
			<SideBar aside={sideBarExpand} GoTo={handleRender} />
			<main className={`main main-aside-${sideBarExpand ? "expand" : "hide"}`}>
				{
					render === 0 && <Home GoTo={handleRender} />
				}
				{
					render === 1 && <Calendar axiosInstance={axiosInstance} />
				}
				{
					render === 2 && <Events axiosInstance={axiosInstance} />
				}
				{
					render === 3 && <Notes axiosInstance={axiosInstance} />
				}
				{
					render === 4 && <Tasks axiosInstance={axiosInstance} />
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
