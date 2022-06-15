import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header/Header";
import GlobalContext from "./Context/GlobalContext";
import SideBar from "./components/SideBar/SideBar";

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
		</>
	);
};

export default App;
