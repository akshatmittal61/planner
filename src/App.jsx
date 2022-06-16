import React, { useContext } from "react";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header/Header";
import GlobalContext from "./Context/GlobalContext";
import SideBar from "./components/SideBar/SideBar";
import Footer from "./components/Footer/Footer";

const App = () => {
	AOS.init();
	const { openSideBar } = useContext(GlobalContext);
	return (
		<>
			<Header />
			{openSideBar && <SideBar />}
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
