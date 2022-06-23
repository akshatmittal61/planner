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
import Navigation from "./components/Navigation/Navigation";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Calendar from "./pages/Calendar/Calendar";
import Events from "./pages/Events/Events";
import PrivateRoute from "./components/PrivateRoute";
import Notes from "./pages/Notes/Notes";

const App = () => {
	AOS.init();
	const { openSideBar, setOpenSideBar } = useContext(GlobalContext);
	const location = useLocation();
	useEffect(() => {
		setOpenSideBar(false);
	}, [location.pathname]);
	return (
		<>
			{location.pathname !== "/login" &&
				location.pathname !== "/register" && <Header />}
			<Navigation />
			{openSideBar && <SideBar />}
			<Routes>
				<Route path="/" element={<Home />} />
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
				<Route path="*" element={<NotFound />} />
			</Routes>
			{location.pathname !== "/login" &&
				location.pathname !== "/register" && <Footer />}
		</>
	);
};

export default App;
