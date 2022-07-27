import React, { useContext, useEffect } from "react";
import "./style.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header/Header";
import GlobalContext from "./Context/GlobalContext";
import SideBar from "./components/SideBar/SideBar";
import Footer from "./components/Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Calendar from "./pages/Calendar/Calendar";
import Events from "./pages/Events/Events";
import PrivateRoute from "./components/PrivateRoute";
import Notes from "./pages/Notes/Notes";
import NotesTrash from "./pages/Notes/NotesTrash";
import NotesArchived from "./pages/Notes/NotesArchived";
import Tasks from "./pages/Tasks/Tasks";
import TasksCompleted from "./pages/Tasks/TasksCompleted";
import TasksTrash from "./pages/Tasks/TasksTrash";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";

const App = () => {
	AOS.init();
	const { theme, openSideBar, setOpenSideBar } = useContext(GlobalContext);
	const location = useLocation();
	useEffect(() => {
		setOpenSideBar(false);
	}, [location.pathname, setOpenSideBar]);
	useEffect(() => {
		document.body.classList = theme;
		localStorage.setItem("theme", theme);
	}, [theme]);

	return (
		<>
			{location.pathname !== "/login" &&
				location.pathname !== "/register" && <Header />}
			{openSideBar && <SideBar />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/calendar" element={<Calendar />} />
				<Route
					path="/events"
					element={
						<PrivateRoute>
							<Events />
						</PrivateRoute>
					}
				/>
				<Route
					path="/notes"
					element={
						<PrivateRoute>
							<Notes />
						</PrivateRoute>
					}
				/>
				<Route
					path="/notes/archive"
					element={
						<PrivateRoute>
							<NotesArchived />
						</PrivateRoute>
					}
				/>
				<Route
					path="/notes/trash"
					element={
						<PrivateRoute>
							<NotesTrash />
						</PrivateRoute>
					}
				/>
				<Route
					path="/tasks"
					element={
						<PrivateRoute>
							<Tasks />
						</PrivateRoute>
					}
				/>
				<Route
					path="/tasks/completed"
					element={
						<PrivateRoute>
							<TasksCompleted />
						</PrivateRoute>
					}
				/>
				<Route
					path="/tasks/trash"
					element={
						<PrivateRoute>
							<TasksTrash />
						</PrivateRoute>
					}
				/>
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			{location.pathname !== "/login" &&
				location.pathname !== "/register" && <Footer />}
		</>
	);
};

export default App;
