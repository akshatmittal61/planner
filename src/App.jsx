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

const App = () => {
	AOS.init();
	const { openSideBar, setOpenSideBar } = useContext(GlobalContext);
	const location = useLocation();
	useEffect(() => {
		setOpenSideBar(false);
	}, [location.pathname]);
	return (
		<>
			<Header />
			{openSideBar && <SideBar />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
