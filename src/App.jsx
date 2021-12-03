import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import NotFound from './pages/NotFound';
require('dotenv').config();

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
					<Route exact path='/' element={<Home />} />
					<Route exact path='/calendar' element={<Calendar axiosInstance={axiosInstance} />} />
					<Route exact path='/events' element={<Events axiosInstance={axiosInstance} />} />
					<Route exact path='/notes' element={<Notes axiosInstance={axiosInstance} />} />
					<Route exact path='/tasks' element={<Tasks axiosInstance={axiosInstance} />} />
					<Route exact path='/help' element={<Help />} />
					<Route exact path='/contact' element={<ContactUs />} />
					<Route exact path='/feedback' element={<FeedBack />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>
		</Router>
	)
}

export default App
