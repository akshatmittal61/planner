import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
import useDocumentTitle from './components/Title';

const App = () => {
	useDocumentTitle('Planner');
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const [sideBarExpand, setsideBarExpand] = useState((window.innerWidth > 880 ? true : false));
	const handleRender = () => {
		setsideBarExpand((window.innerWidth > 880 ? true : false));
	}
	const axiosInstance = axios.create({
		baseURL: 'http://localhost:5000'
	})
	return (
		<Router>
			<Header sideBar={() => { setsideBarExpand(!sideBarExpand) }} />
			<SideBar aside={sideBarExpand} GoTo={handleRender} />
			<main className={`main main-aside-${sideBarExpand ? "expand" : "hide"}`}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/calendar' element={<Calendar axiosInstance={axiosInstance} />} />
					<Route path='/events' element={<Events axiosInstance={axiosInstance} />} />
					<Route path='/notes' element={<Notes axiosInstance={axiosInstance} />} />
					<Route path='/tasks' element={<Tasks axiosInstance={axiosInstance} />} />
					<Route path='/help' element={<Help />} />
					<Route path='/contact' element={<ContactUs />} />
					<Route path='/feedback' element={<FeedBack />} />
				</Routes>
			</main>
		</Router>
	)
}

export default App
